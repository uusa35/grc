import {Fragment, useContext} from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CheckIcon,
    CursorClickIcon,
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    RefreshIcon,
    ShieldCheckIcon,
    SupportIcon,
    ViewGridIcon,
    XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import {AppContext} from "../../context/AppContext";
import FrontendContainer from "../components/FrontendContainer";
import {useDispatch, useSelector} from "react-redux";
import { map } from 'lodash'
import EmbeddedHtml from "../../Backend/components/widgets/EmbeddedHtml";
import {getConvertedFinalPrice} from "../../helpers";

export default function SubscriptionsPage({ elements }) {
    const { trans , getLocalized, getThumb , classNames } = useContext(AppContext)
    const { settings, currency  } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <FrontendContainer>

            <div className="bg-white relative overflow-hidden">
                {/* Decorative background image and gradient */}
                <div aria-hidden="true" className="absolute inset-0">
                    <div className="absolute inset-0  overflow-hidden">
                        <img
                            src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
                            alt=""
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-white bg-opacity-75" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
                </div>

                {/* Callout */}
                <section
                    aria-labelledby="sale-heading"
                    className="relative  flex flex-col items-center text-center"
                >
                    <div className="w-full">
                        <h2
                            id="sale-heading"
                            className="text-4xl mt-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                        >
                            {trans('subscriptions')}
                        </h2>
                        <p className="mt-4 max-w-xl mx-auto text-xl text-gray-600">
                            {settings[getLocalized()]}
                        </p>
                        <div
                            className="mt-6 inline-block w-full bg-gray-400 border border-transparent rounded-sm py-3 px-8 font-medium text-white  sm:w-auto"
                        >
                            {settings[getLocalized('caption')]}
                        </div>
                    </div>
                </section>
                <section
                    aria-labelledby="testimonial-heading"
                    className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
                >
                    {/* Tiers */}
                    <div className="max-w-2xl mx-auto px-4 space-y-6 sm:px-6 lg:max-w-7xl lg:space-y-0 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                        {map(elements, element => (
                            <div
                                key={element[getLocalized()]}
                                className="relative p-5 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
                            >
                                <div className="flex-1">
                                    <h3 className="text-xl font-extrabold text-gray-900">{element[getLocalized()]}</h3>
                                    {element.is_featured ? (
                                        <p className="absolute top-0 py-1.5 px-4 bg-red-900 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
                                            Most popular
                                        </p>
                                    ) : null}
                                    <p className="mt-4 flex justify-between items-baseline text-gray-900">
                                        <span className="text-2xl font-extrabold tracking-tight">{element.price} <span className="text-lg">{currency[getLocalized('currency_symbol')]}</span></span>
                                        {
                                            !currency.country.is_local && <span className="text-2xl font-extrabold tracking-tight">
                                                {getConvertedFinalPrice(element.price, currency.exchange_rate)} <span className="text-lg">{currency[getLocalized('currency_symbol')]}</span>
                                            </span>
                                        }
                                    </p>
                                    <EmbeddedHtml html={element[getLocalized('description')]} />
                                </div>

                                <button
                                    // onClick={() => dispatch()}
                                    style={{ background : element.code}}
                                    className="hover:opacity-60 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium"
                                >
                                    {element[getLocalized()]}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </FrontendContainer>
    )
}
