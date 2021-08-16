import React, {Fragment, useMemo, useState} from 'react'
import {Dialog, Disclosure, Transition, Menu} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import {ChevronDownIcon, FilterIcon, MinusSmIcon, PlusSmIcon, ViewGridIcon} from '@heroicons/react/solid'
import FrontendContainer from "../components/FrontendContainer";
import {AiOutlineSortAscending} from "react-icons/ai";
import {map, orderBy} from 'lodash';
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import route from 'ziggy-js';
import {Link} from "@inertiajs/inertia-react";
import NormalUserWidget from "../components/widgets/user/NormalUserWidget";
import Pagination from "../../Backend/components/partials/Pagination";
import NoElements from "../../Backend/components/widgets/NoElements";
import {FaFacebook} from "react-icons/fa";

export default function FrontendUserIndex({elements, categories}) {
    const {
        trans, getLocalized, classNames, parentModule, handleSort, colName,
        isRTL ,
        sortDesc,
    } = useContext(AppContext);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const {params} = route();
    const [currentData, setCurrentData] = useState();
    const sortOptions = [
        {name: 'alphabetical_a_to_z', current: false, colName: getLocalized()},
        {name: 'new_to_old', current: false, colName: 'id'},
    ]

    useMemo(() => {
        if (!currentData) {
            setCurrentData(elements.data);
        }
    }, [elements.data])

    useMemo(() => {
        if (sortDesc) {
            setCurrentData(orderBy(elements.data, [colName], ['desc']));
        } else {
            setCurrentData(orderBy(elements.data, [colName], ['asc']));
        }
    }, [sortDesc])


    return (
        <FrontendContainer mainModule={'user'}>
            {/* Mobile filter dialog */}
            <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setMobileFiltersOpen}>
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
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <div
                            className="font-bein ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-6 flex flex-col overflow-y-auto">
                            <div className="px-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium text-gray-900">{trans('advanced_search')}</h2>
                                <button
                                    type="button"
                                    className="-mr-2 w-10 h-10 p-2 flex items-center justify-center text-gray-400 hover:text-gray-500"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4">
                                {map(categories, c =>
                                    <Disclosure as="div"
                                                key={c.id}
                                                className="border-t border-gray-200 pt-4 pb-4">
                                        {({open}) => (
                                            <fieldset>
                                                <legend className="w-full px-2">
                                                    <Disclosure.Button
                                                        className="w-full p-2 flex flex-1 items-center justify-between text-gray-400 hover:text-gray-500">
                                                        <div
                                                            className="text-right text-gray-900">{c[getLocalized()]}</div>
                                                        <div className="h-7">
                                                        <ChevronDownIcon
                                                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                                            aria-hidden="true"
                                                        />
                                                        </div>
                                                    </Disclosure.Button>
                                                </legend>
                                                <Disclosure.Panel className="pt-4 pb-2 px-4 w-full">
                                                    <div className="space-y-6 w-full divide-y divide-gray-100 flex flex-1 flex-col justify-start items-end">
                                                        <Link
                                                            className={classNames(isRTL ? 'justify-end' :  'justify-start', 'flex flex-1 flex-row  items-center w-full')}
                                                            href={route(`frontend.user.index`, { user_category_id : c.id})}
                                                        >
                                                            {c[getLocalized()]}
                                                        </Link>
                                                        {
                                                            map(c.children, child => (
                                                                <Link
                                                                    className={classNames(isRTL ? 'justify-end' : 'justify-start', 'flex flex-1 flex-row  items-center w-full')}
                                                                    key={child.id}
                                                                    href={route(`frontend.user.index`, { user_category_id : child.id})}
                                                                >
                                                                    {child[getLocalized()]}
                                                                </Link>
                                                            ))
                                                        }

                                                    </div>
                                                </Disclosure.Panel>
                                            </fieldset>
                                        )}
                                    </Disclosure>
                                )}
                            </form>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition.Root>
            <main className="max-w-2xl mx-auto py-16 px-4 sm:py-14 sm:px-6 lg:max-w-full lg:px-8">
                <div className="border-b border-gray-200 pb-5">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{trans('authors')}</h1>
                    <p className="mt-4 text-base text-gray-500">
                        {trans('list')} {trans('authors')}
                    </p>
                </div>
                <div className="flex flex-1 justify-end items-center">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button
                                className="group inline-flex px-3 py-2 ml-3 mt-1 justify-center items-center gap-x-3 text-gray-800 hover:text-gray-900 bg-gray-200 rounded-md ">
                                {trans('sort')}
                                <ChevronDownIcon
                                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
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
                                className="origin-top-right absolute z-50 -right-20 mt-2 w-56 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                    {sortOptions.map((option) => (
                                        <Menu.Item key={option.name}>
                                            {({active}) => (
                                                <div
                                                    onClick={() => handleSort(option.colName)}
                                                    className={classNames(
                                                        option.current ? ' text-gray-900' : 'text-gray-500',
                                                        active ? 'bg-gray-100' : '',
                                                        'block flex flex-row flex-1 justify-between items-center px-4 py-2 text-md font-extrabold'
                                                    )}
                                                >
                                                    {trans(option.name)}
                                                    <AiOutlineSortAscending size={25} className={'text-gray-400'}/>
                                                </div>
                                            )}
                                        </Menu.Item>
                                    ))}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                    <button
                        type="button"
                        className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                        onClick={() => setMobileFiltersOpen(true)}
                    >
                        <span className="sr-only">{trans('filters')}</span>
                        <FilterIcon className="w-5 h-5" aria-hidden="true"/>
                    </button>
                </div>
                <div className="pt-5 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 min-h-screen">
                    <aside>
                        <h2 className="sr-only">{trans('advanced_search')}</h2>

                        <button
                            type="button"
                            className="inline-flex items-center lg:hidden bg-gray-900 p-3 rounded-md shadow-md"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="text-white">{trans('advanced_search')}</span>
                            <PlusSmIcon className="flex-shrink-0 ml-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </button>

                        <div className="hidden lg:block">
                            <div className="divide-y divide-gray-200 space-y-3">
                                <div className="flex flex-1 justify-between items-center">
                                    <div className="flex">
                                        <h3>{trans('categories')}</h3>
                                    </div>
                                    <div className="flex">
                                        <Link
                                            href={parentModule ? route(`frontend.${parentModule}.index`) : '#'}
                                            className="px-3 py-2 bg-gray-600 text-white rounded-md shadow-sm"
                                        >
                                            {trans('clear_search')}
                                        </Link>

                                    </div>
                                </div>
                                {map(categories, c => (
                                    <div key={c.id} className="pt-3">
                                        <fieldset className="space-y-3">
                                            <div className="pt-3 space-y-3">
                                                <Link
                                                    href={route('frontend.user.index', {user_category_id: c.id})}
                                                    className="flex items-center">
                                                    <input
                                                        readOnly
                                                        checked={params.user_category_id == c.id}
                                                        type="checkbox"
                                                        className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                    />
                                                    <label htmlFor={'name'}
                                                           className="rtl:mr-3 ltr:ml-3 text-sm text-gray-600">
                                                        {c[getLocalized()]}
                                                    </label>
                                                </Link>
                                            </div>
                                            {
                                                map(c.children, child => (
                                                    <div className="pt-3 space-y-3 mx-5" key={child.id}>
                                                        <Link
                                                            href={route('frontend.user.index', {user_category_id: child.id})}
                                                            className="flex items-center">
                                                            <input
                                                                readOnly
                                                                checked={params.user_category_id == child.id}
                                                                type="checkbox"
                                                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={'name'}
                                                                   className="rtl:mr-3 ltr:ml-3 text-sm text-gray-600">
                                                                {child[getLocalized()]}
                                                            </label>
                                                        </Link>
                                                        {
                                                            map(child.children, sub => (
                                                                <div className="pt-3 space-y-3 mx-5" key={sub.id}>
                                                                    <Link
                                                                        href={route('frontend.user.index', {user_category_id: sub.id})}
                                                                        className="flex items-center">
                                                                        <input
                                                                            readOnly
                                                                            checked={params.user_category_id == sub.id}
                                                                            type="checkbox"
                                                                            className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                                                        />
                                                                        <label htmlFor={'name'}
                                                                               className="rtl:mr-3 ltr:ml-3 text-sm text-gray-600">
                                                                            {sub[getLocalized()]}
                                                                        </label>
                                                                    </Link>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                ))
                                            }
                                        </fieldset>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                    {/* Product grid */}
                    <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                        <NoElements display={elements.total < 1}/>
                        <div
                            className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {map(currentData, element => (
                                <NormalUserWidget element={element} key={element.id}/>
                            ))}
                        </div>
                    </div>
                </div>
                <Pagination
                    type={'user'}
                    total={elements.total}
                    links={elements.links}
                    showSearch={false}
                />
            </main>
        </FrontendContainer>
    )
}


// import FrontendContainer from "../components/FrontendContainer";
// import {useContext} from "react";
// import {AppContext} from "../../context/AppContext";
// import route from 'ziggy-js';
// import {Link} from "@inertiajs/inertia-react";
//
// export default function FrontendUserIndex({ elements }) {
//     const { getThumb , trans , getLocalized } = useContext(AppContext);
//     return (
//         <FrontendContainer>
//
//         </FrontendContainer>
//     );
// }


// <div className="bg-white max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
//     <h2 className="sr-only">{trans('products')}</h2>
//     <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//         {elements.data.map((element) => (
//             <Link key={element.id} href={route('frontend.book.show', element.id)} className="group">
//                 <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
//                     <img
//                         src={getThumb(element.image)}
//                         alt={element[getLocalized()]}
//                         className="w-full h-full object-center object-cover group-hover:opacity-75"
//                     />
//                 </div>
//                 <h3 className="mt-4 text-sm text-gray-700">{element[getLocalized()]}</h3>
//                 <p className="mt-1 text-lg font-medium text-gray-900">{element.price}</p>
//             </Link>
//         ))}
//     </div>
// </div>
