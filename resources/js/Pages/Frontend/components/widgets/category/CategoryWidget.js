import React, {useContext} from 'react';
import {Link} from "@inertiajs/inertia-react";
import {AppContext} from "../../../../context/AppContext";
import route from 'ziggy-js';

const CategoryWidget = ({element, type = 'book'}) => {
    const {getLocalized, getMedium} = useContext(AppContext)

    return (
        <div className="block relative overflow-hidden hover:opacity-90">
            <div className="w-full h-auto bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden">
                <img
                    src={getMedium(element.image)}
                    alt={element[getLocalized()]}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className=" text-gray-700">
                        <Link href={route(`frontend.${type}.index`, {category_id: element.id})}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {element[getLocalized()]}
                        </Link>
                    </h3>
                    <p className="mt-1  text-gray-500 truncate overflow-ellipsis overflow-hidden truncate">
                        {element[getLocalized('caption')]}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CategoryWidget;
