// 'use client'
// import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
// import React from 'react'

// const page = () => {
//   return (
//     <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
//     <h1>All blogs</h1>
//       <div className='relative h-[80vh] max-w[850px] overflow-x-auto mt-4 border border-black scrollbar-hide'>
//       <table className='w-full text-sm text-gray-500'>
//       <thead className='text-sm text-gray-700 text-left bg-gray-50'>
//       <tr>
//         <th scope='col' className='hidden sm:block px-6 py-3'> Author name</th>
//         <th scope='col' className='px-6 py-3'>Blog title</th>
//         <th scope='col' className='px-6 py-3'> Blog date</th>
//         <th scope='col' className='px-6 py-3'> Action</th>
//       </tr>

//       </thead>
//       <tbody>
//         <BlogTableItem/>
//       </tbody>

//       </table>

//       </div>
//     </div>
//   )
// }

// export default page

// "use client"

// import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const Page = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBlogs = async () => {
//     try {
//       const response = await axios.get("/api/blog");
//       setBlogs(response.data.blogs);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       setLoading(false);
//     }
//   };


//   const deleteBlog2 = async (mongoId) => {
//     try {
//       // await axios.delete(`/api/blog/`,{
//       //   params:{
//       //     id:mongoId
//       //   }
//       // });
//       await axios.delete(`/api/blog/${mongoId}`);
//       toast.success(response.data.msg)
//       fetchBlogs();
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//       toast.error("Error deleting blog", error)
//     }
//   };

//   const deleteBlog = async (mongoId) => {
//     try {
//       const response = await axios.delete(`/api/blog`, {
//         params: { id: mongoId },
//       });
  
//       toast.success(response.data.msg);
//       fetchBlogs(); // Refresh the blog list after deletion
//     } catch (error) {
//       console.error("Error deleting blog:", error);
//       toast.error("Failed to delete blog. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   return (
//     <div className="flex-1 pt-8 px-5 sm:pt-12 sm:pl-16">
//       <h1 className="text-2xl font-semibold text-gray-800">All Blogs</h1>
//       <div className="relative mt-6 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
//         {loading ? (
//           <div className="text-center py-10 text-gray-500">Loading...</div>
//         ) : blogs.length > 0 ? (
//           <div className="overflow-x-auto max-h-[70vh] scrollbar-hide">
//             <table className="w-full text-sm text-gray-600">
//               <thead className="bg-gray-50 text-sm text-gray-700 uppercase text-left">
//                 <tr>
//                   <th scope="col" className="hidden sm:block px-6 py-4">
//                     Author Name
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     Blog Title
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     Blog Date
//                   </th>
//                   <th scope="col" className="px-6 py-4">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {blogs.map((blog) => (
//                   <BlogTableItem
//                     key={blog._id} 
//                     id={blog._id}
//                     authorImg={blog.authorImg}
//                     title={blog.title}
//                     date={blog.date} 
//                     onDelete={deleteBlog}
//                   />
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center py-10 text-gray-500">
//             No blogs available.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;




"use client";

import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    }
  };

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete(`/api/blog`, {
        params: { id: mongoId },
      });

      toast.success(response.data.msg);
      fetchBlogs(); // Refresh blogs list
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-8 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-2xl font-semibold text-gray-800">All Blogs</h1>
      <div className="relative mt-6 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        ) : blogs.length > 0 ? (
          <div className="overflow-x-auto max-h-[70vh] scrollbar-hide">
            <table className="w-full text-sm text-gray-600">
              <thead className="bg-gray-50 text-sm text-gray-700 uppercase text-left">
                <tr>
                  <th scope="col" className="hidden sm:block px-6 py-4">
                    Author Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Blog Title
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Blog Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <BlogTableItem
                    key={blog._id}
                    id={blog._id}
                    authorImg={blog.authorImg}
                    title={blog.title}
                    date={blog.date}
                    onDelete={deleteBlog}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No blogs available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
