import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import GlobalContext from "./GlobalContext";
import {split, first, map, isEmpty, isNull, filter } from 'lodash';
import Ziggy from 'ziggy-js';
import {Inertia} from "@inertiajs/inertia";
import route from "ziggy-js";
import {isLocal} from "../helpers";
import moment from "moment";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import {GrClose, IoCloseOutline} from "react-icons/all";
import {useSelector, useDispatch} from "react-redux";
import {translations} from './../../Pages/Backend/translations';
import {setAuth, setCurrencies, setSettings, startBootStrapped} from "../redux/actions";
import LoadingView from "../Backend/components/widgets/LoadingView";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
    const { lang , locale , bootStrapped } = useSelector(state => state);
    const localSettings = useSelector(state => state.settings);
    const localCurrencies = useSelector(state => state.currencies);
    const { auth , settings , currencies  } = useContext(GlobalContext);
    const dispatch = useDispatch();

    // const [isLoading, setIsLoading] = useLocalStorage('isLoading',true);
    // const [sideBarOpen, setSideBarOpen] = useLocalStorage('sideBarOpen',false);
    // const [currentRoute, setCurrentRoute] = useLocalStorage('currentRoute',route().current());
    // const [parentModule, setParentModule] = useLocalStorage('parentModule','');
    // const [childModule, setChildModule] = useLocalStorage('childModule','');
    // const [sysMessage, setSysMessage] = useLocalStorage('sysMessage',[])
    // const [isAdminOrAbove, setIsAdminOrAbove] = useState(false);
    // const [isSuper, setIsSuper] = useState(false);
    // const [formTabs, setFormTabs] = useLocalStorage('formTabs',[
    //     {id: 0, name: 'basic_information'},
    //     {id: 1, name: 'additional_information'},
    //     {id: 2, name: 'more_images'},
    // ]);
    // const [modules, setModules] = useState([]);
    // const [currentFormTab, setCurrentFormTab] = useLocalStorage('currentFormTab',first(formTabs));
    // const [showConfirmationModal, setShowConfirmationModal] = useLocalStorage('showConfirmationModal',false);
    // const [confirmationModalMessage, setConfirmationModalMessage] = useLocalStorage('confirmationModalMessage',{});
    // const [confirmationModalResponse, setConfirmationModalResponse] = useLocalStorage('confirmationModalResponse',false);
    // const [modalAction, setModalAction] = useLocalStorage('modalAction',{});
    // const [currentBreadCrumbs, setCurrentBreadCrumbs] = useLocalStorage('currentBreadCrumbs',{})
    // const [sortDesc, setSortDesc] = useLocalStorage('sortDesc',true)
    // const [colName, setColName] = useLocalStorage('colName','id');
    // const [locale, setLocale] = useLocalStorage('locale',document.getElementById('locale').innerHTML);
    // const [currency,setCurrency] = useLocalStorage('currency',currencies ? first(currencies) : {})
    // const [guest, setGuest] = useState(true)

    const options = {
        // onOpen: props => console.log(props.foo),
        // onClose: props => console.log(props.foo),
        autoClose: 6000,
        closeButton: IoCloseOutline,
        type: toast.TYPE.INFO,
        hideProgressBar: false,
        position: locale == 'ar' ? toast.POSITION.TOP_RIGHT : toast.POSITION.TOP_RIGHT,
        pauseOnHover: true,
        progress: 0.2,
        closeOnClick: true,
        draggable: true,
    };

    // const handleSort = (colName) => {
    //     setColName(colName)
    //     setSortDesc(!sortDesc)
    // }
    const context = {
    //     locale,
    //     setLocale,
    //     isLoading,
    //     sideBarOpen,
    //     sortDesc,
    //     setSortDesc,
    //     colName,
    //     setColName,
    //     handleSort: (colName) => handleSort(colName),
    //     toggleIsLoading: (loading) => setIsLoading(loading),
    //     toggleSideBar: () => setSideBarOpen(!sideBarOpen),
        trans: (name) => translations[lang][name],
        classNames: (...classes) => classes.filter(Boolean).join(' '),
    //     setSystemMessage: (message) => setSysMessage(message),
    //     setCurrentFormTab: (tab) => setCurrentFormTab(tab),
    //     setCurrency : (currency) => setCurrency(currency),
    //     cart,
    //     currency,
    //     guest,
    //     formTabs,
    //     currentFormTab,
    //     sysMessage,
    //     currentRoute,
    //     currentBreadCrumbs,
    //     setCurrentBreadCrumbs,
    //     setCurrentRoute,
    //     parentModule,
    //     childModule,
    //     theme: settings.theme,
    //     modules,
    //     showConfirmationModal,
    //     setShowConfirmationModal,
    //     setConfirmationModalMessage,
    //     confirmationModalMessage,
    //     confirmationModalResponse,
    //     setConfirmationModalResponse,
    //     modalAction,
    //     setModalAction,
    //     otherLang: locale === 'ar' ? 'en' : 'ar',
    //     dir: locale === 'ar' ? 'rtl' : 'ltr',
    //     isRTL : locale === 'ar' ,
        getLocalized: (element = 'name') => locale === 'ar' ? `${element}_ar` : `${element}_en`,
        getThumb: (element) => `${Ziggy().t.url}/storage/uploads/images/thumbnail/${element}`,
        getLarge: (element) => `${Ziggy().t.url}/storage/uploads/images/thumbnail/${element}`,
        getFileUrl: (element) => `${Ziggy().t.url}/storage/uploads/files/${element}`,
        baseUrl : `${Ziggy().t.url}/`,
        isAdminOrAbove : auth && (auth.role?.is_admin || auth.role?.is_super),
        isSuper : auth && auth.role?.is_super,
    //     setParentModule: (module) => setParentModule(module),
    //     setChildModule: (module) => setChildModule(module),
    //     handleDeleteItem: (type, model, id) => {
    //         setShowConfirmationModal(true)
    //         setModalAction({
    //             type,
    //             model,
    //             id
    //         })
    //     }
    };

    // useEffect(() => {
    //     if (auth && isEmpty(modules)) {
    //         const filteredModules = map(auth.role.privileges, p => {
    //             return {
    //                 name: p.name_en,
    //                 index: p.index,
    //                 main_menu: p.main_menu,
    //                 image: p.image
    //             }
    //         });
    //         setModules(filteredModules);
    //         setIsAdminOrAbove(auth?.role.is_admin || auth?.role.is_super);
    //         setIsSuper(auth?.role.is_super);
    //         setGuest(false);
    //     } else {
    //         setIsSuper(false);
    //         setIsAdminOrAbove(false);
    //         setGuest(true);
    //         setModules([])
    //     }
    // }, [auth?.role, auth?.role.privileges]);

    useMemo(() => {
        document.getElementById('lang').innerHTML = lang;
        moment.locale(lang);
    }, [lang])

    useEffect(() => {
            isLocal() && console.log('useEffect starts here =====>')
            // setIsLoading(true);
    },[route().current()])

    useEffect(() => {
        Inertia.on('before', (e) => {
            isLocal() && console.log('before ==>')
        })
        Inertia.on('start', (e) => {
            isLocal() && console.log('start ==>')
        })
        Inertia.on('finish', (e) => {
            isLocal() && console.log('finish ==>')
        });
        Inertia.on('navigate', (e) => {
            isLocal() && console.log('navigate ==>')
            // const currentRoute = route().current();
            // const breadCrumbs = split(currentRoute, '.');
            // isLocal() && console.log('befre Module', breadCrumbs[1])
            // setParentModule(breadCrumbs[1]);
            // setCurrentBreadCrumbs(breadCrumbs);
            // setCurrentRoute(currentRoute)
        })
        toast.configure(options)
    }, [])

    // isLocal() && console.log('parentModule', parentModule);

    // useMemo(() => {
        // if(bootStrapped && navigator.onLine) {
            // dispatch(startBootStrapped())
        // }
    // },[]);

    useMemo(() => {
        isEmpty(localSettings) ? dispatch(setSettings(settings)) : null;
        isEmpty(localCurrencies) ? dispatch(setCurrencies(currencies)) : null;
        isEmpty(auth) ? dispatch(setAuth(auth)) : null;
    },[])

    useEffect(() => {
        dispatch(setAuth(auth));
    }, [auth, auth.favoritesList])



    return (
        <AppContext.Provider value={context}>
            {navigator.onLine ? children : <LoadingView />}
            <ToastContainer
                rtl={locale.isRTL}
                closeButton={<GrClose color={'white'}/>}
                className={locale.isRTL ? 'font-bein font-extrabold w-full ' : 'font-tajwal-medium font-extrabold w-full'} bodyClassName={locale === 'ar' ? 'font-bein font-extrabold w-full ' : 'font-tajwal-medium font-extrabold w-full text-left'}/>
        </AppContext.Provider>
    );
};

export {AppContext, AppContextProvider};
