import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "./../components/FrontendContainer";
import ElementSlider from "./../components/widgets/slider/ElementSlider";
import {isMobile, isTablet} from 'react-device-detect';
import MainGallery from "./../components/widgets/slider/MainGallery";
import FrontendContentContainer from "./../components/FrontendContentContainer";
import {filter, first, isEmpty, map, shuffle} from 'lodash';
import JoinusHomeSection from "./../partials/JoinusHomeSection";
import HomeMainCategory from "./HomeMainCategory";
import GlobalContext from "../../context/GlobalContext";


export default React.memo(function ({
                                     slides,
                                     homeCategories,
                                     settings
                                 }) {
    const [slideNumber, setSlideNumber] = useState(isMobile ? 1 : (isTablet ? 2 : 4))
    const {categories} = useContext(GlobalContext);
    const {trans, getLocalized} = useContext(AppContext)

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
            <FrontendContentContainer showBreadCrumbs={false}>
                {slides && <MainGallery elements={slides}/>}
                <div className={`bg-transparent space-y-10 py-14 w-full px-4 sm:py-14 sm:px-6 lg:px-8`}>
                    {
                        settings.enable_joinus ? <JoinusHomeSection/> : null
                    }

                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
})

