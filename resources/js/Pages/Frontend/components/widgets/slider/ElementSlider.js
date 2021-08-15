// import Swiper core and required modules
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {isEmpty} from 'lodash';
import CategoryWidget from './../category/CategoryWidget';
import NormalProductWidget from './../product/NormalProductWidget';
import NormalUserWidget from '../user/NormalUserWidget';
import {useContext} from "react";
import { AppContext } from './../../../../context/AppContext'
import NormalBookWidget from "../book/NormalBookWidget";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function ElementSlider({
  elements,
  slidesPerView = 4,
  type = 'category',
  title = type,
    showNavigation = false,
}) {
  const { trans} = useContext(AppContext)

  const handleComponent = (s) => {
    switch (type) {
      case 'category':
        return <CategoryWidget element={s} type={'product'} />;
      case 'product':
        return <NormalProductWidget element={s} />;
        case 'book':
            return <NormalBookWidget element={s} />;
      case 'user':
        return <NormalUserWidget element={s} />;
      default:
        return <CategoryWidget element={s} />;
    }
  };

  return (
    <div className={'w-full h-auto'}>
      {!isEmpty(elements) && (
        <>
          <div
            className={
              'capitalize rtl:text-right ltr:text-left pb-6 text-xl'
            }>
            {title}
          </div>
          <Swiper
            navigation={showNavigation}
            pagination={showNavigation}
            cssMode={true}
            className="mySwiper"
            slidesPerGroup={slidesPerView}
            spaceBetween={5}
            slidesPerView={slidesPerView}
            // onSlideChange={() => console.log('slide change')}x
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

