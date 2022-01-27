import FrontendContainer from "../components/FrontendContainer";
import FrontendContentContainer from "../components/FrontendContentContainer";
import CartStepper from "./CartStepper";
import OrderSummary from "./OrderSummary";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useMemo, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {Link, useForm} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {map} from 'lodash';
import axios from 'axios';
import {Inertia} from "@inertiajs/inertia";
import {clearCart, showModal} from "../../redux/actions";
import ConfirmationModal from "../partials/ConfirmationModal";


export default function({order, settings}) {
    const {cart, currency, locale, confirmationModal } = useSelector(state => state);
    const {trans, getThumb, getLocalized, classNames, getAsset} = useContext(AppContext);
    const paymentMethods = [
        {id: 1, name: 'paypal', paymentRoute: route('paypal.api.payment.create'), enabled : settings.enable_payment_online},
        {id: 2, name: settings.payment_method, paymentRoute: route(`${settings.payment_method}.api.payment.create`), enabled:  settings.enable_payment_online},
        {id: 3, name: 'cash_on_delivery', paymentRoute: route(`frontend.cart.cod.payment`), enabled:  settings.cash_on_delivery},
    ]
    const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0])
    const [currentURL, setCurrentUrl] = useState('');
    const dispatch = useDispatch()

    const {data, setData, put, post, progress, reset} = useForm({
        netTotal: cart.netTotal,
        paymentMethod: paymentMethod.name
    })

    console.log('paymentMethods', paymentMethods);

    useMemo(() => {
        if (paymentMethod.name === 'paypal') {
            return axios.post(paymentMethod.paymentRoute, {
                netTotal: cart.netTotal,
                order_id: order.id,
                paymentMethod: paymentMethod.name
            }).then(r => setCurrentUrl(r.data)).catch(e => console.log('the e ===>', e.response.data))
        } else if (paymentMethod.name === 'tap') {
            return axios.post(paymentMethod.paymentRoute, {
                netTotal: cart.netTotal,
                order_id: order.id,
                paymentMethod: paymentMethod.name
            }).then(r => setCurrentUrl(r.data)).catch(e => console.log('e', e.response.data))
            // }).then(r => setCurrentUrl(r.data)).catch(e => console.log('e', e.response.data))
        } else if (paymentMethod.name === 'myfatoorahv2') {
            return axios.post(paymentMethod.paymentRoute, {
                netTotal: cart.netTotal,
                order_id: order.id,
                paymentMethod: paymentMethod.name
            }).then(r => setCurrentUrl(r.data)).catch(e => console.log('e', e.response.data))
            // }).then(r => setCurrentUrl(r.data)).catch(e => console.log('e', e.response.data))
        } else if (paymentMethod.name === 'oneglobal') {
            return axios.post(paymentMethod.paymentRoute, {
                netTotal: cart.netTotal,
                order_id: order.id,
                paymentMethod: paymentMethod.name
            }).then(r => setCurrentUrl(r.data)).catch(e => console.log('e', e.response.data))
            // }).then(r => setCurrentUrl(r.data)).catch(e => console.log('e', e.response.data))
        } else if (paymentMethod.name === 'cash_on_delivery') {
            return dispatch(showModal({
                type: '',
                model: '',
                id: order.id,
                title: `${trans('confirm')}`,
                message: `${trans('r_u_sure_u_order_cash_on_delivery')}`,
            }))
        }
    }, [paymentMethod])

    console.log('confirm', confirmationModal)
    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <div className="w-full mx-auto py-5 px-4 sm:px-6 lg:px-8 ">
                    <CartStepper activeStep={4}/>
                    <h1 className="text-3xl font-extrabold py-5 text-gray-900">{trans('payment_process')}</h1>
                    <OrderSummary/>

                    {
                        settings.enable_payment_online ? <div
                            className="flex flex-col flex-1 justify-between items-start px-8 py-6 sm:p-6 lg:p-8 border-t border-gray-50">

                            <h1 className="text-3xl font-extrabold py-5 text-gray-900">{trans('choose_payment_method')}</h1>
                            <div
                                className="flex w-full flex-row flex-wrap md:flex-nowrap justify-between items-center gap-x-5 gap-y-5 rounded-lg py-6">
                                {
                                    map(paymentMethods, p => (
                                        <div
                                            onClick={() => setPaymentMethod(p)}
                                            key={p.name}
                                            className={classNames(p.name === paymentMethod.name ? `bg-gray-100 border-gray-400 shadow-lg` : `border-gray-100 shadow-sm`, "flex flex-row w-full max-w-md justify-center items-center p-10 border-2 rounded-lg gap-x-4")}>
                                            <img src={getAsset(p.name)} alt="" className="w-auto h-10"/>
                                            <span className="font-extrabold text-lg invisible sm:visible">
                                        {trans(p.name)}
                                    </span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div> : null
                    }
                    {/* cash_on_delivery confirmation modal */}
                    {
                        settings.cash_on_delivery && <ConfirmationModal
                            confirmationOpen={confirmationModal.display}
                            message={trans('r_u_sure_u_order_cash_on_delivery')}
                            routeName={`frontend.cart.cod.payment`}
                            paramId={order.id}
                        />
                    }
                    <div
                        className="mt-10 col-span-full flex justify-between items-center flex-wrap space-y-2 sm:space-y-0 w-full">
                        <Link
                            href={route('frontend.cart.confirmation')}
                            className="flex flex-row justify-between items-center bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4  text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
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
                        {
                            settings.enable_payment_online ? <div className="flex">
                                <a
                                    // onClick={() => dispatch(clearCart())}
                                    href={currentURL}
                                    className="capitalize flex flex-row w-full sm:w-auto justify-between items-center bg-gray-600 border border-transparent rounded-md shadow-sm py-3 px-4 space-y-5 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                                >
                                    {trans('go_to_payment_page')}
                                </a>
                            </div> : null
                        }
                    </div>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
