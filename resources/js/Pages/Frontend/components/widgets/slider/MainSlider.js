// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y , EffectFade} from 'swiper';
import { isEmpty, map  } from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {useContext} from "react";
import {AppContext} from "../../../../context/AppContext";
import GlobalContext from "../../../../context/GlobalContext";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const MainSlider = ({elements}) => {
    const { getLarge  } = useContext(AppContext)

  return (
    <div className="w-full">
      {!isEmpty(elements) && (
        <Swiper
            // navigation
            pagination
            // pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            cssMode={true}
          className="mySwiper"
          spaceBetween={0}
            slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {elements.map((s) => (
            <SwiperSlide key={s.id}>
              <img
                  style={{ maxHeight : 700, width : '100%'}}
                  // className="w-full h-auto object-contain"
                src={getLarge(s.image)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default MainSlider;
