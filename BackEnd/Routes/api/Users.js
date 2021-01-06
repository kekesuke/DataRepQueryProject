const router = require('express').Router();
// User Model
const User = require('../../Models/User');
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')


/**
 * @route   GET api/users
 * @desc    Register new user
 * @access  Public
 */

router.post('/', (req, res) => {

  const { name, username, password } = req.body;
  console.log(name, username, password)
  if (!name || !username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' })
  }

  //check for existing user by sending the username
  User.findOne({ username }).then(user => {
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const newUser = new User({
      name,
      username,
      password
    });

    //Create salt & hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save()
          .then(user => {
            jwt.sign( //signing the jsonweb token with the secret key and set it to expire in 1h
              { id: user.id }, config.get('jwtSecret'), { expiresIn: 3600 },//when we send the token the user id will be there so it will know which user it is
              (err, token) => {
                if (err) throw err;
                res.json({//if everything is alright sending respond with the token and the user
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    username: user.username
                  }
                })
              }
            )
          })
      })
    })
  })
});

module.exports = router;
