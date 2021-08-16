import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import {AppContext} from "../../../../context/AppContext";
import {getConvertedFinalPrice} from "../../../../helpers";
import ElementTags from "../ElementTags";
import ElementPrice from "../ElementPrice";

export default function NormalBookWidget({element}) {
    const {getLocalized, getThumb} = useContext(AppContext);
    return (
        <Link
            href={route('frontend.book.show', element.id)}
            className="group">
            <div
                className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                <img
                    src={getThumb(element.image)}
                    alt={element[getLocalized()]}
                    className="w-full h-full object-center object-cover"
                />
                <ElementTags onSale={element.isOnSale} onNew={element.on_new} exclusive={element.exclusive}/>
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
                <Link href={route('frontend.book.show', element.id)}>
                    <span className=""/>
                    {element[getLocalized()]}
                </Link>
            </h3>
            <ElementPrice price={element.price} salePrice={element.sale_price} isOnSale={element.isOnSale}/>
        </Link>
    );
}
