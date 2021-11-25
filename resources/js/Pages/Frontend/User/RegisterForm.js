import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import React, {useContext} from "react";
import FrontendContainer from "../components/FrontendContainer";
import FrontendContentContainer from "../components/FrontendContentContainer";
import {AppContext} from "../../context/AppContext";
import GlobalContext from "../../context/GlobalContext";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js';


export default function() {
    const {trans, getThumb} = useContext(AppContext);
    const {settings} = useContext(GlobalContext);

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <SubMetaElement title={trans('books')}/>
                <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mx-auto h-16 w-auto"
                            src={getThumb(settings.image)}
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{trans('register_new_user')}</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" action="#" method="POST">
                                {/* name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        {trans('name')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                {/* email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        {trans('email')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                {/* password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        {trans('password')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                {/* password_confirm */}
                                <div>
                                    <label htmlFor="password_confirmation"
                                           className="block text-sm font-medium text-gray-700">
                                        {trans('password_confirmation')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password_confirmation"
                                            autoComplete="current-password"
                                            required
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                {/* mobile */}
                                <div>
                                    <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                                        {trans('mobile')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="number"
                                            autoComplete="mobile"
                                            placeholder={trans('mobile_placeholder')}
                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        {trans('register')}
                                    </button>
                                </div>
                                <div>
                                    <Link
                                        href={route('frontend.user.logging')}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-gray-800 bg-white hover:bg-gray-50"
                                    >
                                        {trans('already_a_user_login_to_ur_account')}
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
