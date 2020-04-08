import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { Link, withRouter } from "react-router-dom";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";

import { faMale, faFemale, faTshirt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import syd_chase from "../images/home/syd_chase.jpg";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  // initalize w/ t001 instead to fix bug
  const [curTop, setTop] = useState(localStorage.getItem("topSelected"));
  // initalize w/ b001 instead to fix bug
  const [curBottom, setBottom] = useState(
    localStorage.getItem("bottomSelected")
  );
  const [curOutfit, setOutfit] = useState("");
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [catDropDown, setCatDropDown] = useState(false);
  const [priceDropDown, setPriceDropDown] = useState(false);

  //const outfit = require(`../images/home/${curTop}${curBottom}.jpg`);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = newFilters => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-secondary mb-5">
          Load more
        </button>
      )
    );
  };

  /*const outfitBox = () => {
    return (
      <img
        src={outfit}
        class="rounded mx-auto d-block mb-5 mt-5"
        alt="..."
        style={{ width: "250px" }}
      />
    );
  }; */

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  /*useEffect(() => {
    setTop(localStorage.getItem("topSelected"));
    setBottom(localStorage.getItem("bottomSelected"));
    setOutfit({ outfit });
  }); */

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = value => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  function toggleDropDownState(currDrop) {
    return currDrop ? false : true;
  }

  return (
    <Layout
      title="Shop Page"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <div className="row" style={{ marginTop: "80px" }}>
        <div className="col-md-4">
          <h1 className="shopLeftNav">Shop</h1>
          <br />
          {/*outfitBox()*/}
          <button
            type="button"
            class="btn btn-light col-md buttonText mainButton"
            onClick={() => setCatDropDown(toggleDropDownState(catDropDown))}
          >
            Filter
          </button>
          <ul>
            {catDropDown ? (
              <Checkbox
                categories={categories}
                handleFilters={filters => handleFilters(filters, "category")}
              />
            ) : null}
          </ul>
        </div>

        <div className="col-md">
          <div className="row">
            {filteredResults.map((product, i) => (
              <div key={i} className="col-sm mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
