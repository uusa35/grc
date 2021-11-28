import {Fragment, useState, useContext} from 'react'
import {InertiaLink, Link} from "@inertiajs/inertia-react";
import { AppContext } from './../context/AppContext';
import BackendContainer from "./components/containers/BackendContainer";
import {
    AcademicCapIcon,
    BadgeCheckIcon,
    CashIcon,
    ClockIcon,
    MenuIcon,
    ReceiptRefundIcon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline'
import pluralize from 'pluralize';
import GlobalContext from "../context/GlobalContext";
import {isEmpty, map , filter } from "lodash";
import route from 'ziggy-js';
import {useSelector} from "react-redux";

const stats = [
    {label: 'Vacation days left', value: 12},
    {label: 'Sick days left', value: 4},
    {label: 'Personal days left', value: 2},
]
const actions = [
    {
        icon: ClockIcon,
        name: 'Request time off',
        href: '#',
        iconForeground: 'text-teal-700',
        iconBackground: 'bg-teal-50',
    },
    {
        icon: BadgeCheckIcon,
        name: 'Benefits',
        href: '#',
        iconForeground: 'text-purple-700',
        iconBackground: 'bg-purple-50',
    },
    {
        icon: UsersIcon,
        name: 'Schedule a one-on-one',
        href: '#',
        iconForeground: 'text-sky-700',
        iconBackground: 'bg-sky-50',
    },
    {icon: CashIcon, name: 'Payroll', href: '#', iconForeground: 'text-yellow-700', iconBackground: 'bg-yellow-50'},
    {
        icon: ReceiptRefundIcon,
        name: 'Submit an expense',
        href: '#',
        iconForeground: 'text-rose-700',
        iconBackground: 'bg-rose-50',
    },
    {
        icon: AcademicCapIcon,
        name: 'Training',
        href: '#',
        iconForeground: 'text-indigo-700',
        iconBackground: 'bg-indigo-50',
    },
]
const recentHires = [
    {
        name: 'Leonard Krasner',
        handle: 'leonardkrasner',
        imageUrl:
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
    {
        name: 'Floyd Miles',
        handle: 'floydmiles',
        imageUrl:
            'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
    {
        name: 'Emily Selman',
        handle: 'emilyselman',
        imageUrl:
            'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
    {
        name: 'Kristin Watson',
        handle: 'kristinwatson',
        imageUrl:
            'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        href: '#',
    },
]
const announcements = [
    {
        id: 1,
        title: 'Office closed on July 2nd',
        href: '#',
        preview:
            'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
    },
    {
        id: 2,
        title: 'New password policy',
        href: '#',
        preview:
            'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
    },
    {
        id: 3,
        title: 'Office closed on July 2nd',
        href: '#',
        preview:
            'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
    },
]


export default function BackendHomePage() {
    const {trans , getLocalized, getThumb, classNames , isAdminOrAbove } = useContext(AppContext);
    const { auth } = useContext(GlobalContext);
    const { modules, parentModule } = useSelector(state => state);

    return (
        <BackendContainer type={'home'}>
            <main className="sm:my-3">
                <div className="w-full">
                    <h1 className="sr-only">Profile</h1>
                    {/* Main 3 column grid */}
                    <div className="grid grid-cols-1 gap-1  items-start lg:grid-cols-3 lg:gap-3">
                        {/* Left column */}
                        <div className=" grid grid-cols-1 gap-6 lg:col-span-full ">
                            {/* Welcome panel */}
                            <section aria-labelledby="profile-overview-title">
                                <div className="rounded-lg bg-white overflow-hidden shadow">
                                    <h2 className="sr-only" id="profile-overview-title">
                                        {trans("profile")}
                                    </h2>
                                    <div className="bg-white p-6">
                                        <div className="sm:flex sm:items-center sm:justify-between">
                                            <div className="sm:flex sm:space-x-5">
                                                <div className="flex-shrink-0">
                                                    <img className="mx-10 h-20 w-20 rounded-full" src={getThumb(auth.image)}
                                                         alt=""/>
                                                </div>
                                                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                                                    <p className="text-sm font-medium text-gray-600">{trans('welcome')}</p>
                                                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">{auth[getLocalized()]}</p>
                                                    <p className="text-sm font-medium text-gray-600">{auth.role[getLocalized()]}</p>
                                                </div>
                                            </div>
                                            <div className="mt-5 flex justify-center sm:mt-0">
                                                <Link
                                                    href={route('backend.user.edit', auth.id)}
                                                    className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                                >
                                                    {trans('edit')}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                    <div className={`bg-white shadow-md rounded-md p-4 my-4`}>
                        <h2 className={`text-lg font-medium text-gray-900`}>{trans('modules')}</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {trans('all_modules_message')}
                        </p>
                        <ul role="list" className="py-2 grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-4 ">
                            {!isEmpty(modules) && map(filter(modules,  m =>m.index && m.on_top && !m.hide_module && route().has(`backend.${m.name}.index`)),(m) => (
                                <li key={m.name} className={`flow-root rounded-md px-2  bg-white`}>
                                    <div className={`relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-100 focus-within:ring-2 focus-within:ring-gray-500`}>
                                        <div
                                            className={classNames(
                                                'flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-lg'
                                            )}
                                        >
                                            <img className={`rtl:ml-3 ltr:mr-3 rounded-md w-14 h-auto`} src={getThumb(m.image)} alt={m.name}/>
                                        </div>
                                        <div>
                                            <h3 className={`text-sm font-medium text-gray-900`}>
                                                <Link href={m.main_menu ? `/backend/${m.name}/search` : `/backend/${m.name}`} className="focus:outline-none">
                                                    <span className="absolute inset-0" aria-hidden="true" />
                                                    {trans(pluralize(m.name))}
                                                </Link>
                                            </h3>
                                            <p className={`mt-1 text-sm text-gray-500`}>{m.description}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </main>
        </BackendContainer>
    );
}

