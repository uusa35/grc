import {useContext} from "react";
import {BackendContext} from "../../../context/BackendContext";
import { isEmpty } from 'lodash';

export default function ImagesList({images}) {
    const { theme , trans, getImageThumb } = useContext(BackendContext);
    const { setModalAction, setShowConfirmationModal } = useContext(BackendContext);
    return (
        <>

            { !isEmpty(images) && images ? <ul role="list"
                 className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {images.map((img) => (
                    <li key={img.id} className="relative">
                        <div
                            className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                            <img src={getImageThumb(img.image)} alt=""
                                 className="object-cover pointer-events-none group-hover:opacity-75"/>
                            <button
                                onClick={() => {
                                    setShowConfirmationModal(true)
                                    setModalAction({ type : 'destroy', model : 'image', id : img.id})
                                }}
                                type="button"
                                className="absolute inset-0 focus:outline-none">
                                {/*<span className="sr-only">View details for {img.title}</span>*/}
                                <span
                                    className={'rounded-lg inline-flex p-3 ring-1 ring-red-900 text-red-900'}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </span>
                            </button>
                        </div>
                        {/*<p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{img.title}</p>*/}
                        {/*<p className="block text-sm font-medium text-gray-500 pointer-events-none">{img.size}</p>*/}
                    </li>
                ))}
            </ul>
                : <div
                    className={`bg-gray-50 border-l-4 border-gray-800 p-4 sm:w-full lg:w-3/4 m-auto my-2 shadow-lg rounded-md m-10`}>
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className={`h-9 w-9 m-3 text-gray-400" xmlns="http://www.w3.org/2000/svg`}
                                 viewBox="0 0 20 20"
                                 fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                      clipRule="evenodd"/>
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="mb-3 font-extrabold text-lgn">{trans('alert')}</h3>
                            <p className={`text-sm text-gray-700`}>
                                {trans('no_elements')}
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
