import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-red-500 mb-4">404! Not found </h1>
      <p className="text-gray-700 mb-8">Taplmadi</p>

      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
        <Link href={"/"}>Ana Sayfaya Dön</Link>
      </button>
    </div>
  )
}

