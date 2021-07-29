/* This example requires Tailwind CSS v2.0+ */
import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon, SearchIcon} from '@heroicons/react/solid'
import {useContext, useState} from "react";
import {BackendContext} from "../../context/BackendContext";
import GlobalContext from "../../context/GlobalContext";
import {InertiaLink} from "@inertiajs/inertia-react";
import {Link} from '@inertiajs/inertia-react'
import {forEach, range} from 'lodash';
import route from 'ziggy-js';

export default function Pagination({firstPage, lastPage, currentPage, type }) {
    const [search, setSearch] = useState('');
    const {trans, classNames, theme, currentModule} = useContext(BackendContext)

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
                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full pl-9 sm:text-sm border-${theme}-300 rounded-md`}
                        placeholder={trans('search')}
                    />
                </div>
                <Link
                    href={search.length > 2 && route().has(`backend.${currentModule}.search`) ? route(`backend.${currentModule}.search`, { search }) : '#'}
                    disabled={search.length <= 2}
                    className={`order-0 inline-flex items-center px-5 h-8.5 mt-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${theme}-600 hover:bg-${theme}-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-${theme}-500 sm:order-1 sm:ml-3`}
                >
                    {trans("search")}
                </Link>
                <Link
                    href={route().has(`backend.${type}.search`) ? route(`backend.${type}.search`) : '#'}
                    className={`order-0 inline-flex items-center px-5 h-8.5 mt-1 border border-transparent shadow-sm text-xs text-center md:text-sm font-medium rounded-md text-white bg-${theme}-600 hover:bg-${theme}-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-${theme}-500 sm:order-1 sm:ml-3`}
                >
                    {trans("reset")}
                </Link>
            </div>
            <div className="flex">
                <div className="md:-mt-px md:flex">
                    {
                        range(1, (lastPage + 1)).map(page =>
                            <Link
                                key={page}
                                href={route().has(`backend.${type}.search`) ?route(`backend.${type}.search`, { page }) : '#'}
                                className={classNames(currentPage === page ? `border-${theme}-700 border-t-2` : '', `border-transparent text-gray-500 hover:text-gray-700 hover:border-${theme}-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`)}
                            >
                                {page}
                            </Link>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}
