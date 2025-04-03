import VideoSlider from "@/components/home/VideoSlider";
import Articles from "@/components/home/Articles";
import Books from "@/components/home/Books";
import SocialMediaStats from "@/components/home/SocialMediaStats";
import Feedbacks from "@/components/home/Feedbacks";
// Import other sections if needed, e.g., WhereWeAre, Gallery

// Note: This page component remains a Server Component unless
// specific client-side interactions are needed directly within it.
// The child components appropriately use "use client".
const HomePage = () => {
    return (
        <main>
            {/* Section 1: Hero Video Slider */}
            <section id="hero">
                <VideoSlider />
            </section>

            {/* Section 2: Articles / Recent Posts */}
            {/* Added standard padding and a container */}
            <section id="articles" className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                        Son Məqalələr
                    </h2>
                    <div className="mt-2 mx-auto h-1 w-20 bg-[#43b365] mb-12" />
                    <Articles />
                </div>
            </section>

            {/* Section 3: Books */}
            {/* Added standard padding */}
            <section id="books" className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    {/* Title moved inside the section for better structure */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                        Kitablarımız
                    </h2>
                    <div className="mt-2 mx-auto h-1 w-20 bg-[#43b365] mb-12" />
                    <Books />
                </div>
            </section>

            {/* Section 4: Social Media Stats */}
            {/* Kept the original background color via inline style as requested, but Tailwind bg-* is preferred */}
            <section id="social-stats" style={{ backgroundColor: "#373D45" }} className="py-16 md:py-20">
                <div className="container mx-auto px-4 ">
                    <SocialMediaStats />
                </div>
            </section>

            {/* Section 5: Feedbacks/Testimonials */}
            {/* Background image applied directly for simplicity */}
            <section
                id="feedbacks"
                style={{
                    backgroundImage: "url(/feedbackbg.webp)",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                }}
                className="py-16 md:py-24"
            >
                <div className="container mx-auto px-4 bg-black  backdrop-blur-sm rounded-3xl bg-opacity-5 py-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                        Tələbələrimizin Rəyləri
                    </h2>
                    <div className="mt-2 mx-auto h-1 w-20 bg-[#43b365] mb-12" />
                    <Feedbacks />
                </div>
            </section>

            {/* Add other sections like WhereWeAre, Gallery similarly */}
            {/* <section id="where-we-are" className="py-16 md:py-24 bg-gray-100">...</section> */}
            {/* <section id="gallery" className="py-16 md:py-24">...</section> */}

        </main>
    );
};

export default HomePage;
