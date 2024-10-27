import React from 'react';

const ContactPage = () => {

  return (
      <div>
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
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <input
                type="text"
                placeholder="Adınız Soyadınız"
                className="w-full contactInput sm:w-80 py-3 px-4 border border-gray-300 rounded-3xl focus:outline-none  "
            />
            <input
                type="email"
                placeholder="E-posta"
                className="w-full contactInput sm:w-80 py-3 px-4 border border-gray-300 rounded-3xl  focus:outline-none f "
            />
            <input
                type="text"
                placeholder="Konu"
                className="w-full contactInput sm:w-80 py-3 px-4 border border-gray-300 rounded-3xl  focus:outline-none "
            />
            <input
                type="text"
                placeholder="Telefon"
                className="w-full contactInput sm:w-80 py-3 px-4 border border-gray-300 rounded-3xl  focus:outline-none "
            />
            <textarea
                placeholder="Mesajınız"
                className="w-full contactInput sm:w-80 md:w-full col-span-2 py-3 px-4 border border-gray-300 rounded-3xl focus:outline-none  "
                rows="6"
            ></textarea>
            <div className="col-span-2 text-center">
              <button
                  type="submit"
                  className="contactSubmitBtn"
              >
                GÖNDER
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default ContactPage;