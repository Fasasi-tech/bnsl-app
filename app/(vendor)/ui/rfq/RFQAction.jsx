'use client'
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import { HiDotsHorizontal } from "react-icons/hi";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { useSingleRfqQuery } from '../../../ui/utils/slices/usersApiSlice';
import Loader from '../../../ui/utils/Loader';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
 import { BsCloudUpload } from 'react-icons/bs';
 import { AiOutlineTeam } from 'react-icons/ai';
 import { Formik } from 'formik';
import LoaderBtn from '../../../ui/utils/LoaderBtn';
import { usePostResponseMutation } from '../../../ui/utils/slices/usersApiSlice';

const RFQAction = ({userId}) => {
    const [preview, setPreview] = useState('');
    const [fileName, setFileName] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    const {data, isLoading, error} = useSingleRfqQuery(userId, {skip:!isOpen})
    const [postResponse] = usePostResponseMutation()



    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
          convertToBase64(file, setFieldValue);
        }
      };

      const convertToBase64 = (file, setFieldValue) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
          setFieldValue('attachment', reader.result);
        };
      };

      const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    
        try {
          const res = await postResponse(values).unwrap();
          
          setSubmitting(false);
            toast.success('Response submitted successfully!')
          resetForm();
        } catch (err) {
          
          toast.error(err.data?.message || err.error);
          setSubmitting(false);
        }
      };


   
  return (
   <Dialog Open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
            <Button variant='outline'><HiDotsHorizontal /></Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    RFQ Details
                </DialogTitle>
                <DialogDescription className="text-sm">
                    Detailed information about the selected RFQ.
                </DialogDescription>
            </DialogHeader>
            {isLoading ? (
                <Loader />
            ): error ? (
                <p className='text-red-500 font-semibold'> {error?.data?.message || "Something went wrong"}</p>
            ) :(
                <div>
                    <div className="grid gap-4 py-2">
                        <div className='grid-cols-4 items-center gap-4 relative'>
                        <Label htmlFor="name">
                        Customer
                        </Label>
                        <Input
                            type='text'
                            value={data?.data?.user?.buyer?.email}
                            className="col-span-3 mt-2 pl-8"
                            
                        />
                        </div>
                    </div>
                    <div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative'>
                            <Label htmlFor="name">
                                Additional Information
                            </Label>
                            <Input
                                type='text'
                                value={data?.data?.user?.additionalInfo}
                                className="col-span-3 mt-2 pl-8"
                                
                            />
                            </div>
                        </div>
                    <div className="grid gap-4 py-2">
                    <a 
                        href={data?.data?.user?.document?.url}  
                        target="_blank"  
                        rel="noopener noreferrer"  
                        className="text-blue-600 hover:text-blue-800"
                    >
                        View Document
                    </a>
                    </div>
                </div>
                <div className='mt-4'>
                    <p>Respond to RFQ</p>

                    <Formik
                        initialValues={{
                            rfq:data?.data?.user?._id,
                            product:data?.data?.user?.product?._id,
                            attachment:"",
                            AdditionalInfo:"",
                            customerEmail:data?.data?.user?.buyer?.email
                        }}

                        validate={(values) =>{
                            const errors ={}

                            if (!values.attachment) {
                                errors.attachment = 'file is empty!';
                            }

                            
                            if (!values.AdditionalInfo) {
                                errors.AdditionalInfo = 'Required!';
                            }

                            return errors
                        }
                    }

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
                        }) =>(
                            <form onSubmit ={handleSubmit}>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="name">
                                     Information
                                    </Label>
                                    <Input
                                        type='text'
                                        name="AdditionalInfo"
                                        id="AdditionalInfo"
                                        value={values.AdditionalInfo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Information'
                                        className="col-span-3 mt-2 pl-8"
                                        
                                    />
                                    <div className='z-50 absolute top-11 left-2'>
                                        <AiOutlineTeam className="text-gray-400" />
                                    </div>
                                    </div>
                                    {touched.AdditionalInfo && errors.AdditionalInfo ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.AdditionalInfo}</div>
                                ) : null}
                                </div>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                        {/* <Label htmlFor="AdditionalInfo" className="sr-only">
                                        Information
                                        </Label> */}
                                        <Input
                                            type='text'
                                            name="customerEmail"
                                            id="customerEmail"
                                            value={data?.data?.user?.buyer?.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="hidden"
                                        />
                                        {/* Hidden input field */}
                                    </div>
                                </div>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                        {/* <Label htmlFor="AdditionalInfo" className="sr-only">
                                        Information
                                        </Label> */}
                                        <Input
                                            type='text'
                                            name="product"
                                            id="product"
                                            value={data?.data?.user?.product?._id}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="hidden"
                                        />
                                        {/* Hidden input field */}
                                    </div>
                                </div>
                                <div className="grid gap-4 pt-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                        <Input
                                            type='text'
                                            name="rfq"
                                            id="rfq"
                                            value={data?.data?.user?._id}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="hidden"
                                        />
                                        {/* Hidden input field */}
                                    </div>
                                </div>

                                <div className='mb-4 '>
                                    <Label htmlFor="quantity" className='text-gray-500'>
                                            Document
                                    </Label>
                                    <input
                                        type="file"
                                        // accept="*"
                                        onChange={(e) => handleFileChange(e, setFieldValue)}
                                        style={{ display: 'none' }}
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded cursor-pointer"
                                    >
                                        <BsCloudUpload className="text-2xl text-gray-400" />
                                        <span className="mt-2 text-sm text-gray-500">Drag your image here</span>
                                        <span className="text-xs text-gray-400">(Add your document)</span>
                                    </label>
                                        {fileName && <p>File name: {fileName}</p>}

                                        {touched.attachment && errors.attachment ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.attachment}</div>
                                ) : null} 
                                </div>
                                <Button variant='destructive' type='submit' className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {isSubmitting ?<LoaderBtn/> : 'Submit'}
                                </Button>

                            </form>
                        )}

                    </Formik>
                    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />   
                </div>

                </div>
                
            )}
        </DialogContent>
   </Dialog>
  )
}

export default RFQAction