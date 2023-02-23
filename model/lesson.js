import mongoose from 'mongoose';

const lessionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    slug: {
      type: String,
      lowercase: true,
      default: "no slug available",
    },

    link: { url:String,public_id:String },
  },
  { timestamps: true }
);



const Lesson= mongoose.model("Lesson",lessionSchema)

export default Lesson