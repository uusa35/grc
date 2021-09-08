import {isEmpty, isUndefined, map, truncate} from "lodash";
import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import moment from "moment";
import {removeFromCart} from "../../redux/actions";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {useDispatch, useSelector} from "react-redux";

export default function() {
    const { trans, getThumb , getLocalized } = useContext(AppContext);
    const { cart } = useSelector(state => state)
    const dispatch = useDispatch();

    return (
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
                    <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex flex-1 flex-row items-center justify-start">
                            {
                                !isUndefined(element.image) && !isEmpty(element.image) && <img
                                    src={getThumb(element.image)}
                                    alt={element[getLocalized()]}
                                    className="w-8 h-auto shadow-md rounded-sm object-cover sm:w-16 sm:h-20"
                                />
                            }
                            <div className="p-3">
                                <Link href={route().has(`frontend.${element.type}.show`) ? route(`frontend.${element.type}.show`, {id: element.element_id}) : '#'}
                                      className=" font-extrabold text-gray-700 hover:text-gray-800">
                                    {element[getLocalized()]}
                                </Link>
                                <p className="capitalize truncate overflow-hidden">
                                    {trans('owner')} : {truncate(element[getLocalized('merchant_name')], 100)}
                                </p>
                                {
                                    element.type === 'product' && <>
                                        <p className="mt-1  text-gray-500">{element.color}</p>
                                        {element.size && <p className="mt-1  text-gray-500">{element.size}</p>}
                                    </>
                                }
                                {element.type === 'service' && element.timing &&
                                <div
                                    className="flex flex-col justify-start">
                                    <div
                                        className="flex flex-col xl:flex-row justify-between capitalize px-2 my-2">
                                        <h1 className="mb-2 pb-1 border-b-2 border-gray-200">{trans('timing')}</h1>
                                        {`${moment(element.timing.date).format('dddd')} ${trans('equivalent')}`}
                                        {` ${moment(element.timing.date).format('L')}`}
                                        <div className="flex capitalize">
                                            {`${trans('from')} ${moment(`${element.timing.date} ${element.timing.start}`).format('HH:mm A')}`}
                                            {` ${trans('to')} ${moment(`${element.timing.date} ${element.timing.end}`).format('HH:mm A')}`}
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
    );
}
