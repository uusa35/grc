import React, {Fragment, useContext, useEffect, useState} from 'react'
import {AppContext} from "../context/AppContext";
import MainSlider from "../Frontend/components/widgets/slider/MainSlider";
import FrontendContainer from "./components/FrontendContainer";
import Ziggy from 'ziggy-js';
import ElementSlider from "./components/widgets/slider/ElementSlider";
import {isMobile, isTablet, isDesktop} from 'react-device-detect';
import NewsLetter from "./partials/NewsLetter";
import { useSelector, useDispatch } from 'react-redux'
import { addToCart , removeFromCart } from "../redux/actions";

export default function HomePage({slides, homeBookCategories, newOnHomeBooks, newOnHomeCourses, onHomeParticipantAuthors }) {
    const { cart } = useSelector(state => state);
    const { trans } = useContext(AppContext)
    const dispatch = useDispatch();
    console.log('the cart', cart);
    console.log('the items', cart.items);
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
                <button
                    className="w-60 h-60 border-red-900"
                    onClick={() => dispatch(addToCart({  cart_id : 1 , name : 'Element 1', price : 10}))}
                >
                    add to cart 1
                </button>

                <button
                    className="w-60 h-60 border-red-900"
                    onClick={() => dispatch(addToCart({  cart_id : 2 , name : 'Element 2', price : 20 }))}
                >
                    add to cart 2
                </button>

                <button
                    className="w-60 h-60 border-red-900"
                    onClick={() => dispatch(removeFromCart(2))}
                >
                    remove
                </button>
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
