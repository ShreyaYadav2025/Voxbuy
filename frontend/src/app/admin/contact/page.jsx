'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const page = () => {
    const [contact, setContact] = useState([]);
    const fetchContact = async () => {
        try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/contact/getall`);
            setContact(res.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            toast.error('Failed to load contacts');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/contact/delete/${id}`);
                toast.success('Contact deleted successfully');
                fetchContact(); // Refresh the list
            } catch (error) {
                console.error('Error deleting contact:', error);
                toast.error('Failed to delete contact');
            }
        }
    };

    useEffect(() => {
        fetchContact();
    }, []);

    return (
        <div>
            <div className='container mx-auto py-10'>
                <h1 className='text-center font-bold text-4xl'> Manage Contact</h1>
                <table className='mt-5 w-full border-collapse'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-4 py-3 text-left text-sm font-medium text-gray-500'>ID</th>
                            <th className='px-4 py-3 text-left text-sm font-medium text-gray-500'>Name</th>
                            <th className='px-4 py-3 text-left text-sm font-medium text-gray-500'>Email</th>
                            <th className='px-4 py-3 text-left text-sm font-medium text-gray-500'>Message</th>
                            <th className='px-4 py-3 text-left text-sm font-medium text-gray-500'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {contact.map((contact) => (
                            <tr key={contact._id} className='bg-white'>
                                <td className='px-4 py-3 text-sm text-gray-900'>{contact._id}</td>
                                <td className='px-4 py-3 text-sm text-gray-900'>{contact.name}</td>
                                <td className='px-4 py-3 text-sm text-gray-900'>{contact.email}</td>
                                <td className='px-4 py-3 text-sm text-gray-900'>{contact.message}</td>
                                <td className='px-4 py-3 text-sm'>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className='text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {contact.length === 0 && (
                            <tr>
                                <td colSpan="5" className='px-4 py-3 text-sm text-gray-500 text-center'>
                                    No contacts found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default page;