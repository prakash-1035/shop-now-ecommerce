import React, { Fragment, useState, useEffect } from "react";
import toast from "react-hot-toast";

import MetaData from "../../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { forgotPassword, clearErrors } from "../../actions/userActions";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();
    const { error, loading, message } = useSelector(
        (state) => state.forgotPassword
    );

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            toast.success(message);
        }
    }, [dispatch, error, message]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("email", email);

        dispatch(forgotPassword(formData));
    };

    return (
        <Fragment>
            <MetaData title={"Register"} />
            <div
                className="container-lg h-auto d-flex justify-content-center align-items-center"
                style={{ minHeight: "70vh" }}
            >
                <div className="col-12 col-sm-10 col-lg-8 col-xl-6 m-auto">
                    <form
                        className="pt-4 m-5 myshadow rounded"
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <h4 className="text-center primary">Forgot Password</h4>

                        <div className="form-group m-3">
                            <label htmlFor="exampleInputEmail1">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <p className="mt-2 text-warning">
                                Note: we will send you a reset link on Your
                                Registered email. you have to paste the link
                                into browser and reset you password.
                            </p>
                        </div>
                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-primary mt-2 mb-3 mx-3"
                            disabled={loading ? true : false}
                        >
                            Send Reset Link
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default ForgotPassword;
