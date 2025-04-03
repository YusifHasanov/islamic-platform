import { BASE_URL } from "@/util/Const"
import Link from "next/link"

const PopularArticles = async () => {
  const res = await fetch(`${BASE_URL}/articles/popular`, {
    next: { revalidate: 60 },
  })
  const articles = await res.json()

  return (
    <div>
      <h3 style={{ lineHeight: "1" }} className="text-lg  mb-6 text-gray-800 border-l-4 pl-4 border-yellow-500 ">
        En Çok Okunanlar
      </h3>

      <ul className="space-y-6">
        {articles.map((item, id) => (
          <li key={id} className="flex items-center space-x-4">
            <Link href={`/articles/${item.id}`} className="flex items-center space-x-4">
              <img
                src={item.image}
                alt="Cemaat Olmanın Önemi"
                className="w-24 cursor-pointer h-14 object-cover rounded-md"
              />
              <div>
                <h4
                  style={{ fontSize: "13px" }}
                  className="text-sm cursor-pointer transition hover:text-[#fcb900] truncate-multiline   font-normal text-gray-700"
                >
                  {item.title}
                </h4>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PopularArticles

