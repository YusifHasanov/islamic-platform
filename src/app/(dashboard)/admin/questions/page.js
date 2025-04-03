"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import HttpClient from "@/util/HttpClient"

export default function Page() {
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [paginatedQuestions, setPaginatedQuestions] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [allCategories, setAllCategories] = useState([])
  const [allTags, setAllTags] = useState([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState(null)
  const filterMenuRef = useRef(null)
  const itemsPerPageMenuRef = useRef(null)
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const [itemsPerPageMenuOpen, setItemsPerPageMenuOpen] = useState(false)
  const [showCategories, setShowCategories] = useState(false)
  const [showTags, setShowTags] = useState(false)

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const response = await HttpClient.get(`/questions?containsTag=1&containsCategory=1`)
      const data = await response.json()

      const receivedQuestions = data.content.map((q) => ({
        id: q.id,
        question: q.question,
        answer: q.answer,
        categories: q.categories.map((c) => ({ id: c.id, name: c.name })),
        tags: q.tags.map((t) => ({ id: t.id, name: t.name })),
      }))

      setQuestions(receivedQuestions)
      setFilteredQuestions(receivedQuestions)
      setTotalPages(data.page.totalPages)
      setCurrentPage(data.page.number + 1)
    } finally {
      setLoading(false)
    }
  }
  const fetchCategories = async () => {
    try {
      const response = await HttpClient.get("/categories")
      const data = await response.json()
      setAllCategories(data)
    } catch (error) {
      console.error("Kategori verisi alınamadı:", error)
    }
  }
  const fetchTags = async () => {
    try {
      const response = await HttpClient.get("/tags")
      const data = await response.json()
      setAllTags(data)
    } catch (error) {
      console.error("Etiket verisi alınamadı:", error)
    }
  }
  useEffect(() => {
    fetchTags().catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    fetchQuestions().catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    fetchCategories().catch((e) => console.log(e))
  }, [])

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    setPaginatedQuestions(filteredQuestions.slice(startIndex, startIndex + itemsPerPage))
  }, [filteredQuestions, currentPage, itemsPerPage])

  useEffect(() => {
    const filtered = questions.filter((q) => {
      const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategories =
        selectedCategories.length === 0 || selectedCategories.some((cat) => q.categories.some((qc) => qc.id === cat.id))

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => q.tags.some((qt) => qt.id === tag.id))

      return matchesSearch && matchesCategories && matchesTags
    })

    setFilteredQuestions(filtered)
    setTotalPages(Math.ceil(filtered.length / itemsPerPage))
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, selectedTags, itemsPerPage, questions])

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.some((c) => c.id === category.id) ? prev.filter((c) => c.id !== category.id) : [...prev, category],
    )
  }

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.some((t) => t.id === tag.id) ? prev.filter((t) => t.id !== tag.id) : [...prev, tag],
    )
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedTags([])
  }

  const handleDeleteClick = (id) => {
    setQuestionToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (questionToDelete) {
      try {
        setQuestions(questions.filter((q) => q.id !== questionToDelete))
        setFilteredQuestions(filteredQuestions.filter((q) => q.id !== questionToDelete))
        const newTotalPages = Math.ceil((filteredQuestions.length - 1) / itemsPerPage)
        setTotalPages(newTotalPages)
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages)
        }
      } catch (error) {
        console.error("Soru silinirken hata oluştu:", error)
      }
      setDeleteDialogOpen(false)
      setQuestionToDelete(null)
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setFilterMenuOpen(false)
      }
      if (itemsPerPageMenuRef.current && !itemsPerPageMenuRef.current.contains(event.target)) {
        setItemsPerPageMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || selectedTags.length > 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sorular</h1>
        <Link href="/admin/questions/create">
          <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
            Yeni sual elave et
          </button>
        </Link>
      </div>
      <>
        <>
          <div className="space-y-4">
            {/* Search and filter controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  type="search"
                  placeholder="Soru ara..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative" ref={filterMenuRef}>
                <button
                  onClick={() => setFilterMenuOpen(!filterMenuOpen)}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                  >
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  Filtrele
                  {hasActiveFilters && (
                    <span className="ml-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-800">
                      {selectedCategories.length + selectedTags.length + (searchQuery ? 1 : 0)}
                    </span>
                  )}
                </button>

                {filterMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="p-4 space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Kategoriler</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {allCategories.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryToggle(category)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <label htmlFor={`category-${category.id}`} className="text-sm text-gray-700">
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Etiketler</h4>
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                          {allTags.map((tag) => (
                            <div key={tag.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`tag-${tag.id}`}
                                checked={selectedTags.includes(tag)}
                                onChange={() => handleTagToggle(tag)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <label htmlFor={`tag-${tag.id}`} className="text-sm text-gray-700">
                                {tag.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between pt-2">
                        <button
                          onClick={clearFilters}
                          disabled={!hasActiveFilters}
                          className={`rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium ${
                            hasActiveFilters
                              ? "bg-white text-gray-700 hover:bg-gray-50"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Filtreleri Temizle
                        </button>
                        <button
                          onClick={() => setFilterMenuOpen(false)}
                          className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                        >
                          Uygula
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active filters display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-500">Aktif filtreler:</span>

                {searchQuery && (
                  <div className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800">
                    Arama: {searchQuery}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                {selectedCategories.map((category) => (
                  <div
                    key={category.id}
                    className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800"
                  >
                    Kategori: {category.name}
                    <button
                      onClick={() => handleCategoryToggle(category)}
                      className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {selectedTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="inline-flex items-center rounded-md bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-800"
                  >
                    Etiket: {tag.name}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                <button
                  onClick={clearFilters}
                  className="ml-auto text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Tümünü Temizle
                </button>
              </div>
            )}

            {/* Questions table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
              <div className="flex items-center gap-4">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={showCategories} onChange={() => setShowCategories(!showCategories)} />
                  <span className="text-sm">Kategorileri Göster</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={showTags} onChange={() => setShowTags(!showTags)} />
                  <span className="text-sm">Etiketleri Göster</span>
                </label>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Soru
                    </th>
                    {showCategories && (
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Kategoriler
                      </th>
                    )}

                    {showTags && (
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Etiketler
                      </th>
                    )}
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 w-[100px]"
                    >
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {paginatedQuestions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-6 text-center text-sm text-gray-500">
                        {hasActiveFilters ? "Filtrelere uygun soru bulunamadı." : "Henüz soru bulunmamaktadır."}
                      </td>
                    </tr>
                  ) : (
                    paginatedQuestions.map((question) => (
                      <tr key={question.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-justify text-gray-900">{question.question}</td>
                        {showCategories && (
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {question.categories.map((category) => (
                                <span
                                  key={category.id}
                                  className="inline-flex items-center rounded-md border border-gray-200 px-2 py-0.5 text-xs font-medium text-gray-800"
                                >
                                  {category.name}
                                </span>
                              ))}
                            </div>
                          </td>
                        )}

                        {showTags && (
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {question.tags.map((tag) => (
                                <span
                                  key={tag.id}
                                  className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          </td>
                        )}
                        <td className="px-6 py-4 text-right text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/questions/${question.id}`}>
                              <button className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4"
                                >
                                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                  <path d="m15 5 4 4" />
                                </svg>
                                <span className="sr-only">Düzenle</span>
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(question.id)}
                              className="rounded-md p-1 text-red-400 hover:bg-red-50 hover:text-red-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <path d="M3 6h18" />
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                              </svg>
                              <span className="sr-only">Sil</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">Sayfa başına gösterim:</p>
                <div className="relative inline-block text-left" ref={itemsPerPageMenuRef}>
                  <button
                    type="button"
                    className="inline-flex w-16 justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={() => setItemsPerPageMenuOpen(!itemsPerPageMenuOpen)}
                  >
                    {itemsPerPage}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {itemsPerPageMenuOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-16 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {[5, 10, 20, 50].map((value) => (
                          <button
                            key={value}
                            onClick={() => {
                              setItemsPerPage(value)
                              setItemsPerPageMenuOpen(false)
                            }}
                            className={`block w-full px-4 py-2 text-left text-sm ${
                              itemsPerPage === value ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">Toplam {filteredQuestions.length} soru</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                    currentPage === 1 ? "cursor-not-allowed text-gray-400" : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Önceki
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                    currentPage === totalPages || totalPages === 0
                      ? "cursor-not-allowed text-gray-400"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Sonraki
                </button>
              </div>
            </div>
          </div>

          {/* Delete confirmation dialog */}
          {deleteDialogOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  onClick={() => setDeleteDialogOpen(false)}
                ></div>
                <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                  &#8203;
                </span>
                <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6 text-red-600"
                        >
                          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                          Soruyu silmek istediğinizden emin misiniz?
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Bu işlem geri alınamaz. Bu soru kalıcı olarak silinecektir.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={confirmDelete}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Sil
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteDialogOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      </>
    </div>
  )
}

