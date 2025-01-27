// 'use client'
// import React, {useState} from 'react'
// import { Button } from "@/components/ui/button"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { BsThreeDots } from "react-icons/bs";
// import DeleteDialog from './DeleteDialog';
// import CreateRoleDialog from './CreateRoleDialog';
// import ViewDialog from './ViewDialog';
// import { FaRegEye } from "react-icons/fa";

// const ActionPopover = ({id}) => {
//   const [viewDialog, setOpenViewDialog] = useState(true)

//   const handleViewClick = () => {
//     setOpenViewDialog(true);
//   };

//   const closeViewDialog = () => {
//     setOpenViewDialog(false);
//   };
//   return (
//     <>
//     {
//       viewDialog ?
//       (
//         <Popover>
//         <PopoverTrigger asChild>
//           <Button variant="outline"><BsThreeDots /></Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-24">
//           {/* <ViewDialog userId={id} /> */}
//           <p className='flex items-center justify-start gap-2 text-green-500' onClick={closeViewDialog}><span><FaRegEye /></span> <span>view</span></p>
//           <DeleteDialog/>
//         </PopoverContent>
//       </Popover>
//     ) : <ViewDialog userId={id}/>
//   }
//   </>
//   )
// }

// export default ActionPopover
'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDots } from "react-icons/bs";
import DeleteDialog from './DeleteDialog';
import { FaRegEye } from "react-icons/fa";
import ViewDialog from './ViewDialog';

const ActionPopover = ({ id }) => {
  const [viewDialog, setViewDialog] = useState(false);

  const openViewDialog = () => {
    setViewDialog(true); // Open the ViewDialog component
  };

  const closeViewDialog = () => {
    setViewDialog(false); // Close the ViewDialog and return to Popover
  };

  return (
    <>
      {viewDialog ? (
        <ViewDialog userId={id} onClose={closeViewDialog} />
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <BsThreeDots />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-24">
            <p
              className="flex items-center justify-start gap-2 text-green-500 cursor-pointer text-sm mb-2"
              onClick={openViewDialog} // Open the ViewDialog when clicking "view"
            >
              <span>
                <FaRegEye />
              </span>
              <span>View</span>
            </p>
            <DeleteDialog userId={id} />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default ActionPopover;
