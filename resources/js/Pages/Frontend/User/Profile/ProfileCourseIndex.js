import {Fragment, useContext, useState} from 'react'
import {AppContext} from "../../../context/AppContext";
import FrontendContainer from "../../components/FrontendContainer";
import route from 'ziggy-js';
import GlobalContext from "../../../context/GlobalContext";
import FrontendContentContainer from "../../components/FrontendContentContainer";
import {useDispatch, useSelector} from "react-redux";
import UserEditSideNav from "./UserEditSideNav";
import { map } from 'lodash';
import {Link} from "@inertiajs/inertia-react";

export default function({ elements }) {
    const {classNames, trans, getThumb, getLocalized} = useContext(AppContext)
    const {auth} = useContext(GlobalContext);
    const {locale} = useSelector(state => state);
    const [availableToHire, setAvailableToHire] = useState(true)
    const [privateAccount, setPrivateAccount] = useState(false)


    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <main className="relative mt-5">
                    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                        <div className="bg-white overflow-hidden">
                            <div className=" lg:grid lg:grid-cols-12">
                                <UserEditSideNav/>
                                <form className=" lg:col-span-9" action="#" method="POST">
                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div className="flex flex-1 justify-between items-center">
                                            <div>
                                                <h2 className="text-lg leading-6 font-medium text-gray-900">{trans('profile')}</h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {trans("my_courses")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 grid grid-cols-12 gap-3">
                                            <div className="col-span-full">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className={classNames(locale.isRTL ? `text-right` : `text-left`, "px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider")}
                                                        >
                                                            {trans('name')}
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        >
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                    {map(elements,element => (
                                                        <tr key={element.name_en}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="flex-shrink-0 h-10 w-10">
                                                                        <img className="h-10 w-10 rounded-full "
                                                                             src={getThumb(element.image)} alt=""/>
                                                                    </div>
                                                                    <div className="ml-4 px-3">
                                                                        <div
                                                                            className="text-sm font-medium text-gray-900">{element[getLocalized()]}</div>
                                                                        <div
                                                                            className="text-sm text-gray-500">{element[getLocalized('caption')]}</div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                </svg>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
