// import Swiper core and required modules
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y, EffectFade} from 'swiper';
import {isEmpty, map} from 'lodash';
import {Swiper, SwiperSlide} from 'swiper/react';
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
    const {getLarge, getLocalized, trans} = useContext(AppContext)

    return (
        <>
            {!isEmpty(elements) && (
                <Swiper
                    navigation
                    // pagination
                    pagination={{ clickable: true }}
                    // scrollbar={{draggable: true}}
                    // cssMode={true}
                    className="mySwiper sm:aspect-w-1 sm:aspect-h-1"
                    style={{ maxHeight : 700 }}
                    spaceBetween={0}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {elements.map((element) => (
                        <SwiperSlide key={element.id} className="relative">
                            {(element.name_ar || element.name_en) &&
                            <div
                                className="absolute bottom-20 flex flex-col w-1/2 mx-10 p-8 shadow-lg rounded-lg bg-gray-200 opacity-80 gap-y-4 flex-1  justify-center items-start">
                                <div className="text-lg text-gray-800">
                                    {element[getLocalized()]}
                                </div>
                                <div className="text-sm text-gray-800 truncate">
                                    {element[getLocalized('caption')]}
                                </div>
                                <div className="text-sm text-gray-800 truncate">
                                    {element[getLocalized('description')]}
                                </div>
                                <div className="flex flex-1 w-full justify-end">
                                    {element.url && <a className="p-2 px-6 rounded-lg shadow-md bg-gray-600 text-white"
                                                       href={element.url}>
                                        {element[getLocalized()]}
                                    </a>}
                                </div>
                            </div>
                            }

                                <img
                                    style={{maxHeight: 700, width: '100%'}}
                                    // className="w-full h-auto object-contain "
                                    src={getLarge(element.image)}
                                />

                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </>
    );
};

export default MainSlider;
