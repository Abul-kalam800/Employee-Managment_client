import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const brandLogos = [
  { id: 1, img: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { id: 2, img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { id: 3, img: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { id: 4, img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { id: 5, img: 'https://i.postimg.cc/rF4VLVZy/Meta-Platforms-Inc-logo-svg.png' },
  { id: 6, img: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
];

const Brand = () => {
  return (
    <section className="py-20 bg-white">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Our Trusted <span className="text-[#6600CC]"> Patners</span></h2>
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          speed={1000}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
        >
          {brandLogos.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="flex justify-center items-center h-20">
                <img
                  src={brand.img}
                  alt="brand logo"
                  className="h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Brand;