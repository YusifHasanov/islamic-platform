"use client"
import { useEffect, useState } from "react"
import HttpClient from "@/util/HttpClient"
import Link from "next/link"
import { SearchIcon, ChevronLeft, ChevronRight } from "lucide-react"
import CacheProvider from "@/util/CacheProvider"

export default function QuestionsListPage() {
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0) // Geçerli sayfa numarası
  const [totalPages, setTotalPages] = useState(1) // Toplam sayfa sayısı
  const [maxResult, setMaxResult] = useState(12) // Sayfa başına öğe sayısı
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  // Soruları API'den dinamik olarak çekiyoruz.
  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const tagIdsQuery = selectedTags.length > 0 ? `&tagIds=${selectedTags.map((tag) => tag.id).join(",")}` : ""
      const response = await HttpClient.get(`/questions?page=${page}&maxResult=${maxResult}${tagIdsQuery}`)
      const data = await response.json()
      setQuestions(data.content)
      setFilteredQuestions(data.content)
      // API cevap yapısına göre toplam sayfa bilgisi "page.totalPages" içinde geliyor.
      setTotalPages(data.page.totalPages)
    } catch (error) {
      console.error("Error fetching questions:", error)
    } finally {
      setLoading(false)
    }
  }

  // Etiketleri (tags) API'den çekiyoruz.
  const fetchTags = async () => {
    try {
      const data = await CacheProvider.fetchData("tags", 5, () => HttpClient.get("/tags"))
      setTags(data)
    } catch (error) {
      console.error("Error fetching tags:", error)
    }
  }

  // Sayfa, maxResult veya seçili etiketler değiştiğinde soruları tekrar getir.
  useEffect(() => {
    fetchQuestions()
  }, [page, maxResult, selectedTags])

  // Bileşen yüklendiğinde etiketleri al.
  useEffect(() => {
    fetchTags()
  }, [])

  // Seçili etiketler değiştiğinde sayfayı sıfırlıyoruz.
  useEffect(() => {
    setPage(0)
  }, [selectedTags])

  // Arama kutusuna göre filtreleme yapıyoruz.
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredQuestions(questions)
    } else {
      setFilteredQuestions(
        questions.filter((question) => question.question.toLowerCase().includes(search.toLowerCase())),
      )
    }
  }, [search, questions])

  const handlePageChange = (direction) => {
    if (direction === "next" && page < totalPages - 1) {
      setPage((prev) => prev + 1)
    } else if (direction === "prev" && page > 0) {
      setPage((prev) => prev - 1)
    }
  }

  const handleTagSelect = (tag) => {
    setSelectedTags((prev) =>
      prev.some((x) => x.id === tag.id) ? prev.filter((item) => item.id !== tag.id) : [...prev, tag],
    )
  }

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(maxResult)].map((_, index) => (
        <div
          key={index}
          className="p-5 bg-gray-200 rounded-lg shadow-md animate-pulse flex flex-col justify-between h-36"
        >
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded mt-auto"></div>
        </div>
      ))}
    </div>
  )

  const QuestionNotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-white shadow-md rounded-lg p-6">
      <img src="/question_not_found.jpg" alt="No Questions Found" className="w-40 h-40 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Uygun bir sual tapılmadı</h2>
      <p className="text-gray-500 text-center mb-4">
        Seçdiyiniz filtrelere uyğun heç bir sual tapılmadı. <br />
        Başqa bir şey axtarmağa çalışın və ya filtreləri sıfırlayın.
      </p>
      <button
        onClick={() => {
          setSelectedTags([])
          setSearch("")
        }}
        className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
      >
        Filtreleri Sıfırla
      </button>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Suallar</h1>
          <div className="relative w-full sm:w-1/2 lg:w-1/3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Soru ara..."
              className="w-full px-4 py-2 text-gray-800 bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <SearchIcon className="w-5 h-5 text-gray-400 absolute top-3 right-3" />
          </div>
        </div>
        {/* Etiketler */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              disabled={loading}
              onClick={() => handleTagSelect(tag)}
              key={tag.id}
              className={`text-sm mr-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm ${
                selectedTags.some((t) => t.id === tag.id) ? "bg-green-100 text-green-800" : ""
              }`}
            >
              #{tag.name}
            </button>
          ))}
        </div>
        {/* İçerik */}
        {loading ? (
          <SkeletonLoader />
        ) : filteredQuestions && filteredQuestions.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredQuestions.map((question) => (
                <div
                  key={question.id}
                  className="p-5 bg-white flex flex-col justify-between shadow-md rounded-lg hover:shadow-xl transition duration-200"
                >
                  <div>
                    <Link href={`/questions/${question.id}`}>
                      <h3 className="font-semibold text-gray-800 text-lg mb-2 hover:text-blue-600">
                        {question.question}
                      </h3>
                    </Link>
                    <div>{question.answer.length > 10 ? `${question.answer.slice(0, 10)}...` : question.answer}</div>
                    {question.categories && question.categories.length > 0 && (
                      <p className="text-sm text-gray-500">
                        <strong>Kategoriler:</strong> {question.categories.map((c) => c.name).join(", ")}
                      </p>
                    )}
                    {question.tags && question.tags.length > 0 && (
                      <p className="text-sm text-gray-500">
                        <strong>Etiketler:</strong> {question.tags.map((c) => `#${c.name}`).join(", ")}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/questions/${question.id}`}
                    className="mt-4 inline-block text-blue-500 text-sm font-medium hover:underline"
                  >
                    Daha Fazla Oku →
                  </Link>
                </div>
              ))}
            </div>
            {/* Sayfalama */}
            <div className="flex flex-row justify-between items-center mt-8 gap-4">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={page === 0}
                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-lg border ${
                  page === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                <ChevronLeft className="w-4 h-4" /> Önceki
              </button>
              <span className="text-sm text-gray-500">
                Sayfa <strong>{page + 1}</strong> / {totalPages}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={page >= totalPages - 1}
                className={`px-4 py-2 flex items-center gap-2 text-sm font-medium rounded-lg border ${
                  page >= totalPages - 1
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Sonraki <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <QuestionNotFound />
        )}
      </div>
    </div>
  )
}

