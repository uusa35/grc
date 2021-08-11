import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import GlobalContext from "./Pages/Backend/context/GlobalContext";
import {BackendContextProvider} from "./Pages/Backend/context/BackendContext";
import {translations} from './Pages/Backend/translations';


createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {guest, settings, auth} = props.initialPage.props;
        const {component, url} = props.initialPage;
        return render(
            <GlobalContext.Provider value={{translations, auth, guest, settings, url, component}}>
                <BackendContextProvider>
                    <App {...props} />
                </BackendContextProvider>
            </GlobalContext.Provider>
            , el)
    },
    title: title => `${title} - E-Commerce`,
});
