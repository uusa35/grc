import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../context/AppContext";
import FrontendContainer from "./components/FrontendContainer";
import ElementSlider from "./components/widgets/slider/ElementSlider";
import {isMobile, isTablet} from 'react-device-detect';
import NewsLetter from "./partials/NewsLetter";
import MainGallery from "./components/widgets/slider/MainGallery";
import FrontendContentContainer from "./components/FrontendContentContainer";
import { filter } from 'lodash';

export default function HomePage({
                                     slides,
                                     homeCategories,
                                     newOnHomeBooks,
                                     newOnHomeCourses,
                                     onHomeParticipantAuthors,
                                     settings
                                 }) {
    const [slideNumber, setSlideNumber] = useState(6)
    const {trans} = useContext(AppContext)

    useEffect(() => {
        function handleResize() {
            window.innerWidth < 1200 ? setSlideNumber(2) : setSlideNumber(5);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return (
        <FrontendContainer showBreadCrumbs={false}>
            {/*{mainSlides && <MainSwiper elements={mainSlides}/>}*/}
            {slides && <MainGallery elements={slides}/>}
            <FrontendContentContainer showBreadCrumbs={false}>
                <div className="bg-white space-y-10 py-14 w-full px-4 sm:py-14 sm:px-6 lg:px-8">
                    {
                        settings.enable_books && <>
                            <ElementSlider
                                showNavigation={false}
                                elements={filter(homeCategories, c => c.is_book)}
                                slidesPerView={isTablet || isMobile ? 2 : slideNumber}
                                title={trans('book_home_featured_categories')}
                                type={'category'}
                                moduleType={'book'}
                                params={{ is_book : true}}
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
                        </>
                    }

                    {
                        settings.enable_courses && <>
                            <ElementSlider
                                showNavigation={false}
                                elements={filter(homeCategories, c => c.is_course)}
                                slidesPerView={isTablet || isMobile ? 2 : slideNumber}
                                title={trans('course_home_featured_categories')}
                                type={'category'}
                                moduleType={'course'}
                                params={{ is_course : true}}
                            />
                        <ElementSlider
                            elements={newOnHomeCourses}
                            showNavigation={false}
                            slidesPerView={isTablet || isMobile ? 1 : slideNumber}
                            title={trans('featured_courses')}
                            type={'course'}
                        />
                        </>
                    }
                    {
                        settings.enable_newsletter && <NewsLetter/>
                    }
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
