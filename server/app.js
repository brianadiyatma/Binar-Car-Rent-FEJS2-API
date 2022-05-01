const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/auth", authRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error:", err.message);
  });
