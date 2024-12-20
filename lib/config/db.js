import mongoose from "mongoose";

export const ConnectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://namastedev:pK9FgUgTgiEe3Un6@namastenode.r4b4x.mongodb.net/blog-app")
        // console.log("DB connected successfully")

    }catch(err){
        console.log("DB connection failed")
    }
}