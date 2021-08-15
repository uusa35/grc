import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import GlobalContext from "./Pages/Backend/context/GlobalContext";
import {BackendContextProvider} from "./Pages/Backend/context/BackendContext";
import {translations} from './Pages/Backend/translations';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/pagination/pagination.min.css';

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
