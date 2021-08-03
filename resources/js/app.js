import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import {InertiaProgress} from '@inertiajs/progress'
import GlobalContext from "./Pages/Backend/context/GlobalContext";
import {BackendContextProvider} from "./Pages/Backend/context/BackendContext";
import moment from 'moment';
import NProgress from 'nprogress'
import { Inertia } from '@inertiajs/inertia'



createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {translations, guest, settings, auth} = props.initialPage.props;
        const  locale = document.getElementById('locale').innerHTML;
        moment.locale(locale);
        const {component, url} = props.initialPage;
        return render(
            <GlobalContext.Provider value={{translations, auth, guest, locale, settings, url, component}}>
                <BackendContextProvider>
                    <App {...props} />
                </BackendContextProvider>
            </GlobalContext.Provider>
            , el)
    },
});
