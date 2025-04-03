"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { BASE_URL } from "@/util/Const"
import HttpClient from "@/util/HttpClient"

const AuthorDetail = () => {
  const router = useRouter()
  const { id } = useParams()

  const [author, setAuthor] = useState(null)
  const [formData, setFormData] = useState({ name: "", image: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    HttpClient.get(`/authors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data)
        setFormData({ name: data.name, image: data.image })
      })
      .catch((err) => console.error("Error fetching author:", err))
  }, [id])

  // Form inputlarını yönet
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Resim dosyasını yükle ve Base64'e çevir
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }))
      }

      reader.readAsDataURL(file)
    }
  }

  // Yazar güncelle
  const handleUpdate = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/authors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Failed to update author")
      alert("Author updated successfully")
      router.back() // Geri dön
    } catch (error) {
      console.error(error)
      alert("Error updating author")
    } finally {
      setLoading(false)
    }
  }

  // Yazar sil
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this author?")) return
    console.log("Deleting autgor")
    setLoading(true)
    try {
      const res = await (await HttpClient.delete(`/authors/${id}`)).json()
      if (res.status === 204) {
        alert("Author deleted successfully")
        router.push("/admin/authors")
      } else {
        alert(res.message)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!author) {
    return <p>Loading...</p>
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Author</h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Change Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2 rounded" />
      </div>

      {formData.image && (
        <img
          src={formData.image}
          alt={formData.name}
          className="w-full h-56 object-contain object-center rounded-md mb-4"
        />
      )}

      <div className="flex space-x-2">
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  )
}

export default AuthorDetail

