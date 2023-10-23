import User from "@/models/User";
import connectDB from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        const bytes = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SECRET
        );
        user.password = bytes.toString(CryptoJS.enc.Utf8);

        if (user.password === req.body.password) {
          const token = jwt.sign(
            { name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );
          res.setHeader(
            "Set-Cookie",
            `token=${token}; path=/; expires=${new Date(
              Date.now() + 86400000
            )};`
          );


          res.status(201).json({success:true,token });
        } else {
          res.status(401).json({ msg: "Invalid credentials" });
        }
      } else {
        res.status(401).json({ msg: "Invalid credentials" });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(405).json({ msg: "Method not allowed" });
  }
};

export default connectDB(handler);
