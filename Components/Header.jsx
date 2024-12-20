import { assets } from '@/Asserts/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Header = () => {


  const [email, setEmail] = useState("")

  const onSubmitHandler = async (e)=>{
    e.preventDefault()
    const formData = new FormData()

    formData.append("email", email);

  const response = await axios.post("/api/email", formData)

  if(response.data.success){
    toast.success(response.data.msg)
    setEmail("")
  } else{
    toast.error("Error")
  }



  }




  return (
    <div className="py-8 px-6 md:px-12 lg:px-28 bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Image src={assets.logo} width={180} alt="Logo" className="w-[130px] sm:w-auto" />
        <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-black shadow-[7px_7px_0px_#000000] bg-white hover:bg-gray-200 active:shadow-[2px_2px_0px_#000000] transition-all">
          Get started <Image src={assets.arrow} alt="Arrow" />
        </button>
      </div>

      {/* Blog Section */}
      <div className="text-center my-10">
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-800">Latest Blogs</h1>
        <p className="mt-6 max-w-[740px] mx-auto text-sm sm:text-base text-gray-600">
          Stay updated with the latest trends and insights in the industry.
        </p>

        {/* Subscription Form */}
        <form onSubmit={onSubmitHandler} className="flex items-center justify-between max-w-[500px] mx-auto mt-8 bg-white rounded-md shadow-lg border border-gray-300 overflow-hidden ">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="flex-1 pl-4 py-3 text-gray-800 outline-none text-sm sm:text-base"
          />
          <button  type='submit' className="bg-black text-white py-3 px-6 text-sm sm:text-base hover:bg-gray-800 transition">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
