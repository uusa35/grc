import {useContext, useMemo, useState} from 'react'
import FrontendContainer from "../components/FrontendContainer";
import FrontendContentContainer from "../components/FrontendContentContainer";
import CartStepper from "./CartStepper";
import {AppContext} from "../../context/AppContext";
import {useDispatch, useSelector} from "react-redux";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import {filter, first, isEmpty, map} from "lodash";
import {Inertia} from "@inertiajs/inertia";
import route from "ziggy-js";
import ToolTipWidget from "../../Backend/components/widgets/ToolTipWidget";


export default function({countries, auth}) {
    const {trans, getLocalized, classNames, mainColor, mainBgColor, contentBgColor, textColor, btnClass  } = useContext(AppContext);
    const {locale} = useSelector(state => state);
    const [governates, setGovernates] = useState([])
    const [areas, setAreas] = useState([])
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        'name': auth ? auth.name_ar : '',
        'name_ar': auth ? auth.name_ar : '',
        'name_en': auth ? auth.name_ar : '',
        'email': auth ? auth.email : '',
        'mobile': auth ? auth.mobile : '',
        'phone': auth ? auth.phone : '',
        'block': auth ? auth.block : '',
        'street': auth ? auth.street : '',
        'building': auth ? auth.building : '',
        'floor': auth ? auth.floor : '',
        'apartment': auth ? auth.apartment : '',
        'country_name': auth ? auth.country_name : '',
        'area_name': auth ? auth.area_name : '',
        'country_id': auth ? auth.country_id : '',
        'area_id': auth ? auth.area_id : '',
        'governate_id': auth ? auth.governate_id : '',
    });

    useMemo(() => {
        const selectedCountry = data.country_id ? first(filter(countries, c => c.id == data.country_id)) : first(countries);
        setGovernates(selectedCountry.governates)
        const areas = first(selectedCountry.governates).areas;
        setAreas(areas)
        setData('area_id', first(areas).id)
    }, [data.country_id])

    useMemo(() => {
        if (!isEmpty(governates)) {
            const selectedGovernate = data.governate_id ? first(filter(governates, c => c.id == data.governate_id)) : first(governates);
            setAreas(selectedGovernate.areas);
            setData('area_id', first(selectedGovernate.areas).id)
        }
    }, [data.governate_id])

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()
        if (auth && auth.id) {
            Inertia.post(route(`frontend.user.update`, auth.id), {
                _method: 'put',
                ...data,
                image: data.image,
            }, {
                forceFormData: true,
                onSuccess: () => Inertia.get(route('frontend.cart.confirmation', {
                    _method : 'get',
                    ...data
                }))

            })
        } else {
            Inertia.post(route(`frontend.user.store`), {
                _method: 'post',
                ...data,
                image: data.image,
            }, {
                forceFormData: true,
                onSuccess: () => Inertia.get(route('frontend.cart.confirmation', {
                    _method : 'get',
                    ...data
                }))
            })
        }
    }

    return (
        <FrontendContainer>
            <FrontendContentContainer>

                <div
                    className={`w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 ${textColor} ${contentBgColor}`}>
                    <CartStepper activeStep={2}/>
                    <h1 className="text-3xl font-extrabold py-5 ">{trans('information')}</h1>

                    <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16 gap-y-5 mt-5" onSubmit={submit}>
                        <div className="col-span-full">
                            <h2 className="text-lg font-medium "> {trans('information')}</h2>
                        </div>
                        {/* name */}
                        <div className="lg:col-span-1">
                            <label htmlFor="first-name" className="block text-sm font-medium ">
                                {trans('name')}*
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    defaultValue={data.name_ar}
                                    autoComplete="given-name"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.name && <div className={`text-red-900`}>{errors.name}</div>}
                                </p>
                            </div>
                        </div>
                        {/*email*/}
                        <div className="lg:col-span-1">
                            <label htmlFor="email-address" className="block text-sm font-medium ">
                                {trans('email')}*
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    defaultValue={data.email}
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.email && <div className={`text-red-900`}>{errors.email}</div>}
                                </p>
                            </div>
                        </div>
                        {/*mobile*/}
                        <div className="lg:col-span-1">
                            <label htmlFor="mobile" className="block text-sm font-medium ">
                                {trans('mobile')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="number"
                                    id="mobile"
                                    name="mobile"
                                    defaultValue={data.mobile}
                                    autoComplete="mobile"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.mobile && <div className={`text-red-900`}>{errors.mobile}</div>}
                                </p>
                            </div>
                        </div>
                        <div className="col-span-full">
                            <h2 className="text-lg font-medium "> {trans('address')}</h2>
                        </div>

                        {/* country_id */}
                        <div className="lg:col-span-1">
                            <label htmlFor="country_id" className="block   ">
                                {trans('country')}
                            </label>
                            <div className="mt-1">
                                <select
                                    onChange={handleChange}
                                    id="country_id"
                                    name="country_id"
                                    defaultValue={data.country_id}
                                    autoComplete="country_id"
                                    required
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black`}
                                >
                                    <option value="">{trans('choose')} {trans('country')}</option>
                                    {
                                        map(countries, u => (
                                            <option key={u.id} value={u.id}
                                            >{u[getLocalized()]}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <ToolTipWidget message={trans('user_instruction')}/>
                            <p className={`mt-2  `}>
                                {errors.country_id && <div className={`text-red-900`}>{errors.country_id}</div>}
                            </p>
                        </div>
                        {/* governate_id  */}
                        {
                            governates && <div className="lg:col-span-1">
                                <label htmlFor="governate_id" className="block   ">
                                    {trans('governate')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        required
                                        onChange={handleChange}
                                        id="governate_id"
                                        name="governate_id"
                                        defaultValue={data.governate_id}
                                        autoComplete="governate_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black`}
                                    >
                                        {/*<option value="">{trans('choose')} {trans('governate')}</option>*/}
                                        {
                                            map(governates, u => (
                                                <option key={u.id} value={u.id}
                                                >{u[getLocalized()]}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <ToolTipWidget message={trans('user_instruction')}/>
                                <p className={`mt-2  `}>
                                    {errors.governate_id && <div className={`text-red-900`}>{errors.governate_id}</div>}
                                </p>
                            </div>
                        }
                        {/* area_id */}
                        {
                            areas && <div className="lg:col-span-1">
                                <label htmlFor="area_id" className="block   ">
                                    {trans('area')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        required
                                        id="area_id"
                                        name="area_id"
                                        defaultValue={data.area_id}
                                        autoComplete="area_id"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md text-black`}
                                    >
                                        {/*<option value="">{trans('choose')} {trans('area')}</option>*/}
                                        {
                                            map(areas, u => (
                                                <option key={u.id} value={u.id}
                                                >{u[getLocalized()]}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <ToolTipWidget message={trans('user_instruction')}/>
                                <p className={`mt-2  `}>
                                    {errors.area_id && <div className={`text-red-900`}>{errors.area_id}</div>}
                                </p>
                            </div>
                        }

                        {/* block */}
                        <div className="lg:col-span-1">
                            <label htmlFor="block" className="block text-sm font-medium ">
                                {trans('block')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="block"
                                    name="block"
                                    required
                                    defaultValue={data.block}
                                    autoComplete="given-block"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.block && <div className={`text-red-900`}>{errors.block}</div>}
                                </p>
                            </div>
                        </div>

                        {/* street */}
                        <div className="lg:col-span-1">
                            <label htmlFor="street" className="street text-sm font-medium ">
                                {trans('street')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="street"
                                    name="street"
                                    required
                                    defaultValue={data.street}
                                    autoComplete="given-street"
                                    className=" w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.street && <div className={`text-red-900`}>{errors.street}</div>}
                                </p>
                            </div>
                        </div>

                        {/* building */}
                        <div className="lg:col-span-1">
                            <label htmlFor="building" className="building text-sm font-medium ">
                                {trans('building')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="building"
                                    name="building"
                                    required
                                    defaultValue={data.building}
                                    autoComplete="given-building"
                                    className=" w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.building && <div className={`text-red-900`}>{errors.building}</div>}
                                </p>
                            </div>
                        </div>

                        {/* apartment */}
                        <div className="lg:col-span-1">
                            <label htmlFor="apartment" className="apartment text-sm font-medium ">
                                {trans('apartment')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="apartment"
                                    name="apartment"
                                    defaultValue={data.apartment}
                                    autoComplete="given-apartment"
                                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.apartment && <div className={`text-red-900`}>{errors.apartment}</div>}
                                </p>
                            </div>
                        </div>


                        {/* floor */}
                        <div className="lg:col-span-1">
                            <label htmlFor="floor" className="floor text-sm font-medium ">
                                {trans('floor')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    id="floor"
                                    name="floor"
                                    defaultValue={data.floor}
                                    autoComplete="given-floor"
                                    className=" w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-200 focus:border-gray-200 sm:text-sm text-black"
                                />
                                <p className={`mt-2  `}>
                                    {errors.floor && <div className={`text-red-900`}>{errors.floor}</div>}
                                </p>
                            </div>
                        </div>

                        <div
                            className="mt-10 col-span-full flex flex-col sm:flex-row  space-y-5 sm:space-y-0 justify-between items-center w-full">
                            <Link
                                href={route('frontend.cart.index')}
                                className={`text-${mainColor}-50 dark:text-${mainBgColor}-600 bg-${mainBgColor}-800 dark:bg-${mainColor}-400 hover:bg-gray-800 flex flex-row justify-between items-center border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500`}
                            >
                                <div className="flex">
                                    {locale.isRTL ?
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M9 5l7 7-7 7"/>
                                        </svg>
                                        : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                               viewBox="0 0 24 24"
                                               stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M15 19l-7-7 7-7"/>
                                        </svg>
                                    }
                                </div>
                                <span className="flex ltr:pt-2">
                                    {trans('previous')}
                                </span>
                            </Link>
                            <div className="flex flex-col sm:flex-row flex-wrap space-y-5 sm:space-y-0">
                                <button
                                    type="submit"
                                    className={`${btnClass} capitalize mx-10 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500`}
                                >
                                    {trans('save')} {trans('information')}
                                </button>
                                {
                                    !auth ?
                                        <button
                                            type="button"
                                            disabled
                                            className={classNames(auth ? `bg-gray-600` : `bg-gray-300`, `text-${mainColor}-50 dark:text-${mainBgColor}-600 bg-${mainBgColor}-800 dark:bg-${mainColor}-400 hover:bg-gray-800 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500`)}
                                        >
                                            {trans('next')}
                                        </button> : null
                                    // <Link
                                    //     href={route('frontend.cart.confirmation')}
                                    //     className={classNames(auth ? `bg-gray-600` : `bg-gray-300` , "flex flex-row justify-between items-center border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500")}
                                    // >
                                    //     <span className="flex ltr:pt-2">
                                    //     {trans('next')}
                                    //     </span>
                                    //     <div className="flex">
                                    //         {locale.isRTL ?
                                    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    //                  stroke="currentColor">
                                    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                                    //             </svg> :
                                    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    //                  stroke="currentColor">
                                    //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    //             </svg>}
                                    //     </div>
                                    // </Link>
                                }

                            </div>
                        </div>
                    </form>
                </div>

            </FrontendContentContainer>
        </FrontendContainer>

    )
}
