import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, } from 'swiper';
import 'swiper/css';
import "swiper/css/effect-coverflow";
import {AiOutlineClose} from 'react-icons/ai';
import moment from 'moment'
import Head from 'next/head'
import Header from "@/src/components/common/Header";
import { FC, useEffect } from "react";
import BookItem from "@/src/components/books/BookItem";
import Footer from "@/src/components/footer/Footer";
const Index = () => {
 
  return (
    <>
      <Header title='Kitablar' description="kitablarımız səhifəsində kitablarımızla tanış ola bilərsiniz" />
      <section className="py-16 " >
        <div className="sm:px-10 px-10 mx-auto md:px-20">
          <h3 className="font-bold text-4xl pb-12 text-center">Kitablar</h3>
          <div className="w-full books_container">
            {
              books.map((book) => (
              <BookItem key={book.id} book={book}/> 
              ))
            }
          </div>  
        </div>
      </section>
      
    </>
  )
}
interface BookE {
  id: number;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  cover: string;
}

export default Index;
const books: BookE[] = [
  {
    id: 1,
    title: "The Hunger Games",
    description: "kitab 1 aciqlama",
    publishedAt: "2021-01-01",
    author: "Suzanne Collins",
    cover: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "kitab 2 aciqlama",
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
  },
  {
    id: 4,
    title: "The Hunger Games",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    author: "Suzanne Collins",
    cover: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 6,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 7,
    title: "The Hunger Games",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    author: "Suzanne Collins",
    cover: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 8,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 9,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    description: "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    publishedAt: "2021-01-01",
    cover: "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aGFycnklMjBwb3R0ZXIlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  }
]