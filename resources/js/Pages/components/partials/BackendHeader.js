import {Menu, Transition} from "@headlessui/react";
import {ChevronRightIcon, DotsVerticalIcon} from "@heroicons/react/solid";
import {Fragment, useContext} from "react";
import GlobalContext from "../../context/GlobalContext";
import {BackendContext} from "../../context/BackendContext";
import {InertiaLink, Link} from "@inertiajs/inertia-react";
import {ClockIcon, HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon} from '@heroicons/react/outline'
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
import {map} from 'lodash';
import plurlaize from 'pluralize'


const BackendHeader = () => {
    const {settings} = useContext(GlobalContext);
    const {
        trans,
        otherLang,
        classNames,
        isRTL,
        toggleSideBar,
        theme,
        modules,
        currentModule
    } = useContext(BackendContext);

    return (
        <div className={``}>
            {/* Page title & actions */}
            <div
                className="border-b border-gray-200 py-3 bg-white rounded-md mx-3 mt-5 sm:px-6 lg:p-4 sm:flex sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">

                    <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">{trans('home')}</h1>
                </div>
                <div className="flex flex-1 items-center min-w-max mt-4 fl dex sm:mt-0 sm:ml-4">
                    <Menu as="div" className="relative ltr:text-left rtl:text-right">
                        {({open}) => (
                            <div>
                                <div className={`rtl:ml-2 ltr:mr-2`}>
                                    <Menu.Button
                                        className={`inline-flex justify-center w-full rounded-md border border-${theme}-300 shadow-sm px-4 py-2 bg-${theme}-600 text-sm font-medium text-${theme}-50 hover:bg-${theme}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${theme}-100 focus:ring-${theme}-500`}>
                                        {trans('list')} {trans('all_elements')}
                                        <ChevronDownIcon className="mx-2 h-5 w-5" aria-hidden="true"/>
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
                                        className="grid grid-cols-1 md:grid-cols-3 w-max z-50 origin-top-right absolute -right-60 mt-2 py-5 border-2 border-gray-200 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                    >
                                        {
                                            map(modules, m => (
                                                <Fragment key={m.name}>
                                                    {
                                                        m.index && !m.main_menu && <div className="py-1 col-span-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <Link
                                                                        key={m.name}
                                                                        href={`/backend/${m.name}`}
                                                                        className={classNames(
                                                                            m.name === currentModule ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'group flex items-center rounded-md py-2 text-sm flex-1 ltr:ml-2 rtl:mr-2 font-extrabold hover:bg-gray-100'
                                                                        )}
                                                                    >
                                                                        <img className={`w-5 h-auto mx-2 rounded-sm`}
                                                                             src={m.imageThumb} alt=""/>
                                                                        {trans('list')} {trans(plurlaize(m.name))}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    }
                                                </Fragment>
                                            ))
                                        }
                                    </Menu.Items>
                                </Transition>
                            </div>
                        )}
                    </Menu>
                    <Menu as="div" className="relative inline-block ltr:text-left rtl:text-right">
                        {({open}) => (
                            <>
                                <div className={`rtl:ml-2 ltr:mr-2`}>
                                    <Menu.Button
                                        className={`inline-flex justify-center w-full rounded-md border border-${theme}-300 shadow-sm px-4 py-2 bg-${theme}-600 text-sm font-medium text-${theme}-50 hover:bg-${theme}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${theme}-100 focus:ring-${theme}-500`}>
                                        {trans('add_new_element')}
                                        <ChevronDownIcon className="mx-2 h-5 w-5" aria-hidden="true"/>
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
                                        className="origin-top-right absolute right-0 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                    >
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
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
                                                {({active}) => (
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
                                                {({active}) => (
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
                                                {({active}) => (
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
                                                {({active}) => (
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
                                                {({active}) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <HeartIcon
                                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"/>
                                                        Add to favorites
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <TrashIcon
                                                            className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"/>
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


                    {/* settings */}
                    <Menu as="div" className="relative inline-block ltr:text-left rtl:text-right">
                        {({open}) => (
                            <>
                                <div className={`rtl:ml-2 ltr:mr-2`}>
                                    <Menu.Button
                                        className={`inline-flex justify-center w-full rounded-md border border-${theme}-300 shadow-sm px-4 py-2 bg-${theme}-600 text-sm font-medium text-${theme}-50 hover:bg-${theme}-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${theme}-100 focus:ring-${theme}-500`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-auto w-3 rtl:ml-2 ltr:mr-2"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        {trans('settings')}
                                        <ChevronDownIcon className="mx-2 h-5 w-5" aria-hidden="true"/>
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
                                        className="origin-top-right absolute -right-16 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                    >
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <Link
                                                        href={'/'}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                        </svg>
                                                        {trans('main_page')}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href={`?locale=${otherLang}`}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-4"
                                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                                                        </svg>
                                                        {trans(otherLang)}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            document.getElementById('logout-form').submit()
                                                        }}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        {trans('logout')}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
            {/* Pinned projects */}
            <div className="bg-white my-3 mx-3 rounded-md shadow-sm py-3 sm:px-6 lg:px-5 ">
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
                                                className={classNames(isRTL ? 'right-50' : 'right-50', " mx-10 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none")}
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
        </div>
    );
}


export default BackendHeader;
