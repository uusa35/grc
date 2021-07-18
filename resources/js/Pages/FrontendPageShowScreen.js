
import { useForm } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'
import FrontendContainer from "./components/containers/FrontendContainer";

const FrontendPageShowScreen = ({ elements }) => {
    const { errors } = usePage().props;
const { data, setData, post, progress } = useForm({
    name_ar: '',
    name_en: '',
    template_id: 1,
    sectionable_id: 1,
    sectionable_type: "App\\Models\\Page",
    image: null,
    images: null,
})
    // console.log('the data', elements.sections);

    function submit(e) {
        e.preventDefault()
        return post('/section');
    }

    console.log('errors', errors);

    return (
        <FrontendContainer>
            <div className="container">
                <h1>Page Show  {data.id} - the title : {data.name_ar}</h1>
                <form onSubmit={submit}
                      method="post"
                      encType="multipart/form-data"
                >
                <input className="border-2 border-black" type="text" value={data.name_ar} onChange={e => setData('name_ar', e.target.value)} />
                    {errors.name_ar && <div>{errors.name_ar}</div>}
                <input className="border-2 border-black" type="text" value={data.name_en} onChange={e => setData('name_en', e.target.value)} />
                    {errors.name_en && <div>{errors.name_en}</div>}
                <input type="file" name="image"  onChange={e => setData('image',e.target.files[0])} />
                {/*<input type="file" name="images" multiple  onChange={e => setData('images',e.target.files)} />*/}
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                <button type="submit">Submit</button>
            </form>
            </div>
        </FrontendContainer>
    );
}
export default FrontendPageShowScreen;
