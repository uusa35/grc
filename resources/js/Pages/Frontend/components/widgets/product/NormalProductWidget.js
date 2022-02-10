import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import {AppContext} from "../../../../context/AppContext";
import ElementPrice from "../ElementPrice";
import ElementTags from "../ElementTags";
import {truncate} from "lodash";
import {motion} from "framer-motion"

export default function NormalProductWidget({element}) {
    const {getLocalized, getThumb, mainBgColor , mainColor } = useContext(AppContext);
    return (
        <motion.div
            initial={false}
            whileHover={{scale: 0.95}}
        >
            <div
                className={`block relative overflow-hidden shadow-md border border-${mainBgColor}-50 dark:border-${mainBgColor}-400 bg-white dark:bg-${mainBgColor}-600  mb-5 rounded-sm hover:opacity-95 hover:shadow-lg`}>
                <div className="w-full rounded-t-sm overflow-hidden  sm:h-auto sm:aspect-w-4 sm:aspect-h-5">
                    <Link
                        className="z-30"
                        href={route('frontend.product.show', element.id) + `?slug=${element[getLocalized()]}`}>
                        <ElementTags onSale={element.isOnSale} onNew={element.on_new} exclusive={element.exclusive} rounded={true}/>
                        <img
                            src={getThumb(element.image)}
                            alt={element[getLocalized()]}
                            className="w-full object-cover object-bottom rounded-t-sm"
                            width={480}
                            height={360}
                            loading='lazy'
                        />
                    </Link>
                </div>
                <div className="flex flex-row flex-1 justify-between items-center m-2">
                    <h3 className={`text-base font-bold text-${mainColor}-800 dark:text-${mainColor}-50  truncate`}>
                        <Link href={route('frontend.product.show', element.id) + `?slug=${element[getLocalized()]}`}>
                            <span className=""/>
                            {truncate(element[getLocalized()], {length: 20})}
                        </Link>
                    </h3>
                    <Link href={route('frontend.user.show', element.user.id)}>
                        <img className="w-5 h-5 lg:w-10 lg:h-10 rounded-full object-cover shadow-sm"
                             src={getThumb(element.user.image)} alt={element.user[getLocalized()]}
                             width={360}
                             height={480}
                             loading='lazy'
                        />
                    </Link>
                </div>
                <ElementPrice price={element.price}
                              salePrice={element.sale_price}
                              isOnSale={element.isOnSale}/>
            </div>
        </motion.div>
    );
}
