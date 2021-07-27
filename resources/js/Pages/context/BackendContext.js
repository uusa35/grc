import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import GlobalContext from "./GlobalContext";
import {Inertia} from '@inertiajs/inertia'
import {split, first, filter, map} from 'lodash';
import {usePage} from "@inertiajs/inertia-react";

const BackendContext = createContext({});
const BackendContextProvider = ({children}) => {
    const {locale, translations, settings , auth } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isRTL, setIsRtl] = useState(locale === 'ar');
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [currentRoute, setCurrentRoute] = useState(window.location.href);
    const [currentModule, setCurrentModule] = useState('home');
    const [sysMessage , setSysMessage] = useState([])
    const [formTabs,setFormTabs] = useState([
        { id : 0, name: 'basic_information'},
        { id: 1 , name: 'additional_information'},
        { id: 2 , name: 'more_images'},
    ]);
    const [modules,setModules] = useState([]);
    const [currentFormTab,setCurrentFormTab] = useState(first(formTabs));
    const [showConfirmationModal,setShowConfirmationModal] = useState(false);
    const [confirmationModalMessage,setConfirmationModalMessage] = useState({});
    const [confirmationModalResponse, setConfirmationModalResponse] = useState(false);
    const [modelAction,setModelAction] = useState({});

    useEffect(() => {
        Inertia.on('start', (event) => {
            // console.log(`Starting a visit to ${event.detail.visit.url}`)
            setCurrentRoute(split(event.detail.visit.url,'.test')[1]);
            setSysMessage([]);
        })
        const filteredModules = map(auth.role.privileges, p => { return { name : p.name , index : p.pivot.index , main_menu : p.main_menu, description : p.description, imageThumb : p.imageThumb} });
        setModules(filteredModules);
    }, []);

    useMemo(() => {
        const route = split(currentRoute, '/backend/')
        const secondSplit = split(route[1], '/')
        const url = filter(secondSplit, p => p.length > 1);
        setCurrentModule(url[0] ? url[0] : 'home');
    }, [currentRoute])

    const context = {
        isLoading,
        sideBarOpen,
        disableLoading: () => setIsLoading(false),
        enableLoading: () => setIsLoading(true),
        toggleSideBar: () => setSideBarOpen(!sideBarOpen),
        enableRtl: () => setIsRtl(true),
        disableRtl: () => setIsRtl(false),
        trans: (name) => translations[locale][name],
        classNames: (...classes) => classes.filter(Boolean).join(' '),
        setSystemMessage: (message) => setSysMessage(message),
        setCurrentFormTab : (tab) => setCurrentFormTab(tab),
        formTabs,
        currentFormTab,
        sysMessage,
        otherLang: locale === 'ar' ? 'en' : 'ar',
        dir: locale === 'ar' ? 'rtl' : 'ltr',
        isRTL,
        currentRoute,
        currentModule,
        theme : settings.theme,
        modules,
        showConfirmationModal,
        setShowConfirmationModal,
            setConfirmationModalMessage,
        confirmationModalMessage,
        confirmationModalResponse,
        setConfirmationModalResponse,
        modelAction,
        setModelAction
    };

    return (
        <BackendContext.Provider value={context}>
            {children}
        </BackendContext.Provider>
    );
};

export {BackendContextProvider, BackendContext};
