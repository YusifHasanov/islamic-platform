"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronRight, ChevronDown, Pencil, Trash } from "lucide-react"
import HttpClient from "@/util/HttpClient"
import { Toast } from "primereact/toast"

const CategoriesAdmin = () => {
  const toast = useRef(null)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({ id: null, name: "", parentId: null })
  const [isEditing, setIsEditing] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState([])

  // Fetch categories from API
  useEffect(() => {
    fetchCategories().then((_) => console.log(""))
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await HttpClient.get("/categories")
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEditing) {
        HttpClient.put(`/categories/${formData.id}`, formData)
          .then((_) =>
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Category updated successfully",
            }),
          )
          .then(async (_) => await fetchCategories())
          .catch((err) =>
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: err.message,
            }),
          )
      } else {
        HttpClient.post("/categories", formData)
          .then((_) =>
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "Category created successfully",
            }),
          )
          .then(async (_) => await fetchCategories())
          .catch((err) =>
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: err.message,
            }),
          )
      }
      resetForm()
    } catch (err) {
      console.error("Failed to save category:", err)
    }
  }

  const handleEdit = (category) => {
    setFormData({ id: category.id, name: category.name, parentId: category.parentId })
    setIsEditing(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return
    try {
      HttpClient.delete(`/categories/${id}`)
        .then((_) =>
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Category deleted successfully",
          }),
        )
        .catch((err) =>
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: err.message,
          }),
        )

      await fetchCategories()
    } catch (err) {
      console.error("Failed to delete category:", err)
    }
  }

  const resetForm = () => {
    setFormData({ id: null, name: "", parentId: null })
    setIsEditing(false)
  }

  const toggleNode = (id) => {
    setExpandedNodes((prev) => (prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]))
  }

  const renderCategoryTree = (parentId = null) => {
    const filteredCategories = categories.filter((cat) => cat.parentId === parentId)
    if (filteredCategories.length === 0) return null

    return (
      <ul className="pl-4 border-l border-gray-300">
        {filteredCategories.map((category) => (
          <li key={category.id} className="mt-3">
            <div className="flex justify-between items-center w-full  space-x-2 border-2 rounded-lg p-1 ">
              <span>
                {categories.some((cat) => cat.parentId === category.id) && (
                  <button onClick={() => toggleNode(category.id)} className="text-gray-600 hover:text-gray-800">
                    {expandedNodes.includes(category.id) ? (
                      <ChevronDown className="w-6 h-6" />
                    ) : (
                      <ChevronRight className="w-6 h-6" />
                    )}
                  </button>
                )}
                <span className="text-xl font-medium text-gray-700">{category.name}</span>
              </span>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(category)} className="text-blue-500 hover:text-blue-700">
                  <Pencil className="w-6 h-6" />
                </button>
                <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700">
                  <Trash className="w-6 h-6" />
                </button>
              </div>
            </div>
            {expandedNodes.includes(category.id) && renderCategoryTree(category.id)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="min-h-screen text-xl bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Toast ref={toast} />
      <div className=" mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">
              Parent Category
            </label>
            <select
              id="parentId"
              name="parentId"
              value={formData.parentId || ""}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">No Parent</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
              {isEditing ? "Update Category" : "Create Category"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Category List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Category Tree</h2>
          {renderCategoryTree()}
        </div>
      </div>
    </div>
  )
}

export default CategoriesAdmin

