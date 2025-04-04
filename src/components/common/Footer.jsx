import Link from "next/link"
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaPhone,
    FaMapMarkerAlt,
    FaEnvelope,
    FaWhatsapp,
    FaRegCreditCard
} from "react-icons/fa"
import Image from "next/image"
import FooterBankNumber from "@/components/common/FooterBankNumber";
import {bankData, phones} from "@/util/Const";
import SupportButton from "@/components/common/SupportButton";

const Footer = () => {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            {/* Main Footer */}
            <div className="container mx-auto px-6 pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo and About */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative h-16 w-16  rounded-lg overflow-hidden">
                                <Image src="/esm_logo.png" alt="Əhli Sünnə Mədrəsəsi" fill
                                       className="object-contain p-1"/>
                            </div>
                            <div className="font-bold text-lg">
                                Əhli Sünnə Mədrəsəsi
                            </div>
                        </div>
                        <p className="text-gray-300  text-sm leading-relaxed">
                            Əhli Sünnə Mədrəsəsi iman, fiqh və siyer mövzularında mənəvi dünyanızı zənginləşdirmək üçün
                            məzmunlar
                            təqdim edir.
                        </p>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4 pt-2">
                            <a
                                href="https://www.facebook.com/ehlisunnemedresesi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-colors duration-300"
                                aria-label="Facebook"
                            >
                                <FaFacebook size={18}/>
                            </a>
                            <a
                                href="https://www.instagram.com/ehlisunnemedresesi/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-pink-600 p-2 rounded-full transition-colors duration-300"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={18}/>
                            </a>
                            <a
                                href="https://www.youtube.com/@ehlisunnemedresesi"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-red-600 p-2 rounded-full transition-colors duration-300"
                                aria-label="YouTube"
                            >
                                <FaYoutube size={18}/>
                            </a>
                            <a
                                href="https://wa.me/994509871992" // Correct WhatsApp link format (number without '+')
                                target="_blank" // Opens in new tab/app
                                rel="noopener noreferrer" // Security best practice for target="_blank"
                                // Style it similarly, but use WhatsApp's green color theme
                                className="bg-gray-700 hover:bg-green-700 text-white p-2 rounded-full transition-colors duration-300"
                                aria-label="WhatsApp ilə əlaqə" // Accessibility label (Contact via WhatsApp)
                            >
                                <FaWhatsapp size={18}/> {/* Use the WhatsApp icon */}
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Səhifələr</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-300 hover:text-[#43b365]  transition-colors duration-200 flex items-center"
                                >
                                    <span className="mr-2 text-xs">■</span>
                                    Ana Səhifə
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/videos"
                                    className="text-gray-300 hover:text-[#43b365]  transition-colors duration-200 flex items-center"
                                >
                                    <span className="mr-2 text-xs">■</span>
                                    Videolar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/articles"
                                    className="text-gray-300 hover:text-[#43b365]  transition-colors duration-200 flex items-center"
                                >
                                    <span className="mr-2 text-xs">■</span>
                                    Məqalələr
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/questions"
                                    className="text-gray-300 hover:text-[#43b365]  transition-colors duration-200 flex items-center"
                                >
                                    <span className="mr-2 text-xs">■</span>
                                    Suallar
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-gray-300 hover:text-[#43b365]  transition-colors duration-200 flex items-center"
                                >
                                    <span className="mr-2 text-xs">■</span>
                                    Haqqımızda
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-300 hover:text-[#43b365]  transition-colors duration-200 flex items-center"
                                >
                                    <span className="mr-2 text-xs">■</span>
                                    Əlaqə
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Əlaqə</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <FaPhone className="mt-1 mr-3 text-green-400"/>

                                <div className={"flex flex-col "}>
                                    {
                                        phones.map((phone, index) => (
                                            <a key={index} href={`tel:${phone.replace(/\s/g, '')}`}
                                               className="text-gray-300 hover:text-[#43b365]  transition-colors duration-200">
                                                {phone}
                                            </a>
                                        ))
                                    }
                                </div>
                            </li>

                        </ul>
                    </div>

                    {/* Newsletter */}
                    {/* === İanə Bölməsi (Dəyişdirilmiş Hissə) === */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-green-400">Dəstək
                            Olun</h3> {/* Başlıq dəyişdi */}
                        <p className="text-gray-300 text-sm mb-4 text-justify leading-relaxed"> {/* Təsvir dəyişdi */}
                            Mədrəsəmizin fəaliyyətini davam etdirmək və xidmətlərimizi genişləndirmək üçün sizin maddi
                            dəstəyinizə ehtiyacımız var. Aşağıdakı kart hesablarına ianələrinizi göndərə bilərsiniz.
                        </p>

                        {/* Kart Məlumatları Listi */}
                        {/* === TƏHLÜKƏSİZLİK XƏBƏRDARLIĞI ===
        Aşağıdakı nömrələr yalnız nümunədir. İctimai saytda tam kart nömrələrini
        göstərmək ÇOX RİSKLİDİR. Bunun əvəzinə IBAN və ya təhlükəsiz ödəniş
        sistemləri istifadə edin.
    */}
                        <div className="space-y-3"> {/* Kartlar arası boşluq */}
                            {/* Nümunə Kart 1 */}

                            {/*     bankData.map((bank, index) => (*/}
                            {/*         <FooterBankNumber key={index} bank={bank}/>*/}
                            {/*     ))*/}
                                <SupportButton bankData={bankData} />

                        </div>

                        {/* Təşəkkür mesajı */}
                        <p className="text-gray-400 text-xs mt-4 italic">
                            Allah etdiyiniz ianələri qəbul etsin. Dəstəyiniz üçün minnətdarıq!
                        </p>
                    </div>
                    {/* === İanə Bölməsi Sonu === */}
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 py-6">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm text-center md:text-left">
                        © {currentYear} Əhli Sünnə Mədrəsəsi. Bütün hüquqlar qorunur.
                    </p>
                    {/*<div className="mt-4 md:mt-0">*/}
                    {/*    <ul className="flex space-x-4 text-sm text-gray-400">*/}
                    {/*        <li>*/}
                    {/*            <Link href="/privacy-policy"*/}
                    {/*                  className="hover:text-[#43b365]  transition-colors duration-200">*/}
                    {/*                Gizlilik Siyasəti*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*        <li>*/}
                    {/*            <Link href="/terms" className="hover:text-[#43b365] transition-colors duration-200">*/}
                    {/*                İstifadə Şərtləri*/}
                    {/*            </Link>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            </div>
        </footer>
    )
}

export default Footer

