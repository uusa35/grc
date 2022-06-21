import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "./../components/FrontendContainer";
import {isMobile, isTablet} from 'react-device-detect';
import MainGallery from "./../components/widgets/slider/MainGallery";
import FrontendContentContainer from "./../components/FrontendContentContainer";
import {map} from 'lodash';
import JoinusHomeSection from "./../partials/JoinusHomeSection";
import GlobalContext from "../../context/GlobalContext";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js'
import {useAnimation, motion} from "framer-motion";
import {useInView} from "react-intersection-observer";

const services = [
    {
        name: 'خدمة التوريد المباشر',
        href: route('frontend.joinus'),
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        imageUrl:
            'http://wp.mgt-sa.com/wp-content/uploads/2022/04/2-e1649012029739.jpeg',
        preview:
            'عن طريق شركائنا في مُختلف دول العالم، يُمكنك الآن الاستفادة من خُصومات شركة وساطة وضمان السعودية على جميع أشكال ومقاسات مُنتجات التعبئة والتغليف بجودة عالية مطابقة للمواصفات العالمية',
    },
    {
        name: 'خدمة التوزيع داخل المملكة العربية السعودية',
        href: '#',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        imageUrl:
            'https://wp.mgt-sa.com/wp-content/uploads/2022/03/275383085_153690203693513_8167701926030083832_n.jpeg',
        preview:
            'نُمكّن منتجات التعبئة والتغليف الخاصة بشركتك من الوصول الى شريحة أكبر من العملاء المحتملين في مُختلف المناطق داخل المملكة العربية السعودية '
    }
]


const products = [
    {
        id : 1,
        name: 'المنتجات الورقية الملونة',
        href: '#',
        price: '',
        description: '',
        imageUrl: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/260406114_132949502434250_208895838802599038_n.jpeg',
        imageAlt: '',
    },
    {
        id : 2,
        name: 'منتجات القصدير بأنواعها',
        href: '#',
        price: '',
        description: '',
        imageUrl: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvr_SUXMAQnv6k.jpeg',
        imageAlt: '',
    },
    {
        id : 3,
        name: 'أطباق آمنه للميكرويف',
        href: '#',
        price: '',
        description: '',
        imageUrl: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvr06wX0AUNZjL.jpeg',
        imageAlt: '',
    },
    {
        id : 4,
        name: 'حامل الأكواب',
        href: '#',
        price: '',
        description: '',
        imageUrl: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvtPBYXEAIcWpl.jpeg',
        imageAlt: '',
    },
    {
        id : 5,
        name: 'جميع الأحجام والمقاسات المختلفة',
        href: '#',
        price: '',
        description: '',
        imageUrl: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvsSXEXoAYXT4g.jpeg',
        imageAlt: '',
    },
    {
        id : 6,
        name: 'قفازات البلاستيك الآمنة',
        href: '#',
        price: '',
        description: '',
        imageUrl: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvsV2GWUAEEgxQ.jpeg',
        imageAlt: '',
    },
    {
        id : 7,
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

const collections = [
    {
        name: "تخزن بآمان",
        href: '#',
        imageSrc: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvr5J6XsAQ9ISU.jpeg',
    },
    {
        name: "تغلف بعناية",
        href: '#',
        imageSrc: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvrszGXIA4A2QR.jpeg',
    },
    {
        name: 'تنقل بسرعة',
        href: '#',
        imageSrc: 'https://wp.mgt-sa.com/wp-content/uploads/2022/03/FNvshzbWQAEARmq.jpeg',
    },
]

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
                            src="https://wp.mgt-sa.com/wp-content/uploads/2022/03/258006283_131728082556392_8484546533647944764_n.jpeg"
                            alt=""
                            className="w-full h-full object-center object-cover rounded-lg"
                        />
                    </div>
                    <div
                        id={`why_us`}
                        aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50 rounded-lg"/>
                    <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            {trans('why_wasata_we_daman')}
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
                    {/* shop */}
                    <motion.div
                        id={`our_shop`}
                        className="grid grid-cols-2 gap-4 h-auto shadow-sm bg-gray-50 dark:bg-transparent anchorBehave"
                        ref={elementTwo}
                        variants={currentVariants}
                        animate={controls}
                        initial="hidden"
                    >
                        <div className={`col-span-full lg:col-span-1`}>
                            <img
                                src={`https://wp.mgt-sa.com/wp-content/uploads/2022/03/275923707_155477013514832_2749966635233669569_n.jpeg`}
                                className={`w-full h-auto object-cover rounded-lg`}/>
                        </div>
                        <div className={`col-span-full lg:col-span-1 flex flex-col flex-grow`}>
                            <div className={`justify-center p-3 pt-10`}>
                                <h1 className={`text-gray-800 dark:text-white text-3xl pb-10`}>
                                    <a href="https://shop.mgt-sa.com">
                                        {trans('online_shop')}
                                    </a>
                                </h1>
                                <p className={`text-gray-600 dark:text-white text-lg leading-loose`}>
                                    {trans('online_shop_message')}
                                </p>
                            </div>
                            <div className={`flex justify-end items-end text-center mx-6`}>
                                <a
                                    className={`p-5 rounded-md shadow-md text-black dark:text-white border-2 border-gray-800 hover:bg-gray-200`}
                                    href={`https://shop.mgt-sa.com`}>{trans('go_to_online_shop')}
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* our_services */}
                    <section id={`direct_shipment`} className={`anchorBehave`}>
                        <div className="relative bg-gray-50 py-16">
                            <div className="relative">
                                <div
                                    className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                                    <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                                        {trans('direct_supply')}
                                    </p>
                                    <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
                                        {trans("direct_supply_message")}
                                    </p>
                                </div>
                                <div
                                    className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-2 lg:max-w-7xl">
                                    {map(services, (service) => (
                                        <motion.div
                                            initial={false}
                                            whileHover={{
                                                scale: 0.95, transition: {
                                                    yoyo: 100,
                                                    duration: 0.8
                                                }
                                            }}
                                            key={service.name}

                                            className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                            <div className="flex-shrink-0">
                                                <img className="h-96 w-full object-cover" src={service.imageUrl}
                                                     alt=""/>
                                            </div>
                                            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                                <div className="flex-1">
                                                    <a href={service.href} className="block mt-2">
                                                        <p className="text-xl font-semibold text-gray-900">{service.name}</p>
                                                        <p className="mt-3 text-base text-gray-500">{service.preview}</p>
                                                    </a>
                                                </div>

                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* our_message */}
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
                                            src="http://wp.mgt-sa.com/wp-content/uploads/2022/04/3.jpeg"
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
                                                {trans('our_message_first')}
                                            </p>
                                            <p className="mt-6 text-lg font-medium text-gray-600">
                                                {trans('our_message_second')}
                                            </p>
                                            <p className="mt-6 text-lg font-medium text-gray-600">
                                                {trans('our_message_third')}
                                            </p>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* products */}
                    <div id={`our_products`} className="relative bg-gray-50 py-16 anchorBehave">
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
                                        href={route('frontend.mgt.products.images', { id : p.id})}
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


                    <div className="relative bg-white">
                        {/* Background image and overlap */}
                        <div aria-hidden="true" className="hidden absolute inset-0 sm:flex sm:flex-col">
                            <div className="flex-1 relative w-full bg-gray-800">
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src="https://wp.mgt-sa.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-12-at-10.32.40-PM2.jpeg"
                                        alt=""
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gray-900 opacity-50"/>
                            </div>
                            <div className="w-full bg-white h-32 md:h-40 lg:h-48"/>
                        </div>

                        <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
                            {/* Background image and overlap */}
                            <div aria-hidden="true" className="absolute inset-0 flex flex-col sm:hidden">
                                <div className="flex-1 relative w-full bg-gray-800">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img
                                            src="https://wp.mgt-sa.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-12-at-10.32.40-PM2.jpeg"
                                            alt=""
                                            className="w-full h-full object-center object-cover"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gray-900 opacity-50"/>
                                </div>
                                <div className="w-full bg-white h-48"/>
                            </div>
                            <div className="relative py-32">
                                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                                    {trans('complete_services')}
                                </h1>
                                <div className="mt-4 sm:mt-6">
                                    <a
                                        href="#"
                                        className="inline-block bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
                                    >

                                    </a>
                                </div>
                            </div>
                        </div>

                        <section aria-labelledby="collection-heading" className="-mt-96 relative sm:mt-0">
                            <h2 id="collection-heading" className="sr-only">
                                Collections
                            </h2>
                            <div
                                className="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
                                {collections.map((collection) => (
                                    <motion.div
                                        initial={false}
                                        whileHover={{
                                            scale: 0.95, transition: {
                                                yoyo: 100,
                                                duration: 0.8
                                            }
                                        }}
                                        key={collection.name}
                                        className="group relative h-96 bg-white rounded-lg shadow-xl sm:h-auto sm:aspect-w-4 sm:aspect-h-5"
                                    >
                                        <div>
                                            <div aria-hidden="true"
                                                 className="absolute inset-0 rounded-lg overflow-hidden">
                                                <div
                                                    className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                                                    <img
                                                        src={collection.imageSrc}
                                                        alt={collection.imageAlt}
                                                        className="w-full h-full object-center object-cover"
                                                    />
                                                </div>
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"/>
                                            </div>
                                            <div className="absolute inset-0 rounded-lg p-6 flex items-end">
                                                <div>
                                                    <p aria-hidden="true" className="text-sm text-white">
                                                        {collection.name}
                                                    </p>
                                                    <h3 className="mt-1 font-semibold text-white">
                                                        <a href={collection.href}>
                                                            <span className="absolute inset-0"/>
                                                            {/*{collection.name}*/}
                                                        </a>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    </div>


                    {/*    joinus */}
                    <div className={`bg-transparent w-full anchorBehave`} id={`join_us`}>
                        <JoinusHomeSection/>
                    </div>
                </div>

            </FrontendContentContainer>
        </FrontendContainer>
    )
}

