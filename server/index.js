const port = 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());

app.use(cors());

// Adding database connecting Mongodb online

mongoose.connect(
  "mongodb+srv://one4allecom:one4allecom@cluster0.jbz10t0.mongodb.net/e-commerce",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// API Creation

app.get("/", (req, res) => {
  res.send("Express app is running");
});

// For image Storage

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Creating upload endpoint

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema for creating Products

const ProductModel = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  let products = await ProductModel.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const newProduct = new ProductModel({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  console.log(newProduct);

  await newProduct.save();

  console.log("Saved!");

  res.json({
    success: true,
    name: req.body.name,
  });
});

// schema creting for user model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Creating end point API for Users

app.post("/signup", async (req, res) => {
  try {
    let check = await Users.findOne({ email: req.body.email });

    if (check) {
      return res.status(400).json({
        success: false,
        error: "Excisting User found with Same Email Address",
      });
    }

    let cart = {};

    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await user.save();

    // JWT Authentication

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");
    res.json({ success: true, token });
  } catch (error) {
    console.log("Error during signup: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Creating end point for user login

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    const passCompare = req.body.password === user.password;

    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(data, "secret_ecom");
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        errors: "Wrong Password",
      });
    }
  } else {
    res.json({
      success: false,
      errors: "Wrong Email id",
    });
  }
});

// Creating API for deleting product from DB

app.post("/removeproduct", async (req, res) => {
  await ProductModel.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// Creating API for Display all products

app.get("/allproducts", async (req, res) => {
  let products = await ProductModel.find({});
  console.log("All Products Fetched!");

  res.send(products);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});

// Creating end point for new collection data

app.get("/newcollections", async (req, res) => {
  let products = await ProductModel.find({});

  let newcollection = products.slice(1).slice(-8);

  // console.log("New Collection fetched");
  res.send(newcollection);
});

// Popular in women API
app.get("/popularinwomen", async (req, res) => {
  let products = await ProductModel.find({ category: "women" });

  let popular_in_women = products.slice(0, 4);

  console.log("Popular in women");

  res.send(popular_in_women);
});

// Creating middleware to fetch user

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ errors: "Please authentication using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");

      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using valid token" });
    }
  }
};

// Creating endpoint for aadding products in cartdata

app.post("/addtocart", fetchUser, async (req, res) => {
  // console.log("Addedd",req.body.itemId);
  // console.log(req.body, req.user);
  let userData = await Users.findOne({ _id: req.user.id });

  userData.cartData[req.body.itemId] += 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id }, 
    { cartData: userData.cartData }
  );

  res.json({ message: "Added" });
});

// Creating end pont to remove product from cartdata

app.post("/removefromcart", fetchUser, async (req, res) => {
  // console.log("Removed ",req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });

  if(userData.cartData[req.body.itemId]>0)
  userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});

// Creating end point data for cart from db

// app.post('/getcart',fetchUser,async(req,res)=>{
//   // console.log("Get cart");
//   let userData = await Users.findOne({_id:req.user.id})
//   res.json(userData.cartData);

// })