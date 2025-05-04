'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ManageUser = () => {
  
  const [userlist, setUserList] = useState([]);
  const fetchUser = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/getall`);
    const data = res.data;
    console.table(data);
    setUserList(data);

  };

  useEffect(() => {
    fetchUser();
  }, []);
  const deleteUser = async (id) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/delete/${id}`);
    toast.success('user deleted successfully');
    fetchUser();
  }


  return (
  
    <div>
      <div className='container  mx-auto py-10'>
        <h1 className='text-center font-bold text-4xl'> Manage users</h1>
        <table className=' mt-5 w-full'>
          <thead className=' border '>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>CreatedAt</th>
            </tr>

          </thead>
          <tbody>
            {
              userlist.map((user) => {
                return <tr key={user._id}>
                  <td className='p-3 '>{user._id} </td>
                  <td className='p-3'> {user.name}</td>
                  <td className='p-3'> {user.email}</td>
                  <td className='p-3'> {new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className='p-3'>
                    <button onClick={() => { deleteUser(user._id) }} className='bg-red-500 text-white rounded p-3'> Delete </button>
                  </td>

                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUser;