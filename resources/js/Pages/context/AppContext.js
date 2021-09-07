import {createContext, useContext, useEffect, useMemo} from 'react';
import GlobalContext from "./GlobalContext";
import {split, map, isEmpty} from 'lodash';
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
import {translations} from './../../Pages/translations';
import {
    prepareCart,
    setBreadCrumbs,
    setModules,
    setParentModule, showToastMessage,
    startBootStrapped
} from "../redux/actions";
import LoadingView from "../Backend/components/widgets/LoadingView";
import ConfirmationModal from "../Backend/components/partials/ConfirmationModal";
import {capitalize} from "lodash/string";
import Echo from 'laravel-echo'
import Pusher from "pusher-js";

const AppContext = createContext({});

const AppContextProvider = ({children}) => {
    const {lang, locale, bootStrapped, confirmationModal, toastMessage, cart } = useSelector(state => state);
    const {auth, settings, currencies} = useContext(GlobalContext);

    const dispatch = useDispatch();
    // const pusher = new Pusher('c7ae6371d15e9b381173');
    // window.Echo = new Echo({
    //     broadcaster: 'pusher',
    //     key: 'c7ae6371d15e9b381173',
    //     cluster: 'mt1',
    //     forceTLS: true,
    //     client: pusher
    // });
    // pusher.subscribe(`order.paid.${auth?.id}`).bind(`order.paid`, ({ message }) => {
    //     return dispatch(showToastMessage({ message }))
    // });


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

    const context = {
        trans: (name) => translations[lang][name],
        classNames: (...classes) => classes.filter(Boolean).join(' '),
        getLocalized: (element = 'name') => lang === 'ar' ? `${element}_ar` : `${element}_en`,
        getThumb: (element) => `${Ziggy().t.url}/storage/uploads/images/thumbnail/${element}`,
        getMedium: (element) => `${Ziggy().t.url}/storage/uploads/images/medium/${element}`,
        getLarge: (element) => `${Ziggy().t.url}/storage/uploads/images/large/${element}`,
        getFileUrl: (element) => `${Ziggy().t.url}/storage/uploads/files/${element}`,
        baseUrl: `${Ziggy().t.url}/`,
        isAdminOrAbove: !isEmpty(auth) && (auth.role?.is_admin || auth.role?.is_super),
        isSuper: !isEmpty(auth) && auth.role?.is_super,
        isAuthor: !isEmpty(auth) && auth.role?.is_author,
        guest: isEmpty(auth),
        arFont: 'font-almarai',
        enFont: 'font-tajwal-medium'
    };

    useMemo(() => {
        document.getElementById('lang').innerHTML = lang;
        moment.locale(lang);
    }, [lang])

    useEffect(() => {
        isLocal() && console.log('useEffect starts here =====>')
        Inertia.on('navigate', (e) => {
            isLocal() && console.log('navigate ==>')
            const currentRoute = route().current();
            console.log('currentRoute ====!!!!', currentRoute);
            const breadCrumbs = split(currentRoute, '.');
            isLocal() && console.log('befre Module', breadCrumbs[1])
            isLocal() && console.log('bread', breadCrumbs);
            dispatch(setBreadCrumbs(breadCrumbs))
            dispatch(setParentModule(breadCrumbs[1]));
        })
    }, [route().current()])

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
        toast.configure(options)
        dispatch(prepareCart({
            multiCartMerchant:  settings.multi_cart_merchant ,
            applyGlobalShipment : settings.apply_global_shipment,
            currentShipmentCountry : auth?.country || isEmpty(cart.currentShipmentCountry) ? auth.country : cart.currentShipmentCountry
        }))
    }, [])

    useMemo(() => {
        if (!bootStrapped && navigator.onLine) {
            dispatch(startBootStrapped({settings, currencies}))
        }
        if (!isEmpty(auth && auth.role?.privileges)) {
            const filteredModules = map(auth.role.privileges, p => {
                return {
                    name: p.name_en,
                    index: p.index,
                    create: p.create,
                    main_menu: p.main_menu,
                    on_top: p.on_top,
                    hide_module: p.hide_module,
                    image: p.image
                }
            });
            dispatch(setModules(filteredModules));
        }
    }, [])

    return (
        <AppContext.Provider value={context}>
            {navigator.onLine ? children : <LoadingView/>}
            <ToastContainer
                rtl={locale.isRTL}
                closeButton={() => <GrClose color={'white'}/>}
                className={locale.isRTL ? 'font-bbc  font-extrabold w-full ' : 'font-tajwal-medium font-extrabold w-full'}
                bodyClassName={locale.isRTL ? 'font-bbc font-extrabold w-full ' : 'font-tajwal-medium font-extrabold w-full text-left'}
                closeOnClick={true}
                pauseOnHover={true}
                type={toast.TYPE[capitalize(toastMessage.type)]}
                position={toast.POSITION[locale.isRTL ? 'TOP_LEFT' : 'TOP_RIGHT']}
            />
            {confirmationModal.display && <ConfirmationModal/>}
        </AppContext.Provider>
    );
};

export {AppContext, AppContextProvider};
