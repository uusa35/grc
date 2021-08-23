import React from 'react'
import {render} from 'react-dom'
import {createInertiaApp} from '@inertiajs/inertia-react'
import GlobalContext from "./Pages/context/GlobalContext";
import {AppContextProvider} from "./Pages/context/AppContext";
import {translations} from './Pages/Backend/translations';
import 'swiper/swiper-bundle.min.css';
import 'swiper/components/pagination/pagination.min.css';
import useLocalStorage from "./Pages/hooks/useLocalStorage";

createInertiaApp({
    resolve: name => require(`./Pages/${name}`),
    setup({el, App, props}) {
        const {settings, auth, currencies, categories  } = props.initialPage.props;
        const {component, url} = props.initialPage;
        return render(
            <GlobalContext.Provider value={{translations, auth, settings, currencies,categories}}>
                <AppContextProvider>
                    <App {...props} />
                </AppContextProvider>
            </GlobalContext.Provider>
            , el)
    },
    title: title => `${title} - E-Commerce`,
});
