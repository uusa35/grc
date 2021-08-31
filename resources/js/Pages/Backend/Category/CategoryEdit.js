import BackendContainer from "../components/containers/BackendContainer";


export default function({category}) {
    return (
        <BackendContainer>
            <h1>edit {category.id}</h1>
        </BackendContainer>
    )
}

