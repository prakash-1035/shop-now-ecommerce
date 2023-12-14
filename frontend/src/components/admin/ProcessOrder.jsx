import React, { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/loader";
import Sidebar from "./Sidebar";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
    getOrderDetails,
    updateOrder,
    clearErrors,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
    const [status, setStatus] = useState("");

    const dispatch = useDispatch();

    const { loading, order = {} } = useSelector((state) => state.orderDetails);
    const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order;
    const { error, isUpdated } = useSelector((state) => state.order);

    const { id: orderId } = useParams();

    useEffect(() => {
        dispatch(getOrderDetails(orderId));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("Order updated successfully");
            dispatch({ type: UPDATE_ORDER_RESET });
        }
    }, [dispatch, toast, error, isUpdated, orderId]);

    const updateOrderHandler = (id) => {
        const formData = new FormData();
        formData.set("status", status);

        dispatch(updateOrder(id, formData));
    };

    const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;
    const isPaid = true;

    return (
        <Fragment>
            <MetaData title={`Process Order # ${order && order._id}`} />
            <div className="row">
                <Sidebar />

                <div className="col-12 col-lg-9 col-xl-10">
                    <Fragment>
                        {loading ? (
                            <Loader />
                        ) : (
                            <div className="row m-4 d-flex justify-content-around">
                                <div className="col-12 col-lg-7  mt-5">
                                    <h1
                                        className="col-12 mb-3"
                                        style={{
                                            fontWeight: "400",
                                            fontSize: "2rem",
                                        }}
                                    >
                                        Order # {order._id}
                                    </h1>
                                    <hr />

                                    <div className="col-12 border rounded p-3 my-2 myshadow">
                                        <h4 className="">Shipping Info</h4>
                                        <p>
                                            <b>Name: </b> {user && user.name}
                                        </p>
                                        <p>
                                            <b>Phone Number : </b>{" "}
                                            {shippingInfo &&
                                                shippingInfo.phoneNo}
                                        </p>
                                        <p className="">
                                            <b>Address: </b>
                                            {shippingDetails}
                                        </p>
                                        <p>
                                            <b>Amount: </b> ₹{totalPrice}
                                        </p>
                                    </div>

                                    <div className="col-12 border rounded p-3 my-2 myshadow">
                                        <h5 className="my-2">Payment</h5>
                                        <p
                                            className={
                                                isPaid
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                        >
                                            <b>
                                                {isPaid ? "PAID" : "NOT PAID"}
                                            </b>
                                        </p>

                                        <h5 className="my-2">Order Status:</h5>
                                        <p
                                            className={
                                                order.orderStatus &&
                                                String(
                                                    order.orderStatus
                                                ).includes("Delivered")
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                        >
                                            <b>{orderStatus}</b>
                                        </p>
                                    </div>

                                    <div className="col-12 p-3 border rounded my-2 myshadow">
                                        <h4 className="mt-2 text-uppercase fw-normal mb-4">
                                            Order Items:
                                        </h4>

                                        <div className="cart-item my-1">
                                            {orderItems &&
                                                orderItems.map((item) => (
                                                    <div
                                                        key={item.product}
                                                        className="row my-3"
                                                    >
                                                        <div className="col-4 col-lg-2">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                height="45"
                                                                width="65"
                                                            />
                                                        </div>

                                                        <div className="col-5 col-lg-5">
                                                            <Link
                                                                to={`/product/${item.product}`}
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    letterSpacing:
                                                                        "1px",
                                                                }}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </div>

                                                        <div className="col-4 col-lg-2 mt-1 mt-lg-0">
                                                            <p>₹{item.price}</p>
                                                        </div>

                                                        <div className="col-4 col-lg-3 mt-1 mt-lg-0">
                                                            <p>
                                                                {item.quantity}{" "}
                                                                Piece(s)
                                                            </p>
                                                        </div>
                                                        <hr className="mt-2" />
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 mt-5">
                                    <h4 className="my-4">Status</h4>

                                    <div className="form-group">
                                        <select
                                            style={{ maxWidth: "250px" }}
                                            className="form-select"
                                            name="status"
                                            value={status}
                                            onChange={(e) =>
                                                setStatus(e.target.value)
                                            }
                                        >
                                            <option value="Processing">
                                                Processing
                                            </option>
                                            <option value="Shipped">
                                                Shipped
                                            </option>
                                            <option value="Delivered">
                                                Delivered
                                            </option>
                                        </select>
                                    </div>

                                    <button
                                        className="my-3 btn btn-primary btn-block"
                                        onClick={() =>
                                            updateOrderHandler(order._id)
                                        }
                                    >
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ProcessOrder;
