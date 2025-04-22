"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronDown, Pencil, Trash } from "lucide-react"
import HttpClient from "@/util/HttpClient" // Assuming this is your custom HTTP client

// Import shadcn/ui components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"

import {useToast} from "@/hooks/use-toast";
import {Toaster} from "@/components/ui/toaster";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({ id: null, name: "", parentId: null })
  const [isEditing, setIsEditing] = useState(false)
  const [expandedNodes, setExpandedNodes] = useState([])
   const {toast} = useToast()
  // Fetch categories from API
  useEffect(() => {
    fetchCategories().catch(console.error) // Simplified error logging
  }, [])

  const fetchCategories = async () => {
    try {
      // Assuming HttpClient.get returns a Response object
      const res = await HttpClient.get("/categories")
      if (!res.ok) {
        // Handle non-OK responses
        const errorData = await res.text() // Or res.json() if error details are in JSON
        throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText} - ${errorData}`)
      }
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.error("Failed to fetch categories:", err)
      toast({
        variant: "destructive",
        title: "Error Fetching Categories",
        description: err.message || "Could not load categories.",
      })
    }
  }

  // Generic input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Specific handler for shadcn/ui Select component
  const handleParentCategoryChange = (value) => {
    // The Select component passes the value directly
    // Handle the "null" string from the SelectItem if needed
    setFormData((prev) => ({
      ...prev,
      parentId: value === "null" || value === "" ? null : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = isEditing ? `/categories/${formData.id}` : "/categories"
    const method = isEditing ? "PUT" : "POST"
    const actionVerb = isEditing ? "updated" : "created"

    try {
      const res = await HttpClient[method.toLowerCase()](url, formData) // Use bracket notation for method

      if (!res.ok) {
        // Handle non-OK responses
        const errorData = await res.text() // Or res.json() if error details are in JSON
        throw new Error(`Failed to save category: ${res.status} ${res.statusText} - ${errorData}`)
      }

      // Assuming success if res.ok is true
      toast({
        title: "Success",
        description: `Category ${actionVerb} successfully.`,
      })
      resetForm()
      await fetchCategories() // Fetch categories again after successful operation
    } catch (err) {
      console.error(`Failed to ${actionVerb} category:`, err)
      toast({
        variant: "destructive",
        title: `Error ${isEditing ? "Updating" : "Creating"} Category`,
        description: err.message || `Could not ${actionVerb} the category.`,
      })
    }
  }

  const handleEdit = (category) => {
    setFormData({ id: category.id, name: category.name, parentId: category.parentId })
    setIsEditing(true)
    // Optional: Scroll to form or give visual indication
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (id) => {
    // Consider using shadcn/ui Alert Dialog for confirmation
    if (!confirm("Are you sure you want to delete this category? This might also affect subcategories.")) return

    try {
      const res = await HttpClient.delete(`/categories/${id}`)

      if (!res.ok) {
        // Handle non-OK responses
        const errorData = await res.text() // Or res.json() if error details are in JSON
        throw new Error(`Failed to delete category: ${res.status} ${res.statusText} - ${errorData}`)
      }

      // Assuming success if res.ok is true
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      })
      await fetchCategories() // Refresh list
      if (formData.id === id) {
        // Reset form if the edited category was deleted
        resetForm()
      }
    } catch (err) {
      console.error("Failed to delete category:", err)
      toast({
        variant: "destructive",
        title: "Error Deleting Category",
        description: err.message || "Could not delete the category.",
      })
    }
  }

  const resetForm = () => {
    setFormData({ id: null, name: "", parentId: null })
    setIsEditing(false)
  }

  const toggleNode = (id) => {
    setExpandedNodes((prev) => (prev.includes(id) ? prev.filter((nodeId) => nodeId !== id) : [...prev, id]))
  }

  // Recursive function to render the category tree
  const renderCategoryTree = (parentId = null, level = 0) => {
    const filteredCategories = categories.filter((cat) => cat.parentId === parentId)
    if (filteredCategories.length === 0) return null

    return (
        <ul className={`${level > 0 ? "pl-6 border-l border-muted-foreground/20" : ""} space-y-2`}>
          {filteredCategories.map((category) => {
            const hasChildren = categories.some((cat) => cat.parentId === category.id)
            const isExpanded = expandedNodes.includes(category.id)

            return (
                <li key={category.id} className="mt-1">
                  <div className="flex justify-between items-center w-full space-x-2 border rounded-md p-2 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-2 flex-grow min-w-0"> {/* Added flex-grow and min-w-0 */}
                      {hasChildren ? (
                          <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleNode(category.id)}
                              className="flex-shrink-0 h-7 w-7" // Adjusted size and shrink
                          >
                            {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                            <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
                          </Button>
                      ) : (
                          <span className="inline-block w-7 flex-shrink-0"></span> // Placeholder for alignment
                      )}
                      <span className="text-base font-medium truncate">{category.name}</span> {/* Added truncate */}
                    </div>
                    <div className="flex space-x-1 flex-shrink-0"> {/* Added flex-shrink-0 */}
                      <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-800 h-7 w-7" // Adjusted size
                      >
                        <Pencil className="w-4 h-4" />
                        <span className="sr-only">Edit {category.name}</span>
                      </Button>
                      <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-800 h-7 w-7" // Adjusted size
                      >
                        <Trash className="w-4 h-4" />
                        <span className="sr-only">Delete {category.name}</span>
                      </Button>
                    </div>
                  </div>
                  {isExpanded && hasChildren && renderCategoryTree(category.id, level + 1)}
                </li>
            )
          })}
        </ul>
    )
  }

  // --- Render ---
  return (
      // Added padding to the container instead of min-h-screen
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl mx-auto"> {/* Constrain width */}
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Manage Categories</CardTitle>
            <CardDescription>
              Create, edit, delete, and organize product categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Electronics, Clothing, Books"
                    required
                    className="text-base" // Ensure consistent text size
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="parentId">Parent Category</Label>
                <Select
                    key={formData.id ?? "new"}
                    name="parentId"
                    value={formData.parentId === null ? "null" : String(formData.parentId)}
                    onValueChange={handleParentCategoryChange}
                >
                  <SelectTrigger id="parentId" className="text-base"> {/* Ensure consistent text size */}
                    <SelectValue placeholder="-- No Parent --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="null">-- No Parent --</SelectItem>
                    {categories
                        .filter(cat => cat.id !== formData.id) // Prevent selecting itself as parent
                        .map((cat) => (
                            <SelectItem key={cat.id} value={String(cat.id)}>
                              {cat.name}
                            </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-3 pt-2">
                <Button type="submit">
                  {isEditing ? "Update Category" : "Create Category"}
                </Button>
                {isEditing && (
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel Edit
                    </Button>
                )}
              </div>
            </form>

            <Separator className="my-8" />

            {/* Category List */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Category Tree</h2>
              {categories.length > 0 ? (
                  renderCategoryTree() // Render top-level categories
              ) : (
                  <p className="text-muted-foreground">No categories found. Create one above!</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Toaster /> {/* Add Toaster for shadcn/ui toasts */}
      </div>
  )
}

export default CategoriesAdmin
