import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

// Connect to the database
const LoadDB = async () => {
    try {
      await ConnectDB();
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Failed to connect to the database:", error);
    }
  };
  
  LoadDB();


export async function POST(request){
    const formData =  await request.formData();
    const emailData = {
        email:`${formData.get('email')}`,
    }

    await EmailModel.create(emailData)
    return NextResponse.json({success:true,msg:"Emali Subscribed"})
}


export async function GET(request){
  const emails  = await EmailModel.find({})
  return NextResponse.json({emails})
}

export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id');
  await  EmailModel.findByIdAndDelete(id)
  return NextResponse.json({ success:true, msg:"Email deleted success"})
}