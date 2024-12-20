"use client";
import { assets } from "@/Asserts/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title:"",
    description:"",
    category:"Startup",
    author:"Srinu",
    authorImg:"/author_Hero3.png"
  });

  const onChangeHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value;
    setData(data=>({...data, [name]:value}));
  }

  const onSubmit =  async (e)=>{
    e.preventDefault();

    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("category", data.category)
    formData.append("author", data.author)
    formData.append("authorImg", image)
    formData.append("image", image)

    const response = await axios.post('/api/blog', formData)

    if(response.data.success){
        toast.success(response.data.msg)
        setData({
            title: "",
            description: "",
            category: "Startup",
            author: "Srinu",
            // authorImg: "/author_Hero3.png",
            authorImg: null,
          });
          setImage(null); 
    } else{
        toast.error("Error: " + response.data.msg || "Failed to add blog.");
    
    }

  }

  return (
    <>
      <form onSubmit={onSubmit} className="px-5 pb-2 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-2"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            alt=""
            height={70}
          />
        </label>

        <input
          type="file"
          id="image"
          onChange={(e) => setImage(e.target.files[0])}
          hidden
          required
        />
        <p className="text-xl mt-2">Blog Title</p>
        <input
          type="text"
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          placeholder="Type here"
          className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
          required
        />

        <p className="text-xl mt-2">Blog decription</p>
        <textarea
          type="text"
          rows={6}
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          placeholder="Write content here"
          className="w-full sm:w-[500px] mt-2 px-4 py-2 border"
          required
        />
        <p className="text-xl mt-4">Blog category</p>
        <select name="category" className="w-40 mt-2 px-4 py-2 border text-gray-500"
          onChange={onChangeHandler}
          value={data.category}>
        <option value="Startup">Startup</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
        </select>
        <br/>
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white">Add</button>
      </form>
    </>
  );
};

export default page;
