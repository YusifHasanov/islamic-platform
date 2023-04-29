import React from 'react'
import DashBoardNav from '../../admin/DashBoardNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=''>
            <DashBoardNav />
            <div className="p-4 sm:ml-64">
                {children}
            </div>
        </div>
    )
}

export default Layout