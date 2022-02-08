import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import GlobalContext from "./Pages/context/GlobalContext";
import {AppContextProvider} from "./Pages/context/AppContext";
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/components/pagination/pagination.min.css';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './Pages/redux/store';
import LoadingView from "./Pages/Backend/components/widgets/LoadingView";
import 'react-toastify/dist/ReactToastify.css';
import './../../node_modules/react-image-gallery/styles/css/image-gallery.css'
// Import Swiper styles
import 'swiper/css';



createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {settings, auth, currencies, categories, translations} = props.initialPage.props;
        return render(
            <GlobalContext.Provider value={{auth, settings, currencies, categories , translations }}>
                <Provider store={store}>
                    <PersistGate loading={<LoadingView/>}
                                 persistor={persistor}
                                 onBeforeLift={() => new Promise(resolve =>
                                     setTimeout(resolve, 1000))}
                    >
                        <AppContextProvider>
                            <App {...props} />
                        </AppContextProvider>
                    </PersistGate>
                </Provider>
            </GlobalContext.Provider>
            , el)
    },
    title: title => `${title} - E-Commerce`,
});
