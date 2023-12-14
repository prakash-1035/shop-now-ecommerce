import { combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
    productsReducer,
    productDetailsReducer,
    newReviewReducer,
    productReducer,
    newProductReducer,
    productReviewsReducer,
    reviewReducer,
} from "./reducers/productReducer";

import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,
} from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducer";
import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    allOrdersReducer,
    orderReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    newReview: newReviewReducer,
    product: productReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    allOrders: allOrdersReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [thunk],
    devTools: composeWithDevTools(applyMiddleware(thunk)),
});

export default store;
