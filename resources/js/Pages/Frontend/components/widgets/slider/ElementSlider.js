// import Swiper core and required modules
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {isEmpty, capitalize} from 'lodash';
import pluralize from 'pluralize'
import CategoryWidget from './../category/CategoryWidget';
import NormalProductWidget from './../product/NormalProductWidget';
import NormalUserWidget from '../user/NormalUserWidget';
import {useContext, useEffect} from "react";
import { AppContext } from './../../../../context/AppContext'
import NormalBookWidget from "../book/NormalBookWidget";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js'
import NormalCourseWidget from "../course/NormalCourseWidget";
import {useSelector} from "react-redux";
import { motion } from "framer-motion"
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function ElementSlider({
  elements,
  slidesPerView = 4,
  type = 'category',
  title = type,
    showNavigation = false,
    params = ''
}) {
  const { isRTL } = useSelector(state => state.locale)

  const handleComponent = (s) => {
    switch (type) {
      case 'category':
        return <CategoryWidget element={s} type={'book'} />;
      case 'product':
        return <NormalProductWidget element={s} />;
        case 'book':
            return <NormalBookWidget element={s} />;
        case 'course':
            return <NormalCourseWidget element={s} />;
      case 'user':
        return <NormalUserWidget element={s} />;
      default:
        return <CategoryWidget element={s} />;
    }
  };

  useEffect(() => {}, [slidesPerView])

  return (
    <div className="w-full">
      {!isEmpty(elements) && (
        <>
            <Link
                href={route(`frontend.${type}.index`, params  ? params : '')}
                className="w-full flex flex-1 h-auto mb-5 justify-between items-center capitalize rtl:text-right ltr:text-left text-xl "
            >
              <motion.div
                  initial={false}
                  whileHover={{ scale: 1.08 }}
              >
              <span>{pluralize(title)}</span>
              </motion.div>
              {
                isRTL ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            </Link>
          <Swiper
            navigation={showNavigation}
            pagination={showNavigation}
            cssMode={true}
            className="mySwiper"
            slidesPerGroup={slidesPerView}
            spaceBetween={20}
            slidesPerView={slidesPerView}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
          >
            {elements.map((s, i) => (
              <SwiperSlide key={i}>{handleComponent(s)}</SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
};

