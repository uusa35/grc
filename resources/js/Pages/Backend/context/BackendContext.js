import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import GlobalContext from "./GlobalContext";
import {split, first, map} from 'lodash';
import route from 'ziggy-js';
import {Inertia} from "@inertiajs/inertia";

const BackendContext = createContext({});

const BackendContextProvider = ({children}) => {
    const {locale, translations, settings, auth} = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isRTL, setIsRtl] = useState(locale === 'ar');
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const [currentRoute, setCurrentRoute] = useState(route().current());
    const [parentModule, setParentModule] = useState('');
    const [childModule, setChildModule] = useState('');
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
    const [sortDesc, setSortDesc] = useState(true)
    const [colName, setColName] = useState('id');


    const handleSort = (colName) => {
        setColName(colName)
        setSortDesc(!sortDesc)
    }
    const context = {
        isLoading,
        sideBarOpen,
        sortDesc,
        setSortDesc,
        colName,
        setColName,
        handleSort : (colName) => handleSort(colName),
        disableLoading: () => setIsLoading(true),
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
        parentModule,
        childModule,
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
        setParentModule: (module) => setParentModule(module),
        setChildModule: (module) => setChildModule(module),
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
        if(auth) {
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
            console.log('doing the module')
        }
    }, [auth.id]);

    useEffect(() => {
        Inertia.on('start', (e) => {
            setIsLoading(true)
        })
        Inertia.on('finish', (e) => {
            const currentRoute = route().current();
            const breadCrumbs = split(currentRoute, '.');
            setParentModule(breadCrumbs[1]);
            setCurrentBreadCrumbs(breadCrumbs);
            setCurrentRoute(currentRoute)
            setIsLoading(false)
        })
    }, [])

    return (
        <BackendContext.Provider value={context}>
            {children}
        </BackendContext.Provider>
    );
};

export {BackendContextProvider, BackendContext};
