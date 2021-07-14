import {Inertia} from '@inertiajs/inertia'
import {useState, useRef} from 'react'
import AppContainer from "./components/AppContainer";
import {useForm} from '@inertiajs/inertia-react'
import {usePage} from '@inertiajs/inertia-react'
import {map} from 'lodash';

const PageIndexScreen = ({elements}) => {
    const {errors} = usePage().props;
    const {data, setData, post, progress} = useForm({
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
    console.log('the elements', elements);

    return (
        <AppContainer>
            <div className="container">
                <h1>Page Index Screen </h1>
                <form onSubmit={submit}
                      method="post"
                      encType="multipart/form-data"
                >
                    <input className="border-2 border-black" type="text"
                           onChange={e => setData('name_ar', e.target.value)}/>
                    {errors.name_ar && <div>{errors.name_ar}</div>}
                    <input className="border-2 border-black" type="text"
                           onChange={e => setData('name_en', e.target.value)}/>
                    {errors.name_en && <div>{errors.name_en}</div>}
                    <input type="file" name="image" onChange={e => setData('image', e.target.files[0])}/>
                    {/*<input type="file" name="images" multiple  onChange={e => setData('images',e.target.files)} />*/}
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <button type="submit">Submit</button>
                </form>
                {
                    map(elements.data, (p =>
                            <div key={p.id}
                                 className="border-2 border-black rounded-md shadow-md divide-x divide-pink-500 space-y-4 divide-x-4">
                                <div>
                                    <h1>Page Id : {p.id}</h1>
                                    <h1>Sections No : {p.sections?.length}</h1>
                                    {
                                        map(p.sections, (s =>
                                                <div className="border-2 border-pink-400 space-y-4 divide-y divide-green-300 p-10 m-5" key={s.id}>
                                                    <img className="w-10 h-10 bg-contain" src={s.imageThumbLink} alt={s.name_ar}/>
                                                    <h1>Section Id : {s.id}</h1>
                                                    <h1>Section Title Arabic : {s.name_ar}</h1>
                                                    <h1>Section Title English : {s.name_en}</h1>
                                                </div>
                                        ))
                                    }
                                </div>
                            </div>
                    ))
                }

            </div>
        </AppContainer>
    );
}
export default PageIndexScreen;
