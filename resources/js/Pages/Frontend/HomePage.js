/* This example requires Tailwind CSS v2.0+ */
import React, {Fragment, useContext, useEffect, useState} from 'react'
import {AppContext} from "../context/AppContext";
import MainSlider from "../Frontend/components/widgets/slider/MainSlider";
import FrontendContainer from "./components/FrontendContainer";
import Ziggy from 'ziggy-js';
import ElementSlider from "./components/widgets/slider/ElementSlider";
import {isMobile, isTablet, isDesktop} from 'react-device-detect';
import NewsLetter from "./partials/NewsLetter";

const navigation = [
    {name: 'Product', href: '#'},
    {name: 'Features', href: '#'},
    {name: 'Marketplace', href: '#'},
    {name: 'Company', href: '#'},
]

export default function HomePage({slides, homeBookCategories, newOnHomeBooks, newOnHomeCourses, onHomeParticipantAuthors }) {
    const {trans} = useContext(AppContext);
    const[slideNumber, setSlideNumber] = useState(6)

    useEffect(() => {
        function handleResize() {
            window.innerWidth < 1200 ? setSlideNumber(2) : setSlideNumber(5);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return (
        <FrontendContainer mainSlides={slides} showBreadCrumbs={false}>
            <div className="bg-white space-y-10 py-14 w-full px-4 sm:py-14 sm:px-6 lg:max-w-max lg:px-8">
                <ElementSlider
                    showNavigation={false}
                    elements={homeBookCategories}
                    slidesPerView={isTablet || isMobile ? 2 : slideNumber}
                    title={trans('home_featured_categories')}
                    type={'category'}
                />
                <ElementSlider
                    elements={newOnHomeBooks}
                    showNavigation={false}
                    slidesPerView={isTablet || isMobile ? 1 : slideNumber}
                    title={trans('new_chosen_books')}
                    type={'book'}
                />

                <ElementSlider
                    elements={onHomeParticipantAuthors}
                    showNavigation={false}
                    slidesPerView={isTablet || isMobile ? 2 : slideNumber}
                    title={trans('participant_authors')}
                    type={'user'}
                />

                <ElementSlider
                    elements={newOnHomeCourses}
                    showNavigation={false}
                    slidesPerView={isTablet || isMobile ? 1 : slideNumber}
                    title={trans('featured_courses')}
                    type={'course'}
                />
                <NewsLetter />
            </div>
        </FrontendContainer>
    )
}
