import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
 
const app = express();
app.use(express.json());
app.use(cors());

app.get('/health',(req,res)=>{
    res.json({status:"OK",message:"Server is healthy"});
})
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})