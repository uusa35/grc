import {createContext, useContext, useEffect, useState} from 'react';
import SideBar from "../components/partials/SideBar";
import GlobalContext from "./GlobalContext";
import { Inertia } from '@inertiajs/inertia'
const BackendContext = createContext({});


const BackendContextProvider = ({children}) => {
    const {locale, translations } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isRTL, setIsRtl] = useState(locale === 'ar');
    const [sideBarOpen, setSideBarOpen] = useState(false);

    const context = {
        isLoading,
        sideBarOpen,
        disableLoading: () => setIsLoading(false),
        enableLoading: () => setIsLoading(true),
        toggleSideBar: () => setSideBarOpen(!sideBarOpen),
        enableRtl: () => setIsRtl(true),
        disableRtl: () => setIsRtl(false),
        trans : (name) =>  translations[locale][name],
        classNames : (...classes) => classes.filter(Boolean).join(' '),
        otherLang : locale === 'ar' ? 'en' : 'ar',
        dir: locale === 'ar' ? 'rtl' : 'ltr',
        isRTL
    };

    return (
        <BackendContext.Provider value={context}>
            {children}
        </BackendContext.Provider>
    );
};

export {BackendContextProvider, BackendContext};
