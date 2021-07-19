import {Menu, Transition} from "@headlessui/react";
import {ChevronRightIcon, DotsVerticalIcon} from "@heroicons/react/solid";
import {Fragment, useContext} from "react";
import GlobalContext from "../../context/GlobalContext";
import {BackendContext} from "../../context/BackendContext";
import {InertiaLink, Link} from "@inertiajs/inertia-react";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const projects = [
    {
        id: 1,
        title: 'GraphQL API',
        initials: 'GA',
        team: 'Engineering',
        members: [
            {
                name: 'Dries Vincent',
                handle: 'driesvincent',
                imageUrl:
                    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Lindsay Walton',
                handle: 'lindsaywalton',
                imageUrl:
                    'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Courtney Henry',
                handle: 'courtneyhenry',
                imageUrl:
                    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
            {
                name: 'Tom Cook',
                handle: 'tomcook',
                imageUrl:
                    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            },
        ],
        totalMembers: 12,
        lastUpdated: 'March 17, 2020',
        pinned: true,
        bgColorClass: 'bg-pink-600',
    },
]
const pinnedProjects = projects.filter((project) => project.pinned)

const BackendHeader = () => {
    const { locale , component , url, otherLang , translations  } = useContext(GlobalContext);
    const { trans } = useContext(BackendContext)
    console.log('locale', locale);
    console.log('com', component);
    console.log('url', url);
    console.log('otherLang', otherLang);
    console.log('trans', translations['ar']['aboutus']);
    console.log('result of trans', trans(otherLang))
    return (
        <>
            {/* Page title & actions */}
            <div
                className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                    <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Home</h1>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4">
                    <a
                        href={`/lang/${otherLang}?url=${url}`}
                        type="button"
                        className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                    >
                        {trans(otherLang)}
                    </a>
                    <a
                        href={`/lang/${locale}?url=${url}`}
                        type="button"
                        className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                    >
                        {trans(locale)}
                    </a>
                    <button
                        type="button"
                        className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
                    >
                        Create
                    </button>
                </div>
            </div>
            {/* Pinned projects */}
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Pinned Projects</h2>
                <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
                    {pinnedProjects.map((project) => (
                        <li key={project.id} className="relative col-span-1 flex shadow-sm rounded-md">
                            <div
                                className={classNames(
                                    project.bgColorClass,
                                    'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                                )}
                            >
                                {project.initials}
                            </div>
                            <div
                                className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                <div className="flex-1 px-4 py-2 text-sm truncate">
                                    <a href="#" className="text-gray-900 font-medium hover:text-gray-600">
                                        {project.title}
                                    </a>
                                    <p className="text-gray-500">{project.totalMembers} Members</p>
                                </div>
                                <Menu as="div" className="flex-shrink-0 pr-2">
                                    {({open}) => (
                                        <>
                                            <Menu.Button
                                                className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
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
                                                    className="z-10 mx-3 origin-top-right absolute right-10 top-3 w-48 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
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
                                                                    View
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
                                                                    Removed from pinned
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
                                                                    Share
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
                        </li>
                    ))}
                </ul>
            </div>

            {/* Projects list (only on smallest breakpoint) */}
            <div className="mt-10 sm:hidden">
                <div className="px-4 sm:px-6">
                    <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Projects</h2>
                </div>
                <ul className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
                    {projects.map((project) => (
                        <li key={project.id}>
                            <a href="#"
                               className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                    <span className="flex items-center truncate space-x-3">
                      <span
                          className={classNames(project.bgColorClass, 'w-2.5 h-2.5 flex-shrink-0 rounded-full')}
                          aria-hidden="true"
                      />
                      <span className="font-medium truncate text-sm leading-6">
                        {project.title} <span className="truncate font-normal text-gray-500">in {project.team}</span>
                      </span>
                    </span>
                                <ChevronRightIcon
                                    className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}


export default BackendHeader;
