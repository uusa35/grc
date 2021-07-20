import BackendContainer from "./components/containers/BackendContainer";
import {Menu, Transition} from "@headlessui/react";
import {DotsVerticalIcon, DuplicateIcon, PencilAltIcon, TrashIcon, UserAddIcon} from "@heroicons/react/solid";
import {Fragment, useContext} from "react";
import GlobalContext from "./context/GlobalContext";
import {BackendContext} from "./context/BackendContext";
import {map} from 'lodash';
import {InertiaLink} from "@inertiajs/inertia-react";
import Pagination from "./components/partials/Pagination";



const ProductIndex = ({elements, settings}) => {
    const {trans, classNames ,isRTL } = useContext(BackendContext);
    console.log('elements',elements)
    return (
        <BackendContainer>
            <div className="flex flex-col">
                <Pagination
                    links={elements.links}
                    type={'product'}
                />
                <div className=" overflow-x-auto sm:-mx-6">
                    <div className="align-middle inline-block min-w-full sm:px-3 rounded-b-lg">
                        <div
                            className={classNames(true ? `bg-${settings.theme}-600` : 'bg-blue-600', "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg")}>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead
                                    className={classNames(true ? `bg-${settings.theme}-300` : '', "text-black font-extrabold text-sm uppercase")}>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 rtl:text-right ltr:text-left text-xs  uppercase tracking-wider tracking-wider"
                                    >
                                        {trans('id')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('main_image')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('sku')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('name')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('commands')}
                                    </th>
                                    <th
                                        scope="col"
                                        className=" py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('price')}
                                    </th>

                                    <th
                                        scope="col"
                                        className=" py-3 rtl:text-right ltr:text-left"
                                    >
                                        {trans('attributes')}
                                    </th>

                                </tr>
                                </thead>
                                <tbody>
                                {
                                    elements.data.map(element =>
                                        <tr className={'bg-white border-b border-gray-100'} key={element.id}>
                                            <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{element.id}</td>
                                            <td className="py-4 whitespace-nowrap text-sm text-gray-500">
                                                <img className="w-20 h-auto object-contain"
                                                     src={element.imageThumb} alt="{element.name}"/>
                                            </td>
                                            <td className="py-4 whitespace-nowrap text-sm text-gray-500">{element.sku}</td>
                                            <td className="py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center space-x-3 lg:pl-2">
                                                    <div
                                                        className={classNames(element.active ? 'bg-green-600' : 'bg-gray-600', 'flex-shrink-0 w-2.5 h-2.5 rtl:ml-3 ltr:mr-3 rounded-full')}
                                                        aria-hidden="true"></div>
                                                    {element.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                                                                        className={classNames(isRTL ? 'right-10' : 'left-10',"z-40 mx-3 origin-top-right absolute top-3 w-48 mt-1 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none")}
                                                                    >
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <InertiaLink
                                                                                        href={`/product/${element.id}`}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'block px-4 py-2 text-sm ltr:text-left rtl:text-right'
                                                                                        )}
                                                                                    >
                                                                                        {trans('edit')}
                                                                                    </InertiaLink>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </div>
                                                                        <div className="py-1">
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <InertiaLink
                                                                                        href="#"
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'block px-4 py-2 text-sm'
                                                                                        )}
                                                                                    >
                                                                                        {trans('edit_attributes')}
                                                                                    </InertiaLink>
                                                                                )}
                                                                            </Menu.Item>
                                                                            <Menu.Item>
                                                                                {({active}) => (
                                                                                    <a
                                                                                        href={`toggle/activation/${element.id}`}
                                                                                        className={classNames(
                                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                                            'block px-4 py-2 text-sm'
                                                                                        )}
                                                                                    >
                                                                                        {trans("activate_or_deactivate")}
                                                                                    </a>
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
                                            <td className="py-4 whitespace-nowrap text-sm text-gray-500">{element.price} {trans('kd')}</td>
                                            <td className="py-4 whitespace-nowrap text-sm text-gray-500">
                                                <ul>
                                                    {
                                                        element.has_attributes ? element.attributes.map(a =>
                                                            <li key={a.id}>
                                                                {a.color.name} - {a.size.name}
                                                            </li>
                                                        ) : <li key={element.name}>{element.color.name} - {element.size.name}</li>
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
                <Pagination links={elements.links} type={'product'}/>
            </div>
        </BackendContainer>
    );
}

export default ProductIndex;
