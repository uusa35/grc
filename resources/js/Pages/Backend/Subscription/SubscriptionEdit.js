import BackendContainer from "../components/containers/BackendContainer";


export default function({subscription}) {
    return (
        <BackendContainer>
            <h1>edit {subscription.id}</h1>
        </BackendContainer>
    )
}

