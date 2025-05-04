'use client';
import Navbar from '@/components/Navbar';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Login = () => {
    // Define validation schema with Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required')
    });

    // Initialize Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values ,{resetForm, setSubmitting}) => {
            console.log('Form submitted with values:', values);
            axios.post(`${ process.env.NEXT_PUBLIC_API_URL}/user/authenticate`,values)
            .then((result) => {
              toast.success('login successfully');
              localStorage.setItem('token', result.data.token); 
              resetForm();
              
            }).catch((err) => {
              setSubmitting(false);
              console.log(err);
              toast.error('login failed!');
              
            });
            // Here you would typically handle login API call
        }
    });

    return (
        <div className=" bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md p-8">
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8">
                    <h2 className="mb-6 text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Login
                    </h2>
                    <form 
                        className="space-y-6"
                        onSubmit={formik.handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    formik.touched.email && formik.errors.email 
                                        ? 'border-red-500 ring-red-100' 
                                        : 'border-gray-200 ring-blue-100'
                                } bg-white shadow-sm transition duration-200 focus:ring-4 outline-none`}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="mt-1 text-sm text-red-500">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    formik.touched.password && formik.errors.password 
                                        ? 'border-red-500 ring-red-100' 
                                        : 'border-gray-200 ring-blue-100'
                                } bg-white shadow-sm transition duration-200 focus:ring-4 outline-none`}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="mt-1 text-sm text-red-500">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium focus:ring-4 ring-blue-100 disabled:opacity-50"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? 'Signing in...' : 'Log in'}
                        </button>
                        
                        <div className="relative flex items-center justify-center mt-8">
                            <span className="absolute inset-x-0 h-px bg-gray-200" />
                            <span className="relative bg-white px-4 text-sm text-gray-500">
                                Or continue with
                            </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-200">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z" fill="#1877F2"/>
                                </svg>
                                Facebook
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition duration-200">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z" fill="#4285F4"/>
                                    <path d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z" fill="#34A853"/>
                                    <path d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z" fill="#FBBC05"/>
                                    <path d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z" fill="#EA4335"/>
                                </svg>
                                Google
                            </button>
                        </div>
                        
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="font-medium text-blue-600 hover:text-blue-700 transition duration-200"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;