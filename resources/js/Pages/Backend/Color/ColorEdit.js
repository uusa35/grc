import BackendContainer from "../components/containers/BackendContainer";


export default function ColorEdit({color}) {
    return (
        <BackendContainer>
            <h1>color edit {color.id}</h1>
        </BackendContainer>
    )
}

