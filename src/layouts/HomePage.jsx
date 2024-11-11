import React from 'react';
import VideoSlider from "@/components/home/VideoSlider";
import WhereWeAre from "@/components/home/WhereWeAre";
import Gallery from "@/components/home/Gallery";
import Books from "@/components/home/Books";
import Feedbacks from "@/components/home/Feedbacks";
import SocialMediaStats from "@/components/home/SocialMediaStats";

const HomePage = async () => {
    const Articles = (await import("@/components/home/Articles")).default;

    return (
        <div>
            <VideoSlider/>
            <WhereWeAre/>
            <Articles/>
            <Gallery />
            <SocialMediaStats/>
            <Books/>
            <Feedbacks/>
        </div>
    );
};

export default HomePage;