import {getConvertedFinalPrice} from "../../helpers";
import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {useSelector} from "react-redux";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";

export default function () {
    const {cart, currency, locale} = useSelector(state => state);
    const {trans, getThumb, getLocalized, classNames} = useContext(AppContext);
    return (
        <div className="mt-10  sm:mx-10">
            <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="sr-only">{trans('order_summary')}</h2>

                <div className="flow-root">
                    <dl className="-my-4  divide-y divide-gray-200">
                        <div className="py-4 flex items-center justify-between">
                            <dt className="text-gray-600 capitalize">{trans('subtotal')}</dt>
                            <dd className="font-medium text-gray-900">
                                {cart.total} {trans('kd')}
                                {!currency.country.is_local && cart.total > 0 && <span
                                    className="mx-2">{`(${getConvertedFinalPrice(cart.total, currency.exchange_rate)} ${currency[getLocalized('currency_symbol')]})`}</span>}
                            </dd>
                        </div>
                        <div className="py-4 flex items-center justify-between">
                            <dt className="text-gray-600 capitalize">{trans('shipment_fees')}</dt>
                            <dd className="font-medium text-gray-900">
                                {cart.shipmentFees} {trans('kd')}
                                {!currency.country.is_local && cart.shipmentFees > 0 && <span
                                    className="mx-2">{`(${getConvertedFinalPrice(cart.shipmentFees, currency.exchange_rate)} ${currency[getLocalized('currency_symbol')]})`}</span>}
                            </dd>
                        </div>
                        <div className="py-4 flex items-center justify-between">
                            <dt className="text-gray-600 capitalize">{trans('discount')}</dt>
                            <dd className="font-medium text-gray-900">
                                {cart.discount} {trans('kd')}
                                {!currency.country.is_local && cart.discount > 0 && <span
                                    className="mx-2">{`(${getConvertedFinalPrice(cart.discount, currency.exchange_rate)} ${currency[getLocalized('currency_symbol')]})`}</span>}
                            </dd>
                        </div>
                        <div className="py-4 flex items-center justify-between">
                            <dt className="text-base font-medium text-gray-900 capitalize">{trans('net_total')}</dt>
                            <dd className="text-base text-lg font-extrabold text-gray-900">
                                {cart.netTotal} {trans('kd')}
                                {!currency.country.is_local && cart.netTotal > 0 && <span
                                    className="mx-2">{`(${getConvertedFinalPrice(cart.netTotal, currency.exchange_rate)} ${currency[getLocalized('currency_symbol')]})`}</span>}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="mt-10 flex justify-end">
                <Link
                    href={route('frontend.cart.information')}
                    className="bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                >
                    {trans('next')}
                </Link>
            </div>

            <div className="mt-6  text-center text-gray-500">
                <p>
                    <Link href={route('frontend.home')}
                          className="flex flex-row gap-x-5 items-center justify-center text-gray-600 font-medium hover:text-gray-500">
                        {trans('continue_shopping')}
                        {locale.isRTL ?
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                      clipRule="evenodd"/>
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
                            </svg>}
                    </Link>
                </p>
            </div>
        </div>
    );
}
