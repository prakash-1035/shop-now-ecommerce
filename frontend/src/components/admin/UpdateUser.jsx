import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../../layout/MetaData";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
    updateUser,
    getUserDetails,
    clearErrors,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

const UpdateUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, isUpdated } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.userDetails);

    const { id: userId } = useParams();

    useEffect(() => {
        // console.log(user && user._id !== userId);
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            toast.success("User updated successfully");

            navigate("/admin/users");

            dispatch({
                type: UPDATE_USER_RESET,
            });
        }
    }, [dispatch, toast, error, navigate, isUpdated, userId, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("role", role);

        dispatch(updateUser(user._id, formData));
    };

    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <Sidebar />

                <div className="col-12 col-lg-9 col-xl-10">
                    <form
                        style={{ maxWidth: "500px", margin: "auto" }}
                        className="myshadow rounded my-4 my-lg-5"
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <h4 className="text-center primary pt-4">
                            Update User Info
                        </h4>
                        <div className="form-group m-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                id="name_field"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                id="email_field"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>

                        <div class="form-group m-3 row">
                            <label
                                for="selectCountry"
                                class="col-6 control-label"
                            >
                                Country
                            </label>
                            <div class="col-6">
                                <select
                                    class="form-select"
                                    name="role"
                                    style={{ maxWidth: "150px" }}
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                    }}
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>
                        </div>
                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-primary my-4 mx-3"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdateUser;
