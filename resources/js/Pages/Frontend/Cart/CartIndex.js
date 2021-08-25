import { CheckIcon, ClockIcon } from '@heroicons/react/solid'
import FrontendContainer from "../components/FrontendContainer";
import {useDispatch, useSelector} from "react-redux";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {isEmpty, map} from 'lodash'
import route from 'ziggy-js';
import {Link} from "@inertiajs/inertia-react";
import {getConvertedFinalPrice} from "../../helpers";
import moment from "moment";
import NoElements from "../../Backend/components/widgets/NoElements";
import {removeFromCart} from "../../redux/actions";

export default function CartIndex() {
    const { cart , currency, locale   } = useSelector(state => state);
    const { trans , getThumb , getLocalized, classNames  } = useContext(AppContext);
    const dispatch = useDispatch()

    return (
        <FrontendContainer mainModule={'cart'}>
            <div className="w-full mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 ">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{trans('cart')}</h1>
                <form className="mt-12">
                    <div>
                        <h2 className="sr-only">Items in your shopping cart</h2>

                        <ul role="list" className="border-t border-b divide-y divide-gray-200">
                            {map(cart.items, item =>
                                <li key={item.cart_id} className="py-6 sm:py-10 w-full ">
                                    <div className="grid grid-cols-3 w-full space-y-3 justify-center sm:justify-start items-center">
                                        <div className="col-span-full lg:col-span-1 flex flex-row">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={getThumb(item.image)}
                                                    alt={item[getLocalized()]}
                                                    className="w-16 h-16 shadow-md rounded-lg object-center object-cover sm:w-32 sm:h-32"
                                                />
                                            </div>
                                            <div className="px-3">
                                                    <Link href={route(`frontend.${item.type}.show`, { id : item.element_id })} className=" font-extrabold text-gray-700 hover:text-gray-800">
                                                        {item[getLocalized()]}
                                                    </Link>
                                                    <p className="capitalize truncate">
                                                        {item[getLocalized('description')]}
                                                    </p>
                                                {
                                                    item.type === 'product' && <>
                                                        <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                                                        {item.size && <p className="mt-1 text-sm text-gray-500">{item.size}</p>}
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-span-full lg:col-span-1 ">
                                                <div>
                                                    { item.type === 'product' &&
                                                    <div className="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0">
                                                        {/*<label htmlFor={`quantity-${productIdx}`} className="sr-only">*/}
                                                        {/*    Quantity, {product.name}*/}
                                                        {/*</label>*/}
                                                        <select
                                                            id={`quantity-${item.cart_id}`}
                                                            name={`quantity-${item.cart_id}`}
                                                            className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        >
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={4}>4</option>
                                                            <option value={5}>5</option>
                                                            <option value={6}>6</option>
                                                            <option value={7}>7</option>
                                                            <option value={8}>8</option>
                                                        </select>

                                                        <button
                                                            type="button"
                                                            className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                                                        >
                                                            <span>{trans('remove')}</span>
                                                        </button>
                                                    </div>
                                                    }
                                                    {item.type === 'service' && item.timing &&
                                                    <div
                                                        className="flex flex-col xl:flex-row justify-start items-center text-sm ">
                                                        <div
                                                            className="flex flex-1 flex-col justify-start xl:flex-row w-auto items-center">
                                                                    <span
                                                                        className="flex">{`${moment(item.timing.date).format('dddd')} ${trans('equivalent')}`}</span>
                                                            <span
                                                                className="flex flex-1 justify-start sm:px-2 flex-row">{`${moment(item.timing.date).format('L')}`}</span>
                                                        </div>
                                                        <div
                                                            className="flex flex-col xl:flex-row justify-between items-center">
                                                            <div className="flex capitalize">
                                                                {`${trans('from')} ${moment(`${item.timing.date} ${item.timing.start}`).format('HH:mm A')}`}
                                                            </div>
                                                            <div className="flex ltr:ml-2 rtl:mr-2 capitalize">
                                                                {`${trans('to')} ${moment(`${item.timing.date} ${item.timing.end}`).format('HH:mm A')}`}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                        </div>
                                        <div className="col-span-full sm:col-end-4 lg:col-span-1 flex flex-col justify-between items-end flex-end ">
                                            <p className="text-lg font-extrabold text-gray-900 text-right mb-5">{item.price} {trans('kd')}</p>

                                                {/*{item.inStock ? (*/}
                                                {/*    <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />*/}
                                                {/*) : (*/}
                                                {/*    <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />*/}
                                                {/*)}*/}

                                                {/*<span>{item.inStock ? 'In stock' : `Ships in ${item.leadTime}`}</span>*/}
                                                <button
                                                    className="text-sm flex flex-row justify-around items-center gap-x-3 capitalize p-1 px-3 rounded-md border-2 border-gray-200 shadow-md hover:bg-red-900 hover:text-white"
                                                    onClick={() => dispatch(removeFromCart(item.cart_id))}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                    {trans('remove')}
                                                </button>
                                        </div>

                                    </div>
                                </li>
                            )}
                        </ul>
                        <NoElements display={isEmpty(cart.items)} />
                    </div>

                    {/* Order summary */}
                    <div className="mt-10  sm:mx-10">
                        <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                            <h2 className="sr-only">{trans('order_summary')}</h2>

                            <div className="flow-root">
                                <dl className="-my-4 text-sm divide-y divide-gray-200">
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600 capitalize">{trans('subtotal')}</dt>
                                        <dd className="font-medium text-gray-900">
                                            {cart.total} {trans('kd')}
                                            {!currency.country.is_local && cart.total > 0 && <span className="mx-2">{`(${getConvertedFinalPrice(cart.total, currency.exchange_rate)} ${currency[getLocalized('currency_symbol')]})`}</span>}
                                        </dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600 capitalize">{trans('shipment_fees')}</dt>
                                        <dd className="font-medium text-gray-900">
                                            {cart.shipmentFees} {trans('kd')}
                                            {!currency.country.is_local && cart.shipmentFees > 0 && <span className="mx-2">{`(${getConvertedFinalPrice(cart.shipmentFees, currency.exchange_rate)} ${currency[getLocalized('currency_symbol')]})`}</span>}
                                        </dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-gray-600 capitalize">{trans('discount')}</dt>
                                        <dd className="font-medium text-gray-900">
                                            {cart.discount} {trans('kd')}
                                            {!currency.country.is_local && cart.discount > 0 && <span className="mx-2">{`(${getConvertedFinalPrice(cart.discount, currency.exchange_rate)} ${currency[getLocalized('currency_symbol')]})`}</span>}
                                        </dd>
                                    </div>
                                    <div className="py-4 flex items-center justify-between">
                                        <dt className="text-base font-medium text-gray-900 capitalize">{trans('net_total')}</dt>
                                        <dd className="text-base text-lg font-extrabold text-gray-900">
                                            {cart.netTotal} {trans('kd')}
                                            {!currency.country.is_local && cart.netTotal > 0 && <span className="mx-2">{`(${getConvertedFinalPrice(cart.netTotal, currency.exchange_rate)} ${currency[getLocalized('currency_symbol')]})`}</span>}
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

                        <div className="mt-6 text-sm text-center text-gray-500">
                            <p>
                                <Link href={route('frontend.book.index')} className="flex flex-row gap-x-5 items-center justify-center text-indigo-600 font-medium hover:text-indigo-500">
                                    {trans('continue_shopping')}
                                    {locale.isRTL ? <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>}
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </FrontendContainer>
    )
}
