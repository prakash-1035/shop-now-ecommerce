const app = require("./app");
const connectDatabase = require("./config/database");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

// Setting up config file
dotenv.config({ path: "backend/config/config.env" });

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
    console.log(`ERROR : ${err.message}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

// connecting to mongodb database
connectDatabase();

// setting up cloudinary  configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
    console.log(
        `server start at port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
    );
});

process.on("unhandledRejection", (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});
