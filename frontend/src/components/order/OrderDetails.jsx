import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import MetaData from "../../layout/MetaData";
import Loader from "../../layout/loader";

import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {
        loading,
        error,
        order = {},
    } = useSelector((state) => state.orderDetails);
    const { shippingInfo, orderItems, user, totalPrice, orderStatus } = order;

    const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

    const isPaid = true;

    useEffect(() => {
        dispatch(getOrderDetails(id));

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, toast, error, id]);

    return (
        <Fragment>
            <MetaData title={"Order Details"} />

            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className="container my-5">
                        <div className="row col-12 mt-5">
                            <h1
                                className="col-12 mb-3"
                                style={{ fontWeight: "400", fontSize: "2rem" }}
                            >
                                Order # {order._id}
                            </h1>
                            <hr />

                            <div className="col-12 col-lg-7 border rounded p-3 my-2 myshadow">
                                <h4 className="">Shipping Info</h4>
                                <p>
                                    <b>Name: </b> {user && user.name}
                                </p>
                                <p>
                                    <b>Phone: </b>{" "}
                                    {shippingInfo && shippingInfo.phoneNo}
                                </p>
                                <p className="">
                                    <b>Address: </b>
                                    {shippingDetails}
                                </p>
                                <p>
                                    <b>Amount: </b> ₹{totalPrice}
                                </p>
                            </div>

                            <div className="col-12 ms-auto col-lg-4 float-right border rounded p-3 my-2 myshadow">
                                <h5 className="my-2">Payment</h5>
                                <p
                                    className={
                                        isPaid ? "text-success" : "text-danger"
                                    }
                                >
                                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                                </p>

                                <h5 className="my-2">Order Status:</h5>
                                <p
                                    className={
                                        order.orderStatus &&
                                        String(order.orderStatus).includes(
                                            "Delivered"
                                        )
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
                                                        {item.quantity} Piece(s)
                                                    </p>
                                                </div>
                                                <hr className="mt-2" />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;
