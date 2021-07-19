import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import {InertiaProgress} from '@inertiajs/progress'
import GlobalContext from "./Pages/context/GlobalContext";
import {BackendContextProvider} from "./Pages/context/BackendContext";
import moment from 'moment';

InertiaProgress.init()

createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {translations, auth, guest, locale, settings, otherLang} = props.initialPage.props;
        const {component, url} = props.initialPage;
        moment.locale(locale);
        console.log('the locale form laravel', locale)
        return render(
            <GlobalContext.Provider value={{translations, auth, guest, locale, settings, otherLang, url, component}}>
                <BackendContextProvider>
                    <App {...props} />
                </BackendContextProvider>
            </GlobalContext.Provider>
            , el)
    },
});
