import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import GlobalContext from "./Pages/context/GlobalContext";
import {AppContextProvider} from "./Pages/context/AppContext";
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import {store, persistor} from './Pages/redux/store';
import LoadingView from "./Pages/Backend/components/widgets/LoadingView";
import 'react-toastify/dist/ReactToastify.css';
import {InertiaProgress} from '@inertiajs/progress'

createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {settings, auth, currencies, categories, appName } = props.initialPage.props;
        InertiaProgress.init({
            delay: 0,
            color: '#f92d34',
            includeCSS: true,
            showSpinner: true,
        })
        return render(
            <GlobalContext.Provider value={{auth, settings, currencies, categories, appName }}>
                <Provider store={store}>
                    <PersistGate loading={<LoadingView/>}
                                 persistor={persistor}
                        // onBeforeLift={() => new Promise(resolve =>
                        //     setTimeout(resolve, 2000))}
                    >
                        <AppContextProvider>
                            <App {...props} />
                        </AppContextProvider>
                    </PersistGate>
                </Provider>
            </GlobalContext.Provider>
            , el)
    }
});
