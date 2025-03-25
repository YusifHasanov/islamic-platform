'use client';
import {useParams} from "next/navigation";
import {useState, useEffect} from "react";
import HttpClient from "@/util/HttpClient";
import Link from "next/link";
import {ArrowLeft, CalendarIcon, ClockIcon, FolderOpen, MessageCircle, Share2, TagIcon, ThumbsUp} from "lucide-react";
import {Calendar} from "primereact/calendar";
import {Thumbs} from "swiper/modules";

export default function DetailPage() {
    const {id} = useParams(); // Extract the question ID from the route
    const [question, setQuestion] = useState(null);
    const [hasLiked, setHasLiked] = useState(() => Math.random() < 0.5);

    useEffect(() => {
        // Fetch question details from the API
        HttpClient.get(`/questions/${id}`)
            .then((res) => res.json())
            .then((data) => setQuestion(data))
            .catch((err) => console.error("Error fetching question:", err));
    }, [id]);

    if (!question) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }
    const handleLike = () => {
        setHasLiked(!hasLiked);
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="mb-6">
                <Link
                    href="/questions"
                    className="inline-flex items-center text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Suallara qayıt
                </Link>
            </div>

            <article className="space-y-8">
                <div>
                    <h1 className="text-2xl font-bold mb-4">{question.question}</h1>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                            <CalendarIcon className="mr-1 h-4 w-4"/>
                            {new Date(question.createdDate).toLocaleDateString('az-AZ', {
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric',
                            })}
                        </div>
                        {/*<div className="flex items-center">*/}
                        {/*    <ClockIcon className="mr-1 h-4 w-4"/>*/}
                        {/*    {new Date().getFullYear().toString()} read*/}
                        {/*</div>*/}
                        {/*<div className="flex items-center">*/}
                        {/*    <MessageCircle className="mr-1 h-4 w-4"/>*/}
                        {/*    {new Date().getFullYear().toString()} comments*/}
                        {/*</div>*/}
                    </div>
                </div>

                <div
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                    <div style={{backgroundColor: "#ccbf4d33"}} className="p-6">
                        <div className="prose max-w-none dark:prose-invert">
                            {question.answer.split("\n\n").map((paragraph, index) => (
                                <p key={index} className="mb-4 text-gray-700 dark:text-gray-300">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700 space-y-4">
                        <div className="flex items-center gap-2">
                            <TagIcon className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                            <div className="flex flex-wrap gap-1">
                                {question.tags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full"
                                    >
                    {tag.name}
                  </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <FolderOpen className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                            <div className="flex flex-wrap gap-1">
                                {question.categories.map((category) => (
                                    <span
                                        key={category.id}
                                        className="px-2.5 py-0.5 text-xs font-medium border border-gray-200 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-full"
                                    >
                    {category.name}
                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/*<div className="flex justify-between items-center">*/}
                {/*    <div className="flex items-center gap-4">*/}
                {/*        <button*/}
                {/*            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md ${*/}
                {/*                hasLiked*/}
                {/*                    ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"*/}
                {/*                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"*/}
                {/*            }`}*/}
                {/*            onClick={handleLike}*/}
                {/*        >*/}
                {/*            <ThumbsUp className="h-4 w-4"/>*/}
                {/*            <span>{12}</span>*/}
                {/*        </button>*/}
                {/*        <button*/}
                {/*            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-600">*/}
                {/*            <MessageCircle className="h-4 w-4"/>*/}
                {/*            <span>Comment</span>*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*    <button*/}
                {/*        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">*/}
                {/*        <Share2 className="h-4 w-4"/>*/}
                {/*        <span>Share</span>*/}
                {/*    </button>*/}
                {/*</div>*/}

                {/*<div className="border-t border-gray-200 dark:border-gray-700 pt-8"></div>*/}

                {/*<section>*/}
                {/*    <h2 className="text-xl font-semibold mb-4">Related Questions</h2>*/}
                {/*    <div className="space-y-3">*/}
                {/*        {relatedQuestions.map((relatedQuestion) => (*/}
                {/*            <div*/}
                {/*                key={relatedQuestion.id}*/}
                {/*                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"*/}
                {/*            >*/}
                {/*                <div className="p-4">*/}
                {/*                    <Link*/}
                {/*                        href={`/questions/${relatedQuestion.id}`}*/}
                {/*                        className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"*/}
                {/*                    >*/}
                {/*                        {relatedQuestion.question}*/}
                {/*                    </Link>*/}
                {/*                </div>*/}
                {/*                <div className="px-4 pb-4">*/}
                {/*                    <div className="flex flex-wrap gap-1">*/}
                {/*                        {relatedQuestion.tags.slice(0, 3).map((tag) => (*/}
                {/*                            <span*/}
                {/*                                key={tag}*/}
                {/*                                className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded-full"*/}
                {/*                            >*/}
                {/*        {tag}*/}
                {/*      </span>*/}
                {/*                        ))}*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</section>*/}
            </article>
        </div>
    );
}
