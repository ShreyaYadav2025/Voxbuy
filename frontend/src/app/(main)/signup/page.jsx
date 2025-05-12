'use client';
import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('password nhi hai tumhara?')
  .min(8,'munumum 8 characters')
  .matches(/[a-z]/,' lowercase letter is required')
  .matches(/[A-Z]/,' uppercase letter is required')
  .matches(/[0-9]/,' number letter is required')
  .matches(/\W/,' special character letter is required'),
  confirmPassword: Yup.string().required('confirm password is required')
  .oneOf([ Yup.ref('password'),null], 'passwords must match')
});

const Signup = () => {

  const signupForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit:async (values) => {
      console.log(values);
     try {
       const res= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/add`,values);
       console.log(res.status);
       console.log(res.data);
     } catch (error) {
      console.log(error);
      toast.error('something went wrong');
     }
    },
    validationSchema:SignupSchema
  });

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="mt-7 max-w-md w-full bg-gray-900 border border-rose-800 rounded-2xl shadow-lg hover:shadow-rose-900/20 transition-shadow duration-300">
        <div className="p-6 sm:p-8">
          <div className="text-center">
            <h1 className="block text-3xl font-bold text-white">
              Sign up
            </h1>
            <p className="mt-3 text-sm text-gray-400">
              Already have an account?
              <a
                className="ml-1 text-rose-400 decoration-2 hover:underline font-medium"
                href="/login"
              >
                Log in 
              </a>
            </p>
          </div>

          <div className="mt-5">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-700 bg-gray-800 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <svg
                className="w-4 h-auto"
                width={46}
                height={47}
                viewBox="0 0 46 47"
                fill="none"
              >
                <path
                  d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                  fill="#4285F4"
                />
                <path
                  d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                  fill="#34A853"
                />
                <path
                  d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                  fill="#FBBC05"
                />
                <path
                  d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                  fill="#EB4335"
                />
              </svg>
              Sign up with Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-500 uppercase before:flex-1 before:border-t before:border-gray-700 before:me-6 after:flex-1 after:border-t after:border-gray-700 after:ms-6">
              Or
            </div>

            <form onSubmit={signupForm.handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm mb-2 text-gray-200"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.name}
                      className="py-3 px-4 block w-full bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none text-white placeholder-gray-500"
                      aria-describedby="name-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-rose-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {
                    (signupForm.touched.name && signupForm.errors.name)
                    && (<p className="text-xs text-rose-500 mt-2" id="name-error">
                        {signupForm.errors.name}
                        </p>
                      )
                  }
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm mb-2 text-gray-200"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.email}
                      className="py-3 px-4 block w-full bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none text-white placeholder-gray-500"
                      aria-describedby="email-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-rose-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {
                    (signupForm.touched.email && signupForm.errors.email)
                    && (<p className="text-xs text-rose-500 mt-2" id="email-error">
                        {signupForm.errors.email}
                        </p>
                      )
                  }
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm mb-2 text-gray-200"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.password}
                      className="py-3 px-4 block w-full bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none text-white placeholder-gray-500"
                      aria-describedby="password-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-rose-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {
                    (signupForm.touched.password && signupForm.errors.password)
                    && (<p className="text-xs text-rose-500 mt-2" id="password-error">
                        {signupForm.errors.password}
                        </p>
                      )
                  }
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm mb-2 text-gray-200"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      id="confirmPassword"
                      onChange={signupForm.handleChange}
                      value={signupForm.values.confirmPassword}
                      className="py-3 px-4 block w-full bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none text-white placeholder-gray-500"
                      aria-describedby="confirm-password-error"
                    />
                    <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg
                        className="size-5 text-rose-500"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  {
                    (signupForm.touched.confirmPassword && signupForm.errors.confirmPassword)
                    && (<p className="text-xs text-rose-500 mt-2" id="confirm-password-error">
                        {signupForm.errors.confirmPassword}
                        </p>
                      )
                  }
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-700 rounded-sm text-rose-600 focus:ring-rose-500 bg-gray-800 checked:bg-rose-500 checked:border-rose-500"
                    />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="remember-me" className="text-sm text-gray-200">
                      I accept the{" "}
                      <a
                        className="text-rose-400 decoration-2 hover:underline focus:outline-hidden focus:underline font-medium"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-rose-700 text-white hover:bg-rose-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;