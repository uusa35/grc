import {createContext, useContext, useEffect, useState} from 'react';
import SideBar from "../components/partials/SideBar";
import GlobalContext from "./GlobalContext";

const BackendContext = createContext({});


const BackendContextProvider = ({children}) => {
    const {locale, translations } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isRTL, setIsRtl] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(false);

    useEffect(() => {
        setIsRtl(locale === 'ar' ? true : false);
    }, [locale]);

    const context = {
        isLoading,
        sideBarOpen,
        disableLoading: () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        },
        enableLoading: () => setIsLoading(true),
        toggleSideBar: () => setSideBarOpen(!sideBarOpen),
        enableRtl: () => setIsRtl(true),
        disableRtl: () => setIsRtl(false),
        trans : (name) =>  translations[locale][name],
        dir: locale === 'ar' ? 'rtl' : 'ltr'
    };
    return (
        <BackendContext.Provider value={context}>
            {children}
        </BackendContext.Provider>
    );
};
// function getDir(state) {
//     return state.i18n.locale === 'ar' ? 'rtl' : 'ltr';
// }
export {BackendContextProvider, BackendContext};
