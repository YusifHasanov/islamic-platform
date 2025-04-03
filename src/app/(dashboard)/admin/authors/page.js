"use client"
import { useEffect, useState } from "react"
import HttpClient from "@/util/HttpClient"
import { useRouter } from "next/navigation"
import { Button } from "primereact/button"
import Link from "next/link"
import { InputText } from "primereact/inputtext"

const Page = () => {
  const router = useRouter()
  const [authors, setAuthors] = useState([])
  useEffect(() => {
    HttpClient.get("/authors")
      .then((res) => res.json())
      .then((res) => setAuthors(res))
      .catch((err) => console.log(err))
  }, [])

  const handleAuthorClick = (authorId) => {
    router.push(`/admin/authors/${authorId}`)
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-2 space-x-2">
        <Button>
          <Link href={"/admin/authors/create"}>Create</Link>
        </Button>
        <InputText />
      </div>
      <h1 className="text-3xl font-bold mb-6">Authors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authors.map((author) => (
          <div
            key={author.id}
            className="bg-white shadow-md rounded-lg p-4"
            onClick={() => handleAuthorClick(author.id)}
          >
            <img src={author.image} alt={author.name} className="w-full h-48 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{author.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page

