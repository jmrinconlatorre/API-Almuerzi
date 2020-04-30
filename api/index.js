import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import meals from './routes/meals';
import orders from './routes/orders';
import auth from './routes/auth';

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(db => console.log('DB is connected'))
.catch(err => console.error(err));

app.use('/api/meals', meals);
app.use('/api/orders', orders);
app.use('/api/auth', auth);

export default app;
