import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import Loader from "../../layout/loader";
import MetaData from "../../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userActions";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth
    );

    const submitHandler = (e) => {
        e.preventDefault();
        // console.log(email, password);
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
    }, [navigate, error, dispatch, isAuthenticated]);

    return loading ? (
        <Loader />
    ) : (
        <Fragment>
            <MetaData title={"Login"} />
            <div className="container-lg h-auto d-flex justify-content-center align-items-center">
                <div className="col-12 col-lg-8 col-xl-6 m-auto">
                    <form
                        className="pt-4 m-5 myshadow rounded pb-2"
                        onSubmit={submitHandler}
                    >
                        <div className="form-group d-flex flex-column align-items-center justify-content-center login-profile">
                            <AiOutlineUser />
                            <h3 className="mt-2">Login to ShopNow</h3>
                        </div>
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
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="exampleInputPassword1">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control mt-1 mb-2"
                                id="exampleInputPassword1"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <Link to="/password/forgot" className="small">
                                Forgot Password
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary my-2 mx-3"
                        >
                            Login
                        </button>
                        <div className="form-group mx-3 mt-1">
                            <p>
                                don't have an Account{" "}
                                <Link to="/register">Sign Up</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
