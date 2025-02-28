const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./authRouter");
const app = express();

require("dotenv").config();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const PORT = process.env.PORT || 5000;
const dbPassword = process.env.DB_PASSWORD;

app.use(
  cors({
    origin: CLIENT_URL, // Разрешаем запросы только с указанного адреса
    credentials: true, // Для работы с cookies (если нужно)
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.options("*", cors()); // Обрабатываем preflight-запросы

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://moderatefast:${dbPassword}@cluster1.hwktn.mongodb.net/githubiverse?retryWrites=true&w=majority&appName=Cluster1`
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
