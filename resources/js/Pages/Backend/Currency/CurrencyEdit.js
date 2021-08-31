import BackendContainer from "../components/containers/BackendContainer";


export default function({currency}) {
    return (
        <BackendContainer>
            <h1>edit {currency.id}</h1>
        </BackendContainer>
    )
}

