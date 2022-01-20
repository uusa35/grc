import React, { useContext, useMemo, useState} from 'react'
import { Disclosure, RadioGroup,} from '@headlessui/react'
import {
    MinusSmIcon,
    PlusSmIcon,
} from '@heroicons/react/outline'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "../components/FrontendContainer";
import {map, isEmpty, first, isNull, filter, uniqBy} from 'lodash';
import ElementPrice from "../components/widgets/ElementPrice";
import ElementTags from "../components/widgets/ElementTags";
import RelatedItems from "../components/widgets/RelatedItems";
import './../../../../../node_modules/react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery';
import {getWhatsappLink} from "../../helpers";
import ElementRating from "../components/widgets/ElementRating";
import ElementFavoriteBtn from "../components/widgets/ElementFavoriteBtn";
import {isMobile} from "react-device-detect";
import {useForm} from "@inertiajs/inertia-react";
import {useDispatch, useSelector} from "react-redux";
import {checkCartBeforeAdd} from "../../redux/actions";
import AlertMessage from "../partials/AlertMessage";
import EmbeddedIFrameVideo from "../partials/EmbeddedIFrameVideo";
import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import FrontendContentContainer from "../components/FrontendContentContainer";
import SocialIconShare from "../partials/SocialIconShare";
import {FaWhatsapp} from "react-icons/fa";
import SizeChartModal from "../partials/SizeChartModal";
import validate from "validate.js";


export default function({element, relatedElements, auth, settings}) {
    const {getThumb, getLarge, getLocalized, trans, classNames} = useContext(AppContext)
    const { locale } = useSelector(state => state);
    const [currentImages, setCurrentImages] = useState([]);
    const [finalPrice, setFinalPrice] = useState(0);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedAttribute, setSelectedAttribute] = useState(null);
    const [filteredColorsGroup, setFilteredColorsGroup] = useState([]);
    const [filteredSizesGroup, setFilteredSizesGroup] = useState([]);
    const [currentQty, setCurrentQty] = useState(0);
    const [selectedQty, setSelectedQty] = useState(0);
    const [showModal,setShowModal] = useState(false);
    const dispatch = useDispatch();
    const {data, setData, post, progress} = useForm({
        'type': 'product',
        'cart_id': null,
        'element_id': element.id,
        'qty': selectedQty,
        'price': finalPrice,
        'direct_purchase': element.direct_purchase,
    });

    useMemo(() => {
        setFinalPrice(element.has_attributes ? first(element.product_attributes).price : (element.isOnSale ? element.sale_price : element.price));
        setSelectedColor(element.has_attributes ? first(element.product_attributes).color_id : null)
        setSelectedSize(element.has_attributes ? first(element.product_attributes).size_id : null)
        setCurrentQty(element.has_attributes ? first(element.product_attributes).qty : element.qty)

        element.has_attributes ? setFilteredColorsGroup(uniqBy(element.product_attributes, 'color_id')) : [];
        element.has_attributes ? setFilteredSizesGroup(uniqBy(element.product_attributes, 'size_id')) : [];
    }, [])

    useMemo(() => {
        if (!isNull(selectedAttribute) && element.has_attributes) {
            setFinalPrice(selectedAttribute.price);
            setCurrentQty(1)
            setCurrentQty(selectedAttribute.qty)
        }
    }, [selectedAttribute])

    // select Color then select size --> show qty
    useMemo(() => {
        setFilteredSizesGroup(filter(element.product_attributes, c => c.color_id === selectedColor))
        setSelectedAttribute(first(filter(element.product_attributes, c => c.color_id === selectedColor)));
        setSelectedQty(0)
    }, [selectedColor])

    useMemo(() => {
        if (!isEmpty(filteredSizesGroup) && element.has_attributes) {
            setSelectedSize(first(filteredSizesGroup).size_id)
            setSelectedQty(0)
        }
    }, [filteredSizesGroup])

    useMemo(() => {
        if (!isEmpty(filteredSizesGroup) && element.has_attributes && element.product_attributes.length >= 1) {
            setSelectedAttribute(first(filter(element.product_attributes, a => a.color_id === selectedColor && a.size_id === selectedSize)));
        } else if (element.has_attributes) {
            setSelectedAttribute(first(element.product_attributes))
        } else {
        }
        setSelectedQty(0)
    }, [selectedSize])

    useMemo(() => {
        const images = []
        element.video_url_one ?
            images.push({
                thumbnail: getLarge(element.image),
                original: getLarge(element.image),
                embedUrl: 'https://www.youtube.com/embed/4pSzhZ76GdM?autoplay=1&showinfo=0',
                description: 'Render custom slides (such as videos)',
                renderItem: () => <EmbeddedIFrameVideo videoUrl={element.video_url_one}/>
            }) : null
        images.push({thumbnail: getLarge(element.image), original: getLarge(element.image)})
        map(element.images, img => {
            images.push({thumbnail: getLarge(img.image), original: getLarge(img.image)})
        })
        setCurrentImages(images);
    }, [element])


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(checkCartBeforeAdd({
            cart_id: `${element.id}${element.has_attributes ? selectedAttribute.id : ''}`,
            type: 'product',
            element_id: element.id,
            qty: selectedQty,
            price: element.has_attributes ? parseFloat(finalPrice) : parseFloat(element.isOnSale ? element.sale_price : element.price),
            direct_purchase: element.direct_purchase,
            shipmentFees: 0,
            image: element.image,
            name_ar: element.name_ar,
            name_en: element.name_en,
            description_ar: element.description_ar,
            description_en: element.description_en,
            merchant_id: element.user.id,
            merchant_name_ar: element.user.name_ar,
            merchant_name_en: element.user.name_en,
            color: element.has_attributes ? selectedAttribute.color[getLocalized()] : element.color[getLocalized()],
            size: element.has_attributes ? selectedAttribute.size[getLocalized()] : element.size[getLocalized()]
        }))
    }

    const increaseQty = () => {
        setSelectedQty(selectedQty < currentQty ? selectedQty + 1 : selectedQty)
    }

    const decreaseQty = () => {
        setSelectedQty(selectedQty - 1 < currentQty && selectedQty > 0 ? selectedQty - 1 : selectedQty)
    }

    return (
        <FrontendContainer>
            <SubMetaElement title={element[getLocalized()]}
                            description={element[getLocalized('description')]}
                            image={element.image}
            />
            <FrontendContentContainer childName={element[getLocalized()]}>
                <div className="max-w-2xl mx-auto lg:max-w-none mt-10 h-full">
                    {/*<div className="w-full h-auto overflow-hidden mb-10">*/}
                    {/*    {element.free && <EmbeddedHtml html={element.embedded}/>}*/}
                    {/*</div>*/}
                    {/* Product */}
                    <div
                        className={classNames(element.video_url_one ? `lg:grid-cols-2` : `lg:grid-cols-2`, "lg:grid lg:gap-x-4 lg:px-4 lg:items-start m-auto pb-10")}>
                        {/* Image gallery */}
                        <div className="relative">
                            <ElementTags
                                exclusive={element.exclusive}
                                onSale={element.isOnSale}
                                onNew={element.on_new}
                                free={element.free}
                                showFavoriteIcon={false}
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
                        <div className="mx-5 mt-10 pt-10 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{element[getLocalized()]}</h1>
                            <div className="mt-3">
                                <h2 className="sr-only">{trans('information')}</h2>
                                <ElementPrice price={finalPrice}
                                              salePrice={element.has_attributes ? finalPrice : element.sale_price}
                                              showLocal={true}
                                              isOnSale={element.isOnSale} large={true}
                                              free={element.free}
                                />
                            </div>
                            {/* Reviews */}
                            {element.ratings &&
                            <ElementRating ratings={element.ratings} id={element.id} type={'product'}/>}
                            <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                                <div className="flex flex-1">
                                    {
                                        element[getLocalized('caption')] && <div className="mt-6">
                                            <h3 className="sr-only">{trans('caption')}</h3>
                                            <div
                                                className="text-base text-gray-700 space-y-6"
                                            >{element[getLocalized('caption')]}</div>
                                        </div>
                                    }
                                </div>
                                <div className="flex">
                                    {
                                        element.sku && <div className="mt-6">
                                            <h3 className="sr-only">{trans('sku')}</h3>
                                            <div
                                                className="text-base text-gray-700 space-y-6"
                                            >
                                                {trans('reference_id')} :
                                                {element.sku}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            {/* product attributes */}
                            <div className="flex flex-1 flex-col w-full mt-6">
                                {!element.is_available && <AlertMessage
                                    title={trans('element_is_not_available')}
                                    message={trans('element_is_not_available_currently_for_order')}
                                />}
                                {
                                    element.has_attributes && !isEmpty(filteredColorsGroup) ?
                                        <div className="flex flex-col justify-between items-center gap-x-5">

                                                {/* Color picker */}
                                                <div className="flex-1 w-full">
                                                    <div
                                                        className="flex w-full flex-row justify-between items-center ">

                                                            <h2 className="text-sm font-bold text-gray-900">{`${trans('colors')} / ${trans('heights')}`}</h2>

                                                        {
                                                            element.show_size_chart  ? <div className="justify-end items-center">
                                                                <button
                                                                    onClick={() => setShowModal(true)}
                                                                    className="flex flex-row items-center justify-center text-xs font-bold text-gray-800 hover:text-gray-500 capitalize p-2 rounded-md border-2 border-gray-100 bg-gray-50">
                                                                    <div>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        {trans('size_chart')}
                                                                    </div>
                                                                </button>
                                                            </div>  : null
                                                        }
                                                    </div>

                                                    <RadioGroup value={selectedColor} onChange={setSelectedColor}
                                                                className="mt-4">
                                                        <RadioGroup.Label
                                                            className="sr-only">{trans('choose_color')}</RadioGroup.Label>
                                                        <div className="flex items-center gap-x-3">
                                                            {filteredColorsGroup.map((attribute) => (
                                                                <RadioGroup.Option
                                                                    key={attribute.color.name_ar}
                                                                    value={attribute.color_id}
                                                                    className={({active, checked}) =>
                                                                        classNames(
                                                                            attribute.color,
                                                                            active && checked ? 'ring-2 ring-offset-1 ring-gray-400' : '',
                                                                            !active && checked ? 'ring-2 ring-gray-100' : '',
                                                                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none hover:bg-gray-100'
                                                                        )
                                                                    }
                                                                >
                                                                    <RadioGroup.Label as="p" className="font-bold text-sm mx-2 ">
                                                                        {attribute.color[getLocalized()]}
                                                                    </RadioGroup.Label>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        style={{backgroundColor: attribute.color.code}}
                                                                        className={'h-8 w-8 border border-black border-opacity-10 rounded-full'}
                                                                    />
                                                                </RadioGroup.Option>
                                                            ))}
                                                        </div>
                                                    </RadioGroup>
                                                </div>

                                                {/* Size picker */}
                                                <div className="flex-1 w-full mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm font-bold text-gray-900">{trans('sizes')}</h2>
                                                    </div>

                                                    <RadioGroup value={selectedSize} onChange={setSelectedSize}
                                                                className="mt-4">
                                                        <RadioGroup.Label
                                                            className="sr-only">{trans('choose_size')}</RadioGroup.Label>
                                                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                                                            {filteredSizesGroup.map((attribute) => (
                                                                <RadioGroup.Option
                                                                    key={attribute.size.name_ar}
                                                                    value={attribute.size_id}
                                                                    className={({active, checked}) =>
                                                                        classNames(
                                                                            attribute.size ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                                                                            active ? 'ring-2 ring-offset-2 ring-gray-500' : '',
                                                                            checked
                                                                                ? 'bg-gray-600 border-transparent text-white hover:bg-gray-700'
                                                                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                                            'border rounded-md py-3 px-3 flex items-center justify-center text-xs font-medium uppercase sm:flex-1 truncate'
                                                                        )
                                                                    }
                                                                    disabled={!attribute.size}
                                                                >
                                                                    <RadioGroup.Label
                                                                        as="p">{attribute.size[getLocalized()]}</RadioGroup.Label>
                                                                </RadioGroup.Option>
                                                            ))}
                                                        </div>
                                                    </RadioGroup>
                                                </div>

                                        </div> :
                                        <div className="flex flex-row justify-between items-center gap-x-5">
                                            <div className="mt-2 lg:col-span-5">
                                                {/* Color picker */}
                                                <div>
                                                    <div
                                                        className="flex w-full flex-1 flex-row justify-between items-center">
                                                        <div>
                                                            <h2 className="text-sm font-bold text-gray-900 capitalize">{trans('color')}</h2>
                                                        </div>
                                                        <div>
                                                            <a href="#"
                                                               className="text-sm font-bold text-gray-600 hover:text-gray-900 capitalize">
                                                                {trans('size_chart')}
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <RadioGroup value={selectedColor} onChange={setSelectedColor}
                                                                className="mt-4">
                                                        <RadioGroup.Label
                                                            className="sr-only">{trans('choose_color')}</RadioGroup.Label>
                                                        <div className="flex items-center gap-x-3">

                                                                <RadioGroup.Option
                                                                    key={element.color.name_ar}
                                                                    value={element.color_id}
                                                                    className={({active, checked}) =>
                                                                        classNames(
                                                                            element.color,
                                                                            active && checked ? 'ring ring-offset-1' : '',
                                                                            !active && checked ? 'ring-2' : '',
                                                                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                                        )
                                                                    }
                                                                >
                                                                    <RadioGroup.Label as="p" className="sr-only">
                                                                        {element.color[getLocalized()]}
                                                                    </RadioGroup.Label>
                                                                    <span
                                                                        aria-hidden="true"
                                                                        style={{backgroundColor: element.color.code}}
                                                                        className={'h-8 w-8 border border-black border-opacity-10 rounded-full'}
                                                                    />
                                                                </RadioGroup.Option>
                                                        </div>
                                                    </RadioGroup>
                                                </div>

                                                {/* Size picker */}
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between">
                                                        <h2 className="text-sm font-bold text-gray-900 capitalize">{trans('size')}</h2>
                                                    </div>

                                                    <RadioGroup value={selectedSize} onChange={setSelectedSize}
                                                                className="mt-4">
                                                        <RadioGroup.Label
                                                            className="sr-only">{trans('choose_size')}</RadioGroup.Label>
                                                        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">

                                                                <RadioGroup.Option
                                                                    key={element.size.name_ar}
                                                                    value={element.size_id}
                                                                    className={({active, checked}) =>
                                                                        classNames(
                                                                            element.size ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                                                                            active ? 'ring-2 ring-offset-2 ring-gray-500' : '',
                                                                            checked
                                                                                ? 'bg-gray-600 border-transparent text-white hover:bg-gray-700'
                                                                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                                                            'border rounded-md py-3 px-3 flex items-center justify-center text-xs font-medium uppercase sm:flex-1 truncate'
                                                                        )
                                                                    }
                                                                    disabled={!element.size}
                                                                >
                                                                    <RadioGroup.Label
                                                                        as="p">{element.size[getLocalized()]}</RadioGroup.Label>
                                                                </RadioGroup.Option>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                        </div>
                                }
                                <div className="flex flex-1 w-full justify-center items-center mx-auto mt-5">
                                    <span className="relative z-0 inline-flex shadow-sm rounded-md ">
                                      <button
                                          onClick={() => increaseQty()}
                                          type="button"
                                          className={classNames(locale.isRTL ? `rounded-r-md` : `rounded-l-md`, "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-lg font-bold text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500")}
                                      >
                                        +
                                      </button>
                                      <button
                                          type="button"
                                          className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xl font-bold text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                                      >
                                        {selectedQty}
                                      </button>
                                      <button
                                          type="button"
                                          onClick={() => decreaseQty()}
                                          className={classNames(locale.isRTL ? `rounded-l-md` : `rounded-r-md`, "-ml-px relative inline-flex items-center px-4 py-2  border border-gray-300 bg-white text-lg font-bold text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500")}
                                      >
                                        -
                                      </button>
                                    </span>
                                </div>
                                {/* add_to_cart_btn */}
                                <div className="flex flex-row justify-between items-center gap-x-5">
                                    {
                                        settings.enable_cart &&
                                        <form onSubmit={handleSubmit} className="w-1/2 w-auto mb-auto mt-5">
                                            <button
                                                disabled={!element.is_available || finalPrice === 0 || selectedQty < 1}
                                                type="submit"
                                                className={classNames(!element.is_available || finalPrice === 0 || selectedQty < 1 ? `opacity-30` : `bg-gray-600`, `flex flex-1 bg-gray-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 sm:w-full`)}
                                            >
                                                {trans('add_to_cart')}
                                            </button>
                                        </form>
                                    }
                                </div>
                                {
                                    settings.enable_favorites &&
                                    <ElementFavoriteBtn id={element.id} type={'product'}
                                                        favoritesList={auth?.favoritesList}/>
                                }
                                {
                                    settings.enable_whatsapp_contact &&
                                    <div className="flex flex-1 w-full mb-auto mt-5 justify-between opacity-80">
                                        <a
                                            target="_blank"
                                            href={getWhatsappLink(settings.whatsapp, `${trans('contactus_to_inquire_about_product')} ${trans('name')} : ${element[getLocalized()]} - ${trans(`sku`)} : ${element.sku}`)}
                                            className={classNames(!element.is_available ? `opacity-30` : `bg-green-950`, `btn flex flex-1 justify-between bg-green-950 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-500 sm:w-full`)}
                                        >
                                            {trans('contactus_through_whatsapp')}
                                            <FaWhatsapp size={25} className={'text-white'}/>
                                        </a>
                                    </div>
                                }
                            </div>


                        </div>
                        <div className="col-span-full">
                            <section aria-labelledby="details-heading" className="my-12 border-10">
                                <h2 id="details-heading" className="sr-only">
                                    Additional details
                                </h2>
                                <div className="border-t divide-y divide-gray-200 ">
                                    {/* description */}
                                    <Disclosure as="div" defaultOpen={true}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button
                                                    className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? 'text-gray-600' : 'text-gray-900',
                                                                  'capitalize font-bold'
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
                                                    <p className="capitalize">
                                                        {element[getLocalized('description')]}
                                                    </p>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>


                                    {/* notes */}
                                    <Disclosure as="div" defaultOpen={false}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button
                                                    className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? 'text-gray-600' : 'text-gray-900',
                                                                  'capitalize font-bold'
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
                                                    <p className='capitalize font-'>
                                                        {element[getLocalized('notes')]}
                                                    </p>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>

                                    {/* company  */}
                                    <Disclosure as="div" defaultOpen={false}>
                                        {({open}) => (
                                            <>
                                                <Disclosure.Button
                                                    className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? 'text-gray-600' : 'text-gray-900',
                                                                  'capitalize font-bold'
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
                                                                className="w-20 h-auto object-cover rounded-lg shadow-sm"
                                                                src={getThumb(element.user.image)}
                                                                alt={element.user[getLocalized()]}/>
                                                        </div>
                                                        <div className="rtl:mr-5 ltr:ml-5">
                                                            <div className="border-b border-gray-200 mb-2 pb-2">
                                                                <h4>{element.user[getLocalized()]}</h4>
                                                                <p>{element.user[getLocalized('caption')]}</p>
                                                            </div>
                                                            <p className="text-sm">{element.user[getLocalized('description')]}</p>
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

                                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 capitalize truncate">
                                    {
                                        element.direct_purchase ? <div
                                            className="flex flex-1 flex-col justify-start items-center bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                            <span
                                                className="mt-4 text-sm font-medium text-gray-900">{trans('direct_purchase')}</span>
                                            <dd className="mt-1 text-sm text-gray-500">{trans('direct_purchase')}</dd>
                                        </div> : null
                                    }
                                    {
                                        element.sku &&
                                        <div
                                            className="flex flex-1 flex-col justify-start items-center bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
                                                </svg>
                                            </div>
                                            <span
                                                className="mt-4 text-sm font-medium text-gray-900">{trans('reference_id')}</span>
                                            <dd className="mt-1 text-sm text-gray-500">{element.sku}</dd>
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
                        <RelatedItems elements={relatedElements.data} type={'product'}/>
                    }
                </div>
                {
                    element.show_size_chart && <SizeChartModal showModal={showModal} setShowModal={setShowModal}
                                                               title={trans('size_chart')}
                                                               image={element.size_chart_image && !validate.isEmpty(element.size_chart_image) ? getLarge(element.size_chart_image) : getLarge(settings.size_chart_image)}
                    />
                }
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
