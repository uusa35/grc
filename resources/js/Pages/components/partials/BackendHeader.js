import {Menu, Transition} from "@headlessui/react";
import {ChevronRightIcon, DotsVerticalIcon} from "@heroicons/react/solid";
import {Fragment, useContext} from "react";
import GlobalContext from "../../context/GlobalContext";
import {BackendContext} from "../../context/BackendContext";
import {InertiaLink, Link} from "@inertiajs/inertia-react";
import { ClockIcon, HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon } from '@heroicons/react/outline'
import {
    ArchiveIcon,
    ArrowCircleRightIcon,
    ChevronDownIcon,
    DuplicateIcon,
    HeartIcon,
    PencilAltIcon,
    TrashIcon,
    UserAddIcon,
} from '@heroicons/react/solid'
import { map } from 'lodash';
import plurlaize from 'pluralize'


const BackendHeader = () => {
    const {settings} = useContext(GlobalContext);
    const {trans, otherLang, classNames, isRTL, toggleSideBar, theme , modules } = useContext(BackendContext);

    return (
        <>
            {/* Page title & actions */}
            <div
                className="border-b border-gray-200 py-3 bg-white rounded-md mx-3 mt-5 sm:px-6 lg:p-4 sm:flex sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">

                    <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">{trans('home')}</h1>
                </div>
                <div className="mt-4 fl dex sm:mt-0 sm:ml-4">
                    <Menu as="div" className="relative inline-block ltr:text-left rtl:text-right">
                        {({ open }) => (
                            <>
                                <div className={`rtl:ml-2 ltr:mr-2`}>
                                    <Menu.Button className={`inline-flex justify-center w-full rounded-md border border-${theme}-300 shadow-sm px-4 py-2 bg-${theme}-600 text-sm font-medium text-${theme}-50 hover:bg-${theme}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${theme}-100 focus:ring-${theme}-500`}>
                                        {trans('all_elements')}
                                        <ChevronDownIcon className="mx-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

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
                                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                    >
                                        {
                                            map(modules, m => (
                                                <>
                                                    {
                                                        m.index && !m.main_menu && <div className="py-1">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        key={m.name}
                                                                        href={`/backend/${m.name}`}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'group flex items-center px-1 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-3 rtl:ml-3 ltr:mr-3 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                                                        </svg>
                                                                        {trans('list')} {trans(plurlaize(m.name))}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    }
                                                </>
                                            ))
                                        }
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                    <Menu as="div" className="relative inline-block ltr:text-left rtl:text-right">
                        {({ open }) => (
                            <>
                                <div className={`rtl:ml-2 ltr:mr-2`}>
                                    <Menu.Button className={`inline-flex justify-center w-full rounded-md border border-${theme}-300 shadow-sm px-4 py-2 bg-${theme}-600 text-sm font-medium text-${theme}-50 hover:bg-${theme}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${theme}-100 focus:ring-${theme}-500`}>
                                        {trans('add_new_element')}
                                        <ChevronDownIcon className="mx-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

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
                                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                    >
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <PencilAltIcon
                                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        Edit
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <DuplicateIcon
                                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        Duplicate
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <ArchiveIcon
                                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        Archive
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <ArrowCircleRightIcon
                                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        Move
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <UserAddIcon
                                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        Share
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <HeartIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                                        Add to favorites
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <TrashIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                                        Delete
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                    <a
                        href={`?locale=${otherLang}`}
                        // href={`/lang/${otherLang}`}
                        type="button"
                        className={`order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-${settings.theme}-50 bg-${settings.theme}-600 hover:bg-${settings.theme}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0`}
                    >
                        {trans(otherLang)}
                    </a>
                    <Link
                        href={'/'}
                        className={`order-0 rtl:mr-2 ltr:ml-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-${settings.theme}-50 bg-${settings.theme}-700 hover:bg-${settings.theme}-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3`}
                    >
                        {trans('main_page')}
                    </Link>
                </div>
            </div>
            {/* Pinned projects */}
            <div className="bg-white my-3 mx-3 rounded-md shadow-sm py-3 sm:px-6 lg:px-5">
                <h2 className="text-xs font-medium uppercase tracking-wide">{trans('modules')}</h2>
                <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-6 my-1">
                    <li className="relative col-span-1 flex shadow-sm rounded-md">
                        <div
                            className={classNames(isRTL ? 'rounded-r-md' : 'rounded-l-md', `bg-${settings.theme}-400 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-s-md`)}
                        >
                            {trans('products')}
                        </div>
                        <div
                            className={classNames(isRTL ? 'rounded-l-md' : 'rounded-r-md', `flex flex-row w-auto items-center justify-between border-2 border-${settings.theme}-100 border-${settings.theme}-200 rounded-s-2 truncate`)}>
                            <div className="flex-1 px-4 py-2 text-sm truncate">
                                <Link href="#"
                                   className={`text-${settings.theme}-900 font-medium hover:text-${settings.theme}-600`}>
                                    {trans('control_of')} {trans('products')}
                                </Link>
                                <p className="text-gray-500">{trans('control_ur_products')}</p>
                            </div>
                            <Menu as="div" className="flex-shrink-0 pr-2">
                                {({open}) => (
                                    <>
                                        <Menu.Button
                                            className={`w-8 h-8 bg-white inline-flex items-center justify-center text-${settings.theme}-400 rounded-full hover:text-${settings.theme}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${settings.theme}-500`}>
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
                                                className={classNames(isRTL ? 'right-50' : 'right-50', "z-40 mx-10 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none")}
                                            >
                                                <div className="py-1">
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <Link
                                                                href="/backend/product/create"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
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
                                                                href="/backend/product/search?active=1"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                {trans('active_products')}
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <Link
                                                                href="/backend/product/search?active=0"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                    'block px-4 py-2 text-sm'
                                                                )}
                                                            >
                                                                {trans('non_active_products')}
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
        </>
    );
}


export default BackendHeader;
