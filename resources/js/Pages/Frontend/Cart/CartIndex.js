import {CheckIcon, ClockIcon} from '@heroicons/react/solid'
import FrontendContainer from "../components/FrontendContainer";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useMemo, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {isEmpty, isNull, isUndefined, map, truncate} from 'lodash'
import route from 'ziggy-js';
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import {getConvertedFinalPrice} from "../../helpers";
import moment from "moment";
import NoElements from "../../Backend/components/widgets/NoElements";
import {removeFromCart, setDiscount} from "../../redux/actions";
import CartStepper from "./CartStepper";
import CartIndexOrderSummary from "./CartIndexOrderSummary";
import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import FrontendContentContainer from "../components/FrontendContentContainer";
import OrderSummary from "./OrderSummary";

export default function({coupon = {}}) {
    const {cart, locale} = useSelector(state => state);
    const {trans, classNames, mainColor , mainBgColor, contentBgColor, btnClass   } = useContext(AppContext);
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        'code': null,
    })
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('frontend.cart.coupon'), {...data})
    }

    useMemo(() => {
        if (coupon && coupon.id) {
            dispatch(setDiscount(coupon))
        }
    }, [coupon])

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <div className={`${contentBgColor} w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 `}>
                    <CartStepper/>
                    <h1 className={`text-3xl font-bold py-5 text-${mainColor}-900 dark:text-${mainColor}-50`}>{trans('cart')}</h1>
                    <CartIndexOrderSummary/>
                    <NoElements display={isEmpty(cart.items)}/>
                    {/* Order summary */}
                    {
                        !isEmpty(cart.items) ?
                            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                                <div className={`border-${mainColor}-100 dark:border-${mainColor}-800 border  py-8 px-4 shadow sm:rounded-lg sm:px-10`}>
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="code"
                                                   className={`capitalize block text-sm font-medium text-${mainColor}-800 dark:text-${mainColor}-600 mb-5 text-base`}>
                                                {trans('do_u_have_a_coupon')}
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="code"
                                                    name="code"
                                                    type="code"
                                                    autoComplete="code"
                                                    onChange={handleChange}
                                                    required
                                                    className={`appearance-none block w-full px-3 py-2 border border-${mainColor}-300 rounded-md shadow-sm placeholder-${mainColor}-600 text-${mainColor}-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                disabled={isNull(data.coupon) && data.coupon.length < 3}
                                                type="submit"
                                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-${mainColor}-50 dark:text-${mainBgColor}-600 bg-${mainBgColor}-800 dark:bg-${mainColor}-400 hover:bg-${mainColor}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}
                                            >
                                                {trans('enter_coupon_code')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            : null
                    }

                    <OrderSummary/>
                    <div className="mt-10 flex justify-end">
                        <Link
                            href={!isEmpty(cart.items) ? route('frontend.cart.information') : '#'}
                            className={classNames(isEmpty(cart.items) ? `opacity-30` : `bg-${mainColor}-600 dark:bg-${mainColor}-400`, "flex flex-row justify-between items-center border border-transparent rounded-md shnotesadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500")}
                        >
                           <span className="flex ltr:pt-2">
                                            {trans('next')}
                                            </span>
                            <div className="flex">
                                {locale.isRTL ?
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15 19l-7-7 7-7"/>
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M9 5l7 7-7 7"/>
                                    </svg>}
                            </div>
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
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
