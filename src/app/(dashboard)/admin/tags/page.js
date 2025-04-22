"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import HttpClient from "@/util/HttpClient";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const res = await HttpClient.get("/tags");
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data?.content || [];
        setTags(list);
      } catch (err) {
        console.error(err);
        setError("Etiketler yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Etiket Yönetimi</h1>
        <Link href="/admin/tags/new">
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" />Yeni Etiket
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="flex items-center justify-between p-4 space-y-0">
          <Input
            placeholder="Etiketlerde ara..."
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
                  <TableHead>İsim</TableHead>
                  <TableHead>Açıklama</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTags.length > 0 ? (
                  filteredTags.map(tag => (
                    <TableRow key={tag.id}>
                      <TableCell>{tag.id}</TableCell>
                      <TableCell>{tag.name}</TableCell>
                      <TableCell>{tag.description || "—"}</TableCell>
                      <TableCell className="flex space-x-2">
                        <Link href={`/admin/tags/${tag.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Etiket bulunamadı.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

