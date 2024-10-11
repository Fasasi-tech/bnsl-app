'use client'
import React, {useState} from 'react'
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { IoMdPersonAdd } from "react-icons/io";
import { Formik } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AiOutlineTeam } from "react-icons/ai";
import { useCreateVendorMutation } from '@/app/ui/utils/slices/usersApiSlice';
import {Select, SelectContent,  SelectItem,  SelectTrigger,SelectValue,} from "@/components/ui/select"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCloudUpload } from 'react-icons/bs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import { VendorState } from './VendorState';

const AddVendorDialog = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [preview, setPreview] = useState('');
    const [createVendor] = useCreateVendorMutation()

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('Submitting form with values:', values); // Debugging log
        try {
          const res = await createVendor(values).unwrap();
          console.log(res);
          setSubmitting(false);
          toast.success('Vendor created successfully!');
          resetForm();
        } catch (err) {
          console.log(err);
          toast.error(err.data?.message || err.message);
          setSubmitting(false);
        }
      };
    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
          convertToBase64(file, setFieldValue);
        }
      };
    
      const convertToBase64 = (file, setFieldValue) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreview(reader.result);
          setFieldValue('logo', reader.result);
        };
      };
    

  return (
    <>
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>
        <Button variant="destructive">
          <p className='flex text-white items-center font-bold gap-2'>
            <IoMdPersonAdd className='text-white text-lg font-black' />Add New User
          </p>
        </Button>
        </DialogTrigger>
        <DialogContent className='max-h-[80vh] overflow-y-auto'>
            <DialogHeader>
                <DialogTitle>Create Vendor</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <Formik
                initialValues={{
                    name:'',
                    description:'',
                    vendor_class:'',
                    logo:'',
                    city:'',
                    address:""


                }}

                validate={(values) =>{
                    const errors={}

                    if(!values.name){
                        errors.name='Required'
                    }

                    if(!values.description){
                        errors.description='Required'
                    }

                    if(!values.vendor_class){
                        errors.vendor_class='Required'
                    }
                    if(!values.city){
                        errors.city='Required'
                    }

                    if(!values.logo){
                        errors.logo='Required'
                    }
                    if(!values.address){
                        errors.address='Required'
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
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="Business Name">
                                    Business Name
                                </Label>
                                <Input
                                    type='text'
                                    name="name"
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Business Name'
                                    className="col-span-3 mt-2 pl-8"
                                />
                                <div className='z-50 absolute top-11 left-2'>
                                    <AiOutlineTeam className="text-gray-400" />
                                </div>
                                {touched.name && errors.name ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.name}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="Description">
                                    Description
                                </Label>
                                <Input
                                    type='text'
                                    name="description"
                                    id="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Description'
                                    className="col-span-3 mt-2 pl-8"
                                />
                                <div className='z-50 absolute top-11 left-2'>
                                    <AiOutlineTeam className="text-gray-400" />
                                </div>
                                {touched.description && errors.description ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.description}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="city">
                                   city
                                </Label>
                                <Select
                                    name="city"
                                    id="city"
                                    value={values.city}
                                    onValueChange={(value) => setFieldValue('city', value)}
                                    onBlur={handleBlur}
                                >
                                        <SelectTrigger className="w-full ">
                                        <SelectValue placeholder="city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem >Select a city</SelectItem>  
                                        {
                                            VendorState.map((i, index)=> <SelectItem key={index} value={i.name}>{i.name}</SelectItem>
                                            )
                                        }
                                    </SelectContent>
                                </Select>
                                {touched.city && errors.city ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.city}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="Vendor Class">
                                    Vendor Class
                                </Label>
                                <Select
                                    name="vendor_class"
                                    id="vendor_class"
                                    value={values.vendor_class}
                                    onValueChange={(value) => setFieldValue('vendor_class', value)}
                                    onBlur={handleBlur}
                                >
                                        <SelectTrigger className="w-full ">
                                        <SelectValue placeholder="class" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="none">Select a class</SelectItem> 
                                        
                                        <SelectItem value="Food">Food</SelectItem>
                                        <SelectItem value="Vet">Vet</SelectItem>
                                        <SelectItem value="Service">Service</SelectItem>
                                        <SelectItem value="Feed">Feed</SelectItem>
                                    </SelectContent>
                                </Select>
                                {touched.vendor_class && errors.vendor_class ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.vendor_class}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative'>
                                <label htmlFor="address" className='block text-base mb-2 text-gray-500 pl-2 font-semibold'>Address</label>
                                <Textarea
                                    placeholder="Type your address here."
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className='p-2 w-full outline-none  dark:bg-slate-800 border border-solid border-slate-300 text-gray-500 h-40 bg-transparent'
                                />
                                {touched.address && errors.address ? <div className='text-red-500 pl-2 font-semibold'>{errors.address}</div> : null}
                            </div>
                        </div>
                        <div className="mb-4 mt-4">
                            <input
                            type="file"
                            accept="image/*"
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
                            <span className="text-xs text-gray-400">(Only *.jpeg and *.png images will be accepted)</span>
                            </label>
                            {touched.logo && errors.logo ? (
                                <div className='text-red-500 pl-2 font-semibold'>{errors.logo}</div>
                                    ) : null}
                                </div>

                            {preview && (
                                <div className='mb-4'>
                                <img src={preview} alt="Selected File" className='w-[300px] h-[300px]' />
                                </div>
                            )}

                        <Button variant='destructive' type='submit' className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            {isSubmitting ? <LoaderBtn /> : 'Submit'}
                        </Button>
                        </form>
                    )}
            </Formik>
        </DialogContent>
    </Dialog>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}

export default AddVendorDialog