/* This example requires Tailwind CSS v2.0+ */

import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js';

export default function({currentStatus, isPaid, id }) {
    const {trans, classNames, isAdminOrAbove } = useContext(AppContext);

    return (
        <nav aria-label="Progress print:hidden">
            <ol role="list" className="p-8 md:flex md:space-y-0 md:gap-x-8 hidden md:block">
                {/* paid or pending */}
                <li className={classNames(false ? `border-green-900` : `border-gray-100`, "flex flex-1 items-center justify-center border-t-4")}>
                    <Link
                        href="#"
                        disabled
                        className="pl-4 py-2 flex flex-1  flex-col items-center justify-center  md:pl-0 md:pt-4 md:pb-0"
                    >
                            <span
                                className={classNames(currentStatus === 'paid' && isPaid ? `bg-green-900` : `bg-red-900`, "text-xs text-gray-50 font-semibold flex items-center justify-center rounded-full h-20 w-20")}>
                                {isPaid && currentStatus === 'paid' ? trans('paid') : trans('pending')}
                            </span>
                        <span className="text-sm font-medium mt-5">
                                {isPaid && currentStatus === 'paid' ? trans('paid') : trans('pending')}
                            </span>
                    </Link>
                </li>
                {/*     failed */}
                <li className={classNames(false ? `border-green-900` : `border-gray-100`, "flex flex-1 items-center justify-center border-t-4")}>
                    <Link
                        href="#"
                        disabled
                        className="pl-4 py-2 flex flex-1  flex-col items-center justify-center  md:pl-0 md:pt-4 md:pb-0"
                    >
                            <span
                                className={classNames(currentStatus === 'failed' ? `bg-red-900` : `bg-gray-200`, "text-xs text-gray-50 font-semibold flex items-center justify-center rounded-full h-20 w-20")}>
                                {trans('failed')}
                            </span>
                        <span className="text-sm font-medium mt-5">
                                {trans('failed')}
                            </span>
                    </Link>
                </li>
                {
                    isPaid && currentStatus === 'paid' ? <>
                        <li className={classNames(false ? `border-green-900` : `border-gray-100`, "flex flex-1 items-center justify-center border-t-4")}>
                            <Link
                                href={isAdminOrAbove ? route('backend.order.switch', { status : 'under_process', order_id : id}) : '#'}
                                className="pl-4 py-2 flex flex-1  flex-col items-center justify-center  md:pl-0 md:pt-4 md:pb-0"
                            >
                            <span
                                className={classNames(currentStatus === 'under_process' ? `bg-green-900` : `bg-gray-200`, "text-xs text-gray-50 font-semibold flex items-center justify-center rounded-full h-20 w-20")}>
                                {trans('under_process')}
                            </span>
                                <span className="text-sm font-medium mt-5">
                                {trans('under_process')}
                            </span>
                            </Link>
                        </li>
                        <li className={classNames(false ? `border-green-900` : `border-gray-100`, "flex flex-1 items-center justify-center border-t-4")}>
                            <Link
                                href={isAdminOrAbove ? route('backend.order.switch', { status : 'completed', order_id : id}) : '#'}
                                className="pl-4 py-2 flex flex-1  flex-col items-center justify-center  md:pl-0 md:pt-4 md:pb-0"
                            >
                            <span
                                className={classNames(currentStatus === 'completed' ? `bg-green-900` : `bg-gray-200`, "text-xs text-gray-50 font-semibold flex items-center justify-center rounded-full h-20 w-20")}>
                                {trans('completed')}
                            </span>
                                <span className="text-sm font-medium mt-5">
                                {trans('completed')}
                            </span>
                            </Link>
                        </li>
                    </> : null
                }
            </ol>
        </nav>
    )
}
