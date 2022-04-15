import BackendContainer from "../components/containers/BackendContainer";
import route from 'ziggy-js';
import {useForm, usePage} from "@inertiajs/inertia-react";
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext";
import ToolTipWidget from "../components/widgets/ToolTipWidget";
import FormBtns from "../components/widgets/form/FormBtns";
import {Inertia} from "@inertiajs/inertia";
import FormSection from "../components/widgets/form/FormSection";

export default function({ color }) {
    const {trans} = useContext(AppContext);
    const {errors} = usePage().props;
    const {data, setData, put, progress, reset} = useForm({
        'name_ar': color.name_ar,
        'name_en': color.name_en,
        'code': color.code,
        'active': color.active,
    });

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()
        Inertia.post(route(`backend.color.update`, color.id), {
            _method: 'put',
            ...data,
        }, {
            forceFormData: true,
        })
    }

    return (
        <BackendContainer type={'color'}>
            <div className="flex flex-col rounded-md bg-transparent">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={'w-full space-y-3 bg-transparent'}
                >
                    <FormSection title={`${trans('edit')} ${trans('color')}`}>
                        {/* name ar */}
                        <div className="sm:col-span-2">
                            <label htmlFor="name_ar" className={`block   text-gray-800`}>
                                {trans('name_ar')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="name_ar" maxLength={100}
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
                            <label htmlFor="name_en" className={`block   text-gray-800`}>
                                {trans('name_en')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="text"
                                    name="name_en" maxLength={100}
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
                        {/* code  */}
                        <div className="sm:col-span-1">
                            <label htmlFor="code" className={`block   text-gray-800`}>
                                {trans('code')}
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={handleChange}
                                    required
                                    type="color"
                                    name="code"
                                    defaultValue={data.code}
                                    id="code"
                                    autoComplete="code"
                                    className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full border-gray-300 rounded-md`}
                                />
                            </div>
                            <ToolTipWidget message={trans('code_instruction')}/>
                            <p className={`mt-2  text-gray-500`}>
                                {errors.code && <div className={`text-red-900`}>{errors.code}</div>}
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
                                           className="ml-3 block   text-gray-800">
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
                                           className="ml-3 block   text-gray-800">
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

                    <FormBtns type={'color'}/>

                </form>
            </div>
        </BackendContainer>
    )
}
