import express from 'express';
import mongoose from 'mongoose';
const app = express();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("*", (req, res) => {
  res.send('Hello world');
});

export default app;
