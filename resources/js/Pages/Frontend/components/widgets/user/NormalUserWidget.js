import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import {AppContext, AppContextProvider} from "../../../../context/AppContext";
import {getConvertedFinalPrice} from "../../../../helpers";

export default function NormalUserWidget ({ element }) {
    const { getLocalized, getThumb , currency  } = useContext(AppContext);
    return (
        <Link href={route('frontend.user.show', element.id)}
              className="block relative rounded overflow-hidden">
            <div className="w-full h-70 flex items-center justify-center">
                <img
                    src={getThumb(element.image)}
                    alt={element[getLocalized()]}
                    className="w-50 h-50 rounded-full object-center object-cover group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-center text-gray-700">{element[getLocalized()]}</h3>
        </Link>
    );
}
