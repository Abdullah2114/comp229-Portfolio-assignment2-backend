const User = require("../models/users");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function toClient(doc) {
  const obj = doc.toObject();

  obj.id = obj._id.toString();

  delete obj._id;
  delete obj.__v;
  delete obj.password;

  return obj;
}


// GET ALL USERS
exports.getAll = async (req, res, next) => {
  try {
    const list = await User.find();

    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data: list.map(toClient)
    });
  } catch (err) {
    next(err);
  }
};


// GET USER BY ID
exports.getById = async (req, res, next) => {
  try {
    const item = await User.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: toClient(item)
    });
  } catch (err) {
    next(err);
  }
};


// SIGN UP / CREATE USER
exports.create = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists."
      });
    }

    const created = await User.create({
      firstname,
      lastname,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: toClient(created)
    });
  } catch (err) {
    next(err);
  }
};


// SIGN IN
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Sign in successful.",
      token: token,
      data: toClient(user)
    });
  } catch (err) {
    next(err);
  }
};


// UPDATE USER
exports.update = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists."
        });
      }
    }

    user.firstname = firstname ?? user.firstname;
    user.lastname = lastname ?? user.lastname;
    user.email = email ?? user.email;

    if (password) {
      user.password = password;
    }

    const updated = await user.save();

    res.json({
      success: true,
      message: "User updated successfully.",
      data: toClient(updated)
    });
  } catch (err) {
    next(err);
  }
};


// DELETE USER
exports.remove = async (req, res, next) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully."
    });
  } catch (err) {
    next(err);
  }
};