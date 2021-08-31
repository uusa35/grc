import BackendContainer from "../components/containers/BackendContainer";


export default function({country}) {
    return (
        <BackendContainer>
            <h1>edit {country.id}</h1>
        </BackendContainer>
    )
}

