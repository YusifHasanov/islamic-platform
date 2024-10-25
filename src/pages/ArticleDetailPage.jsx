import React from 'react';
import MostReadArticles from "@/components/articles/MostReadArticles";
const ArticleDetail = () => {
    return (
        <div>
            {/* Full Width Image */}
            <div className="w-full h-96">
                <img src="https://hayalhanem.com/wp-content/uploads/2024/10/Cemaat-Olmanin-Onemi.webp" alt="Blog Image" className="w-full h-full object-cover" />
            </div>

            <div className="container mx-auto py-12 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Blog İçeriği */}
                    <div className="lg:col-span-2">
                        <div className="mb-4 text-sm text-gray-500">
                            İMAN / PEYGAMBERE İMAN / HZ. MUHAMMED (sav) / CEMAAT OLMANIN ÖNEMİ
                        </div>
                        <h1 className="text-4xl font-bold mb-6">Cemaat Olmanın Önemi</h1>
                        <p className="text-gray-700 mb-4">
                            Efendimiz (s.a.v.) meclislerle ilgili bir hadisinde şöyle buyuruyor: "Allah’ın (c.c.) yeryüzüne gönderdiği seyyah melekleri vardır..."
                        </p>
                        <p className="text-gray-700 mb-4">
                            Allah (c.c.) onlara sorar: “Ne yapıyor kullarım?” Cevap: “Seni tesbih ediyorlar ya Rab.”...
                        </p>
                        Efendimiz(s.a.v.) meclislerle ilgili bir hadisinde şöyle buyuruyor: “Allah’ın(c.c.) yeryüzüne gönderdiği seyyah melekleri vardır. Bir meclis bulunca birbirlerine haber verirler: “Gelin falanca yerde Allah(c.c.) için bir araya gelen bir topluluk var.” derler. Kanatlarıyla arşa kadar helezon oluştururlar.


                        Allah(c.c.) onlara sorar:


                        “Ne yapıyor kullarım?”


                        “Seni tesbih ediyorlar ya Rab.”


                        “Onlar beni gördü mü?”


                        “Hayır ya Rab.”


                        “Peki onlar beni görselerdi ne yaparlardı?”


                        “Şu an ne yapıyorlarsa ziyadesini, fazlasını yaparlardı ya Rab.”


                        “Peki o kullarım benden ne istiyorlar?”


                        “Senden cennet istiyorlar ya Rab.”


                        “Peki o kullarım cenneti gördüler mi?”


                        “Hayır görmediler ya Rab.”


                        “Peki görselerdi nasıl isterlerdi?”


                        “Şimdi nasıl istiyorlarsa ziyadesiyle isterlerdi ya Rab.”


                        “Peki o kullarım benden ne için sığınıyorlar?”


                        “Senden cehennem için sığınıyorlar ya Rab.”


                        “Peki o kullarım cehennemi gördüler mi?”


                        “Hayır görmediler ya Rab.”


                        “Peki o kullarım cehennemi görselerdi nasıl sığınırlardı?”


                        “Şimdi nasıl sığınıyorlarsa ziyadesiyle sığınırlardı ya Rab.”


                        “Ben bu haldeki kullarımın hepsini bağışladım.”


                        “Ya Rabbi içlerinde bazıları var ki onlar diğerleri gibi değil.”


                        “Orada oturanlar öyle iyi kimseler ki, aralarında oturan da şaki olmaz, ben hepsini birden bağışladım.”


                        Meleklerin hadis-i şerifte “onlar diğerleri gibi değil” diye bahsettiği insanlar, “arkadaş zoruyla veya canı sıkıldığı için gelen, geçerken uğrayan yahut kınanmamak için gelen insanlardır. O mecliste olduğu için Allah(c.c.) onları da bağışlıyor. Çünkü mecliste bereket var, mecliste insibağ, in’ikas var. O an dinleyenlerin algıları kapalı bile olsa onlara orada o tohum ekiliyor ve zamanı gelince boy veriyor. İşte mecliste böyle bir kurtuluş var.
                        {/* Blog içeriği devam eder */}
                    </div>

                    {/* Sağ Menü - En Çok Okunanlar */}
                    <MostReadArticles/>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;