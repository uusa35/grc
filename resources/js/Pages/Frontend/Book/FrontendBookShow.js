import React, {Fragment, useContext, useMemo, useState} from 'react'
import {Disclosure, Transition, Menu} from '@headlessui/react'
import {
    MinusSmIcon,
    PlusSmIcon,
    ChevronDownIcon
} from '@heroicons/react/outline'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "../components/FrontendContainer";
import {map, isEmpty, isNull} from 'lodash';
import ElementPrice from "../components/widgets/ElementPrice";
import moment from "moment";
import ElementTags from "../components/widgets/ElementTags";
import RelatedItems from "../components/widgets/RelatedItems";
import ImageGallery from 'react-image-gallery';
import ElementRating from "../components/widgets/ElementRating";
import ElementFavoriteBtn from "../components/widgets/ElementFavoriteBtn";
import {isMobile} from "react-device-detect";
import {useForm} from "@inertiajs/inertia-react";
import {useDispatch} from "react-redux";
import {checkCartBeforeAdd} from "../../redux/actions";
import AlertMessage from "../partials/AlertMessage";
import GlobalContext from "../../context/GlobalContext";
import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import FrontendContentContainer from "../components/FrontendContentContainer";
import SocialIconShare from "../partials/SocialIconShare";
import route from 'ziggy-js'
import {getFileType} from "../../helpers";


export default function({element, relatedElements, auth}) {
    const {
        getThumb,
        getLarge,
        getLocalized,
        trans,
        classNames,
        getFileUrl,
        theme,
        mainColor,
        mainBgColor
    } = useContext(AppContext)
    const {settings} = useContext(GlobalContext);
    const [selectedTiming, setSelectedTiming] = useState();
    const [currentImages, setCurrentImages] = useState([]);
    const dispatch = useDispatch();
    const {data, setData, post, progress} = useForm({
        'type': 'book',
        'cart_id': null,
        'element_id': element.id,
        'timing_id': null,
        'qty': 1,
        'price': element.isOnSale ? element.sale_price : element.price,
        'direct_purchase': element.direct_purchase,

    });

    useMemo(() => {
        const images = [{thumbnail: getThumb(element.image), original: getLarge(element.image), loading: 'lazy'}]
        map(element.images, img => {
            images.push({thumbnail: getThumb(img.image), original: getLarge(img.image), loading: 'lazy'})
        })
        setCurrentImages(images);
    }, [element])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(checkCartBeforeAdd({
            cart_id: element.id,
            type: 'book',
            element_id: element.id,
            qty: 1,
            price: parseFloat(element.isOnSale ? element.sale_price : element.price),
            direct_purchase: element.direct_purchase,
            shipmentFees: 0,
            image: element.image,
            name_ar: element.name_ar,
            name_en: element.name_en,
            description_ar: element.description_ar,
            description_en: element.description_en,
            merchant_id: element.user.id,
            merchant_name_ar: element.user.name_ar,
            merchant_name_en: element.user.name_en
        }))
    }

    return (
        <FrontendContainer>
            <SubMetaElement title={element[getLocalized()]}
                            description={element[getLocalized('description')]}
                            image={element.image}
            />
            <FrontendContentContainer childName={element[getLocalized()]}>
                <div className="max-w-2xl mx-auto lg:max-w-none mt-10 h-full">
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-2  lg:px-4 lg:items-start">
                        {/* Image gallery */}
                        <div className="relative">
                            <ElementTags
                                exclusive={element.exclusive}
                                onSale={element.isOnSale}
                                onNew={element.on_new}
                                free={element.free}
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
                        <div className="mx-5 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className={`text-3xl font-extrabold tracking-tight text-${mainColor}-900 dark:text-${mainColor}-100`}>{element[getLocalized()]}</h1>
                            <div className="mt-3">
                                <h2 className="sr-only">{trans('information')}</h2>
                                <ElementPrice price={element.price} salePrice={element.sale_price}
                                              showLocal={true}
                                              isOnSale={element.isOnSale} large={true}
                                              free={element.free}
                                />
                            </div>
                            {/* Reviews */}
                            {element.ratings &&
                            <ElementRating ratings={element.ratings} id={element.id} type={'book'}/>}
                            <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                                <div className="flex flex-1">
                                    {
                                        !isNull(element[getLocalized('caption')]) && <div className="mt-6">
                                            <h3 className="sr-only">{trans('caption')}</h3>
                                            <div
                                                className={`text-base text-${mainColor}-800 dark:text-${mainColor}-100 space-y-6`}
                                            >{element[getLocalized('caption')]}</div>
                                        </div>
                                    }
                                </div>
                                <div className="flex">
                                    {
                                        !isNull(element.sku) && <div className="mt-6">
                                            <h3 className="sr-only">{trans('sku')}</h3>
                                            <div
                                                className={`text-base text-${mainColor}-800 dark:text-${mainColor}-100 space-y-6`}
                                            >
                                                {trans('reference_id')} :
                                                {element.sku}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="mt-6">
                                {!element.is_available && <AlertMessage
                                    title={trans('element_is_not_available')}
                                    message={trans('element_is_not_available_currently_for_order')}
                                />}
                                <div className="flex flex-row justify-between items-center gap-x-5">
                                    {
                                        element.free ?
                                            <>
                                                {
                                                    !isNull(element.file) && getFileType(element.file) === 'pdf' ? <a
                                                        target="_blank"
                                                        href={route('frontend.free.book', element.id)}
                                                        className={classNames(!element.is_available ? `opacity-30` : `bg-${mainColor}-600 dark:bg-${mainColor}-400 `, `flex flex-1 bg-${mainColor}-600 dark:bg-${mainColor}-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-${mainBgColor}-200 dark:text-${mainBgColor}-100 hover:bg-${mainColor}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`)}
                                                    >
                                                        {trans('view')}
                                                    </a> : <a
                                                        href={getFileUrl(element.file)}
                                                        download={true}
                                                        className={classNames(!element.is_available ? `opacity-30` : `bg-${mainColor}-600 dark:bg-${mainColor}-400 `, `flex flex-1 bg-${mainColor}-600 dark:bg-${mainColor}-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-${mainBgColor}-200 dark:text-${mainBgColor}-100 hover:bg-${mainColor}-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`)}
                                                    >{trans('download')}</a>
                                                }
                                            </>
                                            : <form onSubmit={handleSubmit} className="flex-grow">
                                                <button
                                                    disabled={!element.is_available}
                                                    type="submit"
                                                    className={classNames(!element.is_available ? `opacity-30` : `bg-${mainColor}-600 dark:bg-${mainColor}-400 `, `flex flex-1 bg-${mainColor}-800 dark:bg-${mainColor}-400 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-${mainBgColor}-200 dark:text-${mainBgColor}-100 hover:bg-${mainColor}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${mainColor}-50 focus:ring-${mainColor}-500 sm:w-full`)}
                                                >
                                                    {trans('add_to_cart')}
                                                </button>
                                            </form>
                                    }
                                    {
                                        settings.enable_favorite &&
                                        <div className="flex-none w-10">
                                            <ElementFavoriteBtn id={element.id} type={'book'}
                                                                favoritesList={auth?.favoritesList}/>
                                        </div>
                                    }
                                </div>
                            </div>
                            <section aria-labelledby="details-heading" className="my-12">
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>
                                <div className="border-t divide-y divide-gray-200 ">
                                    {/* description */}
                                    {!isNull(element[getLocalized('description')]) && element[getLocalized('description')].length > 5 ?
                                        <Disclosure as="div" defaultOpen={true}>
                                            {({open}) => (
                                                <>
                                                    <Disclosure.Button
                                                        className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? `text-${mainColor}-900 dark:text-${mainColor}-100` : `text-${mainColor}-600 dark:text-${mainColor}-200`,
                                                                  'capitalize font-extrabold'
                                                              )}
                                                          >
                                                            {trans('description')}
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
                                                        <p className={`capitalize font-bold text-${mainColor}-800 dark:text-${mainColor}-100`}>
                                                            {element[getLocalized('description')]}
                                                        </p>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure> : null
                                    }

                                    {/* notes */}
                                    {!isNull(element[getLocalized('notes')]) && element[getLocalized('notes')].length > 5 ?
                                        <Disclosure as="div" defaultOpen={false}>
                                            {({open}) => (
                                                <>
                                                    <Disclosure.Button
                                                        className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? `text-${mainColor}-600 dark:text-${mainColor}-100` : `text-${mainColor}-600 dark:text-${mainColor}-100`,
                                                                  'capitalize font-extrabold'
                                                              )}
                                                          >
                                                            {trans('notes')}
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
                                                        <p className={`capitalize font-bold text-${mainColor}-800 dark:text-${mainColor}-100`}>
                                                            {element[getLocalized('notes')]}
                                                        </p>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure> : null}

                                    {/* company  */}
                                    <Disclosure as="div" defaultOpen={false}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button
                                                    className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? `text-${mainColor}-600 dark:text-${mainColor}-100` : `text-${mainColor}-600 dark:text-${mainColor}-100`,
                                                                  'capitalize font-extrabold'
                                                              )}
                                                          >
                                                            {trans('owner')}
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
                                                <Disclosure.Panel as="div" className="pb-6 ">
                                                    <div
                                                        className="flex flex-1 justify-start items-start">
                                                        <div>
                                                            <img
                                                                className="w-20 h-auto rounded-lg shadow-sm"
                                                                src={getThumb(element.user.image)}
                                                                alt={element.user[getLocalized()]}/>
                                                        </div>
                                                        <div className="rtl:mr-5 ltr:ml-5">
                                                            <div
                                                                className={`border-b border-${mainColor}-200 dark:text-${mainColor}-100 mb-2 pb-2`}>
                                                                <h4 className={`text-${mainColor}-800 dark:text-${mainColor}-100`}>{element.user[getLocalized()]}</h4>
                                                                <p className={`text-${mainColor}-800 dark:text-${mainColor}-100`}>{element.user[getLocalized('caption')]}</p>
                                                            </div>
                                                            <p className={`text-sm text-${mainColor}-800 dark:text-${mainColor}-100`}>{element.user[getLocalized('description')]}</p>
                                                        </div>
                                                    </div>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                </div>
                            </section>

                            {/* Notes (direct purchase) */}
                            <section aria-labelledby="policies-heading" className="mt-10">
                                <h2 id="policies-heading" className="sr-only">
                                    {trans('notes')}
                                </h2>

                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 capitalize truncate">
                                    {
                                        element.direct_purchase ? <div
                                            className={`flex flex-1 flex-col justify-start items-center bg-${mainBgColor}-50 dark:bg-${mainBgColor}-600 border border-${mainColor}-200 dark:border-${mainColor}-400 rounded-lg p-6 text-center`}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor" color={mainColor}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                            <span
                                                className={`mt-4 text-sm font-medium text-${mainColor}-600 dark:text-${mainColor}-100`}>{trans('direct_purchase')}</span>
                                            <dd className={`mt-1 text-sm text-${mainColor}-600 dark:text-${mainColor}-100`}>{trans('direct_purchase')}</dd>
                                        </div> : null
                                    }
                                    {
                                        element.sku &&
                                        <div
                                            className={`flex flex-1 flex-col justify-start items-center bg-${mainBgColor}-50 dark:bg-${mainBgColor}-600 border border-${mainColor}-200 dark:border-${mainColor}-400 rounded-lg p-6 text-center`}>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor" color={mainColor}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                                                </svg>
                                            </div>
                                            <span
                                                className={`mt-4 text-sm font-medium text-${mainColor}-600 dark:text-${mainColor}-100`}>{trans('reference_id')}</span>
                                            <dd className={`mt-1 text-sm text-${mainColor}-600 dark:text-${mainColor}-100`}>{element.sku}</dd>
                                        </div>
                                    }
                                </dl>
                            </section>
                        </div>
                    </div>
                    <SocialIconShare/>
                    {/* related items */}
                    {
                        relatedElements && relatedElements.meta.total > 0 &&
                        <RelatedItems elements={relatedElements.data} type={'book'} title={trans('related_books')}/>
                    }
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
