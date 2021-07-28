import BackendContainer from "./../components/containers/BackendContainer";
import {Menu, Transition} from "@headlessui/react";
import {
    ChevronRightIcon,
    DotsVerticalIcon,
    DuplicateIcon,
    PencilAltIcon,
    TrashIcon,
    UserAddIcon
} from "@heroicons/react/solid";
import {Fragment, useContext, useEffect, useMemo, useState} from "react";
import {BackendContext} from "./../context/BackendContext";
import {map, sortBy, orderBy,isEmpty} from 'lodash';
import {Link} from "@inertiajs/inertia-react";
import Pagination from "./../components/partials/Pagination";
import {Inertia} from "@inertiajs/inertia";
import route from 'ziggy-js';


const ProductIndex = ({elements, settings}) => {
    const {trans, classNames, isRTL, currentModule , setSystemMessage, setShowConfirmationModal, setModelAction} = useContext(BackendContext);
    const [currentData, setCurrentData] = useState();
    const [sortDesc, setSortDesc] = useState(true)
    const [colName, setColName] = useState('id');


    useEffect(() => {
        setCurrentData(elements.data);
    },[elements.data])

    useMemo(() => {
        if (sortDesc) {
            setCurrentData(orderBy(elements.data, [colName], ['desc']));
        } else {
            setCurrentData(orderBy(elements.data, [colName], ['asc']));
        }
    }, [sortDesc])

    const handleSort = (colName) => {
        setColName(colName)
        setSortDesc(!sortDesc)
    }

    useEffect(() => {
        isEmpty(elements.data) ? setSystemMessage({
            message : trans('no_elements'),
            type : 'warning'
        }) : null;
    },[])

    return (
        <BackendContainer>
            <Pagination
                type={'product'}
                currentPage={elements.current_page}
                lastPage={elements.last_page}
            />
            <div className="mt-3 sm:hidden bg-white rounded-md shadow-md mx-3 py-3">
                <div className="px-4 sm:px-6">
                    <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">{trans('products')}</h2>
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
                                          {trans('id')}: {element.id} <span className="mx-5 truncate font-normal text-gray-500">{element.name}</span>
                                      </span>
                                    </span>
                                    <Link href={route('backend.product.edit', element.id)}>
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
            <div className="flex flex-col overflow-auto hidden sm:block">
                <div className=" overflow-x-auto">
                    <div className="align-middle inline-block min-w-full rounded-b-lg">
                        <div
                            className={classNames(true ? `bg-${settings.theme}-600` : 'bg-blue-600', "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg")}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead
                                    className={classNames(true ? `bg-${settings.theme}-300` : '', "text-black font-extrabold text-sm uppercase")}>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 flex flex-row justify-start items-center rtl:text-right ltr:text-left text-xs  uppercase tracking-wider tracking-wider"
                                        onClick={() => handleSort('id')}
                                    >
                                        {sortDesc ?
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
                                    <th
                                        scope="col"
                                        className=" px-3 py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('main_image')}
                                    </th>
                                    <th
                                        scope="col"
                                        className="py-3 rtl:text-right ltr:text-left text-xs"
                                        onClick={() => handleSort('sku')}
                                    >
                                        <div className="flex flex-row justify-start flex-1 items-center">
                                            <div>
                                                {sortDesc ?
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
                                            </div>
                                            <div>
                                                {trans('sku')}
                                            </div>
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className=" px-3 py-3 flex flex-1 flex-row justify-start items-center rtl:text-right ltr:text-left"
                                        onClick={() => handleSort('name')}
                                    >
                                        {sortDesc ?
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
                                        {trans('name')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" px-3 py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('commands')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" px-3 py-3 flex flex-row justify-start items-center rtl:text-right ltr:text-left"
                                        onClick={() => handleSort('price')}
                                    >
                                        {sortDesc ?
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
                                        {trans('price')}
                                    </th>

                                    <th
                                        scope="col"
                                        className=" px-3 py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('attributes')}
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                {
                                    currentData && currentData.map(element =>
                                        <tr className={'bg-white border-b border-gray-100'} key={element.id}>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element.id}</td>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <img className="w-20 h-20  object-contain rounded-md shadow-inner"
                                                                                  src={element.imageThumb} alt={element.name}/>
                                            </td>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{element.sku}</td>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center space-x-3 lg:pl-2">
                                                    <div
                                                        className={classNames(element.active ? 'bg-green-600' : 'bg-gray-600', 'flex-shrink-0 w-2.5 h-2.5 rtl:ml-3 ltr:mr-3 rounded-full')}
                                                        aria-hidden="true"></div>
                                                    {element.name}
                                                </div>
                                            </td>
                                            <td className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div key={element.name}
                                                     className="relative flex justify-center items-center rounded-full shadow-md w-12 h-12">
                                                    <Menu as="div" className="abflex-shrink-0">
                                                        {({open}) => (
                                                            <>
                                                                <Menu.Button
                                                                    className={`w-8 h-8 bg-white inline-flex items-center justify-center text-${settings.theme}-400 rounded-full hover:text-${settings.theme}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${settings.theme}-500`}>
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
                                                                        className={classNames(isRTL ? 'right-10' : 'left-10', "z-40 mx-3 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none")}
                                                                    >
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <Link
                                                                                        href={`/backend/${currentModule}/${element.id}/edit`}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2 text-sm ltr:text-left rtl:text-right'
                                                                                        )}
                                                                                    >
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                                        </svg>
                                                                                        {trans('edit')}
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </div>
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <Link
                                                                                        href="#"
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2 text-sm ltr:text-left rtl:text-right'
                                                                                        )}
                                                                                    >
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" viewBox="0 0 20 20" fill="currentColor">
                                                                                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                                                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                                                                        </svg>
                                                                                        {trans('edit_attributes')}
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </div>
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <Link
                                                                                        href={`/backend/product/toggle/activate?id=${element.id}&model=${currentModule}`}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2 text-sm ltr:text-left rtl:text-right'
                                                                                        )}
                                                                                    >
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                                                                                        </svg>
                                                                                        {trans("activate_or_deactivate")}
                                                                                    </Link>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </div>
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            setShowConfirmationModal(true)
                                                                                            setModelAction({ type : 'delete', model : 'product', id : element.id})
                                                                                        }}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'flex flex-1 flex-row items-center block px-4 py-2 text-sm ltr:text-left rtl:text-right'
                                                                                        )}
                                                                                    >
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{element.price} {trans('kd')}</td>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <ul>
                                                    {
                                                        element.has_attributes && !isEmpty(element.product_attributes) ? element.product_attributes.map(a =>
                                                                <li key={a.id}>
                                                                    {a.color.name} - {a.size.name}
                                                                </li>
                                                            ) :
                                                            <li key={element.name}>{element.color.name} - {element.size.name}</li>
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination currentPage={elements.current_page} lastPage={elements.last_page} type={'product'}/>
            </div>
        </BackendContainer>
    );
}

export default ProductIndex;
