import React from "react"
import OtherArticleCard from "@/components/articles/OtherArticleCard"

const OtherArticleList = () => {
  const arr = [
    {
      title: "Efendimiz (s.a.v.) Boykot Döneminde Nasıl Sıkıntılar Çekmiştir?",
      date: "1 Ekim 2024",
      image:
        "https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp",
    },
    {
      title: "Ebû Talip İmanlı mı Öldü? – Hz. Hatice’nin (r.a.) Vefatı",
      date: "1 Ekim 2024",
      image:
        "https://hayalhanem.com/wp-content/uploads/2024/10/Hz.-Hamzar.a.-Nasil-Sehit-Oldu-Muslumanlar-Uhudda-Neden-Galibiyet-Elde-Edemediler.webp",
    },
    {
      title: "Efendimiz (s.a.v.) Taif’te Kimler Taşladı?",
      date: "Ekim 1, 2024",
      image:
        "https://hayalhanem.com/wp-content/uploads/2024/10/Munafiklarin-Ahlaki-Ozellikleri-Hadislerde-Nasil-Gecmektedir.webp",
    },
    {
      title: "Efendimiz (s.a.v.) Hayatı Boyunca Ne Sıkıntılar Yaşamıştır?",
      date: "Ekim 1, 2024",
      image:
        "https://hayalhanem.com/wp-content/uploads/2024/10/Efendimizs.a.v.-Boykot-Doneminde-Nasil-Sikintilar-Cekmistir.webp",
    },
  ]

  return (
    <div className=" mx-auto py-8  ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-x-12">
        {/* İman Column */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">İMAN</h2>
          {arr.map((item, id) => (
            <React.Fragment key={id}>
              <OtherArticleCard title={item.title} date={item.date} image={item.image} />
              {id !== arr.length - 1 && <hr className="border-gray-300 mb-4" />}
            </React.Fragment>
          ))}
        </div>

        {/* Fıkıh Column */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">FIKIH</h2>
          <OtherArticleCard
            title="Müslümanın Borcu Olur mu? – Efendimiz (s.a.v.) Borcu Olan Müslümanın Cenaze Namazını Kıldırmamış mıdır?"
            date="Ekim 1, 2024"
            image="https://hayalhanem.com/wp-content/uploads/2024/10/efendimiz-cenaze-namazi-kildirmismidir-.webp"
          />
        </div>
      </div>
    </div>
  )
}

export default OtherArticleList

