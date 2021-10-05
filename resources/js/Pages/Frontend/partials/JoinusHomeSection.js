import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js';
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";

export default function () {
    const { trans } = useContext(AppContext);
    return (
        <div className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="https://www.barnikels.com/wp-content/uploads/2016/11/Boxes.jpg"
                    alt=""
                    className="w-full h-full object-center object-cover"
                />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50" />
            <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{trans('joinus_title')}</h2>
                <p className="mt-3 text-xl text-white">
                    {trans('joinus_message')}
                </p>
                <Link
                    href={route('frontend.joinus')}
                    className="mt-8 w-full block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                    {trans('joinus')}
                </Link>
            </div>
        </div>
    )
}
