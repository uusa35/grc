import BackendContainer from "../components/containers/BackendContainer";


export default function BookEdit({book}) {
    return (
        <BackendContainer>
            <h1>book edit {book.id}</h1>
        </BackendContainer>
    )
}

