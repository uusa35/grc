import {Fragment, useContext, useState} from 'react'
import {Disclosure, Menu, Switch, Transition} from '@headlessui/react'
import {SearchIcon} from '@heroicons/react/solid'
import {
    BellIcon,
    CogIcon,
    CreditCardIcon,
    KeyIcon,
    MenuIcon,
    UserCircleIcon,
    ViewGridAddIcon,
    XIcon,
} from '@heroicons/react/outline'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "../components/FrontendContainer";

import route from 'ziggy-js';
import GlobalContext from "../../context/GlobalContext";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import FrontendContentContainer from "../components/FrontendContentContainer";
import {useDispatch, useSelector} from "react-redux";
import {Inertia} from "@inertiajs/inertia";
import UserEditSideNav from "./Profile/UserEditSideNav";

export default function({user}) {
    const {classNames, trans, getThumb, getLocalized} = useContext(AppContext)
    const {locale} = useSelector(state => state);
    const [availableToHire, setAvailableToHire] = useState(true)
    const [privateAccount, setPrivateAccount] = useState(false)
    const [allowCommenting, setAllowCommenting] = useState(true)
    const [allowMentions, setAllowMentions] = useState(true)

    const subNavigation = [
        {
            name: 'personal_information',
            href: route('frontend.user.edit', user.id),
            icon: UserCircleIcon,
            current: true
        },
        {name: 'change_password', href: '#', icon: KeyIcon, current: false},
        {name: 'my_addresses', href: '#', icon: ViewGridAddIcon, current: false},
        {name: 'my_books_list', href: '#', icon: BellIcon, current: false},
        {name: 'my_courses_list', href: '#', icon: BellIcon, current: false},
        {name: 'my_subscription', href: '#', icon: CreditCardIcon, current: false},
        {name: 'orders_list', href: '#', icon: ViewGridAddIcon, current: false},
        {name: 'favorites_list', href: '#', icon: ViewGridAddIcon, current: false},
    ];

    const dispatch = useDispatch();
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        'name': user.name_en,
        'name_ar': user.name_ar,
        'name_en': user.name_en,
        'mobile': user.mobile,
        'whatsapp': user.whatsapp,
        'image' : user.image
    });

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()
        Inertia.post(route(`frontend.user.update`, user.id), {
            _method: 'put',
            ...data,
        }, {
            forceFormData: true
        })
    }

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <main className="relative mt-5">
                    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
                        <div className="bg-white overflow-hidden">
                            <div className=" lg:grid lg:grid-cols-12">

                                <UserEditSideNav/>
                                <form className=" lg:col-span-9"
                                      onSubmit={submit}
                                      method="put"
                                      encType="multipart/form-data"
                                >
                                    {/* Profile section */}
                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div className="flex flex-1 justify-between items-center">
                                            <div>
                                                <h2 className="text-lg leading-6 font-medium text-gray-900">{trans('profile')}</h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {trans('account_type')} : {user.role[getLocalized()]}
                                                </p>
                                            </div>
                                            <div className="flex flex-col lg:flex-row">
                                                <div
                                                    className="flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
                                                    <p className="text-sm font-medium text-gray-800" aria-hidden="true">
                                                        {trans('personal_image')}
                                                    </p>
                                                    <div className="mt-1 lg:hidden">
                                                        <div className="flex items-center">
                                                            <img className="rounded-full h-10 w-10 shadow-md"
                                                                 src={getThumb(user.image)}
                                                                 alt=""/>
                                                            <div className="ml-5 rounded-md shadow-sm">
                                                                <div
                                                                    className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                                                                    <label
                                                                        htmlFor="mobile-user-photo"
                                                                        className="relative text-sm leading-4 font-medium text-gray-800 pointer-events-none"
                                                                    >
                                                                        <span>{trans('change')}</span>
                                                                        <span className="sr-only"> user photo</span>
                                                                    </label>
                                                                    <input
                                                                        id="mobile-user-photo"
                                                                        name="image"
                                                                        type="file"
                                                                        onChange={e => setData('image', e.target.files[0])}
                                                                        className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="hidden relative rounded-full overflow-hidden lg:block">
                                                        <img className="relative rounded-full w-20 h-20 shadow-sm"
                                                             src={getThumb(user.image)}
                                                             alt=""/>
                                                        <label
                                                            htmlFor="desktop-user-photo"
                                                            className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-80 hover:opacity-100 focus-within:opacity-100"
                                                        >
                                                            <span>{trans('change')}</span>
                                                            <span className="sr-only"> user photo</span>
                                                            <input
                                                                type="file"
                                                                id="desktop-user-photo"
                                                                name="image"
                                                                onChange={e => setData('image', e.target.files[0])}
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-12 gap-3">

                                            {/* email */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="email"
                                                       className="block text-sm font-medium text-gray-800">
                                                    {trans("email")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    disabled
                                                    // onChange={handleChange}
                                                    defaultValue={user.email}
                                                    autoComplete={trans("email")}
                                                    className="disabled mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p className={`mt-2  text-gray-500`}>
                                                    {errors.email &&
                                                    <div className={`text-sm text-red-900`}>{errors.email}</div>}
                                                </p>
                                            </div>

                                            {/* name_en */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="name_en"
                                                       className="block text-sm font-medium text-gray-800">
                                                    {trans("name_en")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name_en"
                                                    id="name_en"
                                                    onChange={handleChange}
                                                    defaultValue={user.name_en}
                                                    autoComplete={trans("name_en")}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p className={`mt-2  text-gray-500`}>
                                                    {errors.name_en &&
                                                    <div className={`text-sm text-red-900`}>{errors.name_en}</div>}
                                                </p>
                                            </div>

                                            {/* name_ar */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="name_ar"
                                                       className="block text-sm font-medium text-gray-800">
                                                    {trans("name_ar")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name_ar"
                                                    id="name_ar"
                                                    onChange={handleChange}
                                                    defaultValue={user.name_ar}
                                                    autoComplete={trans("name_ar")}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p className={`mt-2  text-gray-500`}>
                                                    {errors.name_ar &&
                                                    <div className={`text-sm text-red-900`}>{errors.name_ar}</div>}
                                                </p>
                                            </div>

                                            {/* mobile */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="mobile"
                                                       className="block text-sm font-medium text-gray-800">
                                                    {trans("mobile")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name_ar"
                                                    id="mobile"
                                                    onChange={handleChange}
                                                    defaultValue={user.mobile}
                                                    autoComplete={trans("mobile")}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p className={`mt-2  text-gray-500`}>
                                                    {errors.mobile &&
                                                    <div className={`text-sm text-red-900`}>{errors.mobile}</div>}
                                                </p>
                                            </div>

                                            {/* whatsapp */}
                                            <div className="col-span-12 sm:col-span-6">
                                                <label htmlFor="whatsapp"
                                                       className="block text-sm font-medium text-gray-800">
                                                    {trans("whatsapp")}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="whatsapp"
                                                    id="whatsapp"
                                                    onChange={handleChange}
                                                    defaultValue={user.whatsapp}
                                                    autoComplete={trans("whatsapp")}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p className={`mt-2  text-gray-500`}>
                                                    {errors.whatsapp &&
                                                    <div className={`text-sm text-red-900`}>{errors.whatsapp}</div>}
                                                </p>
                                            </div>

                                        </div>
                                    </div>

                                    <div className=" divide-y divide-gray-200">
                                        <div className="mt-4 py-4 px-4 flex justify-end gap-x-5">
                                            <button
                                                type="button"
                                                className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                            >
                                                {trans('cancel')}
                                            </button>
                                            <button
                                                type="submit"
                                                className="ml-5 bg-gray-200 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-black hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                                            >
                                                {trans('save')}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
