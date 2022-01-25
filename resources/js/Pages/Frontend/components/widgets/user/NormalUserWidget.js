import route from "ziggy-js";
import {Link} from "@inertiajs/inertia-react";
import {useContext} from "react";
import {AppContext} from "../../../../context/AppContext";
import {truncate} from "lodash";
import { motion } from "framer-motion"

export default function NormalUserWidget ({ element }) {
    const { getLocalized, getThumb  } = useContext(AppContext);
    return (
        <motion.div
            initial={false}
            whileHover={{ scale: 0.95 }}
        >
        <Link href={route('frontend.user.show', element.id)}
              className="block relative rounded overflow-hidden z-0 hover:opacity-95 ">
            <div className="w-full h-auto flex items-center justify-center sm:aspect-w-1 sm:aspect-h-1 ">
                <img
                    src={getThumb(element.image)}
                    alt={element[getLocalized()]}
                    title={element[getLocalized()]}
                    className="z-0 w-60 h-60 rounded-full shadow-md object-center object-cover group-hover:opacity-75 shadow-md"
                    width={360}
                    height={480}
                />
            </div>
            <h3 className="mt-4 text-center text-gray-800 truncate text-sm">
                {truncate(element[getLocalized()], { length : 25 })}
            </h3>
        </Link>
        </motion.div>
    );
}
