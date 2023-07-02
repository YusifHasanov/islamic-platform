import React, { memo } from 'react'
import DashBoardNav from './DashBoardNav'
import { ToastContainer } from 'react-toastify'
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=''>
            <ToastContainer />
            <DashBoardNav />
            <div className="p-4 sm:ml-64">
                {children}
            </div>
        </div>
    )
}

export default memo(Layout)