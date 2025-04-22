"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import HttpClient from "@/util/HttpClient";

export default function NewTagPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await HttpClient.post("/tags", { name, description });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      router.push("/admin/tags");
    } catch (err) {
      console.error(err);
      setError("Etiket oluşturulurken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Yeni Etiket Oluştur</h1>
      <Card>
        <CardContent>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Ad</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Etiket adı"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Açıklama (opsiyonel)"
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit" disabled={loading}>Kaydet</Button>
              <Link href="/admin/tags">
                <Button variant="outline">İptal</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 