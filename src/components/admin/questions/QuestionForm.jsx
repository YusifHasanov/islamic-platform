"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import HttpClient from "@/util/HttpClient"
import CacheProvider from "@/util/CacheProvider"

export function QuestionForm({ initialData }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tags, setTags] = useState()
  const [categories, setCategories] = useState()

  const [formData, setFormData] = useState({
    question: initialData?.question || "",
    answer: initialData?.answer || "",
    categories: initialData?.categories.map((c) => c.id) || [],
    tags: initialData?.tags.map((t) => t.id) || [],
    answerType: "TEXT",
    author: 2,
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchTags().catch((e) => console.log(e))
  }, [])
  useEffect(() => {
    fetchCategories().catch((e) => console.log(e))
  }, [])

  const fetchTags = async () => {
    CacheProvider.fetchData("categories", 60, () => HttpClient.get("/categories")).then((res) => setCategories(res))
  }
  const fetchCategories = async () => {
    CacheProvider.fetchData("tags", 60, () => HttpClient.get("/tags")).then((res) => setTags(res))
  }

  const validateForm = () => {
    const newErrors = {}

    // if (formData.question.length < 5) {
    //     newErrors.question = "Soru en az 5 karakter olmalıdır."
    // }
    //
    // if (formData.answer.length < 10) {
    //     newErrors.answer = "Cevap en az 10 karakter olmalıdır."
    // }
    //
    // if (formData.categories.length === 0) {
    //     newErrors.categoryIds = "En az bir kategori seçmelisiniz."
    // }
    //
    // if (formData.tags.length === 0) {
    //     newErrors.tagIds = "En az bir etiket seçmelisiniz."
    // }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name, id) => {
    setFormData((prev) => {
      const currentIds = prev[name]
      return {
        ...prev,
        [name]: currentIds.includes(id) ? currentIds.filter((currentId) => currentId !== id) : [...currentIds, id],
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      if (initialData) {
        // In a real app, this would call a server action
        console.log("Updating question:", initialData.id, formData)
      } else {
        await HttpClient.post("/questions", formData)
        // In a real app, this would call a server action
        console.log("Creating question:", formData)
      }
      router.push("/admin/questions")
      router.refresh()
    } catch (error) {
      console.error("Form gönderilirken hata oluştu:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="question" className="block text-sm font-medium text-gray-700">
          Soru
        </label>
        <input
          type="text"
          id="question"
          name="question"
          value={formData.question}
          onChange={handleInputChange}
          placeholder="Soruyu buraya yazın..."
          className={`block w-full rounded-md border ${
            errors.question ? "border-red-300" : "border-gray-300"
          } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
        />
        {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
          Cevap
        </label>
        <textarea
          id="answer"
          name="answer"
          value={formData.answer}
          onChange={handleInputChange}
          placeholder="Cevabı buraya yazın..."
          rows={6}
          className={`block w-full rounded-md border ${
            errors.answer ? "border-red-300" : "border-gray-300"
          } shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2`}
        />
        {errors.answer && <p className="mt-1 text-sm text-red-600">{errors.answer}</p>}
      </div>

      <div className="space-y-2">
        <div>
          <span className="block text-sm font-medium text-gray-700">Kategoriler</span>
          <p className="text-sm text-gray-500">Soru için en az bir kategori seçin</p>
        </div>
        {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {categories &&
            categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={formData.categories.includes(category.id)}
                  onChange={() => handleCheckboxChange("categories", category.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 block text-sm text-gray-700">
                  {category.name}
                </label>
              </div>
            ))}
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <span className="block text-sm font-medium text-gray-700">Etiketler</span>
          <p className="text-sm text-gray-500">Soru için en az bir etiket seçin</p>
        </div>
        {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
          {tags &&
            tags.map((tag) => (
              <div key={tag.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  checked={formData.tags.includes(tag.id)}
                  onChange={() => handleCheckboxChange("tags", tag.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`tag-${tag.id}`} className="ml-2 block text-sm text-gray-700">
                  {tag.name}
                </label>
              </div>
            ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/questions")}
          className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Kaydediliyor..." : initialData ? "Güncelle" : "Oluştur"}
        </button>
      </div>
    </form>
  )
}

