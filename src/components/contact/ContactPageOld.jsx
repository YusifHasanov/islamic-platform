"use client"
import { useRef, useState } from "react"
import { Toast } from "primereact/toast"
import HttpClient from "@/util/HttpClient"

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        phone: "",
        message: "",
    })
    const toast = useRef(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // Form submit fonksiyonu
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await HttpClient.post("/contact", formData)

            if (response.ok) {
                toast.current.show({ severity: "success", summary: "Success", detail: "Mesajınız başarıyla gönderildi!" })
                setFormData({ name: "", email: "", subject: "", phone: "", message: "" })
            } else {
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
                })
            }
        } catch (error) {
            console.error("API hatası:", error)
            toast.current.show({ severity: "error", summary: "Error", detail: "Bir hata oluştu. Lütfen tekrar deneyin." })
        }

        setIsLoading(false)
    }

    return (
        <div>
            <Toast ref={toast} />
            {/* Üst Kısım (Background Image ve Metinler) */}
            <div className="relative w-full h-[400px]">
                <img
                    src="https://images.unsplash.com/photo-1713013727106-bfa2a9bdddc1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="İletişim Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                    <div className="container mx-auto px-4 lg:px-20 text-white">
                        <h1 className="text-4xl font-bold mb-4">Əlaqə</h1>
                        <p className="text-lg">
                            Əhli Sünnə Medresəsi komandası olaraq, sizinlə əlaqədə olmaq bizi çox sevindirir! Suallarınız, layihələrə
                            dəstək vermək və ya sadəcə bir salam demək üçün bizimlə əlaqə saxlaya bilərsiniz.
                        </p>
                    </div>
                </div>
            </div>

            {/* Alt Kısım (İletişim Formu) */}
            <div className="container mx-auto px-4 lg:px-20 py-12">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    <input
                        type="text"
                        name="name"
                        placeholder="Adınız Soyadınız"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full contactInput sm:w-80 py-3 px-4 border border-gray-300 rounded-3xl focus:outline-none  "
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="E-mail"
                        className="w-full contactInput sm:w-80 py-3 px-4 border border-gray-300 rounded-3xl  focus:outline-none f "
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Mövzu"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full contactInput sm:w-80 py-3 px-4 border border-gray-300 rounded-3xl  focus:outline-none "
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Telefon"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full contactInput sm:w-80 py-3 px-4 border border-gray-300 rounded-3xl  focus:outline-none "
                    />
                    <textarea
                        className="w-full contactInput sm:w-80 md:w-full col-span-2 py-3 px-4 border border-gray-300 rounded-3xl focus:outline-none  "
                        name="message"
                        placeholder="Mesajınız"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        required
                    ></textarea>
                    <div className="col-span-2 text-center">
                        <button type="submit" className="py-3 px-6 bg-yellow-500 text-white rounded-3xl" disabled={isLoading}>
                            {isLoading ? "Gönderiliyor..." : "GÖNDER"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactPage

