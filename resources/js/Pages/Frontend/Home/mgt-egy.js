import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "./../components/FrontendContainer";
import {isMobile, isTablet} from 'react-device-detect';
import MainGallery from "./../components/widgets/slider/MainGallery";
import FrontendContentContainer from "./../components/FrontendContentContainer";
import {map, range} from 'lodash';
import JoinusHomeSection from "./../partials/JoinusHomeSection";
import GlobalContext from "../../context/GlobalContext";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js'
import {useAnimation, motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {getWhatsappLink} from "../../helpers";
import {FaPhone, FaWhatsapp} from "react-icons/fa";


const currentVariants = {
    visible: {opacity: 1, scale: 1, transition: {duration: 1}},
    hidden: {opacity: 0.4, scale: 0.9}
};

export default function({
                            slides,
                            newOnHomeProducts
                        }) {
    const [slideNumber, setSlideNumber] = useState(isMobile ? 1 : (isTablet ? 2 : 4))
    const {categories, settings} = useContext(GlobalContext);
    const {trans, getLocalized, getLarge} = useContext(AppContext)
    const controls = useAnimation();
    const [elementOne, elementOneInView] = useInView();
    const [elementTwo, elementTwoInView] = useInView();

    const clients = [
        {
            name: trans('wasata_we_daman'),
            href: 'http://mgt-sa.com',
            date: 'Mar 16, 2020',
            datetime: '2020-03-16',
            imageUrl:
                'https://mgt-egy.com/storage/uploads/images/thumbnail/LmMKskn833iOTzW5rxOj4x804TJqX6ikm54TqoCH.jpg',
            preview: trans('client_one'),
        }
    ]


    const products = [
        {
            id: 1,
            name: 'المنتجات الورقية الملونة',
            href: '#',
            price: '',
            description: '',
            imageUrl: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/260406114_132949502434250_208895838802599038_n.jpeg',
            imageAlt: '',
        },
        {
            id: 5,
            name: 'جميع الأحجام والمقاسات المختلفة',
            href: '#',
            price: '',
            description: '',
            imageUrl: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvsSXEXoAYXT4g.jpeg',
            imageAlt: '',
        },
        {
            id: 7,
            name: 'منتجات صديقة البيئة',
            href: '#',
            price: '',
            description: '',
            imageUrl:
                'https://wp.mgt-sa.com/wp-content/uploads/2022/03/273568089_148496084212925_8466813059061908296_n.jpeg',
            imageAlt:
                'تعرّف على منتجات شركة وساطة وضمان صديقة البيئة، المصنوعة من أجود خامات قصب السُكر القابلة للتحلل، حل بيئي واقتصادي جديد لمنتجات التعبئة والتغليف الغذائية غير ضار تمامًا بالبيئة وصحّة الانسان'
        }
    ];

    const ourServices = [
        {
            id: 1,
            name: 'المنتجات الورقية الملونة',
            href: '#',
            price: '',
            description: '',
            imageUrl: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/260406114_132949502434250_208895838802599038_n.jpeg',
            imageAlt: '',
        }
    ]

    useEffect(() => {
        if (elementOneInView) {
            controls.start("visible");
        }
    }, [controls, elementOneInView]);

    useEffect(() => {
        if (elementTwoInView) {
            controls.start("visible");
        }
    }, [controls, elementTwoInView]);

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
            {slides && <MainGallery elements={slides}/>}
            <FrontendContentContainer showBreadCrumbs={false}>
                {/*why wasta and daman */}
                <motion.div
                    ref={elementOne}
                    variants={currentVariants}
                    animate={controls}
                    initial="hidden"
                    className="relative py-32 px-6 sm:py-40 sm:px-12 lg:px-16 rounded-lg mt-6"
                >
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <img
                            src="http://wp.mgt-sa.com/wp-content/uploads/2022/07/loading-cargo-container-flag-egypt-egyptian-import-export-related-conceptual-d-rendering-loading-cargo-container-128740979.jpeg"
                            alt=""
                            className="w-full h-full object-center object-cover rounded-lg opacity-50"
                        />
                    </div>
                    <div
                        id={`why_us`}
                        aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg"/>
                    <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            {trans('why_wasata_we_daman_title')}
                        </h2>
                        <p className="mt-3 text-xl text-white leading-loose">
                            {trans('why_wasata_we_daman_content')}
                        </p>
                        <Link
                            href={route('frontend.aboutus')}
                            className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                        >
                            {trans('more')}
                        </Link>
                    </div>
                </motion.div>


                <div
                    className={`w-full m-auto space-y-20 mt-10 rounded-lg mb-5`}>

                    {/* our_vision */}
                    <div
                        id={`our_vision`}
                        className="pb-16 bg-gradient-to-r from-gray-100 to-gray-300 lg:pb-0 lg:z-10 lg:relative anchorBehave">
                        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
                            <div className="relative lg:-my-8">
                                <div aria-hidden="true"
                                     className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden"/>
                                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                                    <div
                                        className="aspect-w-14 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                                        <img
                                            className="object-cover lg:h-full lg:w-full"
                                            src="http://wp.mgt-sa.com/wp-content/uploads/2022/07/vision.jpeg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
                                <div
                                    className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
                                    <blockquote>
                                        <div>
                                            <svg
                                                className="h-12 w-12 text-white opacity-25"
                                                fill="currentColor"
                                                viewBox="0 0 32 32"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                                            </svg>
                                            <h1 className={`text-center text-xl text-gray-900`}>{trans('our_vision')}</h1>
                                            <p className="mt-6 text-lg font-medium text-gray-600">
                                                {trans('our_vision_message_egy')}
                                            </p>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* our_goals */}
                    <div
                        id={`our_goals`}
                        className="pb-16 bg-gradient-to-r from-gray-100 to-gray-300 lg:pb-0 lg:z-10 lg:relative anchorBehave">
                        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
                            <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
                                <div
                                    className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
                                    <blockquote>
                                        <div>
                                            <svg
                                                className="h-12 w-12 text-white opacity-25"
                                                fill="currentColor"
                                                viewBox="0 0 32 32"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                                            </svg>
                                            <h1 className={`text-center text-xl text-gray-900`}>{trans('our_goals')}</h1>
                                            <p className="mt-6 text-lg font-medium text-gray-600">
                                                {trans('our_goals_message_egy')}
                                            </p>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                            <div className="relative lg:-my-8">
                                <div aria-hidden="true"
                                     className="absolute inset-y-0 right-0 bottom-0  h-1/2 bg-white lg:hidden"/>
                                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                                    <div
                                        className="aspect-w-14 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                                        <img
                                            className="object-cover lg:h-full lg:w-full"
                                            src="http://wp.mgt-sa.com/wp-content/uploads/2022/07/top-12-strategic-tactical-seo-goals-to-consider-this-year-5ec4a56581222-1280x720-1.png"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        id={`our_message`}
                        className="pb-16 bg-gradient-to-r from-gray-100 to-gray-300 lg:pb-0 lg:z-10 lg:relative anchorBehave">
                        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
                            <div className="relative lg:-my-8">
                                <div aria-hidden="true"
                                     className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden"/>
                                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                                    <div
                                        className="aspect-w-14 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                                        <img
                                            className="object-cover lg:h-full lg:w-full"
                                            // src="https://wp.mgt-sa.com/wp-content/uploads/2022/03/269779541_139101728485694_7997432037786870327_n-1.jpeg"
                                            src="http://wp.mgt-sa.com/wp-content/uploads/2022/07/mission-img.jpeg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
                                <div
                                    className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
                                    <blockquote>
                                        <div>
                                            <svg
                                                className="h-12 w-12 text-white opacity-25"
                                                fill="currentColor"
                                                viewBox="0 0 32 32"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/>
                                            </svg>
                                            <h1 className={`text-center text-xl text-gray-900`}>{trans('our_message')}</h1>
                                            <p className="mt-6 text-lg font-medium text-gray-600">
                                                {trans('our_message_message_egy')}
                                            </p>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* our_clients */}
                    <section id={`our_clients`} className={`anchorBehave`}>
                        <div className="relative bg-gray-50 py-16">
                            <div className="relative">
                                <div
                                    className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                                    <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                                        {trans('our_clients')}
                                    </p>
                                    <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
                                        {trans("our_clients_message_egy")}
                                    </p>
                                </div>
                                <div
                                    className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-2 lg:max-w-7xl">
                                    {map(clients, (c) => (
                                        <motion.div
                                            initial={false}
                                            whileHover={{
                                                scale: 0.95, transition: {
                                                    yoyo: 100,
                                                    duration: 0.8
                                                }
                                            }}
                                            key={c.name}
                                            className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                            <div className="flex-shrink-0">
                                                <img className="h-40 w-full object-contain" src={c.imageUrl}
                                                     alt=""/>
                                            </div>
                                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                                <div className="flex-1">
                                                    <a href={c.href} className="block mt-2" target={`_blank`}>
                                                        <p className="text-xl font-semibold text-gray-900">{c.name}</p>
                                                        <p className="mt-3 text-base text-gray-500">{c.preview}</p>
                                                    </a>
                                                </div>

                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className={`flex w-full justify-center items-center mt-6`}>
                                <Link href={route('frontend.joinus', {title: 'joinus'})}
                                      className={`w-60 p-4 rounded-md border-2 rounded-md flex flex-col items-center justify-center hover:bg-gray-200`}>
                                    <div className={`py-4`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                                        </svg>
                                    </div>
                                    <span>
                                        {trans('joinus_now')}
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/*    joinus */}
                    {/*<div className={`bg-transparent w-full anchorBehave hidden`} id={`join_us`}>*/}
                    {/*    <JoinusHomeSection/>*/}
                    {/*</div>*/}


                    {/* products */}
                    <div id={`our_products`} className="relative bg-gray-50 py-16 anchorBehave hidden ">
                        <div className="relative">
                            <div
                                className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                                    {trans('some_products')}
                                </p>
                                <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
                                    {trans('some_products_message')}
                                </p>
                            </div>
                            <div
                                className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
                                {map(products, (p) => (
                                    <motion.a
                                        href={route('frontend.mgt.products.images', {id: p.id})}
                                        initial={false}
                                        whileHover={{
                                            scale: 0.95, transition: {
                                                yoyo: 100,
                                                duration: 0.8
                                            }
                                        }}
                                        key={p.name}
                                        className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                        <div className="flex-shrink-0">
                                            <img className="h-96 w-full object-cover" src={p.imageUrl} alt=""/>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* services */}
                    <div id={`our_services`} className="relative bg-gray-50 py-16 anchorBehave ">
                        <div className="relative">
                            <div
                                className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                                    {trans('some_services')}
                                </p>
                                <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
                                    {trans('some_services_message')}
                                </p>
                            </div>
                            <div
                                className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-2 lg:max-w-7xl">
                                <motion.div
                                    initial={false}
                                    whileHover={{
                                        scale: 0.95, transition: {
                                            yoyo: 100,
                                            duration: 0.8
                                        }
                                    }}
                                    className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                    <div className="flex-shrink-0">
                                        <img className="h-40 w-full object-contain"
                                             src={`http://wp.mgt-sa.com/wp-content/uploads/2022/07/helpmonks-marketing-funnel.png`}
                                             alt=""/>
                                    </div>
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <h1 className={`text-center text-xl mb-2 text-blue-800`}>{trans('for_clients')}</h1>
                                            <ul className={`space-y-2 h-60`}>
                                                {map(range(1, 7), (p) => (
                                                    <li> - {trans(`client_service_${p}`)}</li>
                                                ))}
                                            </ul>
                                            <div className="inline-block md:flex md:flex-row w-full justify-between items-center lg:justify-end">
                                                <Link href={route(`frontend.aboutus`, {title: 'joinus'})}
                                                      className={`btn btn-md p-4 bg-gray-600 rounded-md text-white pull-left w-30 w-full flex flex-row justify-start md:space-x-4 md:justify-between items-center md:mx-3`}>
                                                    <FaPhone className={`h-4 w-4 text-white mx-2`}/>
                                                    {trans('contactus')}</Link>
                                                <a target="_blank"
                                                   href={getWhatsappLink(settings.whatsapp, settings[getLocalized()])}
                                                   className={`btn btn-md p-4 bg-gray-600 rounded-md text-white pull-left w-30 -full flex flex-row justify-between items-center`}>
                                                    <FaWhatsapp className={`h-4 w-4 text-white mx-2`}/>
                                                    {trans('contactus_with_whatsapp')}

                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={false}
                                    whileHover={{
                                        scale: 0.95, transition: {
                                            yoyo: 100,
                                            duration: 0.8
                                        }
                                    }}
                                    className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                    <div className="flex-shrink-0">
                                        <img className="h-40 w-full object-contain"
                                             src={`http://wp.mgt-sa.com/wp-content/uploads/2022/07/helpmonks-email-automation-1.png`}
                                             alt=""/>
                                    </div>
                                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                        <div className="flex-1">
                                            <h1 className={`text-center text-xl mb-2 text-red-800`}>{trans('for_partners')}</h1>
                                            <ul className={`space-y-2 h-60`}>
                                                {map(range(1, 5), (p) => (
                                                    <li> - {trans(`partner_service_${p}`)}</li>
                                                ))}
                                            </ul>
                                            <div className="flex w-full justify-end">
                                                <Link href={route(`frontend.joinus`, {title: 'register_withus'})}
                                                      className={`btn btn-md p-4 bg-gray-600 rounded-md text-white pull-left`}>{trans('register_withus')}</Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                </div>

            </FrontendContentContainer>
        </FrontendContainer>
    )
}

