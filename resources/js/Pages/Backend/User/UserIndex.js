import BackendContainer from "./../components/containers/BackendContainer";
import {Menu, Transition} from "@headlessui/react";
import {DotsVerticalIcon} from "@heroicons/react/solid";
import {Fragment, useContext, useMemo, useState} from "react";
import {AppContext} from "./../../context/AppContext";
import {orderBy, isEmpty, isArray, map} from 'lodash';
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js';
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {showModal, toggleSort} from "../../redux/actions";
import ActiveDot from "../components/widgets/ActiveDot";


export default function({elements}) {
    const [currentData, setCurrentData] = useState();
    const {
        trans,
        classNames,
        getLocalized,
        isAdminOrAbove,
        isSuper
    } = useContext(AppContext);
    const {sort, locale} = useSelector(state => state);
    const dispatch = useDispatch();

    useMemo(() => {
        if (!currentData) {
            setCurrentData(elements.data);
        }
    }, [elements.data])

    useMemo(() => {
        setCurrentData(orderBy(elements.data, [sort.colName], [sort.desc ? 'desc' : 'asc']));
    }, [sort.desc])

    return (
        <BackendContainer
            elements={elements}
            showSearch={elements.meta.total >= 1}
            showNoElements={elements.meta.total < 1}
            showMobileView={elements.meta.total > 1}
            total={elements.meta.total}
            links={elements.meta.links}
            mainModule={'author'}
        >
            <div className="flex flex-col ">
                <div className=" overflow-visible">
                    <div className="align-middle inline-block min-w-full rounded-b-lg">
                        <div
                            className={classNames(true ? `bg-gray-600` : 'bg-blue-600', "shadow border-b border-gray-200 sm:rounded-lg")}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead
                                    className={classNames(true ? `bg-gray-300` : '', "text-black font-extrabold  uppercase")}>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 flex flex-row justify-start items-center rtl:text-right ltr:text-left   uppercase tracking-wider tracking-wider"
                                        onClick={() => dispatch(toggleSort('id'))}
                                    >
                                        {sort.desc ?
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M5 15l7-7 7 7"/>
                                            </svg>
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M19 9l-7 7-7-7"/>
                                            </svg>}
                                        {trans('id')}
                                    </th>
                                    {/*<th*/}
                                    {/*    scope="col"*/}
                                    {/*    className=" px-3 py-3 rtl:text-right ltr:text-left"*/}
                                    {/*>*/}
                                    {/*    {trans('main_image')}*/}
                                    {/*</th>*/}
                                    <th
                                        scope="col"
                                        className=" px-3 py-3  rtl:text-right ltr:text-left"
                                        onClick={() => dispatch(toggleSort('name'))}
                                    >
                                        <div className="flex flex-row justify-start items-center">
                                            {sort.desc ?

                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2"
                                                     fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M5 15l7-7 7 7"/>
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2"
                                                     fill="none"
                                                     viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinejoin="round" strokeLinejoin="round" strokeWidth="2"
                                                          d="M19 9l-7 7-7-7"/>
                                                </svg>}
                                            {trans('name')}
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className=" px-3 py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('commands')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" px-3 py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('created_at')}
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    isArray(currentData) && map(currentData, element =>
                                        <tr className={'bg-white border-b border-gray-100'} key={element.id}>
                                            <td className="px-3 py-4 whitespace-nowrap  font-medium text-gray-900">{element.id}</td>
                                            {/*<td className="px-3 py-4 whitespace-nowrap  text-gray-500">*/}
                                            {/*    <img className="w-14 h-14  object-contain rounded-md shadow-inner"*/}
                                            {/*         src={getThumb(element.image)} alt={element[getLocalized('name')]}/>*/}
                                            {/*</td>*/}
                                            <td className="px-3 py-4 whitespace-nowrap  text-gray-500">
                                                <div className="flex items-center space-x-3 lg:pl-2">
                                                    <ActiveDot active={element.active}/>
                                                    {element[getLocalized()]}
                                                </div>
                                                <div
                                                    className="flex flex-1 flex-row justify-between space-x-3 mt-2 items-center">
                                                        <span
                                                            className={`inline-flex items-center px-2 py-0.5 rounded  font-medium bg-gray-100 text-gray-800`}>
                                                            {element.role[getLocalized()]}
                                                          </span>
                                                </div>
                                            </td>
                                            <td className=" px-6 py-4 whitespace-nowrap text-right  font-medium">
                                                <div key={element[getLocalized('name')]}
                                                     className="relative flex justify-center items-center rounded-full shadow-md w-12 h-12">
                                                    <Menu as="div" className="abflex-shrink-0 z-60">
                                                        {({open}) => (
                                                            <>
                                                                <Menu.Button
                                                                    className={`w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500`}>
                                                                            <span
                                                                                className="sr-only">Open options</span>
                                                                    <DotsVerticalIcon className="w-5 h-5"
                                                                                      aria-hidden="true"/>
                                                                </Menu.Button>
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
                                                                        className={classNames(locale.isRTL ? 'right-10' : 'left-10', "z-40 mx-3 origin-top-right absolute top-0 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none")}
                                                                    >
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <Link
                                                                                        href={route('backend.user.edit', element.id)}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                        )}
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
                                                                                        {trans('edit')} {trans('user')}
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                            {
                                                                                isAdminOrAbove && <Menu.Item>
                                                                                    {({active}) => (
                                                                                        <Link
                                                                                            href={route('backend.reset.password', {id: element.id})}
                                                                                            className={classNames(
                                                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                                'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                            )}
                                                                                        >
                                                                                            <svg
                                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                                className="h-6 w-6 mx-2"
                                                                                                fill="none"
                                                                                                viewBox="0 0 24 24"
                                                                                                stroke="currentColor">
                                                                                                <path
                                                                                                    strokeLinecap="round"
                                                                                                    strokeLinejoin="round"
                                                                                                    strokeWidth={2}
                                                                                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
                                                                                            </svg>
                                                                                            {trans('reset_password')}
                                                                                        </Link>
                                                                                    )}
                                                                                </Menu.Item>
                                                                            }
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <Link
                                                                                        href={route(`backend.slide.search`, {
                                                                                            slidable_id: element.id,
                                                                                            slidable_type: 'user'
                                                                                        })}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                        )}
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
                                                                                                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                                                        </svg>
                                                                                        {trans('list')} {trans('slides')}
                                                                                    </Link>

                                                                                )}
                                                                            </Menu.Item>
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <Link
                                                                                        href={route(`backend.slide.create`, {
                                                                                            slidable_id: element.id,
                                                                                            slidable_type: 'user'
                                                                                        })}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                        )}
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
                                                                                                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                                                                        </svg>
                                                                                        {trans('create')} {trans('slide')}
                                                                                    </Link>

                                                                                )}
                                                                            </Menu.Item>
                                                                        </div>
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <Link
                                                                                        href={route(`backend.toggle.activate`, {
                                                                                            model: 'user',
                                                                                            id: element.id
                                                                                        })}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                        )}
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
                                                                                                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"/>
                                                                                        </svg>
                                                                                        {trans("activate_or_deactivate")}
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <Link
                                                                                        href={route(`backend.make.verified`, {
                                                                                            id: element.id
                                                                                        })}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right'
                                                                                        )}
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
                                                                                                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"/>
                                                                                        </svg>
                                                                                        <span className="text-xs">{trans("make_email_verified")}</span>
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </div>

                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            dispatch(showModal({
                                                                                                type: 'destroy',
                                                                                                model: 'user',
                                                                                                id: element.id,
                                                                                                title: `${trans('destroy')} ${trans('user')}`,
                                                                                                message: `${trans('confirmation')} ${trans('destroy')} ${trans('user')}`,
                                                                                            }))
                                                                                        }
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 w-full flex-row items-center block px-4 py-2  ltr:text-left rtl:text-right text-red-700'
                                                                                        )}
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
                                                                                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                                                        </svg>
                                                                                        {trans("delete")}
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
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap  text-gray-500">
                                                {moment(element.created_at).format('l')}
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </BackendContainer>
    );
}

