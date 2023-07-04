import React from 'react'
import { useSession, getSession, signIn, signOut } from "next-auth/react"
import Header from '@/src/components/common/Header'
import DashBoardNav from '@/src/admin/DashBoardNav'
import Layout from '@/src/admin/Layout'
import Title from '@/src/admin/Title'

const Dashboard = () => {
  return (
    <>
      <Header title="Dashboard" description="Dashboard" />
      <Layout>
        <Title name='Dashboard' />


      </Layout>
    </>
  )
}

export default Dashboard



export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }


  return {
    props: {

    }
  }
}

