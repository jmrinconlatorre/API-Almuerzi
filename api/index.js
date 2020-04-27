import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import meals from './routes/meals'
import orders from './routes/orders'

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/meals', meals);
app.use('/api/orders', orders);

export default app;
