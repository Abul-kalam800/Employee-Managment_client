// src/components/Testimonial.jsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    role: 'HR Manager',
    image: 'https://i.pravatar.cc/150?img=32',
    comment:
      'This platform transformed the way we manage our team. Easy to use and very reliable!'
  },
  {
    id: 2,
    name: 'John Smith',
    role: 'Team Lead',
    image: 'https://i.pravatar.cc/150?img=12',
    comment:
      'I love how the employee tracking is so seamless. Highly recommended for modern businesses.'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Project Manager',
    image: 'https://i.pravatar.cc/150?img=48',
    comment:
      'Managing employee performance and feedback has never been easier. Great experience!'
  }
];

const Testimonial = () => {
  return (
    <section className="py-12 bg-gray-50 rounded-2xl">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">What Our <span className="text-[#6600CC]"> Users</span> Say</h2>
      <div className="max-w-4xl mx-auto px-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white p-6 rounded-2xl shadow-md text-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
                />
                <p className="text-gray-600 italic mb-4">"{item.comment}"</p>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-sm text-gray-500">{item.role}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
