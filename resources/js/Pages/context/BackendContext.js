import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import GlobalContext from "./GlobalContext";
import {Inertia} from '@inertiajs/inertia'
import {split, first, filter, map} from 'lodash';

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
    ]);

    const [modules,setModules] = useState([
        { id : 0, name: 'product', },
        { id: 1 , name: 'service'},
        { id: 1 , name: 'book'},
        { id: 1 , name: 'service'},
        { id: 1 , name: 'category'},
        { id: 1 , name: 'country'},
        { id: 1 , name: 'governate'},
        { id: 1 , name: 'address'},
    ]);
    const [currentFormTab,setCurrentFormTab] = useState(first(formTabs));

    useEffect(() => {
        Inertia.on('start', (event) => {
            console.log(`Starting a visit to ${event.detail.visit.url}`)
            setCurrentRoute(split(event.detail.visit.url,'.test')[1]);
            setSysMessage([]);
        })
    }, []);

    useMemo(() => {
        const route = split(currentRoute, '/backend/')
        const secondSplit = split(route[1], '/')
        const url = filter(secondSplit, p => p.length > 1);
        setCurrentModule(url[0] ? url[0] : 'home');
    }, [currentRoute])

    console.log('currentModule', currentModule);

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
        theme : settings.theme
    };

    return (
        <BackendContext.Provider value={context}>
            {children}
        </BackendContext.Provider>
    );
};

export {BackendContextProvider, BackendContext};
