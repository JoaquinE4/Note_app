import { NextResponse } from "next/server";
import { connectDB } from "@/utils/nogoose";


export function GET(){
    connectDB()
    return NextResponse.json({message:"hola Mundo"})
}