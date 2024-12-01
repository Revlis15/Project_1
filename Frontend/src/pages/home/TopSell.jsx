import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { BookCard } from '../books/BookCard';

const categories = [
  "Business", "Fiction", "Horror", "Romance", "Science Fiction",
  "Thriller", "Adventure", "Biography", "Children", "Comics",
  "Cooking", "History", "Mystery", "Poetry", "Religion",
  "Self-Help", "Travel"
];

const TopSell = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetch("books.json")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    setSearchTerm(''); // Reset search term when a category is selected
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter books based on selected category
  const filteredBooks = selectedCategory === "Choose a genre"
    ? books
    : books.filter(book => book.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className='py-16'>
      <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
      
      {/* Custom Dropdown */}
      <div className='mb-8 relative'>
        <button
          onClick={toggleDropdown}
          className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none w-64 text-left'
        >
          {selectedCategory}
        </button>
        
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className='absolute mt-1 w-64 border bg-white rounded-md shadow-lg max-h-40 overflow-y-auto z-10'
          >
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search genre"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='px-4 py-2 focus:outline-none w-full border-b'
            />
            
            {/* Category List */}
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                  className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                >
                  {category}
                </div>
              ))
            ) : (
              <div className='px-4 py-2 text-gray-500'>No categories found</div>
            )}
          </div>
        )}
      </div>

      {/* Swiper Component */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        navigation={true}
        modules={[Navigation, Pagination]}
        className='mySwiper'
      >
        {filteredBooks.length > 0 && filteredBooks.map((book, index) => (
          <SwiperSlide key={index}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopSell;