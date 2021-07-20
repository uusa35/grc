/* This example requires Tailwind CSS v2.0+ */
import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon, SearchIcon} from '@heroicons/react/solid'
import {useContext, useState} from "react";
import {BackendContext} from "../../context/BackendContext";
import GlobalContext from "../../context/GlobalContext";
import {InertiaLink} from "@inertiajs/inertia-react";

export default function Pagination({links, type}) {
    const [search, setSearch] = useState('');
    const {trans, classNames} = useContext(BackendContext)
    const {settings} = useContext(GlobalContext);

    return (
        <nav className="border-b border-gray-100 bg-transparent pb-4 flex items-center justify-between sm:px-0">
            <div className="flex flex-row mt-5 space-x-5">
                <label htmlFor="search" className="sr-only">
                    {trans('search')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div
                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                        aria-hidden="true"
                    >
                        <SearchIcon className="mr-3 h-4 w-4 text-gray-400" aria-hidden="true"/>
                    </div>
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        name="search"
                        id="search"
                        className={`focus:ring-${settings.theme}-500 focus:border-${settings.theme}-500 block w-full pl-9 sm:text-sm border-${settings.theme}-300 rounded-md`}
                        placeholder={trans('search')}
                    />
                </div>
                <InertiaLink
                    href={search > 2 ? `/backend/search/${type}?search=${search}` : '#'}
                    type="button"
                    className={`order-0 inline-flex items-center px-5 h-8.5 mt-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${settings.theme}-600 hover:bg-${settings.theme}-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-${settings.theme}-500 sm:order-1 sm:ml-3`}
                >
                    {trans("search")}
                </InertiaLink>
                <InertiaLink
                    href={`/backend/search/${type}`}
                    type="button"
                    className={`order-0 inline-flex items-center px-5 h-8.5 mt-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${settings.theme}-600 hover:bg-${settings.theme}-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-${settings.theme}-500 sm:order-1 sm:ml-3`}
                >
                    {trans("reset")}
                </InertiaLink>
            </div>
            <div className="flex">
                <div className="hidden md:-mt-px md:flex">
                    {links.map(link => (
                        <a
                            key={link.label}
                            href={link.url}
                            className={classNames(link.active ? `border-${settings.theme}-700 border-t-2` : '', `border-transparent text-gray-500 hover:text-gray-700 hover:border-${settings.theme}-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`)}
                            // className={classNames(true ? `bg-${settings.theme}-600` : 'bg-blue-600', "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg")}
                        >
                            {link.label.length <= 2 ? link.label : ''}
                        </a>
                    ))}
                    {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
                </div>
                {/*<div className="-mt-px w-0 flex-1 flex justify-end">*/}
                {/*    <a*/}
                {/*        href="#"*/}
                {/*        className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"*/}
                {/*    >*/}
                {/*        <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                {/*    </a>*/}
                {/*</div>*/}
            </div>
        </nav>
    )
}
