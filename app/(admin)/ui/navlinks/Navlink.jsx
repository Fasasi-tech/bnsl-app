import React from 'react'
import AuditNavlink from './AuditNavlink'

const Navlink = () => {

    const links =[
        {name:"vendors log", href:"/audit-trail"},
        {name:"products log", href:"/product-audit-trail"}
    ]
  return (
    <div>
        <div className='flex gap-8 items-center p-4 text-gray-500 font-semibold'>
            {links.map((link) => (
                <AuditNavlink link={link} key={link.name} />
            ))}
        </div>
    </div>
  )
}

export default Navlink