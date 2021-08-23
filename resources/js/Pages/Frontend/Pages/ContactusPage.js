import { useContext} from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import FrontendContainer from "../components/FrontendContainer";
import {AppContext} from "../../context/AppContext";
import GlobalContext from "../../context/GlobalContext";
import {FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube} from "react-icons/fa";
import {getWhatsappLink} from "../../helpers";
import {random} from "lodash";

export default function ContactusPage() {
    const { trans , getThumb , getLocalized } = useContext(AppContext);
    const code = random(1111,9999);
    const { settings } = useContext(GlobalContext)
    return (
        <FrontendContainer>
                {/* Contact section */}
                <section className="relative mt-20" aria-labelledby="contact-heading">
                    <div className="absolute w-full h-auto bg-warm-gray-50" aria-hidden="true" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="relative">
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                {/* Contact information */}
                                <div className="relative overflow-hidden py-10 px-6 bg-gradient-to-b from-teal-500 to-teal-600 sm:px-10 xl:p-12">
                                    <img
                                        className="h-28 my-5"
                                        src={getThumb(settings.image)}
                                        alt={settings[getLocalized()]}
                                    />
                                    <h3 className="text-lg ">{settings[getLocalized()]}</h3>
                                    <p className="mt-6 text-base text-teal-50 max-w-3xl">
                                        {settings[getLocalized('caption')]}
                                    </p>
                                    <h3 className="text-lg ">{trans('contact_information')}</h3>
                                    <p className="mt-6 text-base text-teal-50 max-w-3xl">
                                        {settings[getLocalized('address')]}
                                    </p>
                                    <dl className="mt-8 space-y-6">
                                        <dt>
                                            <span className="sr-only">{trans('mobile')}</span>
                                        </dt>
                                        <dd className="flex text-base text-teal-50">
                                            <PhoneIcon className="flex-shrink-0 w-6 h-6 text-teal-200 rtl:ml-5 ltr:mr-5" aria-hidden="true" />
                                            <span className="ml-3">{settings.mobile}</span>
                                        </dd>
                                        <dt>
                                            <span className="sr-only">{trans('email')}</span>
                                        </dt>
                                        <dd className="flex text-base text-teal-50">
                                            <MailIcon className="flex-shrink-0 w-6 h-6 text-teal-200 rtl:ml-5 ltr:mr-5" aria-hidden="true" />
                                            <span className="ml-3">
                                                <a href={`mailto:${settings.email}`}>
                                                    {settings.email}
                                                </a>
                                            </span>
                                        </dd>
                                    </dl>
                                    <div className="flex justify-between items-center  flex-row gap-x-5 my-10">
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
                                        <a target="_blank" href={getWhatsappLink(settings.whatsapp,settings[getLocalized()])}>
                                            <FaWhatsapp size={22} className={'text-gray-400'}/>
                                        </a>
                                    </div>
                                </div>

                                {/* Contact form */}
                                <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                                    <h3 className="text-lg  text-warm-gray-900">{trans('for_any_inquires_contact_us')}</h3>
                                    <form action="#" method="POST" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                                        <div>
                                            <label htmlFor="first-name" className="block text-sm  text-warm-gray-900">
                                                {trans('first_name')}
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="last-name" className="block text-sm  text-warm-gray-900">
                                                {trans('last_name')}
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm  text-warm-gray-900">
                                                {trans('email')}
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between">
                                                <label htmlFor="phone" className="block text-sm  text-warm-gray-900">
                                                    {trans('mobile')}
                                                </label>
                                                <span id="phone-optional" className="text-sm text-warm-gray-500">
                          {trans('optional')}
                        </span>
                                            </div>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    autoComplete="tel"
                                                    className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                                                    aria-describedby="phone-optional"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <label htmlFor="subject" className="block text-sm  text-warm-gray-900">
                                                {trans('subject')}
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    id="subject"
                                                    className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                            <label htmlFor="subject" className="block text-sm  text-warm-gray-900">
                                                {trans('write_protection_code')} - ({code})
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    id="subject"
                                                    placeholder={trans('write_protection_code')}
                                                    className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <div className="flex justify-between">
                                                <label htmlFor="message" className="block text-sm  text-warm-gray-900">
                                                    {trans('content')}
                                                </label>
                                                <span id="message-max" className="text-sm text-warm-gray-500">
                                              {trans('max_1000_characters')}
                                            </span>
                                            </div>
                                            <div className="mt-1">
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border border-warm-gray-300 rounded-md"
                            aria-describedby="message-max"
                            defaultValue={''}
                        />
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
                </section>

        </FrontendContainer>
    )
}
