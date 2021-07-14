import {Inertia} from '@inertiajs/inertia'
import {useState, useRef} from 'react'
import AppContainer from "./components/AppContainer";
import { useForm } from '@inertiajs/inertia-react'
import { usePage } from '@inertiajs/inertia-react'

const PageShowScreen = ({ elements }) => {
    const { errors } = usePage().props;
const { data, setData, post, progress } = useForm({
    title_ar: '',
    title_en: '',
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
        <AppContainer>
            <div className="container">
                <h1>Page Show Screen {data.id} - the title : {data.title_ar}</h1>
                <form onSubmit={submit}
                      method="post"
                      encType="multipart/form-data"
                >
                <input className="border-2 border-black" type="text" value={data.title_ar} onChange={e => setData('title_ar', e.target.value)} />
                    {errors.title_ar && <div>{errors.title_ar}</div>}
                <input className="border-2 border-black" type="text" value={data.title_en} onChange={e => setData('title_en', e.target.value)} />
                    {errors.title_en && <div>{errors.title_en}</div>}
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
        </AppContainer>
    );
}
export default PageShowScreen;
