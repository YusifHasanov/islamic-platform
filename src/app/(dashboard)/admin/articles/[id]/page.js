"use client"
import { useRef, useState, useEffect } from "react"
import { Editor } from "primereact/editor"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Toast } from "primereact/toast"
import HttpClient from "@/util/HttpClient"
import { ChevronDown } from "lucide-react"
import { TabPanel, TabView } from "primereact/tabview"
import { useParams, useRouter } from "next/navigation"
import { Calendar } from "primereact/calendar"

function ArticleEditor() {
  const toast = useRef(null)
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [publishedAt, setPublishedAt] = useState(new Date())
  const [image, setImage] = useState(null)
  // Use a single author state instead of an array
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])
  const [isAuthorOpen, setIsAuthorOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const authorDropDownRef = useRef(null)
  const categoryDropDownRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    HttpClient.get("/authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .catch((err) => console.log(err))

    HttpClient.get("/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err))

    if (id) {
      HttpClient.get(`/articles/${id}`, { "X-Admin-Request": true })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);

          if (data?.status === 400 || data?.status === 404) {
            const message = data.status === 404 ? data.message : "Xeta bas verdi"
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: message,
            })

            setTimeout(() => {
              router.push("/admin/articles")
            }, 1500)
          }

          setTitle(data.title)
          setContent(data.content)
          setImage(data.image)
          setPublishedAt(new Date(data.publishedAt))
          // Set only the first author if available
          setSelectedAuthor(data.author?.id ?? null)
          setSelectedCategories(data.categories || [])
        })
        .catch((err) => console.error("err", err))
    }
  }, [id])

  async function revalidateArticle(articleId) {
    fetch(`/api/revalidate?path=/articles/${articleId}&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`, {
      method: "GET",
    })
      .then(() => console.log(`Revalidated article ${articleId} successfully.`))
      .catch(() => console.error(`Failed to revalidate article ${articleId}.`))

    fetch(`/api/revalidate?path=/articles&secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}`)
      .then(() => console.log("Revalidated articles revalidated."))
      .catch((err) => console.error("Failed to revalidate /articles page."))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  // New single-author selection handler
  const handleAuthorSelect = (author) => {
    setSelectedAuthor(author.id)
    setIsAuthorOpen(false)
  }

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category.id) ? prev.filter((id) => id !== category.id) : [...prev, category.id],
    )
  }

  const handleSubmit = async () => {
    if (!title || !content || !selectedAuthor || selectedCategories.length === 0) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "All fields are required!",
      })
      return
    }

    const body = {
      image,
      title,
      content,
      authorId: selectedAuthor, // single author
      categories: selectedCategories,
      publishedAt: publishedAt,
    }
    // console.log(body);
    try {
      if (id) {
        await HttpClient.put(`/articles/${id}`, body)
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Article updated successfully",
        })
        revalidateArticle(id)
          .then(() => console.log("Article revalidated successfully."))
          .catch((err) => console.log(err))
      } else {
        await HttpClient.post("/articles", body)
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Article created successfully",
        })
      }
    } catch (error) {
      console.error("error 149", error)
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to save article",
      })
    }
  }

  const handleContentChange = (e) => {
    if (e.htmlValue !== content) {
      setContent(e.htmlValue)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Toast ref={toast} />
      <TabView>
        <TabPanel header="Edit Article">
          <h1 className="text-3xl font-bold mb-6 text-center">{id ? "Edit Article" : "Create a New Article"}</h1>

          <div className="mb-6">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded" />
            {image && <img src={image} alt="Cover" className="w-full h-96 object-cover rounded-lg mt-4" />}
          </div>

          <div className="mb-6">
            <InputText
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full p-3 border rounded"
            />
          </div>

          <div className="mb-6">
            <Editor value={content} onTextChange={handleContentChange} style={{ minHeight: "400px" }} />
          </div>

          {/* Author Selection - single author */}
          <div className="relative mb-4" ref={authorDropDownRef}>
            <label htmlFor="authors" className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <div
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onClick={() => setIsAuthorOpen(!isAuthorOpen)}
            >
              {selectedAuthor ? (
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded">
                  {authors.find((a) => a.id === selectedAuthor)?.name}
                </span>
              ) : (
                <span className="text-gray-500">Select author</span>
              )}
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {isAuthorOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {authors.map((author) => (
                  <div
                    key={author.id}
                    className={`${
                      selectedAuthor === author.id ? "bg-indigo-50" : ""
                    } cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100`}
                    onClick={() => handleAuthorSelect(author)}
                  >
                    <span className="block truncate">{author.name}</span>
                    {selectedAuthor === author.id && (
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

          {/* Category Selection */}
          <div className="relative mb-4" ref={categoryDropDownRef}>
            <label htmlFor="categories" className="block text-sm font-medium text-gray-700">
              Categories
            </label>
            <div
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            >
              {selectedCategories.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedCategories.map((categoryId) => (
                    <span
                      key={`selected_category.id_${categoryId}`}
                      className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded"
                    >
                      {categories.find((a) => a.id === categoryId)?.name}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-gray-500">Select categories</span>
              )}
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {isCategoryOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`${
                      selectedCategories.includes(category.id) ? "bg-indigo-50" : ""
                    } cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-100`}
                    onClick={() => handleCategoryToggle(category)}
                  >
                    <span className="block truncate">{category.name}</span>
                    {selectedCategories.includes(category.id) && (
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

          <div className="mb-6">
            <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700">
              Published Date
            </label>
            <Calendar
              id="publishedAt"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.value)}
              dateFormat="yy-mm-dd"
              placeholder="Select Published Date"
              className="w-full p-3 border rounded"
              selectionMode="single"
            />
          </div>

          <Button label="Save" icon="pi pi-check" className="p-button-success w-full" onClick={handleSubmit} />
        </TabPanel>

        <TabPanel header="Preview">
          <div>
            <img src={image} alt="Preview Image" className="w-full h-64 object-cover rounded-lg mb-4" />
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </TabPanel>
      </TabView>
    </div>
  )
}

export default ArticleEditor

