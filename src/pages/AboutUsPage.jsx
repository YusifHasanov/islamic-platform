import React from 'react';

const AboutUsPage = () => {
    return (
        <div>
            {/* Üst Kısım (Background Image ile Hakkımızda Metni) */}
            <div className="relative w-full h-[500px]">
                <img
                    src="https://hayalhanem.com/wp-content/uploads/2024/10/hayalhanem-mehmet-yildiz5-1-1-scaled-1.jpg"
                    alt="Hakkımızda Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
                    <div className="container mx-auto px-4 lg:px-20">
                        <h1 className="text-white text-4xl font-bold mb-4">HAKKIMIZDA</h1>
                        <p className="text-white text-lg">
                            Hayalhanem Derneği olarak biz, İslami değerleri ve toplumsal yardımlaşmayı merkeze alarak çeşitli alanlarda faaliyet gösteriyoruz. Amacımız, hem manevi hem de maddi açıdan insanlara yardımcı olmak ve toplumumuzu daha güçlü ve bilinçli hale getirmektir. Hayalhanem Derneği olarak, sizin desteklerinizle büyüyor ve daha fazla insana ulaşıyoruz. Gelin, birlikte daha güçlü ve bilinçli bir toplum oluşturalım.
                        </p>
                    </div>
                </div>
            </div>

            {/* Geri Kalan Kısım (Tarihçemiz ve Amacımız) */}
            <div className="container mx-auto px-4 lg:px-20 py-12">
                {/* Tarihçemiz Bölümü */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    <div>
                        <img
                            src="https://hayalhanem.com/wp-content/uploads/2024/10/6-katli.jpg"
                            alt="Tarihçemiz"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Tarihçemiz</h2>
                        <p className="text-gray-700 mb-4">
                            Mersin’de bir tantuni dükkanının üst katını kiralayarak başlayan serüvenimiz, bu küçük yerin artan talepleri karşılayamaması sonucu, Hayalhanem dört katlı olarak devam etti. Mehmet Yıldız’ın da içinde bulunduğu üç arkadaş, 2013 yılında toplanıp büyük bir yer için arsa satın aldılar...
                        </p>
                        <p className="text-gray-700 mb-4">
                            Aynı hedef doğrultusunda, 2019 yılında, İstanbul’un Beşiktaş ilçesinde 190 metrekarelik bir yer kiralandı ve orada da Risale-i Nur dersleri anlatılmaya başlandı. Bu küçük yer de talepleri karşılamada yetersiz kalınca, 2022 yılının mart ayında İstanbul’un Şişli ilçesinde altı katlı bir mekân kiralandı...
                        </p>
                    </div>
                </div>

                {/* Amacımız Bölümü */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Amacımız</h2>
                        <p className="text-gray-700 mb-4">
                            İman hakikatlerini anlatma amacıyla yola çıkan Hayalhanem, bir ilim ve kültür derneğidir. Bu kuruluş Peygamber Efendimiz’in(s.a.v) mesleği olan tebliğ odaklı bir vizyon ile faaliyet göstermektedir...
                        </p>
                        <p className="text-gray-700 mb-4">
                            Hayalhanem’de gerçekleşen Risale-i Nur dersleri, iman hakikatlerini anlama ve yaşama konusunda katılımcılara kılavuzluk etmektedir. Bu sayede derneğimizin temel amacına daha etkili bir şekilde ulaşmamıza yardımcı olmaktadır...
                        </p>
                    </div>
                    <div>
                        <img
                            src="https://hayalhanem.com/wp-content/uploads/2024/10/my-kapak-2-mehmet-yildiz-scaled-1-e1713914027676.jpg"
                            alt="Amacımız"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;