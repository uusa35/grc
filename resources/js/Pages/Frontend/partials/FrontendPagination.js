/* This example requires Tailwind CSS v2.0+ */
import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon, SearchIcon} from '@heroicons/react/solid'
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {Link} from '@inertiajs/inertia-react'
import route from 'ziggy-js';
import {isEmpty, map} from 'lodash';

export default function FrontendPagination({type, total, links, showSearch = false}) {
    const [search, setSearch] = useState('');
    const {classNames } = useContext(AppContext)

    return (
        <nav
            className="grid grid-cols-1 sm:grid-cols-1 flex justify-between items-center  bg-transparent sm:px-0">
            <div className="col-span-full sm:col-span-1 flex justify-end mt-5 sm:mt-0">
                {
                    !isEmpty(links) && total > 0 && <div className="md:-mt-px md:flex">
                        {
                            map(links, page =>
                                <Link
                                    key={page.label}
                                    href={route().has(`frontend.${type}.index`) && page.url ? page.url : '#'}
                                    className={classNames(page.active ? `border-gray-700 border-t-2` : '', `border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center font-medium`)}
                                >
                                    {page.label}
                                </Link>
                            )
                        }
                    </div>
                }
            </div>
        </nav>
    )
}
