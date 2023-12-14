import React, { Fragment, useState, useEffect } from "react";
import toast from "react-hot-toast";

import MetaData from "../../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import { updatePassword, clearErrors } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isUpdated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("user updated successfully");
            navigate("/me");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, navigate, error, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("oldPassword", oldPassword);
        formData.set("newPassword", newPassword);

        dispatch(updatePassword(formData));
    };

    return (
        <Fragment>
            <MetaData title={"Register"} />
            <div className="container-lg h-auto d-flex justify-content-center align-items-center">
                <div className="col-12 col-sm-10 col-lg-8 col-xl-6 m-auto">
                    <form
                        className="pt-4 m-5 myshadow rounded"
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <h4 className="text-center primary">
                            Update Your Password
                        </h4>

                        <div className="form-group m-3">
                            <label htmlFor="exampleInputPassword1">
                                Old Password
                            </label>
                            <input
                                type="password"
                                className="form-control mt-1 mb-2"
                                id="exampleInputPassword1"
                                placeholder="old one..."
                                value={oldPassword}
                                onChange={(e) => {
                                    setOldPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="exampleInputPassword1">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="form-control mt-1 mb-2"
                                id="exampleInputPassword1"
                                placeholder="new one..."
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-primary my-2 mx-3"
                            disabled={loading ? true : false}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdatePassword;
