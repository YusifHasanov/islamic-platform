import Image from "next/image"

const Header = () => {
  return (
    <section className="relative w-full h-[400px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://52principlesforchurchleaders.com/wp-content/uploads/2024/03/Book-open19-12-42.jpg" // Resim dosyasının yolunu buraya ekleyin
          alt="Açık bir kitap"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Arka plana karartma efekti */}
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col pt-16 sm:pt-28 h-full max-w-2xl sm:max-w-4xl mx-auto lg:mx-0 px-4 sm:px-8 lg:px-16 xl:px-32 text-white">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:text-left">MAKALELER</h1>
        <p className="text-base sm:text-lg lg:text-left">
          ƏHLİ SÜNNƏT MEDRƏSƏSİ <br />
          İman, Fiqh və Siyarın İşığında – Mənəvi Səyahətinizə Yol Göstərir Bu kanalda, iman həqiqətləri, fiqh və siyer
          mövzularında hazırlanmış məzmunlarla mənəvi dünyanızı zənginləşdirir, bilgi birikiminizi artırır və doğru
          səyahətə çıxmanız üçün yol göstərişləri verir. Kanalımızı izləyərək ilim və mənəviyyatın dərinliklərinə çata
          bilərsiniz.
        </p>
      </div>
    </section>
  )
}

export default Header

