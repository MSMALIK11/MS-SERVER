import mongoose from "mongoose";


export const connection = async (req, res) => {
 
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongo db connected with server: ${data.connection.host}`);
    });
};
