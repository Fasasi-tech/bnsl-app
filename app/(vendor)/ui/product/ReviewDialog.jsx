'use client'
import React, {useState} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"
import {useRatingsMutation} from '../../../ui/utils/slices/usersApiSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Formik } from 'formik';
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { IoMdAdd } from "react-icons/io";
const ReviewDialog = ({id}) => {
    // const [star, setStar] = useState(null)
    const [postRatings] = useRatingsMutation()

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
       
        try {
            const res = await postRatings({id:id, ...values}).unwrap();
           
            setSubmitting(false);
            toast.success('Reviews created successfully!');
          //   router.push('/vendor-products')
            resetForm();
        } catch (err) {
        
          toast.error(err.data?.message || err.error);
          setSubmitting(false);
        }
      };
  return (
    <>
        <Dialog>
            <DialogTrigger>
               <button className='p-2 text-3xl text-white'><IoMdAdd/></button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-gray-600'>
                        Add Review
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                       review:"",
                       ratings:"" 
                    }}

                    validate ={(values) =>{
                        const errors={}

                        if (!values.review){
                            errors.review='Required'
                        }

                        if (!values.ratings){
                            errors.ratings='Required'
                        }

                        return errors;
                    }}
                    onSubmit={handleSubmit}
                        >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue
                        
                    }) => (
                        <form onSubmit ={handleSubmit}>
                            <div className=''>
                                <Label htmlFor="messages" className='block text-base mb-2 text-gray-500 pl-2 font-semibold'>Review</Label>
                                <Textarea
                                    placeholder="Type your review here."
                                    type="text"
                                    name="review"
                                    id="review"
                                    value={values.review}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className='p-2 w-full outline-none  dark:bg-slate-800 border border-solid border-slate-300 text-gray-500 h-40 bg-transparent'
                                />
                                {touched.review && errors.review ? <div className='text-red-500 pl-2 font-semibold'>{errors.review}</div> : null}
                            </div>
                            <div>
                                <Label>Ratings</Label>
                            <Select  onValueChange={(value) => setFieldValue('ratings', value)}  value={values.ratings}>
                                <SelectTrigger className="md:w-1/4 w-full">
                                    <SelectValue placeholder="star" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem ></SelectItem> 
                                    <SelectItem value="1">1</SelectItem>
                                    <SelectItem value="2">2</SelectItem>
                                    <SelectItem value="3">3</SelectItem>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="5">5</SelectItem>
                                </SelectContent>
                            </Select>
                            {touched.ratings && errors.ratings ? (
                                <div className='text-red-500 pl-2 font-semibold'>{errors.ratings}</div>
                            ) : null}
                            </div>
                            <div className='mt-4 w-full'>
                                <Button  className={`${ isSubmitting? 'opacity-50 cursor-not-allowed':''}`}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
                            </div>
                        </form>
                    )}
                    
                </Formik>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            </DialogContent>
        </Dialog>
    </>
  )
}

export default ReviewDialog