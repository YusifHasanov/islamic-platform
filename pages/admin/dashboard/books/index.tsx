import Title from '@/src/admin/Title'
import BookItem from '@/src/admin/books/BookItem'
import Layout from '@/src/admin/Layout'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import Header from '@/src/components/common/Header';
const index = () => {
  return (
    <>
      <Header title="Admin Books" description="Admin Books" />
      <Layout>
        <Title name='Kitablar' />
        <div className='grid grid-cols-1 md:grid-cols-2 sm:pr-5 pr-2 lg:grid-cols-4 gap-6 '>
          {
            books.map((book) => (
              <div key={book.id} >
                <BookItem {...book} />
              </div>
            ))
          }
        </div>
      </Layout>
    </>
  )
}

export default index
interface SlideProps {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  cover: string;
}
const books: SlideProps[] = [
  {
    id: 1,
    title: "The Hunger Games",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    author: "Suzanne Collins",
    cover: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  }
  ,
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  }
  ,
  {
    id: 5,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  }
  ,
  {
    id: 6,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  }

]