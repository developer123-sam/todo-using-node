const mongoose=require("mongoose")
const Schema=mongoose.Schema

const taskSchema=new Schema({
user:{
    type:Schema.Types.ObjectId,
    ref:"user"
},

    title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
media:{
    type:String,
    required:true
},
targetdate:{
    type:String,
    required:true
},
status:{
    type:String,
    enum:["Todo","In-progress","Done"],
    default:"Todo"
}
},
{
    timestamps:true
})

const Task=mongoose.model("task",taskSchema)
module.exports=Task