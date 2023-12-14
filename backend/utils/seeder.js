const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

const products = require("../data/product.json");

const Product = require("../models/product");

dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const seedProduct = async () => {
  try {
    await Product.deleteMany();
    console.log("product deleted");

    products.forEach((prd) => {
      prd.user = "6475a5283f30bb9ad9ed3a87";
      prd.createdAt = Date.now();
    });

    await Product.insertMany(products, {});
    console.log("product inserted successfully");

    process.exit(0);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProduct();
