// app/error.js
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Error({ error, reset }) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Oops! Bir Hata Oluştu</h1>
      <p className="text-gray-700 mb-8">Bir sorun oluştu. Lütfen sayfayı yenilemeyi deneyin veya tekrar gelin.</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
      >
        Yeniden Dene
      </button>
      <button
        onClick={() => router.push("/")}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Ana Sayfaya Dön
      </button>
    </div>
  )
}

