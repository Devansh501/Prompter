const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use("/", require("./routes/auth"));
app.use("/posts",require("./routes/postRoutes"))

app.listen(8000, () => {
  console.log("listening at port 8000");
});
