import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, [items]);

  const showItems = items => {
    return (
      <div>
        <h2
          style={{
            color: "#000"
          }}
        >
          Your cart has {`${items.length}`} item(s)
        </h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br />{" "}
      <Link to="/shop" style={{ color: "gray" }}>
        Continue shopping
      </Link>
      <br />
      <iframe
        src="https://giphy.com/embed/2shENaEdN6RdwTGIH6"
        width="250"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      />
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="row mt-5">
        <div className="col-lg">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg">
          <h2 className="mb-4" style={{ color: "gray" }}>
            Your cart summary
          </h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
