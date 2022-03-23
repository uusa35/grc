import {Popover, Transition} from "@headlessui/react";
import React, {Fragment, useContext} from "react";
import {filter, map, take} from "lodash";
import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {AppContext} from "../../../context/AppContext";
import {ChevronDownIcon} from "@heroicons/react/solid";
import {motion} from "framer-motion"

const currentVariants = {
    hidden : {
        y : -50
    },
    visible : {
        y  : 0 ,
    },
    exit : {
        opacity : 0,
    }
};

function MainNavBookCategoriesList({categories, type = 'book'}) {
    const {classNames, trans, getThumb, getLocalized, headerColor, headerBgColor} = useContext(AppContext)

    return (
        <Popover className="flex"
        >
            {({open}) => (
                <>
                    <div className="relative flex">
                        <Popover.Button
                            className={classNames(
                                open
                                    ? `text-${headerColor}-50 dark:text-white`
                                    : `text-${headerColor}-800 dark:text-white`,
                                `relative z-10 flex items-center transition-colors ease-out duration-200  -mb-px pt-px`
                            )}
                        >
                            <span
                                className={`capitalize text-${headerColor}-600 dark:text-white font-bold hover:text-${headerColor}-800 dark:hover:text-${headerColor}-50`}>{trans(`${type}_categories`)}</span>
                            <ChevronDownIcon
                                className={classNames(
                                    open ? `text-${headerColor}-400` : `text-${headerColor}-600 dark:text-white`,
                                    `ml-2 w-5 group-hover:text-${headerColor}-400 dark:hover:text-${headerColor}-800`
                                )}
                                aria-hidden="true"
                            />
                        </Popover.Button>
                    </div>


                        <Popover.Panel
                            className="absolute z-40 inset-x-20 top-24 transform shadow-lg">
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <motion.div
                                className={`relative bg-white dark:bg-${headerBgColor}-700 shadow-lg shadow-blue-200/50 z-0`}
                                variants={currentVariants}
                                initial={`hidden`}
                                animate={`visible`}
                                exit={`exit`}
                            >
                                <div className="max-w-full px-8 mt-2">
                                    <div
                                        className="grid grid-cols-2 gap-y-3 gap-x-3 py-8">
                                        {/* categories with iamges */}
                                        <div
                                            className="col-start-2 grid grid-cols-3 gap-x-4">
                                            {/*  featured parents */}
                                            {map(take(filter(categories, c => c.is_featured), 3), c => (
                                                <div key={c[getLocalized()]}
                                                     className="group relative text-base">
                                                    <div
                                                        className="aspect-w-12 aspect-h-8 rounded-lg  overflow-hidden group-hover:opacity-75">
                                                        <img
                                                            src={getThumb(c.image)}
                                                            alt={c[getLocalized()]}
                                                            className="object-center object-cover"
                                                        />
                                                    </div>
                                                    <Link href={route(`frontend.${type}.index`, {category_id: c.id})}
                                                          className={`mt-6 block text-${headerColor}-600 dark:text-white font-bold hover:text-${headerColor}-400 dark:hover:text-${headerColor}-800 capitalize font-bold`}>
                                                            <span
                                                                className="absolute z-10 inset-0"
                                                                aria-hidden="true"/>
                                                        {c[getLocalized()]}
                                                    </Link>
                                                    <p aria-hidden="true" className="mt-1 truncate capitalize">
                                                        {c[getLocalized('caption')]}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        {/* categories columns */}
                                        <div
                                            className="row-start-1 grid grid-cols-4 gap-y-2 gap-x-2">
                                            {map(categories, parent => (
                                                <div key={parent[getLocalized()]} className={`border-b border-dashed`}>
                                                    <Link id={`${parent.id}-heading`}
                                                          href={route(`frontend.${type}.index`, {category_id: parent.id})}
                                                          className={` border-b-2 border-gray-100  pb-1 text-${headerColor}-600 dark:text-white hover:text-${headerColor}-400 dark:hover:text-${headerColor}-100 truncate capitalize font-bold`}>
                                                        {parent[getLocalized()]}
                                                    </Link>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${parent.id}-heading`}
                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                    >
                                                        {
                                                            map(filter(parent.children, c => c.is_service && type === 'service' || c.is_product && type === 'product'), child => (
                                                                <li key={child.id}
                                                                    className="flex">
                                                                    <Link
                                                                        href={route(`frontend.${type}.index`, {category_id: child.id})}
                                                                        className={`hover:text-${headerColor}-400 dark:hover:text-${headerColor}-100 truncate capitalize font-bold`}>
                                                                        {child[getLocalized()]}
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Popover.Panel>
                </>
            )}
        </Popover>
    );
}

export default React.memo(MainNavBookCategoriesList);
