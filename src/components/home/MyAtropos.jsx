import React, { useState } from 'react';
import Atropos from 'atropos/react';
import 'atropos/css'

const ImageHoverEffect = () => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const containerWidth = e.currentTarget.offsetWidth;
        const containerHeight = e.currentTarget.offsetHeight;
        const mouseX = e.nativeEvent.offsetX - containerWidth / 2;
        const mouseY = e.nativeEvent.offsetY - containerHeight / 2;
        const maxRotation = 20;
        console.log(mouseX, mouseY);
        const newRotateX = (mouseY / containerHeight) * maxRotation;
        const newRotateY = (mouseX / containerWidth) * maxRotation;

        setRotateX(newRotateX);
        setRotateY(newRotateY);
    };

    const resetRotation = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (<div
        className="image-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetRotation}
    >
        <img className="image-3d" src={"/assets/logoN.png"} alt="" />
    </div>

    );
};

export default ImageHoverEffect;
