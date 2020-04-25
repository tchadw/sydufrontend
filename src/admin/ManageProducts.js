import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />

          {products.map((p, i) => (
            <div className="row singleItemBox" key={i}>
              <div className="col-lg-4 mb-3">
                <strong>{p.name}</strong>
              </div>
              <div className="col-lg-4 mb-4">
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning">Update</span>
                </Link>
              </div>
              <div className="col-lg-4">
                <span
                  onClick={() => destroy(p._id)}
                  className="badge badge-danger"
                >
                  Delete
                </span>
              </div>
            </div>
          ))}

          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
