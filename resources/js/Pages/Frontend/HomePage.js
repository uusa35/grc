import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../context/AppContext";
import FrontendContainer from "./components/FrontendContainer";
import ElementSlider from "./components/widgets/slider/ElementSlider";
import {isMobile, isTablet} from 'react-device-detect';
import NewsLetter from "./partials/NewsLetter";
import MainGallery from "./components/widgets/slider/MainGallery";
import FrontendContentContainer from "./components/FrontendContentContainer";
import {filter} from 'lodash';
import JoinusPage from "./Pages/JoinusPage";
import JoinusHomeSection from "./partials/JoinusHomeSection";
import CategoriesGroup from "./components/widgets/category/CategoriesGroup";

export default function HomePage({
                                     slides,
                                     homeCategories,
                                     newOnHomeBooks,
                                     newOnHomeCourses,
                                     newOnHomeProducts,
                                     onHomeParticipantAuthors,
                                     mgt,
                                     clearCart = false,
                                     settings
                                 }) {
    const [slideNumber, setSlideNumber] = useState(5)
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
            <FrontendContentContainer showBreadCrumbs={false}>
                {slides && <MainGallery elements={slides}/>}
                <div className="bg-white space-y-10 py-14 w-full px-4 sm:py-14 sm:px-6 lg:px-8">

                    {
                        settings.enable_joinus ? <JoinusHomeSection/> : null
                    }
                    {
                        settings.enable_books && <>

                            {/*<CategoriesGroup*/}
                            {/*    params={{is_book: true}}*/}
                            {/*    type={'category'}*/}
                            {/*    title={trans('book_home_featured_categories')}*/}
                            {/*    categories={filter(homeCategories, c => c.is_book)}/>*/}
                            <ElementSlider
                                showNavigation={true}
                                elements={filter(homeCategories, c => c.is_book)}
                                slidesPerView={isTablet || isMobile ? 2 : slideNumber}
                                title={trans('book_home_featured_categories')}
                                type={'category'}
                                moduleType={'book'}
                                params={{is_book: true}}
                            />
                            <ElementSlider
                                elements={newOnHomeBooks}
                                showNavigation={true}
                                slidesPerView={isTablet || isMobile ? 1 : slideNumber}
                                title={trans('new_chosen_books')}
                                type={'book'}
                            />
                            <ElementSlider
                                elements={onHomeParticipantAuthors}
                                showNavigation={true}
                                slidesPerView={isTablet || isMobile ? 1 : 8}
                                title={trans('participant_authors')}
                                type={'user'}
                            />
                        </>
                    }
                    {
                        settings.enable_courses && <>
                            <ElementSlider
                                showNavigation={true}
                                elements={filter(homeCategories, c => c.is_course)}
                                slidesPerView={isTablet || isMobile ? 2 : slideNumber}
                                title={trans('course_home_featured_categories')}
                                type={'category'}
                                moduleType={'course'}
                                params={{is_course: true}}
                            />
                            <ElementSlider
                                elements={newOnHomeCourses}
                                showNavigation={true}
                                slidesPerView={isTablet || isMobile ? 1 : slideNumber}
                                title={trans('featured_courses')}
                                type={'course'}
                            />
                        </>
                    }
                    {
                        settings.enable_products && <>
                            <ElementSlider
                                showNavigation={true}
                                elements={filter(homeCategories, c => c.is_product)}
                                slidesPerView={isTablet || isMobile ? 2 : slideNumber}
                                title={trans('product_home_featured_categories')}
                                type={'category'}
                                moduleType={'product'}
                                params={{is_product: true}}
                            />
                            <ElementSlider
                                elements={newOnHomeProducts}
                                showNavigation={true}
                                slidesPerView={isTablet || isMobile ? 1 : slideNumber}
                                title={trans('featured_products')}
                                type={'product'}
                            />
                        </>
                    }

                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}

// {
//     settings.enable_newsletter && <NewsLetter/>
// }
