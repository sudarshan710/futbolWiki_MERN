import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

// export const register = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, profilePicture, role } = req.body;

//     // Add Validation

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//       profilePicture,
//       role,
//     });

//     try {
//       const savedUser = await newUser.save();
//       res.status(201).json(savedUser);
//     } catch (err) {
//         res.status(500).json({error: err.message});
//     }
//   } catch (err) {}
// };

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, profilePicture, role } =
      req.body;

    // Add Validation

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePicture,
      role,
    });

    const savedUser = await newUser.save();
    // Omitting the password from the user object before sending it
    const userWithoutPassword = { ...savedUser._doc, password: undefined };

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
};

export const login = async (req, res) => {
  try {
    // Add Validation

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email/password!");

    const passCheck = await bcrypt.compare(req.body.password, user.password);
    if (!passCheck) return res.status(400).send("Invalid email/password!");

    const expirationTime = Math.floor(Date.now() / 1000) + 7200;

    const token = jwt.sign(
      { _id: user._id, exp: expirationTime },
      process.env.TOKEN_SECRET
    );

    // Omitting the password from the user object before sending it
    const userWithoutPassword = { ...user._doc, password: undefined };

    res.header("auth-token", token).json({ user: userWithoutPassword, token });
    console.log("user: ", user);
    console.log("token: ", token);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
};

// export const login = async (req, res) => {

//     // Add Validation

//     const user = await User.findOne({email: req.body.email});
//     if (!user) return res.status(400).send('Invalid email/password!');

//     const passCheck = await bcrypt.compare(req.body.password, user.password);
//     if (!passCheck) return res.status(400).send('Invalid email/password!');

//     const expirationTime = Math.floor(Date.now() / 1000) + 7200;

//     const token = jwt.sign({_id: user._id, exp: expirationTime}, process.env.TOKEN_SECRET);
//     //res.header('auth-token', token).send(token);
//     res.header('auth-token', token).json({ user: { ...user._doc, password: undefined }, token });

//     //delete user.password;
//     res.status(200).json({user, token});
//     console.log("user: ", user);
//     console.log("token: ", token);
// };
