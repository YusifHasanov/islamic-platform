import { revalidatePath } from "next/cache"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")
  const secret = searchParams.get("secret")

  // Secret key doğrulaması
  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    // Path revalidation
    revalidatePath(path)
    return new Response(`Revalidated path: ${path}`, { status: 200 })
  } catch (error) {
    return new Response(`Revalidation error: ${error.message}`, { status: 500 })
  }
}

