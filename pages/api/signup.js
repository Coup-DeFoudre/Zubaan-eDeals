import User from "@/models/User";
import connectDB from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      const { name, email } = req.body;
      const user = new User({
        name,
        email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SECRET
        ).toString(),
      });
      await user.save();
      const token = jwt.sign(
        { name: user.name, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.setHeader(
        "Set-Cookie",
        `token=${token}; path=/; expires=${new Date(Date.now() + 86400000)};`
      );


      res.status(201).json({ success: true, token });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
};

export default connectDB(handler);
