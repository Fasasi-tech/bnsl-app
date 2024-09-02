
'use client';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEmailtMutation } from '@/app/ui/utils/slices/usersApiSlice';
import UsersList from './UsersList';

const Email = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [email] = useEmailtMutation();

    const handleSubmit = async (values, { setSubmitting, resetForm, setFieldValue }) => {
        try {
            let attachment = null;
            if (values.attachment) {
                const reader = new FileReader();
                reader.readAsDataURL(values.attachment);
                reader.onload = () => {
                    attachment = {
                        filename: values.attachment.name,
                        content: reader.result,
                    };
                    submitEmail(values, attachment, resetForm, setFieldValue);
                };
                reader.onerror = error => {
                    alert('Error reading file', error);
                    setSubmitting(false);
                };
            } else {
                submitEmail(values, attachment, resetForm, setFieldValue);
            }
        } catch (err) {
            alert(err?.message || 'An error occurred');
            setSubmitting(false);
        }
    };

    const submitEmail = async (values, attachment, resetForm, setFieldValue) => {
        try {
            const emailData = {
                messages: values.messages,
                subjects: values.subjects,
                receipients: selectedUsers.map(id => ({ id })),
                attachment,
            };

            await email(emailData).unwrap();
            alert('Email submitted successfully');
            resetForm();
            setSelectedUsers([]);
            setFieldValue('attachment', null, false);
        } catch (err) {
            alert(err?.message || 'An error occurred');
        }
    };

    return (
        <div className='flex items-start justify-between  gap-2 rounded-lg flex-wrap lg:flex-nowrap w-full mb-4'>
            <div className='bg-white w-full shadow-sm min-h-[32rem]  rounded-lg lg:w-1/3 p-8'>
                <Formik
                    initialValues={{
                        messages: "",
                        subjects: "",
                        receipients: [],
                        attachment: null,
                    }}
                    validate={(values) => {
                        const errors = {};

                        if (!values.messages) {
                            errors.messages = 'Required';
                        }

                        if (!values.subjects) {
                            errors.subjects = 'Required';
                        }

                        if (selectedUsers.length === 0) {
                            errors.recipients = 'At least one recipient is required';
                        }

                        if (values.attachment) {
                            const allowedTypes = [
                                'application/pdf',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                'application/vnd.ms-excel',
                                'image/jpeg',
                                'image/png',
                                'image/gif'
                            ];
                            if (!allowedTypes.includes(values.attachment.type)) {
                                errors.attachment = 'Only .pdf, .xlsx, .xls, .docx, and image files are allowed';
                            }
                        }
                

                        return errors;
                    }}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="subjects">Subjects</Label>
                                    <Input
                                        type='text'
                                        name="subjects"
                                        id="subjects"
                                        value={values.subjects}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Subjects'
                                        className="col-span-3 mt-2 pl-8"
                                    />
                                    {touched.subjects && errors.subjects ? (
                                        <div className='text-red-500 pl-2 font-semibold'>{errors.subjects}</div>
                                    ) : null}
                                </div>

                                <div className=''>
                                    <label htmlFor="messages" className='block text-base mb-2 text-gray-500 pl-2 font-semibold'>Messages</label>
                                    <Textarea
                                        placeholder="Type your message here."
                                        type="text"
                                        name="messages"
                                        id="messages"
                                        value={values.messages}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className='p-2 w-full outline-none  dark:bg-slate-800 border border-solid border-slate-300 text-gray-500 h-40 bg-transparent'
                                    />
                                    {touched.messages && errors.messages ? <div className='text-red-500 pl-2 font-semibold'>{errors.messages}</div> : null}
                                </div>
                                <div className=''>
                                    <label htmlFor="attachment" className='block text-base mb-2 text-gray-500 pl-2 font-semibold'>Attachment</label>
                                    <Input
                                        type='file'
                                        name="attachment"
                                        id="attachment"
                                        accept=".pdf,.xlsx,.docx,.jpeg,.jpg,.png,.xls,.gif"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            setFieldValue("attachment", file);
                                        }}
                                        className='p-2 w-full outline-none dark:bg-slate-800 border border-solid border-slate-300 text-gray-500 h-12 bg-transparent'
                                    />
                                    {touched.attachment && errors.attachment ? <div className='text-red-500 pl-2 font-semibold'>{errors.attachment}</div> : null}
                                </div>
                                <div className=''>
                                    <Button type="submit" variant="destructive" className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
                                </div>
                                <Input
                                    type="hidden"
                                    name="receipients"
                                    value={JSON.stringify(selectedUsers.map(id => ({ id })))}
                                />
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <div className='lg:w-2/3 w-full   bg-white rounded-lg shadow-sm p-8 max-h-[32rem] overflow-auto'>
                <UsersList selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
            </div>
        </div>
    );
};

export default Email;
