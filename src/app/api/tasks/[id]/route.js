import {  NextResponse } from "next/server";
import { connectDB } from "@/utils/nogoose";
import { taskModel } from "@/models/tasks.model";

export async function GET(req,{params}){

  try {
    connectDB()
    const getby= await taskModel.findById(params.id)

    if(!getby){
        return NextResponse.json({error:"Tarea no encontrada"},{status:404})
    }
      
    return NextResponse.json(getby)

  } catch (error) {
    return NextResponse.json(error.message, {status:404})    
  }
}

export async  function PUT(req,{params}){
    
    try {
        const data = await req.json()
        const taskUpdate =  await taskModel.findByIdAndUpdate(params.id, data, {new:true})
     
     
         return NextResponse.json({taskUpdate})
     
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}

export async function DELETE(req,{params}){
    
    try {
        const taskDelet= await taskModel.findByIdAndDelete(params.id)
        if(!taskDelet){
            return NextResponse.json({error:"No encontrado"},{status:404})
        }
      
        return NextResponse.json({message: `Eliminando tarea ${params.id}`})
    
    } catch (error) {
        return NextResponse.json(error.message, {status: 400})
    }
}