import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../../layout/MetaData";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newProduct, clearErrors } from "../../actions/productActions";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";

const NewProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Clothes/Shoe");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
    ];

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector(
        (state) => state.newProduct
    );

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            navigate("/admin/products");
            toast.success("Product created successfully");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [dispatch, error, success, navigate, toast]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (
            name.length === 0 ||
            price.length === 0 ||
            description.length === 0 ||
            category.length === 0 ||
            stock.length === 0 ||
            seller.length === 0 ||
            images.length === 0
        ) {
            alert("all fields are required");
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("price", price);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("stock", stock);
        formData.set("seller", seller);
        formData.set("images", JSON.stringify(images));

        dispatch(newProduct(formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [
                        ...oldArray,
                        reader.result,
                    ]);
                    setImages((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="New Product" />
            <div className="row">
                <Sidebar />

                <div className="col-12 col-lg-9 col-xl-10">
                    <form
                        className="p-4 m-5 myshadow rounded"
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <h4 className="text-center primary">
                            Details of New Product
                        </h4>
                        <div className="form-group m-3">
                            <label className="h6" htmlFor="name">
                                Name
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control mt-1"
                                id="name_field"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label className="h6" htmlFor="name">
                                Price
                            </label>
                            <input
                                required
                                type="text"
                                className="form-control mt-1"
                                id="price_field"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label className="h6 " htmlFor="category_field">
                                Category
                            </label>
                            <select
                                required
                                className="form-select"
                                id="category_field"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group m-3">
                            <label className="h6" htmlFor="description_field">
                                Description
                            </label>
                            <textarea
                                required
                                className="form-control"
                                id="description_field"
                                rows="8"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="form-group m-3">
                            <label className="h6" htmlFor="stock_field">
                                Stock
                            </label>
                            <input
                                required
                                type="number"
                                id="stock_field"
                                className="form-control"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label className="h6" htmlFor="seller_field">
                                Seller Name
                            </label>
                            <input
                                required
                                type="text"
                                id="seller_field"
                                className="form-control"
                                value={seller}
                                onChange={(e) => setSeller(e.target.value)}
                            />
                        </div>
                        <div className="form-group mx-4 my-4">
                            <label className="h6">Images</label>

                            <div
                                className="custom-file border rounded"
                                style={{ maxWidth: "500px" }}
                            >
                                <input
                                    required
                                    type="file"
                                    name="product_images"
                                    className="custom-file-input"
                                    id="customFile"
                                    onChange={onChange}
                                    multiple
                                />
                                <label
                                    className="custom-file-label"
                                    htmlFor="customFile"
                                >
                                    Choose Images
                                </label>
                            </div>

                            {imagesPreview.map((img) => (
                                <img
                                    src={img}
                                    key={img}
                                    alt="Images Preview"
                                    className="mt-3 mr-2"
                                    width="55"
                                    height="52"
                                />
                            ))}
                        </div>

                        <button
                            id="submit_button"
                            type="submit"
                            className="btn btn-primary my-2 mx-3"
                            disabled={loading ? true : false}
                        >
                            CREATE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
