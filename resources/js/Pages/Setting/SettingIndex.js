/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'
import BackendContainer from "../components/containers/BackendContainer";
import {useContext} from "react";
import {BackendContext} from "../context/BackendContext";
import GlobalContext from "../context/GlobalContext";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js'
const files = [
    {
        title: 'IMG_4985.HEIC',
        size: '3.9 MB',
        source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
        title: 'IMG_4985.HEIC',
        size: '3.9 MB',
        source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
]

export default function SettingIndex({ element }) {
    const { trans } = useContext(BackendContext);
    const { settings } = useContext(GlobalContext);
    console.log('element', element)
    return (
        <BackendContainer>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{trans('settings')}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{trans('settings_message')}</p>
                    </div>
                </div>
                <div className="flex">
                    <Link
                    className={`mx-5 p-3 bg-gray-600 text-white rounded-md shadow-md`}
                        href={route('backend.setting.edit', settings.id)}>{trans('edit')}</Link>
                </div>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('logo')} {trans('website')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <img
                                className={`w-20 h-auto rounded-md shadow-md`}
                                src={settings.imageThumb} alt={settings.name}/>
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('name')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{settings.name}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('email')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{settings.email}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('mobile')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{settings.mobile}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('country')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{settings.country}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('description')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {settings.description}
                        </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">{trans('accounts')}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="flex flex-row justify-evenly items-center">
                                <Link href={settings.apple}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('apple')}
                                </Link>
                                <Link href={settings.android}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('android')}
                                </Link>
                                <Link href={settings.facebook}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('facebook')}
                                </Link>
                                <Link href={settings.twitter}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('twitter')}
                                </Link>
                                <Link href={settings.youtube}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('youtube')}
                                </Link>
                                <Link href={settings.apple}
                                      className="flex w-20 p-1 items-center justify-center border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:text-lg"
                                >
                                    {trans('apple')}
                                </Link>
                                <Link href={settings.instagram}
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
                {files.map((file) => (
                    <li key={file.source} className="relative">
                        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-gray-500 overflow-hidden">
                            <img src={file.source} alt="" className="object-cover pointer-events-none group-hover:opacity-75" />
                            <button type="button" className="absolute inset-0 focus:outline-none">
                                <span className="sr-only">View details for {file.title}</span>
                            </button>
                        </div>
                        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{file.title}</p>
                        <p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p>
                    </li>
                ))}
            </ul>
        </BackendContainer>
    )
}
