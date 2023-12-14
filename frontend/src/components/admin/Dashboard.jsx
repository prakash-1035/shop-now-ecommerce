import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { allUsers } from "../../actions/userActions";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const { orders, totalAmount, loading } = useSelector(
        (state) => state.allOrders
    );
    const { users } = useSelector((state) => state.allUsers);

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(allOrders());
        dispatch(allUsers());
    }, [dispatch]);
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <div className="col-12 col-lg-9 col-xl-10">
                    <div className="row">
                        <div className="col-12">
                            <div className="card my-3 me-4 bg-primary-subtle">
                                <div className="card-body">
                                    <h5 className="card-title">Total Amount</h5>
                                    <p className="card-text">
                                        ₹{totalAmount && totalAmount.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="card my-2 bg-success-subtle">
                                    <div className="card-body">
                                        <h5 className="card-title">Products</h5>
                                        <p className="card-text">
                                            Total :{" "}
                                            <span className="ms-2 h6">
                                                {products && products.length}
                                            </span>
                                        </p>
                                        <Link
                                            to="/admin/products"
                                            className="btn btn-primary"
                                        >
                                            View{" "}
                                            <i className="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="card my-2 bg-warning-subtle">
                                    <div className="card-body">
                                        <h5 className="card-title">Orders</h5>
                                        <p className="card-text">
                                            Total: {orders && orders.length}
                                        </p>
                                        <Link
                                            to="/admin/orders"
                                            className="btn btn-primary"
                                        >
                                            View{" "}
                                            <i className="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="card my-2 bg-info-subtle">
                                    <div className="card-body">
                                        <h5 className="card-title">Users</h5>
                                        <p className="card-text">
                                            Total :
                                            <b className="ms-1">
                                                {users?.length}
                                            </b>
                                        </p>
                                        <Link
                                            to="/admin/users"
                                            className="btn btn-primary"
                                        >
                                            View{" "}
                                            <i className="bi bi-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4 col-xl-3">
                                <div className="card my-2 bg-danger-subtle">
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            Special title treatment
                                        </h5>
                                        <p className="card-text">
                                            With supporting text below as a
                                            natural lead-in to additional
                                            content.
                                        </p>
                                        <a href="#" className="btn btn-primary">
                                            View{" "}
                                            <i className="bi bi-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
