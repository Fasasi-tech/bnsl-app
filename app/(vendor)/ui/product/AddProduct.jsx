'use client'
import React, { useState } from 'react'
import { Formik } from 'formik';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TextEditor from './TextEditor';
import { BsCloudUpload } from 'react-icons/bs';
import { usePostVendorResponseMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { Button } from '@/components/ui/button';
import Loader from '@/app/ui/utils/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'; 
import LoaderBtn from '@/app/ui/utils/LoaderBtn';

const AddProduct = ({userId}) => {
    const [preview, setPreview] = useState('');
    const [postProduct, {isLoading}] = usePostVendorResponseMutation()
    const router = useRouter();

    const handleSubmit = async (values, { setSubmitting, resetForm, setFieldValue }) => {
      
        try {
          const res = await postProduct(values).unwrap();
          
          setSubmitting(false);
          toast.success('product created successfully!');
          setPreview('')
          setFieldValue('product.productDetails', '');
          resetForm();
        } catch (err) {
          
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
          setFieldValue('product.image', reader.result);
        };
      };

      const handleContentChange = (newContent, setFieldValue) => {
        setFieldValue('product.productDetails', newContent);
    };

  return (
    <div className='flex justify-start'>
    <div className='w-full'>
        <Formik
            initialValues={{
                product:{
                    creditTerm:{
                    value:null,
                    unit:null
                },
                leadTime:{
                    value:null,
                    unit:null
                },
                name:"",
                price:"",
                productDetails:"",
                image:""
            },
                customerRfq:userId
            }}

            validate ={(values) => {
                const errors = {}

                if (!values.product.name){
                    if(!errors.product) errors.product ={}
                    errors.product.name = 'Required'
                }

                if (!values.product.price){
                    if(!errors.product) errors.product ={}
                    errors.product.price = 'Required'
                }

                if (!values.product?.image){
                    if(!errors.product) errors.product ={}
                    errors.product.image = 'Required'
                }
                
                if (!values.product?.productDetails){
                     if(!errors.product) errors.product ={}
                    errors.product.productDetails = 'Required'
                }

                return errors;
            }}

            

            onSubmit={handleSubmit}
        >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
        }) =>(
            <div className='w-full h-full  py-4 my-auto  mx-auto'>
                <form onSubmit ={handleSubmit}>
                   {console.log(values, 'values')}
                    <div className='flex justify-between items-center font-medium mb-8'>
                        <div>
                            <h1 className=''>Create Product</h1>
                        </div>
                        <Button variant='' type='submit' className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>{isSubmitting ? <LoaderBtn /> : 'publish product'}</Button>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                        <div className='col-start-1 lg:col-span-2 bg-white py-4 md:py-12 px-4 md:px-12 shadow-lg rounded-lg'>
                         <h1 className=' font-bold'>Product Information</h1>
                            <div className='grid-cols-4 items-center mt-4 gap-4 relative'>
                                <Label htmlFor="Name" className='text-gray-500'>
                                    Name
                                </Label>
                                <Input
                                    type='text'
                                    name="product.name"
                                    id="product.name"
                                    value={values.product.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='name'
                                    className="col-span-3  pl-8"
                                />
                                {touched.product?.name && errors.product?.name ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.product?.name}</div>
                                ) : null}
                            </div>
                            <div className=' items-center mt-4 gap-4 relative '>
                                <p className='text-gray-500'>
                                    Description
                                </p>
                                <TextEditor editorContent={values.product.productDetails}  onChange={(newContent) => handleContentChange(newContent, setFieldValue)}  />
                            </div>
                            <div className='grid-cols-4 items-center mt-4 gap-4 relative'>
                                <Label htmlFor="Price" className='text-gray-500'>
                                    Price
                                </Label>
                                <Input
                                    type='number'
                                    name="product.price"
                                    id="product.price"
                                    value={values.product.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='price'
                                    className="col-span-3  pl-8"
                                />
                                {touched.product?.price && errors.product?.price ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.product?.price}</div>
                                ) : null}
                            </div>
                            <div className='mt-4'>
                                <Label htmlFor="creditTerm" className="col-span-1 text-gray-500">
                                    Credit Term
                                </Label>
                                <div className="flex items-start w-auto gap-4 justify-start">
                                {/* Credit Term Label and Input */}
                                
                                    <div className="grid  items-center gap-2 relative w-full">
                                        <Input
                                            type="number"
                                            name="product.creditTerm.value"
                                            id="product.creditTermValue"
                                            value={values.product.creditTerm.value}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Credit Term"
                                            className="  pl-8"
                                        />
                                    </div>

                                    {/* Select Credit Term Unit */}
                                    <div className="w-full">
                                    <Select
                                        onValueChange={(value) => setFieldValue('product.creditTerm.unit', value)}
                                        value={values.product.creditTerm.unit} // Bind Formik's value for unit
                                    >
                                        <SelectTrigger className="w-full ">
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem>Select a Unit</SelectItem>
                                            <SelectItem value="D">D</SelectItem>
                                            <SelectItem value="W">W</SelectItem>
                                            <SelectItem value="M">M</SelectItem>
                                            <SelectItem value="Y">Y</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4'>
                                <Label htmlFor="Lead Time" className='text-gray-500'>
                                    Lead Time
                                </Label>
                                <div className="flex items-center w-auto gap-4 justify-start">
                                    <div className="grid  items-center gap-2  relative w-full">
                                        <Input
                                            type='number'
                                            name="product.leadTime.value"
                                            id="product.leadTime.Value"
                                            value={values.product.leadTime.value}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Lead Time'
                                            className="col-span-3  pl-8"
                                        />
                                    </div>
                                    <div className='w-full'>
                                    <Select  onValueChange={(value) => setFieldValue('product.leadTime.unit', value)}
                                        value={values.product.leadTime.unit}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="unit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            <SelectItem >Select a Unit</SelectItem>
                                                <SelectItem value="D">D</SelectItem>
                                                <SelectItem value="W">W</SelectItem>
                                                <SelectItem value="M">M</SelectItem>
                                                <SelectItem value="Y">Y</SelectItem>    
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className='bg-white rounded-lg shadow-md w-full h-[28rem] grid-cols-1'>
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
                            <div>
                            {preview && (
                            <div className='bg-white'>
                                <img src={preview} alt="Selected File" className='w-[300px] h-[300px]' />
                                </div>
                                    )}
                            </div>
                          
                        </div>
                        
                    </div>


                </form>
            </div>
        )}

        </Formik>
    </div>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default AddProduct