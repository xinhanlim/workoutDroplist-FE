import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'wouter';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function RegisterPage() {

    const [_, setLocation] = useLocation();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validationSchema = Yup.object({
        displayName: Yup.string()
            .trim()
            .required("Display name must be at least 3 chars")
            .min(3, "Display name must be at least 3 chars"),
        email: Yup.string()
            .required("Invalid or missing email")
            .matches(emailRegex, "Invalid or missing email"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters includes numbers "),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match') 
            .required('Passwords must match'),
    });

    const initialValues = {
        displayName: "",
        email: "",
        password: "",
    }

    const handleSubmit = async (values, formikHelpers) => {
        console.log("CLICK SUBMIT")
        console.log("submitted values", values);
        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/api/users/register', values);
            if (response.status == 200) {
                setLocation("/api/users/login");
            }
        } catch (e) {
            console.log(e);
        } finally {
            formikHelpers.setSubmitting(false);
        }
    }
    return (
        <>
            <Navbar/>
            <div className="bg-[#F5F5F7] my-auto">
                <div className="my-auto" >
                    <div className=" flex mx-auto my-auto justify-center">
                        <div className="flex gap-4"></div>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                        >
                            {
                                (formik) => (<Form className="flex flex-col min-w-[360px] w-full max-w-md p-8 mx-auto my-12 space-y-8">
                                    <div>
                                        <p className="text-[64px] ">W O R K O U T  G A M I F I E D W O R K</p>
                                        <p className="text-sm text-gray-500 text-center">THANKS FOR CHOOSING US</p>
                                    </div>

                                    <div>
                                        <label htmlFor="displayName" className="block text-sm font-medium text-[#4d4d4d]" >Display Name:</label>
                                        <Field type="text" id="displayName" name="displayName" className="mt-1 block w-full border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        {formik.errors.displayName && formik.touched.displayName && <div className="text-sm text-red-600">{formik.errors.displayName}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#4d4d4d]">Email:</label>
                                        <Field type="email" id="email" name="email" className="mt-1 block w-full  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        {formik.errors.email && formik.touched.email && <div className="text-sm text-red-600">{formik.errors.email}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#4d4d4d]">Password:</label>
                                        <Field type="password" id="password" name="password" className="mt-1 block w-full border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        {formik.errors.password && formik.touched.password &&  <div className="text-sm text-red-600">{formik.errors.password}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#4d4d4d]" >Confirm Password:</label>
                                        <Field type="password" id="confirmPassword" name="confirmPassword" className="mt-1 block w-full  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                                        {formik.errors.confirmPassword && formik.touched.confirmPassword && <div className="text-sm text-red-600">{formik.errors.confirmPassword}</div>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer  bg-[#282828] px-4 py-2 text-[#F5F5F7] font-medium shadow hover:bg-[#4d4d4d]"
                                        disabled={formik.isSubmitting}
                                    >
                                        Create Account
                                    </button>
                                </Form>)
                            }
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}