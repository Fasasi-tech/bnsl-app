"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoMdAdd } from "react-icons/io";
import { Formik } from 'formik';
import { Checkbox } from '@/components/ui/checkbox'
import { usePermissionsQuery } from '@/app/ui/utils/slices/usersApiSlice';
import { usePostGroupMutation } from '@/app/ui/utils/slices/usersApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderBtn from '@/app/ui/utils/LoaderBtn';

const CreateRoleDialog = () => {
  const {data:permission, isLoading:loadingPermission, error:errorPermission}= usePermissionsQuery()
  
  const [createGroup] = usePostGroupMutation()
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        
    try {
      console.log(values)
      const res = await createGroup(values).unwrap();
      console.log(res, 'res')
      console.log(values.permissions, 'permmissions')
      setSubmitting(false);
      toast.success('Role created successfully')
      resetForm();
    } catch (err) {
     
      if (err?.data?.message) {
        toast.error(err?.data?.message);
    } else if (err?.data?.error) {
        toast.error(err?.data?.error);  // Handles error: "Values must be provided in the body."
    } else {
        toast.error('An unexpected error occurred');
    }
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="text-3xl p-2 text-white">
        <IoMdAdd />
      </DialogTrigger>
      <DialogContent className='overflow-auto min-h-[500px] max-h-[500px]'>
        <DialogHeader>
          <DialogTitle>Create Permissions</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
            <Formik
              initialValues={{
                name: "",
                permission:[],
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) errors.name = 'Required';
                if (!values.permission) errors.permission = 'Required';
                return errors;
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
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-500 pb-2">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="name"
                    className="col-span-3 mt-2"
                  />
                  {touched.name && errors.name ? (
                    <div className="text-red-500 font-semibold">{errors.name}</div>
                  ) : null}
                </div>
                <div>
                  {loadingPermission ? (
                    <Loader />
                  ) : errorPermission ? (
                    <p className="text-red-500">{errorPermission.data.message}</p>
                  ) : (
                      <div>
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                          <table className="min-w-full table-auto text-left">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="px-4 py-2 text-sm font-medium text-gray-600">Permissions</th>
                                <th className="px-4 py-2 text-sm font-medium text-gray-600">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {permission.data.user
                                .map(perm => (
                                  <tr key={perm._id} className="border-t border-gray-200">
                                    <td className="px-4 py-2 text-sm text-gray-700">
                                        {perm.name}
                                    </td>
                                    <td className="px-4 py-2">
                                      <Checkbox
                                        // id={perm._id}
                                        // name={perm._id}
                                        checked={values.permission.includes(perm._id)}
                                        onCheckedChange={() => {
                                          if (values.permission.includes(perm._id)) {
                                            setFieldValue('permission', values.permission.filter((p) => p !== perm._id));
                                          } else {
                                            setFieldValue('permission', [...values.permission, perm._id]);
                                          }
                                        }}
                                      />
                                       {touched.permission && errors.permission ? (
                                          <div className="text-red-500 font-semibold mt-2">
                                            {errors.permission}
                                          </div>
                                        ) : null}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </div>  
                    )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" variant="orange" className={`${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>{isSubmitting ? <LoaderBtn /> : 'submit'}</Button>
              </DialogFooter>
            </form>
          )}
        </Formik>
      </DialogContent>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Dialog>
  );
};

export default CreateRoleDialog;
