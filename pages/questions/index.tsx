import React from 'react'
import Head from 'next/head'

import CategoryList from '@/src/components/questions/CategoryList'
import QuestionList from '@/src/components/questions/QuestionList'
import Header from '@/src/components/common/Header'
import Footer from '@/src/components/footer/Footer'
const Index = () => {
  return (
    <>
      <Header title='Sual Cavab' description='fiqhi sualları və cabalarını oxuya bilərsiniz' />
      <div style={{ minHeight: 'calc(100vh - 200px)' }} className="questions_container"  > 
        <CategoryList />
        <QuestionList />
      </div>
    </>
  );
}



export default Index

