import {useContext, useEffect, useMemo, useState} from "react";
import {BackendContext} from "../../context/BackendContext";
import {Inertia} from "@inertiajs/inertia";
import { isArray ,isEmpty , map, first } from 'lodash';
import { usePage } from '@inertiajs/inertia-react'

const SystemMessage = () => {
    const { sysMessage , trans ,  setSystemMessage, theme } = useContext(BackendContext);
    const [messageType, setMessageType] = useState(sysMessage ? sysMessage.type : 'info');
    const [alertColor, setAlertColor] = useState(theme);

    useMemo(() => {
        switch(messageType) {
            case 'success':
                setAlertColor('green');
            case 'error':
                setAlertColor('red');
            case 'warning':
                setAlertColor('blue');
        }
    },[messageType])
    const { errors } = usePage().props

    useEffect(() => {
        if(!isEmpty(errors)) {
                setSystemMessage({
                    message : errors[0],
                    type : 'error'
                })
        }
    },[errors])

    // Inertia.on('error', (errors) => {
    //     console.log('errors from inertia',errors);
    //     setSystemMessage(setSystemMessage({
    //         message : first(errors.detail.errors),
    //         type : 'error'
    //     }))
    // })

    return (
        <>
            { sysMessage.message && <div className="flex justify-center items-center w-full">
                <div
                    className={`bg-${theme}-50 border-l-4 border-${theme}-800 p-4 sm:w-full lg:w-3/4 m-auto my-2 shadow-lg rounded-md m-10`}>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className={`h-9 w-9 m-3 text-${alertColor}-400" xmlns="http://www.w3.org/2000/svg`}
                                 viewBox="0 0 20 20"
                                 fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="mb-3 font-extrabold text-lgn">{ trans(sysMessage.type) }</h3>
                            <p className={`text-sm text-${theme}-700`}>
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

        </>
    );
}
export default SystemMessage;
