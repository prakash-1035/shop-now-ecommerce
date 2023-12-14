import React, { Fragment, useState, useEffect } from "react";
import toast from "react-hot-toast";

import MetaData from "../../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { newPassword, clearErrors, loadUser } from "../../actions/userActions";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { token } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, success, loading } = useSelector(
        (state) => state.forgotPassword
    );

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success("password reset successfully");
            dispatch(loadUser());
            navigate("/");
        }
    }, [dispatch, navigate, error, success]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("password", password);
        formData.set("confirmPassword", confirmPassword);

        dispatch(newPassword(token, formData));
    };

    return (
        <Fragment>
            <MetaData title={"Register"} />
            <div
                className="container-lg h-auto d-flex justify-content-center align-items-center"
                style={{ minHeight: "60vh" }}
            >
                <div className="col-12 col-sm-10 col-lg-8 col-xl-6 m-auto">
                    <form
                        className="pt-4 m-5 myshadow rounded"
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <h4 className="text-center primary">
                            Reset Your Password
                        </h4>

                        <div className="form-group m-3">
                            <label htmlFor="exampleInputPassword1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control mt-1 mb-2"
                                id="exampleInputPassword1"
                                placeholder="Enter Password Here..."
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="exampleInputPassword1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                className="form-control mt-1 mb-2"
                                id="exampleInputPassword1"
                                placeholder="Confirm Your Password..."
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-primary mt-2 mb-3 mx-3"
                            disabled={loading ? true : false}
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewPassword;
