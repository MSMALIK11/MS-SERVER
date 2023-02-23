import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter your name "],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "enter your email"],
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },

  avatar: {
    type: String,
    default: "i am default image",
  },
  role: {
    type: String,
    default: "user",
  },
});

userSchema.methods.generateToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

const User = mongoose.model("User", userSchema);

export default User;
