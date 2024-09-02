

'use client'

import React, {createContext, useContext, useState, useEffect} from 'react';
import socket from '@/app/ui/utils/socket';
const StateContext = createContext()

const isBrowser = typeof window !== "undefined"; 
const initialOpenState = isBrowser ? localStorage.getItem("sidebarOpen") === "true" : true;
// const initialNotificationCount = isBrowser ? parseInt(localStorage.getItem('notificationCount')) || 0 : 0;

export const ContextProvider =({children}) =>{
      
    const [open, setOpen] = useState(initialOpenState);
    const [screenSize, setScreenSize] = useState(undefined)

    const [notificationCount, setNotificationCount] = useState(0);

    useEffect(() => {
        localStorage.setItem("sidebarOpen", open.toString());
      }, [open]);
      
      useEffect(() => {
        setOpen(localStorage.getItem("sidebarOpen") === "false");
      }, []);

      useEffect(() => {
        // Listen for new notifications and update the count
        socket.on('new-notification', () => {
            setNotificationCount(prevCount => prevCount + 1);
        });

        return () => {
            socket.off('new-notification');
        };
    }, []);

      return(
        <StateContext.Provider value={{open, setOpen, screenSize, setScreenSize, notificationCount, setNotificationCount}}>
            {children}
        </StateContext.Provider>
      )
}

export const useStateContext = () => useContext(StateContext)

// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import socket from '@/app/ui/utils/socket';

// const StateContext = createContext();

// const isBrowser = typeof window !== 'undefined';
// const initialOpenState = isBrowser ? localStorage.getItem('sidebarOpen') === 'true' : true;

// export const ContextProvider = ({ children }) => {
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [open, setOpen] = useState(initialOpenState);
//   const [screenSize, setScreenSize] = useState(undefined);

//   useEffect(() => {
//     if (isBrowser) {
//       const savedNotificationCount = parseInt(localStorage.getItem('notificationCount')) || 0;
//       setNotificationCount(savedNotificationCount);
//     }
//   }, []); // Only runs on the client

//   // Listen for new notifications and update the count
//   useEffect(() => {
//     if (isBrowser) {
//       socket.on('new-notification', () => {
//         setNotificationCount(prevCount => {
//           const newCount = prevCount + 1;
//           localStorage.setItem('notificationCount', newCount);
//           return newCount;
//         });
//       });

//       return () => {
//         socket.off('new-notification');
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (isBrowser) {
//       localStorage.setItem('sidebarOpen', open.toString());
//     }
//   }, [open]);

//   return (
//     <StateContext.Provider
//       value={{ open, setOpen, screenSize, setScreenSize, notificationCount, setNotificationCount }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);

// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import socket from '@/app/ui/utils/socket';

// const StateContext = createContext();

// const isBrowser = typeof window !== 'undefined';
// const initialOpenState = isBrowser ? localStorage.getItem('sidebarOpen') === 'true' : true;

// export const ContextProvider = ({ children }) => {
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [open, setOpen] = useState(initialOpenState);
//   const [screenSize, setScreenSize] = useState(undefined);

//   useEffect(() => {
//     if (isBrowser) {
//       const savedNotificationCount = parseInt(localStorage.getItem('notificationCount')) || 0;
//       setNotificationCount(savedNotificationCount);
//     }
//   }, []);

//   useEffect(() => {
//     if (isBrowser) {
//       socket.on('new-notification', () => {
//         setNotificationCount(prevCount => {
//           const newCount = prevCount + 1;
//           localStorage.setItem('notificationCount', newCount);
//           return newCount;
//         });
//       });

//       return () => {
//         socket.off('new-notification');
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (isBrowser) {
//       localStorage.setItem('sidebarOpen', open.toString());
//     }
//   }, [open]);

//   const resetNotificationCount = () => {
//     setNotificationCount(0);
//     localStorage.setItem('notificationCount', '0');
//   };

//   return (
//     <StateContext.Provider
//       value={{
//         open,
//         setOpen,
//         screenSize,
//         setScreenSize,
//         notificationCount,
//         setNotificationCount,
//         resetNotificationCount, // Provide the reset function
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);
