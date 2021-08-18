import {Popover, Transition} from "@headlessui/react";
import {Fragment, useContext} from "react";
import {filter, map, take} from "lodash";
import {Link} from "@inertiajs/inertia-react";
import route from "ziggy-js";
import {AppContext} from "../../../context/AppContext";
import GlobalContext from "../../../context/GlobalContext";

export default function MainNavBookCategoriesList() {
    const { classNames , trans , getThumb , getLocalized } = useContext(AppContext)
    const { categories } = useContext(GlobalContext);
    return (
        <Popover className="flex">
            {({open}) => (
                <>
                    <div className="relative flex">
                        <Popover.Button
                            className={classNames(
                                open
                                    ? 'border-gray-600 text-gray-600'
                                    : 'border-transparent  hover:text-gray-300',
                                'relative z-10 flex items-center transition-colors ease-out duration-200  border-b-2 -mb-px pt-px'
                            )}
                        >
                            {trans('book_categories')}
                        </Popover.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Popover.Panel
                            className="absolute top-full inset-x-0  text-gray-500 z-50">
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div className="absolute inset-0 top-1/2 bg-white shadow"
                                 aria-hidden="true"/>

                            <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                    <div
                                        className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                        {/* categories with iamges */}
                                        <div
                                            className="col-start-2 grid grid-cols-2 gap-x-8">
                                            {/*  featured parents */}
                                            {map(take(filter(categories, c => c.is_book && c.is_featured), 2),c => (
                                                <div key={c[getLocalized()]}
                                                     className="group relative text-base sm:">
                                                    <div
                                                        className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                        <img
                                                            src={getThumb(c.image)}
                                                            alt={c[getLocalized()]}
                                                            className="object-center object-cover"
                                                        />
                                                    </div>
                                                    <Link href={route('frontend.book.index', { category_id : c.id})}
                                                          className="mt-6 block text-gray-900">
                                                                                    <span
                                                                                        className="absolute z-10 inset-0"
                                                                                        aria-hidden="true"/>
                                                        {c[getLocalized()]}
                                                    </Link>
                                                    <p aria-hidden="true" className="mt-1 truncate">
                                                        {c[getLocalized('caption')]}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                        {/* categories columns */}
                                        <div
                                            className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 ">
                                            {map(filter(categories, c => c.is_book), parent => (
                                                <div key={parent[getLocalized()]}>
                                                    <Link id={`${parent.id}-heading`}
                                                          href={route('frontend.book.index', { category_id : parent.id})}
                                                          className="text-gray-900 truncate">
                                                        {parent[getLocalized()]}
                                                    </Link>
                                                    <ul
                                                        role="list"
                                                        aria-labelledby={`${parent.id}-heading`}
                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                    >
                                                        {
                                                            map(filter(parent.children, c => c.is_book), child => (
                                                                <li key={child.id}
                                                                    className="flex">
                                                                    <Link href={route('frontend.book.index', { category_id : child.id})}
                                                                          className="hover:text-gray-300 truncate">
                                                                        {child[getLocalized()]}
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
