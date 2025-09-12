import React from 'react';
import Navbar from "../components/Navbar";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'wouter'
import useJwt from '../utils/UserStore'
import axios from 'axios';
import { toast } from 'react-toastify'


export default function LoginPage() {

    const [_, setLocation] = useLocation();
    const { setJwt } = useJwt();
    const initialValues = {
        "email": "",
        "password": ""
    }
 
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    const handleSubmit = async (values, formikHelpers) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await axios.post(apiUrl + '/api/users/login', values)
            setLocation('/profile')
            const token = response.data.token;
            setJwt(token);
            toast.success('Signed In Successfully');
        } catch (e) {
            console.error(e);
            toast.warn("Invaild Email or Password")

        } finally {
            formikHelpers.setSubmitting(false);
        }
    }

    return (
        <div className="bg-[#F5F5F7] ">
            <Navbar/>
                <div className=" flex mx-auto items-center justify-center mt-[72px] h-full">
                    <div className="flex gap-4">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {
                                function (formik) {
                                    return (
                                        <Form className="flex flex-col min-w-[360px] w-full max-w-md p-8 mx-auto my-12 space-y-8">
                                            <p className="text-[64px] text-[##282828] ">W O R K O U T  G A M I F I E D W O R K</p>
                                            <p className="text-sm text-[#4d4d4d] text-center">Login to continue to WorkOutGamified</p>

                                            <div className="space-y-3">
                                                <label className="block text-sm font-medium text-[#282828]">
                                                    Email
                                                </label>
                                                <Field
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="you@example.com"
                                                    className="mt-1 block w-full border border-[#4d4d4d]/20 px-3 py-2 text-[#282828]] placeholder-[#4d4d4d]shadow-sm  sm:text-sm"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-sm text-red-500 mt-1" />
                                            </div>

                                            <div className="space-y-3">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Password
                                                </label>
                                                <Field
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    className="mt-1 block w-full border border-[#4d4d4d]/20 px-3 py-2 text-[#282828] placeholder-[#4d4d4d] shadow-sm sm:text-sm"
                                                />
                                                <ErrorMessage name="password" component="div" className="text-sm text-red-500 mt-1" />
                                            </div>

                                            <div className="space-y-3">
                                                <button
                                                    type="submit"
                                                    className="w-full cursor-pointer bg-[#282828] px-4 py-2 text-[#F5F5F7] font-medium shadow hover:bg-[#4d4d4d]"
                                                    disabled={formik.isSubmitting}
                                                >
                                                    Log In
                                                </button>
                                                <button
                                                    type="button"
                                                    className="w-full cursor-pointer bg-[#F5F5F7] px-4 py-2 text-[#282828] font-medium shadow hover:bg-[#bdbdbd]"
                                                    onClick={() => setLocation('/register')}
                                                    disabled={formik.isSubmitting}
                                                >
                                                    Register
                                                </button>
                                            </div>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>
                    </div>
                </div>
            </div>
    )
}