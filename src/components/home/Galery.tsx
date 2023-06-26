import React from 'react'

const Galery = () => {
    return (
        <div className=" px-10 py-6 bg-tr dark:bg-gray-700">
            <h3 className="text-4xl text-center mb-6 font-bold">GALERİ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  ">
                {new Array(4).fill(0).map((_, i) => (
                    images.map((item, index) => (
                        <div className="flex justify-center text-6xl    home_image_box rounded-xl    ">
                            <img className='rounded-xl ' src={item} alt="" />
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}

export default Galery

const images = [
    "/assets/qardaslar_1.jfif",
    "/assets/qardaslar_2.jfif",
]