import BackendContainer from "../components/containers/BackendContainer";


export default function({faq}) {
    return (
        <BackendContainer>
            <h1>edit {faq.id}</h1>
        </BackendContainer>
    )
}

