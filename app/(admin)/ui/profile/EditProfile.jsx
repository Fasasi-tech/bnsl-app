'use client'
import React, {useState} from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Formik } from 'formik';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CiMail, CiPhone } from "react-icons/ci";
import LoaderBtn from '@/app/ui/utils/LoaderBtn';
import { useToast } from '@/components/ui/use-toast';
import { useUpdatemeMutation } from '../../../ui/utils/slices/usersApiSlice';
import { BsCloudUpload } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '@/app/ui/utils/Loader';

const EditProfile = ({data}) => {
    const [preview, setPreview] = useState('');
    const [isOpen, setIsOpen] = useState(false)
    const [updateMe] = useUpdatemeMutation()
    // const { toast } = useToast()

    const router = useRouter();


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log('Submitting form with values:', values); // Debugging log
        try {
          const res = await updateMe(values).unwrap();
          console.log(res);
          setSubmitting(false);
          toast.success('Profile updated successfully!');
          router.push('/profile')
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
          setFieldValue('image', reader.result);
        };
      };
    
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    <DialogTrigger asChild>
        {/* Ensure only ONE element (Button) is passed as a child */}
        <Button variant='destructive'>Edit</Button>
    </DialogTrigger>
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                Update Profile
            </DialogTitle>
            <DialogDescription></DialogDescription>
        </DialogHeader>
        <Formik
            initialValues={{
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                phone: data.phone || "",
                image:""
            }}
            validate={(values) => {
                const errors = {}

                if (!values.firstName) {
                    errors.firstName = 'Required';
                  }
      
                  if (!values.lastName) {
                    errors.lastName = 'Required';
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
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                type='text'
                                name="firstName"
                                id="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='First Name'
                                className="col-span-3 mt-2"
                                
                            />
                            {/* <div className='z-50 absolute top-11 left-2'>
                                <AiOutlineTeam className="text-gray-400" />
                            </div> */}
                             {touched.firstName && errors.firstName ? (
                                <div className='text-red-500 pl-2 font-semibold'>{errors.firstName}</div>
                            ) : null}
                        </div>
                        <div className='grid-cols-4 items-center gap-4 relative'>
                            <Label htmlFor="firstName">Last Name</Label>
                            <Input
                                type='text'
                                name="lastName"
                                id="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Last Name'
                                className="col-span-3 mt-2"
                                
                            />
                            {touched.lastName && errors.lastName ? (
                                <div className='text-red-500 pl-2 font-semibold'>{errors.lastName}</div>
                            ) : null}
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
                    {isSubmitting ? <Loader /> : 'Submit'}
                </Button>
            
        </div>
                </form>
            )}
        </Formik>
    </DialogContent>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
</Dialog>

  )
}

export default EditProfile