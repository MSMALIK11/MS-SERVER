import express from "express";
import path from "path";
import dotenv from "dotenv";
import expressFileupload from "express-fileupload";
import cookieParser from "cookie-parser";

import cors from "cors";


import { connection } from "./DATABABSE/db.js";
import router from "./routes/route.js";
dotenv.config({ path: "./config/.env" });
// handle image data

const app = express();
// handle cross-origin-request

// app.use(
//   cors({
//     origin:"*",
//     credentials: true,
//   })
// );
app.use(
  cors({
      origin: true,
      credentials: true,
  })
);



// app.use(cors());
app.use(express.json());
app.use(expressFileupload({ useTempFiles: true }));
app.use(cookieParser());

// const csrfprotection=csrf({cookie:true})

const PORT = process.env.PORT;
// app.use(csrfprotection)
app.use("/api", router);

// app.get("/api/csrf-token",(req,res)=>{
//   return res.status(200).json({csrfToken:req.csrfToken()})
// })
app.listen(PORT, () => {
  console.log(`server is running at port 8000`);
});

connection();
