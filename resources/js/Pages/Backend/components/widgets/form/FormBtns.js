import {useContext} from "react";
import {BackendContext} from "../../../context/BackendContext";
import {Link} from "@inertiajs/inertia-react";
import GlobalContext from "../../../context/GlobalContext";
import route from 'ziggy-js';

const FormBtns = ({ type }) => {
    const { trans , theme } = useContext(BackendContext)
    return (
        <div className="py-3">
            <div className="flex justify-end">
                <button
                    type="submit"
                    className={`ml-3 inline-flex justify-center py-2 px-4 mx-4 shadow-sm font-medium rounded-md text-white bg-${theme}-600 hover:bg-${theme}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme}-500`}
                >
                    {trans('submit')}
                </button>
                <Link
                    href={route(`backend.${type}.index`)}
                    className={`bg-red-600 py-2 px-4 border border-red-300 rounded-md shadow-sm font-medium text-${theme}-50 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    {trans('cancel')}
                </Link>
            </div>
        </div>
    );
}

export default FormBtns;
