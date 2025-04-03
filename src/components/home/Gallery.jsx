"use client"
import { useState } from "react"
import Image from "next/image"
// import { Image } from "primereact/image";
const images = [
  "/qardaslar_1.jfif",
  "/qardaslar_2.jfif",
  "/qardaslar_1.jfif",
  "/qardaslar_2.jfif",
  "/qardaslar_1.jfif",
  "/qardaslar_2.jfif",
]

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageClick = (image) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <div className="py-16 bg-gray-100 px-4 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Sol taraf - Galeri açıklaması */}
      <div className="bg-[#FCB900] p-8 rounded-lg h-max">
        <h2 className="text-3xl font-bold mb-4">GALERİ</h2>
        <p className="text-lg">
          Bu fotoğrafta, her anı kucaklamak ve bu samimi hikayenin bir parçası olmak ister misin? İçindeki her duygu,
          her gülümseme burada bir anlam buluyor. Bu karede, sadece bir görsel değil, bir aile, bir dostluk hikayesi
          var. Senin de bu hikayeye dahil olmanı bekliyoruz. Gel, birlikte bu fotoğrafta bir anı oluşturalım.
        </p>
      </div>

      {/* Sağ taraf - Görseller */}
      <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg group cursor-pointer"
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="object-cover w-full h-40 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-50 group-hover:scale-x-110"
              width={400}
              height={200}
            />

            {/*Hover efektiyle görünen + simgesi*/}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-4xl font-bold text-white transform transition-transform duration-300 group-hover:rotate-45 hover:rotate-90">
                +
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Modal kapatma düğmesi */}
          <button
            onClick={closeModal}
            className="absolute top-10 right-10 text-white text-3xl font-bold bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition duration-300"
          >
            &times;
          </button>

          {/* Resim */}
          <div className="relative">
            <Image
              src={selectedImage}
              alt="Selected"
              width={800}
              height={600}
              className="rounded-lg max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery

