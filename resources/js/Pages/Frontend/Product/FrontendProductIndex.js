import FrontendContainer from "../components/FrontendContainer";
import {useContext} from "react";
import {BackendContext} from "../../Backend/context/BackendContext";
import route from 'ziggy-js';
import {Link} from "@inertiajs/inertia-react";

export default function FrontendProductIndex({ elements }) {
    const { getThumb , trans , getLocalized } = useContext(BackendContext);
    return (
        <FrontendContainer>
                <div className="bg-white max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="sr-only">{trans('products')}</h2>
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {elements.data.map((element) => (
                            <Link key={element.id} href={route('frontend.product.show', element.id)} className="group">
                                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                                    <img
                                        src={getThumb(element.image)}
                                        alt={element[getLocalized()]}
                                        className="w-full h-full object-center object-cover group-hover:opacity-75"
                                    />
                                </div>
                                <h3 className="mt-4 text-sm text-gray-700">{element[getLocalized()]}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">{element.price}</p>
                            </Link>
                        ))}
                    </div>
                </div>
        </FrontendContainer>
    );
}
