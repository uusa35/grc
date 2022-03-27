import FrontendContainer from "../components/FrontendContainer";
import React, {useContext, useMemo, useState} from "react";
import {AppContext} from "../../context/AppContext";
import CategoryWidget from "../components/widgets/category/CategoryWidget";
import {map, orderBy} from 'lodash';
import FrontendPagination from "../partials/FrontendPagination";
import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import FrontendContentContainer from "../components/FrontendContentContainer";
import FrontendSortIndexMenu from "../components/FrontendSortIndexMenu";
import {useSelector} from "react-redux";
import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";


export default function({elements}) {
    const enAlphabet = "abcdefghijklmnopqrstuvwxyz";
    const arAlphabet = "ابتثجحخدذرزسشصضطظعغقفكلمنهوي";
    const {trans, contentBgColor, textColor, mainColor, getLocalized, getThumb} = useContext(AppContext);
    const {params} = route();
    const [type, setType] = useState('book')
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [currentData, setCurrentData] = useState();
    const {sort, locale} = useSelector(state => state);
    const [currentAlpha, setCurrentAlpha] = useState(locale.isRTL ? arAlphabet : enAlphabet);

    useMemo(() => {
        if (params && params.is_course) {
            setType('course');
        } else if (params && params.is_service) {
            setType('service')
        } else if (params && params.is_product) {
            setType('product')
        } else if (params && params.is_user) {
            setType('user')
        } else if (params && params.is_book) {
            setType('book')
        }
    }, [])

    useMemo(() => {
        locale.isRTL ? setCurrentData(arAlphabet) : setCurrentData(enAlphabet);
    }, [locale.isRTL])

    useMemo(() => {
        if (!currentData) {
            setCurrentData(elements.data);
        }
    }, [elements.data])

    useMemo(() => {
        setCurrentData(orderBy(elements.data, [sort.colName], [sort.desc ? 'desc' : 'asc']));
    }, [sort.desc])

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <SubMetaElement title={trans('categories')}/>
                <div
                    className={` ${contentBgColor} min-h-screen max-w-2xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:max-w-full lg:px-8`}>
                    <div
                        className={`${contentBgColor} flex flex-1 flex-col sm:flex-row justify-start items-end border-b border-gray-200 pb-5`}>
                        <div className="flex flex-1 flex-col w-full sm:w-auto">
                            <h1 className={`text-4xl font-extrabold tracking-tight ${textColor} capitalize`}>{trans('categories')}</h1>
                            <p className={`mt-4 text-base text-${mainColor}-800 dark:text-${mainColor}-50 capitalize`}>
                                {trans('list')} {trans('categories')}
                            </p>
                        </div>
                    </div>

                    <div className={`flex flex-row mb-10 flex-grow w-full items-center justify-center`}>
                        {currentAlpha.split("").map((c) => {
                            return (
                                <div
                                    className={`flex-grow text-center py-4 hover:border-b hover:border-dashed hover:text-gray-600`}>
                                    <h3><a href={`#${c}`}>{c}</a></h3>
                                </div>
                            );
                        })}
                    </div>

                    <div className={`grid grid-cols-1 lg:grid-cols-4 mb-5`}>
                        {currentAlpha.split("").map((c) => {
                            return (
                                <div className={`col-span-full lg:col-span-1`} id={`${c}`}>
                                    <h3 className={`text-2xl border-b border-dashed p-2 mb-2`}>{c}</h3>
                                    <div className={`flex flex-col border-l border-gray-100`}>
                                        {elements.data.filter((element) => element.name_ar.startsWith(c)).map((item, index) => (
                                            <li key={index} className={`flex flex-row my-2 w-full`}>
                                                <Link href={route('frontend.user.index', {category_user_id: item.id})}
                                                      className={`flex flex-row items-center justify-center`}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         className="h-3 w-3 rtl:ml-2 ltr:mr-2" fill="none"
                                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M20 12H4"/>
                                                    </svg>
                                                    {item[getLocalized()]}
                                                </Link>
                                            </li>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
