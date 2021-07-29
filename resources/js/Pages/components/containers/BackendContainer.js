import {Fragment, useEffect} from "react";
import SideBar from "../partials/SideBar";
import BackendHeader from "../partials/BackendHeader";
import Footer from "../partials/Footer";
import BreadCrumbs from "../partials/BreadCrumbs";
import {useContext} from "react";
import {BackendContext} from "../../context/BackendContext";
import NProgress from 'nprogress'
import {Inertia} from '@inertiajs/inertia'
import LoadingView from "../widgets/LoadingView";
import SystemMessage from "../partials/SystemMessage";
import {isEmpty} from 'lodash';
import ConfirmationModal from "../partials/ConfirmationModal";


const BackendContainer = ({children, showPagination}) => {
    const {enableLoading, disableLoading, isLoading, toggleSideBar, sysMessage} = useContext(BackendContext);

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
                            {children}
                        </div>
                    </div>
                </div>
                <Footer/>
            </main>
        </div>
    );
}


export default BackendContainer;


{/*{*/}
{/*    isLoading ? <LoadingView/> : children*/}
{/*}*/}
