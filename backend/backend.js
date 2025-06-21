const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());


let tempEmail = null;
const isGmailEmail = (email) => {
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return gmailRegex.test(email);
};

mongoose.connect("mongodb+srv://tvarunesh2004:Varunesh2004@cluster0.vamqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log(err));


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: String },
  otpExpires: { type: Date }
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'varunesht.22it@kongu.edu', 
    pass: ' Varunesh@1', 
  },
  connectionTimeout: 60000,
});
const User = mongoose.model('User', userSchema);


const RecipeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  totalTime: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  }
});

const Recipe= mongoose.model('Recipe', RecipeSchema);

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);
app.get('/recipes', async (req, res) => {
  try {
    const { label} = req.query;

    let filter = {};

    if (label) {
      filter.label = { $regex: label, $options: 'i' }; 
    }

    const recipes = await Recipe.find(filter);

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/recipes', async (req, res) => {
  const { label, image, totalTime, calories, ingredients } = req.body;

  try {
    const newRecipe = new Recipe({
      label,
      image,
      totalTime,
      calories,
      ingredients
    });

    await newRecipe.save();

    res.status(201).json({ message: 'Recipe saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    res.json({ message: 'Login successful', admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/admin/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({ email,password: hashedPassword });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully', admin: { email: newAdmin.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/login', async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

    if (!user) {
      return res.status(400).json({ message: 'User not found. Please check your username or email.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password. Please try again.' });
    }

    res.status(200).json({ message: 'Login successful', user: { username: user.username, email: user.email } });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error logging in. Please try again later.' });
  }
});

const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: 'varunesht.22it@kongu.edu',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!isGmailEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid Gmail address.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    tempEmail = email;

    const newUser = new User({ username, email: tempEmail, password: hashedPassword, otp, otpExpires });
    newUser.save();
    await sendOtp(tempEmail, otp);

    res.status(201).json({ message: 'User created successfully. Check your email for the OTP.' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user' });
    console.log(err);
  }
});

app.post('/api/verify-otp', async (req, res) => {
  const { otp } = req.body;

  try {
    if (!tempEmail) return res.status(400).json({ message: 'No email found. Please sign up first.' });

    const user = await User.findOne({ email: tempEmail });

    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.otp === otp && Date.now() < user.otpExpires) {
      user.otp = undefined;
      user.otpExpires = undefined;

      await user.save();

      tempEmail = null;

      res.json({ message: 'OTP verified successfully. You can now log in.' });
    } else {
      res.status(400).json({ message: 'Invalid or expired OTP.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error verifying OTP' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));