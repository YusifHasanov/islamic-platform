"use client"

import { useEffect, useState } from "react"
import HttpClient from "@/util/HttpClient"
import CacheProvider from "@/util/CacheProvider"

const QuestionFormModal = ({ question, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    question: question.question || "",
    answer: question.answer || "",
    categories: question.categories || [],
    tags: question.tags || [],
  })

  const [availableCategories, setAvailableCategories] = useState([])
  const [availableTags, setAvailableTags] = useState([])

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        CacheProvider.fetchData("categories", 60, () => HttpClient.get("/categories")).then((res) =>
          setAvailableCategories(res),
        )

        CacheProvider.fetchData("tags", 60, () => HttpClient.get("/tags")).then((res) => setAvailableTags(res))
      } catch (error) {
        console.error("Error fetching metadata:", error)
      }
    }
    fetchMetadata()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (type, id) => {
    setFormData((prev) => {
      const currentList = prev[type] // Either tags or categories
      const isAlreadySelected = currentList.some((item) => item.id === id)

      // Ensure the item exists in the available list
      const item =
        type === "categories"
          ? availableCategories.find((cat) => cat.id === id)
          : availableTags.find((tag) => tag.id === id)

      if (!item) {
        console.error(`Item with id ${id} not found in ${type}`)
        return prev // Return previous state if item not found
      }

      // Toggle selection
      const updatedList = isAlreadySelected
        ? currentList.filter((item) => item.id !== id) // Remove if already selected
        : [...currentList, item] // Add if not selected

      return { ...prev, [type]: updatedList }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      question: formData.question,
      answer: formData.answer,
      categories: formData.categories.map((cat) => cat.id),
      tags: formData.tags.map((tag) => tag.id),
      answerType: "TEXT",
      author: 1,
    }

    try {
      if (question.id) {
        await HttpClient.put(`/questions/${question.id}`, payload)
      } else {
        await HttpClient.post("/questions", payload)
      }

      await onSuccess()
      onClose()
    } catch (error) {
      console.error("Error saving question:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">{question.id ? "Edit Question" : "Add New Question"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-gray-700 font-medium mb-1">
              Question
            </label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="answer" className="block text-gray-700 font-medium mb-1">
              Answer
            </label>
            <textarea
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Categories</label>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => {
                // console.log(  formData.categories,category)
                return (
                  <button
                    type="button"
                    key={category.id}
                    className={`px-4 py-1 rounded-lg border ${
                      formData.categories.some((cat) => cat.id === category.id)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleSelectChange("categories", category.id)}
                  >
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                // console.log(formData.tags, tag)
                return (
                  <button
                    type="button"
                    key={tag.id}
                    className={`px-4 py-1 rounded-lg border ${
                      formData.tags.some((t) => t.id === tag.id)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleSelectChange("tags", tag.id)}
                  >
                    {tag.name}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionFormModal

