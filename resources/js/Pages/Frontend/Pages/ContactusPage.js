import React, {useContext, useMemo, useState} from 'react'
import {MailIcon, PhoneIcon} from '@heroicons/react/outline'
import FrontendContainer from "../components/FrontendContainer";
import {AppContext} from "../../context/AppContext";
import GlobalContext from "../../context/GlobalContext";
import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube} from "react-icons/fa";
import {getWhatsappLink} from "../../helpers";
import {random} from "lodash";
import EmbeddedHtml from "../../Backend/components/widgets/EmbeddedHtml";
import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import FrontendContentContainer from "../components/FrontendContentContainer";
import {useForm, usePage} from "@inertiajs/inertia-react";
import axios from "axios";
import {Inertia} from "@inertiajs/inertia";
import route from "ziggy-js";

export default function() {
    const {trans, getThumb, getLocalized} = useContext(AppContext);
    const [code, setCode] = useState('');
    const {settings} = useContext(GlobalContext)

    const {props} = usePage();
    const {errors} = props;
    const {data, setData, post, progress} = useForm({
        'first_name': '',
        'last_name': '',
        'notes': '',
        'content': '',
        'email': '',
        'mobile': '',
        'code': '',
        'code_confirmation': '',
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
        Inertia.post(route(`frontend.send.contactus`), {
            _method: 'post',
            ...data,
        }, {
            forceFormData: true,
            resetOnSuccess: false,
            preserveScroll: true,
        })
    }

    return (
        <FrontendContainer>
            <FrontendContentContainer parentModuleName={'contactus'} >
                <SubMetaElement title={trans('contactus')}/>
                <div className="bg-white relative overflow-hidden">
                    {/* Decorative background image and gradient */}
                    <div aria-hidden="true" className="absolute inset-0">
                        <div className="absolute inset-0  overflow-hidden">
                            <img
                                src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                                alt=""
                                className="w-full h-full object-center object-contain rounded-lg"
                            />
                        </div>
                        <div className="absolute inset-0 bg-white bg-opacity-75"/>
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-white"/>
                    </div>

                    {/* Callout */}
                    <section
                        aria-labelledby="sale-heading"
                        className="relative  flex flex-col items-center text-center"
                    >
                        <div className="w-full">
                            <h2
                                id="sale-heading"
                                className="text-4xl my-5 font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                            >
                                {trans('contactus')}
                            </h2>
                            {
                                settings.latitude && settings.longitude ? <div>
                                    <iframe
                                        width="100%"
                                        height="400"
                                        frameBorder="0"
                                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDeAf8QTbMO_6O8JeG1tGjpvJeXHoDygwg&zoom=12&q=${settings.latitude},${settings.longitude}`}
                                        allowFullScreen>
                                    </iframe>
                                </div> : null
                            }
                        </div>
                    </section>
                    <section
                        aria-labelledby="testimonial-heading"
                        className="relative max-w-7xl mx-auto py-1 px-4 sm:px-6 lg:py-1 lg:px-8"
                    >
                        <div className="max-w-2xl mx-auto lg:max-w-none">
                            <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-1 lg:gap-x-8 w-full ">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="relative">
                                        <div className="grid grid-cols-1 lg:grid-cols-3">
                                            {/* Contact information */}
                                            <div
                                                className="relative overflow-hidden py-10 px-6 bg-gradient-to-b from-teal-500 to-teal-600 sm:px-10 xl:p-12">
                                                <img
                                                    className="h-28 my-5"
                                                    src={getThumb(settings.image)}
                                                    alt={settings[getLocalized()]}
                                                />
                                                <h3 className="text-lg ">{settings[getLocalized()]}</h3>
                                                <p className="mt-2 text-base text-teal-50 max-w-3xl">
                                                    {settings[getLocalized('caption')]}
                                                </p>
                                                <h3 className="text-lg mt-2 pt-2 border-t border-gray-200">{trans('contact_information')}</h3>
                                                <p className="mt-2 text-base text-teal-50 max-w-3xl">
                                                    {settings[getLocalized('address')]} - {settings[getLocalized('country')]}
                                                </p>
                                                <dl className="mt-2 space-y-6">
                                                    <dt>
                                                        <span className="sr-only">{trans('mobile')}</span>
                                                    </dt>
                                                    <dd className="flex text-base text-teal-50">
                                                        <PhoneIcon
                                                            className="flex-shrink-0 w-6 h-6 text-teal-200 rtl:ml-5 ltr:mr-5"
                                                            aria-hidden="true"/>
                                                        <span className="ml-3">{settings.mobile}</span>
                                                    </dd>
                                                    <dt>
                                                        <span className="sr-only">{trans('email')}</span>
                                                    </dt>
                                                    <dd className="flex text-base text-teal-50">
                                                        <MailIcon
                                                            className="flex-shrink-0 w-6 h-6 text-teal-200 rtl:ml-5 ltr:mr-5"
                                                            aria-hidden="true"/>
                                                        <span className="ml-3">
                                                <a href={`mailto:${settings.email}`}>
                                                    {settings.email}
                                                </a>
                                            </span>
                                                    </dd>
                                                </dl>
                                                <div
                                                    className="flex justify-between items-center  flex-row gap-x-5 my-10">
                                                    <a target="_blank" href={settings.instagram}>
                                                        <FaInstagram size={22} className={'text-gray-400'}/>
                                                    </a>
                                                    <a target="_blank" href={settings.facebook}>
                                                        <FaFacebook size={22} className={'text-gray-400'}/>
                                                    </a>
                                                    <a target="_blank" href={settings.twitter}>
                                                        <FaTwitter size={22} className={'text-gray-400'}/>
                                                    </a>
                                                    <a target="_blank" href={settings.youtube}>
                                                        <FaYoutube size={22} className={'text-gray-400'}/>
                                                    </a>
                                                    <a target="_blank"
                                                       href={getWhatsappLink(settings.whatsapp, settings[getLocalized()])}>
                                                        <FaWhatsapp size={22} className={'text-gray-400'}/>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Contact form */}
                                            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                                                <h3 className="text-lg  text-gray-900">{trans('for_any_inquires_contact_us')}</h3>
                                                <form onSubmit={submit}
                                                      className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                                    <div>
                                                        <label htmlFor="first-name"
                                                               className="block text-sm  text-gray-900">
                                                            {trans('first_name')}*
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                name="first_name"
                                                                required
                                                                id="first_name"
                                                                onChange={handleChange}
                                                                autoComplete="given-name"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p className={`mt-2  text-gray-500`}>
                                                                {errors.first_name && <div
                                                                    className={`text-red-900 text-sm`}>{errors.first_name}</div>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="last-name"
                                                               className="block text-sm  text-gray-900">
                                                            {trans('last_name')}*
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                name="last_name"
                                                                required
                                                                id="last_name"
                                                                onChange={handleChange}
                                                                autoComplete="family-name"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p className={`mt-2  text-gray-500`}>
                                                                {errors.last_name && <div
                                                                    className={`text-red-900 text-sm`}>{errors.last_name}</div>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm  text-gray-900">
                                                            {trans('email')}*
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                required
                                                                type="email"
                                                                onChange={handleChange}
                                                                autoComplete="email"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p className={`mt-2  text-gray-500`}>
                                                                {errors.email && <div
                                                                    className={`text-red-900 text-sm`}>{errors.email}</div>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* mobile */}
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <label htmlFor="phone"
                                                                   className="block text-sm  text-gray-900">
                                                                {trans('mobile')}
                                                            </label>
                                                            <span id="phone-optional" className="text-sm text-gray-500">
                                                          {trans('optional')}
                                                        </span>
                                                        </div>
                                                        <div className="mt-1">
                                                            <input
                                                                type="number"
                                                                name="mobile"
                                                                id="mobile"
                                                                onChange={handleChange}
                                                                autoComplete="tel"
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                                aria-describedby="phone-optional"
                                                            />
                                                            <p className={`mt-2  text-gray-500`}>
                                                                {errors.mobile && <div
                                                                    className={`text-red-900 text-sm`}>{errors.mobile}</div>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* subject */}
                                                    <div className="sm:col-span-1">
                                                        <label htmlFor="subject"
                                                               className="block text-sm  text-gray-900">
                                                            {trans('subject')}*
                                                        </label>
                                                        <div className="mt-1">
                                                            <input
                                                                type="text"
                                                                name="subject"
                                                                required
                                                                id="subject"
                                                                onChange={handleChange}
                                                                className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md"
                                                            />
                                                            <p className={`mt-2  text-gray-500`}>
                                                                {errors.subject && <div
                                                                    className={`text-red-900 text-sm`}>{errors.subject}</div>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* code_confirmation */}
                                                    <div className="sm:col-span-1">
                                                        <label htmlFor="subject"
                                                               className="block text-sm  text-gray-900">
                                                            {trans('write_protection_code')} - ({code})
                                                        </label>
                                                        <div className="mt-1">
                                                            <input type="hidden" name="code" value={code}/>
                                                            <input
                                                                type="text"
                                                                name="code_confirmation"
                                                                required
                                                                id="code_confirmation"
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
                                                    <div className="sm:col-span-2">
                                                        <div className="flex justify-between">
                                                            <label htmlFor="message"
                                                                   className="block text-sm  text-gray-900">
                                                                {trans('content')}
                                                            </label>
                                                            <span id="message-max" className="text-sm text-gray-500">
                                                              {trans('max_1000_characters')}
                                                            </span>
                                                        </div>
                                                        <div className="mt-1">
                                                                <textarea
                                                                    id="content"
                                                                    name="content"
                                                                    onChange={handleChange}
                                                                    rows={4}
                                                                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-teal-500 focus:border-teal-500 border border-gray-300 rounded-md"
                                                                    aria-describedby="message-max"
                                                                    defaultValue={''}
                                                                />
                                                            <p className={`mt-2  text-gray-500`}>
                                                                {errors.content && <div
                                                                    className={`text-red-900 text-sm`}>{errors.content}</div>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                                                        <button
                                                            type="submit"
                                                            className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base  bg-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:w-auto"
                                                        >
                                                            {trans('submit')}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    )
}
