import React, { Fragment } from "react";
import ReactStars from "react-stars";

const ListReviews = ({ reviews }) => {
    return (
        <div className="container my-5 py-5">
            <div className="row d-flex">
                <div className="col-md-12 col-lg-10">
                    <div className="card text-dark">
                        <div className="card-body p-4">
                            <h4 className="mb-0">All Comments</h4>
                            <hr className="mt-3 mb-0" />
                        </div>

                        {reviews.map((review,i) => (
                            <Fragment key={i}>
                                <div className="card-body p-4">
                                    <div className="d-flex flex-start">
                                        <div>
                                            <ReactStars
                                                count={5}
                                                size={30}
                                                edit={false}
                                                color2={"#ffd700"}
                                                value={review.rating}
                                            />
                                            <h6
                                                className="fw-normal mb-1"
                                                style={{ fontSize: "small" }}
                                            >
                                                - by {review.name}
                                            </h6>
                                            <p className="fw-bold mb-0 mt-3">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-0" />
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListReviews;
