import express from 'express';
import Orders from '../models/Orders';

const router = express.Router();

router.get("/", (req, res) => {
  Orders.find()
    .exec()
    .then((x) => res.send(x));
});

router.get("/:id", (req, res) => {
  Orders.findById(req.params.id)
    .exec()
    .then((x) => res.status(200).send(x));
});

router.post("/", (req, res) => {
  Orders.create(req.body).then((x) => res.status(201).send(x));
});

router.put("/:id", (req, res) => {
  Orders.findByIdAndUpdate(req.body.id, req.body).then((x) => res.status(204).send(x));//OJO CON EL 204
});

router.delete("/:id", (req, res) => {
  Orders.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
});

export default router;
