import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register=async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const existing = await User.findOne({email});
        if(existing){
            return res.status(400).json({message:"Email is already in use"});
        }
        const salt= await bcrypt.genSalt(10);
        const hashed=await bcrypt.hash(password,salt);
        const user=await User.create({name,email,password:hashed});
   res.status(201).json({
    succes:true,
    data:{id:user._id,name:user.name,email:user.email}
   });
    } catch(err){
        next(err);
    }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
    res.json({ success: true, token });
  } catch (err) {
    next(err);
  }
};