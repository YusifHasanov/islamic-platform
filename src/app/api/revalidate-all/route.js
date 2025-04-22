import { revalidatePath } from "next/cache"

const path = [
    '/',
    '/videos',
    '/videos/**',
    '/search',
    '/search/**',
    '/articles',
    '/articles/**',
    '/books',
    '/books/**',
    '/questions',
    '/questions/**',
    '/contact',
    'about'
]

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const secret = searchParams.get("secret")

    // Secret key doğrulaması
    if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
        return new Response("Unauthorized", { status: 401 })
    }

    try {
        // Path revalidation
        path.forEach(p => {
            revalidatePath(p)
        })

        return new Response(`Revalidated path `, { status: 200 })
    } catch (error) {
        return new Response(`Revalidation error: ${error.message}`, { status: 500 })
    }
}

