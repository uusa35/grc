import {useContext, useState} from "react";
import {AppContext} from "../../../context/AppContext";
import {first, filter} from "lodash";
import {setCurrentFormTab} from "../../../redux/actions";
import {useDispatch, useSelector} from "react-redux";

const FormTabsContainer = ({children}) => {
    const {classNames, trans} = useContext(AppContext)
    const {formTabs, currentFormTab} = useSelector(state => state);
    const dispatch = useDispatch()

    return (
        <div className="flex flex-1 flex-col justify-start min-h-screen items-center bg-transparent">
            <div className={`w-full pt-3`}>
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        {trans('select')}
                    </label>
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                        defaultValue={currentFormTab.name}
                        onChange={(e) => dispatch(setCurrentFormTab(first(filter(formTabs, t => t.id == e.target.value))))}
                    >
                        {formTabs.map((tab) => (
                            <option key={tab.id}
                                    value={tab.id}
                            >
                                {tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <div className="border-b border-gray-200 bg-white">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            {formTabs.map((tab) => (
                                <button
                                    type="button"
                                    key={tab.id}
                                    onClick={() => dispatch(setCurrentFormTab(tab))}
                                    className={classNames(
                                        tab.id === currentFormTab.id
                                            ? 'border-green-900 text-green-900 '
                                            : 'border-transparent  text-gray-500 hover:text-gray-800 hover:border-gray-200',
                                        'whitespace-nowrap flex p-4 rounded-t border-b-2 font-medium flex items-center justify-center '
                                    )}
                                    aria-current={tab.name ? 'page' : undefined}
                                >
                                    {trans(tab.name)}
                                    <div
                                        className={classNames(currentFormTab.id === tab.id ? 'bg-green-900' : 'bg-gray-600', 'flex-shrink-0 w-2.5 h-2.5 mx-5 rounded-full')}
                                        aria-hidden="true"></div>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
}

export default FormTabsContainer;
