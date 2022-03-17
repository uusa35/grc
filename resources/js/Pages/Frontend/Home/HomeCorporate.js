import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../context/AppContext";
import {  Transition } from '@headlessui/react'
import FrontendContainer from "./../components/FrontendContainer";
import ElementSlider from "./../components/widgets/slider/ElementSlider";
import {isMobile, isTablet} from 'react-device-detect';
import MainGallery from "./../components/widgets/slider/MainGallery";
import FrontendContentContainer from "./../components/FrontendContentContainer";
import {filter, first, isEmpty, map, shuffle} from 'lodash';
import JoinusHomeSection from "./../partials/JoinusHomeSection";
import HomeMainCategory from "./HomeMainCategory";
import GlobalContext from "../../context/GlobalContext";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js'



const blogPosts = [
    {
        id: 1,
        title: 'خدمة التوريد المباشر',
        href: '#',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        imageUrl:
            'https://mgt-sa.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-13-at-10.42.13-PM.jpeg',
        preview:
            'عن طريق شركائنا في مُختلف دول العالم، يُمكنك الآن الاستفادة من خُصومات شركة وساطة وضمان السعودية على جميع أشكال ومقاسات مُنتجات التعبئة والتغليف بجودة عالية مطابقة للمواصفات العالمية',
    },
    {
        id: 1,
        title: 'خدمة التوزيع داخل المملكة العربية السعودية',
        href: '#',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        imageUrl:
            'https://mgt-sa.com/wp-content/uploads/2022/03/WhatsApp-Image-2022-03-13-at-10.42.28-PM.jpeg',
        preview:
            'نُمكّن منتجات التعبئة والتغليف الخاصة بشركتك من الوصول الى شريحة أكبر من العملاء المحتملين في مُختلف المناطق داخل المملكة العربية السعودية مقابل أسعار رمزية'
    },
    {
        id: 1,
        title: 'منتجات صديقة البيئة',
        href: '#',
        date: 'Mar 16, 2020',
        datetime: '2020-03-16',
        imageUrl:
            'https://mgt-sa.com/wp-content/uploads/2022/03/DSC_3786-scaled.jpg',
        preview:
            'تعرّف على منتجات شركة وساطة وضمان صديقة البيئة، المصنوعة من أجود خامات قصب السُكر القابلة للتحلل، حل بيئي واقتصادي جديد لمنتجات التعبئة والتغليف الغذائية غير ضار تمامًا بالبيئة وصحّة الانسان'
    }
]

export default React.memo(function({
                                       slides,
                                   }) {
    const [slideNumber, setSlideNumber] = useState(isMobile ? 1 : (isTablet ? 2 : 4))
    const {categories, settings} = useContext(GlobalContext);
    const {trans, getLocalized, getLarge} = useContext(AppContext)

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
                {/* shop */}
                <div className={`xl:w-4/5 2xl:w-3/5 m-auto space-y-20 mt-10`}>

                    <div className="grid grid-cols-2 gap-4 h-auto shadow-sm bg-gray-50 dark:bg-transparent ">
                        <div className={`grid-cols-1`}>
                            <img src={`https://mgt-sa.com/wp-content/uploads/2022/03/DSC_4162.jpg`}
                                                            className={`w-full h-auto object-cover`}/>
                        </div>
                        <div className={`grid-cols-1 flex flex-col flex-grow`}>
                            <div className={`justify-center items-center p-3 pt-10`}>
                                <h1 className={`text-center text-gray-800 dark:text-white text-3xl pb-10`}>
                                    المتجر الإلكتروني
                                </h1>
                                <p className={`text-center text-gray-600 dark:text-white text-lg leading-loose`}>
                                    يُمكنك الآن طلب جميع منتجات التعبئة والتغليف الغذائية بمُختلف الأشكال والمقاسات
                                    وبجميع
                                    الكميّات عن طريق متجرنا الالكتروني، خصومات خاصّة لعملائنا عند الطلب عن طريق المتجر
                                    الاكتروني
                                </p>
                            </div>
                            <div className={`flex justify-end items-end text-center mx-6`}>
                                <Link
                                    className={`p-5 rounded-md shadow-md text-black dark:text-white border-2 border-gray-800 hover:bg-gray-200`}
                                    href={route('frontend.home')}>
                                    الذهب للمتجر الإلكتروني
                                </Link>
                            </div>
                        </div>
                    </div>



                    {/* our services */}
                    <section id={`our_services`}>
                    <div className="relative bg-gray-50 py-16" >
                        <div className="relative">
                            <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
                                <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                                    خدماتتنا
                                </p>
                                <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
                                    نهدف الى توفير منتجات التعبئة والتغليف لعملائنا بأعلى جودة وأفضل سعر، بجميع الكميات والأشكال والمقاسات المطلوبة
                                </p>
                            </div>
                            <div className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
                                {blogPosts.map((post) => (
                                    <div key={post.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                                        <div className="flex-shrink-0">
                                            <img className="h-48 w-full object-cover" src={post.imageUrl} alt="" />
                                        </div>
                                        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                                            <div className="flex-1">
                                                <a href={post.href} className="block mt-2">
                                                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                                                    <p className="mt-3 text-base text-gray-500">{post.preview}</p>
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    </section>




                    {/* company features */}
                    <div className="pb-16 bg-gradient-to-r from-gray-100 to-gray-300 lg:pb-0 lg:z-10 lg:relative ">
                        <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
                            <div className="relative lg:-my-8">
                                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden" />
                                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                                    <div className="aspect-w-14 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full">
                                        <img
                                            className="object-cover lg:h-full lg:w-full"
                                            src="https://mgt-sa.com/wp-content/uploads/2022/03/DSC_3788.jpg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
                                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
                                    <blockquote>
                                        <div>
                                            <svg
                                                className="h-12 w-12 text-white opacity-25"
                                                fill="currentColor"
                                                viewBox="0 0 32 32"
                                                aria-hidden="true"
                                            >
                                                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                            </svg>
                                            <h1 className={`text-center text-xl text-gray-900`}>وساطة وضمان السعودية</h1>
                                            <p className="mt-6 text-lg font-medium text-gray-600">
                                                نسعى لتقديم خدمة لا مثيل لها في سوق التعبئة والتغليف بالمملكة العربية السعودية والشرق الأوسط عن طريق صقل خبرة سنوات عديدة من العمل لتقديم جودة عالمية بأسعار تنافسية
                                            </p>
                                            <p className="mt-6 text-lg font-medium text-gray-600">
                                                نعمل من خلال رؤية إبداعية تتمثّل في الاهتمام بالتفاصيل، شعارنا المصداقية الكاملة والتعاون المرن وحل جميع المعوّقات التي قد تواجه عملائنا لضمان توفير أجود خدمة بأفضل سعر
                                            </p>
                                            <p className="mt-6 text-lg font-medium text-gray-600">
                                                تشكيلة كبيرة ومتنوّعة من الأشكال والمقاسات لمنتجات التعبئة والتغليف الغذائية التي تضمن تغطية احتياجات جميع عملائنا بالمملكة العربية السعودية والشرق الأوسط
                                            </p>
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>






                    {/*    joinus */}

                    <div className={`bg-transparent w-full`} id={`joinus`}>
                        {
                            settings.enable_joinus ? <JoinusHomeSection/> : null
                        }

                    </div>
                </div>


            </FrontendContentContainer>
        </FrontendContainer>
    )
})

