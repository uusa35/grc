import {useContext, useState} from "react";
import {AppContext} from "../../../context/AppContext";
import {getConvertedFinalPrice} from "../../../helpers";
import {useSelector} from "react-redux";
import {filter, first, isEmpty} from 'lodash';
import GlobalContext from "../../../context/GlobalContext";

export default function ElementPrice({price, salePrice, isOnSale, large = false, showLocal = false}) {
    const {classNames, getLocalized} = useContext(AppContext)
    const { currencies } = useContext(GlobalContext);
    const {currency} = useSelector(state => state);
    const [localCurrency,setLocalCurrency] = useState(first(filter(currencies, c => c.country.is_local)));

    return (
        <>
            <div className="flex flex-row flex-1 justify-between items-start m-2">
                <p className={classNames(isOnSale ? 'line-through' : '', `mt-1  text-gray-500 ${large ? 'text-lg sm:text-3xl' : 'text-sm smm:text-lg'}`)}>
                    {getConvertedFinalPrice(price, currency.exchange_rate)} {currency[getLocalized('currency_symbol')]}
                </p>
                {
                    isOnSale &&
                    <p className={`mt-1  text-red-900 ${large ? 'text-lg sm:text-3xl' : 'text-sm smm:text-lg'}`}>
                        {getConvertedFinalPrice(salePrice, currency.exchange_rate)} {currency[getLocalized('currency_symbol')]}
                    </p>
                }
            </div>
            {
                !isEmpty(currency) && !currency.country?.is_local && showLocal && <div className="flex flex-row flex-1 justify-between items-start m-2">
                    <p className={classNames(isOnSale ? 'line-through' : '', `mt-1  text-gray-500 ${large ? 'text-sm sm:text-lg' : 'text-sm smm:text-lg'}`)}>
                        {getConvertedFinalPrice(price, localCurrency.exchange_rate)} {localCurrency[getLocalized('currency_symbol')]}
                    </p>
                    {
                        isOnSale &&
                        <p className={`mt-1  text-red-900 ${large ? 'text-sm sm:text-lg' : 'text-sm sm:text-sm'}`}>
                            {getConvertedFinalPrice(salePrice, localCurrency.exchange_rate)} {localCurrency[getLocalized('currency_symbol')]}
                        </p>
                    }
                </div>
            }

        </>
    );
}
