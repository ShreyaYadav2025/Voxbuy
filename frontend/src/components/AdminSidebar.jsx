import React from 'react';
import Link from 'next/link';

const AdminSidebar = () => {
  return (
    <div className="bg-white shadow-lg h-screen w-64 fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        <div className="px-4 space-y-2">
          <Link href="/admin/dashboard" 
            className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/manage-user" 
            className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            Manage Users
          </Link>
          <Link href="/admin/manage-product" 
            className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            Manage Products
          </Link>
          <Link href="/admin/feedback" 
            className="block px-4 py-2 text-gray-700 hover:bg-blue-500 hover:text-white rounded-lg transition-colors">
            Manage Feedback
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;