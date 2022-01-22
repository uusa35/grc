/* This example requires Tailwind CSS v2.0+ */
import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon, SearchIcon} from '@heroicons/react/solid'
import {useContext, useState} from "react";
import {AppContext} from "../../../context/AppContext";
import {Link} from '@inertiajs/inertia-react'
import route from 'ziggy-js';
import {isEmpty, map} from 'lodash';

export default function Pagination({type, total, links, showSearch = false, mainModule }) {
    const [search, setSearch] = useState('');
    const {trans, classNames } = useContext(AppContext)
    const { params } = route();
    return (
        <nav
            className="grid grid-cols-1 sm:grid-cols-2 flex justify-between items-center  bg-transparent sm:px-0">
            <div
                className={classNames('col-span-full h-auto sm:col-span-1 flex flex-1 justify-start items-center space-x-5')}>
                <div className={classNames(showSearch  ? `visible` : 'invisible' , 'flex flex-1 flex-row justify-start items-center h-auto space-x-5')}>
                    <label htmlFor="search" className="sr-only">
                        {trans('search')}
                    </label>
                    <div className="relative rounded-md shadow-sm w-80">
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
                            defaultValue={search ? search : params?.search}
                            className={`focus:ring-gray-500 focus:border-gray-500 block w-80 pl-9 border-gray-300 rounded-md`}
                            placeholder={trans('search')}
                        />
                    </div>
                    <Link
                        href={(search.length > 2 || params?.search?.length > 2) && route().has(`backend.${mainModule}.index`) ? route(`backend.${mainModule}.index`, {search}) : '#'}
                        disabled={search.length <= 2}
                        className={`py-1 px-3 order-0 inline-flex items-center mt-1 border border-transparent shadow-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 sm:order-1 sm:ml-3`}
                    >
                        {trans("search")}
                    </Link>
                </div>
                {
                    (search.length > 2 || params?.search?.length > 2) && route().has(`backend.${mainModule}.index`) && <Link
                        href={route().has(`backend.${type}.index`) ? route(`backend.${type}.index`) : '#'}
                        className={`py-1 px-2 order-0 inline-flex items-center mt-1 border border-transparent shadow-sm text-sm text-center md font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 sm:order-1 sm:ml-3`}
                    >
                        {trans("reset")}
                    </Link>
                }
            </div>
            <div className="col-span-full sm:col-span-1 flex justify-end mt-5 sm:mt-0">
                {
                    !isEmpty(links) && total > 0 && <div className="md:-mt-px md:flex">
                        {
                            map(links, page =>
                                <Link
                                    key={page.label}
                                    href={route().has(`backend.${type}.index`) && page.url ? page.url : '#'}
                                    className={classNames(page.active ? `border-gray-800 border-t-2` : '', `border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center font-medium`)}
                                >
                                    {page.label}
                                </Link>
                            )
                        }
                    </div>
                }
            </div>
        </nav>
    )
}
