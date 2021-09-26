const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv/config');

const api = process.env.API_URL;
const connectionURI = process.env.MONGOOSE_URI;

const { productRouter } = require('./routers/products.router');
const { categoryRouter } = require('./routers/categories.router');

const app = express();

app.use(cors());
app.options('*', cors());

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));

// Routers
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);

mongoose
  .connect(connectionURI)
  .then(() => {
    console.log('Database Connection Successful!!');
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
