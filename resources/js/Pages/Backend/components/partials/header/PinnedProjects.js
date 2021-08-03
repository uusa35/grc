import {Link} from "@inertiajs/inertia-react";
import {Menu, Transition} from "@headlessui/react";
import {DotsVerticalIcon} from "@heroicons/react/solid";
import {Fragment, useContext} from "react";
import route from "ziggy-js";
import {BackendContext} from "../../../context/BackendContext";
import { map } from 'lodash';

export default function PinnedProjects() {
    const { classNames , isRTL , trans , theme , modules  } = useContext(BackendContext);
    return (
        <div className="bg-white my-3 mx-3 rounded-md shadow-sm py-3 sm:px-6 lg:px-5 ">
            {/*<h2 className="text-xs font-medium uppercase tracking-wide">{trans('modules')}</h2>*/}
            <ul className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6  my-1">

                <li className="relative col-span-1 flex  rounded-md">
                    <div
                        className={classNames(isRTL ? 'rounded-r-md' : 'rounded-l-md', `bg-${theme}-400 flex-shrink-0 flex items-center justify-center w-16 text-white  font-medium rounded-s-md`)}
                    >
                        {trans('products')}
                    </div>
                    <div
                        className={classNames(isRTL ? 'rounded-l-md' : 'rounded-r-md', `flex flex-row items-center justify-between border-2 border-${theme}-50 shadow-md rounded-s-2 truncate`)}>
                        <div className="flex-1 px-4 py-2  truncate">
                            <Link href="#"
                                  className={`text-${theme}-900 font-medium hover:text-${theme}-600`}>
                                {trans('control_of')} {trans('products')}
                            </Link>
                            <p className="text-gray-500">

                            </p>
                        </div>
                        <Menu as="div" className="flex-shrink-0 pr-2">
                            {({open}) => (
                                <>
                                    <Menu.Button
                                        className={`w-8 h-8 bg-white inline-flex items-center justify-center text-${theme}-400 rounded-full hover:text-${theme}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme}-500`}>
                                        <span className="sr-only">Open options</span>
                                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true"/>
                                    </Menu.Button>
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            static
                                            className={classNames(isRTL ? 'right-50' : 'right-50', " z-50 mx-10 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none")}
                                        >
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route('backend.product.create')}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('create')} {trans('product')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route('backend.product.search', { active : 1})}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('active')} {trans('products')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route('backend.product.search', { active : 0 })}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('non_active_products')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route('backend.trashed', { model : 'product'})}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('trashed')} {trans('products')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    </div>
                </li>


                {/*     users */}
                <li className="relative col-span-1 flex  rounded-md">
                    <div
                        className={classNames(isRTL ? 'rounded-r-md' : 'rounded-l-md', `bg-${theme}-400 flex-shrink-0 flex items-center justify-center w-16 text-white  font-medium rounded-s-md`)}
                    >
                        {trans('users')}
                    </div>
                    <div
                        className={classNames(isRTL ? 'rounded-l-md' : 'rounded-r-md', `flex flex-row items-center justify-between border-2 border-${theme}-50 shadow-md rounded-s-2 truncate`)}>
                        <div className="flex-1 px-4 py-2  truncate">
                            <Link href="#"
                                  className={`text-${theme}-900 font-medium hover:text-${theme}-600`}>
                                {trans('control_of')} {trans('users')}
                            </Link>
                            <p className="text-gray-500">
                                </p>
                        </div>
                        <Menu as="div" className="flex-shrink-0 pr-2">
                            {({open}) => (
                                <>
                                    <Menu.Button
                                        className={`w-8 h-8 bg-white inline-flex items-center justify-center text-${theme}-400 rounded-full hover:text-${theme}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme}-500`}>
                                        <span className="sr-only">Open options</span>
                                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true"/>
                                    </Menu.Button>
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            static
                                            className={classNames(isRTL ? 'right-50' : 'right-50', " z-50 mx-10 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none")}
                                        >
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route(`backend.user.create`)}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('create')} {trans('user')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route(`backend.user.search`, { active : 1})}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('active')} {trans('users')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route(`backend.user.search`, { active : 0})}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('not_active')} {trans('users')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route(`backend.user.search`, { is_company : 1})}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('companies')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>



                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    </div>
                </li>


                {/*     books */}
                <li className="relative col-span-1 flex  rounded-md">
                    <div
                        className={classNames(isRTL ? 'rounded-r-md' : 'rounded-l-md', `bg-${theme}-400 flex-shrink-0 flex items-center justify-center w-16 text-white  font-medium rounded-s-md`)}
                    >
                        {trans('books')}
                    </div>
                    <div
                        className={classNames(isRTL ? 'rounded-l-md' : 'rounded-r-md', `flex flex-row items-center justify-between border-2 border-${theme}-50 shadow-md rounded-s-2 truncate`)}>
                        <div className="flex-1 px-4 py-2  truncate">
                            <Link href="#"
                                  className={`text-${theme}-900 font-medium hover:text-${theme}-600`}>
                                {trans('control_of')} {trans('books')}
                            </Link>
                            <p className="text-gray-500"></p>
                        </div>
                        <Menu as="div" className="flex-shrink-0 pr-2">
                            {({open}) => (
                                <>
                                    <Menu.Button
                                        className={`w-8 h-8 bg-white inline-flex items-center justify-center text-${theme}-400 rounded-full hover:text-${theme}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme}-500`}>
                                        <span className="sr-only">Open options</span>
                                        <DotsVerticalIcon className="w-5 h-5" aria-hidden="true"/>
                                    </Menu.Button>
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            static
                                            className={classNames(isRTL ? 'right-50' : 'right-50', " z-50 mx-10 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none")}
                                        >
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route(`backend.book.create`)}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('create')} {trans('book')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route(`backend.book.search`, { free : 1})}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('free')} {trans('books')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({active}) => (
                                                        <Link
                                                            href={route(`backend.book.search`, { free : 0})}
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 '
                                                            )}
                                                        >
                                                            {trans('paid')} {trans('books')}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    </div>
                </li>


            </ul>
        </div>
    );
}
