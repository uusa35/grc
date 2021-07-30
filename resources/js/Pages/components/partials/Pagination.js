/* This example requires Tailwind CSS v2.0+ */
import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon, SearchIcon} from '@heroicons/react/solid'
import {useContext, useState} from "react";
import {BackendContext} from "../../context/BackendContext";
import {Link} from '@inertiajs/inertia-react'
import route from 'ziggy-js';
import {map} from 'lodash';

export default function Pagination({type, total, links }) {
    const [search, setSearch] = useState('');
    const {trans, classNames, theme, currentModule} = useContext(BackendContext)
    return (
        <nav className="grid grid-cols-1 sm:grid-cols-2 flex justify-between items-center border-b border-gray-100 bg-transparent pb-4 sm:px-0">
            { total > 0 && <div className="col-span-full h-auto sm:col-span-1 flex flex-1 justify-between items-center mt-5 space-x-5">
                <label htmlFor="search" className="sr-only">
                    {trans('search')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm w-1/2">
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
                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full pl-9 sm:text-sm border-${theme}-300 rounded-md`}
                        placeholder={trans('search')}
                    />
                </div>
                <Link
                    href={search.length > 2 && route().has(`backend.${currentModule}.search`) ? route(`backend.${currentModule}.search`, { search }) : '#'}
                    disabled={search.length <= 2}
                    className={`p-2 px-5 order-0 inline-flex items-center  mt-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${theme}-600 hover:bg-${theme}-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-${theme}-500 sm:order-1 sm:ml-3`}
                >
                    {trans("search")}
                </Link>
                <Link
                    href={route().has(`backend.${type}.search`) ? route(`backend.${type}.search`) : '#'}
                    className={`p-2 order-0 inline-flex items-center mt-1 border border-transparent shadow-sm text-xs text-center md:text-sm font-medium rounded-md text-white bg-${theme}-600 hover:bg-${theme}-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-${theme}-500 sm:order-1 sm:ml-3`}
                >
                    {trans("reset")}
                </Link>
            </div>}
            <div className="col-span-full sm:col-span-1 flex justify-end mt-5 sm:mt-0">
                <div className="md:-mt-px md:flex">
                    {
                        map(links,page =>
                            <Link
                                key={page.label}
                                href={route().has(`backend.${type}.search`) && page.url ? page.url : '#'}
                                className={classNames(page.active ? `border-${theme}-700 border-t-2` : '', `border-transparent text-gray-500 hover:text-gray-700 hover:border-${theme}-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`)}
                            >
                                {page.label}
                            </Link>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}
