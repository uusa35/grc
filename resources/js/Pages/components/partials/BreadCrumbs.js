/* This example requires Tailwind CSS v2.0+ */
import {HomeIcon} from '@heroicons/react/solid'
import {useContext} from "react";
import GlobalContext from "../../context/GlobalContext";
import {BackendContext} from "../../context/BackendContext";
import {Link} from "@inertiajs/inertia-react";
import pluralize from 'pluralize';

export default function BreadCrumbs() {
    const {theme, currentModule, trans} = useContext(BackendContext);
    return (
        <nav
            className={`flex ltr:pl-10 rtl:pr-10  bg-white  mx-3 rounded-md shadow-sm p-5 w-auto bg-${theme}-100" aria-label="Breadcrumb`}>
            <ol className="flex items-center space-x-4">
                <li>
                    <div>
                        <Link href="/backend"
                              className={`flex flex-1 flex-row text-${theme}-400 hover:text-${theme}-500`}>
                            <HomeIcon className="flex-shrink-0 h-4 w-4 mx-2" aria-hidden="true"/>
                            <span className="text-sm">{trans('home')}</span>
                        </Link>
                    </div>
                </li>
                <li>
                    <div className="flex items-center">
                        <svg
                            className={`mx-2 flex-shrink-0 h-5 w-5 text-${theme}-300`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                        </svg>
                        <Link
                            href={`/backend/${currentModule}`}
                            className="text-sm font-medium text-gray-500 hover:text-gray-700"
                            aria-current={'page'}
                        >
                            {trans(pluralize(currentModule))}
                        </Link>
                    </div>
                </li>
            </ol>
        </nav>
    )
}
