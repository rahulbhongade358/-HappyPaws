import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
dotenv.config();
 
const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        if(conn){
            console.log("MongoDB connected successfully ✅");
        }
    }catch(e){
        console.error(`❌mongoDB connection failed: ${e.message}`);
    }
}

app.get('/health',(req,res)=>{
    res.json({status:"OK",message:"Server is healthy"});
})
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(` Server is running on port ${PORT}`);
    connectDB();
})