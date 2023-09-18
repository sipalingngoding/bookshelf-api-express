import express from 'express';

import bookRoutes from "./routes/book.js";
import errorMiddleware from "./middleware/error-middleware.js";

const app = express();

app.use(express.json());

app.use('/books',bookRoutes);

app.use(errorMiddleware);

app.use((req,res)=>{
    return res.status(404).json({
        status : 'fail',
        message : 'Route Not Found',
    });
});

export default app;
