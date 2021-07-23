import {Fragment, useEffect} from "react";
import SideBar from "../partials/SideBar";
import BackendHeader from "../partials/BackendHeader";
import Footer from "../partials/Footer";
import BreadCrumbs from "../partials/BreadCrumbs";
import {useContext} from "react";
import {BackendContext} from "../../context/BackendContext";
import NProgress from 'nprogress'
import { Inertia } from '@inertiajs/inertia'
import LoadingView from "../widgets/LoadingView";
import SystemMessage from "../partials/SystemMessage";
import { isEmpty } from 'lodash';


const BackendContainer = ({children, showPagination}) => {
    const {enableLoading, disableLoading, isLoading, toggleSideBar, sysMessage } = useContext(BackendContext);

    useEffect(() => {
        return Inertia.on('start', (event) => {
            console.log(`Starting a visit to ${event.detail.visit.url}`)
        })
    }, [])
    Inertia.on('start', () => enableLoading())
    // Inertia.on('start', () => console.log('start'))
    // Inertia.on('finish', () => console.log('finish'))
    Inertia.on('finish', () => disableLoading())

    return (
        <div className="h-full flex overflow-hidden font-bein font-extrabold">
            <SideBar/>
            <main className="flex-1 relative z-0 focus:outline-none max-w-full bg-gray-100">
                <BackendHeader/>
                <div className="min-h-screen">
                    <div className="align-middle inline-block min-w-full h-auto">
                        <BreadCrumbs/>
                        <SystemMessage />
                        <div className="mx-3">
                            {
                                isLoading ? <LoadingView/> : children
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
