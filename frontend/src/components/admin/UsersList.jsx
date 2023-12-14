import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/loader";
import Sidebar from "./Sidebar";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, deleteUser, clearErrors } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, users } = useSelector((state) => state.allUsers);
    const { isDeleted } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("User deleted successfully");
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }
    }, [dispatch, toast, error, navigate, isDeleted]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: "User ID",
                    field: "id",
                    sort: "asc",
                },
                {
                    label: "Name",
                    field: "name",
                    sort: "asc",
                },
                {
                    label: "Email",
                    field: "email",
                    sort: "asc",
                },
                {
                    label: "Role",
                    field: "role",
                    sort: "asc",
                },
                {
                    label: "Actions",
                    field: "actions",
                },
            ],
            rows: [],
        };

        users.forEach((user) => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,

                actions: (
                    <Fragment>
                        <Link
                            to={`/admin/user/${user._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="bi bi-pencil"></i>
                        </Link>
                        <button
                            disabled={loading ? true : false}
                            className="ms-1 btn btn-danger py-1 px-2 ml-2"
                            onClick={() => deleteUserHandler(user._id)}
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </Fragment>
                ),
            });
        });

        return data;
    };

    return (
        <Fragment>
            <MetaData title={"All Users"} />
            <div className="row">
                <Sidebar />

                <div className="col-12 col-lg-9 col-xl-10">
                    <div className="m-3">
                        <Fragment>
                            <h1 className="my-5 ms-3">All Users</h1>

                            {loading ? (
                                <Loader />
                            ) : (
                                <MDBDataTable
                                    data={setUsers()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover
                                />
                            )}
                        </Fragment>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UsersList;
