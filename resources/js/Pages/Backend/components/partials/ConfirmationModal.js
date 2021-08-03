/* This example requires Tailwind CSS v2.0+ */
import {Fragment, useContext, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {CheckIcon} from '@heroicons/react/outline'
import {BackendContext} from "../../context/BackendContext";
import PropTypes from 'prop-types';
import {useForm} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import route from 'ziggy-js';

export default function ConfirmationModal() {
    const {
        showConfirmationModal,
        setShowConfirmationModal,
        trans,
        confirmationModalMessage,
        setConfirmationModalMessage,
        setConfirmationModalResponse,
        confirmationModalResponse,
        modelAction,
        classNames,
        theme,
        currentModule
    } = useContext(BackendContext);
    const {data, submit, setData, delete: destroy,} = useForm({
        id: ''
    })
    const cancelButtonRef = useRef(null)

    const handleCancel = () => {
        setShowConfirmationModal(false)
        setConfirmationModalResponse(false)
    }

    const handleConfirm = () => {
        console.log('iddddd ==> ',modelAction.id);
        setShowConfirmationModal(false)
        setConfirmationModalResponse(true)
        if (modelAction.type === 'destroy' && modelAction.id) {
            return handleDeleteFormSubmit();
        } else {
            console.log('do another thing');
        }
    }

    const handleDeleteFormSubmit = () => {
        if (modelAction.id && modelAction.type === 'destroy') {
            console.log('submit the form');
            const {id , model, type} = modelAction;
            console.log('the iddddd ===> from handle submit delete', id);
            setData('id', id);
            setShowConfirmationModal(!showConfirmationModal)
            setConfirmationModalResponse(!confirmationModalResponse)
            return destroy( route(`backend.${model}.update`, id ));
            // return submit('delete', route(`backend.${model}.${type}`, { id }));

        }
    }

    useEffect(() => {
        if (modelAction.type && modelAction.model) {
            const {id, model, type} = modelAction;
            setConfirmationModalMessage({title: `${trans(type)} ${trans(model)}`, message: trans('modal_confirmation')})
        }
    }, [modelAction.id])

    return (
        <Transition.Root show={showConfirmationModal} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto font-bein"
                initialFocus={cancelButtonRef}
                open={showConfirmationModal}
                onClose={() => setConfirmationModalMessage({title: '', content: ''})}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className={`fixed inset-0 bg-${theme}-500 bg-opacity-75 transition-opacity`}/>
                    </Transition.Child>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div>
                                <div
                                    className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-${theme}-100`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className={`text-lg leading-6 font-medium text-${theme}-900`}>
                                        {confirmationModalMessage.title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className={`text-sm text-${theme}-500`}>
                                            {confirmationModalMessage.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className={`mt-3 w-full inline-flex justify-center rounded-md border border-${theme}-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-${theme}-700 hover:bg-${theme}-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme}-500 sm:mt-0 sm:col-start-1 sm:text-sm`}
                                    onClick={() => handleCancel()}
                                    ref={cancelButtonRef}
                                >
                                    {trans('cancel')}
                                </button>
                                <button
                                    type="button"
                                    className={classNames(modelAction.type === 'destroy' ? 'bg-red-800' : `bg-${theme}-600`, `w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-${theme}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${theme}-500 sm:col-start-2 sm:text-sm`)}
                                    onClick={() => handleConfirm(modelAction.id)}
                                >
                                    {trans('confirm')}
                                </button>
                            </div>
                            {
                                modelAction.type === 'destroy' && modelAction.id &&
                                <form method="post"
                                    // action={`/backend/${modelAction.model}/${modelAction.id}`}
                                      action={route(`backend.${modelAction.model}.${modelAction.type}`, modelAction.id)}
                                >
                                    <input type="hidden" name="_method" value="delete"/>
                                    <button type="submit" className="btn btn-del hidden"></button>
                                </form>
                            }
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

// ConfirmationModal.propTypes = {
//     confirmationAction: PropTypes.func.isRequired,
// };
