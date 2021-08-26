import {Menu, Transition} from "@headlessui/react";
import {ChevronRightIcon, DotsVerticalIcon} from "@heroicons/react/solid";
import {Fragment, useContext} from "react";
import GlobalContext from "../../../context/GlobalContext";
import {AppContext} from "../../../context/AppContext";
import {InertiaLink, Link} from "@inertiajs/inertia-react";
import {ClockIcon, HomeIcon, MenuAlt1Icon, ViewListIcon, XIcon} from '@heroicons/react/outline'
import route from 'ziggy-js'
import {
    ArchiveIcon,
    ArrowCircleRightIcon,
    ChevronDownIcon,
    DuplicateIcon,
    HeartIcon,
    PencilAltIcon,
    TrashIcon,
    UserAddIcon,
} from '@heroicons/react/solid'
import {map} from 'lodash';
import plurlaize from 'pluralize'
import PinnedProjects from "./header/PinnedProjects";
import {useDispatch, useSelector} from "react-redux";
import {changeLang} from "../../../redux/actions";


const BackendHeader = () => {
    const {
        trans,
        parentModule,
        getLocalized,
        getThumb,
        classNames
    } = useContext(AppContext);
    const { modules , locale , settings  } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div className={``}>
            {/* all elements */}
            <div
                className="border-b border-gray-200 py-3 bg-white rounded-md mx-3 my-3 sm:px-6 lg:p-4 sm:flex sm:flex-row sm:items-center sm:justify-between">
                <h1 className="w-60 leading-6 text-gray-900 sm:truncate">{settings[getLocalized('name')]}</h1>
                <div className="flex items-center justify-center w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-y-0 gap-x-2">
                    {/* all elements */}
                    <Menu as="div" className="col-auto relative ltr:text-left rtl:text-right">
                        {({open}) => (
                            <div>
                                <div className={`rtl:ml-2 ltr:mr-2`}>
                                    <Menu.Button
                                        className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-600  font-medium text-gray-50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500`}>
                                        {trans('list')} {trans('all_elements')}
                                        <ChevronDownIcon className="mx-2 h-5 w-5" aria-hidden="true"/>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        static
                                        className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-max z-50 origin-top-right absolute  md:-right-60 mt-2 py-5 border-2 border-gray-200 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                    >
                                        {
                                            map(modules, m => (
                                                <Fragment key={m.name}>
                                                    {
                                                        m.index && <div className="py-1 col-span-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <Link
                                                                        key={m.name}
                                                                        href={route(`backend.${m.name}.index`)}
                                                                        className={classNames(
                                                                            m.name === parentModule ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                                                                            'group flex items-center rounded-md py-2  flex-1 ltr:ml-2 rtl:mr-2 font-extrabold hover:bg-gray-100'
                                                                        )}
                                                                    >
                                                                        <img className={`w-5 h-auto mx-2 rounded-sm`}
                                                                             src={getThumb(m.image)} alt=""/>
                                                                        {trans('list')} {trans(plurlaize(m.name))}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    }
                                                </Fragment>
                                            ))
                                        }
                                    </Menu.Items>
                                </Transition>
                            </div>
                        )}
                    </Menu>

                    {/* add new element */}
                    <Menu as="div" className="col-auto relative inline-block ltr:text-left rtl:text-right">
                        {({open}) => (
                            <div>
                                <div className={`rtl:ml-2 ltr:mr-2`}>
                                    <Menu.Button
                                        className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-600  font-medium text-gray-50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500`}>
                                        {trans('create')} {trans('element')}
                                        <ChevronDownIcon className="mx-2 h-5 w-5" aria-hidden="true"/>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        static
                                        className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 w-max z-50 origin-top-right absolute  md:-right-40 mt-2 py-5 border-2 border-gray-200 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                    >
                                        {
                                            map(modules, m => (
                                                <Fragment key={m.name}>
                                                    {
                                                        m.index && <div className="py-1 col-span-1">
                                                            <Menu.Item>
                                                                {({active}) => (
                                                                    <Link
                                                                        key={m.name}
                                                                        href={route(`backend.${m.name}.create`)}
                                                                        className={classNames(
                                                                            m.name === parentModule ? 'bg-gray-200 text-gray-900' : 'text-gray-700',
                                                                            'group flex items-center rounded-md py-2  flex-1 ltr:ml-2 rtl:mr-2 font-extrabold hover:bg-gray-100'
                                                                        )}
                                                                    >
                                                                        <img className={`w-5 h-auto mx-2 rounded-sm`}
                                                                             src={getThumb(m.image)} alt=""/>
                                                                        {trans('create')} {trans(m.name)}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        </div>
                                                    }
                                                </Fragment>
                                            ))
                                        }
                                    </Menu.Items>
                                </Transition>
                            </div>
                        )}
                    </Menu>
                </div>
                <div className="flex flex-wrap items-center w-auto mt-4 fl dex sm:mt-0 sm:ml-4 gap-3">
                    {/* settings */}
                    <Menu as="div" className="relative inline-block ltr:text-left rtl:text-right">
                        {({open}) => (
                            <>
                                <div className={`rtl:ml-2 ltr:mr-2`}>
                                    <Menu.Button
                                        className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-600  font-medium text-gray-50 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-auto w-6  rtl:ml-2 ltr:mr-2 animate animate-spin"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        {trans('commands')}
                                        <ChevronDownIcon className="mx-2 h-5 w-5" aria-hidden="true"/>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items
                                        static
                                        className="origin-top-right absolute rtl:-mr-20 ltr:-ml-5 mt-2 w-56 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                                    >
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <a
                                                        href={route('frontend.home')}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 '
                                                        )}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                        </svg>
                                                        {trans('main_page')}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <Link
                                                        onClick={() => {
                                                            dispatch(changeLang(locale.otherLang))
                                                        }}
                                                        href={route(`backend.change.lang`, { lang : locale.otherLang})}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 '
                                                        )}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-4"
                                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={2}
                                                                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
                                                        </svg>
                                                        {trans(locale.otherLang)}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            document.getElementById('logout-form').submit()
                                                        }}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'group flex items-center px-4 py-2 '
                                                        )}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        {trans('logout')}
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
            <PinnedProjects />

        </div>
    );
}


export default BackendHeader;
