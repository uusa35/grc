import React, {useContext} from 'react';
import {Link} from "@inertiajs/inertia-react";
import {AppContext} from "../../../../context/AppContext";
import route from 'ziggy-js';

const CategoryWidget = ({element, type = 'product'}) => {
  const { getLocalized, getThumb  } = useContext(AppContext)

  return (
    <div
      className="font-tajwal-medium">
      <Link
          href={route(`frontend.${type}.index`, { product_category_id : element.id})}
          className="block relative rounded overflow-hidden">
        <img
          alt="ecommerce"
          className="w-full object-cover object-center w-auto h-full block"
          src={getThumb(element.image)}
        />
      </Link>
      <div className="text-center font-extra bold mt-4">
        <h3 className="text-gray-500 text-lg font-extrabold tracking-widest title-font mb-1">
            {element[getLocalized()]}
        </h3>
      </div>
    </div>
  );
};

export default CategoryWidget;
