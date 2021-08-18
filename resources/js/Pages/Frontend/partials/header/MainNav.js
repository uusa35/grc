import {Fragment, useContext, useState} from 'react'
import {Dialog, Popover, Tab, Transition, Disclosure, Menu,} from '@headlessui/react'
import {MenuIcon, SearchIcon, ShoppingBagIcon, XIcon} from '@heroicons/react/outline'
import {Link} from "@inertiajs/inertia-react";
import {AppContext} from "../../../context/AppContext";
import route from 'ziggy-js'
import {map, capitalize, filter, take} from 'lodash';
import GlobalContext from "../../../context/GlobalContext";
import {FaFacebook, FaInstagram, FaTwitch, FaTwitter, FaWhatsapp} from "react-icons/fa";
import {getWhatsappLink} from "../../../helpers";
import SearchField from "../SearchField";
import MainNavBookCategoriesList from "./MainNavBookCategoriesList";

const navigation = {
    categories: [
        {
            id: 'women',
            name: 'Women',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
                    imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
                },
                {
                    name: 'Basic Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
                    imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        {name: 'Tops', href: '#'},
                        {name: 'Dresses', href: '#'},
                        {name: 'Pants', href: '#'},
                        {name: 'Denim', href: '#'},
                        {name: 'Sweaters', href: '#'},
                        {name: 'T-Shirts', href: '#'},
                        {name: 'Jackets', href: '#'},
                        {name: 'Activewear', href: '#'},
                        {name: 'Browse All', href: '#'},
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        {name: 'Watches', href: '#'},
                        {name: 'Wallets', href: '#'},
                        {name: 'Bags', href: '#'},
                        {name: 'Sunglasses', href: '#'},
                        {name: 'Hats', href: '#'},
                        {name: 'Belts', href: '#'},
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        {name: 'Full Nelson', href: '#'},
                        {name: 'My Way', href: '#'},
                        {name: 'Re-Arranged', href: '#'},
                        {name: 'Counterfeit', href: '#'},
                        {name: 'Significant Other', href: '#'},
                    ],
                },
            ],
        },
        {
            id: 'men',
            name: 'Men',
            featured: [
                {
                    name: 'New Arrivals',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
                    imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
                },
                {
                    name: 'Artwork Tees',
                    href: '#',
                    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
                    imageAlt:
                        'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
                },
            ],
            sections: [
                {
                    id: 'clothing',
                    name: 'Clothing',
                    items: [
                        {name: 'Tops', href: '#'},
                        {name: 'Pants', href: '#'},
                        {name: 'Sweaters', href: '#'},
                        {name: 'T-Shirts', href: '#'},
                        {name: 'Jackets', href: '#'},
                        {name: 'Activewear', href: '#'},
                        {name: 'Browse All', href: '#'},
                    ],
                },
                {
                    id: 'accessories',
                    name: 'Accessories',
                    items: [
                        {name: 'Watches', href: '#'},
                        {name: 'Wallets', href: '#'},
                        {name: 'Bags', href: '#'},
                        {name: 'Sunglasses', href: '#'},
                        {name: 'Hats', href: '#'},
                        {name: 'Belts', href: '#'},
                    ],
                },
                {
                    id: 'brands',
                    name: 'Brands',
                    items: [
                        {name: 'Re-Arranged', href: '#'},
                        {name: 'Counterfeit', href: '#'},
                        {name: 'Full Nelson', href: '#'},
                        {name: 'My Way', href: '#'},
                    ],
                },
            ],
        },
    ],
}

const pages = [
    {name: 'home', url: route('frontend.home')},
    {name: 'books', url: route('frontend.book.index')},
    {name: 'authors', url: route('frontend.user.index')},
    // {name: 'products', url: route('frontend.product.index')},
    {name: 'services', url: route('frontend.service.index')},
    {name: 'courses', url: route('frontend.course.index')},
    // {name: 'categories', url: route('frontend.category.index')},
];


export default function MainNav() {
    const {
        classNames, getThumb, getLocalized, trans,
        setCurrency, currency, isAdminOrAbove, guest,
        baseUrl,
        otherLang, setLocale
    } = useContext(AppContext);
    const {settings, currencies, auth, categories } = useContext(GlobalContext);
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-white font-bein font-extrabold rtl:text-right ltr:text-left">
            {/* Top Nav*/}
            <div className="bg-gray-700 h-10 flex items-center justify-between text-white px-4 sm:px-6 lg:px-8">
                <div className="flex  flex-row  justify-center items-center gap-x-5">
                    <a target="_blank" href={settings.instagram}>
                        <FaInstagram size={22} className={'text-gray-400'}/>
                    </a>
                    <a target="_blank" href={settings.facebook}>
                        <FaFacebook size={22} className={'text-gray-400'}/>
                    </a>
                    <a target="_blank" href={settings.twitter}>
                        <FaTwitter size={22} className={'text-gray-400'}/>
                    </a>
                    <a target="_blank" href={getWhatsappLink(settings.whatsapp, settings[getLocalized()])}>
                        <FaWhatsapp size={22} className={'text-gray-400'}/>
                    </a>
                </div>
                <div className="flex flex-row justify-center items-center gap-x-5  divide-x divide-gray-400">
                    <Link
                        href={route('frontend.contactus')} className="-m-2 p-2 block text-gray-50 invisible sm:visible">
                        {capitalize(trans('contactus'))}
                    </Link>
                    {
                        guest ? <>
                            <Link
                                href={route('login')} className="-m-2 p-2 block text-gray-50">
                                {capitalize(trans('login'))}
                            </Link>
                            <Link
                                href={route('register')} className="-m-2 p-2 block text-gray-50 sr-only">
                                {capitalize(trans('register'))}
                            </Link>
                        </> : null
                    }
                    <Link
                        title={capitalize(trans(otherLang))}
                        onClick={() => setLocale(otherLang)}
                        href={route('frontend.change.lang', {locale: otherLang})}
                        className="-m-2 p-2 block text-gray-50">
                        {capitalize(trans(otherLang))}
                    </Link>
                </div>
            </div>
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25"/>
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div
                            className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                            <div className="px-4 pt-5 pb-2 flex">
                                <button
                                    type="button"
                                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>

                            <div className="border-t border-gray-200 py-6 px-4 space-y-6 font-bein font-extrabold">
                                {map(pages, p => (
                                    <div className="flow-root" key={p.name}>
                                        <Link
                                            href={p.url} className="-m-2 p-2 block text-gray-900">
                                            {capitalize(trans(p.name))}
                                        </Link>
                                    </div>
                                ))}
                                {
                                    guest ? <>
                                        <div className="flow-root">
                                            <Link href={route('login')} className="-m-2 p-2 block text-gray-900">
                                                {capitalize(trans('login'))}
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link href={route('register')} className="-m-2 p-2 block text-gray-900">
                                                {capitalize(trans('register'))}
                                            </Link>
                                        </div>
                                    </> : <div className="flow-root">
                                        <Link href={route('frontend.user.edit', auth.id)}
                                              className="-m-2 p-2 block text-gray-900">
                                            {capitalize(trans('my_account'))}
                                        </Link>
                                    </div>
                                }

                                <div className="flow-root">
                                    <Link
                                        onClick={() => {
                                            setLocale(otherLang)
                                        }}
                                        href={route('frontend.change.lang', {locale: otherLang})}
                                        className="flex flex-row justify-start -m-2 p-2 block text-gray-900">
                                        <img
                                            className="w-5 h-5 rounded-full  mx-2"
                                            src={`${baseUrl}images/flags/${otherLang}.png`} alt={otherLang}/>
                                        {otherLang}
                                    </Link>
                                </div>
                            </div>

                            {/* Links */}
                            <Tab.Group as="div" className="mt-2">
                                <div className="border-b border-gray-200">
                                    <Tab.List className="-mb-px flex px-4 space-x-8">
                                        {navigation.categories.map((category) => (
                                            <Tab
                                                key={category.name}
                                                className={({selected}) =>
                                                    classNames(
                                                        selected ? 'text-gray-600 border-gray-600' : 'text-gray-900 border-transparent',
                                                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                    )
                                                }
                                            >
                                                {category.name}
                                            </Tab>
                                        ))}
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {navigation.categories.map((category) => (
                                        <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                                            <div className="grid grid-cols-2 gap-x-4">
                                                {category.featured.map((item) => (
                                                    <div key={item.name} className="group relative ">
                                                        <div
                                                            className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                            <img src={item.imageSrc} alt={item.imageAlt}
                                                                 className="object-center object-cover"/>
                                                        </div>
                                                        <a href={item.href}
                                                           className="mt-6 block text-gray-900">
                                                            <span className="absolute z-10 inset-0" aria-hidden="true"/>
                                                            {item.name}
                                                        </a>
                                                        <p aria-hidden="true" className="mt-1">
                                                            Shop now
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                            {category.sections.map((section) => (
                                                <div key={section.name}>
                                                    <p id={`${category.id}-${section.id}-heading-mobile`}
                                                       className="text-gray-900">
                                                        {section.name}
                                                    </p>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                                        className="mt-6 flex flex-col space-y-6"
                                                    >
                                                        {section.items.map((item) => (
                                                            <li key={item.name} className="flow-root">
                                                                <a href={item.href}
                                                                   className="-m-2 p-2 block text-gray-500">
                                                                    {item.name}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </Tab.Panel>
                                    ))}
                                </Tab.Panels>
                            </Tab.Group>

                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>

            <header className="relative bg-black text-white py-3 max-w-full">
                <nav aria-label="Top" className="w-auto lg:w-4/5  xl:m-auto">
                    <div className="h-12 flex items-center">
                        <button
                            type="button"
                            className="p-2 rounded-md lg:hidden"
                            onClick={() => setOpen(true)}
                        >
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true"/>
                        </button>

                        {/* Logo */}
                        <div className="flex lg:ml-0 rtl:ml-5 ltr:mr-5">
                            <Link href={route('frontend.home')}>
                                {/*<span className="sr-only">{settings[getLocalized()]}</span>*/}
                                <img
                                    className="w-16 h-auto"
                                    src={getThumb(settings.image)}
                                    alt={settings[getLocalized()]}
                                />
                            </Link>
                        </div>

                        {/* Categories with sub */}
                        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="h-full flex gap-x-5">
                                <Link
                                    href={route('frontend.home')}
                                    className="flex sm:min-w-max  text-center items-center   hover:text-gray-300"
                                >
                                    {capitalize(trans('home'))}
                                </Link>
                                <Link
                                    href={route('frontend.book.index')}
                                    className="flex sm:min-w-max  text-center items-center   hover:text-gray-300"
                                >
                                    {capitalize(trans('books'))}
                                </Link>
                                <MainNavBookCategoriesList />
                                <Link
                                    href={route('frontend.user.index')}
                                    className="flex sm:min-w-max  text-center items-center   hover:text-gray-300"
                                >
                                    {capitalize(trans('authors'))}
                                </Link>
                                <Link
                                    href={route('frontend.service.index')}
                                    className="flex sm:min-w-max  text-center items-center   hover:text-gray-300"
                                >
                                    {capitalize(trans('services'))}
                                </Link>
                                <Link
                                    href={route('frontend.course.index')}
                                    className="flex sm:min-w-max  text-center items-center   hover:text-gray-300"
                                >
                                    {capitalize(trans('courses'))}
                                </Link>
                            </div>
                        </Popover.Group>

                        {/* Search */}
                        <SearchField />
                        {/* change lang */}
                        <div className="ml-auto flex items-center">
                            <div
                                className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end md:space-x-6 rtl:ml-6 ltr:mr-6">
                                <Link
                                    onClick={() => {
                                        setLocale(otherLang)
                                    }}
                                    href={route('frontend.change.lang', {locale: otherLang})}
                                    className="flex flex-row items-center hover:text-gray-300">
                                    <img
                                        className="w-5 h-5 rounded-full"
                                        src={`${baseUrl}images/flags/${otherLang}.png`} alt={otherLang}/>
                                    <span className="rtl:pr-3 ltr:pl-3">{otherLang}</span>
                                </Link>
                            </div>


                            {/* currency dropdown */}
                            <Menu as="div" className="ml-4 relative flex-shrink-0 z-50">
                                <div>
                                    <Menu.Button
                                        className="rounded-full flex items-center gap-x-2  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-5 w-5 rounded-full"
                                            src={getThumb(currency.image)}
                                            alt={currency[getLocalized()]}
                                        />
                                        {currency[getLocalized('currency_symbol')]}
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
                                    <Menu.Items
                                        className="origin-top-right absolute rtl:-mr-20 ltr:-ml-20 mt-2 w-48 shadow-lg py-1 bg-black ring-1 ring-black ring-opacity-5 focus:outline-none">

                                        {
                                            map(currencies, element => (
                                                <Menu.Item key={element[getLocalized()]}>
                                                    {({active}) => (
                                                        <button
                                                            onClick={() => setCurrency(element)}
                                                            className={classNames(active ? 'bg-gray-900' : '', 'flex flex-row w-full justify-content items-center gap-3 px-4 py-2  text-white')}
                                                        >
                                                            <img
                                                                className="h-8 w-8 rounded-full"
                                                                src={getThumb(element.image)}
                                                                alt={element[getLocalized()]}
                                                            />
                                                            {element[getLocalized()]}
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            ))
                                        }
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            {/* auth dropdown */}
                            <Menu as="div" className="ml-4 relative flex-shrink-0 z-50">
                                <div>
                                    <Menu.Button
                                        className="rounded-full flex  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <span className="sr-only">Open user menu</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
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
                                    <Menu.Items
                                        className="origin-top-right absolute rtl:-mr-40 ltr:-ml-40 mt-2 w-48 rounded-md shadow-lg py-1 bg-black text-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {
                                            isAdminOrAbove && <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href={route('backend.home')}
                                                        className={classNames(active ? 'bg-gray-800' : '', 'block px-4 py-2 ')}
                                                    >
                                                        {trans('backend')}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        }
                                        {
                                            guest ?
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <a
                                                            href={route('login')}
                                                            className={classNames(active ? 'bg-gray-800' : '', 'block px-4 py-2 ')}
                                                        >
                                                            {trans('login')}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                                :
                                                <>
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <Link
                                                                className="'group flex items-center px-4 py-2"
                                                                href={route('frontend.user.edit', auth.id)}>
                                                                {trans('my_account')}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    document.getElementById('logout-form').submit()
                                                                }}
                                                                className={classNames(
                                                                    active ? 'bg-gray-800 text-gray-50' : '',
                                                                    'group flex items-center px-4 py-2  '
                                                                )}
                                                            >{trans('logout')}</button>
                                                        )}
                                                    </Menu.Item>
                                                </>
                                        }
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6">
                                <Link href={route('frontend.cart.index')} className="group -m-2 p-2 flex items-center">
                                    <ShoppingBagIcon
                                        className="flex-shink-0 h-6 w-6 group-hover:text-gray-300"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2   group-hover:text-gray-300">0</span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </nav>
            </header>
        </div>
    )
}
