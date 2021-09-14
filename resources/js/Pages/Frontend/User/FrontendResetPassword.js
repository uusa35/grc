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
import UserEditSideNav from "./UserEditSideNav";

export default function() {
    const {classNames, trans, getThumb, getLocalized} = useContext(AppContext)
    const {auth} = useContext(GlobalContext);
    const {locale} = useSelector(state => state);
    const [availableToHire, setAvailableToHire] = useState(true)
    const [privateAccount, setPrivateAccount] = useState(false)

    const dispatch = useDispatch();
    const {props} = usePage();
    const {errors} = props;
    const {data, setData, put, post, progress, reset} = useForm({
        'old_password': '',
        'password': '',
        'confirm_password': ''
    });

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()
        Inertia.post(route(`frontend.reset.password`), {
            ...data,
            image: data.image,
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
                                <form className=" lg:col-span-9" action="#" method="POST">

                                    <div className="py-6 px-4 sm:p-6 lg:pb-8">
                                        <div className="flex flex-1 justify-between items-center">
                                            <div>
                                                <h2 className="text-lg leading-6 font-medium text-gray-900">{trans('profile')}</h2>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {trans("change_password")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-6 grid grid-cols-12 gap-3">

                                            {/* old_password */}
                                            <div className="col-span-12">
                                                <label htmlFor="old_password"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {trans("old_password")}
                                                </label>
                                                <input
                                                    type="password"
                                                    name="old_password"
                                                    id="old_password"
                                                    disabled
                                                    onChange={handleChange}
                                                    autoComplete={trans("email")}
                                                    className="disabled mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p className={`mt-2  text-gray-500`}>
                                                    {errors.old_password &&
                                                    <div className={`text-sm text-red-900`}>{errors.old_password}</div>}
                                                </p>
                                            </div>

                                            {/* password */}
                                            <div className="col-span-12">
                                                <label htmlFor="password"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {trans("password")}
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    disabled
                                                    onChange={handleChange}
                                                    autoComplete={trans("email")}
                                                    className="disabled mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p className={`mt-2  text-gray-500`}>
                                                    {errors.password &&
                                                    <div className={`text-sm text-red-900`}>{errors.password}</div>}
                                                </p>
                                            </div>

                                            {/* confirm_password */}
                                            <div className="col-span-12">
                                                <label htmlFor="confirm_password"
                                                       className="block text-sm font-medium text-gray-700">
                                                    {trans("confirm_password")}
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirm_password"
                                                    id="confirm_password"
                                                    disabled
                                                    onChange={handleChange}
                                                    autoComplete={trans("confirm_password")}
                                                    className="disabled mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                                />
                                                <p className={`mt-2  text-gray-500`}>
                                                    {errors.confirm_password &&
                                                    <div
                                                        className={`text-sm text-red-900`}>{errors.confirm_password}</div>}
                                                </p>
                                            </div>


                                        </div>
                                    </div>

                                    <div className="mt-4 py-4 px-4 flex justify-end gap-x-5">
                                        <button
                                            type="button"
                                            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
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
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
