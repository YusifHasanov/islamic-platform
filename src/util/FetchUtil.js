import { BASE_URL } from "@/util/Const"

async function getAllArticles() {
  try {
    const response = await fetch(`${BASE_URL}/articles/all`)
    if (!response.ok) throw new Error("Failed to fetch articles")
    return await response.json()
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

async function getAllCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`)
    if (!response.ok) throw new Error("Failed to fetch categories")
    return await response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export { getAllArticles, getAllCategories }

