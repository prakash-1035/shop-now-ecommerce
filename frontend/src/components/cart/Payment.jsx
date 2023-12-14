import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";
import toast from "react-hot-toast";
const Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { loading, order, error } = useSelector((state) => state.newOrder);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, toast, error]);

    const new_order = {
        orderItems: cartItems,
        shippingInfo,
    };

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    if (orderInfo) {
        new_order.itemsPrice = orderInfo.itemsPrice;
        new_order.shippingPrice = orderInfo.shippingPrice;
        new_order.taxPrice = orderInfo.taxPrice;
        new_order.totalPrice = orderInfo.totalPrice;
    }
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("new order = ", new_order);
        dispatch(createOrder(new_order));
        if (error) {
            toast.error(error);
        } else {
            localStorage.removeItem("cartItems");
            toast.success("your order placed successfully");
            navigate("/");
        }
    };

    return (
        <Fragment>
            <MetaData title={"Payment - "} />
            <div className="container-lg h-auto d-flex justify-content-center align-items-center">
                <div className="col-12 col-lg-8 col-xl-6 m-auto">
                    <form
                        className="pt-4 m-5 myshadow rounded pb-2"
                        onSubmit={submitHandler}
                    >
                        <div className="form-group d-flex flex-column align-items-center justify-content-center login-profile">
                            <h3 className="mt-2">Payment </h3>
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="exampleInputEmail1">
                                Card Info
                            </label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="Enter Card Info"
                                onChange={(e) => {}}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="exampleInputEmail1">
                                Expire Date
                            </label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                onChange={(e) => {}}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="exampleInputEmail1">CVV</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                onChange={(e) => {}}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary my-2 mx-3"
                            disabled={loading ? true : false}
                        >
                            Pay ₹{orderInfo.totalPrice}
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Payment;
