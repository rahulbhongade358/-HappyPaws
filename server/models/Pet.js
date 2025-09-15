import {model,Schema} from 'mongoose';


const petSchema = new Schema(
    {
        name:{type:String,required:true,unique:true},
        age:{type:Number,required:true},
        gender:{type:String,required:true},
        breed:{type:String,required:true},
        weight:{type:Number,required:true},
        color:{type:String,required:true},
        description:{type:String,required:true},
        images:{type:[String],required:true},
        available:{type:Boolean,default:true}
    },
    {timestamps:true}
);

const Pet = model('Pet',petSchema);


export default Pet;
