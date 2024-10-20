import WhereWeAre from "./components/WhereWeAre";
import Articles from "./components/Articles";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Books from "./components/Books";
import Feedbacks from "./components/Feedbacks";
import VideoSlider from "./components/VideoSlider";



export default function Home() {
    return (
        <div>
            <Navbar/>
            <VideoSlider/>
            <WhereWeAre/>
            <Articles/>
            <Gallery />
            <Books/>
            <Feedbacks/>
        </div>
    );
}
