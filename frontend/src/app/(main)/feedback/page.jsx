'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short!')
    .max(50, 'Name is too long!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  description: Yup.string()
    .min(10, 'Description is too short!')
    .required('Description is required'),
});

const page = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      description: '',
    },
    validationSchema: FeedbackSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/feedback/add`, values);
        console.log('Feedback response:', response.data);
        toast.success('Feedback submitted successfully!');
        resetForm();
      } catch (error) {
        console.error('Error submitting feedback:', error);
        toast.error('Failed to submit feedback. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-rose-800">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-rose-200 mb-8">
            Share Your Feedback
          </h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-rose-100">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="Your name"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="mt-1 text-xs text-rose-400">{formik.errors.name}</div>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-rose-100">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="your.email@example.com"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-1 text-xs text-rose-400">{formik.errors.email}</div>
              )}
            </div>

            {/* Description Textarea */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-rose-100">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="Please share your feedback..."
              />
              {formik.touched.description && formik.errors.description && (
                <div className="mt-1 text-xs text-rose-400">{formik.errors.description}</div>
              )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-800 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;