import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import {InertiaProgress} from '@inertiajs/progress'
import GlobalContext from "./Pages/context/GlobalContext";
import {BackendContextProvider} from "./Pages/context/BackendContext";

InertiaProgress.init()

createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {trans, auth, guest, locale, settings, dir, otherLang} = props.initialPage.props;
        const {component, url} = props.initialPage;
        return render(
            <GlobalContext.Provider value={{trans, auth, guest, locale, settings, dir, otherLang, url, component}}>
                <BackendContextProvider>
                    <App {...props} />
                </BackendContextProvider>
            </GlobalContext.Provider>
            , el)
    },
});
