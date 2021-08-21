import FrontendContainer from "../components/FrontendContainer";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import EmbeddedHtml from "../../Backend/components/widgets/EmbeddedHtml";


export default function PolicesPage({ element }) {
    const { trans , getThumb , getLocalized } = useContext(AppContext)
    console.log('element', element);
    return (
        <FrontendContainer>
        <div className="bg-white relative overflow-hidden">
            {/* Decorative background image and gradient */}
            <div aria-hidden="true" className="absolute inset-0">
                <div className="absolute inset-0  overflow-hidden">
                    <img
                        src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                        alt=""
                        className="w-full h-full object-center object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-white bg-opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
            </div>

            {/* Callout */}
            <section
                aria-labelledby="sale-heading"
                className="relative  flex flex-col items-center text-center"
            >
                <div className="w-full">
                    <h2
                        id="sale-heading"
                        className="text-4xl mt-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                    >
                        {trans('polices')}
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-xl text-gray-600">
                        {element[getLocalized()]}
                    </p>
                    <div
                        className="mt-6 inline-block w-full bg-gray-400 border border-transparent rounded-sm py-3 px-8 font-medium text-white  sm:w-auto"
                    >
                        {element[getLocalized('caption')]}
                    </div>
                </div>
            </section>
            <section
                aria-labelledby="testimonial-heading"
                className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
            >
                <div className="max-w-2xl mx-auto lg:max-w-none">
                    <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 w-full font-bein font-extrabold">
                        <EmbeddedHtml html={element[getLocalized('policy')]} />
                    </div>
                </div>
            </section>
        </div>
        </FrontendContainer>
    )
}
