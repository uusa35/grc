import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import {AppContext, AppContextProvider} from "../../../../context/AppContext";
import {getConvertedFinalPrice} from "../../../../helpers";

export default function NormalUserWidget ({ element }) {
    const { getLocalized, getThumb , currency  } = useContext(AppContext);
    return (
        <Link key={element.id} href={route('frontend.user.show', element.id)} className="group">
            <div className="rounded-full h-auto w-auto flex items-center justify-center">
                <img
                    src={getThumb(element.image)}
                    alt={element[getLocalized()]}
                    className="w-auto h-auto rounded-full object-center object-contain group-hover:opacity-75"
                />
            </div>
            <h3 className="mt-4 text-center text-gray-700">{element[getLocalized()]}</h3>
        </Link>
    );
}
