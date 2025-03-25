import React from 'react';

const AboutUsPage = () => {
    return (
        <div>
            {/* Üst Kısım (Background Image ile Hakkımızda Metni) */}
            <div className="relative w-full h-[500px]">
                <img
                    src="/about_us.png"
                    alt="Hakkımızda Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center">
                    <div className="container mx-auto px-4 lg:px-20">
                        <h1 className="text-white text-4xl font-bold mb-4">Məqsədimiz</h1>
                        <p className="text-white text-lg">
                            Əlisünnə Mədrəsəsi olaraq, İslam dininin hikmətini və mənəvi dəyərlərini geniş auditoriyaya
                            çatdırmaq üçün fəaliyyət göstəririk. Məqsədimiz, Əhli Sünnə təlimlərinin əsasında, saf və
                            düzgün dini bilikləri təqdim edərək, fərdlərin imanını möhkəmləndirmək və cəmiyyətə faydalı
                            olmaqdır. Hər kəsi İslamın mərhəmət və sevgi dolu mesajı ilə tanış etmək ən önəmli
                            vəzifəmizdir.
                        </p>
                    </div>
                </div>
            </div>

            {/* Geri Kalan Kısım (Tarihçemiz ve Amacımız) */}
            <div className=" mx-auto px-4 lg:px-12 py-12">
                {/* Tarihçemiz Bölümü */}
                <div className="flex flex-col lg:flex-row gap-8 mb-12">
                    <div className="w-full lg:w-[35%]">
                        <img
                            src="/about_us_2.png"
                            alt="Tarihçemiz"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="w-full lg:w-[65%]">
                        <h2 className="text-3xl font-semibold mb-4">Tədris və Maarifləndirmə</h2>
                        <p className="text-gray-700 mb-4">
                            Bizim əsas fəaliyyət istiqamətimiz İslam elmlərinin dərinliklərinə enərək, onları aydın və
                            asan başa düşülən şəkildə təqdim etməkdir. Qurani-Kərim təfsiri, hədislər, fiqh və əxlaq
                            dərsləri vasitəsilə dini bilikləri həm yeni başlayanlar, həm də inkişaf etmiş bilik
                            səviyyəsinə malik olan şəxslər üçün əlçatan edirik. Təlimlərimizdə yalnız nəzəri biliklər
                            deyil, həm də bu biliklərin gündəlik həyatda tətbiqinə xüsusi diqqət yetiririk. Bu yanaşma,
                            insanların yalnız dini biliklərini artırmaqla kifayətlənməyərək, eyni zamanda mənəvi olaraq
                            güclənmələrinə dəstək olur.
                        </p>
                        <p className="text-gray-700 mb-4">
                            Digər tərəfdən, müasir dövrün ehtiyaclarına uyğunlaşmağı əsas prinsip kimi qəbul edirik.
                            Mədrəsəmizdə təqdim olunan maarifləndirmə materialları, dini və mənəvi bilikləri praktik
                            şəkildə həyata keçirə bilməyə yönəldilmişdir. Hədəfimiz, biliklərlə yanaşı, mənəviyyatı
                            gücləndirən bir yol yoldaşı olmaqdır.
                        </p>
                    </div>
                </div>

                {/* Amacımız Bölümü */}
                <div className="flex flex-col-reverse lg:flex-row gap-8">
                    <div className="w-full lg:w-[65%]">
                        <h2 className="text-3xl font-semibold mb-4">Dəyərlərimiz və Görüşümüz</h2>
                        <p className="text-gray-700 mb-4">
                            Əlisünnə Mədrəsəsi sevgi, sülh və birlik dəyərlərinə sadiq qalaraq, İslamın bütün insanlara
                            təqdim etdiyi universal mesajı vurğulayır. Biz, hər bir fərdin bu dünyada mənəvi axtarışını
                            gücləndirmək və onu doğru istiqamətləndirmək üçün yaradılmışıq. Əsas dəyərlərimizdən biri,
                            hər bir fərdin dindən aldığı bilikləri sevgi və anlayışla paylaşmasına şərait yaratmaqdır.
                            İnanırıq ki, İslam dəyərlərinin düzgün təbliği, cəmiyyətlər arasında həmrəyliyin və
                            harmoniyanın inkişafına xidmət edir.

                        </p>
                        <p className="text-gray-700 mb-4">
                            Eyni zamanda, gələcəyə baxışımızı müasir dünyanın ehtiyaclarına uyğun formalaşdırmışıq.
                            Vizyonumuz, İslamın hikmət dolu irsini həm yerli, həm də qlobal miqyasda təbliğ edərək,
                            bilik, əxlaq və iman üzərində qurulan bir cəmiyyətin yaranmasına töhfə verməkdir.
                            Təlimlərimizlə insanlara yalnız din öyrətmirik, eyni zamanda onların mənəvi ehtiyaclarına
                            cavab verərək həyatlarında mənalı bir iz qoymağı hədəfləyirik.

                        </p>
                    </div>
                    <div className="w-full lg:w-[35%]">
                        <img
                            src="/firudin.png"
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
