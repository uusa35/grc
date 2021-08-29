import {useContext} from "react";
import {AppContext} from "../../../context/AppContext";
import {useSelector} from "react-redux";

export default function ElementTags({onNew = false , onSale = false , exclusive = false, free = false}) {
    const {classNames, trans} = useContext(AppContext)
    const { locale } = useSelector(state => state)

    return (
        <div className="relative opacity-80 z-40">
            <div
                className={classNames(locale.isRTL ? `` : ``, 'absolute top-8 ltr:ml-5 rtl:mr-5 flex flex-col  gap-y-3 text-white text-sm')}>
                {
                    onSale && <span
                        className="inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm  bg-red-900 ">
                        {trans('on_sale')}
                      </span>
                }
                {
                    onNew && <span
                        className="inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm bg-gray-800 ">
                    {trans('on_new')}
                        </span>
                }
                {
                    exclusive && <span
                        className="inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm bg-gray-600 ">
                    {trans('exclusive')}
                        </span>
                }
                {
                    free && <span
                        className="inline-flex justify-center items-center capitalize shadow-md px-4 py-0.5 rounded-sm bg-gray-400 ">
                    {trans('free')}
                        </span>
                }
            </div>
            <div
                className={classNames(locale.isRTL ? `` : ``, 'absolute bottom-8 right-6 flex flex-col  gap-y-3 text-white text-sm opacity-60 hidden')}>
                <span
                    onClick={() => console.log('clicked')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10  text-white p-2 bg-black  rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                </span>
            </div>
        </div>
    );
}
