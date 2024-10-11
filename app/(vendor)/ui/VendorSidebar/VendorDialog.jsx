'use client'
import React, {useState} from 'react'
import { BsThreeDots } from "react-icons/bs";
import { useGetVendorSelfQuery, useUpdateBusinessMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import Loader from '../../../ui/utils/Loader';
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { Formik } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AiOutlineTeam } from "react-icons/ai";
import {Select, SelectContent,  SelectItem,  SelectTrigger,SelectValue,} from "@/components/ui/select"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCloudUpload } from 'react-icons/bs';
import { Textarea } from '@/components/ui/textarea';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import {VendorState} from './VendorState'

const VendorDialog = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {data, isLoading, error} = useGetVendorSelfQuery()
    const [selected, setSelected] =useState(false)
    const [isEditDialog, setIsEditDialog] = useState(false)
    const [preview, setPreview] = useState('');
    const [updateVendor] = useUpdateBusinessMutation()

    const result= data?.data?.user
    console.log(result, 'result')
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
      };

    const openDetailsDialog =(open) =>{
        setIsOpen(open)

        if (open) setIsEditDialog(false)
    }

    const openEditDialog = (open) =>{
        setIsEditDialog(true)
        setIsOpen(!open)
        
    }

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('Submitting form with values:', values); // Debugging log
        try {
          const res = await updateVendor(values).unwrap();
          console.log(res);
          setSubmitting(false);
          toast.success('Vendor updated successfully!');
        //   router.push('/users')
          resetForm();
        } catch (err) {
          console.log(err);
          toast.error(err.data?.message || err.error);
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
        <Dialog open={isOpen} onOpenChange={openDetailsDialog}>
            <DialogTrigger asChild>
                <Button variant='destructive'>
                    <BsThreeDots/>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] my-8 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        View Vendor Details
                    </DialogTitle>
                </DialogHeader>
                {
                    isLoading ? (
                        <Loader />
                    ) : error ?(
                        <p className='text-red-500 font-semibold'> {error?.data?.message || "Something went wrong"}</p>
                    ):(
                        <>
                            <div>
                                <div className="grid gap-4">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                            <div className='flex flex-col items-center justify-between'>
                                                <Image 
                                                    alt='vendor-image'
                                                    src={result?.logo?.url}
                                                    width={300}
                                                    height={300}
                                                    className='rounded-full'
                                                />
                                            </div>
                                            
                
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid gap-4">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <p className='text-sm text-gray-400'>
                                        Business Name
                                    </p>
                                    <div
                                        className="col-span-3 mt-2 p-4 bg-gray-100 rounded-lg text-sm"   
                                    >
                                        {result?.name}
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid gap-4">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <p className='text-sm text-gray-400'>
                                        Description
                                    </p>
                                    <div
                                        className="col-span-3 mt-2 p-4 bg-gray-100 rounded-lg text-sm"
                                    >
                                        {result?.description}
                                    </div>  
                                </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid gap-4">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <p className='text-sm text-gray-400'>
                                        Vendor Class
                                    </p>
                                    <div
                                        className="col-span-3 mt-2 p-4 bg-gray-100 rounded-lg text-sm"
                                    >
                                        {result?.vendor_class}
                                    </div>  
                                </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid gap-4">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <p className='text-sm text-gray-400'>
                                        city
                                    </p>
                                    <div
                                        className="col-span-3 mt-2 p-4 bg-gray-100 rounded-lg text-sm"
                                    >
                                        {result?.city}
                                    </div>  
                                </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid gap-4">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <p className='text-sm text-gray-400'>
                                        Address
                                    </p>
                                    <div
                                        className="col-span-3 mt-2 p-4 bg-gray-100 rounded-lg text-sm"
                                    >
                                        {result?.address}
                                    </div>  
                                </div>
                                </div>
                            </div>
                            <div>
                                <div className="grid gap-4">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                        <p className='text-sm text-gray-400'>
                                            Date Created
                                        </p>
                                        <div
                                            className="col-span-3 mt-2 p-4 bg-gray-100 rounded-lg text-sm"
                                        >
                                            {formatDate(result?.createdAt)}
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <Button variant="destructive" onClick ={() =>{setSelected(true); openEditDialog(true)}}>Edit</Button>
                        </>
                    )
                }
            </DialogContent>
        </Dialog>

        {
            selected && (
                <Dialog open={isEditDialog} onOpenChange={setIsEditDialog}>
                    <DialogContent >
                        <DialogHeader>
                            <DialogTitle>Edit Vendor</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <Formik
                            initialValues={{
                                name:`${result?.name}`,
                                description:`${result?.description}`,
                                vendor_class:`${result?.vendor_class}`,
                                address:`${result?.address}`,
                                city:`${result?.city}`,

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
                                                placeholder='Descriptiom'
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
                                                    <SelectValue placeholder="Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                <SelectItem value="none">Select vendor class</SelectItem> 
                                                   
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
                                            <Label htmlFor="city">
                                                City
                                            </Label>
                                            <Select
                                                name="location"
                                                id="location"
                                                value={values.city} // Ensure this is properly initialized in your form state
                                                onValueChange={(value) => {
                                                    console.log("Selected location:", value); // Log the selected value
                                                    setFieldValue('city', value);
                                                }}
                                                onBlur={handleBlur}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a city" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">Select a city</SelectItem> 
                                                    {
                                                        VendorState.map((i, index) => 
                                                            <SelectItem key={index} value={i.name}>{i.name}</SelectItem>
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
                                    </div>

                                    {preview && (
                                        <div>
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
                
            )
        }
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}

export default VendorDialog