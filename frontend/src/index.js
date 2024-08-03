const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const session = require('express-session');
const path = require('path');
const userRoute = require('../route/user.route.js'); // User-related routes
const profileRoute = require('../route/profile.route.js'); // Profile-related routes
const User = require('../Models/userModel.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'Public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: 'your_secret_key', // Replace with a secret key for your session
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

async function connectDB(){
  try{
    mongoose.connect("mongodb://127.0.0.1:27017/FoodShare",{});
    console.log("connected to mongodb");
  }catch(err){
    console.log("error in mongodb",err);
  }
}
connectDB();

app.use("/user", userRoute); // Routes for user-related operations
app.use("/profile", profileRoute); // Routes for profile-related operations

app.get('/', (req, res) => {
  res.render('Home-page'); 
});

app.get('/login', (req, res) => {
  res.render('Login-page');
});

app.get('/profile', async (req, res) => {
  const userId = req.session.userId; // Assuming you have userId stored in session
  if (userId) {
    try {
      const user = await User.findById(userId); // Replace with actual user fetching logic
      if (user) {
        res.render('Profile-page', { user });
      } else {
        res.redirect('/login');
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      res.redirect('/login');
    }
  } else {
    res.redirect('/login');
  }
});

app.get('/register', (req, res) => {
  res.render('Register-page');
});

app.get('/ngos', (req, res) => {
  res.render('NGO-Page');
});

app.get('/banquets', (req, res) => {
  res.render('Banquets-page');
});

app.get('/about', (req, res) => {
  res.render('About-Us-page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
