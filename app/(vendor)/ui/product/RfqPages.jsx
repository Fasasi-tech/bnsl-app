'use client'
import React, {useState} from 'react'
import { BsCloudUpload } from 'react-icons/bs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Formik } from 'formik';
 import { useRfqrouteMutation } from '../../../ui/utils/slices/usersApiSlice';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';



const RfqPage = ({id}) => {
    const [preview, setPreview] = useState('');
    const [fileName, setFileName] = useState('');
   const [postRfq] = useRfqrouteMutation()

   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Submitting form with values:', values); // Debugging log
    try {
      const res = await postRfq({id:id, ...values}).unwrap();
      console.log(res);
      setSubmitting(false);
      toast.success('Rfq created successfully!');
    //   router.push('/vendor-products')
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
            setFileName(file.name);
          convertToBase64(file, setFieldValue);
        }
      };

      const convertToBase64 = (file, setFieldValue) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
          setFieldValue('document', reader.result);
        };
      };


  return (
    <div className='mt-4'>
        <Formik
            initialValues={{
                quantity:"",
                document:"",
                additionalInfo:""
            }}

            validate = {(values) => {
                const errors={}

                if (!values.quantity){
                    errors.quantity='Required'
                }

                if(!values.document){
                    errors.document = 'Required'
                }

                if(!values.additionalInfo){
                    errors.additionalInfo='Required'
                }

                return errors
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
            <div>
                <form onSubmit ={handleSubmit}>
                    <div>
                            <div className='grid-cols-4 items-center mt-4 gap-4 relative'>
                                <Label htmlFor="quantity" className='text-gray-500'>
                                    Quantity
                                </Label>
                                <Input
                                    type='number'
                                    name="quantity"
                                    id="quantity"
                                    value={values.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='quantity'
                                    className="col-span-3  pl-8"
                                />
                                {touched.quantity && errors.quantity ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.quantity}</div>
                                ) : null}
                            </div>
                            <div className='grid-cols-4 items-center mt-4 gap-4 relative'>
                                <Label htmlFor="quantity" className='text-gray-500'>
                                    Information
                                </Label>
                                <Input
                                    type='text'
                                    name="additionalInfo"
                                    id="additionalInfo"
                                    value={values.additionalInfo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='information'
                                    className="col-span-3  pl-8"
                                />
                                {touched.additionalInfo && errors.additionalInfo ? (
                                    <div className='text-red-500 pl-2 font-semibold'>{errors.additionalInfo}</div>
                                ) : null}
                            </div>
                            <div className='bg-white rounded-lg mt-4 shadow-md w-full h-[28rem] grid-cols-1'>
                                <Label htmlFor="quantity" className='text-gray-500'>
                                        Document
                                </Label>
                                <input
                                    type="file"
                                    // accept="*"
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
                                    <span className="text-xs text-gray-400">(Add your document)</span>
                                </label>
                                <div>
                                    {fileName && <p>File name: {fileName}</p>}
                                    {preview && (
                                    <div className='bg-white'>
                                        <img src={preview} alt="Selected File" className='w-[300px] h-[300px]' />
                                    </div>
                                            )}
                                </div>
                            </div>
                    </div> 
                    <div className='mt-4 w-full'>
                            <Button  className={`${ isSubmitting? 'opacity-50 cursor-not-allowed':''}`}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
                        </div>
                </form>
            </div>
        )}

        </Formik>
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default RfqPage