import BackendContainer from "../components/containers/BackendContainer";


export default function({area}) {
    return (
        <BackendContainer>
            <h1>edit {area.id}</h1>
        </BackendContainer>
    )
}

