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

    console.log('the cart items', map(cart.items, item => console.log('the item', item)));
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
            </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
