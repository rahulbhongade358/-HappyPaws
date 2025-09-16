import Pet from '../models/Pet.js';
const getPets= async(req,res)=>{
    const pets = await Pet.find();

    res.json({
        success:true,
        data:pets,
        message:`list of ${pets.length} pets,🐕 Pets fetched successfully `
    })

}
const postPet =    async (req,res)=>{
    const{ 
        name,
        age,
        gender,
        breed,
        weight,
        color,
        description,
        images,
        available
        } = req.body;
if(!name || !age || !gender || !breed || !weight || !color || !description || !images || !available){
    return res.status(400).json({
        success:false,
        data:null,
        message:"❌ All fields are required"
    })
}
        try{
        const pet = new Pet({
            name,
            age,
            gender,
            breed,
            weight,
            color,
            description,
            images,
            available
        })
        const savedPet = await pet.save();
        res.status(201).json({
            success:true,
            data:savedPet,
            message:"🐶 Pet Added Successfully"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            data:null,
            message:`❌ Internal Server Error : ${error.message}`
        });
    }
}
const getPetsbyID = async(req,res)=>{
    const {ID}=req.params;
    // const matchedPet = await Pet.findOne({_id:ID});
    // if(matchedPet){
    //     res.json({
    //         success:true,
    //         data:matchedPet,
    //         message:"🐕 Pet fetched successfully"})
    // }else{
    //     res.json({
    //         success:false,
    //         data:null,
    //         message:"❌ No Pet found with the given ID"
    //     })
    // }
    try{
        const matchedPet = await Pet.findById(ID);
        if(matchedPet){
            res.json({
                success:true,
                data:matchedPet,
                message:"🐕 Pet fetched successfully"})
        }else{
            res.json({
                success:false,
                data:null,
                message:"❌ No Pet found with the given ID"
            })
        }
    }catch(error){
        return res.json({
            success:false,
            message:"❌ Invalid ID format"
        })
    }
}

const getPetsbysearch = async(req,res)=>{
    const {q}=req.query;

    const Pets= await Pet.find({
        $or:[
            {name:{$regex:q,$options:"i"}},
            {breed:{$regex:q,$options:"i"}},
            {gender:{$regex:q,$options:"i"}},
        ]
    })
    if(Pets.length==0){
        return res.status(404).json({
            success:false,
            data:[],
            message:"❌ No Pets found with the given search query"
        })
    }
    res.json({
        success:true,
        data:Pets,
        message:`🐕 ${Pets.length} Pets fetched successfully`
    })
}

const putPetbyID = async(req,res)=>{
    const {ID}=req.params;
    const{ 
        name,
        age,
        gender,
        breed,
        weight,
        color,
        description,
        images,
        available
        } = req.body;

        await Pet.updateOne({_id:ID},{
            name,
            age,
            gender,
            breed,
            weight,
            color,
            description,
            images,
            available
        })

        const updatedPet = await Pet.findById(ID);
        res.json({
            success:true,
            data:updatedPet,
            message:"🐶 Pet Updated Successfully"
        });
}
const patchPetbyID = async(req,res)=>{
    const {ID}= req.params;
    const {age} = req.body;
    await Pet.updateOne({_id:ID},{ age })
    const updatedPet = await Pet.findById(ID);
    res.json({
        success:true,
        data:updatedPet,
        message:"🐶 Pet Updated Successfully"
    });
}
const delPetbyID = async(req,res)=>{
    const {ID}=req.params;
await Pet.deleteOne({_id:ID});
    const updatedPets = await Pet.find();
    res.json({
        success:true,
        data:updatedPets,
        message:`🐶 Pet Deleted Successfully`
    });

}
export { getPets,postPet,getPetsbyID,getPetsbysearch,putPetbyID,patchPetbyID,delPetbyID };