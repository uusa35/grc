import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import GlobalContext from "./GlobalContext";
import {split, first, map, isEmpty, isNull} from 'lodash';
import Ziggy from 'ziggy-js';

const AppContext = createContext({});

const AppContextProvider = ({children}) => {
    const {translations, settings, auth, currencies } = useContext(GlobalContext);
    const [isLoading, setIsLoading] = useState(true);
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
    const [modalAction, setModalAction] = useState({});
    const [currentBreadCrumbs, setCurrentBreadCrumbs] = useState({})
    const [sortDesc, setSortDesc] = useState(true)
    const [colName, setColName] = useState('id');
    const [locale, setLocale] = useState(document.getElementById('locale').innerHTML);
    const [currency,setCurrency] = useState(currencies ? first(currencies) : {})


    const handleSort = (colName) => {
        setColName(colName)
        setSortDesc(!sortDesc)
    }
    const context = {
        locale,
        setLocale,
        isLoading,
        sideBarOpen,
        sortDesc,
        setSortDesc,
        colName,
        setColName,
        handleSort: (colName) => handleSort(colName),
        toggleIsLoading: (loading) => setIsLoading(loading),
        toggleSideBar: () => setSideBarOpen(!sideBarOpen),
        trans: (name) => translations[locale][name],
        classNames: (...classes) => classes.filter(Boolean).join(' '),
        setSystemMessage: (message) => setSysMessage(message),
        setCurrentFormTab: (tab) => setCurrentFormTab(tab),
        setCurrency : (currency) => setCurrency(currency),
        currency,
        guest : isNull(auth),
        formTabs,
        currentFormTab,
        sysMessage,
        currentRoute,
        currentBreadCrumbs,
        setCurrentBreadCrumbs,
        setCurrentRoute,
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
        modalAction,
        setModalAction,
        otherLang: locale === 'ar' ? 'en' : 'ar',
        dir: locale === 'ar' ? 'rtl' : 'ltr',
        isRTL : locale === 'ar' ,
        getLocalized: (element = 'name') => locale === 'ar' ? `${element}_ar` : `${element}_en`,
        getThumb: (element) => `${Ziggy().t.url}/storage/uploads/images/thumbnail/${element}`,
        getLarge: (element) => `${Ziggy().t.url}/storage/uploads/images/thumbnail/${element}`,
        getFileUrl: (element) => `${Ziggy().t.url}/storage/uploads/files/${element}`,
        baseUrl : `${Ziggy().t.url}/`,
        isAdminOrAbove,
        isSuper,
        setParentModule: (module) => setParentModule(module),
        setChildModule: (module) => setChildModule(module),
        handleDeleteItem: (type, model, id) => {
            setShowConfirmationModal(true)
            setModalAction({
                type,
                model,
                id
            })
        }
    };

    useEffect(() => {
        if (auth && isEmpty(modules)) {
            const filteredModules = map(auth.role.privileges, p => {
                return {
                    name: p.name_en,
                    index: p.pivot.index,
                    main_menu: p.main_menu,
                    image: p.image
                }
            });
            setModules(filteredModules);
            setIsAdminOrAbove(auth.role.is_admin || auth.role.is_super);
            setIsSuper(auth.role.is_super);
        }
    }, [auth?.id]);

    useMemo(() => {
        document.getElementById('locale').innerHTML = locale;
    }, [locale])


    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
};

export {AppContext, AppContextProvider};
