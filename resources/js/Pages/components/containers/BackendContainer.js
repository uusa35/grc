import SideBar from "../partials/SideBar";
import BackendHeader from "../partials/BackendHeader";
import Footer from "../partials/Footer";
import BreadCrumbs from "../partials/BreadCrumbs";
import Pagination from "../partials/Pagination";

const BackendContainer = ({children, showPagination}) => {
    return (
        <div className="h-full flex overflow-hidden bg-white font-bein">
            <SideBar/>
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <BackendHeader/>
                <div className="min-h-screen hidden mt-5 sm:block">
                    <div className="align-middle inline-block min-w-full h-auto mt-auto px-5">
                        <BreadCrumbs/>
                        {children}
                    </div>
                </div>
                <Pagination/>
                <Footer/>
            </main>
        </div>
    );
}


export default BackendContainer;
