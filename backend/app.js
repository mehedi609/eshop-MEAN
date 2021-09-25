const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

require("dotenv/config");
const api = process.env.API_URL;
const connectionURI = process.env.MONGOOSE_URI;

// Middlewares
app.use(express.json());
app.use(morgan("tiny"));

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "hair dresser",
    image: "some_url",
  };
  return res.json(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  return res.json(newProduct);
});

mongoose
  .connect(connectionURI)
  .then(() => {
    console.log("Database Connection Successful!!");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
