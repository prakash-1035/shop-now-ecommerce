import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/loader";
import Sidebar from "./Sidebar";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
    getAdminProducts,
    deleteProduct,
    clearErrors,
} from "../../actions/productActions";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("Product deleted successfully");
            navigate("/admin/products");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    }, [dispatch, deleteError, isDeleted, error, toast]);

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Price",
                    field: "price",
                    sort: "asc",
                },
                {
                    label: "Stock",
                    field: "stock",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                },
            ],
            rows: [],
        };

        products.forEach((product) => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `₹${product.price}`,
                stock: product.stock,
                actions: (
                    <Fragment>
                        <Link
                            to={`/admin/product/${product._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                            className="btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteProductHandler(product._id)}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };

    return (
        <Fragment>
            <MetaData title={"All Products"} />
            <div className="row">
                <Sidebar />

                <div className="col-12 col-lg-9 col-xl-10 p-4">
                    <Fragment>
                        <h1 className="my-5 ms-3">All Products</h1>

                        {loading ? (
                            <Loader />
                        ) : (
                            <MDBDataTable
                                data={setProducts()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </Fragment>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductList;
