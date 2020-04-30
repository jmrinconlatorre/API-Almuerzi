import express from 'express';
import Orders from '../models/Orders';
import isAuthenticated from '../auth';

const router = express.Router();

router.get("/", (req, res) => {
  Orders.find()
    .exec()
    .then((x) => res.status(200).send(x));
});

router.get("/:id", (req, res) => {
  Orders.findById(req.params.id)
    .exec()
    .then((x) => res.status(200).send(x));
});

router.post("/", isAuthenticated, (req, res) => {
  const { _id } =req.user;

  Orders.create({ ...req.body, user_id: _id }).then((x) => res.status(201).send(x));
});

router.put("/:id", isAuthenticated, (req, res) => {
  Orders.findByIdAndUpdate(req.params.id, req.body).then(() => res.sendStatus(204)); 
});

router.delete("/:id", isAuthenticated, (req, res) => {
  Orders.findOneAndDelete(req.params.id)
    .exec()
    .then(() => res.sendStatus(204));
});

export default router;
