import React from 'react'

const Layout = ({children, graph, aggregate, users, notifications, polar}) => {
    return (
        <div className='px-4 mt-4 lg:px-8'>
            <div>{children}</div>
            <div className=''>{aggregate}</div>
            <div className='flex flex-wrap lg:flex-nowrap w-full justify-start gap-2'>
                <div className='w-full lg:w-[60%] '>
                    {graph}
                    {users}
                </div> 
                <div className='w-full lg:w-[40%]'>
                    {polar}
                    {notifications}
                </div> 
            </div>
           
           
        </div>
    )
}

export default Layout