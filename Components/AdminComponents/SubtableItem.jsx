// import React from 'react'

// const SubtableItem = ({email}) => {
//   return (
//     <tr className='bg-white border-b text-left '>
//     <th scope='row'  className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{email ? email:"No Email"}</th>
//     <td className='px-6 py-4 hidden sm:block '>{"11 Dec 2024"}</td>
//     <td className='px-6 py-4 cursor-pointer'>{"delete"}</td>

//     </tr>
//   )
// }

// export default SubtableItem


import React from 'react'

const SubtableItem = ({ email, mongoId, date, deleteHandler }) => {

  const emailDate = new Date(date)
  
  return (
    <tr className='bg-white border-b text-left'>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {email ? email : "No Email"}
      </th>
      <td className='px-6 py-4 hidden sm:block'>{emailDate.toDateString()}</td>
      <td className='px-6 py-4 cursor-pointer text-red-500 hover:underline' onClick={()=>deleteHandler(mongoId)}>Delete</td>
    </tr>
  )
}

export default SubtableItem
