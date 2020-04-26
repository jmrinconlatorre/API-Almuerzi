import express from 'express';
const app = express();

app.get('*', (req,res) => {
    console.log('Hola mundo! Mi primera app serverless');
    res.send({ mensaje: "Hola que tal?"});
});

export default app;
