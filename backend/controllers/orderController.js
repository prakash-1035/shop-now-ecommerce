const Order = require("../models/order");
const Product = require("../models/product");

const ErrorHandler = require("../utils/errorHandler");

// Create a new order  => /api/v1/order/new

exports.newOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
    } = req.body;

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id,
    });

    return res.status(200).json({
      status: "success",
      order,
    });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

// Get single order => /api/v1/orders/:id
exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

// Get all products of logged in user  => /api/v1/orders/me
exports.myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });

    return res.status(200).json({
      orders,
    });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};

// Get all orders => /api/v1/admin/orders
exports.allOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));

    return res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (err) {
    return next(new ErrorHandler(err, err.statusCode));
  }
};

// Update/Process order - ADMIN  => /api/v1/admin/order/:id
exports.updateOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("you have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  return res.status(200).json({
    success: true,
  });
};

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
};

// Delete single order => /api/v1/admin/order/:id
exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    await Order.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    return next(new ErrorHandler(err, 500));
  }
};
