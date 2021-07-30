import {Fragment, useEffect, useState} from "react";
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

const BackendContainer = ({children, elements = [], type = ''}) => {
    return (
        <div className="h-full flex overflow-hidden font-bein font-extrabold">
            <SideBar/>
            <ConfirmationModal/>
            <main className="flex-1 relative z-0 focus:outline-none max-w-full bg-gray-100">
                <BackendHeader/>
                <div className="min-h-screen">
                    <div className="align-middle inline-block min-w-full h-auto">
                        <BreadCrumbs/>
                        <div className="mx-3">
                            <SystemMessage/>
                            {
                                !isEmpty(elements?.data) && type && <Pagination
                                    type={type}
                                    total={elements.total}
                                    links={elements.links}
                                />
                            }
                            {!isEmpty(elements?.data) && <TableMobileview elements={elements} type={type}/>}
                            {children}
                            {
                                !isEmpty(elements?.data) && type ?
                                    <Pagination
                                        type={type}
                                        total={elements.total}
                                        links={elements.links}
                                    /> :
                                    <NoElements display={!isEmpty(elements?.data) && elements.data.length === 0}/>
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
    type: PropTypes.string.isRequired,
    elements: PropTypes.object,
};
