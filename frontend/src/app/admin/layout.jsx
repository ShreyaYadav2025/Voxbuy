import React from 'react'
import AdminSidebar from '@/components/AdminSidebar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="ml-64 p-8">
                {children}
            </div>
        </div>
    )
}

export default Layout;