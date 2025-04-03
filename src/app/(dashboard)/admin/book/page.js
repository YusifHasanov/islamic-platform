"use client"

import { useEffect, useState } from "react"
import { FaClock } from "react-icons/fa"
import Link from "next/link"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import HttpClient from "@/util/HttpClient"

const BookList = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    HttpClient.get("/books")
      .then((r) => r.json())
      .then((books) => {
        setBooks(books)
        // console.log(books)
      })
      .catch((e) => console.error("Error fetching books:", e))
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center mb-2 space-x-2">
        <Button>
          <Link href={"/admin/book/create"}>Create</Link>
        </Button>
        <InputText />
      </div>
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <Link key={index} className="border rounded-lg shadow-md overflow-hidden" href={`/admin/book/${book.id}`}>
            <img src={book.image} alt={book.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
              <p className="text-gray-700 mb-2 italic">by {book.title}</p>
              <p className="text-gray-600 mb-4">{book.authorName}</p>
              <div className="flex items-center text-gray-500">
                <FaClock className="mr-1" />
                <span>Published: {book.title}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BookList

