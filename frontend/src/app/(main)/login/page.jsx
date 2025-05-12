'use client';
import Navbar from '@/components/Navbar';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {

    const router = useRouter();
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
        onSubmit: (values, {resetForm, setSubmitting}) => {
            console.log('Form submitted with values:', values);
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, values)
            .then((result) => {
              toast.success('login successfully');
              localStorage.setItem('token', result.data.token); 
              router.push('/browseproduct');
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
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="w-full max-w-md p-8">
                <div className="bg-gray-900 rounded-2xl shadow-[0_8px_30px_rgb(139,0,0,0.3)] p-8 border border-rose-800">
                    <h2 className="mb-6 text-center text-3xl font-bold bg-gradient-to-r from-rose-500 to-red-900 bg-clip-text text-transparent">
                        Login
                    </h2>
                    <form 
                        className="space-y-6"
                        onSubmit={formik.handleSubmit}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
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
                                        ? 'border-rose-500 ring-rose-900' 
                                        : 'border-gray-700 ring-rose-800'
                                } bg-gray-800 shadow-sm transition duration-200 focus:ring-4 outline-none text-white`}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="mt-1 text-sm text-rose-400">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-2"
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
                                        ? 'border-rose-500 ring-rose-900' 
                                        : 'border-gray-700 ring-rose-800'
                                } bg-gray-800 shadow-sm transition duration-200 focus:ring-4 outline-none text-white`}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="mt-1 text-sm text-rose-400">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-rose-800 to-red-900 text-white rounded-lg shadow-lg hover:from-rose-700 hover:to-red-800 transition-all duration-200 font-medium focus:ring-4 ring-rose-900 disabled:opacity-50"
                            disabled={formik.isSubmitting}
                        >
                            {formik.isSubmitting ? 'Signing in...' : 'Log in'}
                        </button>
                              
                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="font-medium text-rose-500 hover:text-rose-400 transition duration-200"
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