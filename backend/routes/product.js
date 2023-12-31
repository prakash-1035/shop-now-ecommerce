const express = require("express");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const {
    newProduct,
    getProducts,
    getAdminProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview,
} = require("../controllers/productController");

router.route("/products").get(getProducts);
router.route("/admin/products").get(getAdminProducts);
router.route("/product/:id").get(getSingleProduct);

// admin routes (only admin can access)

router
    .route("/admin/product/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router
    .route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
    .route("/reviews")
    .get(isAuthenticatedUser, getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
