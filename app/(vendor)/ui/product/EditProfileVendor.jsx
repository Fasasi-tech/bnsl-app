'use client'
import React, {useState} from 'react'
import Image from 'next/image'
import { Formik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import { Button } from '@/components/ui/button'
import { FaCamera } from "react-icons/fa6";
import banner from '../../../../public/banner.png'
import { useRouter } from 'next/navigation'
import { IoMdArrowBack } from "react-icons/io";
import Loader from '@/app/ui/utils/Loader';
import { Countries } from '@/app/ui/utils/data/Countries';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { useUpdateBusinessMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { Textarea } from '@/components/ui/textarea';

const EditProfileVendor = ({data, setIsEditing}) => {
    const [imageSrc, setImageSrc] = useState(data.logo.url)
    const router = useRouter()
    const [EditSelf] = useUpdateBusinessMutation()

    const handleSubmit= async (values, {setSubmitting, resetForm}) =>{
            
        try{
           
            await EditSelf(values).unwrap()
            console.log(values, 'valuess')
            setSubmitting(false)
            toast.success('customer profile edited successfully')
            setIsEditing(true)
            resetForm();
            
        } catch (err){
            toast.error(err?.message || err.error);
          setSubmitting(false);
        }
    }

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };


    const handleImageUpload = async (event, setFieldValue) => {
        const file = event.target.files[0];
        
        if (!file) return;
    
        // Display image preview
        const previewUrl = URL.createObjectURL(file);
        setImageSrc(previewUrl);
    
        // Convert file to Base64 and set it as the form value
        const base64 = await fileToBase64(file);
        setFieldValue('logo', base64);
    
        return () => URL.revokeObjectURL(previewUrl);
    };



  return (
    <div className='relative'>
        <div className='bg-white dark:bg-slate-800 p-4  shadow-lg overflow-x-auto mb-12 rounded-lg'>
            <div className='flex flex-col  items-center '>
                <div className=" bg-cover bg-center">
                    <Image
                        alt="banner"
                        src={banner}
                        quality={100}
                        style={{
                            objectFit: 'cover',
                            }}
                            className='h-40 rounded-t-lg'

                    />
                </div>
                <div className='absolute top-4 left-4'>
                    <Button variant='outline'className='text-2xl text-orange-300' onClick={router.back}><IoMdArrowBack /></Button>            
                </div>
                
                <div className="w-40 h-40 absolute gap-2 top-24 left-4">
                    
                    {imageSrc ? (
                        <div className=''>
                            <Image 
                                src={imageSrc}
                                alt=''
                                width={100}
                                height={100}
                                className=" w-60 h-20 border-2 bg-white border-orange-300 max-w-full  z-50"
                            />
                        </div>) :(
                        <div className="w-full h-full flex items-center justify-center bg-[#b4898e] text-white font-bold rounded-md">
                            <p className="text-4xl md:text-6xl rounded-full text-[#722f37] font-serif">
                                {/* {`${f_name}${l_names}`} */}
                            </p>
                        </div>
                    )}
                
                </div>
            </div>
            <div> 
                <Formik
                     initialValues={{
                        businessName: data.businessName || "",
                        // vendor_class: user.vendor_class || [],
                        
                        address:{
                          state: data.address.state || "",
                          country: data.address.country || "",
                          businessAddress:data.address.businessAddress||'',
                        },
                        bankAccountDetails:{
                          accountName:data.bankAccountDetails.accountName || "",
                          accountNumber:data.bankAccountDetails.accountNumber || "",
                          bankName:data.bankAccountDetails.bankName || "",
                      },
                        
                        logo:"",
                        phoneNumber: data.phoneNumber || "",
                    }}

                    validate={(values) =>{
                        const errors={}
    
                      if (!values.bankAccountDetails.accountNumber){
                          if (!errors.bankAccountDetails) errors.bankAccountDetails ={}
                          errors.bankAccountDetails.accountNumber ='Required'
      
                      }
      
                      if (!values.bankAccountDetails?.accountName){
                          if (!errors.bankAccountDetails) errors.bankAccountDetails ={}
                          errors.bankAccountDetails.accountName ='Required'
      
                      }
      
                      if (!values.bankAccountDetails.bankName){
                          if (!errors.bankAccountDetails) errors.bankAccountDetails ={}
                          errors.bankAccountDetails.bankName ='Required'
      
                      }
      
                      if (!values.phoneNumber) {
                          errors.phoneNumber = 'Phone number is required.';
                        } else {
                          if (values.phoneNumber.length !== 11 || !/^0\d{10}$/.test(values.phoneNumber)) {
                            errors.phoneNumber = 'Invalid phone number!. ';
                          }
                      }
      
                      if (!values.address?.state) {
                          if (!errors.address) errors.address = {};
                          errors.address.state = 'State is required!';
                      }
                  
                      if (!values.address?.country) {
                          if (!errors.address) errors.address = {};
                          errors.address.country = 'Country is required!';
                      }
      
                      if (!values.address?.businessAddress) {
                          if (!errors.address) errors.address = {};
                          errors.address.businessAddress = 'business address is required!';
                      }
      
                     
    
      
    
                          return errors;
    
    
                    }}

                    onSubmit ={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        setFieldValue,
                    }) =>(

                        <form onSubmit ={handleSubmit}>
                            
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, setFieldValue)}
                                style={{ display: 'none' }}
                                id="fileInput"
                                />

                                {/* Custom button */}
                            <label
                                htmlFor="fileInput"
                                className="mt-2 px-4 py-2 rounded cursor-pointer absolute top-36 left-36"
                            >
                                <FaCamera className='text-3xl text-orange-400'/>
                                
                            </label>
                            <div className='grid grid-cols-1 mt-8 md:grid-cols-2  lg:grid-cols-3 gap-4'>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                        <Label htmlFor="name">
                                        Business Name
                                        </Label>
                                        <Input
                                            type='text'
                                            name="businessName"
                                            id="name"
                                            value={values.businessName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Business Name'
                                            className="col-span-3 mt-2 pl-8"
                                            
                                        />
                                        {touched.businessName && errors.businessName ? (
                                            <div className='text-red-500 pl-2 font-semibold'>{errors.businessName}</div>
                                            ) : null}
                                    </div>
                                </div>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="accountName">
                                        Account Name
                                    </Label>
                                    <Input
                                        type='text'
                                        name="bankAccountDetails.accountName"
                                        id="accountName"
                                        value={values.bankAccountDetails.accountName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='account name'
                                        className="col-span-3 mt-2 pl-8"
                                    
                                    />
                                    {touched.bankAccountDetails?.accountName && errors.bankAccountDetails?.accountName ? (
                                            <div className='text-red-500 pl-2 font-semibold'>{errors.bankAccountDetails?.accountName}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="phoneNumber">
                                        Phone
                                    </Label>
                                    <Input
                                        type='text'
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={values.phoneNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='account name'
                                        className="col-span-3 mt-2 pl-8"
                                    
                                    />
                                    {touched.phoneNumber && errors.phoneNumber ? (
                                            <div className='text-red-500 pl-2 font-semibold'>{errors.phoneNumber}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                        <Label htmlFor="phone">
                                            phone
                                        </Label>
                                        <Input
                                            type='text'
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            value={values.phoneNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='First Name'
                                            className="col-span-3  pl-4 py-6"
                                            readOnly
                                        />
                                       {touched.phoneNumber && errors.phoneNumber ? (
                                            <div className='text-red-500 pl-2 font-semibold'>{errors.phoneNumber}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="accountNumber">
                                        Account Number
                                    </Label>
                                    <Input
                                        type='text'
                                        name="bankAccountDetails.accountNumber"
                                        id="accountName"
                                        value={values.bankAccountDetails.accountNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='account number'
                                        className="col-span-3 mt-2 pl-8"
                                    
                                    />
                                    {touched.bankAccountDetails?.accountNumber && errors.bankAccountDetails?.accountNumber ? (
                                            <div className='text-red-500 pl-2 font-semibold'>{errors.bankAccountDetails?.accountNumber}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="bankName">
                                        Bank Name
                                    </Label>
                                    <Input
                                        type='text'
                                        name="bankAccountDetails.bankName"
                                        id="accountName"
                                        value={values.bankAccountDetails.bankName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='account number'
                                        className="col-span-3 mt-2 pl-8" 
                                    />
                                    {touched.bankAccountDetails?.bankName && errors.bankAccountDetails?.bankName ? (
                                            <div className='text-red-500 pl-2 font-semibold'>{errors.bankAccountDetails?.bankName}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                        <Label htmlFor="country">
                                            Country
                                        </Label>
                                        <Select
                                            onBlur={handleBlur}
                                            name="address.country"
                                            id='country'
                                            value={values.address.country}
                                            onValueChange={(value) => setFieldValue('address.country', value)}
                                        >
                                            <SelectTrigger className='pl-2 py-6'>
                                            <SelectValue placeholder="Select country" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Country</SelectLabel>
                                                {
                                                    Countries.map(country =>(
                                                        <SelectItem key={country.code2} value={country.name}>{country.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {touched.address?.country && errors.address?.country ? (
                                            <div className='text-red-500 pl-2 font-semibold'>{errors.address.country}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="grid gap-4 py-2">
                                    <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="state">State</Label>
                                    <Select
                                        value={values.address.state}
                                        onValueChange={(value) => setFieldValue('address.state', value)}
                                        onBlur={handleBlur}
                                        name='address.state'
                                        id='country'
                                    
                                    >
                                        <SelectTrigger className='pl-4 py-6'>
                                        <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>State</SelectLabel>
                                                {
                                                    Countries.find(country =>country.name === values.address.country)?.states.map(state =>(
                                                        <SelectItem key={state.code} value={state.name}>{state.name}</SelectItem>
                                                    ))
                                                }
                                        </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {touched.address?.state && errors.address?.state ? (
                                            <div className='text-red-500 pl-2 font-semibold'>{errors.address?.state}</div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="grid gap-4 py-2">
                                        <div className='grid-cols-4 items-center gap-4 relative'>
                                            <Label htmlFor="businessAddress">Business Address</Label>
                                            <Textarea 
                                                placeholder='Type the description of the product here'
                                                type='text'
                                                name="address.businessAddress"
                                                id="address.businessAddress"
                                                value={values.address.businessAddress}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className="col-span-3 pl-4 h-32"
                                            />
                                             {touched.address?.businessAddress && errors.address?.businessAddress ? (
                                            <div className='text-red-500 pl-2 font-semibold'>{errors.address?.businessAddress}</div>
                                        ) : null}
                                        </div>
                                </div>
                            </div>
                            <div className='mt-4'>
                                <Button variant='destructive' type='submit' className={` mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {isSubmitting ? <LoaderBtn/> : 'Submit'}
                                </Button>
                            </div>
                        </form>

                    )}

                </Formik> 
            
            </div>
        </div>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default EditProfileVendor