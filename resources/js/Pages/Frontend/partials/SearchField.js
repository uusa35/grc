import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {SearchIcon} from "@heroicons/react/outline";
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {useSelector} from "react-redux";
import { capitalize } from "lodash";

export default function SearchField({type = 'book', setSearchType}) {
    const [search, setSearch] = useState()
    const {trans, classNames } = useContext(AppContext)
    const { locale } = useSelector(state => state);

    const submit = (e) => {
        e.preventDefault();
        window.location.href = route(`frontend.${type}.index`, {search});
    }

    return (
        <div className="hidden xl:flex flex-row px-5">
            <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-800 hidden">
                    {trans('search')}
                </label>
                <div className="mt-1 w-60 relative  shadow-sm">
                    <div className={classNames(locale.isRTL ? `left-0` : `left-32` , "absolute inset-y-0  flex items-center")}>
                        <label htmlFor="search" className="sr-only">
                            {`${trans('search')} `}
                        </label>
                        <select
                            onChange={(e) => setSearchType(e.target.value)}
                            id="type"
                            name="type"
                            defaultValue={type}
                            autoComplete="type"
                            className={classNames(locale.isRTL ? `` :  ``, 'border-t border-b rounded-t-md rounded-b-md focus:border-transparent focus:ring-transparent  h-full py-0 border-transparent bg-transparent text-gray-500 sm:text-sm')}
                        >
                            <option value="book" >{capitalize(trans('books'))}</option>
                            <option value="service" >{capitalize(trans('services'))}</option>
                            <option value="course" >{capitalize(trans('courses'))}</option>
                        </select>
                    </div>
                    <form onSubmit={submit}>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            name="search"
                            id="search"
                            className={classNames(locale.isRTL ? `rounded-r-md` :  `rounded-l-md`, "focus:ring-gray-200 focus:border-gray-200 block w-full px-2 sm:text-sm border-gray-200")}
                            placeholder={`${trans('search')}`}
                        />
                    </form>
                </div>
            </div>
            <div
                className={classNames(locale.isRTL ? `rounded-l-md` :  `rounded-r-md`, "flex justify-center items-center bg-gray-200 shadow-sm  mt-1 border-gray-200")}>
                <Link
                    href={route(`frontend.${type}.index`, {search})}
                    className="px-5">
                    <SearchIcon className="h-5 w-5 text-gray-900 " aria-hidden="true"/>
                </Link>
            </div>
        </div>
    );
}

// <div
//     className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end invisible 2xl:visible">
//     <div className="max-w-lg w-full lg:max-w-xs">
//         <label htmlFor="search" className="sr-only">
//             {trans('search')}
//         </label>
//         <div className="relative">
//             <Link
//                 href={route(`frontend.${type}.index`, { search })}
//                 className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <SearchIcon className="h-5 w-5 text-gray-900" aria-hidden="true"/>
//             </Link>
//             <form onSubmit={submit}>
//                 <input
//                     onChange={(e) => setSearch(e.target.value)}
//                     id="search"
//                     name="search"
//                     className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-2xl leading-5 text-black bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:"
//                     placeholder={`${trans('search')} ${trans(pluralize(type))}`}
//                     type="search"
//                 />
//             </form>
//         </div>
//     </div>
// </div>
