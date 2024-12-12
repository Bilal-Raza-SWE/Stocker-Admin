const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
    //   console.log("Hashed password during signup:", hashedPassword);
  
      const newUser = new User({ name, email, password: hashedPassword });
      console.log("New user during signup:", newUser);
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  


exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Login request body:", req.body);
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
    //   console.log("Entered password:", password);
    //   console.log("Stored hashed password:", user.password);
  
      const isPasswordValid = await bcrypt.compare(password.trim(), user.password);

    //   console.log("Trimmed password:", password.trim());


    //   console.log("Password comparison result:", isPasswordValid);
  
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10s",
    });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };
  