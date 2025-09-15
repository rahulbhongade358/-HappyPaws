import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import Pet from './models/Pet.js';
import { getPets,postPet,getPetsbyID,getPetsbysearch,putPetbyID,patchPetbyID,delPetbyID } from './controllers/pet.js';
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

app.post("/pets",postPet);
app.get("/pets",getPets)
app.get("/pets/search",getPetsbysearch)
app.get("/pets/:ID",getPetsbyID)
app.put("/pets/:ID",putPetbyID)
app.patch("/pets/:ID/age",patchPetbyID)
app.delete("/pets/:ID",delPetbyID)
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(` Server is running on port ${PORT}`);
    connectDB();
})