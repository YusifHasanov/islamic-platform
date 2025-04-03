import React from 'react';

const AboutUsPage = () => {
  return (
      <div className="bg-white"> {/* Optional: Ensures a base background color */}
        {/* Hero Section */}
        <section className="relative w-full h-[500px] sm:h-[550px] lg:h-[600px] flex items-center justify-center text-center">
          {/* Background Image */}
          <img
              src="/about_us.png"
              alt="Haqqımızda Fon" // More descriptive alt text
              className="absolute inset-0 w-full h-full object-cover object-center" // Added object-center
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/60 to-black/50"></div> {/* Subtle gradient overlay */}

          {/* Content */}
          <div className="relative z-10 container mx-auto px-6 sm:px-8 max-w-4xl"> {/* Constrained width for readability */}
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Məqsədimiz
            </h1>
            <p className="text-white text-lg sm:text-xl leading-relaxed"> {/* Increased text size and line height */}
              Əlisünnə Mədrəsəsi olaraq, İslam dininin hikmətini və mənəvi dəyərlərini geniş auditoriyaya çatdırmaq üçün
              fəaliyyət göstəririk. Məqsədimiz, Əhli Sünnə təlimlərinin əsasında, saf və düzgün dini bilikləri təqdim
              edərək, fərdlərin imanını möhkəmləndirmək və cəmiyyətə faydalı olmaqdır. Hər kəsi İslamın mərhəmət və
              sevgi dolu mesajı ilə tanış etmək ən önəmli vəzifəmizdir.
            </p>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="bg-gray-50 py-16 sm:py-24"> {/* Light background for separation, more padding */}
          <div className="container mx-auto max-w-7xl px-6 lg:px-8"> {/* Standard max-width container */}

            {/* Section 1: Tədris və Maarifləndirmə */}
            <section className="mb-16 lg:mb-24"> {/* Increased bottom margin */}
              <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"> {/* Added items-center, increased gap */}
                {/* Image */}
                <div className="w-full lg:w-2/5 flex-shrink-0"> {/* Adjusted width slightly */}
                  <img
                      src="/about_us_2.png"
                      alt="Tədris və Maarifləndirmə" // More descriptive alt text
                      className="w-full h-auto rounded-xl shadow-lg object-cover aspect-square lg:aspect-[4/3]" // Defined aspect ratio, larger rounding
                  />
                </div>
                {/* Text */}
                <div className="w-full lg:w-3/5">
                  <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6"> {/* Increased heading margin */}
                    Tədris və Maarifləndirmə
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4"> {/* Increased text size and line height */}
                    Bizim əsas fəaliyyət istiqamətimiz İslam elmlərinin dərinliklərinə enərək, onları aydın və asan başa
                    düşülən şəkildə təqdim etməkdir. Qurani-Kərim təfsiri, hədislər, fiqh və əxlaq dərsləri vasitəsilə dini
                    bilikləri həm yeni başlayanlar, həm də inkişaf etmiş bilik səviyyəsinə malik olan şəxslər üçün əlçatan
                    edirik. Təlimlərimizdə yalnız nəzəri biliklər deyil, həm də bu biliklərin gündəlik həyatda tətbiqinə
                    xüsusi diqqət yetiririk. Bu yanaşma, insanların yalnız dini biliklərini artırmaqla kifayətlənməyərək, eyni
                    zamanda mənəvi olaraq güclənmələrinə dəstək olur.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed"> {/* Increased text size and line height */}
                    Digər tərəfdən, müasir dövrün ehtiyaclarına uyğunlaşmağı əsas prinsip kimi qəbul edirik. Mədrəsəmizdə
                    təqdim olunan maarifləndirmə materialları, dini və mənəvi bilikləri praktik şəkildə həyata keçirə bilməyə
                    yönəldilmişdir. Hədəfimiz, biliklərlə yanaşı, mənəviyyatı gücləndirən bir yol yoldaşı olmaqdır.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Dəyərlərimiz və Görüşümüz */}
            <section> {/* Last section doesn't need margin-bottom */}
              <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16"> {/* Added items-center, increased gap */}
                {/* Text */}
                <div className="w-full lg:w-3/5">
                  <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 mb-6"> {/* Increased heading margin */}
                    Dəyərlərimiz və Görüşümüz
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-4"> {/* Increased text size and line height */}
                    Əlisünnə Mədrəsəsi sevgi, sülh və birlik dəyərlərinə sadiq qalaraq, İslamın bütün insanlara təqdim etdiyi
                    universal mesajı vurğulayır. Biz, hər bir fərdin bu dünyada mənəvi axtarışını gücləndirmək və onu doğru
                    istiqamətləndirmək üçün yaradılmışıq. Əsas dəyərlərimizdən biri, hər bir fərdin dindən aldığı bilikləri
                    sevgi və anlayışla paylaşmasına şərait yaratmaqdır. İnanırıq ki, İslam dəyərlərinin düzgün təbliği,
                    cəmiyyətlər arasında həmrəyliyin və harmoniyanın inkişafına xidmət edir.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed"> {/* Increased text size and line height */}
                    Eyni zamanda, gələcəyə baxışımızı müasir dünyanın ehtiyaclarına uyğun formalaşdırmışıq. Vizyonumuz,
                    İslamın hikmət dolu irsini həm yerli, həm də qlobal miqyasda təbliğ edərək, bilik, əxlaq və iman üzərində
                    qurulan bir cəmiyyətin yaranmasına töhfə verməkdir. Təlimlərimizlə insanlara yalnız din öyrətmirik, eyni
                    zamanda onların mənəvi ehtiyaclarına cavab verərək həyatlarında mənalı bir iz qoymağı hədəfləyirik.
                  </p>
                </div>
                {/* Image */}
                <div className="w-full lg:w-2/5 flex-shrink-0"> {/* Adjusted width slightly */}
                  <img
                      src="/4mezheb.png"
                      alt="Dəyərlərimiz və Görüşümüz" // More descriptive alt text
                      className="w-full h-auto rounded-xl shadow-lg object-cover aspect-square lg:aspect-[4/3]" // Defined aspect ratio, larger rounding
                  />
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
  );
};

export default AboutUsPage;
