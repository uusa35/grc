import {useContext} from "react";
import {AppContext} from "../../../context/AppContext";
import {useSelector} from "react-redux";

export default function ElementTags({onNew = false , onSale = false , exclusive = false, free = false, showFavoriteIcon  = true}) {
    const {classNames, trans} = useContext(AppContext)
    const { locale } = useSelector(state => state)

    return (
        <div className="relative opacity-80 z-40">
            <div
                className={classNames(locale.isRTL ? `` : ``, 'absolute top-8 ltr:ml-5 rtl:mr-5 flex flex-col text-white text-sm')}>
                {
                    onSale && !free ? <span
                        className="inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm  bg-red-900 mb-3 ">
                        {trans('on_sale')}
                      </span> : null
                }
                {
                    onNew ? <span
                        className="inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm bg-hippie-blue-800 mb-3">
                    {trans('on_new')}
                        </span> : null
                }
                {
                    exclusive ? <span
                        className="inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm bg-hippie-blue-600 mb-3">
                    {trans('exclusive')}
                        </span> : null
                }
                {
                    free ? <span
                        className="inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm bg-hippie-blue-400 mb-3">
                    {trans('free')}
                        </span> : null
                }
            </div>
            {
                showFavoriteIcon ? <div
                    className={classNames(locale.isRTL ? `left-2` : `right-2`, 'absolute top-8 flex flex-col  gap-y-3 text-white text-sm bg-white rounded-full w-10 h-10 justify-center items-center opacity-80')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeWidth="round" strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                </div>  : null
            }
        </div>
    );
}
