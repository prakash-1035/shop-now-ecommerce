import React, { Fragment, useState, useEffect } from "react";
import toast from "react-hot-toast";

import MetaData from "../../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";

import {
    updateProfile,
    loadUser,
    clearErrors,
} from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_user_img.png"
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { error, isUpdated, loading } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success("user updated successfully");
            dispatch(loadUser());

            navigate("/me");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, navigate, user, error, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("avatar", avatar);

        dispatch(updateProfile(formData));
    };

    const onChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
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
                            Update Your Profile
                        </h4>
                        <div className="form-group m-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                id="name"
                                placeholder="Enter Name"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>

                        <div className="form-group m-3">
                            <label htmlFor=" avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center border rounded">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img
                                            style={{
                                                height: "75px",
                                                padding: "5px",
                                                margin: "5px",
                                            }}
                                            src={avatarPreview}
                                            className="rounded-circle"
                                            alt="Avatar Preview"
                                        />
                                    </figure>
                                </div>
                                <div className="p-2 custom-file border col-9">
                                    <input
                                        style={{ overflowX: "hidden" }}
                                        type="file"
                                        name="avatar"
                                        className="custom-file-input"
                                        id="customFile"
                                        accept="images/*"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
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

export default UpdateProfile;
