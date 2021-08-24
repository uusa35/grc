import {combineReducers} from "redux";
import cart from './cart'
import modules from './modules'
import currencies from './currencies'
import currency from './currency'
import guest from './guest'
import formTabs from './formTabs'
import currentFormTab from './currentFormTab'
import breadCrumbs from './breadCrumbs'
import lang from './lang'
import locale from './locale'
import isLoading from './isLoading'
import modalMessage from './modalMessage'
import toastMessage from './toastMessage'
import sideBarOpen from './sideBarOpen'
import sort from './sort'
import auth from './auth'
import bootStrapped from './bootStrapped'
import isAdminOrAbove from './isAdminOrAbove'
import isSuper from './isSuper'
import isAdmin from './isAdmin'
import settings from './settings'

export default combineReducers({
    cart,
    currencies,
    modules,
    currency,
    guest,
    formTabs,
    currentFormTab,
    breadCrumbs,
    lang,
    locale,
    isLoading,
    modalMessage,
    toastMessage,
    sideBarOpen,
    sort,
    bootStrapped,
    auth,
    isAdminOrAbove,
    isSuper,
    isAdmin,
    settings
});
