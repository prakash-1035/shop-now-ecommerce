import React, { Fragment, useEffect, useState } from "react";

import ReactStars from "react-stars";
import Products from "./Products.jsx";
import MetaData from "../../layout/MetaData.jsx";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productActions.js";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";

const Home = () => {
  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const updateFilterPrice = (event) => {
    // let name = event.target.name;
    let value = event.target.value;
    setPrice([0, value]);
  };
  const dispatch = useDispatch();
  const { error, productsCount, resPerPage, filterProductsCount } = useSelector(
    (state) => state.products
  );

  const { keyword } = useParams();
  // console.log(keyword);
  useEffect(() => {
    if (error) {
      return toast.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, currentPage, keyword, price, category, rating]);

  let count = productsCount;
  if (keyword) {
    count = filterProductsCount;
  }

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  return (
    <Fragment>
      <MetaData title={"Buy Best Products"} />
      <div className="home">
        <h1
          style={{
            borderBottom: "2px solid green",
            display: "inline-block",
            margin: "30px",
          }}
        >
          Latest Product{" "}
        </h1>
        <div className="home-box">
          <div className="filter-price border m-4 ">
            <div className="m-4">
              <h3>Price</h3>
              <div>
                <p>₹{price[1]}</p>
                <input
                  type="range"
                  name="price"
                  min={0}
                  max={1000}
                  value={price[1]}
                  onChange={updateFilterPrice}
                />
              </div>
            </div>
            <div className="categories m-4">
              <ul className="p-0">
                <h3>Categories</h3>
                {categories.map((c) => (
                  <li
                    key={c}
                    style={{ listStyle: "none", cursor: "pointer" }}
                    onClick={() => {
                      setCategory(c);
                    }}
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rating m-4">
              <ul className="p-0">
                <h3>Rating</h3>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <li
                    className="d-flex align-items-center py-0 my-0"
                    key={stars}
                    style={{
                      listStyle: "none",
                      cursor: "pointer",
                      height: "30px",
                    }}
                    onClick={() => {
                      setRating(stars);
                    }}
                  >
                    <ReactStars
                      count={5}
                      value={stars}
                      size={20}
                      color2={"#ffd700"}
                      edit={false}
                      half={true}
                      style={{ cursor: "pointer" }}
                    />
                    <p className=" px-1 pt-3">{stars}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Products />
        </div>
      </div>
      {resPerPage < count && (
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={count}
            onChange={setCurrentPageNo}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
