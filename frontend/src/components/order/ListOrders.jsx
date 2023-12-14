import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/loader";

import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";

const ListOrders = () => {
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, toast, error]);

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Num of Items",
                    field: "numOfItems",
                    sort: "asc",
                },
                {
                    label: "Amount",
                    field: "amount",
                    sort: "asc",
                },
                {
                    label: "Status",
                    field: "status",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc",
                },
            ],
            rows: [],
        };

        orders.forEach((order) => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `₹${order.totalPrice}`,
                status:
                    order.orderStatus &&
                    String(order.orderStatus).includes("Delivered") ? (
                        <p style={{ color: "green" }}>{order.orderStatus}</p>
                    ) : (
                        <p style={{ color: "red" }}>{order.orderStatus}</p>
                    ),
                actions: (
                    <Link
                        to={`/orders/${order._id}`}
                        className="btn btn-primary"
                    >
                        <i className="bi bi-eye"></i>
                    </Link>
                ),
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={"My Orders"} />

            <div className="container mb-4">
                <h1 className="my-4 ms-3">My Orders</h1>

                {loading ? (
                    <Loader />
                ) : (
                    <MDBDataTable
                        data={setOrders()}
                        className="px-0"
                        bordered
                        striped
                        hover
                    />
                )}
            </div>
        </Fragment>
    );
};

export default ListOrders;
