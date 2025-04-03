"use client"

import { useEffect, useState } from "react"
import HttpClient from "@/util/HttpClient"
import QuestionFormModal from "@/components/admin/questions/QuestionFormModal"

const Page = () => {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalData, setModalData] = useState(null)

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const response = await HttpClient.get("/questions?containsTag=1&containsCategory=1")
      const data = await response.json()
      setQuestions(data.content)
    } catch (error) {
      console.error("Error fetching questions:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [])

  const handleDelete = async (id) => {
    try {
      await HttpClient.delete(`/questions/${id}`)
      fetchQuestions()
    } catch (error) {
      console.error("Error deleting question:", error)
    }
  }

  const handleCreateOrUpdate = (question) => {
    setModalData(question) // Open modal for edit
  }

  return (
    <>
      {loading && <p className="text-center text-gray-500 mt-10">Loading...</p>}
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Question Management</h1>
          <button
            onClick={() => setModalData({})} // Open modal for new question
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add New Question
          </button>
        </div>

        {questions.length === 0 ? (
          <p className="text-gray-500">No questions available.</p>
        ) : (
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-4 py-2">Index</th>
                <th className="text-left px-4 py-2">Question</th>
                <th className="text-left px-4 py-2">Answer</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={question.id} className="border-b">
                  <td className="px-4 py-2">{++index}</td>
                  <td className="px-4 py-2">{question.question}</td>
                  <td className="px-4 py-2">{question.answer}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleCreateOrUpdate(question)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {modalData && (
          <QuestionFormModal question={modalData} onClose={() => setModalData(null)} onSuccess={fetchQuestions} />
        )}
      </div>
    </>
  )
}

export default Page

