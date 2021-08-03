/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'
import BackendContainer from "../components/containers/BackendContainer";
import {useContext} from "react";
import {BackendContext} from "../context/BackendContext";
import GlobalContext from "../context/GlobalContext";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js'

export default function SettingIndex({ setting }) {
    const { trans } = useContext(BackendContext);
    console.log('element', setting)
    return (
        <BackendContainer>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{trans('setting')}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{trans('setting_message')}</p>
                    </div>
                </div>
                <div className="flex">
                    <Link
                    className={`mx-5 p-3 bg-gray-600 text-white rounded-md shadow-md`}
                        href={route('backend.setting.edit', setting.id)}>{trans('edit')}</Link>
                </div>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('logo')} {trans('website')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <img
                                className={`w-20 h-auto rounded-md shadow-md`}
                                src={setting.imageThumb} alt={setting.name}/>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('name')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{setting.name}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('email')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{setting.email}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('mobile')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{setting.mobile}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('country')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{setting.country}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('description')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {setting.description}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('accounts')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex flex-row justify-evenly items-center">
                                <Link href={setting.apple}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('apple')}
                                </Link>
                                <Link href={setting.android}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('android')}
                                </Link>
                                <Link href={setting.facebook}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('facebook')}
                                </Link>
                                <Link href={setting.twitter}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('twitter')}
                                </Link>
                                <Link href={setting.youtube}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('youtube')}
                                </Link>
                                <Link href={setting.apple}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('apple')}
                                </Link>
                                <Link href={setting.instagram}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('instagram')}
                                </Link>
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
            <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {setting.images.map((file) => (
                    <li key={file.id} className="relative">
                        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-gray-500 overflow-hidden">
                            <img src={file.imageThumb} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                            <button type="button" className="absolute inset-0 focus:outline-none">
                                {/*<span className="sr-only">View details for {file.title}</span>*/}
                            </button>
                        </div>
                        {/*<p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.title}</p>*/}
                        {/*<p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p>*/}
                    </li>
                ))}
            </ul>
        </BackendContainer>
    )
}
