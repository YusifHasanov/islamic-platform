'use client'
import React, {useRef, useState} from 'react';
import {BASE_URL} from "@/util/Const";
import {Toast} from "primereact/toast";
import HttpClient from "@/util/HttpClient";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });
  const toast= useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submit fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await  HttpClient.post("/contact", formData)

      if (response.ok) {
        toast.current.show({severity: 'success', summary: 'Success', detail: 'Mesajınız başarıyla gönderildi!'});
        setFormData({ name: '', email: '', subject: '', phone: '', message: '' });
      } else {
        toast.current.show({severity: 'success', summary: 'Success', detail: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.'});
      }


    } catch (error) {
      console.error('API hatası:', error);
      toast.current.show({severity: 'error', summary: 'Error', detail: 'Bir hata oluştu. Lütfen tekrar deneyin.'});
    }

    setIsLoading(false);
  };

  return (
      <div>
        <Toast ref={toast}/>
        {/* Üst Kısım (Background Image ve Metinler) */}
        <div className="relative w-full h-[400px]">
          <img
              src="https://hayalhanem.com/wp-content/uploads/2024/10/5-.webp"
              alt="İletişim Background"
              className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
            <div className="container mx-auto px-4 lg:px-20 text-white">
              <h1 className="text-4xl font-bold mb-4">İLETİŞİM</h1>
              <p className="text-lg">
                Hayalhanem ekibi olarak sizinle iletişimde olmak bizi çok mutlu eder!
                Sorularınız, projelere destek olmak ya da sadece bir merhaba demek için bile bize ulaşabilirsiniz.
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
                placeholder="E-posta"
                className="w-full contactInput sm:w-80 py-3 px-4 border border-gray-300 rounded-3xl  focus:outline-none f "
            />
            <input
                type="text"
                name="subject"
                placeholder="Konu"
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
              <button
                  type="submit"
                  className="py-3 px-6 bg-yellow-500 text-white rounded-3xl"
                  disabled={isLoading}
              >
                {isLoading ? 'Gönderiliyor...' : 'GÖNDER'}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default ContactPage;