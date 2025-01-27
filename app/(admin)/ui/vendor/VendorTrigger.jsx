'use client'
import React, {useState} from 'react'
import { useListUsersQuery } from '@/app/ui/utils/slices/usersApiSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCloudUpload } from 'react-icons/bs';
import Loader from '@/app/ui/utils/Loader';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import {Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Countries } from '@/app/ui/utils/data/Countries';
import { Checkbox } from '@/components/ui/checkbox'
import { useCategoriesQuery } from '@/app/ui/utils/slices/usersApiSlice';
import { Formik } from 'formik'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useCreateVendorMutation } from '@/app/ui/utils/slices/usersApiSlice';


const VendorTrigger = ({isEditing}) => {
    const ITEMS_PER_PAGE = 20;
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('')
    const [search,  setSearch] = useState('')
    const [active,  setactive] = useState('')
    const {data, isLoading, error} = useListUsersQuery({ page, limit: ITEMS_PER_PAGE, sort, search, active})
    const {data:categories, isLoading:loadingCategories, error:errorCategories} = useCategoriesQuery()
    const [preview, setPreview] = useState('');
    const [createVendor] = useCreateVendorMutation()

    const handleSubmit = async (values, {setSubmitting, resetForm}) =>{
        try{

           const res= await createVendor(values).unwrap()
            console.log(res, 'value')
            setSubmitting(false)
            toast.success('Vendor created successfully!')
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
          setFieldValue('logo', reader.result);
        };
      };

  return (
    <div className='bg-white dark:bg-slate-800 p-4  shadow-lg overflow-x-auto mb-12 rounded-lg'>
         <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => isEditing(false)} // Close VendorTrigger
                >
                    Back
        </Button>
        <Formik
            initialValues={{
                user:"",
                businessName:"",
               
                bankAccountDetails:{
                    accountName:"",
                    accountNumber:"",
                    bankName:"",


                },
                address:{
                    state:"",
                    country:"",
                    businessAddress:'',
                },
                logo:"",
                vendor_class:[],
                phoneNumber:"",

                


            }}

            validate={(values) =>{
                const errors = {}

                if(!values.user){
                    errors.user = 'Required'
                }

               

                if(!values.businessName){
                    errors.businessName ='Required'
                }
                
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


                if (!values.vendor_class || values.vendor_class.length === 0) {
                    errors.vendor_class = 'At least one category must be selected.';
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
                setFieldValue
            }) =>(
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 mt-8 md:grid-cols-2  lg:grid-cols-3 gap-4  '>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4'>
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
                        </div> 
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative '>
                                <Label htmlFor="businessName">
                                    Business Name
                                </Label>
                                <Input
                                    type='text'
                                    name="businessName"
                                    id="businessName"
                                    value={values.businessName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Business Name'
                                    className="col-span-3 pl-4 py-6 "
                                    
                                />
                                {touched.businessName && errors.businessName ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.businessName}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative '>
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
                                    placeholder='Account name'
                                    className="col-span-3 pl-4 py-6 "
                                    
                                />
                                {touched.bankAccountDetails?.accountName && errors.bankAccountDetails?.accountName ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.bankAccountDetails?.accountName}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative '>
                                <Label htmlFor="accountNumber">
                                   Account Number
                                </Label>
                                <Input
                                    type='text'
                                    name="bankAccountDetails.accountNumber"
                                    id="accountNumber"
                                    value={values.bankAccountDetails.accountNumber}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Account number'
                                    className="col-span-3 pl-4 py-6 "
                                    
                                />
                                {touched.bankAccountDetails?.accountNumber && errors.bankAccountDetails?.accountNumber ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.bankAccountDetails?.accountNumber}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative '>
                                <Label htmlFor="bankName">
                                   Bank Name
                                </Label>
                                <Input
                                    type='text'
                                    name="bankAccountDetails.bankName"
                                    id="bankName"
                                    value={values.bankAccountDetails.bankName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Bank Name'
                                    className="col-span-3 pl-4 py-6 "
                                    
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
                                    className="col-span-3  pl-2 py-6"
                                />
                                {touched.phoneNumber && errors.phoneNumber ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.phoneNumber}</div>
                                ) : null}
                            </div>
                        </div>
                        
                        <div className='mt-2'>
                        <Label className=''>Categories</Label>
                            {
                                loadingCategories ? (
                                    <Loader />
                                ) : errorCategories ?(
                                    <p className='text-red-500'>{loadingCategories.data.message}</p>
                                ):(
                                    <div>
                                        <div className="overflow-x-auto rounded-lg">
                                            <table className="min-w-full table-auto text-left  border border-gray-200">
                                                <thead className="bg-gray-100">
                                                </thead>
                                                <tbody>
                                                    {
                                                        categories.data.user.map(category =>(
                                                            <tr key={category._id} className=''>
                                                                <td className="px-4 py-2 text-sm text-gray-700">
                                                                    {category.name}
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    <Checkbox 
                                                                        checked={values.vendor_class.includes(category._id)}
                                                                        onCheckedChange={() => {
                                                                        if (values.vendor_class.includes(category._id)) {
                                                                            setFieldValue('vendor_class', values.vendor_class.filter((id) => id !== category._id));
                                                                        } else {
                                                                            setFieldValue('vendor_class', [...values.vendor_class, category._id]);
                                                                        }
                                                                        }}
                                                                    
                                                                    />
                                                                    {touched.vendor_class && errors.vendor_class ? (
                                                                        <div className="text-red-500 font-semibold">{errors.vendor_class}</div>
                                                                        ) : null}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="grid gap-4 py-2">
                            <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label>Business Address</Label>
                                <Textarea
                                    placeholder='Type your business address here'
                                    type='text'
                                    name="address.businessAddress"
                                    id="businessAddress"
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
                        <div className="grid gap-4 py-2">
                            <div>
                                <Label>Logo</Label>
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
                        </div>
                        {preview && (
                                <div>
                                <img src={preview} alt="Selected File" className='w-[150px] h-[150px]' />
                                </div>
                            )}
                           
                    </div>
                    <Button variant='destructive' type='submit' className={` mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isSubmitting ? <LoaderBtn/> : 'Submit'}
                    </Button>
                </form>
            )}

        </Formik>   

    </div>
  )
}

export default VendorTrigger