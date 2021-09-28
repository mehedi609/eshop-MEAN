import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from 'mongoose';
import morgan from 'morgan';
import { categoryRouter } from './routers/category.router';
import { productRouter } from './routers/product.router';
import { userRouter } from './routers/user.router';
import { authJwt } from './helpers/jwt';
import { errorHandler } from './helpers/error-handler';

dotenv.config();
const port = process.env.SERVER_PORT;
const api = process.env.API_URL;
const connectionString = process.env.MONGOOSE_URI;

const app: Application = express();

app.use(cors());

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

// Routers
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/products`, productRouter);
app.use(`${api}/users`, userRouter);

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
