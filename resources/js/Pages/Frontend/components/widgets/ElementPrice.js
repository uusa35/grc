import {useContext} from "react";
import {AppContext} from "../../../context/AppContext";
import {getConvertedFinalPrice} from "../../../helpers";
import {useSelector} from "react-redux";

export default function ElementPrice({price, salePrice, isOnSale, large = false}) {
    const {classNames, getLocalized} = useContext(AppContext)
    const { currency } = useSelector(state => state);
    return (
        <div className="flex flex-row flex-1 justify-between items-start m-2">
            <p className={classNames(isOnSale ? 'line-through' : '', `mt-1  text-gray-500 ${large ? 'text-lg sm:text-3xl' : 'text-sm smm:text-lg'}`)}>
                {getConvertedFinalPrice(price, currency.exchange_rate)} {currency[getLocalized('currency_symbol')]}
            </p>
            {
                isOnSale && <p className={`mt-1  text-red-900 ${large ? 'text-lg sm:text-3xl' : 'text-sm smm:text-lg'}`}>
                    {getConvertedFinalPrice(salePrice, currency.exchange_rate)} {currency[getLocalized('currency_symbol')]}
                </p>
            }
        </div>
    );
}
