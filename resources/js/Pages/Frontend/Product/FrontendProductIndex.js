import React, {useMemo, useState} from 'react'
import FrontendContainer from "../components/FrontendContainer";
import {filter, map, orderBy} from 'lodash';
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import NoElements from "../../Backend/components/widgets/NoElements";
import FrontendPagination from "../partials/FrontendPagination";
import SearchIndexSideBar from "../partials/SearchIndexSideBar";
import SearchIndexSideBarMobile from "../partials/SearchIndexSideBarMobile";
import {useSelector} from "react-redux";
import FrontendSortIndexMenu from "../components/FrontendSortIndexMenu";
import FrontendContentContainer from "../components/FrontendContentContainer";
import NormalProductWidget from "../components/widgets/product/NormalProductWidget";

export default function ({elements, categories, settings }) {
    const {trans, mainColor , contentBgColor, textColor } = useContext(AppContext);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [currentData, setCurrentData] = useState();
    const {sort} = useSelector(state => state);

    useMemo(() => {
        if (!currentData) {
            setCurrentData(elements.data);
        }
    }, [elements.data])

    useMemo(() => {
        setCurrentData(orderBy(elements.data, [sort.colName], [sort.desc ? 'desc' : 'asc']));
    }, [sort.desc])

    return (
        <FrontendContainer >
            <FrontendContentContainer>
                {/* Mobile filter dialog */}
                <SearchIndexSideBarMobile
                    type={'product'}
                    categories={filter(categories, c => c.is_product)}
                    setMobileFiltersOpen={setMobileFiltersOpen}
                    mobileFiltersOpen={mobileFiltersOpen}
                />
                <main className={`${contentBgColor} max-w-2xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:max-w-full lg:px-8`}>
                    <div className="flex flex-1 flex-col sm:flex-row justify-start items-end border-b border-gray-200 pb-5">
                        <div className="flex flex-1 flex-col w-full sm:w-auto">
                            <h1 className={`text-4xl font-extrabold tracking-tight ${textColor} capitalize`}>{trans('products')}</h1>
                            <p className={`mt-4 text-base text-${mainColor}-800 dark:text-${mainColor}-50 capitalize`}>
                                {trans('list')} {trans('products')}
                            </p>
                        </div>
                        <FrontendPagination
                            type={'product'}
                            total={elements.meta.total}
                            links={elements.meta.links}
                            lastPage={elements.meta.last_page}
                            showSearch={false}
                        />
                        {/* sort options */}
                        <FrontendSortIndexMenu/>
                    </div>
                    <div className="pt-5 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 min-h-screen">
                        {/* search SideBar */}
                        <SearchIndexSideBar
                            type={'product'}
                            enablePrice={settings.enable_prices}
                            categories={filter(categories, c => c.is_product)}
                            setMobileFiltersOpen={setMobileFiltersOpen} mobileFiltersOpen={mobileFiltersOpen}/>
                        {/* Product grid */}
                        <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                            <NoElements display={elements.meta.total < 1}/>
                            <div
                                className="grid grid-cols-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 1xl:grid-cols-3 2xl:grid-cols-3 xl:gap-x-8 gap-x-6">
                                {map(currentData, element => (
                                    <NormalProductWidget element={element} key={element.id}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <FrontendPagination
                        type={'product'}
                        total={elements.meta.total}
                        links={elements.meta.links}
                        lastPage={elements.meta.last_page}
                        showSearch={false}
                    />
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
