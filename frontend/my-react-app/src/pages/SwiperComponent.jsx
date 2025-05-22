import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination]);

const SwiperComponent = ({ children }) => {
  return (
    <Swiper
      spaceBetween={160}
      slidesPerView={1}
      scrollbar={{ draggable: true }}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        768: {
          slidesPerView: 1,
        },
      }}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
