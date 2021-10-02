import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {SearchIcon} from "@heroicons/react/outline";
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import pluralize from 'pluralize'

export default function SearchField({ type = 'book'}) {
    const[search,setSearch] = useState()
    const { trans } = useContext(AppContext)
    return (
        <div
            className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end invisible 2xl:visible">
            <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                    {trans('search')}
                </label>
                <div className="relative">
                    <Link
                        href={route(`frontend.${type}.index`, { search })}
                        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-900" aria-hidden="true"/>
                    </Link>
                    <form onSubmit={() => route(`frontend.${type}.index`, { search })}>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            id="search"
                            name="search"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-2xl leading-5 text-black bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:"
                            placeholder={`${trans('search')} ${trans(pluralize(type))}`}
                            type="search"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
