'use client'
import React, {useState} from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem,  SelectTrigger,SelectValue,} from "@/components/ui/select"
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

const EditVendor = ({user, onClose}) => {

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
        console.log('Submitting form with values:', values);
        try {
          const res = await updateVendor({ id: user._id, ...values }).unwrap();
          console.log(res);
          setSubmitting(false);
        //   setModalMessage('User updated successfully!');
        toast({
            title: "Success",
            description: 'User updated successfully!',
          });
          resetForm();
          onClose();
        } catch (err) {
          console.log(err);
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
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Edit Vendor Information.
                </DialogTitle>
                <DialogDescription>

                </DialogDescription>
            </DialogHeader>
            <Formik
                initialValues={{
                    name: user.name || "",
                    description: user.description || "",
                    vendor_class: user.vendor_class || "",
                    logo:""
                }}

                validate={(values) =>{
                    const errors={}

                    // if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    //     errors.email = 'Invalid email address';
                    // }

                    // if (values.phone.length !== 11 || !/^0\d{10}$/.test(values.phone)) {
                    //     errors.phone = 'Invalid phone number!. ';
                    //   }

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
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Business Name'
                className="col-span-3 mt-2 pl-8"
                
              />
              <div className='z-50 absolute top-11 left-2'>
                <AiOutlineTeam className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 py-2">
            <div className='grid-cols-4 items-center gap-4 relative'>
              <Label htmlFor="lastName">
                Description
              </Label>
              <Input
                type='text'
                name="description"
                id="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='description'
                className="col-span-3 mt-2 pl-8"
               
              />
              <div className='z-50 absolute top-11 left-2'>
                <AiOutlineTeam className="text-gray-400" />
              </div>
            </div>
          </div>
          <div className="grid gap-4 py-2">
            <div className='grid-cols-4 items-center gap-4 relative'>
              <Label htmlFor="vendor_class">
               Vendor Class
              </Label>
              <Select
                name="vendor_class"
                id="vendor_class"
                value={values.vendor_class}
                onValueChange={(value) => setFieldValue('vendor_class', value)}
                onBlur={handleBlur}
                className=''
              >
                <SelectTrigger className="w-full mt-2 ">
                    <SelectValue placeholder="vendor class" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="none">Select a vendor class</SelectItem> 
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Feed">Feed</SelectItem>
                    <SelectItem value="Vet">Vet</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                </SelectContent>
              </Select>

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

          </div>
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