import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CategoriesPage = () => {
  const [categories] = useState([
    { id: 1, name: 'Fiction', count: 125, image: 'https://source.unsplash.com/random/400x300/?fiction,books' },
    { id: 2, name: 'Mystery', count: 89, image: 'https://source.unsplash.com/random/400x300/?mystery,books' },
    { id: 3, name: 'Science Fiction', count: 76, image: 'https://source.unsplash.com/random/400x300/?scifi,books' },
    { id: 4, name: 'Fantasy', count: 112, image: 'https://source.unsplash.com/random/400x300/?fantasy,books' },
    { id: 5, name: 'Romance', count: 143, image: 'https://source.unsplash.com/random/400x300/?romance,books' },
    { id: 6, name: 'Biography', count: 67, image: 'https://source.unsplash.com/random/400x300/?biography,books' },
    { id: 7, name: 'History', count: 54, image: 'https://source.unsplash.com/random/400x300/?history,books' },
    { id: 8, name: 'Self-Help', count: 98, image: 'https://source.unsplash.com/random/400x300/?selfhelp,books' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 mt-24">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Explore Our Categories
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Discover books from various genres and find your next favorite read.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              key={category.id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                <p className="text-indigo-200 text-sm">{category.count} books</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 backdrop-blur-sm transition-opacity duration-300">
                <span className="px-4 py-2 bg-white text-indigo-600 font-medium rounded-full shadow-lg">
                  View All
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
