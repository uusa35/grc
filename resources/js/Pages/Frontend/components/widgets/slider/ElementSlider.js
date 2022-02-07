// import Swiper core and required modules
import SwiperCore, {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {isEmpty, truncate} from 'lodash';
import pluralize from 'pluralize'
import CategoryWidget from './../category/CategoryWidget';
import NormalProductWidget from './../product/NormalProductWidget';
import NormalUserWidget from '../user/NormalUserWidget';
import {useContext, useEffect} from "react";
import NormalBookWidget from "../book/NormalBookWidget";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js'
import NormalCourseWidget from "../course/NormalCourseWidget";
import {useSelector} from "react-redux";
import {motion} from "framer-motion"
import './slideStyles.css'
import {AppContext} from "../../../../context/AppContext";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function ElementSlider({
                           elements,
                           slidesPerView = 4,
                           type = 'category',
                           moduleType = '',
                           title = type,
                           description = '',
                           showNavigation = false,
                           showPagination = false,
                           params = ''
                       }) {
    const {isRTL} = useSelector(state => state.locale)
    const {mainColor, trans} = useContext(AppContext);

    const handleComponent = (s) => {
        switch (type) {
            case 'category':
                return <CategoryWidget element={s} type={moduleType}/>;
            case 'product':
                return <NormalProductWidget element={s}/>;
            case 'book':
                return <NormalBookWidget element={s}/>;
            case 'course':
                return <NormalCourseWidget element={s}/>;
            case 'user':
                return <NormalUserWidget element={s}/>;
            default:
                return <CategoryWidget element={s}/>;
        }
    };

    useEffect(() => {
    }, [slidesPerView])

    console.log('description', description)

    return (
        <div className="w-full p-2">
            {!isEmpty(elements) && route().has(`frontend.${type}.index`) && (
                <>
                    <Link
                        href={route(`frontend.${type}.index`, params ? params : '')}
                        className="w-full flex flex-grow h-auto mb-5 justify-between items-center capitalize rtl:text-right ltr:text-left text-xl "
                    >
                        <div className="flex flex-grow flex-col items-center justify-center rtl:pr-10 ltr:pl-10">
                            <motion.div
                                initial={false}
                                whileHover={{scale: 1.08}}
                            >
                                <div className="flex items-center justify-center">
                                    <span
                                        className={`text-${mainColor}-800 dark:text-${mainColor}-50`}>{pluralize(title)}</span>
                                </div>
                                {
                                    description ? <div className="flex items-center justify-center my-4">
                                        <p
                                            className={`break-normal text-xs text-ellipsis overflow-hidden capitalize text-${mainColor}-600 dark:text-${mainColor}-300`}>{truncate(description, { length : 80})}</p>
                                    </div> : null
                                }
                            </motion.div>
                        </div>
                        {
                            isRTL ? <div className={`flex flex-row items-center`}>
                                <span
                                    className={`text-${mainColor}-800 dark:text-${mainColor}-200 text-xs`}>{trans('show_all')}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} color={`${mainColor}`}
                                     fill={`none`}
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M15 19l-7-7 7-7"/>
                                </svg>
                            </div> : <div className={`flex flex-row items-center`}>
                                <span
                                    className={`text-${mainColor}-800 dark:text-${mainColor}-300 text-xs`}>{trans('show_all')}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} color={`${mainColor}`}
                                     fill={`none`}
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9 5l7 7-7 7"/>
                                </svg>
                            </div>
                        }

                    </Link>
                    <Swiper
                        navigation={showNavigation}
                        pagination={showPagination}
                        lazy={true}
                        mousewheel={true}
                        keyboard={true}
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

export default ElementSlider;

