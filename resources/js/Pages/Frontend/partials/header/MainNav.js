import {Fragment, useContext, useMemo, useState} from 'react'
import {Dialog, Popover, Tab, Transition, Disclosure, Menu,} from '@headlessui/react'
import {
    MenuIcon,
    ShoppingBagIcon,
    XIcon
} from '@heroicons/react/outline'
import {Link} from "@inertiajs/inertia-react";
import {AppContext} from "../../../context/AppContext";
import route from 'ziggy-js'
import {map, capitalize, take, filter, isEmpty} from 'lodash';
import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube} from "react-icons/fa";
import {getWhatsappLink} from "../../../helpers";
import SearchField from "../SearchField";
import MainNavBookCategoriesList from "./MainNavBookCategoriesList";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {useDispatch, useSelector} from "react-redux";
import {changeLang, setCurrency, setParentModule} from "../../../redux/actions";
import GlobalContext from "../../../context/GlobalContext";
import {motion} from "framer-motion"
import CartIndex from "../../Cart/CartIndex";
import CartIndexOrderSummary from "../../Cart/CartIndexOrderSummary";
import NoElements from "../../../Backend/components/widgets/NoElements";


const pages = [
    {name: 'home', url: route('frontend.home')},
    {name: 'books', url: route('frontend.book.index')},
    {name: 'authors', url: route('frontend.user.index')},
    // {name: 'products', url: route('frontend.product.index')},
    {name: 'services', url: route('frontend.service.index')},
    {name: 'courses', url: route('frontend.course.index')},
    {name: 'subscriptions', url: route('frontend.subscriptions')},
    // {name: 'categories', url: route('frontend.category.index')},
];

export default function MainNav() {
    const {
        classNames, getThumb, getLocalized, trans,
        baseUrl,
        isAdminOrAbove,
        guest,
        arFont, enFont,
    } = useContext(AppContext);
    const {auth, settings, currencies, categories} = useContext(GlobalContext);
    const {locale, currency, cart, parentModule} = useSelector(state => state);
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch();

    console.log('categories', categories);
    return (
        <div className="bg-white rtl:text-right ltr:text-left">
            {/* Top Nav*/}
            <div className="bg-gray-700 h-10 flex items-center justify-between text-white px-4 sm:px-6 lg:px-8">
                <div className="flex  flex-row  justify-center items-center gap-x-5">
                    {
                        settings.instagram && <a target="_blank" href={settings.instagram}>
                            <FaInstagram size={22} className={'text-gray-400'}/>
                        </a>
                    }
                    {
                        settings.facebook && <a target="_blank" href={settings.facebook}>
                            <FaFacebook size={22} className={'text-gray-400'}/>
                        </a>
                    }
                    {
                        settings.twitter && <a target="_blank" href={settings.twitter}>
                            <FaTwitter size={22} className={'text-gray-400'}/>
                        </a>
                    }
                    {
                        settings.youtube && <a target="_blank" href={settings.youtube}>
                            <FaYoutube size={22} className={'text-gray-400'}/>
                        </a>
                    }
                    {
                        settings.whatsapp &&
                        <a target="_blank" href={getWhatsappLink(settings.whatsapp, settings[getLocalized()])}>
                            <FaWhatsapp size={22} className={'text-gray-400'}/>
                        </a>
                    }
                </div>
                <div className="flex flex-row justify-center items-center gap-x-5  divide-x divide-gray-400">
                    {
                        settings.enable_subscriptions ? <Link
                            href={route('frontend.subscriptions')}
                            className="-m-2 p-2 block text-gray-50 invisible sm:visible">
                            {capitalize(trans('subscriptions'))}
                        </Link> : null
                    }
                    <Link
                        href={route('frontend.contactus')} className="-m-2 p-2 block text-gray-50 invisible sm:visible">
                        {capitalize(trans('contactus'))}
                    </Link>
                    <Link
                        title={capitalize(trans(locale.otherLang))}
                        onClick={() => dispatch(changeLang(locale.otherLang))}
                        href={route('frontend.change.lang', {lang: locale.otherLang})}
                        className="-m-2 p-2 block text-gray-50">
                        {capitalize(trans(locale.otherLang))}
                    </Link>
                    {
                        guest ? <>
                            <a
                                href={route('login')} className="-m-2 p-2 block text-gray-50">
                                {capitalize(trans('login'))}
                            </a>
                            <a
                                href={route('register')} className="-m-2 p-2 block text-gray-50 sr-only">
                                {capitalize(trans('register'))}
                            </a>
                        </> : null
                    }
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
                            className={classNames(locale.isRTL ? arFont : enFont, "relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto")}
                            dir={locale.dir}>
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

                            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                                <div className="flow-root">
                                    <Link
                                        href={route('frontend.home')}
                                        className="-m-2 p-2 block text-gray-900 capitalize ">
                                        {capitalize(trans('home'))}
                                    </Link>
                                </div>
                                {
                                    settings.enable_books && <div className="flow-root">
                                        <Link
                                            href={route('frontend.book.index')}
                                            className="-m-2 p-2 block text-gray-900 capitalize ">
                                            {capitalize(trans('books'))}
                                        </Link>
                                    </div>
                                }
                                {
                                    settings.enable_books && <div className="flow-root">
                                        <Link
                                            href={route('frontend.user.index')}
                                            className="-m-2 p-2 block text-gray-900 capitalize ">
                                            {capitalize(trans('authors'))}
                                        </Link>
                                    </div>
                                }
                                {
                                    settings.enable_services && <div className="flow-root">
                                        <Link
                                            href={route('frontend.service.index')}
                                            className="-m-2 p-2 block text-gray-900 capitalize ">
                                            {capitalize(trans('services'))}
                                        </Link>
                                    </div>
                                }
                                {
                                    settings.enable_courses && <div className="flow-root">
                                        <Link
                                            href={route('frontend.course.index')}
                                            className="-m-2 p-2 block text-gray-900 capitalize ">
                                            {capitalize(trans('courses'))}
                                        </Link>
                                    </div>
                                }
                                {
                                    settings.enable_subscriptions && <div className="flow-root">
                                        <Link
                                            href={route('frontend.subscription.index')}
                                            className="-m-2 p-2 block text-gray-900 capitalize ">
                                            {capitalize(trans('subscriptions'))}
                                        </Link>
                                    </div>
                                }
                                {
                                    settings.enable_products && <div className="flow-root">
                                        <Link
                                            href={route('frontend.product.index')}
                                            className="-m-2 p-2 block text-gray-900 capitalize ">
                                            {capitalize(trans('products'))}
                                        </Link>
                                    </div>
                                }
                                {
                                    guest ? <>
                                        <div className="flow-root">
                                            <Link href={route('login')}
                                                  className="-m-2 p-2 block text-gray-900 capitalize ">
                                                {capitalize(trans('login'))}
                                            </Link>
                                        </div>
                                        <div className="flow-root">
                                            <Link href={route('register')}
                                                  className="-m-2 p-2 block text-gray-900 capitalize">
                                                {capitalize(trans('register'))}
                                            </Link>
                                        </div>
                                    </> : <div className="flow-root">
                                        <Link href={route('frontend.user.edit', auth.id)}
                                              className="-m-2 p-2 block text-gray-900 capitalize">
                                            {capitalize(trans('my_account'))}
                                        </Link>
                                    </div>
                                }
                                <div className="flow-root">
                                    <Link
                                        onClick={() => {
                                            dispatch(changeLang(locale.otherLang))
                                        }}
                                        href={route('frontend.change.lang', {lang: locale.otherLang})}
                                        className="flex flex-row justify-start -m-2 p-2 block text-gray-900 capitalize">
                                        <img
                                            className="w-5 h-5 rounded-full  mx-2"
                                            src={`${baseUrl}images/flags/${locale.otherLang}.png`}
                                            alt={locale.otherLang}/>
                                        {locale.otherLang}
                                    </Link>
                                </div>
                            </div>

                            {/* Links */}
                            <Tab.Group as="div" className="mt-2">
                                <div className="border-b border-gray-200">
                                    <Tab.List className="-mb-px flex px-4 space-x-8">
                                        {
                                            settings.enable_books && <Tab
                                                className={({selected}) =>
                                                    classNames(
                                                        selected ? 'text-gray-600 border-gray-600' : 'text-gray-900 capitalize border-transparent',
                                                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                    )
                                                }
                                            >
                                                {trans("book_categories")}
                                            </Tab>
                                        }
                                        {
                                            settings.enable_products && <Tab
                                                className={({selected}) =>
                                                    classNames(
                                                        selected ? 'text-gray-600 border-gray-600' : 'text-gray-900 capitalize border-transparent',
                                                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                    )
                                                }
                                            >
                                                {trans("product_categories")}
                                            </Tab>
                                        }
                                        {
                                            settings.enable_cart && <Tab
                                                className={({selected}) =>
                                                    classNames(
                                                        selected ? 'text-gray-600 border-gray-600' : 'text-gray-900 capitalize border-transparent',
                                                        'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                                                    )
                                                }
                                            >
                                                {trans('shopping_cart')}
                                            </Tab>
                                        }
                                    </Tab.List>
                                </div>
                                <Tab.Panels as={Fragment}>
                                    {/* books categories */}
                                    {settings.enable_books && <Tab.Panel
                                        className="pt-10 pb-8 px-4 space-y-10 capitalize">
                                        {map(filter(categories, c => c.is_book), parent => (
                                            <div className="grid grid-cols-1 gap-x-4" key={parent[getLocalized()]}>
                                                <div key={parent[getLocalized()]} className="group relative ">
                                                    <div
                                                        className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                        <img src={getThumb(parent.image)} alt={parent[getLocalized()]}
                                                             className="object-center object-cover"/>
                                                    </div>
                                                    <Link href={route('frontend.book.index', {category_id: parent.id})}
                                                          className="mt-6 block text-gray-900 capitalize">
                                                        <span className="absolute z-10 inset-0" aria-hidden="true"/>
                                                        {parent[getLocalized()]}
                                                    </Link>
                                                    <p aria-hidden="true" className="mt-1 capitalize truncate">
                                                        {parent[getLocalized('caption')]}
                                                    </p>
                                                </div>
                                                {map(filter(parent.children, c => c.is_book), sub => (
                                                    <div key={sub[getLocalized()]} className="gap-y-5 space-y-2 my-3">
                                                        <Link
                                                            href={route('frontend.book.index', {category_id: sub.id})}
                                                            className="-m-2 p-2 flex flex-1 flex-row items-center justify-start space-x-5 text-gray-500">
                                                            <img src={getThumb(sub.image)} alt=""
                                                                 className="h-10 w-10 rounded-sm mx-2"/>
                                                            {sub[getLocalized()]}
                                                        </Link>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${parent.id}-${sub.id}-heading-mobile`}
                                                            className="flex flex-col"
                                                        >
                                                            {map(filter(sub.children, c => c.is_book), child =>
                                                                <li key={child[getLocalized()]} className="flow-root">
                                                                    <Link
                                                                        href={route('frontend.book.index', {category_id: child.id})}
                                                                        className="-m-2 p-2 flex flex-1 flex-row items-center justify-start text-gray-500 rtl:mr-10 ltr:ml-10">
                                                                        <img src={getThumb(child.image)} alt=""
                                                                             className="h-10 w-10 rounded-sm mx-3"/>
                                                                        {child[getLocalized()]}
                                                                    </Link>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>

                                        ))}
                                    </Tab.Panel>}
                                    {/* product categories */}
                                    {settings.enable_products && <Tab.Panel
                                        className="pt-10 pb-8 px-4 space-y-10 capitalize">
                                        {map(filter(categories, c => c.is_product), parent => (
                                            <div className="grid grid-cols-1 gap-x-4" key={parent[getLocalized()]}>
                                                <div key={parent[getLocalized()]} className="group relative ">
                                                    <div
                                                        className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                        <img src={getThumb(parent.image)} alt={parent[getLocalized()]}
                                                             className="object-center object-cover"/>
                                                    </div>
                                                    <Link href={route('frontend.book.index', {category_id: parent.id})}
                                                          className="mt-6 block text-gray-900 capitalize">
                                                        <span className="absolute z-10 inset-0" aria-hidden="true"/>
                                                        {parent[getLocalized()]}
                                                    </Link>
                                                    <p aria-hidden="true" className="mt-1 capitalize truncate">
                                                        {parent[getLocalized('caption')]}
                                                    </p>
                                                </div>
                                                {map(filter(parent.children, c => c.is_product), sub => (
                                                    <div key={sub[getLocalized()]} className="gap-y-5 space-y-2 my-3">
                                                        <Link
                                                            href={route('frontend.book.index', {category_id: sub.id})}
                                                            className="-m-2 p-2 flex flex-1 flex-row items-center justify-start space-x-5 text-gray-500">
                                                            <img src={getThumb(sub.image)} alt=""
                                                                 className="h-10 w-10 rounded-sm mx-2"/>
                                                            {sub[getLocalized()]}
                                                        </Link>
                                                        <ul
                                                            role="list"
                                                            aria-labelledby={`${parent.id}-${sub.id}-heading-mobile`}
                                                            className="flex flex-col"
                                                        >
                                                            {map(filter(sub.children, c => c.is_product), child =>
                                                                <li key={child[getLocalized()]} className="flow-root">
                                                                    <Link
                                                                        href={route('frontend.book.index', {category_id: child.id})}
                                                                        className="-m-2 p-2 flex flex-1 flex-row items-center justify-start text-gray-500 rtl:mr-10 ltr:ml-10">
                                                                        <img src={getThumb(child.image)} alt=""
                                                                             className="h-10 w-10 rounded-sm mx-3"/>
                                                                        {child[getLocalized()]}
                                                                    </Link>
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>

                                        ))}
                                    </Tab.Panel>}
                                    {
                                        settings.enable_cart &&
                                        <Tab.Panel
                                            className="pt-10 pb-8 px-4 space-y-10 capitalize">
                                            {
                                                isEmpty(cart.items) ?  <NoElements display={isEmpty(cart.items)}/> : <CartIndexOrderSummary/>
                                            }
                                        </Tab.Panel>
                                    }
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
                        <motion.div
                            whileHover={{scale: 0.9}}
                        >
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
                        </motion.div>

                        {/* Categories with sub */}
                        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="h-full flex gap-x-5">
                                <Link
                                    href={route('frontend.home')}
                                    onClick={() => dispatch(setParentModule('home'))}
                                    className={classNames(parentModule == 'home' ? `border-b border-hippie-blue-500` : ``, "flex sm:min-w-max  text-center items-center   hover:text-gray-300 hover:bg-gray-900 hover:rounded-sm capitalize")}
                                >
                                    {capitalize(trans('home'))}
                                </Link>
                                {
                                    settings.enable_products && <Link
                                        href={route('frontend.product.index')}
                                        onClick={() => dispatch(setParentModule('product'))}
                                        className={classNames(parentModule == 'product' ? `border-b border-hippie-blue-500` : ``, "flex sm:min-w-max  text-center items-center   hover:text-gray-300 capitalize")}
                                    >
                                        {capitalize(trans('products'))}
                                    </Link>
                                }
                                {
                                    settings.enable_books && <Link
                                        href={route('frontend.book.index')}
                                        onClick={() => dispatch(setParentModule('book'))}
                                        className={classNames(parentModule == 'book' ? `border-b border-hippie-blue-500` : ``, "flex sm:min-w-max  text-center items-center   hover:text-gray-300 capitalize")}
                                    >
                                        {capitalize(trans('books'))}
                                    </Link>
                                }
                                {
                                    settings.enable_books && <MainNavBookCategoriesList categories={categories} type='book'/>
                                }
                                {
                                    settings.enable_products && <MainNavBookCategoriesList categories={categories} type='product'/>
                                }
                                {
                                    settings.enable_books && <Link
                                        href={route('frontend.user.index')}
                                        onClick={() => dispatch(setParentModule('user'))}
                                        className={classNames(parentModule == 'user' ? `border-b border-hippie-blue-500` : ``, "flex sm:min-w-max  text-center items-center   hover:text-gray-300 capitalize")}
                                    >
                                        {capitalize(trans('authors'))}
                                    </Link>
                                }
                                {
                                    settings.enable_services && <Link
                                        href={route('frontend.service.index')}
                                        onClick={() => dispatch(setParentModule('service'))}
                                        className={classNames(parentModule == 'service' ? `border-b border-hippie-blue-500` : ``, "flex sm:min-w-max  text-center items-center   hover:text-gray-300 capitalize")}
                                    >
                                        {capitalize(trans('services'))}
                                    </Link>
                                }
                                {
                                    settings.enable_courses && <Link
                                        href={route('frontend.course.index')}
                                        onClick={() => dispatch(setParentModule('course'))}
                                        className={classNames(parentModule == 'course' ? `border-b border-hippie-blue-500` : ``, "flex sm:min-w-max  text-center items-center   hover:text-gray-300 capitalize")}
                                    >
                                        {capitalize(trans('courses'))}
                                    </Link>
                                }

                                {/*     pages */}
                                <Popover className="relative flex justify-center">
                                    {({open}) => (
                                        <>
                                            <Popover.Button
                                                className={classNames(
                                                    parentModule == 'contactus' || parentModule == 'subscriptions' || parentModule == 'polices' || parentModule == 'terms' || parentModule == 'aboutus' || parentModule == 'faqs'
                                                        ? 'border-b border-hippie-blue-500 pb-2'
                                                        : 'text-white',
                                                    'text-white group inline-flex items-center text-white font-extrabold capitalize'
                                                )}
                                            >
                                                <span>{trans('pages')}</span>
                                                <ChevronDownIcon
                                                    className={classNames(
                                                        open ? 'text-white' : 'text-white',
                                                        'rtl:mr-2 ltr:ml-2 w-5 group-hover:text-gray-100'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Popover.Button>

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-200"
                                                enterFrom="opacity-0 translate-y-1"
                                                enterTo="opacity-100 translate-y-0"
                                                leave="transition ease-in duration-150"
                                                leaveFrom="opacity-100 translate-y-0"
                                                leaveTo="opacity-0 translate-y-1"
                                            >
                                                <Popover.Panel
                                                    className="absolute top-full text-gray-500 z-50 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                                                    <div
                                                        className="z-80 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                        <div
                                                            className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                            {/* subscriptioins page*/}
                                                            {
                                                                settings.enable_subscriptions && <Link
                                                                    href={route('frontend.subscriptions')}
                                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 capitalize"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         className="h-6 w-6 text-gray-800"
                                                                         viewBox="0 0 20 20" fill="currentColor">
                                                                        <path
                                                                            d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/>
                                                                        <path fillRule="evenodd"
                                                                              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                                                              clipRule="evenodd"/>
                                                                    </svg>
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p className="text-base font-medium text-gray-900 capitalize">{trans('subscriptions')}</p>
                                                                    </div>
                                                                </Link>
                                                            }

                                                            {/* contact us page */}
                                                            <Link
                                                                href={route('frontend.contactus')}
                                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 capitalize"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     className="h-6 w-6 text-gray-800" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                                                                </svg>
                                                                <div className="ltr:ml-5 rtl:mr-5">
                                                                    <p className="text-base font-medium text-gray-900 capitalize">{trans('contactus')}</p>
                                                                </div>
                                                            </Link>

                                                            <Link
                                                                href={route('frontend.aboutus')}
                                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 capitalize"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     className="h-6 w-6 text-gray-800" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                                                                    <path
                                                                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                                                                </svg>
                                                                <div className="ltr:ml-5 rtl:mr-5">
                                                                    <p className="text-base font-medium text-gray-900 capitalize">{trans('aboutus')}</p>
                                                                </div>
                                                            </Link>

                                                            {settings[getLocalized('services')] && settings[getLocalized('services')].length > 50 ? <Link
                                                                href={route('frontend.services')}
                                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 capitalize"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     className="h-6 w-6 text-gray-800" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                                                </svg>
                                                                <div className="ltr:ml-5 rtl:mr-5">
                                                                    <p className="text-base font-medium text-gray-900 capitalize">{trans('our_services')}</p>
                                                                </div>
                                                            </Link> : null
                                                            }

                                                            {settings[getLocalized('policy')] && settings[getLocalized('policy')].length > 50 ? <Link
                                                                href={route('frontend.polices')}
                                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 capitalize"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     className="h-6 w-6 text-gray-800" fill="none"
                                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          strokeWidth={2}
                                                                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                                                                </svg>
                                                                <div className="ltr:ml-5 rtl:mr-5">
                                                                    <p className="text-base font-medium text-gray-900 capitalize">{trans('polices')}</p>
                                                                </div>
                                                            </Link> : null
                                                            }
                                                            {
                                                                settings[getLocalized('terms')] && settings[getLocalized('terms')].length > 50 ? <Link
                                                                    href={route('frontend.terms')}
                                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 capitalize"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         className="h-6 w-6 text-gray-800" fill="none"
                                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round"
                                                                              strokeLinejoin="round"
                                                                              strokeWidth={2}
                                                                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                                                                    </svg>
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p className="text-base font-medium text-gray-900 capitalize">{trans('terms')}</p>
                                                                    </div>
                                                                </Link> : null
                                                            }
                                                            {
                                                                settings.enable_faqs ? <Link
                                                                    href={route('frontend.faqs')}
                                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 capitalize"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         className="h-6 w-6 text-gray-800" fill="none"
                                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                                              strokeWidth={2}
                                                                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                                    </svg>
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p className="text-base font-medium text-gray-900 capitalize">{trans('faqs')}</p>
                                                                    </div>
                                                                </Link> : null
                                                            }
                                                            {
                                                                settings.enable_joinus ? <Link
                                                                    href={route('frontend.joinus')}
                                                                    className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 capitalize"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         className="h-6 w-6 text-gray-800" fill="none"
                                                                         viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                                              strokeWidth={2}
                                                                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                                    </svg>
                                                                    <div className="ltr:ml-5 rtl:mr-5">
                                                                        <p className="text-base font-medium text-gray-900 capitalize">{trans('joinus')}</p>
                                                                    </div>
                                                                </Link> : null
                                                            }
                                                        </div>
                                                    </div>
                                                </Popover.Panel>
                                            </Transition>
                                        </>
                                    )}
                                </Popover>
                            </div>
                        </Popover.Group>

                        {/* Search */}
                        {settings.enable_books && <SearchField type={'book'}/>}
                        { settings.enable_products && <SearchField type={'product'}/>}
                        {/* change lang */}
                        <div className="ml-auto flex items-center">
                            <div
                                className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end md:space-x-6 rtl:ml-6 ltr:mr-6">
                                <Link
                                    onClick={() => {
                                        dispatch(changeLang(locale.otherLang))
                                    }}
                                    href={route('frontend.change.lang', {lang: locale.otherLang})}
                                    className="flex flex-row items-center hover:text-gray-300">
                                    <img
                                        className="w-5 h-5 rounded-full"
                                        src={`${baseUrl}images/flags/${locale.otherLang}.png`} alt={locale.otherLang}/>
                                    <span className="rtl:pr-3 ltr:pl-3">{locale.otherLang}</span>
                                </Link>
                            </div>


                            {/* currency dropdown */}
                            {settings.enable_prices ? <Menu as="div" className="ml-4 relative flex-shrink-0 z-50">
                                <div>
                                    <Menu.Button
                                        className="flex items-center gap-x-2  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-5 w-5 rounded-full object-cover"
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
                                                            onClick={() => dispatch(setCurrency(element))}
                                                            className={classNames(active ? 'bg-gray-900' : '', 'flex flex-row w-full justify-content items-center gap-3 px-4 py-2  text-white')}
                                                        >
                                                            <img
                                                                className="h-5 w-5 rounded-full object-cover"
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
                            </Menu> : null}

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
                                        className="origin-top-right absolute rtl:-mr-48 ltr:-ml-48 mt-2 w-48 rounded-md shadow-lg py-1 bg-black text-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                                                    'group flex w-full items-center px-4 py-2 '
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
                            {
                                settings.enable_cart && <div className="ml-4 flow-root lg:ml-6">
                                    <Link href={route('frontend.cart.index')}
                                          className="group -m-2 p-2 flex items-center">
                                        <ShoppingBagIcon
                                            className="flex-shink-0 h-6 w-6 group-hover:text-gray-300"
                                            aria-hidden="true"
                                        />
                                        <span
                                            className="inline-flex items-center justify-center p-2 h-6 w-6 rounded-full text-sm font-medium bg-red-900 text-gray-50 group-hover:text-gray-300">
                                            {cart.totalItems}
                                          </span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>

                </nav>
            </header>
        </div>
    )
}
