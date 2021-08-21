/* This example requires Tailwind CSS v2.0+ */
import {HomeIcon} from '@heroicons/react/solid'
import {useContext, Fragment} from "react";
import {AppContext} from "../../context/AppContext";
import {Link} from "@inertiajs/inertia-react";
import pluralize from 'pluralize';
import {isEmpty, map, capitalize} from 'lodash';
import route from 'ziggy-js'

export default function FrontendBreadCrumbs() {
    const {parentModule, childModule, trans, locale} = useContext(AppContext);

    return (
        <div
            className="flex flex-1 flex-row justify-between items-center rounded-md shadow-sm p-5 w-auto">
            <nav
                className="flex flex-1" aria-label="Breadcrumb">
                <ol className="flex flex-row items-center space-x-4 max-w-0">
                    <li className="flex flex-row justify-start items-center">
                        <HomeIcon className="flex-shrink-0 h-4 w-4 mx-2" aria-hidden="true"/>
                        <Link
                            className="capitalize"
                            href={route('frontend.home')}>
                            {trans('home')}
                        </Link>
                    </li>
                    {parentModule && route().has(`frontend.${parentModule}.index`) &&
                    <li className="flex flex-row justify-start items-center">
                        <svg
                            className={`mx-2 flex-shrink-0 h-5 w-5 text-gray-300`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                        </svg>
                        <Link
                            className="capitalize"
                            href={route(`frontend.${parentModule}.index`)}>
                            {trans(pluralize(parentModule))}
                        </Link>
                    </li>
                    }
                    {
                        childModule && <li className="flex flex-row justify-start items-center invisible sm:visible">
                            <svg
                                className={`mx-2 flex-shrink-0 h-5 w-5 text-gray-300`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                            </svg>
                            <Link
                                className="capitalize truncate "
                                href={'#'}>
                                {childModule}
                            </Link>
                        </li>
                    }
                </ol>
            </nav>

            <div className="flex overflow-hidden">
                <Link href={'#'}
                      className={'flex flex-1 flex-row justify-between items-center'}
                      onClick={() => window.history.back()}
                >
                    <h1>{trans('back')}</h1>
                    {locale === 'ar' ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>}
                </Link>
            </div>
        </div>
    )
}
