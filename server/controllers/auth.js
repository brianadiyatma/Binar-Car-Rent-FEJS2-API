const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isEmail, isStrongPassword } = require("validator");

exports.loginWithGoogle = (req, res) => {
  const { googleId, firstName, lastName, email } = req.body;
  User.findOne({ googleId }).then((user) => {
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          userStatus: "User Lama",
        },
      });
    } else {
      const newUser = new User({
        googleId,
        firstName,
        lastName,
        email,
      });
      newUser
        .save()
        .then((user) => {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
          res.status(200).json({
            token,
            user: {
              id: user._id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              userStatus: "User Baru",
            },
          });
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ message: "Email tidak terdaftar" });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ message: "Password salah" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
          token,
          user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
exports.signup = (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!isEmail(email)) {
    return res.status(400).json({ message: "Email tidak valid" });
  }
  if (!isStrongPassword(password)) {
    return res.status(400).json({
      message:
        "Password Harus Mengandung Minimal 8 Character dengan uppercase dan lowercase dan satu simbol :v",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .json({ message: "User Pernah Daftar Dengan Email yang Sama" });
      }
      const newUser = new User({
        email,
        password,
        firstName,
        lastName,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
              res.status(200).json({
                token,
                user: {
                  id: user._id,
                  email: user.email,
                  firstName: user.firstName,
                  lastName: user.lastName,
                },
              });
            })
            .catch((err) => {
              res.status(400).json({ message: err.message });
            });
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
