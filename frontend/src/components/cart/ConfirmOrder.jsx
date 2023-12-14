import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../../layout/MetaData";

import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ConfirmOrder = () => {
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    // console.log(cartItems);
    const navigate = useNavigate();
    const itemsPrice = cartItems.reduce(
        (acc, item) => acc + Number(item.quantity * item.price),
        Number(0)
    );
    const shippingPrice = itemsPrice > 100 ? 0 : 25;
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    console.log(itemsPrice);

    const processToPayment = () => {
        const data = {
            itemsPrice: Number(itemsPrice.toFixed(2)),
            shippingPrice,
            taxPrice,
            totalPrice: Number(totalPrice),
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/payment");
    };

    return (
        <Fragment>
            <MetaData title={"Confirm Order"} />

            <section className="bg-light my-5">
                <div className="container">
                    <div className="row">
                        {/* <!-- cart --> */}
                        <h4 className="title mb-4">Confirm Your Order</h4>
                        <div className="col-lg-9">
                            <div className="card border shadow-0">
                                <div className="m-4">
                                    {cartItems.map((item) => (
                                        <CartItem
                                            key={item.product}
                                            item={item}
                                        />
                                    ))}
                                </div>

                                <div className="border-top pt-4 mx-4 mb-4">
                                    <p className="h6">Shipping Info :</p>
                                    <p className=" mb-0 pb-0 text-muted">
                                        {user && user.name}
                                    </p>
                                    <p className=" mb-0 pb-0 text-muted">
                                        Phone No. - {shippingInfo.phoneNo}
                                    </p>
                                    <p className="text-muted">
                                        {`${shippingInfo.address}, ${shippingInfo.postalCode}, ${shippingInfo.city}, (${shippingInfo.country})`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* <!-- cart --> */}
                        {/* <!-- summary --> */}
                        <div className="col-lg-3 mt-4 mt-lg-0">
                            <div className="card shadow-0 border">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">SubTotal Price:</p>
                                        <p className="mb-2">{itemsPrice}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">
                                            Shipping Charges:
                                        </p>
                                        <p className="mb-2 text-muted">
                                        ₹{shippingPrice}
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Tax :</p>
                                        <p className="mb-2 text-muted">
                                        ₹{taxPrice}
                                        </p>
                                    </div>

                                    <hr />
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-2">Total price:</p>
                                        <p className="mb-2 fw-bold">
                                        ₹{totalPrice}
                                        </p>
                                    </div>

                                    <div className="mt-3">
                                        <a
                                            className="btn btn-success w-100 shadow-0 mb-2"
                                            onClick={processToPayment}
                                        >
                                            Proceed To Payment
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- summary --> */}
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

const CartItem = ({ item }) => {
    return (
        <div className="row gy-3 mb-4">
            <div className="col-sm-7">
                <div className="me-lg-5">
                    <div className="d-flex">
                        <img
                            src={item.image}
                            className="border rounded me-3"
                            style={{
                                width: "96px",
                                height: "fit-content",
                            }}
                        />
                        <div className="">
                            <Link
                                to={`/product/${item.product}`}
                                className="nav-link"
                            >
                                {item.name}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-5 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                <div className="">
                    <span className="h6">
                        {`${item.quantity} unit x ₹${item.price} = ₹${(
                            item.price * item.quantity
                        ).toFixed(2)}`}
                    </span>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default ConfirmOrder;
