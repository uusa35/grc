import {useContext, useEffect, useMemo, useState} from "react";
import {BackendContext} from "../../context/BackendContext";
import {Inertia} from "@inertiajs/inertia";
import {isArray, isEmpty, map, first, split, isObject} from 'lodash';
import {usePage} from '@inertiajs/inertia-react'
import GlobalContext from "../../context/GlobalContext";
import {Transition} from '@tailwindui/react'


const SystemMessage = () => {
    const {sysMessage, trans, setSystemMessage, theme, classNames} = useContext(BackendContext);
    const [alertColor, setAlertColor] = useState(theme);

    useMemo(() => {
        switch (sysMessage?.type) {
            case sysMessage.type === 'success':
                return setAlertColor('green');
            case sysMessage.type === 'error':
                return setAlertColor('red');
            case sysMessage.type === 'warning':
                return setAlertColor('yellow');
        }
    }, [sysMessage])

    const { errors, error, success} = usePage().props;

    useEffect(() => {
        success && !isEmpty(success) ? setSystemMessage({message: success, type: 'success'}) : null;
        errors && !isEmpty(errors) ? setSystemMessage({message: first(map(errors, e => e)), type: 'error'}) : null;
        error && !isEmpty(error) ? setSystemMessage({message: error, type: 'error'}) : null;
        setTimeout(() => setSystemMessage({message: '', type: ''}), 3000)
    }, [success, errors, error])

    return (
        <transition
            enter-active-class="transition-opacity duration-75"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition-opacity duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-show="isShowing">
                <div
                    className={classNames(!isEmpty(sysMessage.message) ? 'transform translate-x-40 scale-140' : '', `absolute top-10 left-0 w-1/2 transform transition-transform ease-in-out duration-1000 delay-200 font-extrabold`)}>
                    {sysMessage.message && <div className="flex justify-center items-center w-full">
                        <div
                            className={`bg-gray-50 border-l-4 border-gray-800 p-4 sm:w-full lg:w-3/4 m-auto my-2 shadow-lg rounded-md m-10`}>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className={`h-9 w-9 m-3" xmlns="http://www.w3.org/2000/svg`}
                                         viewBox="0 0 20 20"
                                         fill={alertColor} aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="mb-3 font-extrabold text-lgn">{trans(sysMessage.type)}</h3>
                                    <p className={`text-sm text-${alertColor}-700`}>
                                        {
                                            sysMessage && isArray(sysMessage.message) ? (
                                                <ul>
                                                    {map(sysMessage.message, m => <li>{m}</li>)}
                                                </ul>
                                            ) : sysMessage.message
                                        }

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </transition>
    );
}
export default SystemMessage;
