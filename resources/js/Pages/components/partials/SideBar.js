import {Dialog, Menu, Transition} from "@headlessui/react";
import {SearchIcon, SelectorIcon} from "@heroicons/react/solid";
import {Fragment, useContext, useMemo, useState} from "react";
import {ClockIcon, HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon} from "@heroicons/react/outline";
import {BackendContext} from "../../context/BackendContext";
import GlobalContext from "../../context/GlobalContext";
import {InertiaLink, Link} from '@inertiajs/inertia-react'
import pluralize from 'pluralize';
import {filter, map, first} from 'lodash';
import route from 'ziggy-js';


const teams = [
    {name: 'Engineering', href: '#', bgColorClass: 'bg-indigo-500'},
    {name: 'Human Resources', href: '#', bgColorClass: 'bg-green-500'},
    {name: 'Customer Success', href: '#', bgColorClass: 'bg-yellow-500'},
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const navigation = [
    {name: 'home', href: '/backend', icon: HomeIcon},
    {name: 'product', href: '/backend/product/search', icon: ViewListIcon},
    {name: 'book', href: '/backend/book/search', icon: ClockIcon},
    {name: 'service', href: '/backend/service/search', icon: ClockIcon},
    {name: 'user', href: '/backend/user/search', icon: ClockIcon},
    {name: 'category', href: '/backend/category/search', icon: ClockIcon},
]

const SideBar = () => {
    const {sideBarOpen, toggleSideBar, trans, currentModule, classNames, modules} = useContext(BackendContext);
    const {settings, auth} = useContext(GlobalContext);

    return (
        <>

            <Transition.Root show={sideBarOpen} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed inset-0 flex z-40 lg:hidden"
                    open={sideBarOpen}
                    onClose={() => toggleSideBar(!sideBarOpen)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
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
                            className="absolute top-10 left-10 bg-pink-400 z-10 flex-shrink-0 flex h-16 border-b border-gray-200 lg:hidden">
                            <button
                                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                                onClick={() => toggleSideBar(true)}
                            >
                                <span className="sr-only">Open sidebar</span>
                                <MenuAlt1Icon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
                                <div className="flex-1 flex">
                                    <form className="w-full flex md:ml-0" action="#" method="GET">
                                        <label htmlFor="search-field" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                            <div
                                                className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                                                <SearchIcon className="h-5 w-5" aria-hidden="true"/>
                                            </div>
                                            <input
                                                id="search-field"
                                                name="search-field"
                                                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                                                placeholder="Search"
                                                type="search"
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="flex items-center">
                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        {({open}) => (
                                            <>
                                                <div>
                                                    <Menu.Button
                                                        className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img
                                                            className="h-8 w-8 rounded-full"
                                                            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                            alt=""
                                                        />
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
                                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                                    >
                                                        <div className="py-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        View profile
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Settings
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Notifications
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
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Get desktop app
                                                                    </a>
                                                                )}
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <a
                                                                        href="#"
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Support
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
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        Logout
                                                                    </a>
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
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
                    <div className="flex justify-center items-center flex-shrink-0 px-6">
                        <Link href="/" className="">
                            <img
                                className="h-16 w-auto m-auto "
                                src={settings.imageThumb}
                                alt={settings.name_en}
                            />
                        </Link>
                    </div>
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                        {/* User account dropdown */}
                        <Menu as="div" className="px-3 mt-6 relative inline-block text-left">
                            {({open}) => (
                                <>
                                    <div>
                                        <Menu.Button
                                            className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                                          <span className="flex w-full justify-between items-center">
                                            <span className="flex min-w-0 items-center justify-between space-x-3">
                                              <img
                                                  className="w-10 h-10 ltr:mr-2 rtl:ml-2 bg-gray-300 rounded-full flex-shrink-0"
                                                  src={auth.imageThumb}
                                                  alt=""
                                              />
                                              <span className="flex-1 flex flex-col min-w-0">
                                                <span
                                                    className="text-gray-900 text-sm font-medium truncate">{auth.name}</span>
                                                <span
                                                    className="text-gray-500 ltr:text-left rtl:text-right text-sm truncate">{auth.role.name}</span>
                                              </span>
                                            </span>
                                            <SelectorIcon
                                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                          </span>
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
                                            className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                        >
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
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
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
                        {/* Sidebar Search */}
                        <div className="px-3 mt-5">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div
                                    className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                                    aria-hidden="true"
                                >
                                    <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true"/>
                                </div>
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        {/* Navigation */}
                        <nav className="px-3 mt-6">
                            <div className="space-y-1">
                                {map(modules, m => (
                                    <span key={m.name}>
                                        {
                                            m.main_menu && m.index ?
                                                <Link
                                                    key={m.name}
                                                    href={route(`backend.${m.name}.search`)}
                                                    className={classNames(
                                                        m.name === currentModule ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                                                        'group flex items-center py-2 text-sm font-medium rounded-md'
                                                    )}
                                                    aria-current={'page'}
                                                >
                                                    <img className={`w-6 h-6 mx-2 rounded-full`} src={m.imageThumb}/>
                                                    {trans(pluralize(m.name))}
                                                </Link> : null
                                        }
                                    </span>
                                ))}
                            </div>
                            <div className="mt-8">
                                {/* Secondary navigation */}
                                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                    id="teams-headline">
                                    Teams
                                </h3>
                                <div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
                                    {teams.map((team) => (
                                        <a
                                            key={team.name}
                                            href={team.href}
                                            className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                        >
                                              <span
                                                  className={classNames(team.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full')}
                                                  aria-hidden="true"
                                              />
                                            <span className="truncate">{team.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;
