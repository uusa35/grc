import React, {Fragment, useCallback, useContext, useMemo, useState} from 'react'
import {AppContext} from "../../../context/AppContext";
import FrontendContainer from "../../components/FrontendContainer";
import route from 'ziggy-js';
import GlobalContext from "../../../context/GlobalContext";
import FrontendContentContainer from "../../components/FrontendContentContainer";
import {useDispatch, useSelector} from "react-redux";
import UserEditSideNav from "./UserEditSideNav";
import {isEmpty, map, orderBy, truncate} from 'lodash';
import {Link} from "@inertiajs/inertia-react";
import NoElements from "../../../Backend/components/widgets/NoElements";
import {getFileType} from "../../../helpers";
import {showModal, toggleSort} from "../../../redux/actions";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ToolTipWidget from "../../../Backend/components/widgets/ToolTipWidget";
import TableViewIcon from "@mui/icons-material/TableView";
import ActiveDot from "../../../Backend/components/widgets/ActiveDot";
import {Menu, Transition} from "@headlessui/react";
import {DotsVerticalIcon} from "@heroicons/react/solid";
import moment from "moment";

export default function({elements}) {
    const {classNames, trans, getThumb, getLocalized, getFileUrl, mainColor, mainBgColor} = useContext(AppContext)
    const {auth} = useContext(GlobalContext);
    const [currentData, setCurrentData] = useState();
    const [currentDate, setCurrentDate] = useState(moment().format('DD-MM-Y'))
    const {sort, locale} = useSelector(state => state);
    const dispatch = useDispatch();

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
                <main className="relative pt-5 bg-white ">
                    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                        <div className="overflow-hidden">
                            <div className="lg:grid lg:grid-cols-12 min-h-screen ">
                                <UserEditSideNav/>

                                {/*     orders */}
                                <div
                                    className="col-span-9  shadow border-b overflow-visible border-gray-200 sm:rounded-lg">
                                    <div className="m-5">
                                        <div>
                                            <h2 className="text-lg leading-6 font-medium text-gray-900">{trans('orders')}</h2>
                                            <p className="mt-1 text-sm text-gray-500">
                                                list of orders
                                            </p>
                                        </div>
                                    </div>
                                    <table className="min-w-full border-collapse block md:table">
                                        <thead className="bg-gray-300 block md:table-header-group">
                                        <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                                            <th
                                                scope="col"
                                                className="block md:table-cell px-3 py-3  rtl:text-right ltr:text-left  uppercase tracking-wider tracking-wider"
                                                onClick={useCallback(() => dispatch(toggleSort('id')))}
                                            >
                                                <div className="flex flex-row">
                                                    {sort.desc ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2"
                                                             fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinejoin="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M5 15l7-7 7 7"/>
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2"
                                                             fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinejoin="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M19 9l-7 7-7-7"/>
                                                        </svg>}
                                                    <div>
                                                        {trans('id')}
                                                    </div>
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className=" block md:table-cell px-3 py-3  rtl:text-right ltr:text-left"
                                                onClick={useCallback(() => dispatch(toggleSort('name')))}
                                            >
                                                <div className="flex flex-row">
                                                    {sort.desc ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2"
                                                             fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinejoin="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M5 15l7-7 7 7"/>
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2"
                                                             fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinejoin="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M19 9l-7 7-7-7"/>
                                                        </svg>}
                                                    {trans('name')}
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className=" block md:table-cell px-3 py-3 rtl:text-right ltr:text-left"
                                            >
                                                {trans('owner')}
                                            </th>

                                            <th
                                                scope="col"
                                                className=" block md:table-cell px-3 py-3  rtl:text-right ltr:text-left"
                                                onClick={useCallback(() => dispatch(toggleSort('price')))}
                                            >
                                                <div className="flex flex-row">
                                                    {sort.desc ?
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2"
                                                             fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinejoin="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M5 15l7-7 7 7"/>
                                                        </svg>
                                                        :
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2"
                                                             fill="none"
                                                             viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinejoin="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M19 9l-7 7-7-7"/>
                                                        </svg>}
                                                    {trans('price')}
                                                </div>
                                            </th>
                                            <th
                                                scope="col"
                                                className=" block md:table-cell px-3 py-3 rtl:text-right ltr:text-left"
                                            >
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="flex">
                                                        {trans('created_at')}
                                                    </div>
                                                </div>
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody className="block md:table-row-group">
                                        {
                                            currentData && currentData.map(element =>
                                                <tr className='block md:table-row bg-white border-b border-gray-100 text-gray-500 odd:bg-white even:bg-gray-100'
                                                    key={element.id}>
                                                    <td className=" block md:table-cell px-3 py-4 whitespace-nowrap font-medium text-gray-900">{element.id}</td>
                                                    {/*<td className="px-3 py-4 whitespace-nowrap  text-gray-500">*/}
                                                    {/*    <img className="w-14 h-14  object-contain rounded-md shadow-inner"*/}
                                                    {/*         src={getThumb(element.image)} alt={element[getLocalized('name')]}/>*/}
                                                    {/*</td>*/}
                                                    <td className="block md:table-cell whitespace-nowrap  text-gray-500">
                                                        <div className="flex items-center space-x-3 lg:pl-2">
                                                            <ActiveDot active={element.paid}/>
                                                            {trans('order_no')} {element.id}
                                                        </div>
                                                        <div
                                                            className="block md:table-cell justify-between space-x-3 mt-2 items-center">
                                                        <span
                                                            className={`inline-flex items-center px-2 py-0.5 rounded  font-medium bg-gray-100 text-gray-800`}>
                                                            {element.status}
                                                          </span>
                                                        </div>
                                                    </td>
                                                    <td className="block md:table-cell whitespace-nowrap  text-gray-500">
                                                        <div className="flex flex-col">
                                                            <div className="flex">{element.user[getLocalized()]}</div>
                                                            <div className="flex">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                                                     stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                                                </svg>
                                                                : {element.user.mobile}</div>
                                                            <div className="flex">
                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                     className="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                                                     stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"/>
                                                                </svg>
                                                                {element.user.email}</div>
                                                        </div>
                                                    </td>

                                                    <td className="block md:table-cell whitespace-nowrap  text-gray-500">
                                                        {element.net_price} {trans("kd")}
                                                    </td>
                                                    <td className="block md:table-cell whitespace-nowrap  text-gray-500">
                                                        {moment(element.created_at).format('Y-MM-DD')}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
