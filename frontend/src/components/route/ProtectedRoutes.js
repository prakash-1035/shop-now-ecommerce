import React ,{Fragment} from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { isAuthenticated , loading} = useSelector(
        (state) => state.auth
    );
    // console.log("calling protected routes");
    return(
        <Fragment>
        {loading===false && (
            (isAuthenticated) ? <Outlet/> :<Navigate to="/login"/>
        )}

        </Fragment>
    )
}

export default ProtectedRoutes