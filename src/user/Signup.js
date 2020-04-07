import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, success, error } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password }).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button
        onClick={clickSubmit}
        className="btn"
        style={{
          backgroundColor: "#dfbf9f",
          color: "#660000",
          textShadow: "2px 2px #fff",
          fontFamily: "Jersey M54"
        }}
      >
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      <div style={{ marginTop: "80px" }}>
        <h1
          style={{
            textAlign: "center",
            textShadow: "2px 2px #fff",
            fontFamily: "Jersey M54",
            color: "#660000"
          }}
        >
          Student Sign Up
        </h1>
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            marginBottom: "50px"
          }}
        >
          <iframe
            src="https://giphy.com/embed/xThtayhFCUiob1hFG8"
            width="250"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
            style={{ pointerEvents: "none" }}
          ></iframe>
        </div>
        {showSuccess()}
        {showError()}
        {signUpForm()}
      </div>
    </Layout>
  );
};

export default Signup;
