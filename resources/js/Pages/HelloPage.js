import { InertiaLink } from '@inertiajs/inertia-react'
import AppContainer from "./components/AppContainer";
import FrontendContainer from "./components/FrontendContainer";


const HelloPage = () => {
    return (
        <FrontendContainer>
        <div className="h-screen">
            <h1 className="text-lg p-10">Hello</h1>
        </div>
        </FrontendContainer>
    )
}


export default HelloPage;
