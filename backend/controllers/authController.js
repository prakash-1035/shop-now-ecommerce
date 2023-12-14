const crypto = require("crypto");
const User = require("../models/user");
const cloudinary = require("cloudinary");

const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

// Register a user => /api/v1/register
exports.registerUser = async (req, res, next) => {
    try {
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url,
            },
        });

        sendToken(user, 200, res);
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
};

// Login User => /api/v1/login

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler("please enter email & password", 400));
    }

    // Finding user in database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid password or Email", 401));
    }

    sendToken(user, 200, res);
};

// Forgot Password  => /api/v1/password/forgot
exports.forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        // console.log(user);
        if (!user) {
            return next(new ErrorHandler("Invalid Email", 401));
        }
        const resetToken = user.getResetPasswordToken();
        // console.log(resetToken);
        await user.save({ validateBeforeSave: false });

        const resetUrl = `http://localhost:3000/password/reset/${resetToken}`;

        const message = `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n
    ${resetUrl}\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`;

        const result = await sendEmail(
            email,
            "RESET password on ShopNow",
            message
        );
        if (result.success === true) {
            return res.status(200).json({
                success: true,
                message: `RESET Url send on your mail : ${email}`,
            });
        } else {
            return res.status(500).json(result);
        }
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
};

// Reset password using token => /api/v1/password/reset/:token

exports.resetPassword = async (req, res, next) => {
    try {
        const resetToken = req.params.token;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return next(new ErrorHandler("Passwords do not match", 400));
        }
        // if (!resetPasswordToken) {
        //   return next(new ErrorHandler("Invalid Token", 401));
        // }
        // console.log(`token: ${resetToken}`);
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        // console.log(`user: ${user}`);

        if (!user) {
            return next(new ErrorHandler("Invalid Token", 401));
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        sendToken(user, 200, res);
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
};

// get currently logged in user details => /api/v1/me

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// update or change password => /api/v1/password/update
exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("+password");

        //check if old password correct or not
        const isMatched = await user.comparePassword(req.body.oldPassword);
        // console.log(isMatched);

        if (!isMatched) {
            return next(new ErrorHandler("Old password is incorrect", 401));
        }
        user.password = req.body.newPassword;
        await user.save();

        sendToken(user, 200, res);
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
};

// update user profile  => /api/v1/me/update
exports.updateProfile = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        };

        // Update avatar
        if (req.body.avatar !== "") {
            const user = await User.findById(req.user.id);
            const image_id = user.avatar.public_id;

            const result = await cloudinary.v2.uploader.upload(
                req.body.avatar,
                {
                    folder: "avatars",
                    width: 150,
                    crop: "scale",
                }
            );

            const res = await cloudinary.v2.uploader.destroy(image_id);

            newUserData.avatar = {
                public_id: result.public_id,
                url: result.secure_url,
            };
        }

        const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
};

// logout the user  /api/v1/logout
exports.logoutUser = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Admin Routes

// Get all users list => /api/v1/admin/users

exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
};

// get user details  =>/api/v1/admin/user/:id
exports.getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(
                new ErrorHandler(`User not found of id : ${req.params.id}`, 404)
            );
        }
        return res.status(200).json({
            success: true,
            user,
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
};

// update user profile  => /api/v1/admin/user/:id
exports.updateUser = async (req, res, next) => {
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };

        // Update avatar : TODO

        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        return res.status(200).json({
            success: true,
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
};

// Delete user   =>/api/v1/admin/user/:id
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(
                new ErrorHandler(`User not found of id : ${req.params.id}`, 404)
            );
        }

        // REMOVE AVATAR from cloudinary
        const image_id = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(image_id);

        await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (err) {
        return next(new ErrorHandler(err.message, 500));
    }
};
