import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext, useState} from "react";
import {AppContext} from "../../../../context/AppContext";
import ElementPrice from "../ElementPrice";
import ElementTags from "../ElementTags";
import {truncate} from "lodash";
import {motion} from "framer-motion"
import {useSelector} from "react-redux";

export default function NormalProductWidget({element}) {
    const {getLocalized, getThumb, classNames} = useContext(AppContext);
    const {locale} = useSelector(state => state);
    return (
        <motion.div
            initial={false}
            whileHover={{scale: 0.95}}
        >
            <div
                className="block relative overflow-hidden shadow-md mb-5 rounded-b-md hover:opacity-95 hover:shadow-lg">
                <div className="w-full rounded-t-md overflow-hidden  sm:h-auto sm:aspect-w-4 sm:aspect-h-5">
                    <Link
                        className="z-30"
                        href={route('frontend.product.show', element.id) + `?slug=${element[getLocalized()]}`}>
                        <ElementTags onSale={element.isOnSale} onNew={element.on_new} exclusive={element.exclusive}/>
                        <img
                            src={getThumb(element.image)}
                            alt={element[getLocalized()]}
                            className="object-cover object-bottom rounded-t-md"
                        />
                    </Link>
                </div>
                <div className="flex flex-row flex-1 justify-between items-center m-2">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                        <Link href={route('frontend.product.show', element.id)}>
                            <span className=""/>
                            {truncate(element[getLocalized()], {length: 20})}
                        </Link>
                    </h3>
                    <Link href={route('frontend.user.show', element.user.id)}>
                        <img className="w-5 h-5 lg:w-10 lg:h-10 rounded-full object-cover shadow-sm"
                             src={getThumb(element.user.image)} alt={element.user[getLocalized()]}/>
                    </Link>
                </div>
                <ElementPrice price={element.price} salePrice={element.sale_price} isOnSale={element.isOnSale}/>
            </div>
        </motion.div>
    );
}
