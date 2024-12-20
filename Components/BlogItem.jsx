import React from 'react';
import Image from 'next/image';
import { assets } from '@/Asserts/assets';
import Link from 'next/link';

const BlogItem = ({ title, category, description, image, id }) => {
  return (
    <div className="max-w-[350px] sm:max-w-[300px] bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      {/* Blog Image */}
     
     <Link href={`/blogs/${id}`}>
      <Image
        src={image}
        alt={title}
        width={400}
        height={250}
        className="rounded-t-lg object-cover"
      />

</Link>

      {/* Blog Category */}
      <div className="p-4">
        <p className="inline-block bg-blue-500 text-white text-xs font-semibold uppercase px-2 py-1 rounded-md mb-3">
          {category}
        </p>

        {/* Blog Title */}
        <h5 className="text-lg font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
          {title}
        </h5>

        {/* Blog Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4"
        dangerouslySetInnerHTML={{__html:description.slice(0,120)}}></p>

        {/* Read More Section */}
        <Link href={`/blogs/${id}`}>
        <div className="flex items-center text-blue-500 font-medium hover:text-blue-600 cursor-pointer transition-colors duration-200">
          <span>Read more</span>
          <Image src={assets.arrow} alt="Arrow" width={16} height={16} className="ml-2" />
        </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
