import React from 'react';

const services = [
  {
    id: 1,
    title: 'Web Development',
    img: 'https://i.postimg.cc/Wb2JFSpB/web.jpg',
    description: 'Build modern and responsive websites using the latest technologies.'
  },
  {
    id: 2,
    title: 'Mobile App Development',
    img: 'https://i.postimg.cc/vHm4hTRT/app.jpg',
    description: 'Develop user-friendly mobile apps for Android and iOS platforms.'
  },
  {
    id: 3,
    title: 'UI/UX Design',
    img: 'https://i.postimg.cc/J0FKngVW/ui.jpg',
    description: 'Design clean and user-focused interfaces and experiences.'
  },
  {
    id: 4,
    title: 'SEO Optimization',
    img: 'https://i.postimg.cc/JzxD5X0s/seo.jpg',
    description: 'Improve your website’s visibility on search engines.'
  },
  {
    id: 5,
    title: 'Cloud Services',
    img: 'https://i.postimg.cc/3wh7Lfy1/cloud.jpg',
    description: 'Deploy and manage scalable applications in the cloud.'
  },
  {
    id: 6,
    title: 'Digital Marketing',
    img: 'https://i.postimg.cc/BvzrrhbR/digital.jpg',
    description: 'Promote your business effectively through digital platforms.'
  }
];

const Services = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-10">Our <span className='text-[#6600CC]'>Services</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <img src={service.img} alt={service.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
