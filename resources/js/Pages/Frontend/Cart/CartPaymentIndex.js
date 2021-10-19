import FrontendContainer from "../components/FrontendContainer";
import FrontendContentContainer from "../components/FrontendContentContainer";
import CartStepper from "./CartStepper";
import OrderSummary from "./OrderSummary";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {Link, useForm} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import GlobalContext from "../../context/GlobalContext";
import {map} from 'lodash';
import {Inertia} from "@inertiajs/inertia";


export default function() {
    const {cart, currency, locale} = useSelector(state => state);
    const {trans, getThumb, getLocalized, classNames, getAsset} = useContext(AppContext);
    const {settings} = useContext(GlobalContext);
    const paymentMethods = [
        {id: 1, name: 'paypal', paymentRoute: route('paypal.web.payment.create')},
        {id: 2, name: 'myfatorah', paymentRoute: route('myfatoorahv2.web.payment.create')},
        {id: 3, name: 'tap', paymentRoute: route('tap.web.payment.create')},
    ]
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0])
    const dispatch = useDispatch()

    const {data, setData, put, post, progress, reset} = useForm({
        netTotal: cart.netTotal,
        paymentMethod : paymentMethod.name
    })

    const submit = (e) => {
        e.preventDefault();
        return Inertia.post(paymentMethod.paymentRoute, {
            _method: 'post',
            netTotal : cart.netTotal,
        })
    }

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <div className="w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 ">
                    <CartStepper activeStep={4}/>
                    <h1 className="text-3xl font-extrabold py-5 text-gray-900">{trans('payment_process')}</h1>
                    <OrderSummary/>

                    <div
                        className="flex flex-col flex-1 justify-between items-start px-8 py-6 sm:p-6 lg:p-8 border-t border-gray-50">

                        <h1 className="text-3xl font-extrabold py-5 text-gray-900">{trans('choose_payment_method')}</h1>
                        <div className="flex w-full flex-row justify-between items-center gap-x-5 rounded-lg py-6">
                            {
                                map(paymentMethods, p => (
                                    <div
                                        onClick={() => setPaymentMethod(p)}
                                        key={p.name}
                                        className={classNames(p.name === paymentMethod.name ? `bg-gray-100 border-gray-400 shadow-lg` : `border-gray-100 shadow-sm`, "flex flex-row lg:w-1/2 justify-start items-center p-10 border-2 rounded-lg gap-x-4")}>
                                        <img src={getAsset(p.name)} alt="" className="w-auto h-10"/>
                                        <span className="font-extrabold text-lg">
                                        {trans(p.name)}
                                    </span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="mt-10 col-span-full flex flex-1 justify-between w-full">
                        <Link
                            href={route('frontend.cart.confirmation')}
                            className="flex flex-row justify-between items-center bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
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
                        <form method="post" onSubmit={submit}>
                            <button
                                type="submit"
                                className="bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                            >
                                {trans('go_to_payment_page')}
                            </button>
                        </form>
                    </div>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
