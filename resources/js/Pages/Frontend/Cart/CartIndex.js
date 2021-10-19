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
import CartIndexOrderSummary from "./CartIndexOrderSummary";
import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import FrontendContentContainer from "../components/FrontendContentContainer";
import OrderSummary from "./OrderSummary";

export default function () {
    const {cart, currency, locale} = useSelector(state => state);
    const {trans, getThumb, getLocalized, classNames} = useContext(AppContext);
    const dispatch = useDispatch()

    return (
        <FrontendContainer>
            <FrontendContentContainer>
            <div className="w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 ">
                <CartStepper/>
                <h1 className="text-3xl font-extrabold py-5 text-gray-900">{trans('cart')}</h1>
                <CartIndexOrderSummary />
                <NoElements display={isEmpty(cart.items)}/>
                {/* Order summary */}
                <OrderSummary />
                <div className="mt-10 flex justify-end">
                    <Link
                        href={!isEmpty(cart.items) ? route('frontend.cart.information') : '#'}
                        className={classNames(isEmpty(cart.items) ? `bg-gray-300` :  `bg-gray-600`, "border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500")}
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
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
