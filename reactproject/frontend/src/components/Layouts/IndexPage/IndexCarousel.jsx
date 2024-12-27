import React, { useState, useEffect, useRef } from "react";
import sampleImage from "../../../assets/Background.jpg";
import Carousel from "react-bootstrap/Carousel";

const IndexCarousel = ({ images }) => {
  const [index, setIndex] = useState(0); // Track the active index

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {images.map((image) => (
        <Carousel.Item key={image.id}>
          <div className="position-relative">
            <div className="carouselBlackFade"></div>
            <img
              src={
                image && image.image_path
                  ? `http://localhost:8081${image.image_path}`
                  : sampleImage
              }
              alt={image.title}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <Carousel.Caption>
            <h3>{image.title}</h3>
            <p>{image.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default IndexCarousel;
