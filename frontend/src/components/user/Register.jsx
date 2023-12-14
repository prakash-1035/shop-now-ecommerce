import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MetaData from "../../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../actions/userActions";

const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "/images/default_user_img.png"
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, navigate, isAuthenticated, error]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password.length<6){
            toast.error("password must be more then 6 charchter");
            return;
        }
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("avatar", avatar);

        dispatch(register(formData));
    };

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };
    return (
        <Fragment>
            <MetaData title={"Register - ShopNow"} />
            <div className="container-lg h-auto d-flex justify-content-center align-items-center">
                <div className="col-12 col-sm-10 col-lg-8 col-xl-6 m-auto">
                    <form
                        className="m-5 myshadow rounded pt-4 pb-2"
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <h4 className="text-center primary">
                            Register to ShopNow
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
                                onChange={onChange}
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
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control mt-1 mb-2"
                                id="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChange}
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
                            Register
                        </button>
                        <div className="form-group mx-3 mt-1">
                            <p className="">
                                Already have an Account{" "}
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Register;
