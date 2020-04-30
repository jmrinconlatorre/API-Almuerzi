import jwt from "jsonwebtoken";
import Users from "../models/Users";

export default (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.sendStatus(403);
  }

  jwt.verify(token, "misecreto", (err, decoded) => {
    const { _id } = decoded;
    Users.findOne({ _id })
      .exec()
      .then((user) => {
        req.user = user;
        next();
      });
  });
};
