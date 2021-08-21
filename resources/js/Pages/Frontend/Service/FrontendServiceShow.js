/*
  This example requires Tailwind CSS v2.0+

  This example requires some changes to your config:

  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')

  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          orange: colors.orange,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import {Fragment, useContext, useEffect, useState} from 'react'
import {Dialog, Disclosure, Popover, RadioGroup, Tab, Transition, Menu} from '@headlessui/react'
import {
    HeartIcon,
    MenuIcon,
    MinusSmIcon,
    PlusSmIcon,
    ChevronDownIcon
} from '@heroicons/react/outline'
import {StarIcon} from '@heroicons/react/solid'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "../components/FrontendContainer";
import {map, isEmpty, first} from 'lodash';
import {getConvertedFinalPrice} from "../../helpers";
import ElementPrice from "../components/widgets/ElementPrice";
import moment from "moment";


const product = {
    name: 'Zip Tote Basket',
    price: '$140',
    rating: 4,
    images: [
        {
            id: 1,
            name: 'Angled view',
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
            alt: 'Angled front view with bag zipped and handles upright.',
        },
        // More images...
    ],
    colors: [
        {name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700'},
        {name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400'},
        {name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500'},
    ],
    description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertable straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable cavnas construction keeps your goods protected for all-day use.</p>
  `,
    details: [
        {
            name: 'Features',
            items: [
                'Multiple strap configurations',
                'Spacious interior with top zip',
                'Leather handle and tabs',
                'Interior dividers',
                'Stainless strap loops',
                'Double stitched construction',
                'Water-resistant',
            ],
        },
        // More sections...
    ],
}
const relatedProducts = [
    {
        id: 1,
        name: 'Zip Tote Basket',
        color: 'White and black',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg',
        imageAlt: 'Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.',
        price: '$140',
    },
    // More products...
]

export default function FrontendServiceShow({element}) {
    const {currency, getThumb, getLocalized, trans, classNames, locale } = useContext(AppContext)
    const [open, setOpen] = useState(false)
    const[selectedTiming, setSelectedTiming] = useState('');
    const [selectedColor, setSelectedColor] = useState(product.colors[0])


    useEffect(() => {
        moment.locale(locale);
    },[])

    console.log('the element', element.timings)
    console.log('selected', selectedTiming);
    console.log('selected', moment(`${element.timings[0].date} ${element.timings[0].start}`).format('L HH:mm A'))
    return (
        <FrontendContainer mainModule={'service'} subModule={element[getLocalized()]}>
            <div className="max-w-2xl mx-auto lg:max-w-none my-10">
                {/* Product */}
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image gallery */}
                    {/* Image gallery */}
                    <Tab.Group as="div" className="flex flex-col-reverse">
                        {/* Image selector */}
                        <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                            <Tab.List className="grid grid-cols-4 gap-6">
                                {map(element.images, img => (
                                    <Tab
                                        key={img.id}
                                        className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                                    >
                                        {({selected}) => (
                                            <>
                                                <span className="sr-only">{element[getLocalized()]}</span>
                                                <span className="absolute inset-0 rounded-md overflow-hidden">
                                                  <img src={getThumb(img.image)} alt=""
                                                       className="w-full h-full object-center object-cover"/>
                                                </span>
                                                <span
                                                    className={classNames(
                                                        selected ? 'ring-gray-500' : 'ring-transparent',
                                                        'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Tab>
                                ))}
                            </Tab.List>
                        </div>

                        <Tab.Panels className="w-full h-auto">
                            {map(element.images, img => (
                                <Tab.Panel key={img.id}>
                                    <img
                                        src={getThumb(img.image)}
                                        alt={img.alt}
                                        className="w-full h-full object-center object-cover sm:rounded-lg"
                                    />
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>

                    {/* Product info */}
                    <div className="ml-5 mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{element[getLocalized()]}</h1>
                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <ElementPrice price={element.price} salePrice={element.sale_price}
                                          isOnSale={element.isOnSale} large={true}/>
                        </div>

                        {/* Reviews */}
                        <div className="mt-3">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={classNames(
                                                element.rating > rating ? 'text-gold-900' : 'text-gray-300',
                                                'h-5 w-5 flex-shrink-0 hover:text-gold-900'
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">{element.rating} out of 5 stars</p>
                            </div>
                        </div>

                        {
                            element[getLocalized()] && <div className="mt-6">
                                <h3 className="sr-only">{trans('caption')}</h3>
                                <div
                                    className="text-base text-gray-700 space-y-6"
                                >{element[getLocalized('caption')]}</div>
                            </div>
                        }

                        <div className="mt-6">
                            {/* Colors */}
                            {
                                element.color || element.has_attributes && <div>
                                    <h3 className="text-sm text-gray-600">{trans('colors')}</h3>

                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>

                                        <>
                                            {element.has_attributes && <div className="flex items-center space-x-3">
                                                {map(element.colors, color => (
                                                    <RadioGroup.Option
                                                        key={color.name}
                                                        value={color}
                                                        className={({active, checked}) =>
                                                            classNames(
                                                                color.selectedColor,
                                                                active && checked ? 'ring ring-offset-1' : '',
                                                                !active && checked ? 'ring-2' : '',
                                                                '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                            )
                                                        }
                                                    >
                                                        <RadioGroup.Label as="p" className="sr-only">
                                                            {color.name}
                                                        </RadioGroup.Label>
                                                        <span
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                color.bgColor,
                                                                'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                            )}
                                                        />
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                            }
                                        </>
                                    </RadioGroup>
                                </div>
                            }

                            {/* service timings */}
                            <Menu as="div" className="relative inline-block text-left mb-5 w-full my-10 ">
                                <div>
                                    <Menu.Button className="flex flex-1 justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                        {selectedTiming ? moment(`${selectedTiming.date} ${selectedTiming.start}`).format('dddd : L - HH:mm A')  : trans('available_timings')}
                                        <ChevronDownIcon className="mx-10 ml-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {
                                                map(element.timings, t =>
                                                    <Menu.Item key={t.id}>
                                                            <div
                                                                onClick={() => setSelectedTiming(t)}
                                                                className={classNames(
                                                                    t.id === selectedTiming.id ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                <div className="flex flex-1 justify-between items-center">
                                                                    <div className="flex flex-1 w-1/3">
                                                                        {`${moment(t.date).format('dddd')} ${trans('equivalent')}  ${moment(t.date).format('L')}`}
                                                                    </div>
                                                                    <div className="flex flex-1 justify-between items-center">
                                                                        <div className="flex">
                                                                            {`${trans('from')} ${moment(`${t.date} ${t.start}`).format('HH:mm A')}`}
                                                                        </div>
                                                                        <div className="flex">
                                                                            {`${trans('to')} ${moment(`${t.date} ${t.end}`).format('HH:mm A')}`}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </Menu.Item>
                                                )
                                            }
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            <div className="flex flex-row justify-between items-center">
                                <button
                                    className={classNames(`flex max-w-xs flex-1 bg-gray-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 sm:w-full`)}
                                >
                                    {trans('add_to_cart')}
                                </button>
                                <button
                                    type="button"
                                    className="flex ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                                >
                                    <HeartIcon fill="white" className="h-6 w-6 flex-shrink-0 text-red-900"
                                               aria-hidden="true"/>
                                    <span className="sr-only">Add to favorites</span>
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="details-heading" className="mt-12">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>

                            <div className="border-t divide-y divide-gray-200 ">

                                <Disclosure as="div" key={element[getLocalized()]} defaultOpen={true}>
                                    {({open}) => (
                                        <>
                                            <h3>
                                                <Disclosure.Button
                                                    className="group relative w-full py-6 flex justify-between items-center text-left">
                                                          <span
                                                              className={classNames(
                                                                  open ? 'text-gray-600' : 'text-gray-900',
                                                                  'text-sm font-medium'
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
                                            </h3>
                                            <Disclosure.Panel as="div" className="pb-6 prose prose-sm">
                                                <p>
                                                    {element[getLocalized('description')]}
                                                </p>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </section>
                    </div>
                </div>

                <section aria-labelledby="related-heading"
                         className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0">
                    <h2 id="related-heading" className="text-xl font-bold text-gray-900">
                        Customers also bought
                    </h2>

                    <div
                        className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                        {relatedProducts.map((product) => (
                            <div key={product.id}>
                                <div className="relative">
                                    <div className="relative w-full h-72 rounded-lg overflow-hidden">
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="w-full h-full object-center object-cover"
                                        />
                                    </div>
                                    <div className="relative mt-4">
                                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                    </div>
                                    <div
                                        className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                        />
                                        <p className="relative text-lg font-semibold text-white">{product.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </FrontendContainer>
    )
}
