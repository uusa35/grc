/* This example requires Tailwind CSS v2.0+ */
import {HomeIcon} from '@heroicons/react/solid'
import {useContext, Fragment} from "react";
import GlobalContext from "../../context/GlobalContext";
import {BackendContext} from "../../context/BackendContext";
import {Link} from "@inertiajs/inertia-react";
import pluralize from 'pluralize';
import {map} from 'lodash';
import route from 'ziggy-js'

export default function BreadCrumbs() {
    const {theme, currentModule, currentRoute, trans, currentBreadCrumbs} = useContext(BackendContext);
    return (
        <nav
            className={`flex ltr:pl-10 rtl:pr-10  bg-white  mx-3 rounded-md shadow-sm p-5 w-auto bg-${theme}-100" aria-label="Breadcrumb`}>
            <ol className="flex items-center space-x-4">
                <li>
                    <div className="flex items-center">
                        {
                            currentBreadCrumbs && map(currentBreadCrumbs, (b, i) =>
                                <Fragment key={i}>
                                    { i === 0 ? <HomeIcon className="flex-shrink-0 h-4 w-4 mx-2" aria-hidden="true"/> :
                                        <svg
                                            className={`mx-2 flex-shrink-0 h-5 w-5 text-${theme}-300`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                                        </svg>
                                    }
                                    <Link
                                        href={route(`backend.${currentModule}.index`)}
                                        className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                        aria-current={'page'}
                                    >
                                        {trans(pluralize(b))}
                                    </Link>
                                </Fragment>
                            )
                        }
                    </div>
                </li>
            </ol>
        </nav>
    )
}
