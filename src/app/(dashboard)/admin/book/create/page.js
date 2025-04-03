"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, X, ChevronDown } from "lucide-react"
import { Toast } from "primereact/toast"

import HttpClient from "@/util/HttpClient"

// Sample authors data

const BookCreatePage = () => {
  const toast = useRef(null)
  const [authors, setAuthors] = useState([])
  const show = () => {
    toast.current.show({ severity: "info", summary: "Info", detail: "Message Content" })
  }

  const [title, setTitle] = useState("")
  const [selectedAuthors, setSelectedAuthors] = useState([])
  const [image, setImage] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    HttpClient.get("/authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.log(err))
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        // Base64 stringini state'e set et
        setImage(reader.result)
      }

      // Dosyayı Base64 formatında oku
      reader.readAsDataURL(file)
    }
  }

  const handleAuthorToggle = (author) => {
    setSelectedAuthors((prevAuthors) =>
      prevAuthors.some((a) => a.id === author.id)
        ? prevAuthors.filter((a) => a.id !== author.id)
        : [...prevAuthors, author],
    )
  }

  const handleSubmit = (e) => {
    //image will be static
    e.preventDefault()
    // Handle form submission here
    const body = {
      title: title,
      authorId: authors[0].id,
      image: image,
    }
    // console.log("Body", body)

    HttpClient.post("/books", body, { revalidate: true })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then(() => show())
      .catch((err) => {
        console.log(err)
        show()
      })
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Toast ref={toast} />
      <div className=" mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Book</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Book Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="relative" ref={dropdownRef}>
              <label htmlFor="authors" className="block text-sm font-medium text-gray-700">
                Authors
              </label>
              <div
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onClick={() => setIsOpen(!isOpen)}
              >
                {selectedAuthors.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {selectedAuthors.map((author) => (
                      <span
                        key={author.id}
                        className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded"
                      >
                        {author.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-500">Select authors</span>
                )}
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {authors.map((author) => (
                    <div
                      key={author.id}
                      className={`${
                        selectedAuthors.some((a) => a.id === author.id) ? "bg-indigo-50" : ""
                      } cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100`}
                      onClick={() => handleAuthorToggle(author)}
                    >
                      <span className="block truncate">{author.name}</span>
                      {selectedAuthors.some((a) => a.id === author.id) && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Book Cover Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {image ? (
                    <div className="relative">
                      <img src={image} alt="Book cover" className="mx-auto h-32 w-auto" />
                      <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookCreatePage

