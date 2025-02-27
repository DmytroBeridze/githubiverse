const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://moderatefast:githubiverse@cluster1.hwktn.mongodb.net/githubiverse?retryWrites=true&w=majority&appName=Cluster1"
      )

      .then(() => console.log("Connected!"));
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
