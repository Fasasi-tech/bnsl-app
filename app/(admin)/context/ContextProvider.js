

'use client'

import React, {createContext, useContext, useState, useEffect} from 'react';
import socket from '@/app/ui/utils/socket';
const StateContext = createContext()

const isBrowser = typeof window !== "undefined"; 
const initialOpenState = isBrowser ? localStorage.getItem("sidebarOpen") === "true" : true;
const initialNotificationCount = isBrowser ? parseInt(localStorage.getItem('notificationCount')) || 0 : 0;

export const ContextProvider =({children}) =>{
      
    const [open, setOpen] = useState(initialOpenState);
    const [screenSize, setScreenSize] = useState(undefined)

    const [notificationCount, setNotificationCount] = useState(initialNotificationCount);

    useEffect(() => {
        localStorage.setItem("sidebarOpen", open.toString());
      }, [open]);

      useEffect(() => {
        localStorage.setItem('notificationCount', notificationCount.toString());
    }, [notificationCount]);

      
      useEffect(() => {
        setOpen(localStorage.getItem("sidebarOpen") === "false");
      }, []);

    //   useEffect(() => {
    //     // Listen for new notifications and update the count
    //     socket.on('new-notification', () => {
    //         setNotificationCount((prevCount) => prevCount + 1);
    //     });

    //     return () => {
    //         socket.off('new-notification');
    //     };
    // }, []);

    // Listen for new notifications globally
    useEffect(() => {
      const handleNewNotification = () => {
          // Increment the notification count on new notification
          setNotificationCount((prevCount) => prevCount + 1);
      };

      // Attach the event listener for new notifications
      socket.on('new-notification', handleNewNotification);

      // Clean up the event listener when component unmounts
      return () => {
          socket.off('new-notification', handleNewNotification);
      };
  }, []); // Empty dependency array to ensure it runs only once on mount

      return(
        <StateContext.Provider value={{open, setOpen, screenSize, setScreenSize, notificationCount, setNotificationCount}}>
            {children}
        </StateContext.Provider>
      )
}

export const useStateContext = () => useContext(StateContext)

