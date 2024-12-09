import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { BookCard } from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/book/booksApi';

const Recommended = () => {
  const {data: books = []} = useFetchAllBooksQuery();

  return (
    <div className='py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>

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
        {books.length > 0 && books.slice(8, 18).map((book, index) => (
          <SwiperSlide key={book._id || index}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Recommended;