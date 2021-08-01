import {Fragment, useContext, useEffect, useState} from "react";
import SideBar from "../partials/SideBar";
import BackendHeader from "../partials/BackendHeader";
import Footer from "../partials/Footer";
import BreadCrumbs from "../partials/BreadCrumbs";
import SystemMessage from "../partials/SystemMessage";
import {isEmpty, map } from 'lodash';
import ConfirmationModal from "../partials/ConfirmationModal";
import Pagination from "../partials/Pagination";
import NoElements from "../widgets/NoElements";
import PropTypes from 'prop-types';
import TableMobileview from "../widgets/TableMobileview";
import {BackendContext} from "../../context/BackendContext";

const BackendContainer = ({children, elements = [], type = 'home',
                              showNoElements = false,
                              showSearch  = false,
    showMobileView = false
}) => {
    const { currentModule , setCurrentModule  } = useContext(BackendContext);

    useEffect(() => {
        type ? setCurrentModule(type) : null;
    }, [])


    console.log('currentModule', currentModule);

    return (
        <div className="h-full flex overflow-hidden font-bein font-extrabold">
            <SideBar/>
            <ConfirmationModal/>
            <main className="flex-1 relative z-0 focus:outline-none max-w-full bg-gray-100">
                <BackendHeader/>
                <div className="min-h-screen">
                    <div className="align-middle inline-block min-w-full h-auto">
                        <BreadCrumbs/>
                        <div className="mx-3 space-y-2">
                            <SystemMessage/>
                            {
                                !isEmpty(elements?.data) && elements.total > 1 && currentModule && <Pagination
                                    type={currentModule}
                                    total={elements.total}
                                    links={elements.links}
                                    showSearch={showSearch}
                                />
                            }
                            {!isEmpty(elements?.data) && showMobileView && <TableMobileview elements={elements} type={currentModule}/>}
                            {children}
                            {
                                !isEmpty(elements?.data) && elements.total > 1 && currentModule &&
                                    <Pagination
                                        type={currentModule}
                                        total={elements.total}
                                        links={elements.links}
                                    />
                            }
                            { showNoElements && <NoElements display={isEmpty(elements?.data)}/>}
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
