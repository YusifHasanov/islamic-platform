"use client"

import { useState, useEffect, use } from "react"
import { FaClock } from "react-icons/fa"
import { BASE_URL } from "@/util/Const"
import { useRouter } from "next/navigation"
import HttpClient from "@/util/HttpClient"

const Page = ({ params }) => {
  const { id } = use(params)
  const router = useRouter()

  const [book, setBook] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    authorId: "",
    image: "",
  })
  const [authors, setAuthors] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch books data
  useEffect(() => {
    HttpClient.get(`/books/${id}`).then((res) =>
      res
        .json()
        .then((data) => {
          setBook(data)
          setFormData({
            title: data.title,
            authorId: data.authorId,
            image: data.image,
          })
        })
        .catch((err) => console.log(err)),
    )
  }, [id])

  // Fetch authors
  useEffect(() => {
    HttpClient.get("/authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.log("Error fetching authors:", err))
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Save changes
  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          authorId: formData.authorId,
          image: formData.image,
        }),
      })

      if (!res.ok) throw new Error("Failed to save books")
      alert("Book updated successfully")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Error updating books")
    } finally {
      setLoading(false)
    }
  }

  // Delete books
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this books?")) return

    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/books/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete books")
      alert("Book deleted successfully")
      router.push("/admin/book")
    } catch (error) {
      console.error(error)
      alert("Error deleting books")
    } finally {
      setLoading(false)
    }
  }

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Edit Book</h1>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Author:</label>
        <select
          name="authorId"
          value={formData.authorId}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">Select Author</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          placeholder="Enter book title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Change Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {formData.image && (
          <div className="mt-4">
            <img src={formData.image} alt={formData.title} className="w-full h-64 object-cover rounded-lg" />
          </div>
        )}
      </div>

      <div className="text-gray-600">
        <FaClock className="inline mr-2 text-gray-400" />
        <span>Published: {book.publishedDate}</span>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete Book"}
        </button>
      </div>
    </div>
  )
}

export default Page

