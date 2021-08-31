import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import { AppContext } from "../../../../context/AppContext";
import ElementPrice from "../ElementPrice";
import ElementTags from "../ElementTags";

export default function NormalCourseWidget ({ element }) {
    const { getLocalized, getThumb  } = useContext(AppContext);

    return (
        <div className="block relative overflow-hidden shadow-md mb-5 rounded-b-md">
            <div className="w-full rounded-t-md overflow-hidden group-hover:opacity-80 sm:h-auto sm:aspect-w-4 sm:aspect-h-5">
                <Link
                    className="z-30"
                    href={route('frontend.course.show', element.id) + `?slug=${element[getLocalized()]}`}>
                    <ElementTags onSale={element.isOnSale}
                                 onNew={element.on_new}
                                 exclusive={element.exclusive}
                                 free={element.free}
                    />
                <img
                    src={getThumb(element.image)}
                    alt={element[getLocalized()]}
                    className="object-cover object-bottom rounded-t-md"
                />
                </Link>
            </div>
            <div className="flex flex-row flex-1 justify-between items-center m-2">
                <h3 className="text-base font-semibold text-gray-900 truncate capitalize">
                    <Link href={route('frontend.course.show', element.id)}>
                        <span className="" />
                        {element[getLocalized()]}
                        <p className="truncate capitalize text-sm hidden">
                            {element[getLocalized('caption')]}
                        </p>
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
