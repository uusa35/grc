import {createContext, useContext, useEffect, useState} from 'react';
import GlobalContext from "./GlobalContext";
import {split, first, map} from 'lodash';
import route from 'ziggy-js';

const BackendContext = createContext({});

const BackendContextProvider = ({children}) => {
    const {locale, translations, settings, auth} = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isRTL, setIsRtl] = useState(locale === 'ar');
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [currentRoute, setCurrentRoute] = useState(route().current());
    const [currentModule, setCurrentModule] = useState('home');
    const [sysMessage, setSysMessage] = useState([])
    const [isAdminOrAbove, setIsAdminOrAbove] = useState(false);
    const [isSuper, setIsSuper] = useState(false);
    const [formTabs, setFormTabs] = useState([
        {id: 0, name: 'basic_information'},
        {id: 1, name: 'additional_information'},
        {id: 2, name: 'more_images'},
    ]);
    const [modules, setModules] = useState([]);
    const [currentFormTab, setCurrentFormTab] = useState(first(formTabs));
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [confirmationModalMessage, setConfirmationModalMessage] = useState({});
    const [confirmationModalResponse, setConfirmationModalResponse] = useState(false);
    const [modelAction, setModelAction] = useState({});
    const [currentBreadCrumbs, setCurrentBreadCrumbs] = useState({})


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
        setCurrentFormTab: (tab) => setCurrentFormTab(tab),
        formTabs,
        currentFormTab,
        sysMessage,
        otherLang: locale === 'ar' ? 'en' : 'ar',
        dir: locale === 'ar' ? 'rtl' : 'ltr',
        isRTL,
        currentRoute,
        currentBreadCrumbs,
        currentModule,
        theme: settings.theme,
        modules,
        showConfirmationModal,
        setShowConfirmationModal,
        setConfirmationModalMessage,
        confirmationModalMessage,
        confirmationModalResponse,
        setConfirmationModalResponse,
        modelAction,
        setModelAction,
        getImageThumb: (img) => `${route('home')}/storage/uploads/images/thumbnail/${img}`,
        isAdminOrAbove,
        isSuper,
        setCurrentModule: (module) => setCurrentModule(module),
        handleDeleteItem: (type, model, id) => {
            setShowConfirmationModal(true)
            setModelAction({
                type,
                model,
                id
            })
        }
    };

    useEffect(() => {
        const filteredModules = map(auth.role.privileges, p => {
            return {
                name: p.name,
                index: p.pivot.index,
                main_menu: p.main_menu,
                description: p.description,
                imageThumb: p.imageThumb
            }
        });
        setModules(filteredModules);
        setIsAdminOrAbove(auth.role.is_admin || auth.role.is_super);
        setIsSuper(auth.role.is_super);
        // Inertia.remember(context,'localeState');
    }, []);


    console.log('current Module', currentModule);
    useEffect(() => {
        const currentRoute = route().current();
        const breadCrumbs = split(currentRoute, '.');
        // setCurrentModule(breadCrumbs[1]);
        setCurrentBreadCrumbs(breadCrumbs);
        setCurrentRoute(currentRoute)
    }, [route().current()])

    return (
        <BackendContext.Provider value={context}>
            {children}
        </BackendContext.Provider>
    );
};

export {BackendContextProvider, BackendContext};
