import React from 'react';


const VideoPlayer = () => {

    const videos =[
        {
            img:"https://i.ytimg.com/vi/EMSap0XfWmQ/mqdefault.jpg",
            title:"        Hz. Muhammed'in (asm) Hayatı - Miraç - Bölüm 17 @Mehmedyildiz"
        },
        {
            img:"https://i.ytimg.com/vi/UQvZdS5ThWk/mqdefault.jpg",
            title:"        Hz. Muhammed'in (asm) Hayatı - Miraç - Bölüm 17 @Mehmedyildiz"
        },
        {
            img:"https://i.ytimg.com/vi/UQvZdS5ThWk/mqdefault.jpg",
            title:"        Hz. Muhammed'in (asm) Hayatı - Miraç - Bölüm 17 @Mehmedyildiz"
        },
        {
            img:"https://i.ytimg.com/vi/UQvZdS5ThWk/mqdefault.jpg",
            title:"        Hz. Muhammed'in (asm) Hayatı - Miraç - Bölüm 17 @Mehmedyildiz"
        },
        {
            img:"https://i.ytimg.com/vi/UQvZdS5ThWk/mqdefault.jpg",
            title:"        Hz. Muhammed'in (asm) Hayatı - Miraç - Bölüm 17 @Mehmedyildiz"
        },
        {
            img:"https://i.ytimg.com/vi/UQvZdS5ThWk/mqdefault.jpg",
            title:"        Hz. Muhammed'in (asm) Hayatı - Miraç - Bölüm 17 @Mehmedyildiz"
        },
        {
            img:"https://i.ytimg.com/vi/UQvZdS5ThWk/mqdefault.jpg",
            title:"        Hz. Muhammed'in (asm) Hayatı - Miraç - Bölüm 17 @Mehmedyildiz"
        },
        {
            img:"https://i.ytimg.com/vi/UQvZdS5ThWk/mqdefault.jpg",
            title:"        Hz. Muhammed'in (asm) Hayatı - Miraç - Bölüm 17 @Mehmedyildiz"
        },
        {
            img:"https://i.ytimg.com/vi/UQvZdS5ThWk/mqdefault.jpg",
            title:"        Hz. Muhammed'in (asm) Hayatı - Miraç - Bölüm 17 @Mehmedyildiz"
        },
    ]

    return (
        <div className="">
            <div style={{
                backgroundColor: "#1d1f2a"
            }} className="w-full py-6  max-h-[600] px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Video Player Section */}

                    <div className="lg:col-span-2">
                        <div style={{height: "500px"}} className="aspect-w-16  aspect-h-9 mb-4">
                            <iframe
                                className="w-full h-full rounded-lg"
                                src="https://www.youtube.com/embed/DcrrhvlwJIY"
                                title="Hz. Muhammed'in (asm) Hayatı"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <h2 className="text-white text-2xl font-semibold mb-2">
                            Hz. Muhammed'in (asm) Hayatı - Neden Siyer Öğrenmeliyiz? - Bölüm 1 @Mehmedyildiz
                        </h2>
                        <p className="text-gray-400">
                            Hz. Muhammed'in (asm) Hayatı - Neden Siyer Öğrenmeliyiz? - Bölüm 1 @Mehmedyildiz
                        </p>
                    </div>

                    {/* Related Videos Section */}
                    <div  className={"border border-gray-600 max-h-[540] rounded-lg overflow-hidden"}>
                        <h3 className="text-white text-xl bg-gray-600 p-4 font-semibold mb-4">Hz. Muhammed'in (sav)
                            Hayatı</h3>
                        <div  className="space-y-4 max-h-full overflow-scroll px-3">

                            {
                                videos.map((video,id) => (
                                    <div key={id} className="flex   videosItem items-center space-x-4">
                                        <img
                                            src={video.img}
                                            alt="Video Thumbnail"
                                            className="w-28 h-20  object-cover"
                                        />
                                        <div>
                                            <h4 className="text-white text-md font-medium">
                                                {video.title}
                                            </h4>
                                        </div>
                                    </div>
                                ))
                            }
                            {/* Related Video Card */}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;