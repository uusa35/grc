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
        modalAction,
        classNames,
        theme,
    } = useContext(BackendContext);
    const {data, submit, setData, delete: destroy} = useForm({
        id: ''
    })
    const cancelButtonRef = useRef(null)

    const handleCancel = () => {
        setShowConfirmationModal(false)
        setConfirmationModalResponse(false)
    }

    const handleConfirm = () => {
        setShowConfirmationModal(false)
        setConfirmationModalResponse(true)
        if (modalAction.type === 'destroy' && modalAction.id) {
            return handleDeleteFormSubmit();
        } else {
            // console.log('do another thing');
        }
    }

    const handleDeleteFormSubmit = () => {
        const {id, model, type} = modalAction;
        setData('id', id);
        setShowConfirmationModal(!showConfirmationModal)
        setConfirmationModalResponse(!confirmationModalResponse)
        // Inertia.delete(route(`backend.${model}.${type}`, id))
        return destroy(route(`backend.${model}.${type}`, id));
    }

    useEffect(() => {
        if (modalAction.type && modalAction.model) {
            const {id, model, type} = modalAction;
            setConfirmationModalMessage({title: `${trans(type)} ${trans(model)}`, message: trans('modal_confirmation')})
        }
    }, [modalAction.id])

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
                        <Dialog.Overlay className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}/>
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
                                    className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <Dialog.Title as="h3" className={`text-lg leading-6 font-medium text-gray-900`}>
                                        {confirmationModalMessage.title}
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className={`text-sm text-gray-500`}>
                                            {confirmationModalMessage.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm`}
                                    onClick={() => handleCancel()}
                                    ref={cancelButtonRef}
                                >
                                    {trans('cancel')}
                                </button>
                                <button
                                    type="button"
                                    className={classNames(modalAction.type === 'destroy' ? 'bg-red-800' : `bg-gray-600`, `w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:col-start-2 sm:text-sm`)}
                                    onClick={() => handleConfirm(modalAction.id)}
                                >
                                    {trans('confirm')}
                                </button>
                            </div>
                            {
                                modalAction.type === 'destroy' && modalAction.id &&
                                <form method="post"
                                    // action={`/backend/${modalAction.model}/${modalAction.id}`}
                                      action={route(`backend.${modalAction.model}.${modalAction.type}`, modalAction.id)}
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
