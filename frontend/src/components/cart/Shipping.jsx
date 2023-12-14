import React, { Fragment, useState } from "react";
import { countries } from "countries-list";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartActions";

const Shipping = () => {
    const countriesList = Object.values(countries);

    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [postalCode, setPostalCode] = useState("");
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [country, setCountry] = useState(shippingInfo.country);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (!address || !city || postalCode === "" || !country || !phoneNo) {
            toast.error("Please fill all the required Fields");
            return;
        }

        dispatch(
            saveShippingInfo({ address, city, postalCode, phoneNo, country })
        );
        navigate("/confirm/order");
    };

    return (
        <Fragment>
            <MetaData title={"Shipping Info"} />
            <div className="container-lg h-auto d-flex justify-content-center align-items-center">
                <div className="col-12 col-sm-10 col-lg-8 col-xl-6 m-auto">
                    <form
                        className="m-5 myshadow rounded pt-4 pb-2"
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <h4 className="text-center primary">
                            Shipping Address
                        </h4>
                        <div className="form-group m-3">
                            <label htmlFor="address">
                                Address
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                id="address"
                                placeholder="Enter your address..."
                                name="address"
                                required
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="city">
                                City
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                id="city"
                                placeholder="Enter city name..."
                                name="city"
                                required
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="phone">
                                Phone Number
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                id="phone"
                                placeholder="Enter phone number..."
                                name="phone"
                                required
                                value={phoneNo}
                                onChange={(e) => {
                                    setPhoneNo(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="pcode">
                                Postel Code
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                id="pcode"
                                placeholder="Enter postel code..."
                                name="pcode"
                                required
                                value={postalCode}
                                onChange={(e) => {
                                    setPostalCode(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label
                                htmlFor="selectCountry"
                                className="col-sm-2 control-label"
                            >
                                Country
                                <span className="ms-1 text-danger">*</span>
                            </label>
                            <div className="col-sm-10">
                                <select
                                    className="form-control"
                                    id="selectCountry"
                                    name="country"
                                    required
                                    value={country}
                                    onChange={(e) => {
                                        setCountry(e.target.value);
                                    }}
                                >
                                    {countriesList.map((country) => (
                                        <option
                                            key={country.name}
                                            value={country.name}
                                        >
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-primary my-2 mx-3"
                            onClick={submitHandler}
                        >
                            Checkout
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;
