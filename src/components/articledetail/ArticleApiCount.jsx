"use client"
import { useEffect } from "react"
import { useParams } from "next/navigation"
import HttpClient from "@/util/HttpClient"

const ArticleApiCount = () => {
  const { id } = useParams()

  useEffect(() => {
    HttpClient.put(`/articles/count/${id}`, null)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }, [])

  return <></>
}

export default ArticleApiCount

