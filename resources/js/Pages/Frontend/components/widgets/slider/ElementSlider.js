import {isEmpty, truncate} from 'lodash';
import pluralize from 'pluralize'
import {useContext, useEffect, useRef, useState} from "react";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js'
import {useSelector} from "react-redux";
import {motion} from "framer-motion"
import './slideStyles.css'
import {AppContext} from "../../../../context/AppContext";
import NormalCourseWidget from "../course/NormalCourseWidget";
import NormalBookWidget from "../book/NormalBookWidget";
import CategoryWidget from './../category/CategoryWidget';
import NormalProductWidget from './../product/NormalProductWidget';
import NormalUserWidget from '../user/NormalUserWidget';

// import Swiper core and required modules
import {Navigation, Pagination, Scrollbar, A11y} from 'swiper';
import {Swiper, SwiperSlide } from 'swiper/react';


function ElementSlider({
                           elements,
                           slidesPerView = 4,
                           type = 'category',
                           moduleType = '',
                           title = type,
                           description = '',
                           showNavigation = true,
                           showPagination = true,
                           params = ''
                       }) {
    const {isRTL} = useSelector(state => state.locale)
    const {mainColor, trans, classNames } = useContext(AppContext);
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)
    const [currentRefValue,setCurrentRevValue] = useState('prev')


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

    const handleNext = () => setCurrentRevValue('next')
    const handlePrev = () => setCurrentRevValue('prev')

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
                                            className={`break-normal text-xs text-ellipsis overflow-hidden capitalize text-${mainColor}-600 dark:text-${mainColor}-200`}>{truncate(description, {length: 80})}</p>
                                    </div> : null
                                }
                            </motion.div>
                        </div>
                        {
                            isRTL ? <div className={`flex flex-row items-center`}>
                                <span
                                    className={`text-${mainColor}-800 dark:text-${mainColor}-600 text-xs`}>{trans('show_all')}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6`} color={`${mainColor}`}
                                     fill={`none`}
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M15 19l-7-7 7-7"/>
                                </svg>
                            </div> : <div className={`flex flex-row items-center`}>
                                <span
                                    className={`text-${mainColor}-800 dark:text-${mainColor}-600 text-xs`}>{trans('show_all')}</span>
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
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        // navigation={{
                        //     el: paginationElement.current,
                        // }}
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
                    {
                        elements.length > 4 && <div className="flex grow items-center justify-center space-x-8  h-auto">
                            <button
                                onClick={handlePrev}
                                ref={navigationPrevRef}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className={classNames(currentRefValue === 'prev' ? `text-${mainColor}-800 dark:text-${mainColor}-100` : `text-${mainColor}-200 dark:text-${mainColor}-400`, `h-8 w-8`)}
                                     fill='none'
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                ref={navigationNextRef}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     className={classNames(currentRefValue === 'next' ? `text-${mainColor}-800 dark:text-${mainColor}-100` : `text-${mainColor}-200 dark:text-${mainColor}-400`, `h-8 w-8`)}
                                     fille='none'
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                                </svg>
                            </button>
                        </div>
                    }

                </>
            )}
        </div>
    );
};

export default ElementSlider;

