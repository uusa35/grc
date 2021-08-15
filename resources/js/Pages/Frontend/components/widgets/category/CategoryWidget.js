import React, {useContext} from 'react';
import {Link} from "@inertiajs/inertia-react";
import {AppContext} from "../../../../context/AppContext";
import route from 'ziggy-js';
import {capitalize, truncate} from "lodash";

const CategoryWidget = ({element, type = 'product'}) => {
    const {getLocalized, getThumb} = useContext(AppContext)

    console.log('element', element);

    return (
        <div key={element[getLocalized()]} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                    src={getThumb(element.image)}
                    alt={element[getLocalized()]}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <Link href={route(`frontend.${type}.index`, {product_category_id: element.id})}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {element[getLocalized()]}
                        </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 truncate overflow-ellipsis overflow-hidden">
                        {truncate(element[getLocalized('caption')],50)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CategoryWidget;
