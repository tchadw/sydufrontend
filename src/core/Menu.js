import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import {
  faHome,
  faShoppingCart,
  faShoppingBag,
  faTshirt,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "gray",
      fontFamily: "Graduate",
      fontSize: "100%"
    };
  } else {
    return {
      color: "#000",
      fontFamily: "Graduate",
      fontSize: "100%"
    };
  }
};

const Menu = ({ history }) => (
  <div className="navigationBar">
    <ul className="nav nav-tabs " style={{ fontSize: "20px", padding: "15px" }}>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, "/")} to="/">
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/shop")}
          to="/shop"
        >
          <FontAwesomeIcon icon={faTshirt} />
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/cart")}
          to="/cart"
        >
          <FontAwesomeIcon icon={faShoppingBag} />{" "}
          <sup>
            <small className="badge">{itemTotal()}</small>
          </sup>
        </Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/user/dashboard")}
            to="/user/dashboard"
          >
            <FontAwesomeIcon icon={faClipboardList} />
          </Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/admin/dashboard")}
            to="/admin/dashboard"
          >
            <FontAwesomeIcon icon={faClipboardList} />
          </Link>
        </li>
      )}

      {!isAuthenticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signin")}
              to="/signin"
            >
              <FontAwesomeIcon icon={faSignInAlt} />
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/signup")}
              to="/signup"
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </Link>
          </li>
        </Fragment>
      )}

      {isAuthenticated() && (
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={() =>
              signout(() => {
                history.push("/");
              })
            }
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
          </span>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
