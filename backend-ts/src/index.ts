import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from 'mongoose';
import morgan from 'morgan';
import { categoryRouter } from './routers/category.router';
import { productRouter } from './routers/product.router';

dotenv.config();
const port = process.env.SERVER_PORT;
const api = process.env.API_URL;
const connectionString = process.env.MONGOOSE_URI;

const app: Application = express();

app.use(cors());

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));

// Routers
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/products`, productRouter);

// connect to mongoodb
(async () => {
    try {
        await connect(connectionString);
        console.log('Database Connection Successful!');
    } catch (e) {
        console.log(e);
    }
})();

// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
