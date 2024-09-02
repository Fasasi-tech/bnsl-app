import Loader from '@/app/ui/utils/Loader'
import { useLeftJoinQuery } from '@/app/ui/utils/slices/usersApiSlice'
import React, {useState} from 'react'
import { Input } from '@/components/ui/input'
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader,TableRow} from "@/components/ui/table";

const UsersList = ({selectedUsers, setSelectedUsers}) => {
    const [searchText, setSearchText] = useState('')
const {data, isLoading, error} = useLeftJoinQuery({searchText})

if (isLoading){
    return <Loader />
}

if (error){
    return (<p>{error.meesage}</p>)
}

const funcSelectedUsers = (userid) =>{
    setSelectedUsers(prevSelectedUsers => {
        if (prevSelectedUsers.includes(userid)) {
            return prevSelectedUsers.filter(id => id !== userid);
        } else {
            return [...prevSelectedUsers, userid];
        }
    });
}

const handleChange =(e) =>{
    setSearchText(e.target.value)
}

const results= data.data.user


  return (
    <div>
        <p className='pl-4 text-gray-400'>Search filter</p>
        <div className=' border-b p-4 border-gray-200'>
            <form>
                <Input
                    placeholder='Search'
                    className='w-72'
                     value={searchText}
                    onChange={handleChange}
                />
            </form>
        </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Business Name</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                results.map(result =>(
                    <TableRow key={result._id}>
                        <TableCell>
                            <Checkbox
                                checked={selectedUsers.includes(result._id)}
                                onCheckedChange={() => funcSelectedUsers(result._id)}
                            />
                        </TableCell>
                        <TableCell>{result.email}</TableCell>
                        <TableCell>{result.role}</TableCell>
                        <TableCell>{result.vendorDetails[0]?.name ? result.vendorDetails[0]?.name  :' ' }</TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
    </div>
  )
}

export default UsersList