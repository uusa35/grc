// configureStore.js
import {createStore, applyMiddleware} from 'redux'
import {persistStore, persistReducer} from 'redux-persist'
import rootSaga from './saga/rootSaga';
import createSagaMiddleware from 'redux-saga';
//import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers from './reducers'
import {isLocal} from "../helpers";
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from 'redux-logger';

const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
    blacklist: [
        'formTabs',
        'confirmationModal',
        'sideBarOpen',
        'toastMessage',
        'parentModule',
        // 'cart'
    ],
    debug: isLocal(),
}

const persistedReducer = persistReducer(persistConfig, reducers)
const sagaMiddleware = createSagaMiddleware();

let store;
let persistor;

if (process.env.NODE_ENV === "production") {
    store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
    persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
} else {
    const appLogger = createLogger({
        collapsed: true,
        duration: true,
    });
    const composeEnhancers = composeWithDevTools({realtime: true, port: 8081});
    store = createStore(persistedReducer, composeEnhancers(applyMiddleware(appLogger, sagaMiddleware)));
    persistor = persistStore(store);
    sagaMiddleware.run(rootSaga);
}

export {store, persistor}
