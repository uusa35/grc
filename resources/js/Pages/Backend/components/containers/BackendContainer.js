import {useContext, useEffect} from "react";
import SideBar from "../partials/SideBar";
import BackendHeader from "../partials/BackendHeader";
import Footer from "../partials/Footer";
import BreadCrumbs from "../partials/BreadCrumbs";
import SystemMessage from "../partials/SystemMessage";
import {isEmpty, split} from 'lodash';
import ConfirmationModal from "../partials/ConfirmationModal";
import Pagination from "../partials/Pagination";
import NoElements from "../widgets/NoElements";
import PropTypes from 'prop-types';
import TableMobileView from "../widgets/TableMobileview";
import {AppContext} from "../../../context/AppContext";
import LoadingView from "../widgets/LoadingView";
import {useDispatch, useSelector} from "react-redux";
import {addToBreadCrumbs, setBreadCrumbs} from "../../../redux/actions";
import route from 'ziggy-js'
import {isLocal} from "../../../helpers";
import parentModule from "../../../redux/reducers/parentModule";

const BackendContainer = ({
                              children, elements = [],
                              showNoElements = false,
                              showSearch = false,
                              showMobileView = false,
                              mainModule = ''
                          }) => {
    const {locale, isLoading} = useSelector(state => state);
    const { classNames } = useContext(AppContext);
    const dispatch = useDispatch();

    return (
        <div className={classNames(locale.isRTL ? 'font-bein' : 'font-tajwal-medium', "h-full flex overflow-hidden text-sm md:text-lg")} dir={locale.dir}>
            {/*<Head title={`${cXapitalize(trans(pluralize(parentModule)))} :: ${settings[getLocalized()]}`}>*/}
            {/*    <meta head-key="description" name="description" content={settings[getLocalized('description')]}/>*/}
            {/*    <link rel="icon" type="image/svg+xml" href={getThumb(settings.image)}/>*/}
            {/*</Head>*/}
            <SideBar/>
            {isLoading && <LoadingView/>}
            <main className="flex-1 relative z-0 focus:outline-none max-w-full bg-gray-100">
                <BackendHeader/>
                <div className="min-h-screen">
                    <div className="align-middle inline-block min-w-full h-auto">
                        <BreadCrumbs/>
                        <div className="mx-3 space-y-2">
                            {/*<SystemMessage/>*/}
                            {
                                !isEmpty(elements?.data) && elements.total > 0 && mainModule &&  <Pagination
                                    type={mainModule}
                                    total={elements.total}
                                    links={elements.links}
                                    showSearch={showSearch}
                                />
                            }
                            {!isEmpty(elements?.data) && showMobileView &&
                            <TableMobileView elements={elements}/>}
                            {/*{isLoading ? <LoadingView/> : children}*/}
                            {children}
                            <NoElements display={showNoElements}/>
                            {
                                !isEmpty(elements?.data) && elements.total > 0 && mainModule && <Pagination
                                    type={mainModule}
                                    total={elements.total}
                                    links={elements.links}
                                    showSearch={showSearch}
                                />
                            }
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>

        </div>
    );
}


export default BackendContainer;

BackendContainer.propTypes = {
    type: PropTypes.string,
    elements: PropTypes.object,
};
