import {Menu, Transition} from "@headlessui/react";
import {ChevronDownIcon, FilterIcon} from "@heroicons/react/solid";
import React, {Fragment, useContext} from "react";
import {toggleSort} from "../../redux/actions";
import {AiOutlineSortAscending} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {AppContext} from "../../context/AppContext";
import { map , filter } from 'lodash'

export default function FrontendSortIndexMenu({ showPrice = true }) {
    const { trans, getLocalized , classNames, mainColor, mainBgColor, getTheme } = useContext(AppContext);
    const { sort } = useSelector(state => state);
    const dispatch = useDispatch();
    const sortOptions = [
        {name: 'alphabetical_a_to_z', current: false, colName: getLocalized(), display : true },
        {name: 'new_to_old', current: false, colName: 'id', display : true },
        {name: 'sort_price', current: false, colName: 'price', display: showPrice},
    ]
    return (
        <div className="flex w-full sm:w-auto justify-between items-center">
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                    className={`w-40 group inline-flex px-3 py-1 mt-flex flex-1 justify-between items-center gap-x-3 text-${mainColor}-${getTheme(800,50)} hover:text-${mainColor}-${getTheme(800,50)} ring-2 text-${mainColor}-${getTheme(800,50)} rounded-md`}>
                    {trans('sort')}
                    <ChevronDownIcon
                        className={`flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-${mainColor}-${getTheme(800,400)} group-hover:text-${mainColor}-${getTheme(800,600)}`}
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
                            {map(filter(sortOptions, o => o.display), option => (
                                <Menu.Item key={option.name}>
                                    {({active}) => (
                                        <div
                                            onClick={() => dispatch(toggleSort(option.colName))}
                                            className={classNames(
                                                option.current ? `text-${mainColor}-${getTheme(800,400)}` : `text-${mainColor}-${getTheme(800,400)}`,
                                                active ? `bg-${mainBgColor}-${getTheme(50,800)}` : '',
                                                'block flex flex-row flex-1 justify-between items-center px-4 py-2 text-md font-extrabold'
                                            )}
                                        >
                                            {trans(option.name)}
                                            <AiOutlineSortAscending size={25} className={`text-${mainColor}-${getTheme(800,400)}`}/>
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
                className={`p-2 mx-8 text-${mainColor}-${getTheme(800,50)} hover:text-gray-500 lg:hidden`}
                onClick={() => setMobileFiltersOpen(true)}
            >
                <span className="sr-only">{trans('filters')}</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true"/>
            </button>
        </div>
    );
}
