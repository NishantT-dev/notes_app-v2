import mongoose from "mongoose";
const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title is compulsory"],
        trim:true
    },
    content:{
        type:String,
        required:[true,"Content in compulsory"]
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
{timestamps:true}
);
const Note=mongoose.model("Note",noteSchema);
export default Note;