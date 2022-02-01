import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import React, {useContext, useMemo, useState} from "react";
import FrontendContainer from "../components/FrontendContainer";
import FrontendContentContainer from "../components/FrontendContentContainer";
import {AppContext} from "../../context/AppContext";
import GlobalContext from "../../context/GlobalContext";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import route from 'ziggy-js';
import {Inertia} from "@inertiajs/inertia";
import {random, map} from "lodash";
import {useSelector} from "react-redux";


export default function({countries}) {
    const {trans, getThumb, getLocalized, classNames } = useContext(AppContext);
    const globalContext = useContext(GlobalContext);
    const { settings } = globalContext;
    const { locale} = useSelector(state => state);
    const [code, setCode] = useState('');
    const {props} = usePage();
    const {errors} = props;

    const {data, setData, post, progress} = useForm({
        'name': '',
        'email': '',
        'password': '',
        'password_confirmation': '',
        'mobile': '',
        'code': '',
        'code_confirmation': '',
        'country_id': '',
    });

    useMemo(() => {
        const currentCode = random(1111, 9999);
        setCode(currentCode);
        setData('code', currentCode.toString());
    }, [])

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }


    const submit = (e) => {
        e.preventDefault()
        Inertia.post(route(`frontend.user.post.registration`), {
            _method: 'post',
            ...data,
        }, {
            forceFormData: false,
            preserveScroll: true,
            resetOnSuccess: false,
            onSuccess: ({props}) => {
                globalContext.auth = props.auth
            }
        })
    }

    return (
        <FrontendContainer>
            <FrontendContentContainer parentModuleName={'register'}>
                <SubMetaElement title={trans('register')}/>
                <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mx-auto h-16 w-auto"
                            src={settings.mgt ? getThumb(settings.image) : getThumb(settings.app_logo)}
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{trans('register_new_user')}</h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <form className="space-y-6" onSubmit={submit}>
                                {/* name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-800">
                                        {trans('name')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            autoComplete="name"
                                            required
                                            onChange={handleChange}
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                {/* email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-800">
                                        {trans('email')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            onChange={handleChange}
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                {/* password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-800">
                                        {trans('password')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            onChange={handleChange}
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                {/* password_confirm */}
                                <div>
                                    <label htmlFor="password_confirmation"
                                           className="block text-sm font-medium text-gray-800">
                                        {trans('password_confirmation')}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            onChange={handleChange}
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                {/* mobile */}
                                <div>
                                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-800">
                                        {trans('mobile')}
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className={classNames(locale.isRTL ? `left-0` :  `right-0` , "absolute inset-y-0 flex items-center")}>
                                            <label htmlFor="country" className="sr-only">
                                                {trans('country')}
                                            </label>
                                            <select
                                                id="country_id"
                                                name="country_id"
                                                onChange={handleChange}
                                                autoComplete="country"
                                                className="focus:ring-gray-500 focus:border-gray-500 h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                            >
                                                {map(countries, c => (
                                                    <option value={c.id}
                                                            selected={data.country_id === c.id}>{c[getLocalized()]} -
                                                        ({c.calling_code})</option>
                                                ))}
                                            </select>
                                        </div>
                                        <input
                                            id="mobile"
                                            name="mobile"
                                            type="number"
                                            required
                                            min={8}
                                            autoComplete="mobile"
                                            onChange={handleChange}
                                            placeholder={trans('mobile_placeholder')}
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                {/* code_confirmation */}
                                <div>
                                    <label htmlFor="code_confirmation"
                                           className="block text-sm  text-gray-900">
                                        {trans('write_protection_code')} - ({code})
                                    </label>
                                    <div className="mt-1">
                                        <input type="hidden" name="code" value={code}/>
                                        <input
                                            id="code_confirmation"
                                            type="text"
                                            name="code_confirmation"
                                            required
                                            onChange={handleChange}
                                            placeholder={trans('write_protection_code')}
                                            className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                        />
                                        <p className={`mt-2  text-gray-500`}>
                                            {errors.code_confirmation && <div
                                                className={`text-red-900 text-sm`}>{errors.code_confirmation}</div>}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        {trans('register')}
                                    </button>
                                </div>
                                <div>
                                    <Link
                                        href={route('frontend.user.logging')}
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-gray-800 bg-white hover:bg-gray-50 capitalize"
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
