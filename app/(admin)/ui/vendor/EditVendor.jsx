'use client'
import React, {useState} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem,  SelectTrigger,SelectValue,SelectGroup,SelectLabel} from "@/components/ui/select"
import { Formik } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CiMail, CiPhone } from "react-icons/ci";
import { AiOutlineTeam } from "react-icons/ai";
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import { Button } from '@/components/ui/button'
import { BsCloudUpload } from 'react-icons/bs';
import {  useUpdateVendorMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { useToast } from '@/components/ui/use-toast';
import { useCategoriesQuery } from '@/app/ui/utils/slices/usersApiSlice';
import { Countries } from '@/app/ui/utils/data/Countries';
import Loader from '@/app/ui/utils/Loader';
import { Checkbox } from '@/components/ui/checkbox'

const EditVendor = ({user, onClose}) => {

  const {data:categories, isLoading:loadingCategories, error:errorCategories} = useCategoriesQuery()

    const [preview, setPreview] = useState('');

    const [updateVendor] = useUpdateVendorMutation()
   
    const {toast} = useToast()

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

     
        
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
     
        try {
          const res = await updateVendor({ id: user._id, ...values }).unwrap();
          console.log(res, 'res')
          setSubmitting(false);
        //   setModalMessage('User updated successfully!');
        toast({
            title: "Success",
            description: 'User updated successfully!',
          });
          resetForm();
          onClose();
        } catch (err) {
         
          toast({
            title: "Error",
            description: err.data?.message || err.error,
            variant: "destructive",
          });
          setSubmitting(false);
        }
      };

  return (
    <>
    <Dialog open={true} onOpenChange={onClose}>
        <DialogTrigger>
            <Button  variant='destructive'>
                Edit
            </Button>
        </DialogTrigger>
        <DialogContent className='max-h-[40rem] overflow-y-auto'>
            <DialogHeader>
                <DialogTitle>
                    Edit Vendor Information.
                </DialogTitle>
                <DialogDescription>

                </DialogDescription>
            </DialogHeader>
            <Formik
                initialValues={{
                    businessName: user.businessName || "",
                    vendor_class: user.vendor_class || [],
                    
                    address:{
                      state: user.address.state || "",
                      country: user.address.country || "",
                      businessAddress:user.address.businessAddress||'',
                    },
                    bankAccountDetails:{
                      accountName:user.bankAccountDetails.accountName || "",
                      accountNumber:user.bankAccountDetails.accountNumber || "",
                      bankName:user.bankAccountDetails.bankName || "",
                  },
                    
                    logo:"",
                    phoneNumber: user.phoneNumber || "",
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
  
                  if (!values.vendor_class){
                      errors.vendor_class = 'Required'
                  }

                  if (!values.vendor_class || values.vendor_class.length === 0) {
                    errors.vendor_class = 'At least one category must be selected';
                  }
  

                      return errors;


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
      }) => (
        <form onSubmit={handleSubmit}>
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
              <Label htmlFor="vendor_class">
                Categories
              </Label>
              {
                loadingCategories ? (
                    <Loader />
                ) : errorCategories ?(
                    <p className='text-red-500'>{loadingCategories.message}</p>
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
                                                        checked={values.vendor_class.some((v) => v._id === category._id)}
                                                        onCheckedChange={() => {
                                                        if (values.vendor_class.some((v) => v._id === category._id)) {
                                                            setFieldValue('vendor_class',  values.vendor_class.filter((v) => v._id !== category._id));
                                                        } else {
                                                            setFieldValue('vendor_class', [...values.vendor_class,
                                                              { _id: category._id, name: category.name },]);
                                                        }
                                                        }}
                                                    
                                                    />
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
            {isSubmitting ?<LoaderBtn/> : 'Submit'}
          </Button>
        </form>
      )}
                
            </Formik>
        </DialogContent>
        
    </Dialog>
  
</>
)
}

export default EditVendor