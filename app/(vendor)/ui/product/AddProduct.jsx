'use client'
import React, { useState } from 'react'
import { Formik } from 'formik';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TextEditor from './TextEditor';
import { BsCloudUpload } from 'react-icons/bs';
import { usePostProductMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { Button } from '@/components/ui/button';
import Loader from '@/app/ui/utils/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const AddProduct = () => {
    const [preview, setPreview] = useState('');
    const [postProduct, {isLoading}] = usePostProductMutation()

    const router = useRouter();

    const handleCategoryChange = (value, setFieldValue) => {
        setFieldValue('category', value); // Update Formik's state
      };
      
      
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      
        try {
          const res = await postProduct(values).unwrap();
          
          setSubmitting(false);
          toast.success('product created successfully!');
        //   router.push('/vendor-products')
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
          setFieldValue('image', reader.result);
        };
      };

      const handleContentChange = (newContent, setFieldValue) => {
        setFieldValue('productDetails', newContent);
    };

  return (
    <div className='flex justify-start'>
    <div className='w-full'>
        <Formik
            initialValues={{
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
                category:"",
                image:""
            }}

            validate ={(values) => {
                const errors = {}

                if (!values.name){
                    errors.name = 'Required'
                }

                if (!values.price){
                    errors.price = 'Required'
                }

              

                if(!values.category){
                    errors.category = 'Required'
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
                    <div className='flex justify-between items-center font-medium mb-8'>
                        <div>
                            <h1 className=' text-gray-500 text-2xl'>Add a new Product</h1>
                        </div>
                        <Button variant='' type='submit' className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>{isSubmitting ? <Loader/> : 'publish product'}</Button>
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
                                    name="name"
                                    id="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='name'
                                    className="col-span-3  pl-8"
                                />
                                {touched.name && errors.name ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.name}</div>
                                ) : null}
                            </div>
                            <div className=' items-center mt-4 gap-4 relative '>
                                <p className='text-gray-500'>
                                    Description
                                </p>
                                <TextEditor editorContent={values.productDetails}  onChange={(newContent) => handleContentChange(newContent, setFieldValue)}  />
                            </div>
                            <div className='grid-cols-4 items-center mt-4 gap-4 relative'>
                                <Label htmlFor="Price" className='text-gray-500'>
                                    Price
                                </Label>
                                <Input
                                    type='number'
                                    name="price"
                                    id="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='price'
                                    className="col-span-3  pl-8"
                                />
                                {touched.price && errors.price ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.price}</div>
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
                                            name="creditTerm.value"
                                            id="creditTermValue"
                                            value={values.creditTerm.value}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Credit Term"
                                            className="  pl-8"
                                        />
                                    </div>

                                    {/* Select Credit Term Unit */}
                                    <div className="w-full">
                                    <Select
                                        onValueChange={(value) => setFieldValue('creditTerm.unit', value)}
                                        value={values.creditTerm.unit} // Bind Formik's value for unit
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
                                            name="leadTime.value"
                                            id="leadTimeValue"
                                            value={values.leadTime.value}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Lead Time'
                                            className="col-span-3  pl-8"
                                        />
                                    </div>
                                    <div className='w-full'>
                                    <Select  onValueChange={(value) => setFieldValue('leadTime.unit', value)}
                                        value={values.leadTime.unit}>
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
                            
                            <div className='w-full mt-4'>
                                <Label htmlFor="category" className='text-gray-500'>
                                    Category
                                </Label>
                                <Select onValueChange={(value) => handleCategoryChange(value, setFieldValue)} value={values.category}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Feed">Feed</SelectItem>
                                        <SelectItem value="Food">Food</SelectItem>
                                        <SelectItem value="Vet">Vet</SelectItem>
                                        <SelectItem value="Service">Service</SelectItem>    
                                    </SelectContent>
                                </Select>
                            
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