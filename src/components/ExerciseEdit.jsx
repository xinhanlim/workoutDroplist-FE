import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useJwt from "../utils/UserStore";
import { toast } from "react-toastify";

export default function ExerciseEdit({ open, onClose, onUpdated, exercise }) {

    const { getJwt } = useJwt();
    const validationSchema = Yup.object({
        name: Yup.string().trim()
            .required("Name is required"),

        muscleGroup: Yup.string().transform(v => (v ?? "").toLowerCase())
            .oneOf(["core", "arms", "legs", "chest", "shoulders", "full body", "back"])
            .required("Pick a group"),

        unit: Yup.string().required("Units are required"),

        difficulty: Yup.string()
            .oneOf(["Beginner", "Intermediate", "Advanced"], "Pick valid difficulty")
            .required("Difficulty is required")
    });
    console.log("Pass")
    const initialValues = {
        "name": exercise.name,
        "muscleGroup": exercise.muscleGroup,
        "unit": exercise.unit,
        "difficulty": exercise.difficulty
    }


    const handleSubmit = async (values, formikHelpers) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = getJwt();
            const response = await axios.put(apiUrl + `/api/users/exercise/update/${exercise._id}`, values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("[EDIT] submit url:", `${apiUrl}/api/users/exercise/update/${exercise._id}`);
            console.log("[EDIT] payload:", values);

            toast.success('Exercise Updated Successfully');
            formikHelpers.resetForm();
            const updated = response.data
            onUpdated(updated);
            console.log("Updated", updated)
            onClose();

        } catch (e) {
            console.error(e);
            toast.warn("Error creating Exercise, /nPlease Check the Fields")

        } finally {
            formikHelpers.setSubmitting(false);
        }
    }
    return (
        <>
            <Dialog open={open} onClose={onClose} className="relative z-50">
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-[#282828]/60">
                    <DialogPanel className="w-full max-w-md border-1 bg-[#f5f5f7] p-6 shadow-xl">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-bold text-[#4d4d4d]  ">Update Exercise</DialogTitle>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-800"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {
                                function (formik) {
                                    return (
                                        <Form className="flex flex-col min-w-[360px] w-full max-w-md px-2 mx-auto my-8 space-y-8">
                                            <div>
                                                <label className="block text-sm font-medium text-[#282828]">Name</label>
                                                <Field
                                                    id='name'
                                                    name="name"
                                                    placeholder="e.g. Plank"
                                                    className="mt-1 block w-full border border-[#4d4d4d]/20 px-3 py-2 text-[#282828] placeholder-[#4d4d4d] shadow-sm  sm:text-sm"
                                                />
                                                <ErrorMessage name="name" component="div" className="text-sm text-red-500 mt-1" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#282828]">Muscle Group</label>
                                                <Field
                                                    id='muscleGroup'
                                                    as="select"
                                                    name="muscleGroup"
                                                    className="mt-1 block w-full border border-[#4d4d4d]/20 px-3 py-2 text-[#282828] shadow-sm sm:text-sm"
                                                >
                                                    <option value="Core">Core</option>
                                                    <option value="Arms">Arms</option>
                                                    <option value="Legs">Legs</option>
                                                    <option value="Shoulders">Shoulders</option>
                                                    <option value="Full body">Full-Body</option>
                                                    <option value="Chest">Chest</option>
                                                    <option value="Back">Back</option>

                                                </Field>
                                                <ErrorMessage name="muscleGroup" component="div" className="mt-1 text-sm text-red-600" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#282828]">Units</label>
                                                <Field
                                                    id='unit'
                                                    as="select"
                                                    name="unit"
                                                    className="mt-1 block w-full border border-[#4d4d4d]/20 px-3 py-2 text-[#282828] shadow-sm  sm:text-sm"
                                                >
                                                <option value="Kgs">Kgs</option>
                                                <option value="lbs">lbs</option>
                                                <option value="Bodyweight">Bodyweight</option>
                                                <option value="Reps">Reps</option>
                                                </Field>
                                                <ErrorMessage name="unit" component="div" className=" text-sm text-red-600" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#282828]">Difficulty</label>
                                                <Field
                                                    id='difficulty'
                                                    as="select"
                                                    name="difficulty"
                                                    className="mt-1 block w-full border border-[#4d4d4d]/20 px-3 py-2 text-[#282828] shadow-sm sm:text-sm"
                                                >
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Advanced">Advanced</option>
                                                </Field>
                                                <ErrorMessage name="difficulty" component="div" className="mt-1 text-sm text-red-600" />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full cursor-pointer  bg-[#282828] px-4 py-2 text-[#F5F5F7] font-medium shadow hover:bg-[#4d4d4d]"
                                                disabled={formik.isSubmitting}
                                            > Update Exercise
                                            </button>
                                        </Form>
                                    )
                                }
                            }
                        </Formik>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}