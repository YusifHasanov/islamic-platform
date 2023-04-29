import Title from '@/src/admin/Title'
import Layout from '@/src/components/globals/Layout'
import React from 'react'
import { ToastContainer } from 'react-toastify'

const index = () => {
  return (
    <Layout>
      <Title name='Məqalələr' />
      <ToastContainer /> 
      <div className='grid grid-cols-1 md:grid-cols-2 sm:pr-5 pr-2 lg:grid-cols-4 gap-6 '>
        
      </div>
    </Layout>
  )
}

export default index