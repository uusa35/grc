import {useContext, useMemo, useState} from 'react'
import {Disclosure} from '@headlessui/react'
import {
    MinusSmIcon,
    PlusSmIcon,
} from '@heroicons/react/outline'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "../components/FrontendContainer";
import {map, isNull} from 'lodash';
import ElementTags from "../components/widgets/ElementTags";
import RelatedItems from "../components/widgets/RelatedItems";
import ImageGallery from 'react-image-gallery';
import ElementRating from "../components/widgets/ElementRating";
import {isMobile} from "react-device-detect";
import {useDispatch, useSelector} from "react-redux";
import GlobalContext from "../../context/GlobalContext";
import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import FrontendContentContainer from "../components/FrontendContentContainer";
import SocialIconShare from "../partials/SocialIconShare";


export default function({element}) {
    const {getThumb, getLarge, getLocalized, trans, classNames, mainColor } = useContext(AppContext)
    const [selectedTiming, setSelectedTiming] = useState();
    const [currentImages, setCurrentImages] = useState([]);
    const {settings} = useContext(GlobalContext);
    const {cart} = useSelector(state => state);
    const dispatch = useDispatch();

    useMemo(() => {
        const images = [{thumbnail: getThumb(element.image), original: getLarge(element.image)}]
        map(element.images, img => {
            images.push({thumbnail: getThumb(img.image), original: getLarge(img.image)})
        })
        setCurrentImages(images);
    }, [element])

    return (
        <FrontendContainer>
            <SubMetaElement title={element[getLocalized()]}
                            description={element[getLocalized('description')]}
                            image={element.image}
            />
            <FrontendContentContainer childName={element[getLocalized()]} parentModuleName={'authors'}>
                <div className="max-w-2xl mx-auto lg:max-w-none mt-10 h-full">
                    {/* Product */}
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-4 lg:px-4 lg:items-start">
                        {/* Image gallery */}
                        <div className="relative">
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
                        <div className="mx-5 mt-10 sm:px-0 sm:mt-16 lg:mt-0">
                            <h1 className={`text-3xl font-extrabold tracking-tight text-${mainColor}-900 dark:text-${mainColor}-100`}>{element[getLocalized()]}</h1>
                            {/* Reviews */}
                            {element.ratings &&
                            <ElementRating ratings={element.ratings} id={element.id} type={'user'}/>}
                            <div className="flex flex-1 flex-col sm:flex-row justify-between items-center">
                                <div className="flex flex-1">
                                    {
                                        element[getLocalized('caption')] && <div className="mt-6">
                                            <h3 className="sr-only">{trans('caption')}</h3>
                                            <div
                                                className={`text-base text-${mainColor}-800 dark:text-${mainColor}-100 space-y-6`}
                                            >{element[getLocalized('caption')]}</div>
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
                                    {!isNull(element[getLocalized('description')]) && element[getLocalized('description')] && element[getLocalized('description')].length > 5 ?
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
                                                        <p className="capitalize">
                                                            {element[getLocalized('description')]}
                                                        </p>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure> : null}
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
