import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../../layout/loader";
import MetaData from "../../layout/MetaData";

const Profile = () => {
    const { user, loading } = useSelector((state) => state.auth);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title={"Profile"} />
                    <div class="container myshadow rounded bg-white mt-5 mb-5">
                        <div class="row rounded">
                            <div class="col-md-5 border-right">
                                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                    <img
                                        class="rounded-circle mt-5"
                                        width="150px"
                                        src={user?.avatar?.url}
                                        alt={`${user?.name} profile pic`}
                                    />
                                    <Link
                                        to="/me/update"
                                        class="m-3 btn btn-primary edit-btn profile-button"
                                        type="button"
                                    >
                                        Edit Profile
                                    </Link>
                                    <span> </span>
                                </div>
                            </div>
                            <div class="col-md-7 border-right">
                                <div class="p-3 py-5">
                                    <div class="d-flex justify-content-between align-items-center mb-3">
                                        <h4 class="text-right">
                                            Profile Settings
                                        </h4>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-md-12">
                                            <h5 className="text-secondary">
                                                Name
                                            </h5>
                                            <p>{user?.name}</p>
                                        </div>
                                        <div class="col-md-12">
                                            <h5 className="text-secondary">
                                                Email
                                            </h5>
                                            <p>{user?.email}</p>
                                        </div>
                                        <div class="col-md-12">
                                            <h5 className="text-secondary">
                                                Joined At
                                            </h5>
                                            <p>
                                                {String(
                                                    user?.createdAt
                                                ).substring(0, 10)}
                                            </p>
                                        </div>
                                    </div>

                                    <div class="mt-5">
                                        {user?.role !== "admin" && (
                                            <Link
                                                to="/orders/me"
                                                class="m-3 btn btn-primary profile-button"
                                                type="button"
                                            >
                                                My Order
                                            </Link>
                                        )}
                                        <Link
                                            to="/password/update"
                                            class="m-3 btn btn-primary profile-button"
                                            type="button"
                                        >
                                            Change Password
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Profile;
