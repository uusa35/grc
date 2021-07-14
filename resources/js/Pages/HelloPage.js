import { InertiaLink } from '@inertiajs/inertia-react'
import AppContainer from "./components/AppContainer";


const HelloPage = () => {
    return (
        <AppContainer>
        <div className="h-screen">
            <h1 className="text-lg p-10">Hello</h1>
        </div>
        </AppContainer>
    )
}


export default HelloPage;
