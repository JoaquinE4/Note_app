import mongoose from "mongoose";

const taskSchema = new  mongoose.Schema({
    title:{type:String,
        require:true,
        unique:true,
        trim:true,
    },
    descripcion:{
        type:String,
        require:true,
        trim:true,
        unique:true,

    }
},
{
    timestamps:true
}
)

 export const taskModel = mongoose.models.tasks || mongoose.model("tasks", taskSchema);

 