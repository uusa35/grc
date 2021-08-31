import {HomeIcon} from '@heroicons/react/solid'
import {useContext, Fragment, useEffect} from "react";
import {AppContext} from "../../../context/AppContext";
import {Link} from "@inertiajs/inertia-react";
import pluralize from 'pluralize';
import {isEmpty, map, split} from 'lodash';
import route from 'ziggy-js'
import {useDispatch, useSelector} from "react-redux";
import {setParentModule} from "../../../redux/actions";

export default function BreadCrumbs({childName = ''}) {
    const {trans, classNames } = useContext(AppContext);
    const { locale , parentModule , breadCrumbs  } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if(parentModule === 'home') {
            const currentRoute = route().current();
            const breadCrumbs = split(currentRoute, '.');
            dispatch(setParentModule(breadCrumbs[1]));
        }
    },[])

    console.log('parent', parentModule)

    return (
        <div
            className="flex flex-1 flex-row justify-between items-center bg-white py-1 rounded-md shadow-sm">
            <div className="flex flex-row">
                <nav
                    className={`flex ltr:pl-5 rtl:pr-5  bg-gray-100" aria-label="Breadcrumb`}>
                    <ol className="flex flex-1 flex-row items-center space-x-4 max-w-0 sm:max-w-max">
                        <li className="flex flex-1 flex-row justify-start items-center">
                            <HomeIcon className="flex-shrink-0 h-4 w-4 mx-2" aria-hidden="true"/>
                            <Link
                                className="capitalize flex-1"
                                href={route('backend.home')}>
                                {trans('home')}
                            </Link>
                        </li>
                        {parentModule && route().has(`backend.${parentModule}.index`) &&
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
                                href={route(`backend.${parentModule}.index`)}>
                                {trans(pluralize(parentModule))}
                            </Link>
                        </li>
                        }
                        {
                            breadCrumbs.length >= 3 && childName && <li className="flex flex-row justify-start items-center invisible sm:visible">
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
                                    {childName}
                                </Link>
                            </li>
                        }
                    </ol>
                </nav>
            </div>
            <div className="flex">
                <Link href={'#'}
                      className={classNames(locale.isRTL ? `rounded-r-lg` : `rounded-l-lg`, 'flex flex-row justify-between items-center w-20 bg-hippie-blue-300 hover:text-white hover:bg-hippie-blue-600 shadow-md')}
                      onClick={() => window.history.back()}
                >
                    <h1 className="rtl:pr-4 ltr:pl-4 py-2">{trans('back')}</h1>
                    {locale.isRTL ?
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
