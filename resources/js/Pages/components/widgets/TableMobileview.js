import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {useContext} from "react";
import {BackendContext} from "../../context/BackendContext";
import pluralize from 'pluralize'
const TableMobileview = ({ type , elements }) => {
    const { classNames, trans  } = useContext(BackendContext);
    return (
        <div className="mt-3 sm:hidden bg-white rounded-md shadow-md mx-3 py-3">
            <div className="px-4 sm:px-6">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">{trans(pluralize(type))}</h2>
            </div>
            <ul className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
                {
                    elements.data.map(element => (
                        <li key={element.id}>
                            <div
                                className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6">
                                    <span className="flex items-center truncate space-x-3">
                                      <span
                                          className={classNames(true, 'w-2.5 h-2.5 flex-shrink-0 rounded-full')}
                                          aria-hidden="true"
                                      />
                                      <span className="font-medium truncate text-sm leading-6">
                                          {trans('id')}: {element.id} <span
                                          className="mx-5 truncate font-normal text-gray-500">{element.name}</span>
                                      </span>
                                    </span>
                                <Link href={route().has(`backend.${type}.edit`) ? route(`backend.${type}.edit`, element.id) : '#'}>
                                    <svg
                                        className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                    </svg>
                                </Link>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TableMobileview;
