import React from 'react' 
import { useSession, getSession,signIn, signOut } from "next-auth/react"
import Header from '@/src/components/globals/Header'
import DashBoardNav from '@/src/admin/DashBoardNav'
import Layout from '@/src/components/globals/Layout'

const Dashboard = () => {
  return (
    <>
    <Header title="Dashboard" description="Dashboard" />
    <Layout>
      ds
    </Layout>
    </>
  )
}

export default Dashboard



export const getServerSideProps= async (context : any) => {
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
        props:{

        }
    }
}

