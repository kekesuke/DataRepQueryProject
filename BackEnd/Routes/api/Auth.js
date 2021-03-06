const router = require('express').Router();
const config = require('config')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../Middleware/Auth')
const User = require('../../Models/User');

//

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user) throw Error('User does not exist');
    //campere the hash passwords and validate it
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');
    //signing the json web token
    const token = jwt.sign({ id: user._id }, config.get('jwtSecret'), { expiresIn: 3600 });
    if (!token) throw Error('cannnot sign the token');

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.email
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/auth/register
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {
  const { name, username, password } = req.body;

  // Simple validation
  if (!name || !username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');

    const salt = await bcrypt.genSalt(10);//gen salt 10 represents the rounds as higher as it is more secure it becomes but it takes more time to generate
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      name,
      username,
      password: hash
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, config.get('jwtSecret'), {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        username: savedUser.username
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;