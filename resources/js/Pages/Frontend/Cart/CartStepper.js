/* This example requires Tailwind CSS v2.0+ */

import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {Link} from "@inertiajs/inertia-react";

export default function ({ activeStep = 1}) {
    const { trans, classNames } = useContext(AppContext);
    const steps = [
        { id: 1, label : trans('page'), name: trans('cart'), href: '#', status: 'upcoming' },
        { id: 2, label : trans('page'), name: trans('information'), href: '#', status: 'current' },
        { id: 3, label : trans('page'), name: trans('confirm_information'), href: '#', status: 'current' },
        { id: 3, label : trans('page'), name: trans('payment_process'), href: '#', status: 'upcoming' },
    ];
    const [currentStep, setCurrentStep] = useState(activeStep);
    return (
        <nav aria-label="Progress">
            <ol role="list" className="p-8 md:flex md:space-y-0 md:gap-x-8 hidden md:block">
                {steps.map((step) => (
                    <li key={step.name} className={classNames(step.id <= activeStep ? `border-gray-600` : `border-gray-100`,"flex flex-1 items-center justify-center border-t-4")}>
                        <Link
                            href={step.href}
                            className="pl-4 py-2 flex flex-1  flex-col items-center justify-center  md:pl-0 md:pt-4 md:pb-0"
                        >
                            <span className="text-xs text-gray-50 font-semibold flex items-center justify-center bg-gray-600 rounded-full h-10 w-10 uppercase">{`${step.id}`}</span>
                            <span className="text-sm font-medium mt-5">{step.name}</span>
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
