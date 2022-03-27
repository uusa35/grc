import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "./../components/FrontendContainer";
import ElementSlider from "./../components/widgets/slider/ElementSlider";
import {isMobile, isTablet} from 'react-device-detect';
import MainGallery from "./../components/widgets/slider/MainGallery";
import FrontendContentContainer from "./../components/FrontendContentContainer";
import {filter, first, isEmpty, map, shuffle} from 'lodash';
import HomeMainCategory from "./HomeMainCategory";
import GlobalContext from "../../context/GlobalContext";
import CategoryWidget from "../components/widgets/category/CategoryWidget";
import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {useSelector} from "react-redux";


export default React.memo(function({
                                       slides,
                                       homeCategories,
                                       newOnHomeBooks,
                                       newOnHomeCourses,
                                       newOnHomeProducts,
                                       settings,
                                       onHomeParticipantAuthors,
                                       categoriesWithProducts
                                   }) {
    const [slideNumber, setSlideNumber] = useState(isMobile ? 1 : (isTablet ? 2 : 4))
    const {categories} = useContext(GlobalContext);
    const {trans, getLocalized, classNames, contentBgColor, textColor, bgColor , mainBgColor } = useContext(AppContext)
    const { locale } = useSelector(state => state);

    useEffect(() => {
        function handleResize() {
            window.innerWidth < 1200 ? setSlideNumber(2) : setSlideNumber(4);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return (
        <FrontendContainer showBreadCrumbs={false}>
            {/*{mainSlides && <MainSwiper elements={mainSlides}/>}*/}
            {slides && settings.wide_screen ? <MainGallery elements={slides}/> : null}
            <FrontendContentContainer showBreadCrumbs={false}>
                {slides && !settings.wide_screen ? <MainGallery elements={slides}/> : null}
                <div
                    className={classNames(settings.wide_screen ? `xl:w-5/5 2xl:w-5/5` : `w-full`, `${contentBgColor} min-h-screen space-y-10 py-14 m-auto px-4 sm:py-14 sm:px-6 lg:px-8`)}>
                    {
                        settings.enable_products && <>
                            <div
                                className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 gap-x-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-3">
                                <div className="col-span-full flex flex-row items-center justify-between ">
                                    <h1 className={`text-center text-lg ${textColor}`}>
                                        <Link href={route('frontend.category.index', { is_parent : true , is_user : true })}>
                                        {trans('categories_user')}
                                        </Link>
                                    </h1>
                                    {
                                        locale.isRTL ? <Link className={`hidden lg:flex flex-row items-center`} href={route('frontend.category.alpha', { is_user : true })}>
                                <span
                                    className={`${textColor} text-xs`}>{trans('show_all')}</span>
                                            <div
                                                className={`p-1 rtl:mr-2 ltr:ml-2 ${bgColor} rounded-md dark:border dark:border-${mainBgColor}-400`}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className={`h-6 w-6 ${textColor}`}
                                                     fill={`none`}
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M15 19l-7-7 7-7"/>
                                                </svg>
                                            </div>
                                        </Link> : <Link className={`hidden lg:flex flex-row items-center`} href={route('frontend.category.alpha', { is_user : true })}>
                                <span
                                    className={`${textColor} text-xs`}>{trans('show_all')}</span>
                                            <div
                                                className={`p-1 rtl:mr-2 ltr:ml-2 ${bgColor} rounded-md dark:border dark:border-${mainBgColor}-400`}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className={`h-6 w-6 ${textColor}`}
                                                     fill={`none`}
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M9 5l7 7-7 7"/>
                                                </svg>
                                            </div>
                                        </Link>
                                    }

                                </div>
                                {map(filter(categories, c => c.is_user && c.on_home), (element) => (
                                    <CategoryWidget element={element} type={'user'} key={element.id}/>
                                ))}
                            </div>
                        </>
                    }
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
})

