import User from "../model/signupmodel.js";
import Course from '../model/courseSchema.js'
import bcrypt from "bcrypt";


export const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) return;
  try {
    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(401)
        .json({ status: false, message: "user already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    console.log("hash password ", hashPassword);

    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      phone: phone,
    });

    await user.save();
    return res.status(200).json({
      status: true,
      message: "user successfully signup in database",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/*
 *  user Login
 */

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // if (!email || !password) {
  //   return res.status(400).json({ message: "email or password required" });
  // }
  try {
    const user = await User.findOne({ email });

    if (!user) return;

    const match = await bcrypt.compare(password, user.password);

    const token = await user.generateToken();
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    if (match) {
      user.password = undefined;
      return res.status(200).cookie("token", token, options).json({
        success: true,
        user,
        token,
        message: "login successfully completed",
      });
    } else {
      return res.status(400).json({ error: "password not match" });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "internal server error",
      warning: error.message,
    });
  }
};

export const userLogout = async (req, res) => {
  res.clearCookie("jwt");
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  return res.status(200).cookie("token","",options).json({
    success: true,
    message: "logout successfully completed",
  });

};

// get current user
export const currentUser = async (req, res) => {
  console.log("req user ", req.user);

  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("current user not found ", error);
  }
};

// RESET PASSWORD
export const resetUserPassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.user._id;
  console.log("user ID", userId);
  console.log("new Password", password);
};
// admin profile

export const getAdminProfile=async(req,res)=>{


  const admin=await User.findById(req.user._id);
  const course=await Course.find().populate('instructor lessons');
  let currentUserCourse=course.filter((course)=>course.instructor.name===req.user.name)

  if(admin){
    return res.status(200).json({
      success:true,
      admin:admin,
    adminCourse:currentUserCourse,
    messages:'Admin profile get successfully'
    })
  }

}