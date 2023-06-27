import React from 'react'
import Head from 'next/head'

import CategoryList from '@/src/components/questions/CategoryList'
import QuestionList from '@/src/components/questions/QuestionList'
import Header from '@/src/components/globals/Header'
const Index = () => {
  return (
    <>
      <Header title='Sual Cavab' description='fiqhi sualları və cabalarını oxuya bilərsiniz'/>
      <div className="questions_container " >
        <CategoryList />
        <QuestionList />
      </div>
    </>
  );
}



export default Index

 