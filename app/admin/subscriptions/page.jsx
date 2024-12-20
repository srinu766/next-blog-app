

"use client";
import React, { useEffect, useState } from "react";
import SubtableItem from "@/Components/AdminComponents/SubtableItem";
import axios from "axios";
import { toast } from "react-toastify";



const Page = () => {

const subscriptions = [
  { email: "example@example.com", date: "11 Dec 2024" },
  { email: "test@test.com", date: "12 Dec 2024" },
  { email: null, date: "13 Dec 2024" },
];

const [emails, setEmails] = useState([]);

console.log("emails12", emails)

const getEmails = async () => {
  try {
    const response = await axios.get("/api/email");
    setEmails(response.data.emails);
  } catch (err) {
    console.log(err);
  }
};

useEffect(()=>{
  getEmails()
},[])

const deleteEmail = async (mongoId)=>{

  try {
    const response = await axios.delete("/api/email",{
      params:{
        id:mongoId
      }
    });
    if(response.data.success){
      toast.success(response.data.msg)
    }
    getEmails()
    
  } catch (err) {
    console.log("Error");
    toast.error("Error")
  }

}


  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="px-6 py-3 hidden sm:block">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead> 
          <tbody>
            {emails.map((sub, index) => (
              <SubtableItem 
              key={index}
              email={sub.email}
              date={sub.date}
              mongoId={sub._id} 
                deleteHandler ={deleteEmail}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
