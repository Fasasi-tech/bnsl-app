'use client'
import React, {useState} from 'react'
import { Formik } from 'formik'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCreateCustomerMutation, useListUsersQuery } from '@/app/ui/utils/slices/usersApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdPersonAdd } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Countries } from '@/app/ui/utils/data/Countries';
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { BsCloudUpload } from 'react-icons/bs';
import Loader from '@/app/ui/utils/Loader';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';


const CustomerTrigger = () => {
    const ITEMS_PER_PAGE = 20;
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('')
    const [search,  setSearch] = useState('')
    const [active, setActive] = useState(undefined);
    const [preview, setPreview] = useState('');
    const [CreateCustomer] = useCreateCustomerMutation()
    const {data, isLoading, error} = useListUsersQuery({ page, limit: ITEMS_PER_PAGE, sort, search, active})
   
    
    const handleSubmit = async (values, {setSubmitting, resetForm}) =>{
        try{

           const res= await CreateCustomer(values).unwrap()
            console.log(res, 'value')
            setSubmitting(false)
            toast.success('Customer created successfully!')
            resetForm()
        } catch (err){

            toast.error(err.data.message || err.error)
            console.log(err)
            setSubmitting(false)
        }

    }

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
          setFieldValue('image', reader.result);
        };
      };


  return (
    <>
        <Dialog>
            <DialogTrigger>
                <Button variant='destructive'>
                    <p className='flex text-white items-center font-bold gap-2'>
                        <IoMdPersonAdd  className='text-white text-lg font-black'/> Add Customer
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh]  my-8 overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className>
                        Create Customer
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the form below to create a new customer
                    </DialogDescription>
                </DialogHeader>
                <Formik
                    initialValues={{
                        user:"",
                        firstName:"",
                        lastName:"",
                        address:{
                            state:"",
                            country:""
                        },
                        image:"",
                        phoneNumber:"",
                        gender:"",
                        maritalStatus:""
                    }}
                    
                    validate ={(values) =>{
                        const errors ={};

                        if (!values.user){
                            errors.user =' user is required!'
                        }

                        if (!values.firstName){
                            errors.firstName =' First name is required'
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
                            <div>
                                <Label htmlFor="user">User</Label>
                                <Select
                                     name="user"
                                    id="user"
                                    value={values.user}
                                    onValueChange={(value) => setFieldValue('user', value)}
                                    onBlur={handleBlur}
                                    
                                >
                                    <SelectTrigger className="pl-4 py-6">
                                        <SelectValue placeholder="Select user" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>User</SelectLabel>
                                            {isLoading ? (
                                                <div className="py-2 px-4">
                                                    <Loader /> {/* Replace with your loading indicator */}
                                                </div>
                                            ) : error ? (
                                                <div className="py-2 px-4 text-red-500">
                                                    {error.message}
                                                </div>
                                            ) : (
                                                data?.data?.user?.getUsers?.map((i, index) => (
                                                    <SelectItem key={index} value={i._id}>
                                                        {i.email}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {touched.user && errors.user ? (
                                        <div className='text-red-500 pl-2 font-semibold'>{errors.user}</div>
                                    ) : null}
                            </div> 
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
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
                                        className="col-span-3 mt-2 pl-2 py-4"
                                    />
                                    {touched.firstName && errors.firstName ? (
                                        <div className='text-red-500 pl-2 font-semibold'>{errors.firstName}</div>
                                    ) : null}
                                </div>
                            </div>  
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="lastName">
                                    Last Name
                                </Label>
                                <Input
                                    type='text'
                                    name="lastName"
                                    id="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Last Name'
                                    className="col-span-3 mt-2 pl-2 py-4"
                                />
                                {touched.lastName && errors.lastName ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.lastName}</div>
                                ) : null}
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="phoneNumber">
                                    Phone Number
                                </Label>
                                <Input
                                    type='text'
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={values.phoneNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Phone Number'
                                    className="col-span-3 mt-2 pl-2 py-4"
                                />
                                {touched.phoneNumber && errors.phoneNumber ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.phoneNumber}</div>
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
                                    <Label htmlFor="state">
                                        State
                                    </Label>
                                    <Select
                                    
                                        onBlur={handleBlur}
                                        name="address.state"
                                        id='state'
                                        value={values.address.state}
                                        onValueChange={(value) => setFieldValue('address.state', value)}
                                    >
                                        <SelectTrigger className='pl-2 py-6'>
                                        <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>state</SelectLabel>
                                            {
                                                Countries.find(country =>country.name === values.address.country)?.states.map(state =>(
                                                    <SelectItem key={state.code} value={state.name}>{state.name}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {touched.address?.state && errors.address?.state ? (
                                        <div className='text-red-500 pl-2 font-semibold'>{errors.address.state}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="state">
                                        Gender
                                    </Label>
                                    <Select
                                    
                                        onBlur={handleBlur}
                                        name="gender"
                                        id='gender'
                                        value={values.gender}
                                        onValueChange={(value) => setFieldValue('gender', value)}
                                    >
                                        <SelectTrigger className='pl-2 py-6'>
                                        <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>gender</SelectLabel>
                                                <SelectItem  value='Male'>Male</SelectItem>
                                                <SelectItem  value='Female'>Female</SelectItem>
                                             
                                        </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {touched.address?.state && errors.address?.state ? (
                                        <div className='text-red-500 pl-2 font-semibold'>{errors.address.state}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="maritalStatus">
                                        Marital Status
                                    </Label>
                                    <Select
                                        onBlur={handleBlur}
                                        name="gender"
                                        id='gender'
                                        value={values.maritalStatus}
                                        onValueChange={(value) => setFieldValue('maritalStatus', value)}
                                    >
                                        <SelectTrigger className='pl-2 py-6'>
                                        <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Marital Status</SelectLabel>
                                            <SelectItem  value='Single'>Single</SelectItem>
                                            <SelectItem  value='Married'>Married</SelectItem>
                                            <SelectItem  value='Divorced'>Divorced</SelectItem>      
                                        </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {touched.maritalStatus && errors.maritalStatus? (
                                        <div className='text-red-500 pl-2 font-semibold'>{errors.maritalStatus}</div>
                                    ) : null}
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
                                <img src={preview} alt="Selected File" className='w-[150px] h-[150px]' />
                                </div>
                            )}
                            <Button variant='destructive' type='submit' className={` mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {isSubmitting ? <LoaderBtn/> : 'Submit'}
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

export default CustomerTrigger