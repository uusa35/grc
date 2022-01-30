/* This example requires Tailwind CSS v2.0+ */
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js'

export default function({element}) {
    const {getLarge, trans, getLocalized} = useContext(AppContext);
    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto py-5  sm:py-10 lg:max-w-7xl">
                <div className="relative rounded-lg overflow-hidden lg:h-96">
                    <div className="absolute inset-0">
                        <img
                            src={getLarge(element.image)}
                            alt=""
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                    <div aria-hidden="true" className="relative w-full h-96 lg:hidden"/>
                    <div aria-hidden="true" className="relative w-full h-32 lg:hidden"/>
                    <div
                        className="absolute inset-x-0 bottom-0 bg-black bg-opacity-25 p-6 rounded-bl-lg rounded-br-lg backdrop-filter backdrop-blur sm:flex sm:items-center sm:justify-between lg:inset-y-0 lg:inset-x-auto lg:w-96 lg:rounded-tl-lg lg:rounded-br-none lg:flex-col lg:items-start">
                        <div>
                            <h2 className="text-xl font-bold text-white">{element[getLocalized()]}</h2>
                            {
                                element[getLocalized('description')] && element[getLocalized('description')].length > 5 &&
                                <p className="mt-1 text-sm text-gray-300">
                                    {element[getLocalized('description')]}
                                </p>
                            }
                        </div>
                        <Link
                            href={route('frontend.product.index', {category_id: element.id})}
                            className="mt-6 flex-shrink-0 flex bg-white bg-opacity-0 py-3 px-4 border border-white border-opacity-25 rounded-md items-center justify-center text-base font-medium text-white hover:bg-opacity-10 sm:mt-0 sm:ml-8 lg:ml-0 lg:w-full"
                        >
                            {trans('view')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}