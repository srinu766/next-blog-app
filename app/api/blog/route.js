// import { ConnectDB } from "@/lib/config/db"
// import BlogModel from "@/lib/models/BlogModel"
// import {writeFile} from 'fs/promises'

// const { NextResponse } = require("next/server")

// const LoadDB = async()=>{
//     await ConnectDB
// }

// LoadDB()

// export async function GET(request){
//     console.log("BLOG GET HIT")
//     return NextResponse.json({msg:"API GET WORKING"})
// }

// export async function POST(request){
//     const formData = await request.formData();
//     const timestamp = Date.now();

//     const image = formData.get('image');
//     const imageByteData = await image.arrayBuffer();
//     const buffer = Buffer.from(imageByteData)
//     const path = `./public/${timestamp}_${image.name}`
//     await writeFile(path,buffer);
//     const imgUrl = `/${timestamp}_${image.name}`

//     const blogData = {
//         title:`${formData.get('title')}`,
//         description:`${formData.get('description')}`,
//         category:`${formData.get('category')}`,
//         author:`${formData.get('author')}`,
//         image:`${imgUrl}`,
//         authorImg:`${formData.get('authorImg')}`
//     }

//     await BlogModel.create(blogData)

//     console.log("Blog Saved")

//     return NextResponse.json({success:true, msg:"Blog Added"});
// }




import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import BlogModel from "@/lib/models/BlogModel";
import { ConnectDB } from "@/lib/config/db";
import fs from "fs";


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

// GET handler
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ success: true, blogs });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST handler
export async function POST(request) {
  try {
    console.log("POST request received");
    const formData = await request.formData();
    const timestamp = Date.now();

    // Handle main image
    console.log("Processing main image...");
    const image = formData.get("image");
    if (!image) throw new Error("Image is missing in the form data");

    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const fileName = `${timestamp}_${image.name}`;
    const filePath = `./public/${fileName}`;
    await writeFile(filePath, buffer);
    const imgUrl = `/${fileName}`;

    // Handle author image
    console.log("Processing author image...");
    const authorImgFile = formData.get("authorImg");
    if (!authorImgFile)
      throw new Error("Author image is missing in the form data");

    const authorImgByteData = await authorImgFile.arrayBuffer();
    const authorBuffer = Buffer.from(authorImgByteData);
    const authorFileName = `${timestamp}_author_${authorImgFile.name}`;
    const authorFilePath = `./public/${authorFileName}`;
    await writeFile(authorFilePath, authorBuffer);
    const authorImgUrl = `/${authorFileName}`;

    // Prepare blog data
    console.log("Validating form data...");
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: authorImgUrl,
    };

    if (!blogData.title || !blogData.description) {
      throw new Error("Required fields are missing");
    }

    console.log("Saving blog to the database...");
    await BlogModel.create(blogData);

    console.log("Blog saved successfully");
    return NextResponse.json({ success: true, msg: "Blog added successfully" });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}


// DELETE handler
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get('id')

  const blog = await BlogModel.findById(id)

  fs.unlink(`./public${blog.image}` , ()=>{})

  await BlogModel.findByIdAndDelete(id)

  return NextResponse.json({msg:'Blog deleted'})
  
}