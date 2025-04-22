"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"
import HttpClient from "@/util/HttpClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function ArticlesPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const PAGE_SIZE = 10

  useEffect(() => {
    fetchArticles(page)
  }, [page])

  const fetchArticles = async (currentPage) => {
    try {
      setLoading(true)
      const res = await HttpClient.get(`/articles?page=${currentPage}&size=${PAGE_SIZE}`)
      if (!res.ok) throw new Error(`Error: ${res.status}`)
      const data = await res.json()
      setArticles(data.content || [])
      setTotalPages(data.totalPages || 0)
    } catch (err) {
      console.error(err)
      setError("Makaleler yüklenirken hata oluştu.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Bu makaleyi silmek istediğinize emin misiniz?")) return
    try {
      await HttpClient.delete(`/articles/${id}`)
      fetchArticles(page)
    } catch (err) {
      console.error(err)
      setError("Makale silinirken hata oluştu.")
    }
  }

  const filteredArticles = articles.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Makale Yönetimi</h1>
        <Link href="/admin/articles/create">
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" />Yeni Makale
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex items-center space-x-4 p-4">
          <Input
            placeholder="Makale Ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-4 text-center">Yükleniyor...</div>
          ) : error ? (
            <div className="p-4 text-red-600">{error}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Kategoriler</TableHead>
                  <TableHead>Yazar</TableHead>
                  <TableHead>Yayın Tarihi</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map(article => (
                    <TableRow key={article.id}>
                      <TableCell>{article.id}</TableCell>
                      <TableCell>{article.title}</TableCell>
                      <TableCell>{article.categories?.map(c => c.name).join(", ") || "—"}</TableCell>
                      <TableCell>{article.authorName || "—"}</TableCell>
                      <TableCell>
                        {new Date(article.publishedAt).toLocaleDateString("az-AZ")}
                      </TableCell>
                      <TableCell className="flex space-x-2">
                        <Link href={`/admin/articles/${article.id}`}>
                          <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(article.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">Makale bulunamadı.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center space-x-2">
        <Button variant="outline" disabled={page === 0} onClick={() => setPage(old => old - 1)}>Önceki</Button>
        {[...Array(totalPages)].map((_, idx) => (
          <Button key={idx} variant={idx === page ? "default" : "outline"} onClick={() => setPage(idx)}>
            {idx + 1}
          </Button>
        ))}
        <Button variant="outline" disabled={page === totalPages - 1} onClick={() => setPage(old => old + 1)}>Sonraki</Button>
      </div>
    </div>
  )
}

