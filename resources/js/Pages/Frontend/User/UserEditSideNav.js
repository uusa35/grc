import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js';
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import GlobalContext from "../../context/GlobalContext";

export default function() {
    const {classNames, trans, getThumb, getLarge} = useContext(AppContext)
    const {auth} = useContext(GlobalContext);

    console.log('the current route ', route().current());

    return (
        <aside className="py-6 lg:col-span-3">
            <nav className="space-y-1">
                <Link
                    href={route('frontend.user.edit', auth.id)}
                    className={classNames(
                        true
                            ? 'bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                            : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                    )}
                    aria-current={true ? 'page' : undefined}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    <span className="truncate">{trans('edit')} {trans("information")}</span>
                </Link>
                <Link
                    href={route('password.confirm')}
                    className={classNames(
                        true
                            ? 'bg-gray-100 hover:bg-gray-100 hover:text-gray-300'
                            : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                        'group border-l-4 px-3 py-2 flex items-center text-sm font-medium rounded-md'
                    )}
                    aria-current={true ? 'page' : undefined}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414za2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                    <span className="truncate">{trans('reset')} {trans("password")}</span>
                </Link>
            </nav>
        </aside>
    );
}
