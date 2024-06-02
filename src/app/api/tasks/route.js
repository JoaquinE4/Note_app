import { NextResponse } from "next/server";
import { connectDB } from "@/utils/nogoose";
import {taskModel} from "@/models/tasks.model"

export async function GET(){
    connectDB()

    const tareas = await  taskModel.find()

    return NextResponse.json({tareas})


}




export async function POST(req){
    
    try {
        connectDB()
    
        const {title, descripcion} =await  req.json()
        if(!title || !descripcion){
            return NextResponse.json({error:"Complete Los campos"},{status:404})
        }
    
        let data ={
            title,
            descripcion:descripcion
        }
        
        const createTask= await taskModel.create(data)
    
    
        return NextResponse.json({
         createTask
        })
        
    } catch (error) {
        return NextResponse.json(error.message, {
            status:400
        })
    }


}