export function getBestThumbnailUrl(thumbnail) {
  if (!thumbnail || typeof thumbnail !== "string") return ""

  const parts = thumbnail.split("+").filter(Boolean).reverse()

  return parts.find((part) => part.trim() !== "") || ""
}

