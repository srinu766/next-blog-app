// import { assets } from "@/Asserts/assets";
// import Image from "next/image";
// import React from "react";

// const BlogTableItem = ({ authorImg , title, dat}) => {
//   return (
//     <tr className="bg-white border-b">
//       <th
//         scope="row"
//         className="items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-normal">
//       <Image src={authorImg ? authorImg : assets.profile_icon} alt="" width={40} height={40} />
//       </th>
//       <td className="px-6 py-4">
//       {title ? title :"no title"}

//       </td>
//       <td className="px-6 py-4">
//       {"11 Dec 2024"}
//       </td>
//       <td className="px-6 py-4">
//       X
//       </td>
//     </tr>
//   );
// };

// export default BlogTableItem;




import { assets } from "@/Asserts/assets";
import Image from "next/image";
import React from "react";

const BlogTableItem = ({id, authorImg, title, date, onDelete }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-100 transition duration-200">
      <th
        scope="row"
        className="flex items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-normal"
      >
        <Image
          src={authorImg ? authorImg : assets.profile_icon}
          alt="Author Image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-sm font-semibold">
          {authorImg ? "Author" : "Unknown"}
        </span>
      </th>
      <td className="px-6 py-4 text-gray-800">{title ? title : "No Title"}</td>
      <td className="px-6 py-4 text-gray-600">
        {date
          ? new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Unknown Date"}
      </td>

      <td className="px-6 py-4">
        <button 
         onClick={() => onDelete(id)}
         className="text-red-500 hover:text-red-700 font-medium transition duration-200">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default BlogTableItem;
