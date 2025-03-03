const express = require("express");
const app = express();
const port = 5000;
const authRouter = require("./authRouter");
const { default: mongoose } = require("mongoose");
// const User = require("./models/userModel");

app.use(express.json());
app.use("/auth", authRouter);

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://moderatefast:githubiverse@cluster1.hwktn.mongodb.net/githubiverse?retryWrites=true&w=majority&appName=Cluster1"
    );

    console.log("BD connected!");
    // await User.syncIndexes();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
