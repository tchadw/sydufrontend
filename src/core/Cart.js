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
            color: "#004080"
          }}
        >
          Your cart has {`${items.length}`} items
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
      <Link to="/shop" style={{ color: "#660000" }}>
        Continue shopping
      </Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping."
      className="container-fluid"
    >
      <div className="row mt-5">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>

        <div className="col-6">
          <h2 className="mb-4" style={{ color: "#660000" }}>
            Your cart summary
          </h2>
          <iframe
            src="https://giphy.com/embed/2shENaEdN6RdwTGIH6"
            width="250"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          />
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
