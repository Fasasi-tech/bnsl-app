'use client'
import React from 'react'
import { useRouter} from 'next/navigation'
import Image from 'next/image'
import Logo from '../../../public/bnsl.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Formik } from 'formik'
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link'
import { useForgotPasswordMutation } from '../utils/slices/usersApiSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../utils/Loader'


const Password = () => {

    const [forgotPassword, {isLoading}] = useForgotPasswordMutation()

    
    const handleSubmit = async (values, {setSubmitting, resetForm}) =>{
        try {

            const result=await forgotPassword(values).unwrap()
            setSubmitting(true)
            toast.success(result?.message)
            resetForm()

        } catch (err){
            console.log(err)
            alert(err.data?.message || err.error)

        }
      }

  return (
    <div className='items-center justify-center h-screen flex flex-col'>
         <div className='bg-white w-full md:w-[42%] lg:w-1/4 rounded-lg pt-6 px-6  pb-16'>
            <div className='w-full h-16 items-center justify-center flex'>
                <Image
                    src={Logo}
                    alt='Image'
                    className='w-24'
                />
            </div>
            <p className='mt-12 text-2xl  text-green-500'>Forgot Password? 🔒</p>
            <p className='mt-4 text-gray-500'>Enter your email and we'll send you instructions to reset your password</p>
            <Formik initialValues={{
                email:'',

            }}
            
            validate ={(values) =>{
                const errors={}
                
                if (!values.email) {
                    errors.email = 'Required';
                  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
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
                    isSubmitting

                }) =>(

                <form className='mt-8' onSubmit={handleSubmit}>
                    <div>
                        <label className='block text-base mb-2 text-gray-500 pl-2 '>Email</label>
                        <Input
                            type='text'
                            id='email'
                            name='email'
                            values={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Enter your email'
                        />
                            {touched.email && errors.email ?<div className='text-red-500 pl-2 font-semibold'>{errors.email}</div>: null}
                    </div>
                    <div className='mt-4'>
                        <Button variant='destructive' type='submit'className={` ${ isSubmitting? 'opacity-50 cursor-not-allowed':''} `} disabled={ isSubmitting}> {isSubmitting ? <Loader /> : 'Send Reset Link'}</Button>
                    </div>
                     <div className='mt-4'>
                        <p className='text-sm block text-green-500'>
                            <Link href='/'>
                                <span className='flex items-center justify-center gap-2'><IoIosArrowBack/> Back to login </span>
                                </Link>
                        </p>
                    </div>
                       
                    
                </form>)}
            </Formik>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    </div>
  )
}

export default Password