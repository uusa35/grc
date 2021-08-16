import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import { AppContext } from "../../../../context/AppContext";
import {getConvertedFinalPrice} from "../../../../helpers";
import ElementPrice from "../ElementPrice";
import ElementTags from "../ElementTags";

export default function NormalCourseWidget ({ element }) {
    const { getLocalized, getThumb , currency  } = useContext(AppContext);
    return (
        <Link
            href={route('frontend.course.show', element.id)}>
            <div className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                <img
                    src={getThumb(element.image)}
                    alt={element[getLocalized()]}
                    className="w-full h-full object-center object-cover"
                />
                <ElementTags onSale={element.isOnSale} onNew={element.on_new} exclusive={element.exclusive}/>
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
                <Link href={route('frontend.course.show', element.id)}>
                    <span className="" />
                    {element[getLocalized()]}
                </Link>
            </h3>
            <ElementPrice price={element.price} salePrice={element.sale_price} isOnSale={element.isOnSale}/>
        </Link>
    );
}
