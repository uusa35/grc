import FrontendContainer from "../components/FrontendContainer";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {Disclosure} from "@headlessui/react";
import {ChevronDownIcon} from "@heroicons/react/outline";
import GlobalContext from "../../context/GlobalContext";
import {map} from 'lodash';


export default function FaqsPage({elements}) {
    const {trans, getThumb, getLocalized, classNames} = useContext(AppContext)
    const {settings} = useContext(GlobalContext);

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
                    <div className="absolute inset-0 bg-white bg-opacity-75"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white"/>
                </div>

                {/* Callout */}
                <section
                    aria-labelledby="sale-heading"
                    className="relative  flex flex-col items-center text-center"
                >
                    <div className="w-full">
                        <h2
                            id="sale-heading"
                            className="text-4xl mt-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl capitalize"
                        >
                            {trans('faqs')}
                        </h2>
                        <p className="mt-4 max-w-xl mx-auto text-xl text-gray-600 capitalize">
                            {settings[getLocalized()]}
                        </p>
                        <div
                            className="mt-6 inline-block w-full bg-gray-400 border border-transparent rounded-sm py-3 px-8 font-medium text-white hover:bg-gray-800 sm:w-auto capitalize"
                        >
                            {settings[getLocalized('caption')]}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section
                    aria-labelledby="testimonial-heading"
                    className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
                >
                    <div className="max-w-2xl mx-auto lg:max-w-none">
                        <div
                            className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 w-full font-bein font-extrabold">
                            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
                                {map(elements, element => (
                                    <Disclosure as="div" key={element.id} className="pt-6">
                                        {({open}) => (
                                            <>
                                                <dt className="text-lg">
                                                    <Disclosure.Button
                                                        className="text-left w-full flex justify-between items-center text-gray-400">
                                                        <div className="flex flex-1 flex-col justify-start rtl:text-right ltr:text-left">
                                                            <span
                                                                className="font-extrabold text-gray-900 capitalize">{element[getLocalized()]}</span>
                                                            <span
                                                                className="font-medium text-sm text-gray-900 capitalize">{element[getLocalized('caption')]}</span>
                                                        </div>
                                                        <span className="ml-6 h-7 flex items-center">
                                                      <ChevronDownIcon
                                                          className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                                                          aria-hidden="true"
                                                      />
                                                    </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2">
                                                    <p className="text-base text-gray-500 mt-5 border-t border-gray-200 pt-10">{element[getLocalized('description')]}</p>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </dl>
                        </div>
                    </div>
                </section>
            </div>
        </FrontendContainer>
    )
}
