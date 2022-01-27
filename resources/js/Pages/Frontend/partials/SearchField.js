import React , {useContext, useMemo, useState} from "react";
import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {SearchIcon} from "@heroicons/react/outline";
import {AppContext} from "../../context/AppContext";
import {useDispatch, useSelector} from "react-redux";
import {capitalize, split, first, map , filter } from "lodash";
import {setSearchType} from "../../redux/actions";
import {Inertia} from "@inertiajs/inertia";
import pluralize from 'pluralize'
import GlobalContext from "../../context/GlobalContext";

const  SearchField  =  ()  => {
    const [search, setSearch] = useState()
    const {trans, classNames  } = useContext(AppContext)
    const { settings } = useContext(GlobalContext);
    const { locale, searchType  } = useSelector(state => state);
    const [requestType,setRequestType] = useState('frontend');
    const dispatch = useDispatch();
    const [types,setStype] = useState([
        {
            name : 'product',
            frontend : settings.enable_products,
            backend : settings.enable_products,
        },
        {
            name : 'book',
            'frontend' : settings.enable_books,
            'backend' : settings.enable_books,
        },
        {
            name : 'service',
            'frontend' : settings.enable_services,
            'backend' : settings.enable_services,
        },
        {
            name : 'course',
            'frontend' : settings.enable_courses,
            'backend' : settings.enable_courses,
        },
        {
            name : 'user',
            'frontend' : settings.enable_books,
            'backend' : settings.enable_books,
        },
        {
            name : 'order',
            'frontend' : false,
            'backend' : true,
        }
    ]);

    useMemo(() => {
        dispatch(setSearchType(first(filter(types, t => t.frontend))))
    },[])



    const submit = (e) => {
        e.preventDefault();
        return Inertia.get(route(`${requestType}.${searchType}.index`, {search}))
    }

    const handleSearchType = (e) => dispatch(setSearchType(e))

    useMemo(() => {
        const currentRoute = first(split(route().current(), '.'))
        setRequestType(currentRoute);
    },[route().current()])

    return (
        <div className="hidden xl:flex flex-row">
            <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-bold text-gray-800 hidden">
                    {trans('search')}
                </label>
                <div className="mt-1 w-60 relative  shadow-sm">
                    <div className={classNames(locale.isRTL ? `left-0` : `left-32` , "absolute inset-y-0  flex items-center")}>
                        <label htmlFor="search" className="sr-only">
                            {`${trans('search')} `}
                        </label>
                        <select
                            onChange={(e) => handleSearchType(e.target.value)}
                            id="type"
                            name="type"
                            defaultValue={searchType}
                            autoComplete="type"
                            className={classNames(locale.isRTL ? `` :  ``, 'border-t border-b rounded-t-md rounded-b-md focus:border-transparent focus:ring-transparent  h-full rtl:pl-4 ltr:pl-1 border-transparent bg-transparent text-gray-500 sm:text-sm font-bold')}
                        >
                            {
                                map(filter(types, t => t[requestType]), type => <option key={`${type.name}`} value={`${type.name}`} >{capitalize(trans(pluralize(type.name)))}</option>)
                            }
                        </select>
                    </div>
                    <form onSubmit={submit}>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            name="search"
                            id="search"
                            className={classNames(locale.isRTL ? `rounded-r-md` :  `rounded-l-md`, "font-bold focus:ring-gray-200 focus:border-gray-200 block w-full px-2 sm:text-sm border-gray-200")}
                            placeholder={`${trans('search')}`}
                        />
                    </form>
                </div>
            </div>
            <div
                className={classNames(locale.isRTL ? `rounded-l-md` :  `rounded-r-md`, "flex justify-center items-center bg-gray-200 shadow-sm  mt-1 border-gray-200")}>
                <Link
                    href={route(`${requestType}.${searchType}.index`, {search})}
                    className="px-5">
                    <SearchIcon className="h-5 w-5 text-gray-900 " aria-hidden="true"/>
                </Link>
            </div>
        </div>
    );
}

export default React.memo(SearchField)
