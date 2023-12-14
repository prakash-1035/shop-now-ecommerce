import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div
            className="col-12 col-lg-3 col-xl-2 d-flex flex-column flex-shrink-0 p-3 bg-secondary-subtle "
            style={{ borderRadius: "0 4px 0 0" }}
        >
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <Link to="/" className="nav-link link-dark">
                        <i className="bi bi-house-door pe-2 fs-5"></i>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard" className="nav-link link-dark">
                        <i className="bi bi-speedometer2 pe-2 fs-5"></i>
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        className="d-flex align-items-center btn btn-toggle dropdown-toggle rounded collapsed ms-1"
                        data-bs-toggle="collapse"
                        data-bs-target="#orders-collapse"
                        aria-expanded="true"
                    >
                        <i className="bi bi-list-ul pe-2 fs-5"></i>Products
                    </Link>
                    <div className="collapse" id="orders-collapse">
                        <ul className=" list-unstyled fw-normal pb-1 ms-4 small">
                            <li>
                                <Link
                                    to="/admin/products"
                                    href="#"
                                    className="nav-link link-dark rounded"
                                    style={{ backgroundColor: "#ddd" }}
                                >
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/admin/product"
                                    className="nav-link link-dark rounded"
                                    style={{ backgroundColor: "#ddd" }}
                                >
                                    Create +
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
                <li>
                    <Link to="/admin/orders" className="nav-link link-dark">
                        <i className="bi bi-grid pe-2 fs-5"></i>
                        Orders
                    </Link>
                </li>
                <li>
                    <Link to="/admin/users" className="nav-link link-dark ">
                        <i className="bi bi-people pe-2 fs-5"></i>
                        Users
                    </Link>
                </li>
                <li>
                    <Link to="/admin/reviews" className="nav-link link-dark ">
                        <i className="bi bi-star pe-2 fs-5"></i>
                        Reviews
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
