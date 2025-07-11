import React from 'react';

const blogPosts = [
  {
    id: 1,
    title: 'How to Improve Employee Productivity',
    image: 'https://i.postimg.cc/9fHDDWQ1/time-minute-alarm-duration-hour-schedule-concept.jpg',
    description:
      'Discover proven strategies to boost employee productivity in your organization and maintain engagement.',
  },
  {
    id: 2,
    title: 'Top 5 Features of a Great HR System',
    image: 'https://i.postimg.cc/Kc030S0v/human-resource-hiring-recruiter-select-career-concept.jpg',
    description:
      'A comprehensive HR management system can save time and improve efficiency. Here are the top features to look for.',
  },
  {
    id: 3,
    title: 'Why Employee Feedback Matters',
    image: 'https://i.postimg.cc/5t8FgXRZ/review-increase-rating-ranking-evaluation-classification-concept-businessman-draw-five-yellow-star-i.jpg',
    description:
      'Explore the importance of employee feedback and how it leads to better team performance and satisfaction.',
  },
];

const Blog = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-16">Latest Blog Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg  duration-300 hover:-translate-y-3 transition-transform"
          >
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <button className="text-indigo-600 hover:underline font-medium cursor-pointer">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;