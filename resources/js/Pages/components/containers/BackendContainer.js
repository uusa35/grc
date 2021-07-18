import SideBar from "../partials/SideBar";
import BackendHeader from "../partials/BackendHeader";

const BackendContainer = ({children}) => {
    return (
        <div className="h-screen flex overflow-hidden bg-white">
            <SideBar/>
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                <BackendHeader/>
                <div className="hidden mt-8 sm:block">
                    <div className="align-middle inline-block min-w-full border-b border-gray-200">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}


export default BackendContainer;
