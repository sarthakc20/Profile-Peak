const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");  // middleware
const cookieParser =require("cookie-parser");
router.use(cookieParser())

require("../db/conn");
const User = require("../model/userSchema");


// router.get("/", (req, res) => {
//   // res.send("Hello World from router");
// });

// Using Promise -->

// router.post('/register', (req, res) => {
//     const { name, email, phone, work, password, cpassword } = req.body;
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "Please fill the required fields"});
//     }
//     // console.log(name);
//     // res.json({ message: req.body });
//     // res.send("my register page");

//     User.findOne({ email: email })
//     .then((userExist) => {
//         if (userExist) {
//             return res.status(422).json({ error: "Email already exists"});
//         }
//         const user = new User({ name, email, phone, work, password, cpassword });
//         user.save().then(() => {
//             res.status(201).json({ message: "Registration successful"});
//         }).catch((err) => res.status(500).json({ error: "Failed to register" }));
//     }).catch(err => { console.log(err); });
// });


// Using Async-await -->

router.post("/signup", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(400).json({ error: "Please fill the required fields" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password is not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      //password hashing --> (pre save) in userSchema.js file

      await user.save();
      res.status(201).json({ message: "Registration successful" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login rout -->

router.post("/signin", async (req, res) => {
  try {
    let token;

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the required fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        return res.status(422).json({ error: "Invalid credentials" });
      }

      else {
      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: false,
        secure: false
      });

      return res.status(200).json({ message: "Signin successful" });
      }
    } else {
      return res.status(422).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }

});

//about page

router.get('/about', authenticate , (req, res) => {
  res.send(req.rootUser);
});


// Get user data for contact page and home page
router.get('/getdata', authenticate , (req, res) => {
  res.send(req.rootUser);
});

// contact page message send
router.post('/contact', authenticate, async (req, res) => {
      try {

        const { name, email, phone, message } = req.body;

        if ( !name || !email || !phone || !message ) {
          console.log("error in contact form");
          return res.json({ error: "Please fill the contact form" });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if ( userContact) {

          const userMessage = await userContact.addMessage(name, email, phone, message); 
          await userContact.save();
          res.status(201).json({ message: "Message Sent successfully" });

        }

      } catch (error) {
        console.log(error);
      }
});

//logout page

router.get('/signout', (req, res) => {
  res.clearCookie("jwtoken", {path: "/"})
  res.status(200).send("User Logged out");
});



module.exports = router;
