import {useContext} from "react";
import {AppContext} from "../../../context/AppContext";
import {getConvertedFinalPrice} from "../../../helpers";

export default function ElementPrice({price, salePrice, isOnSale}) {
    const {currency, classNames, getLocalized} = useContext(AppContext)
    return (
        <div className="flex flex-row flex-1 justify-between items-start m-2">
            <p className={classNames(isOnSale ? 'line-through' : '', `mt-1 text-2xl lg:text-lg text-gray-500 text-lg`)}>
                {getConvertedFinalPrice(price, currency.exchange_rate)} {currency[getLocalized('currency_symbol')]}
            </p>
            {
                isOnSale && <p className="mt-1 text-2xl lg:text-lg text-red-900 text-lg">
                    {getConvertedFinalPrice(salePrice, currency.exchange_rate)} {currency[getLocalized('currency_symbol')]}
                </p>
            }
        </div>
    );
}