import React, { useEffect, useState } from 'react';
import { blog_data } from '@/Asserts/assets';
import BlogItem from './BlogItem';
import axios from 'axios';

const BlogList = () => {

  const [menu , setMenu] = useState("All")
  const [blogs, setBlogs] = useState([])

  console.log("blogs", blogs)

  const fetchBlogs = async ()=>{
    try{
      const response = await axios.get('/api/blog')
      setBlogs(response.data.blogs)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchBlogs()
  },[])

  return (
    <div className="flex flex-wrap justify-center gap-6 p-5">
      <div className='flex justify-center gap-6 my-10'>
        <button onClick={()=>setMenu("All")} className={menu === "All" ? 'bg-black text-white py-1 px-4 rounded-sm': ''}>All</button>
        <button onClick={()=>setMenu("Technology")} className={menu === "Technology" ? 'bg-black text-white py-1 px-4 rounded-sm': ''}>Technology</button>
        <button onClick={()=>setMenu("Startup")} className={menu === "Startup" ? 'bg-black text-white py-1 px-4 rounded-sm': ''}>Startup</button>
        <button onClick={()=>setMenu("Lifestyle")} className={menu === "Lifestyle" ? 'bg-black text-white py-1 px-4 rounded-sm': ''}>Lifestyle</button>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {blogs.filter((item)=>menu === "All" ? true : item.category === menu).map((blog) => (
          <div key={blog._id} className="w-[calc((100%/6)-1rem)] flex-shrink-0 flex">
            <BlogItem
              title={blog.title}
              category={blog.category}
              description={blog.description}
              image={blog.image}
              id={blog._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;