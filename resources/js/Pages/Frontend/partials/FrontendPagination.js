/* This example requires Tailwind CSS v2.0+ */
import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon, SearchIcon} from '@heroicons/react/solid'
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {Link} from '@inertiajs/inertia-react'
import route from 'ziggy-js';
import {isEmpty, map} from 'lodash';

export default function FrontendPagination({type, total, links, showSearch = false, lastPage = 0}) {
    const [search, setSearch] = useState('');
    const {classNames, mainColor, contentBgColor   } = useContext(AppContext)
    return (
        <nav
            className={classNames(lastPage === 1 ? `hidden` : `` , `grid grid-cols-1 sm:grid-cols-1 flex justify-between items-center  bg-transparent sm:px-0`)}>
            <div className={` ${contentBgColor} col-span-full sm:col-span-1 flex justify-end mt-5 sm:mt-0`}>
                {
                    !isEmpty(links) && total > 0 && <div className="md:-mt-px md:flex">
                        {
                            map(links, page =>
                                <Link
                                    key={page.label}
                                    href={route().has(`frontend.${type}.index`) && page.url ? page.url : '#'}
                                    className={classNames(page.active ? `text-${mainColor}-800 dark:text-${mainColor}-200 border-t-2` : '', `border-transparent text-${mainColor}-600 dark:text-${mainColor}-100 hover:text-${mainColor}-900 hover:dark:text-${mainColor}-400 border-t-2 pt-4 px-4 inline-flex items-center font-medium`)}
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
