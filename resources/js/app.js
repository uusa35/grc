import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import GlobalContext from "./Pages/context/GlobalContext";
import {AppContextProvider} from "./Pages/context/AppContext";
import {translations} from './Pages/Backend/translations';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/pagination/pagination.min.css';

createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {settings, auth, currencies } = props.initialPage.props;
        const {component, url} = props.initialPage;
        // console.log('currencies', currencies);
        // debugger;
        return render(
            <GlobalContext.Provider value={{translations, auth, settings, url, component, currencies}}>
                <AppContextProvider>
                    <App {...props} />
                </AppContextProvider>
            </GlobalContext.Provider>
            , el)
    },
    metaInfo() {
        return {
            title: "Default App Title",
            meta: [
                { charset: "utf-8" },
                { name: "description", content: "this is description" },
                { name: "keywords", content: "this,is,key,words,data" },
                { name: "viewport", content: "width=device-width, initial-scale=1" },
            ]
        };
    },
    title: title => `${title} - E-Commerce`,
});
