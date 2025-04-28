'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Clock, Eye, FolderOpen, Tag as TagIcon } from 'lucide-react';
import QuestionDetailClientInteractions from '@/layouts/QuestionDetailClientInteractions';
import RelatedQuestionCard from '@/components/questions/RelatedQuestionCard';

// This is a Server Component
export default function QuestionDetailWrapper({ question, relatedQuestions }) {
    return (
        <div className="bg-gradient-to-b from-emerald-50 via-white to-white min-h-screen">
            {/* Back Navigation */}
            <div className="container mx-auto px-4 pt-6 md:pt-8">
                <Link href="/questions"
                      className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-900 transition-colors group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"/>
                    Bütün suallara qayıt
                </Link>
            </div>

            <div className="container mx-auto py-6 md:py-10 px-4 max-w-4xl">
                <motion.article
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                    className="space-y-8 md:space-y-10"
                >
                    {/* === Question Header & Metadata (Server Rendered) === */}
                    <header className="space-y-4">
                        <h1 className="text-2xl text-justify sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            {question.question}
                        </h1>
                        <div
                            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 border-t border-b border-gray-100 py-3">
                            <span className="flex items-center" title="Yaradılma tarixi">
                                <CalendarDays className="mr-1.5 h-4 w-4 text-emerald-600"/>
                                {question.createdDateFormatted}
                            </span>
                            {question.readTimeMinutes && (
                                <span className="flex items-center" title="Oxunma müddəti">
                                    <Clock className="mr-1.5 h-4 w-4 text-emerald-600"/>
                                    ≈ {question.readTimeMinutes} dəq oxunuş
                                </span>
                            )}
                            {question.readCount !== undefined && (
                                <span className="flex items-center" title="Baxış sayı">
                                    <Eye className="mr-1.5 h-4 w-4 text-emerald-600"/>
                                    {question.readCount} baxış
                                </span>
                            )}
                        </div>
                    </header>

                    {/* === Answer Content (Server Rendered) === */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.1, duration: 0.5}}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8"
                    >
                        <div
                            className="prose text-justify prose-emerald max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-headings:font-semibold prose-headings:text-gray-800 prose-a:text-emerald-600 hover:prose-a:text-emerald-700 break-words"
                        >
                            {question.answer.split('\n').map((paragraph, index) => (
                                paragraph.trim() ? <p key={index}>{paragraph}</p> : null
                            ))}
                        </div>
                    </motion.div>

                    {/* === Tags and Categories (Server Rendered) === */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.2, duration: 0.5}}
                        className="space-y-4 p-5 bg-gray-50/50 rounded-lg border border-gray-100"
                    >
                        {question.tags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <TagIcon className="h-4 w-4 text-emerald-600 flex-shrink-0"/>
                                <span className="text-sm font-medium text-gray-700 mr-1">Taqlər:</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {question.tags.map(tag => (
                                        <Link key={tag.id} href={`/questions?tag=${tag.id}&page=1`}
                                              className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 rounded-full">
                                            <span
                                                className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors">
                                                {tag.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {question.categories.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <FolderOpen className="h-4 w-4 text-emerald-600 flex-shrink-0"/>
                                <span className="text-sm font-medium text-gray-700 mr-1">Kateqoriyalar:</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {question.categories.map(category => (
                                        <Link key={category.id} href={`/questions?category=${category.id}&page=1`}
                                              className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-emerald-300 rounded-full">
                                            <span
                                                className="inline-block px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors">
                                                {category.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* === Action Buttons (Client Component) === */}
                    <QuestionDetailClientInteractions
                        questionId={question.id}
                        initialLikeCount={question.initialLikeCount}
                        questionTitle={question.question} // For sharing
                    />

                    {/* === Related Questions (Server Rendered) === */}
                    {relatedQuestions.length > 0 && (
                        <motion.section
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.4, duration: 0.5}}
                            className="pt-8 md:pt-10 border-t border-gray-100"
                        >
                            <h2 className="text-xl font-semibold mb-5 text-gray-800">Oxşar Suallar</h2>
                            <div className="grid gap-4 md:grid-cols-2">
                                {relatedQuestions.map(rq => (
                                    <RelatedQuestionCard key={rq.id} question={rq}/>
                                ))}
                            </div>
                        </motion.section>
                    )}

                </motion.article>
            </div>
        </div>
    );
}
