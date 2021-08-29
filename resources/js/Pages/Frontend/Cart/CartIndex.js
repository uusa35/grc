import {CheckIcon, ClockIcon} from '@heroicons/react/solid'
import FrontendContainer from "../components/FrontendContainer";
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {isEmpty, isUndefined, map, truncate} from 'lodash'
import route from 'ziggy-js';
import {Link} from "@inertiajs/inertia-react";
import {getConvertedFinalPrice} from "../../helpers";
import moment from "moment";
import NoElements from "../../Backend/components/widgets/NoElements";
import {removeFromCart} from "../../redux/actions";
import CartStepper from "./CartStepper";

export default function CartIndex() {
    const {cart, currency, locale} = useSelector(state => state);
    const {trans, getThumb, getLocalized, classNames} = useContext(AppContext);
    const dispatch = useDispatch()

    console.log('the cart', cart);
    // console.log('the cart items', map(cart.items, item => console.log('the item', item));
    return (
        <FrontendContainer mainModule={'cart'}>
            <div className="w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 ">
                <CartStepper/>
                <h1 className="text-3xl font-extrabold py-5 text-gray-900">{trans('cart')}</h1>
                <table className="min-w-full divide-y divide-gray-200 ltr:text-left rtl:text-right">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {trans('name')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {trans('type')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {trans('qty')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {trans('price')}
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {trans('remove')}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {map(cart.items, (element, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <div className="flex flex-1 flex-row">
                                        {
                                            !isUndefined(element.image) && !isEmpty(element.image) && <img
                                                src={getThumb(element.image)}
                                                alt={element[getLocalized()]}
                                                className="w-8 h-8 shadow-md rounded-lg object-center object-cover sm:w-16 sm:h-16"
                                            />
                                        }
                                        <div className="p-3">
                                            <Link href={route().has(`frontend.${element.type}.show`) ? route(`frontend.${element.type}.show`, {id: element.element_id}) : '#'}
                                                  className=" font-extrabold text-gray-700 hover:text-gray-800">
                                                {element[getLocalized()]}
                                            </Link>
                                            <p className="capitalize truncate overflow-hidden">
                                                {truncate(element[getLocalized('description')], 100)}
                                            </p>
                                            {
                                                element.type === 'product' && <>
                                                    <p className="mt-1  text-gray-500">{element.color}</p>
                                                    {element.size && <p className="mt-1  text-gray-500">{element.size}</p>}
                                                </>
                                            }
                                            {element.type === 'service' && element.timing &&
                                            <div
                                                className="flex flex-col justify-center items-center   ">
                                                <div className="flex">
                                                    <h1>{trans('timing')}</h1>
                                                </div>
                                                <div
                                                    className="flex flex-1 flex-col xl:flex-row justify-start xl:flex-row w-auto items-center">
                                                                    <span
                                                                        className="flex">{`${moment(element.timing.date).format('dddd')} ${trans('equivalent')}`}</span>
                                                    <span
                                                        className="flex flex-1 justify-start sm:px-2 flex-row">{`${moment(element.timing.date).format('L')}`}</span>
                                                </div>
                                                <div
                                                    className="flex flex-col xl:flex-row justify-between items-center">
                                                    <div className="flex capitalize">
                                                        {`${trans('from')} ${moment(`${element.timing.date} ${element.timing.start}`).format('HH:mm A')}`}
                                                    </div>
                                                    <div className="flex ltr:ml-2 rtl:mr-2 capitalize">
                                                        {`${trans('to')} ${moment(`${element.timing.date} ${element.timing.end}`).format('HH:mm A')}`}
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{trans(element.type)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element.qty}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {element.price} {trans('kd')}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <button
                                        className=" flex flex-row justify-around items-center gap-x-3 capitalize p-1 px-3 rounded-md border-2 border-gray-200 shadow-md hover:bg-red-900 hover:text-white"
                                        onClick={() => dispatch(removeFromCart(element.cart_id))}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                        </svg>
                                        {trans('remove')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                <NoElements display={isEmpty(cart.items)}/>

                {/* Order summary */}
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
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                            {trans('checkout')}
                        </button>
                    </div>

                    <div className="mt-6  text-center text-gray-500">
                        <p>
                            <Link href={route('frontend.book.index')}
                                  className="flex flex-row gap-x-5 items-center justify-center text-indigo-600 font-medium hover:text-indigo-500">
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

            </div>
        </FrontendContainer>
    )
}
