import React, { useState, useEffect } from "react";
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
    aptNumber: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const handleAptNumber = (event) => {
    setData({ ...data, aptNumber: event.target.value });
  };

  const handleCity = (event) => {
    setData({ ...data, city: event.target.value });
  };

  const handleState = (event) => {
    setData({ ...data, state: event.target.value });
  };

  const handleCountry = (event) => {
    setData({ ...data, country: event.target.value });
  };

  const handleZipCode = (event) => {
    setData({ ...data, zipCode: event.target.value });
  };

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn buttonText">Sign in to checkout</button>
      </Link>
    );
  };

  let deliveryAddress =
    data.address +
    " " +
    data.aptNumber +
    " " +
    data.city +
    ", " +
    data.state +
    " " +
    data.zipCode +
    " " +
    data.country;

  const buy = () => {
    setData({ loading: true });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // empty cart
            // create order

            const createOrderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  console.log("payment success and empty cart");
                  setData({
                    loading: false,
                    success: true,
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div className="mb-5" onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="gorm-group mb-3">
            <label className="text-muted">Street Address:</label>
            <input
              type="text"
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="123 Main St"
            />
          </div>

          <div className="gorm-group mb-3">
            <label className="text-muted">Apt/Unit Number:</label>
            <input
              type="text"
              onChange={handleAptNumber}
              className="form-control"
              value={data.aptNumber}
              placeholder="Optional"
            />
          </div>

          <div className="gorm-group mb-3">
            <label className="text-muted">City:</label>
            <input
              type="text"
              onChange={handleCity}
              className="form-control"
              value={data.city}
              placeholder="City"
            />
          </div>

          <div className="gorm-group mb-3">
            <label className="text-muted">State:</label>
            <input
              type="text"
              onChange={handleState}
              className="form-control"
              value={data.state}
              placeholder="State"
            />
          </div>

          <div className="gorm-group mb-3">
            <label className="text-muted">Country:</label>
            <input
              type="text"
              onChange={handleCountry}
              className="form-control"
              value={data.country}
              placeholder="Country"
            />
          </div>

          <div className="gorm-group mb-3">
            <label className="text-muted">Zip Code:</label>
            <input
              type="text"
              onChange={handleZipCode}
              className="form-control"
              value={data.zipCode}
              placeholder="Zip Code"
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className="text-danger">Loading...</h2>;

  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
