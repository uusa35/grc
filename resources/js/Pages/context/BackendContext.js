import {createContext, useState} from 'react';
import SideBar from "../components/partials/SideBar";

const BackendContext = createContext({});


const BackendContextProvider = ({dir, children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isRTL, setIsRtl] = useState(true);
    const [sideBarOpen, setSideBarOpen] = useState(false);
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
