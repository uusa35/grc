import React, {useContext, useMemo, useState, useEffect} from 'react'
import {Disclosure} from '@headlessui/react'
import {
    MinusSmIcon,
    PlusSmIcon,
} from '@heroicons/react/outline'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "../components/FrontendContainer";
import {map, isNull, size, isEmpty} from 'lodash';
import ElementTags from "../components/widgets/ElementTags";
import RelatedItems from "../components/widgets/RelatedItems";
import ImageGallery from 'react-image-gallery';
import ElementRating from "../components/widgets/ElementRating";
import {isMobile} from "react-device-detect";
import GlobalContext from "../../context/GlobalContext";
import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import FrontendContentContainer from "../components/FrontendContentContainer";
import SocialIconShare from "../partials/SocialIconShare";
import {MailIcon, PhoneIcon} from '@heroicons/react/outline'
import {FaWhatsapp, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaLocationArrow} from 'react-icons/fa';
import {getWhatsappLink} from "../../helpers";
import NormalProductWidget from "../components/widgets/product/NormalProductWidget";
import NormalBookWidget from "../components/widgets/book/NormalBookWidget";
import {setMenuBg} from "../../redux/actions";
import {useDispatch} from "react-redux";


export default function({element}) {
    const {
        getThumb,
        getLarge,
        getLocalized,
        trans,
        classNames,
        mainColor,
        contentBgColor,
        textColor
    } = useContext(AppContext)
    const [currentImages, setCurrentImages] = useState([]);
    const {settings} = useContext(GlobalContext);
    const dispatch = useDispatch();

    useMemo(() => {
        const images = [{thumbnail: getThumb(element.image), original: getLarge(element.image)}]
        map(element.images, img => {
            images.push({thumbnail: getThumb(img.image), original: getLarge(img.image)})
        })
        setCurrentImages(images);
    }, [element])

    useEffect(() => {
        element.banner ? dispatch(setMenuBg(element.banner)) : null;
        return () => dispatch(setMenuBg(settings.menu_bg));
    }, [])

    return (
        <FrontendContainer>
            <SubMetaElement title={element[getLocalized()]}
                            description={element[getLocalized('description')]}
                            image={element.image}
            />
            <FrontendContentContainer childName={element[getLocalized()]} parentModuleName={'authors'}>
                <div className={`${contentBgColor} max-w-2xl mx-auto lg:max-w-none pt-10 h-full`}>
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-4 lg:px-4 lg:items-start">
                        {/* Image gallery */}
                        <div className="relative hidden">
                            <ElementTags
                                exclusive={element.exclusive}
                                onSale={element.isOnSale}
                                onNew={element.on_new}
                                onNew={element.free}
                            />
                            <ImageGallery
                                showBullets={true}
                                showNav={false}
                                originalAlt={element[getLocalized()]}
                                originalTitle={element[getLocalized()]}
                                thumbnailLabel={element[getLocalized()]}
                                thumbnailTitle={element[getLocalized()]}
                                showThumbnails={true}
                                thumbnailPosition={isMobile ? 'bottom' : 'right'}
                                items={currentImages}/>
                        </div>
                        {/* Product info */}
                        <div className="mx-5 mt-10 sm:px-0 sm:mt-16 lg:mt-0 col-span-full">
                            <div className="flex flex-row items-center justify-start">
                                <img
                                    src={getThumb(element.image)}
                                    alt={element[getLocalized()]}
                                    className="z-0 w-40 h-40 rounded-full shadow-md object-center object-cover group-hover:opacity-75 shadow-md"
                                    width={100}
                                    height={100}
                                    loading='lazy'
                                />
                                <div className={`mx-5`}>
                                    <h1 className={`text-3xl font-extrabold tracking-tight text-${mainColor}-900 dark:text-${mainColor}-100`}>{element[getLocalized()]}</h1>
                                    {/* Reviews */}
                                    {element.ratings &&
                                    <ElementRating ratings={element.ratings} id={element.id} type={'user'}/>}
                                    <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                                        <div className="flex flex-1">
                                            {
                                                element[getLocalized('caption')] && <div className="mt-3">
                                                    <h3 className="sr-only">{trans('caption')}</h3>
                                                    <div
                                                        className={`text-base ${textColor} space-y-6`}
                                                    >{element[getLocalized('caption')]}</div>
                                                    <div
                                                        className={`text-base ${textColor} space-y-6`}
                                                    >{element.role[getLocalized()]}</div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <section aria-labelledby="details-heading" className="my-12 min-h-screen">
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>
                                <div className="border-t divide-y divide-gray-200 ">
                                    {/*     information */}
                                    <Disclosure as="div" defaultOpen={false}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button
                                                    className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? `` : ``,
                                                                  `${textColor} font-extrabold text-lg`
                                                              )}
                                                          >
                                                            {trans('information')}
                                                          </span>
                                                    <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <PlusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                      </span>
                                                </Disclosure.Button>
                                                <Disclosure.Panel as="div" className="pb-6">
                                                    <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
                                                        <div
                                                            className="max-w-lg mx-auto md:max-w-none md:grid md:grid-cols-1 md:gap-8">
                                                            <div>
                                                                <div className="mt-3">
                                                                    <p className="text-lg ">
                                                                        {element[getLocalized('description')]}
                                                                    </p>
                                                                </div>
                                                                <div className="mt-3 space-y-3">
                                                                    {/* mobile */}
                                                                    <div className="flex">
                                                                        <div className="flex-shrink-0">
                                                                            <PhoneIcon className="h-5 w-5 ml-4"
                                                                                       aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-3 text-base">
                                                                            <p>{element.mobile}</p>
                                                                        </div>
                                                                    </div>
                                                                    {/*     whatsapp */}
                                                                    <div className="flex">
                                                                        <div className="flex-shrink-0">
                                                                            <FaWhatsapp className="h-5 w-5 ml-4"
                                                                                        aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-3 text-base ">
                                                                            <a target="_blank"
                                                                               href={getWhatsappLink(settings.whatsapp, element[getLocalized()])}>
                                                                                {settings.whatsapp}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    {/*    address */}
                                                                    <div className="flex">
                                                                        <div className="flex-shrink-0">
                                                                            <FaLocationArrow className="h-5 w-5 ml-4"
                                                                                             aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-3 text-base ">
                                                                            <p>{element.address}</p>
                                                                        </div>
                                                                    </div>
                                                                    {/*     facebook */}
                                                                    <div className="flex">
                                                                        <div className="flex-shrink-0">
                                                                            <FaFacebook className="h-5 w-5 ml-4"
                                                                                        aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-3 text-base ">
                                                                            <p>{element.facebook}</p>
                                                                        </div>
                                                                    </div>
                                                                    {/*     twitter */}
                                                                    <div className="flex">
                                                                        <div className="flex-shrink-0">
                                                                            <FaTwitter className="h-5 w-5 ml-4"
                                                                                       aria-hidden="true"/>
                                                                        </div>
                                                                        <div className="ml-3 text-base ">
                                                                            <p>{element.twitter}</p>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    {/*     products */}
                                    {
                                        settings.enable_products && !isEmpty(element.products) ?
                                            <Disclosure as="div" defaultOpen={true}>
                                                {({open}) => (
                                                    <>
                                                        <Disclosure.Button
                                                            className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? `` : ``,
                                                                  `${textColor} font-extrabold text-lg`
                                                              )}
                                                          >
                                                            {trans('products')}
                                                          </span>
                                                            <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <PlusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                      </span>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel as="div" className="pb-6">
                                                            <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
                                                                <div
                                                                    className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 1xl:grid-cols-3 2xl:grid-cols-3 xl:gap-x-8 gap-x-6">
                                                                    {map(element.products, p => (
                                                                        <NormalProductWidget element={p} key={p.id}/>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure> : null
                                    }


                                    {/*     books */}
                                    {
                                        settings.enable_books && !isEmpty(element.books) ?
                                            <Disclosure as="div" defaultOpen={true}>
                                                {({open}) => (
                                                    <>
                                                        <Disclosure.Button
                                                            className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? `` : ``,
                                                                  `${textColor} font-extrabold text-lg`
                                                              )}
                                                          >
                                                            {trans('books')}
                                                          </span>
                                                            <span className="ml-6 flex items-center">
                                                        {open ? (
                                                            <MinusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        ) : (
                                                            <PlusSmIcon
                                                                className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                                aria-hidden="true"
                                                            />
                                                        )}
                                                      </span>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel as="div" className="pb-6">
                                                            <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
                                                                <div
                                                                    className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 1xl:grid-cols-3 2xl:grid-cols-3 xl:gap-x-8 gap-x-6">
                                                                    {map(element.books, p => (
                                                                        <NormalBookWidget element={p} key={p.id}/>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure> : null
                                    }

                                </div>
                            </section>

                        </div>
                    </div>
                    <SocialIconShare/>
                    {/* related items */}
                    {
                        settings.enable_books && element.books && element.books.length > 0 &&
                        <RelatedItems elements={element.books} type={'book'} title={trans('authors_books')}/>
                    }
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
