import React, {Fragment, useContext} from "react";
import {Dialog, Disclosure, Transition, Menu} from '@headlessui/react'
import {XIcon} from "@heroicons/react/outline";
import {map} from "lodash";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {AppContext} from "../../context/AppContext";

export default function SearchIndexSideBarMobile({ setMobileFiltersOpen  , categories , mobileFiltersOpen, type }) {
    const { trans, getLocalized , classNames, isRTL   } = useContext(AppContext)
    const { params } = route();
    return (
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={() => setMobileFiltersOpen}>
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
                                                        href={route(`frontend.${type}.index`, { category_id : c.id})}
                                                    >
                                                        {c[getLocalized()]}
                                                    </Link>
                                                    {
                                                        map(c.children, child => (
                                                            <Link
                                                                className={classNames(isRTL ? 'justify-end' : 'justify-start', 'flex flex-1 flex-row  items-center w-full')}
                                                                key={child.id}
                                                                href={route(`frontend.${type}.index`, { category_id : child.id})}
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
    );
}