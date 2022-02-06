import React, {useContext} from 'react';
import {Link} from "@inertiajs/inertia-react";
import {AppContext} from "../../../../context/AppContext";
import route from 'ziggy-js';
import { motion } from "framer-motion"

const CategoryWidget = ({element, type = 'book', showTitle = true}) => {
    const {getLocalized, getThumb, mainColor , getTheme } = useContext(AppContext)

    return (
        <motion.div
            initial={false}
            whileHover={{ scale: 0.9 }}
        >
        <Link
            href={route(`frontend.${type}.index`, {category_id: element.id})}
            className="block relative overflow-hidden hover:opacity-90">
            <div className="w-full h-auto bg-white aspect-w-12 aspect-h-8 rounded-md overflow-hidden shadow-md">
                <img
                    src={getThumb(element.image)}
                    alt={element[getLocalized()]}
                    className="w-full h-full object-center object-fill lg:w-full lg:h-full"
                    width={360}
                    height={480}
                    loading='lazy'
                />
            </div>
            {
                showTitle && route().has(`frontend.${type}.index`) &&  <div className="mt-4 flex justify-center items-center">
                    <div>
                        <h3 className={`text-${mainColor}-${getTheme(800,100)}`}>
                            <Link href={route(`frontend.${type}.index`, {category_id: element.id})}>
                                <span aria-hidden="true" className="absolute inset-0" />
                                {element[getLocalized()]}
                            </Link>
                        </h3>
                        <p className={`mt-1 text-${mainColor}-${getTheme(800,100)} truncate overflow-ellipsis overflow-hidden truncate`}>
                            {element[getLocalized('caption')]}
                        </p>
                    </div>
                </div>
            }
        </Link>
        </motion.div>
    );
};

export default CategoryWidget;
