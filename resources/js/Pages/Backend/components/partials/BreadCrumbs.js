/* This example requires Tailwind CSS v2.0+ */
import {HomeIcon} from '@heroicons/react/solid'
import {useContext, Fragment} from "react";
import {AppContext} from "../../../context/AppContext";
import {Link} from "@inertiajs/inertia-react";
import pluralize from 'pluralize';
import {isEmpty, map} from 'lodash';
import route from 'ziggy-js'
import {useSelector} from "react-redux";

export default function BreadCrumbs() {
    const {parentModule, trans, currentBreadCrumbs } = useContext(AppContext);
    const { locale } = useSelector(state => state);


    return (
        <div
            className="flex flex-1 flex-row justify-between items-center bg-white  mx-3 rounded-md shadow-sm p-5 w-auto">
            <div className="flex flex-1 flex-row">
                <nav
                    className={`flex ltr:pl-10 rtl:pr-10  bg-gray-100" aria-label="Breadcrumb`}>
                    <ol className="flex items-center space-x-4">
                        <li>
                            <div className="flex items-center">
                                {
                                    !isEmpty(currentBreadCrumbs) ? map(currentBreadCrumbs, (b, i) =>
                                        <Fragment key={i}>
                                            {i === 0 ?
                                                <HomeIcon className="flex-shrink-0 h-4 w-4 mx-2" aria-hidden="true"/> :
                                                <svg
                                                    className={`mx-2 flex-shrink-0 h-5 w-5 text-gray-300`}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                                                </svg>
                                            }
                                            <Link
                                                href={route().has(`backend.${parentModule}.index`) ? route(`backend.${parentModule}.index`) : '#'}
                                                className=" font-medium text-gray-500 hover:text-gray-700"
                                                aria-current={'page'}
                                            >
                                                {trans(pluralize(b))}
                                            </Link>
                                        </Fragment>
                                    ) : <Link
                                        className="flex flex- flex-row  font-medium text-gray-500 hover:text-gray-700"
                                        href={route('backend.home')}>
                                        <HomeIcon className="flex-shrink-0 h-4 w-4 mx-2" aria-hidden="true"/>
                                        {trans('home')}
                                    </Link>
                                }
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="flex">
                <Link href={'#'}
                      className={'flex flex-row justify-between items-center w-20'}
                      onClick={() => window.history.back()}
                >
                    <h1>{trans('back')}</h1>
                    {locale.isRTL ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>}
                </Link>
            </div>
        </div>
    )
}
