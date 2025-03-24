"use client"

import {useState, useEffect} from "react"
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import {Star} from "lucide-react";


// Sample testimonial data
const testimonials = [
    {
        id: 1,
        author: "Elçin S.",
        text: "Əhli Sünnə Mədrəsəsi vasitəsilə ruhumun dərinliklərinə səyahət etdim. Hər dərs və mühazirə mənə iman və mənəviyyatın əhəmiyyətini bir daha xatırlatdı. Həyatımda yeni bir səhifə açdı.",
        rating: 5,
    },
    {
        id: 2,
        author: "Nigar A.",
        text: "Bu mədrəsənin dərsləri insanı düşünməyə, öyrənməyə və özünü inkişaf etdirməyə sövq edir. Müəllimlərin səmimi yanaşması və zəngin bilikləri mənim üçün ilham mənbəyi oldu.",
        rating: 5,
    },
    {
        id: 3,
        author: "Fərid M.",
        text: "Əhli Sünnə Meədrəsəsində öyrəndiklərim gündəlik həyatımda yol göstərici oldu. Dərslərin dərinliyi və müəllimlərin təcrübəsi mənəvi zənginliyimə böyük töhfə verdi.",
        rating: 5,
    },
];

export default function Component() {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    return (
        <div
            style={{
                backgroundImage: "url(https://hayalhanem.com/wp-content/uploads/2024/10/bg-sizden-elenler.webp)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
            }}
            className={"w-full"}>
            <div className="relative mx-auto max-w-4xl px-4 py-16">
                {/* Gmail-style logo */}
                <div className="mb-8 flex justify-center">
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-red-500 to-blue-500 p-2 text-white">
                        <div className="flex h-full items-center justify-center text-2xl font-bold">M</div>
                    </div>
                </div>

                {/* Testimonial */}
                {/* Testimonial */}
                <div className="relative min-h-[200px] overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{transform: `translateX(-${currentSlide * 100}%)`}}
                    >
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="w-full flex-shrink-0 px-4 text-center"
                            >
                                <p className="mb-6 text-lg text-gray-700">{testimonial.text}</p>
                                <div className="mb-4 flex justify-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-6 w-6 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100"
                >
                    <AiFillCaretLeft className="h-6 w-6 text-gray-600"/>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100"
                >
                    <AiFillCaretRight className="h-6 w-6 text-gray-600"/>
                </button>

                {/* Navigation dots */}
                <div className="mt-8 flex justify-center space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 w-2 rounded-full transition-all ${
                                currentSlide === index ? "w-4 bg-blue-500" : "bg-gray-300"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
