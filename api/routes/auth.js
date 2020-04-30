import express from 'express';
import crypto, { pbkdf2 } from 'crypto';
import Users from '../models/Users';
import jwt from 'jsonwebtoken';

const router = express.Router();

const signToken = (_id) => {
  return jwt.sign({ _id }, 'misecreto',{
    expiresIn: 60 * 60 * 24 * 365//one year
  });
}

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  crypto.randomBytes(16, (err, salt) => {
    const newSalt = salt.toString('base64');
    crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
      const encryptedPassword = key.toString('base64');
      Users.findOne({ email })
        .exec()
        .then((user) => {
          if (user) {
            return 'El usuario ya existe en la base de datos';
          }
          Users.create({
            email,
            password: encryptedPassword,
            salt: newSalt,
          }).then(() => {
            res.send('Usuario creado con éxito');
          });
        });
    });
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.send('Usuario y/o contraseña incorrecta');
      }
      crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
        const encryptedPassword = key.toString('base64');
        
        if (user.password === encryptedPassword) {
          const token = signToken(user._id);
          return res.send({ token });
        }
        return res.send('Usuario y/o contraseña incorrecta')
      });
    });
});

export default router;
