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
    const {trans, getLocalized, classNames, contentBgColor, textColor, bgColor, mainBgColor} = useContext(AppContext)
    const {locale} = useSelector(state => state);

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
                                <div className="col-span-full">
                                    <h1 className={`text-center text-lg ${textColor}`}>
                                        {trans('categories_user')}
                                    </h1>
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

