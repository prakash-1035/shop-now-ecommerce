import React from "react";
import ReactStars from "react-stars";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../../layout/loader";

const Products = () => {
    const { products, loading, error, productCount } = useSelector(
        (state) => state.products
    );
    // console.log(products);
    // console.log(loading);
    // console.log(error);
    // console.log(productCount);

    return (
        <div className="mt-4">
            {loading ? (
                <Loader />
            ) : (
                <div className="row">
                    {products?.map((product, i) => {
                        return (
                            <ProductCard
                                id={product._id}
                                key={product._id}
                                imgSrc={product.images[0].url}
                                title={product.name}
                                rating={product.ratings}
                                noOfReview={product.numOfReviews}
                                price={product.price}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const ProductCard = ({ id, imgSrc, title, rating, noOfReview, price }) => {
    return (
        <div className="card my-3 mx-auto" style={{ width: "18rem" }}>
            <img src={imgSrc} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">
                    <Link className="link-dark " to={`/product/${id}`}>
                        {title}
                    </Link>
                </h5>
                <div className="d-flex align-items-center">
                    <ReactStars
                        count={5}
                        value={Number(rating)}
                        size={20}
                        color2={"#ffd700"}
                        edit={false}
                        half={true}
                    />
                    <span className="ms-1 text-muted">
                        ({noOfReview} Reviews)
                    </span>
                </div>
                <p className="card-text">₹{price}</p>

                <Link to={`/product/${id}`} className="btn btn-primary">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default Products;
