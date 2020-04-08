import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import { useLocalState } from "../LocalStorageHook";

import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

import { faCartPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  showTryOnButton = true,
  cartUpdate = false,
  showRemoveProductButton = false
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  // Wardrobe State
  const [topSelected, setTop] = useLocalState("topSelected");
  const [bottomSelected, setBottom] = useLocalState("bottomSelected");
  //fix error
  const [curImg, setCurImg] = useLocalState("curImg");

  const curTop = localStorage.getItem("topSelected");
  const curBottom = localStorage.getItem("bottomSelected");

  useEffect(() => {
    setCurImg(`${curTop}` + `${curBottom}`);
  });

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn mt-2 mb-2 btn-lg">
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
        </Link>
      )
    );
  };

  const showTryButton = showTryOnButton => {
    if (product.category.name === "Tops") {
      return (
        showTryOnButton && (
          <button
            className="btn mt-2 mb-2 btn-md mainButton"
            onClick={() => setTop(`${product.imgCode}`)}
          >
            Try On
          </button>
        )
      );
    }
    if (product.category.name === "Bottoms") {
      return (
        showTryOnButton && (
          <button
            className="btn mt-2 mb-2 btn-md mainButton"
            onClick={() => setBottom(`${product.imgCode}`)}
          >
            Try On
          </button>
        )
      );
    }
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn mt-2 mb-2 btn-lg">
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      )
    );
  };

  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => removeItem(product._id)}
          className="btn btn-danger mt-2 mb-2"
        >
          Remove Item
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <ShowImage id="conatiner" item={product} url="product" />
    ) : (
      <div>
        <ShowImage id="conatiner" item={product} url="product" />
        <iframe
          id="img2"
          src="https://giphy.com/embed/W5kw93R1vCbZEZBr01"
          width="150"
          frameBorder="0"
          class="giphy-embed"
          allowFullScreen
          fluid
        />
      </div>
    );
  };

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="card border-light ">
      <div className="card-body" style={{ textAlign: "center" }}>
        {shouldRedirect(redirect)}
        {showStock(product.quantity)}
        <div className="itemCardText" style={{ textAlign: "center" }}>
          {product.name}
        </div>
        <p className="lead mt-2" style={{ fontSize: "10px" }}>
          {product.description.substring(0, 100)}
        </p>
        <p style={{ textAlign: "center" }}>${product.price}</p>
        {showViewButton(showViewProductButton)}

        {showAddToCart(showAddToCartButton)}
        <br />
        {/*showTryButton(showTryOnButton)*/}
        {showRemoveButton(showRemoveProductButton)}

        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
