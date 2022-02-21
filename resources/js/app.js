import {lazy, Suspense} from 'react';
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import GlobalContext from "./Pages/context/GlobalContext";
import {AppContextProvider} from "./Pages/context/AppContext";
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './Pages/redux/store';
import LoadingView from "./Pages/Backend/components/widgets/LoadingView";
import 'react-toastify/dist/ReactToastify.css';


createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {settings, auth, currencies, categories} = props.initialPage.props;
        return render(
            <GlobalContext.Provider value={{auth, settings, currencies, categories}}>
                <Provider store={store}>
                    <PersistGate loading={<LoadingView/>}
                                 persistor={persistor}
                        // onBeforeLift={() => new Promise(resolve =>
                        //     setTimeout(resolve, 500))}
                    >
                        <Suspense fallback={<LoadingView/>}>
                            <AppContextProvider>
                                <App {...props} />
                            </AppContextProvider>
                        </Suspense>
                    </PersistGate>
                </Provider>
            </GlobalContext.Provider>
            , el)
    }
});
