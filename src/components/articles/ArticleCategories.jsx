"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import HttpClient from "@/util/HttpClient"
import CacheProvider from "@/util/CacheProvider"

const ArticleCategories = ({ page = 0, category }) => {
    const [categories, setCategories] = useState([])
    const [expanded, setExpanded] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        CacheProvider.fetchData("article_categories", 60, async () => HttpClient.get("/categories"))
            .then((data) => {
                setCategories(data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])

    const toggleAccordion = (id) => {
        setExpanded((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const renderCategoryTree = (parentId = null) => {
        const filteredCategories = categories.filter((cat) => cat.parentId === parentId)

        if (filteredCategories.length === 0) return null

        return (
            <ul className="space-y-1">
                {filteredCategories.map((item) => {
                    const hasChildren = categories.some((cat) => cat.parentId === item.id)
                    const isActive = Number(item.id) === Number(category)
                    const isExpanded = expanded[item.id]

                    return (
                        <li key={item.id} className="border-b border-gray-200">
                            <div className="flex justify-between items-center py-2 px-1">
                                <Link
                                    href={isActive ? `/articles?page=${page}` : `/articles?page=${page}&category=${item.id}`}
                                    className={`transition-colors font-medium hover:text-yellow-600 ${
                                        isActive ? "text-yellow-600" : "text-gray-700"
                                    }`}
                                >
                                    {item.name}
                                </Link>

                                {hasChildren && (
                                    <button
                                        onClick={() => toggleAccordion(item.id)}
                                        className="text-gray-500 hover:text-gray-800 transition p-1"
                                        aria-expanded={isExpanded}
                                        aria-label={isExpanded ? "Collapse category" : "Expand category"}
                                    >
                                        {isExpanded ? (
                                            <ChevronUp size={16} className="transition-transform" />
                                        ) : (
                                            <ChevronDown size={16} className="transition-transform" />
                                        )}
                                    </button>
                                )}
                            </div>

                            <AnimatePresence initial={false}>
                                {isExpanded && hasChildren && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                            transition: {
                                                height: { duration: 0.3, ease: "easeOut" },
                                                opacity: { duration: 0.2, delay: 0.1 },
                                            },
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: {
                                                height: { duration: 0.3, ease: "easeIn" },
                                                opacity: { duration: 0.2 },
                                            },
                                        }}
                                        className="pl-4 overflow-hidden"
                                    >
                                        {renderCategoryTree(item.id)}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className="mb-8">
            <h3 style={{ lineHeight: "1" }} className="text-lg mb-5 text-gray-800 border-l-4 pl-4 border-yellow-500">
                Kateqoriyalar
            </h3>
            {isLoading ? (
                <div className="py-2 text-gray-500 text-center">Kateqoriyalar yükleniyor...</div>
            ) : categories.length > 0 ? (
                renderCategoryTree()
            ) : (
                <div className="py-2 text-gray-500 text-center">Kateqoriya tapılmadı</div>
            )}
        </div>
    )
}

export default ArticleCategories

