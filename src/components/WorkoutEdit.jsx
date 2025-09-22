import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useJwt from "../utils/UserStore";
import { toast } from "react-toastify";

export default function WorkoutEdit({ open, onClose, onUpdated,  workout, exercises = [] }) {

    const { getJwt } = useJwt();
    const allowed = exercises.map(e => e.name);

    const setSchema = Yup.object({
        name: Yup.string().oneOf(allowed, "Exercise not in list").required(),
        weight: Yup.number()
            .typeError("Weight must be a number")
            .min(0, "Weight cannot be negative")
            .nullable(),
        reps: Yup.number()
            .typeError("Reps must be a number")
            .integer("Reps must be an integer")
            .nullable(),
        timing: Yup.string()
            .nullable(),
    });

    const validationSchema = Yup.object({
        notes: Yup.string().trim().required("Notes is required"),
        sets: Yup.array()
            .of(setSchema)
            .min(1, "Add at least one set")
            .required("Sets are required"),
    });

    const initialValues = {
        date: new Date(),
        notes: workout.notes,
        sets: workout.sets.map((idx) => ({
            name: idx.name,
            weight: idx.weight,
            reps: idx.reps,
            rpe: idx.rpe
        }))
    }

    const handleSubmit = async (values, formikHelpers) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = getJwt();
            const response = await axios.put(apiUrl + `/api/users/workout/update/${workout._id}`, values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success('Exercise Updated Successfully');
            formikHelpers.resetForm();
            const updated = response.data;
            onUpdated(updated);
            onClose();
        } catch (e) {
            console.error(e);
            toast.warn("Error creating Workout, Please Check the Fields")

        } finally {
            formikHelpers.setSubmitting(false);
        }
    }
    return (
        <>
            <Dialog open={open} onClose={onClose} className="relative z-50">
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-[#282828]/60">
                    <DialogPanel className="w-full max-w-md border-1 bg-[#f5f5f7] p-6 shadow-xl overflow-y-auto max-h-[80vh]">
                        <div className="flex items-center justify-between">
                            <DialogTitle className="text-xl font-bold text-[#4d4d4d]  ">Update Workout</DialogTitle>
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
                                        <Form className="flex flex-col w-full max-w-md px-2 mx-auto my-8 space-y-8">
                                            <div>
                                                <label className="block text-sm font-medium text-[#282828]">Notes</label>
                                                <Field
                                                    id='notes'
                                                    name="notes"
                                                    placeholder="e.g. Description"
                                                    className="mt-1 w-full border border-[#4d4d4d]/20 px-3 py-2 text-[#282828] placeholder-[#4d4d4d] shadow-sm  sm:text-sm"
                                                />
                                                <ErrorMessage name="notes" component="div" className="text-sm text-red-500 mt-1" />
                                            </div>
                                            <FieldArray name="sets">
                                                {({ push, remove }) => (
                                                    <>
                                                        <div className="flex items-center justify-between ">
                                                            <label className="block text-sm font-medium text-[#282828]">Sets</label>
                                                            <button
                                                                type="button"
                                                                className="px-3 py-1 text-sm ring-1 ring-[#282828] hover:bg-black/5"
                                                                onClick={() => push({ name: "", weight: "", reps: "", rpe: "" })}
                                                            >
                                                                + Add Set
                                                            </button>
                                                        </div>

                                                        {formik.values.sets.map((_, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="grid grid-cols-2 gap-4 md:gap-3 items-start border border-[#4d4d4d]/10 p-3"
                                                            >
                                                                <div className="col-span-2 md:col-span-2">
                                                                    <label className="block text-xs text-[#282828]/80">Exercise</label>
                                                                    <Field
                                                                        as="select"
                                                                        name={`sets[${idx}].name`}
                                                                        className="mt-1 block w-full border border-[#4d4d4d]/20 px-2 py-2 text-[#282828] sm:text-sm"
                                                                    >
                                                                        <option value="" disabled>Select exercise…</option>
                                                                        {exercises.map((ex) => (
                                                                            <option key={ex._id} value={ex.name}>
                                                                                {ex.name}
                                                                            </option>
                                                                        ))}
                                                                    </Field>
                                                                    <ErrorMessage
                                                                        name={`sets[${idx}].name`}
                                                                        component="div"
                                                                        className="text-xs text-red-600 mt-1"
                                                                    />
                                                                </div>

                                                                {/* Weight */}
                                                                <div>
                                                                    <label className="block text-xs text-[#282828]/80">Weight</label>
                                                                    <Field
                                                                        name={`sets[${idx}].weight`}
                                                                        type="number"
                                                                        min="0"
                                                                        step="0.5"
                                                                        placeholder="e.g. 50"
                                                                        className="mt-1 block w-full border border-[#4d4d4d]/20 px-2 py-2 text-[#282828] sm:text-sm"
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`sets[${idx}].weight`}
                                                                        component="div"
                                                                        className="text-xs text-red-600 mt-1"
                                                                    />
                                                                </div>

                                                                {/* Reps */}
                                                                <div>
                                                                    <label className="block text-xs text-[#282828]/80">Reps</label>
                                                                    <Field
                                                                        name={`sets[${idx}].reps`}
                                                                        type="number"
                                                                        min="1"
                                                                        step="1"
                                                                        placeholder="e.g. 8"
                                                                        className="mt-1 block w-full border border-[#4d4d4d]/20 px-2 py-2 text-[#282828] sm:text-sm"
                                                                    />
                                                                    <ErrorMessage
                                                                        name={`sets[${idx}].reps`}
                                                                        component="div"
                                                                        className="text-xs text-red-600 mt-1"
                                                                    />
                                                                </div>

                                                                {/* RPE + Remove */}
                                                                <div className="col-span-2 flex items-end gap-2">
                                                                    <div className="flex-1">
                                                                        <label className="block text-xs text-[#282828]/80">Timings(s)</label>
                                                                        <Field
                                                                            name={`sets[${idx}].timing`}
                                                                            id ="timing"
                                                                            placeholder="e.g. 15mins20sec"
                                                                            className="mt-1 block w-full border border-[#4d4d4d]/20 px-2 py-2 text-[#282828] sm:text-sm"
                                                                        />
                                                                        <ErrorMessage
                                                                            name={`sets[${idx}].timing`}
                                                                            component="div"
                                                                            className="text-xs text-red-600 mt-1"
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => remove(idx)}
                                                                        className="self-end px-4 py-2 text-sm ring-1 ring-[#282828] hover:bg-black/5"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </FieldArray>
                                            <button
                                                type="submit"
                                                className="w-full cursor-pointer  bg-[#282828] px-4 py-2 text-[#F5F5F7] font-medium shadow hover:bg-[#4d4d4d]"
                                                disabled={formik.isSubmitting}
                                            > Update Workout
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