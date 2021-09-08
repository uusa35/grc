import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import GlobalContext from "./Pages/context/GlobalContext";
import {AppContextProvider} from "./Pages/context/AppContext";
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/pagination/pagination.min.css';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './Pages/redux/store';
import LoadingView from "./Pages/Backend/components/widgets/LoadingView";
import MetaElement from "./Pages/Backend/components/partials/MetaElement";

createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {settings, auth, currencies, categories} = props.initialPage.props;
        return render(
            <GlobalContext.Provider value={{auth, settings, currencies, categories}}>
                <Provider store={store}>
                    <PersistGate loading={<LoadingView/>} persistor={persistor}>
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
