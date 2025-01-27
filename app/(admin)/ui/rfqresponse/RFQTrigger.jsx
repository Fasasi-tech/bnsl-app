'use client'
import React, {useState} from 'react'
import { Formik } from 'formik'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BsCloudUpload } from 'react-icons/bs';
import Loader from '@/app/ui/utils/Loader';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdPersonAdd } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCategoriesQuery, useCreateRfqMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { Checkbox } from '@/components/ui/checkbox'
// import { useRfqsQuery } from '@/app/ui/utils/slices/usersApiSlice';


const RFQTrigger = () => {
    const [CreateRfq] = useCreateRfqMutation()
    // const [preview, setPreview] = useState(null);
    const [fileName, setFileName] = useState('');

    const {data:categories, isLoading:loadingCategories, error:errorCategories} = useCategoriesQuery()

    

    const handleSubmit = async (values, {setSubmitting, resetForm}) =>{
        try{
            console.log(values, 'values')
           const res= await CreateRfq(values).unwrap()
            console.log(res, 'value')
            setSubmitting(false)
            toast.success('Customer created successfully!')
            // setPreview(null)
            setFileName(null)
            resetForm()
        } catch (err){
    
            toast.error(err.data.message || err.error)
            console.log(err)
            setSubmitting(false)
        }
    
    }
    
    
    
      const convertToBase64 = (file, setFieldValue) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setPreview(reader.result);
          setFieldValue('document', reader.result);
        };
      };

      const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Set the file name
            convertToBase64(file, setFieldValue);
          }
      };
    
  return (
   <>
    <Dialog>
        <DialogTrigger>
            <Button>
            <p className='flex text-white items-center font-bold gap-2'>
                Create RFQ
            </p>
            </Button>
        </DialogTrigger>
        <DialogContent className='overflow-auto max-h-[40rem]'>
            <DialogHeader>
                <DialogTitle>
                    Create RFQ
                </DialogTitle>
            </DialogHeader>
                <Formik
                    initialValues={{
                        product:"",
                        description:"",
                        categories:[],
                        document:""
                    }}

                    validate ={(values) =>{
                        const errors ={}

                        if (!values.product){
                            errors.product = 'product is required'
                        }

                        if(!values.description){
                            errors.description = 'Description is required'
                        }

                        if (!values.categories || values.categories.length === 0) {
                            errors.categories = 'At least one category must be selected';
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
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label htmlFor="firstName">
                                        Product
                                    </Label>
                                    <Input
                                        type='text'
                                        name="product"
                                        id="product"
                                        value={values.product}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='Producte'
                                        className="col-span-3 mt-2 pl-2 py-4"
                                    />
                                    {touched.product && errors.product ? (
                                        <div className='text-red-500 pl-2 font-semibold'>{errors.product}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                    <Label>Description</Label>
                                    <Textarea
                                        placeholder='Type the description of the product here'
                                        type='text'
                                        name="description"
                                        id="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="col-span-3 pl-4 h-32"
                                    
                                    />
                                    {touched.description && errors.description ? (
                                        <div className='text-red-500 pl-2 font-semibold'>{errors.description}</div>
                                    ) : null}
                                </div>
                            </div>
                            <div className="grid gap-4 py-2">
                                <div className='grid-cols-4 items-center gap-4 relative'>
                                <Label htmlFor="categories">
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
                                                                            checked={values.categories.some((v) => v._id === category._id)}
                                                                            onCheckedChange={() => {
                                                                            if (values.categories.some((v) => v._id === category._id)) {
                                                                                setFieldValue('categories',  values.categories.filter((v) => v._id !== category._id));
                                                                            } else {
                                                                                setFieldValue('categories', [...values.categories,
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
                            <div className=''>
                                <label htmlFor="document" className='block text-base mb-2 text-gray-500 pl-2 font-semibold'>Document</label>
                                <Input
                                    type='file'
                                    name="document"
                                    id="file-upload"
                                    accept=".pdf,.xlsx,.docx,.jpeg,.jpg,.png,.xls,.gif"
                                    onChange={(e) => handleFileChange(e, setFieldValue)}
                                    style={{ display: 'none' }}
                                    className='p-2 w-full outline-none dark:bg-slate-800 border border-solid border-slate-300 text-gray-500 h-12 bg-transparent'
                                />
                                  <label
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center p-4 border border-dashed border-gray-300 rounded cursor-pointer"
                                    >
                                    <BsCloudUpload className="text-2xl text-gray-400" />
                                    <span className="mt-2 text-sm text-gray-500">Drag your document here</span>
                                    <span className="text-xs text-gray-400">(Only *.jpeg, *.png, *.xlsx and *xls  will be accepted)</span>
                                    </label>
                            </div>
                                {fileName && (
                                        <div className="mt-2 text-sm text-gray-600">
                                        Selected file: <strong>{fileName}</strong>
                                        </div>
                                    )}
                                {/* Display preview */}
                                {/* {preview && (
                                    <div>
                                    <img
                                        src={preview}
                                        alt="Selected File"
                                        className="w-[300px] h-[300px]"
                                    />
                                    </div>
                                )} */}
                                <Button variant='destructive' type='submit' className={` mt-4 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {isSubmitting ? <LoaderBtn/> : 'Submit'}
                                </Button>
                        </form>
                    )}
                </Formik>
        </DialogContent>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Dialog>
   </>
  )
}

export default RFQTrigger