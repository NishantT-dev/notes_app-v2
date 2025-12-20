import mongoose from "mongoose";
const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" Mongo DB is succesfully connected");
    } catch(err){
        console.error("MongoDB connection error :",err.message);
        process.exit(1);
    }
};
export default connectDB;