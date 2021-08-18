import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import {AppContext} from "../../../../context/AppContext";
import ElementPrice from "../ElementPrice";
import ElementTags from "../ElementTags";

export default function NormalServiceWidget({element}) {
    const {getLocalized, getThumb} = useContext(AppContext);
    return (
        <div className="group relative">
            <div
                className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-80 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                <Link
                    className="h-auto w-auto z-30"
                    href={route('frontend.service.show', element.id) + `?slug=${element[getLocalized()]}`}>
                    <ElementTags onSale={element.isOnSale} onNew={element.on_new} exclusive={element.exclusive}/>
                    <img
                        src={getThumb(element.image)}
                        alt={element[getLocalized()]}
                        className="w-full h-full object-center object-cover"
                    />
                </Link>
            </div>
            <div className="flex flex-row flex-1 justify-between items-center my-2">
                <h3 className="text-base font-semibold text-gray-900 truncate">
                    <Link href={route('frontend.service.show', element.id)}>
                        <span className=""/>
                        {element[getLocalized()]}
                    </Link>
                </h3>
                <Link href={route('frontend.user.show', element.user.id)}>
                    <img className="w-5 lg:w-10 h-auto rounded-full shadow-sm" src={getThumb(element.user.image)} alt={element.user[getLocalized()]}/>
                </Link>
            </div>
            <ElementPrice price={element.price} salePrice={element.sale_price} isOnSale={element.isOnSale}/>
        </div>
    );
}
