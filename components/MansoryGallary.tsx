import React from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import LazyLoad from "react-lazyload";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

const images = [
  { src: "/assets/images/ronaldo.png", alt: "Ronaldo" },
  { src: "/assets/images/ferrarii.png", alt: "Ferrari Image" },
  { src: "/assets/images/pov.png", alt: "Pov" },
  { src: "/assets/images/explorer.png", alt: "Explorer Image" },
  { src: "/assets/images/enjoy.png", alt: "Enjoy Image" },
  { src: "/assets/images/skullcandy.png", alt: "Skullcandy Image" },
  { src: "/assets/images/ride.avif", alt: "Ride Image" },
  { src: "/assets/images/dog.png", alt: "Dog" },
  { src: "/assets/images/cold.webp", alt: "Cold" },
];

const ImageGrid = () => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image, index) => (
        <LazyLoad
          key={index}
          offset={100}
          placeholder={
            <Skeleton
              width="100%"
              height="400px"
              baseColor="black"
              highlightColor="#090909"
            />
          }
          style={{ width: "100%", height: "auto", display: "block" }}
          className="mb-5 rounded-2xl overflow-hidden"
        >
          <motion.div
            whileInView={{ opacity: [0, 1], y: [50, 0] }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src={image.src}
              alt={image.alt}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </motion.div>
        </LazyLoad>
      ))}
    </Masonry>
  );
};

export default ImageGrid;
