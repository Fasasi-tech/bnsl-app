// 'use client'
// import Loader from '@/app/ui/utils/Loader'
// import { useLeftJoinQuery } from '@/app/ui/utils/slices/usersApiSlice'
// import React, {useState, useEffect} from 'react'
// import { Input } from '@/components/ui/input'
// import { Checkbox } from "@/components/ui/checkbox"
// import { Label } from '@/components/ui/label'
// import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader,TableRow} from "@/components/ui/table";

// const UsersList = ({selectedUsers, setSelectedUsers}) => {
//     const [searchText, setSearchText] = useState('')
// const {data, isLoading, error} = useLeftJoinQuery({searchText})

// if (isLoading){
//     return <Loader />
// }

// if (error){
//     return (<p>{error?.data?.meesage}</p>)
// }

// const funcSelectedUsers = (userid) =>{
//     setSelectedUsers(prevSelectedUsers => {
//         if (prevSelectedUsers.includes(userid)) {
//             return prevSelectedUsers.filter(id => id !== userid);
//         } else {
//             return [...prevSelectedUsers, userid];
//         }
//     });
// }

// const handleChange =(e) =>{
//     setSearchText(e.target.value)
// }

// const results= data.data.user


//   return (
//     <div>
//         <p className='pl-4 text-gray-400'>Search filter</p>
//         <div className=' border-b p-4 border-gray-200'>
//             <form>
//                 <Input
//                     placeholder='Search'
//                     className='w-72'
//                      value={searchText}
//                     onChange={handleChange}
//                 />
//             </form>
//         </div>
//     <Table>
//         <TableHeader>
//             <TableRow>
//                 <TableHead>Select</TableHead>
//                 <TableHead>Email</TableHead>
//                 <TableHead>Role</TableHead>
//                 <TableHead>Business Name</TableHead>
//             </TableRow>
//         </TableHeader>
//         <TableBody>
//             {
//                 results.map(result =>(
//                     <TableRow key={result._id}>
//                         <TableCell>
//                             <Checkbox
//                                 checked={selectedUsers.includes(result._id)}
//                                 onCheckedChange={() => funcSelectedUsers(result._id)}
//                             />
//                         </TableCell>
//                         <TableCell>{result.email}</TableCell>
//                         <TableCell>{result.role}</TableCell>
//                         <TableCell>{result?.businessName }</TableCell>
//                     </TableRow>
//                 ))
//             }
//         </TableBody>
//     </Table>
//     </div>
//   )
// }

// export default UsersList
// 'use client'
// import React, {useState} from 'react'
'use client'
import Loader from '@/app/ui/utils/Loader';
import { useLeftJoinQuery } from '@/app/ui/utils/slices/usersApiSlice';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const UsersList = ({ selectedUsers, setSelectedUsers }) => {
    const [searchText, setSearchText] = useState('');
    const [selectAll, setSelectAll] = useState(false); // State to control the "Select All" checkbox
    const { data, isLoading, error } = useLeftJoinQuery({ searchText });

    
    

    // Default results to an empty array to avoid undefined errors
    const results = data?.data?.user || [];

    


    // Handle individual selection
    const funcSelectedUsers = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    useEffect(() => {
        if (results.length > 0 && selectedUsers.length === results.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    }, [selectedUsers, results.length]); // Use results.length instead of results directly

   
    // Handle "Select All" checkbox
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedUsers([]); // Deselect all
        } else {
            setSelectedUsers(results.map((user) => user._id)); // Select all
        }
        setSelectAll(!selectAll);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p>{error?.data?.message}</p>;
    }

    // Sync "Select All" checkbox state with individual selections
   
    // Handle search input changes
    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div>
            <p className="pl-4 text-gray-400">Search filter</p>
            <div className="border-b p-4 border-gray-200">
                <form>
                    <Input
                        placeholder="Search"
                        className="w-72"
                        value={searchText}
                        onChange={handleChange}
                    />
                </form>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Checkbox
                                checked={selectAll}
                                onCheckedChange={handleSelectAll}
                            />
                        </TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Business Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {results.map((result) => (
                        <TableRow key={result._id}>
                            <TableCell>
                                <Checkbox
                                    checked={selectedUsers.includes(result._id)}
                                    onCheckedChange={() => funcSelectedUsers(result._id)}
                                />
                            </TableCell>
                            <TableCell>{result.email}</TableCell>
                            <TableCell>{result.role}</TableCell>
                            <TableCell>{result?.businessName || 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default UsersList;
