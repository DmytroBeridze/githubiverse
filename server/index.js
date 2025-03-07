const express = require("express");
const app = express();
const authRouter = require("./authRouter");
const { default: mongoose } = require("mongoose");
var cors = require("cors");
require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL;
const DB_PASS = process.env.DB_PASS;
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/auth", authRouter);

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://moderatefast:${DB_PASS}@cluster1.hwktn.mongodb.net/githubiverse?retryWrites=true&w=majority&appName=Cluster1`
    );

    console.log("BD connected!");
    // await User.syncIndexes();
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
