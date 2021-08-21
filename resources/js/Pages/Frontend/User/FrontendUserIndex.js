import React, {Fragment, useMemo, useState} from 'react'
import {Transition, Menu} from '@headlessui/react'
import {ChevronDownIcon, FilterIcon} from '@heroicons/react/solid'
import FrontendContainer from "../components/FrontendContainer";
import {AiOutlineSortAscending} from "react-icons/ai";
import {filter, map, orderBy} from 'lodash';
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import NormalUserWidget from "../components/widgets/user/NormalUserWidget";
import NoElements from "../../Backend/components/widgets/NoElements";
import FrontendPagination from "../partials/FrontendPagination";
import SearchIndexSideBar from "../partials/SearchIndexSideBar";
import SearchIndexSideBarMobile from "../partials/SearchIndexSideBarMobile";

export default function FrontendUserIndex({elements, categories}) {
    const {
        trans, getLocalized, classNames, handleSort, colName,
        sortDesc,
    } = useContext(AppContext);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [currentData, setCurrentData] = useState();
    const sortOptions = [
        {name: 'alphabetical_a_to_z', current: false, colName: getLocalized()},
        {name: 'new_to_old', current: false, colName: 'id'},
    ]

    useMemo(() => {
        if (!currentData) {
            setCurrentData(elements.data);
        }
    }, [elements.data])

    useMemo(() => {
        if (sortDesc) {
            setCurrentData(orderBy(elements.data, [colName], ['desc']));
        } else {
            setCurrentData(orderBy(elements.data, [colName], ['asc']));
        }
    }, [sortDesc])

    return (
        <FrontendContainer mainModule={'user'} subModule={''}>
            {/* Mobile filter dialog */}
            <SearchIndexSideBarMobile
                type={'user'}
                categories={filter(categories, c => c.is_user)}
                                      setMobileFiltersOpen={setMobileFiltersOpen}
                                      mobileFiltersOpen={mobileFiltersOpen}
            />
            <main className="max-w-2xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:max-w-full lg:px-8">
                <div className="flex flex-1 flex-col sm:flex-row justify-start items-end border-b border-gray-200 pb-5">
                    <div className="flex flex-1 flex-col w-full sm:w-auto">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 capitalize">{trans('authors')}</h1>
                        <p className="mt-4 text-base text-gray-500 capitalize">
                            {trans('list')} {trans('authors')}
                        </p>
                    </div>
                    <FrontendPagination
                        type={'user'}
                        total={elements.meta.total}
                        links={elements.meta.links}
                        showSearch={false}
                    />
                    {/* sort options */}
                    <div className="flex w-full sm:w-auto justify-between items-center mt-10 sm:mt-0">
                        <Menu as="div" className="relative inline-block text-left">
                            <Menu.Button
                                className="w-40 group inline-flex px-3 py-1 mt-flex flex-1 justify-between items-center gap-x-3 text-gray-800 hover:text-gray-900 ring-2 ring-gray-400 rounded-md ">
                                {trans('sort')}
                                <ChevronDownIcon
                                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    className="origin-top-right absolute z-50 -right-20 mt-2 w-56 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <Menu.Item key={option.name}>
                                                {({active}) => (
                                                    <div
                                                        onClick={() => handleSort(option.colName)}
                                                        className={classNames(
                                                            option.current ? ' text-gray-900' : 'text-gray-500',
                                                            active ? 'bg-gray-100' : '',
                                                            'block flex flex-row flex-1 justify-between items-center px-4 py-2 text-md font-extrabold'
                                                        )}
                                                    >
                                                        {trans(option.name)}
                                                        <AiOutlineSortAscending size={25} className={'text-gray-400'}/>
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        <button
                            type="button"
                            className="p-2 mx-8 text-gray-100 bg-gray-900 rounded-full p-3 shadow-md hover:text-gray-500 lg:hidden"
                            onClick={() => setMobileFiltersOpen(true)}
                        >
                            <span className="sr-only">{trans('filters')}</span>
                            <FilterIcon className="w-5 h-5" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
                <div className="pt-5 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4 min-h-screen">
                    {/* search SideBar */}
                    <SearchIndexSideBar
                        type={'user'}
                        categories={filter(categories, c => c.is_user)}
                        setMobileFiltersOpen={setMobileFiltersOpen} mobileFiltersOpen={mobileFiltersOpen}/>
                    {/* Product grid */}
                    <div className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3">
                        <NoElements display={elements.meta.total < 1}/>
                        <div
                            className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {map(currentData, element => (
                                <NormalUserWidget element={element} key={element.id}/>
                            ))}
                        </div>
                    </div>
                </div>
                <FrontendPagination
                    type={'user'}
                    total={elements.meta.total}
                    links={elements.meta.links}
                    showSearch={false}
                />
            </main>
        </FrontendContainer>
    )
}
