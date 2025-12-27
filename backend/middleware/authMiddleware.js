const express = require("express");
const jwt = require("jsonwebtoken");
const userSchema = require("../Models/userModel");

exports.authentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "user not authenticated",
      });
    }

    const decode = await jwt.verify(token, process.env.SECURITY_KEY);
    if (!decode) {
      return res.status(400).json({
        success: false,
        message: "invalid token",
      });
    }

    // req.id = decode.userId;

    // ✔ Fetch user from database
    const user = await userSchema.findById(decode.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ✔ Attach full user info to req.user
    req.user = user;
    req.id = user._id; // still useful if you use req.id elsewhere

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal  server problem",
    });
  }
};
