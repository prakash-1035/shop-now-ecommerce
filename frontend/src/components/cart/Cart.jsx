import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import MetaData from "../../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const Cart = () => {
    // const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    return (
        <Fragment>
            <MetaData title="Your Cart" />
            {cartItems.length === 0 ? (
                <h3 className="ms-4 mt-4 vh-100">Your Cart is Empty</h3>
            ) : (
                <section className="bg-light my-5">
                    <div className="container">
                        <div className="row">
                            {/* <!-- cart --> */}
                            <div className="col-lg-9">
                                <div className="card border shadow-0">
                                    <div className="m-4">
                                        <h4 className="card-title mb-4">
                                            Your Cart : {cartItems?.length}{" "}
                                            items
                                        </h4>
                                        {cartItems.map((item) => (
                                            <CartItem
                                                key={item.product}
                                                item={item}
                                            />
                                        ))}
                                    </div>

                                    <div className="border-top pt-4 mx-4 mb-4">
                                        <p>
                                            <i className="fas fa-truck text-muted fa-lg"></i>{" "}
                                            Free Delivery within 1-2 weeks
                                        </p>
                                        <p className="text-muted">
                                            Lorem ipsum dolor sit amet,
                                            consectetur adipisicing elit, sed do
                                            eiusmod tempor incididunt ut labore
                                            et dolore magna aliqua. Ut enim ad
                                            minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut
                                            aliquip
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card mb-3 border shadow-0">
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label className="form-label">
                                                    Have coupon?
                                                </label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control border"
                                                        name=""
                                                        placeholder="Coupon code"
                                                    />
                                                    <button
                                                        className="btn btn-light border"
                                                        disabled={true}
                                                    >
                                                        Apply
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card mb-3 border shadow-0">
                                    <div className="card-body">
                                        <span className="me-2">
                                            Total Items :
                                        </span>
                                        {cartItems.reduce(
                                            (acc, item) =>
                                                acc + Number(item.quantity),
                                            0
                                        )}
                                    </div>
                                </div>

                                <div className="card shadow-0 border">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">
                                                Subtotal price:
                                            </p>
                                            <p className="mb-2">
                                                ₹
                                                {cartItems.reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        Number(
                                                            item.price *
                                                                item.quantity
                                                        ),
                                                    Number(0)
                                                )}
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Discount:</p>
                                            <p className="mb-2 text-success">
                                            ₹{0}
                                            </p>
                                        </div>

                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-2">Total price:</p>
                                            <p className="mb-2 fw-bold">
                                                ₹
                                                {cartItems.reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        Number(
                                                            item.price *
                                                                item.quantity
                                                        ),
                                                    Number(0)
                                                )}
                                            </p>
                                        </div>

                                        <div className="mt-3">
                                            <Link
                                                to="/shipping"
                                                className="btn btn-success w-100 shadow-0 mb-2"
                                                // onClick={checkOutHandler}
                                            >
                                                Checkout
                                            </Link>
                                            <Link
                                                to={"/"}
                                                className="btn btn-light w-100 border mt-2"
                                            >
                                                {" "}
                                                Back to shop{" "}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- summary --> */}
                        </div>
                    </div>
                </section>
            )}
        </Fragment>
    );
};

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(item.price * item.quantity);

    const increaseQty = () => {
        let qty = item.quantity;
        if (qty >= item?.stock) return;
        qty += 1;

        dispatch(addItemToCart(item.product, qty));
        setTotalPrice(item.price * item.quantity);
    };
    const decreaseQty = () => {
        let qty = item.quantity;
        if (qty <= 1) return;
        qty -= 1;
        dispatch(addItemToCart(item.product, qty));
        setTotalPrice(item.price * item.quantity);
    };
    const removeItemHandler = () => {
        dispatch(removeItemFromCart(item.product));
    };
    return (
        <div className="row gy-3 mb-4">
            <div className="col-lg-5">
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
                                {item?.name.substring(0, 20) + "..."}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                <div className="input-group mb-2" style={{ width: "150px" }}>
                    <button
                        className="px-2 btn btn-outline-danger border border-secondary"
                        type="button"
                        style={{ height: "40px" }}
                        data-mdb-ripple-color="dark"
                        onClick={decreaseQty}
                    >
                        -
                    </button>
                    <input
                        type="text"
                        style={{
                            width: "40px",
                            height: "40px",
                        }}
                        className="text-center border border-secondary"
                        value={item.quantity}
                        readOnly
                    />
                    <button
                        className="btn btn-outline-success border border-secondary"
                        type="button"
                        style={{
                            padding: "0 6px",
                            height: "40px",
                        }}
                        data-mdb-ripple-color="dark"
                        onClick={increaseQty}
                    >
                        +
                    </button>
                </div>
                <div className="">
                    <span className="h6">₹{totalPrice.toFixed(2)}</span> <br />
                    <small className="text-muted text-nowrap">
                        {" "}
                        ₹{item.price} / per item{" "}
                    </small>
                </div>
            </div>
            <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                <div className="float-md-end">
                    <a
                        href="#"
                        className="btn btn-light border text-danger icon-hover-danger"
                        onClick={removeItemHandler}
                    >
                        <i className="bi bi-trash"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Cart;
