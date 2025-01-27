'use client'
import React, {useState} from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { FaCamera } from "react-icons/fa6";
import banner from '../../../../public/banner.png'
import { useRouter } from 'next/navigation'
import { IoMdArrowBack } from "react-icons/io";
import { useGroupQuery, useSingleUserQuery } from '@/app/ui/utils/slices/usersApiSlice';
import Loader from '@/app/ui/utils/Loader';
import { Countries } from '@/app/ui/utils/data/Countries';
import { Formik } from 'formik';
import { useUpdateCustomerSelfMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';

const EditProfile = ({data, setIsEditing}) => {
    const {data:group, isLoading:loadingGroup, error:loadingError} = useGroupQuery()
    const [imageSrc, setImageSrc] = useState(data.image.url);
    const router = useRouter()
    const [EditCustomer] = useUpdateCustomerSelfMutation()

    const handleSubmit= async (values, {setSubmitting, resetForm}) =>{

        try{
            // const updatedValues = {values}
            await EditCustomer(values).unwrap()
            console.log(values, 'valuess')
            setSubmitting(false)
            toast.success('customer edited successfully')
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
        console.log('files', event.target.files);
        if (!file) return;
    
        // Display image preview
        const previewUrl = URL.createObjectURL(file);
        setImageSrc(previewUrl);
    
        // Convert file to Base64 and set it as the form value
        const base64 = await fileToBase64(file);
        setFieldValue('image', base64);
    
        return () => URL.revokeObjectURL(previewUrl);
    };
    

    const f_name= data?.firstName.slice(0,1).toUpperCase()
    const l_names=data?.lastName.slice(0,1).toUpperCase()

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
                <Button variant='outline'className='text-2xl text-orange-300' onClick={()=> setIsEditing(true)}><IoMdArrowBack /></Button>            
            </div>
            
            <div className="w-40 h-40 absolute gap-2 top-24 left-8">
                
                {imageSrc ? (<Image 
                    src={imageSrc}
                    alt={`${data.firstName} ${data.lastName}`}
                    width={100}
                    height={100}
                    className="rounded-full border-2 border-orange-300 max-w-full h-auto z-50"
                />) :(
                    <div className="w-full h-full flex items-center justify-center bg-[#b4898e] text-white font-bold rounded-md">
                      <p className="text-4xl md:text-6xl rounded-full text-[#722f37] font-serif">
                        {`${f_name}${l_names}`}
                      </p>
                    </div>
                )}
            
            </div>
        </div>
        <div > 
            <Formik
                initialValues={{
                    firstName:data.firstName|| "",
                    lastName:data.lastName||'',
                    address:{
                        state:data.address.state||"",
                        country:data.address.country||""

                    },
                    // image:data.image||"",
                    phoneNumber:data.phoneNumber||"",
                    country:data.country||"",
                    gender:data.gender||"",
                    maritalStatus:data.maritalStatus||""
                }}

                validate ={(values) =>{
                    const errors ={};

                    if (!values.firstName){
                        errors.firstName = 'Required'
                    }

                    if(!values.lastName){
                        errors.lastName ='Required'
                    }

                    if(!values.gender){
                        errors.gender ='Required'
                    }
                    if(!values.maritalStatus){
                        errors.maritalStatus ='Required'
                    }
                    if (!values.address?.state) {
                        if (!errors.address) errors.address = {};
                        errors.address.state = 'State is required!';
                    }
                
                    if (!values.address?.country) {
                        if (!errors.address) errors.address = {};
                        errors.address.country = 'Country is required!';
                    }

                    if (!values.phoneNumber) {
                        errors.phoneNumber = 'Phone number is required.';
                      } else {
                        if (values.phoneNumber.length !== 11 || !/^0\d{10}$/.test(values.phoneNumber)) {
                          errors.phoneNumber = 'Invalid phone number!. ';
                        }
                    }
                    return errors
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
                    setFieldValue ,
                }) =>(

                    <form onSubmit={handleSubmit}>
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
                            className="mt-2 px-4 py-2 rounded cursor-pointer absolute top-40 left-20"
                        >
                            <FaCamera className='text-3xl text-orange-400'/>
                            
                        </label>
                        <div className='grid grid-cols-1 mt-8 md:grid-cols-2  lg:grid-cols-3 gap-4'>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative '>
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Input
                                        type='text'
                                        name="firstName"
                                        id="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='First Name'
                                        className="col-span-3 pl-4 py-6 "
                                        
                                    />
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="lastName">
                                    Last Name
                                    </Label>
                                    <Input
                                        type='text'
                                        name="firstName"
                                        id="firstName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='First Name'
                                        className="col-span-3  pl-4 py-6 "
                                       
                                    />
                                    {touched.lastName && errors.lastName ? (
                                        <div className='text-red-500 pl-2 font-semibold'>{errors.lastName}</div>
                                        ) : null}
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="maritalStatus">Marital Status</Label>
                                <Select
                                    onValueChange={(value) => setFieldValue('maritalStatus', value)}
                                    onBlur={handleBlur}
                                    name='maritalStatus'
                                    id='maritalStatus'
                                    value={values.maritalStatus}
                                >
                                    <SelectTrigger className='pl-4 py-6'>
                                    <SelectValue placeholder="Select marital status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Marital Status</SelectLabel>
                                        <SelectItem value="Single">Single</SelectItem>
                                        <SelectItem value="Married">Married</SelectItem>
                                        <SelectItem value="Divorced">Divorced</SelectItem>
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {touched.maritalStatus && errors.maritalStatus ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.maritalStatus}</div>
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
                                        
                                    />
                                     {touched.phoneNumber && errors.phoneNumber ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.phoneNumber}</div>
                                    ) : null}
                                    <div className='z-50 absolute top-11 left-2'>
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="gender">Gender</Label>
                                <Select
                                    value={values.gender}
                                    onValueChange={(value) => setFieldValue('gender', value)}
                                    onBlur={handleBlur}
                                    name='gender'
                                    id='gender'
                                
                                >
                                    <SelectTrigger className='pl-4 py-6'>
                                    <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {touched.gender && errors.gender ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.gender}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="country">Country</Label>
                                <Select
                                  value={values.address.country}
                                    onValueChange={(value) => setFieldValue('address.country', value)}
                                    onBlur={handleBlur}
                                    name='address.country'
                                    id='country'
                                  
                                >
                                    <SelectTrigger className='pl-4 py-6'>
                                    <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectGroup>
                                        {
                                            Countries.map(country =>(
                                                <SelectItem key={country.code2} value={country.name}>{country.name}</SelectItem>
                                            ))
                                        }
                                    </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {touched.address?.country && errors.address?.country ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.address?.country}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="country">State</Label>
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

export default EditProfile