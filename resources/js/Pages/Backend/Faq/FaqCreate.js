import BackendContainer from "../components/containers/BackendContainer";
import route from 'ziggy-js';
import {useForm, usePage} from "@inertiajs/inertia-react";
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import ToolTipWidget from "../components/widgets/ToolTipWidget";
import FormBtns from "../components/widgets/form/FormBtns";
import {Inertia} from "@inertiajs/inertia";
import axios from "axios";
import {showToastMessage} from "../../redux/actions";
import {useDispatch} from "react-redux";
import FormSection from "../components/widgets/form/FormSection";
import {map} from "lodash";

export default function() {
    const {trans, getLocalized, getThumb, getFileUrl,} = useContext(AppContext);
    const {errors} = usePage().props;
    const dispatch = useDispatch();
    const {data, setData, put, progress, reset} = useForm({
        'name_ar': '',
        'name_en': '',
        'caption_ar': '',
        'caption_en': '',
        'description_ar': '',
        'description_en': '',
        'notes_ar': '',
        'notes_en': '',
        'order': '',
        'active': 1,
    });

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()
        Inertia.post(route(`backend.faq.store`), {
            _method: 'post',
            ...data,
        }, {
            forceFormData: true,
        })
    }

    return (
        <BackendContainer type={'faq'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection title={`${trans('edit')} ${trans('faq')}`}>
                        {/* name ar */}
                        <div className="sm:col-span-2">
                            <label htmlFor="name_ar" className={`block   text-gray-700`}>
                                {trans('name_ar')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="name_ar"
                                    defaultValue={data.name_ar}
                                    id="name_ar"
                                    autoComplete="name_ar"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('name_ar_instruction')}/>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.name_ar && <div className={`text-red-900`}>{errors.name_ar}</div>}
                            </p>
                        </div>
                        {/* name en */}
                        <div className="sm:col-span-2">
                            <label htmlFor="name_en" className={`block   text-gray-700`}>
                                {trans('name_en')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="name_en"
                                    defaultValue={data.name_en}
                                    id="name_en"
                                    autoComplete="name_en"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('name_en_instruction')}/>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.name_en && <div className={`text-red-900`}>{errors.name_en}</div>}
                            </p>
                        </div>
                        {/* description_ar */}
                        <div className="sm:col-span-3 has-tooltip">
                            <label htmlFor="description_ar"
                                   className={`block   text-gray-700`}>
                                {trans('description_ar')}
                            </label>
                            <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="description_ar"
                                             name="description_ar"
                                             rows={4}
                                             className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                             defaultValue={data.description_ar}
                                         />
                            </div>
                            <ToolTipWidget message={trans('book_description_instruction')}/>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.description_ar &&
                                <div className={`text-red-900`}>{errors.description_ar}</div>}
                            </p>
                        </div>
                        {/* description_en */}
                        <div className="sm:col-span-3 has-tooltip">
                            <label htmlFor="description_en"
                                   className={`block   text-gray-700`}>
                                {trans('description_en')}
                            </label>
                            <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="description_en"
                                             name="description_en"
                                             rows={4}
                                             className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                             defaultValue={data.description_en}
                                         />
                            </div>
                            <ToolTipWidget message={trans('book_description_instruction')}/>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.description_en &&
                                <div className={`text-red-900`}>{errors.description_en}</div>}
                            </p>
                        </div>
                        {/* notes_ar */}
                        <div className="sm:col-span-2">
                            <label htmlFor="notes_ar" className={`block   text-gray-700`}>
                                {trans('notes_ar')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="notes_ar"
                                    defaultValue={data.notes_ar}
                                    id="notes_ar"
                                    autoComplete="notes_ar"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('notes_ar_instruction')}/>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.notes_ar && <div className={`text-red-900`}>{errors.notes_ar}</div>}
                            </p>
                        </div>
                        {/* notes_en */}
                        <div className="sm:col-span-2">
                            <label htmlFor="notes_en" className={`block   text-gray-700`}>
                                {trans('notes_en')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="notes_en"
                                    defaultValue={data.notes_en}
                                    id="notes_en"
                                    autoComplete="notes_en"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('notes_en_instruction')}/>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.notes_en && <div className={`text-red-900`}>{errors.notes_en}</div>}
                            </p>
                        </div>
                        {/* order */}
                        <div className="sm:col-span-2">
                            <label htmlFor="order" className={`block   text-gray-700`}>
                                {trans('sequence')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="number"
                                    name="order"
                                    defaultValue={data.order}
                                    id="order"
                                    autoComplete="order"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('order_instruction')}/>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.order && <div className={`text-red-900`}>{errors.order}</div>}
                            </p>
                        </div>


                    </FormSection>


                    <FormSection title={trans('more_details')}>
                        {/* active */}
                        <fieldset className="mt-1 col-span-1">
                            <div>
                                <legend
                                    className={`text-base  text-gray-900`}>{trans('active')}</legend>
                            </div>
                            <div className="mt-4 space-y-4">
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="active"
                                        name="active"
                                        type="radio"
                                        value={1}
                                        defaultChecked={data.active}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label htmlFor="active"
                                           className="ml-3 block   text-gray-700">
                                        {trans('yes')}
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleChange}
                                        id="active"
                                        name="active"
                                        type="radio"
                                        value={0}
                                        defaultChecked={!data.active}
                                        className={`mx-5 focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300`}
                                    />
                                    <label htmlFor="active"
                                           className="ml-3 block   text-gray-700">
                                        {trans('no')}
                                    </label>
                                </div>
                            </div>
                            <ToolTipWidget/>
                            <div>
                                <p className={`mt-2  text-gray-500`}>
                                    {errors.active && <div className={`text-red-900`}>{errors.active}</div>}
                                </p>
                            </div>
                        </fieldset>
                    </FormSection>

                    <FormBtns type={'faq'}/>

                </form>
            </div>
        </BackendContainer>
    )
}
