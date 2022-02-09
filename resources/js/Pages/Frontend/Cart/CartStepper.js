/* This example requires Tailwind CSS v2.0+ */

import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {Link} from "@inertiajs/inertia-react";
import route from 'ziggy-js';

export default function ({ activeStep = 1}) {
    const { trans, classNames, mainColor , mainBgColor  } = useContext(AppContext);
    const steps = [
        { id: 1, label : trans('page'), name: trans('cart'), href: route('frontend.cart.index'), status: 'upcoming' },
        { id: 2, label : trans('page'), name: trans('information'), href: '#', status: 'current' },
        { id: 3, label : trans('page'), name: trans('confirm_information'), href: '#', status: 'current' },
        { id: 4, label : trans('page'), name: trans('payment_process'), href: '#', status: 'upcoming' },
    ];

    return (
        <nav aria-label="Progress">
            <ol role="list" className="p-8 md:flex md:space-y-0 md:gap-x-8 hidden md:block">
                {steps.map((step) => (
                    <li key={step.name} className={classNames(step.id <= activeStep ? `border-${mainColor}-800 dark:border-${mainColor}-100` : `border-${mainColor}-600 dark:border-${mainColor}-200`,"flex flex-1 items-center justify-center border-t-4")}>
                        <Link
                            href={step.href}
                            className="pl-4 py-2 flex flex-1  flex-col items-center justify-center  md:pl-0 md:pt-4 md:pb-0"
                        >
                            <span className={`text-xs text-${mainColor}-50 dark:text-${mainColor}-600 font-bold flex items-center justify-center bg-${mainBgColor}-600 dark:bg-${mainBgColor}-200 rounded-full h-10 w-10 uppercase`}>{`${step.id}`}</span>
                            <span className={`text-sm font-medium mt-5 text-${mainColor}-600 dark:text-${mainColor}-800`}>{step.name}</span>
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
