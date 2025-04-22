"use client"

import React from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function LoadingSkeleton() {
  const cards = Array.from({ length: 4 })
  return (
    <div className="p-6 space-y-6">
      {/* Page header skeleton */}
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-8 bg-gray-200 rounded w-1/3" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </CardContent>
      </Card>

      {/* Grid of cards skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((_, idx) => (
          <Card key={idx} className="animate-pulse">
            <div className="h-40 bg-gray-200 rounded-t-lg" />
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

