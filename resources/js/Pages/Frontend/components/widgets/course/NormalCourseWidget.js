import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import { AppContext } from "../../../../context/AppContext";
import {getConvertedFinalPrice} from "../../../../helpers";

export default function NormalCourseWidget ({ element }) {
    const { getLocalized, getThumb , currency  } = useContext(AppContext);
    return (
        <div key={element.id} className="group relative">
            <div className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                <img
                    src={getThumb(element.image)}
                    alt={element[getLocalized()]}
                    className="w-full h-full object-center object-cover"
                />
            </div>
            <h3 className="mt-4 text-base font-semibold text-gray-900">
                <Link href={route('frontend.course.show', element.id)}>
                    <span className="absolute inset-0" />
                    {element[getLocalized()]}
                </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500">
                {getConvertedFinalPrice(element.price, currency.exchange_rate)} {currency[getLocalized()]}
            </p>
        </div>
    );
}
