const userSchema = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //=======================================================================
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "kindly provide all data",
      });
    }
    //===========================================================================
    const is_exist = await userSchema.findOne({ email });
    if (is_exist) {
      return res.status(400).json({
        success: false,
        message: "kindly login yourself",
      });
    }
    //===========================================================================
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userSchema.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      success: true,
      message: "User register successfully",
      // data: user,
    });

    //=================================================================================
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server problem",
    });
  }
};

//******************************************************************************************** */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //========================================

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "kindly provide credentials",
      });
    }
    //============================================

    const is_exist = await userSchema.findOne({ email });
    // console.log("is exist is", is_exist);
    // console.log("user schema is", userSchema);
    if (!is_exist) {
      return res.status(400).json({
        success: false,
        message: "Kindly Register yourself",
      });
    }
    //=======================================================
    if (await bcrypt.compare(password, is_exist.password)) {
      // Generate JWT token
      const token = jwt.sign(
        {
          userId: is_exist._id,
        },
        process.env.SECURITY_KEY,
        {
          expiresIn: "30d",
        }
      );

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // 🔥 MUST (Render is HTTPS)
        sameSite: "none", // 🔥 MUST (Netlify → Render)
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      });

      // Send response
      res.status(200).json({
        success: true,
        message: "User login successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (error) {
    //===================================================
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "internal server problem",
    });
  }
};
//*************************************************************************************** */

exports.logout = async (req, res) => {
  try {
    return res
      .cookie("token", null, { httpOnly: true, expires: new Date(Date.now()) })
      .status(200)
      .json({
        success: true,
        message: "user logout successfully",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server problem",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // req.id is set by your authentication middleware
    const user = req.user; // make sure req.user contains name/email

    return res.status(200).json({
      success: true,
      user: {
        id: req.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
