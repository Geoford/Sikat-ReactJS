import React, { useState, useEffect, useRef } from "react";
import sampleImage from "../../../assets/Background.jpg";
import Carousel from "react-bootstrap/Carousel";

const IndexCarousel = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <div className="position-relative">
          <div className="carouselBlackFade"></div>
          <img
            src={sampleImage}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <Carousel.Caption className="p-0 p-md-3">
          <h4 className="m-0">Sample Title</h4>
          <p className="m-0 d-none d-md-block">
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="position-relative">
          <div className="carouselBlackFade"></div>
          <img
            src={sampleImage}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <Carousel.Caption className="p-0 p-md-3">
          <h4 className="m-0">Sample Title</h4>
          <p className="m-0 d-none d-md-block">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="position-relative">
          <div className="carouselBlackFade"></div>
          <img
            src={sampleImage}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <Carousel.Caption className="p-0 p-md-3">
          <h4 className="m-0">Sample Title</h4>
          <p className="m-0 d-none d-md-block">
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default IndexCarousel;
