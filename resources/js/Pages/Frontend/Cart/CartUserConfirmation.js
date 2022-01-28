import {useContext, useMemo, useState} from 'react'
import FrontendContainer from "../components/FrontendContainer";
import FrontendContentContainer from "../components/FrontendContentContainer";
import CartStepper from "./CartStepper";
import {AppContext} from "../../context/AppContext";
import {useDispatch, useSelector} from "react-redux";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import {filter, first, map, round} from "lodash";
import route from "ziggy-js";
import {setShipmentFees} from "../../redux/actions";
import ToolTipWidget from "../../Backend/components/widgets/ToolTipWidget";


export default function({countries, auth}) {
    const {trans, getThumb, getLocalized, classNames} = useContext(AppContext);
    const [areas, setAreas] = useState([])
    const {locale, cart, settings } = useSelector(state => state);
    const dispatch = useDispatch();
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        'name': auth ? auth.name_ar : '',
        'name_ar': auth ? auth.name_ar : '',
        'name_en': auth ? auth.name_ar : '',
        'email': auth ? auth.email : '',
        'mobile': auth ? auth.mobile : '',
        'phone': auth ? auth.phone : '',
        'area': auth ? auth.area : '',
        'block': auth ? auth.block : '',
        'street': auth ? auth.street : '',
        'building': auth ? auth.building : '',
        'floor': auth ? auth.floor : '',
        'apartment': auth ? auth.apartment : '',
        'country_name': auth ? auth.country_name : '',
        'country_id': auth ? auth.country_id : '',
        'area_id': auth ? auth.area_id : '',
        'cart': cart
    });

    useMemo(() => {
        dispatch({type: 'SET_CART_ID', payload: auth.id})
        const selectedCountry = data.country_id ? first(filter(countries, c => c.id == data.country_id)) : first(countries);
        dispatch(setShipmentFees(settings.apply_global_shipment ? settings.shipment_fixed_rate : round(parseFloat(selectedCountry.fixed_shipment_charge * cart.items.length), 2)))
    }, [])

    useMemo(() => {
        const selectedCountry = data.country_id ? first(filter(countries, c => c.id == data.country_id)) : first(countries);
        setAreas(selectedCountry.areas)
        setData('area_id', auth && auth.area_id ? auth.area_id :  first(selectedCountry.areas).id)
        // dispatch(setShipmentFees(settings.apply_global_shipment ? settings.shipment_fixed_rate : round(parseFloat(selectedCountry.fixed_shipment_charge * cart.items.length), 2)))
    }, [data.country_id])

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('frontend.cart.payment.post'), {...data})
    }

    return (
        <FrontendContainer>
            <FrontendContentContainer>

                <div className="w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 ">
                    <CartStepper activeStep={3}/>
                    <h1 className="text-3xl font-extrabold py-5 text-gray-900">{trans('confirm')} {trans('information')}</h1>

                    <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 gap-y-5 mt-5">
                        <div className="col-span-full">
                            <h2 className="text-lg font-medium text-gray-900">{trans('contact')} {trans('information')}</h2>
                        </div>
                        {/* name */}
                        <div className="lg:col-span-1">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-800">
                                {trans('name')}*
                            </label>
                            <div className="mt-1">
                                <input
                                    disabled
                                    onChange={handleChange}
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    defaultValue={auth.name_ar}
                                    autoComplete="given-name"
                                    className="block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.name && <div className={`text-red-900`}>{errors.name}</div>}
                                </p>
                            </div>
                        </div>
                        {/*email*/}
                        <div className="lg:col-span-1">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-800">
                                {trans('email')}*
                            </label>
                            <div className="mt-1">
                                <input
                                    disabled
                                    onChange={handleChange}
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    defaultValue={auth.email}
                                    className="block w-full bg-gray-100 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.email && <div className={`text-red-900`}>{errors.email}</div>}
                                </p>
                            </div>
                        </div>
                        {/*mobile*/}
                        <div className="lg:col-span-1">
                            <label htmlFor="mobile" className="block text-sm font-medium text-gray-800">
                                {trans('mobile')}
                            </label>
                            <div className="mt-1">
                                <input
                                    disabled
                                    onChange={handleChange}
                                    type="number"
                                    id="mobile"
                                    name="mobile"
                                    defaultValue={auth.mobile}
                                    autoComplete="mobile"
                                    className="block w-full bg-gray-100  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.mobile && <div className={`text-red-900`}>{errors.mobile}</div>}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <h2 className="text-lg font-medium text-gray-900">{trans('contact')} {trans('address')}</h2>
                        </div>

                        {/* country_id */}
                        <div className="lg:col-span-1">
                            <label htmlFor="country_id" className="block   text-gray-800">
                                {trans('country')}
                            </label>
                            <div className="mt-1">
                                <select
                                    disabled
                                    onChange={handleChange}
                                    id="country_id"
                                    name="country_id"
                                    defaultValue={data.country_id}
                                    autoComplete="country_id"
                                    required
                                    className={`shadow-sm bg-gray-100  focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                >
                                    {
                                        map(countries, u => (
                                            <option key={u.id} value={u.id}
                                            >{u[getLocalized()]}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <ToolTipWidget message={trans('user_instruction')}/>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.country_id && <div className={`text-red-900`}>{errors.country_id}</div>}
                            </p>
                        </div>
                        {/* area_id */}
                        {
                            areas && <div className="lg:col-span-1">
                                <label htmlFor="area_id" className="block   text-gray-800">
                                    {trans('area')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        disabled
                                        onChange={handleChange}
                                        id="area_id"
                                        name="area_id"
                                        defaultValue={data.area_id}
                                        autoComplete="area_id"
                                        required
                                        className={`shadow-sm bg-gray-100  focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                    >
                                        {
                                            map(areas, u => (
                                                <option key={u.id} value={u.id}
                                                >{u[getLocalized()]}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <ToolTipWidget message={trans('user_instruction')}/>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.area_id && <div className={`text-red-900`}>{errors.area_id}</div>}
                                </p>
                            </div>
                        }

                        {/* block */}
                        <div className="lg:col-span-1">
                            <label htmlFor="block" className="block text-sm font-medium text-gray-800">
                                {trans('block')}
                            </label>
                            <div className="mt-1">
                                <input
                                    disabled
                                    onChange={handleChange}
                                    type="text"
                                    id="block"
                                    name="block"
                                    defaultValue={auth.block}
                                    autoComplete="given-block"
                                    className="block w-full bg-gray-100  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.block && <div className={`text-red-900`}>{errors.block}</div>}
                                </p>
                            </div>
                        </div>

                        {/* street */}
                        <div className="lg:col-span-1">
                            <label htmlFor="street" className="street text-sm font-medium text-gray-800">
                                {trans('street')}
                            </label>
                            <div className="mt-1">
                                <input
                                    disabled
                                    onChange={handleChange}
                                    type="text"
                                    id="street"
                                    name="street"
                                    defaultValue={auth.street}
                                    autoComplete="given-street"
                                    className="street w-full bg-gray-100  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.street && <div className={`text-red-900`}>{errors.street}</div>}
                                </p>
                            </div>
                        </div>

                        {/* building */}
                        <div className="lg:col-span-1">
                            <label htmlFor="building" className="building text-sm font-medium text-gray-800">
                                {trans('building')}
                            </label>
                            <div className="mt-1">
                                <input
                                    disabled
                                    onChange={handleChange}
                                    type="text"
                                    id="building"
                                    name="building"
                                    defaultValue={auth.building}
                                    autoComplete="given-building"
                                    className="building w-full bg-gray-100  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.building && <div className={`text-red-900`}>{errors.building}</div>}
                                </p>
                            </div>
                        </div>

                        {/* apartment */}
                        <div className="lg:col-span-1">
                            <label htmlFor="apartment" className="apartment text-sm font-medium text-gray-800">
                                {trans('apartment')}
                            </label>
                            <div className="mt-1">
                                <input
                                    disabled
                                    onChange={handleChange}
                                    type="text"
                                    id="apartment"
                                    name="apartment"
                                    defaultValue={auth.apartment}
                                    autoComplete="given-apartment"
                                    className="apartment w-full bg-gray-100  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.apartment && <div className={`text-red-900`}>{errors.apartment}</div>}
                                </p>
                            </div>
                        </div>


                        {/* floor */}
                        <div className="lg:col-span-1">
                            <label htmlFor="floor" className="floor text-sm font-medium text-gray-800">
                                {trans('floor')}
                            </label>
                            <div className="mt-1">
                                <input
                                    disabled
                                    onChange={handleChange}
                                    type="text"
                                    id="floor"
                                    name="floor"
                                    defaultValue={auth.floor}
                                    autoComplete="given-floor"
                                    className="floor w-full bg-gray-100  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.floor && <div className={`text-red-900`}>{errors.floor}</div>}
                                </p>
                            </div>
                        </div>
                    </form>
                    <div className="mt-10 col-span-full flex  flex-wrap justify-between w-full">
                        <Link
                            href={route('frontend.cart.information')}
                            className="flex flex-row justify-between items-center bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                        >
                            <div className="flex">
                                {locale.isRTL ?
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M9 5l7 7-7 7"/>
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                           viewBox="0 0 24 24"
                                           stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 19l-7-7 7-7"/>
                                    </svg>
                                }
                            </div>
                            <span className="flex ltr:pt-2">
                                    {trans('previous')}
                                </span>
                        </Link>
                        <div className="flex">
                            {
                                auth ?
                                    <form method="post" onSubmit={handleSubmit}>
                                        <button
                                            type="submit"
                                            className={classNames(auth ? `bg-gray-600` : `bg-gray-300`, "flex flex-row justify-between items-center border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500")}
                                        >
                                                 <span className="flex ltr:pt-2">
                                            {trans('next')}
                                            </span>
                                            <div className="flex">
                                                {locale.isRTL ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                         fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2} d="M15 19l-7-7 7-7"/>
                                                    </svg> :
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6"
                                                         fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2} d="M9 5l7 7-7 7"/>
                                                    </svg>}
                                            </div>
                                        </button>
                                    </form>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>

    )
}
