import BackendContainer from "./../components/containers/BackendContainer";
import {useContext, useMemo, useState} from "react";
import {BackendContext} from "./../context/BackendContext";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import {filter, map, forEach, isArray, uniq} from 'lodash';
import FormTabsContainer from "./../components/containers/FormTabsContainer";
import ToolTipWidget from "./../components/widgets/ToolTipWidget";
import FormBtns from "./../components/widgets/form/FormBtns";
import axios from "axios";
import {Inertia} from '@inertiajs/inertia'

export default function ProductCreate({users, sizes, colors, categories}) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const {classNames, trans, theme, currentFormTab, currentModule } = useContext(BackendContext)
    const {data, setData, post, progress} = useForm({
        'sku': '',
        'name_ar': '',
        'name_en': '',
        'caption_ar': '',
        'caption_en': '',
        'description_en': '',
        'description_ar': '',
        'notes_ar': '',
        'notes_en': '',
        'home_delivery_availability': 1,
        'shipment_availability': 1,
        'delivery_time': 1,
        'exclusive': 0,
        'on_new': 0,
        'on_sale': 0,
        'on_home': 0,
        'is_available': 1,
        'price': '',
        'weight': '',
        'sale_price': '',
        'size_chart_image': '',
        'keywords': '',
        'image': '',
        'video_url_one': '',
        'video_url_two': '',
        'video_url_three': '',
        'video_url_four': '',
        'video_url_five': '',
        'start_sale': '',
        'end_sale': '',
        'active': 0,
        'check_stock': 0,
        'is_hot_deal': 0,
        'has_attributes': 0,
        'show_attribute': 0,
        'wrap_as_gift': 0,
        'qty': '',
        'qr': '',
        'direct_purchase': 0,
        'show_size_chart': 0,
        'barcode': '',
        'order': 1,
        'user_id': '',
        'brand_id': '',
        'brands': '',
        'color_id': '',
        'size_id': '',
        'embedded': 0,
        'slides': '',
        'categories': '',
        'product_attributes': ''
    });
    const {errors} = usePage().props;

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (let i = 0; i < currentImages.length; i++) {
            formData.append(`images[${i}]`, currentImages[i]);
        }
        formData.append(`model`, 'product');
        post('/backend/product');
        // uploading images module separately due to some errors occurred in setData by inertia
        setTimeout(() => {
            return axios.post(`/api/images/upload`, formData).then(r => r.data).catch(e => console.log('eee', e));
        }, 1000);
    }

    const handleSelectedCategories = (checked,value) => {
        const filtered = uniq(checked ? selectedCategories.concat(value) : filter(selectedCategories, c => c != value))
        setSelectedCategories(filtered);
        setData('categories', filtered);
    }

    const handleImages = (imagesGroup) => {
        setCurrentImages(imagesGroup);
    }

    return (
        <BackendContainer type={'product'}>
            <FormTabsContainer>
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={classNames(currentFormTab.id !== 0 ? 'hidden' : '', `w-full px-10 space-y-3`)}>

                    <div className="space-y-4 divide-y 900">

                        <div className={`pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{trans('create')} {trans(currentModule)}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('create')} {trans(currentModule)}
                            </p>
                        </div>

                        <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="name_ar" className={`block text-sm font-medium text-${theme}-700`}>
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
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_price_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.name_ar && <div className={`text-red-600`}>{errors.name_ar}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="name_en" className={`block text-sm font-medium text-${theme}-700`}>
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
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_price_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.name_en && <div className={`text-red-600`}>{errors.name_en}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="price" className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('price')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        step="any"
                                        name="price"
                                        defaultValue={data.price}
                                        id="price"
                                        autoComplete="price"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_price_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.price && <div className={`text-red-600`}>{errors.price}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="sale_price"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('sale_price')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        step="any"
                                        name="sale_price"
                                        defaultValue={data.sale_price}
                                        id="sale_price"
                                        autoComplete="sale_price"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_sale_price_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.sale_price && <div className={`text-red-600`}>{errors.sale_price}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="qty" className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('qty')} {trans('available')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        step="any"
                                        name="qty"
                                        defaultValue={data.qty}
                                        id="qty"
                                        autoComplete="qty"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_qty_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.qty && <div className={`text-red-600`}>{errors.qty}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="sku" className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('sku')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="text"
                                        name="sku"
                                        defaultValue={data.sku}
                                        id="sku"
                                        autoComplete="sku"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_sku_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.sku && <div className={`text-red-600`}>{errors.sku}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="weight" className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('weight')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        step="any"
                                        name="weight"
                                        defaultValue={data.weight}
                                        id="weight"
                                        autoComplete="weight"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_weight_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.weight && <div className={`text-red-600`}>{errors.weight}</div>}
                                </p>
                            </div>
                            {/* user_id */}
                            <div className="sm:col-span-2">
                                <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">
                                    {trans('owner')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        id="user_id"
                                        name="user_id"
                                        value={data.user_id}
                                        autoComplete="user_id"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    >
                                        {
                                            users.map(u => (
                                                <option key={u.id} value={u.id}
                                                >{u.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <ToolTipWidget message={trans('product_user_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.user_id && <div className={`text-red-600`}>{errors.user_id}</div>}
                                </p>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="size_id" className="block text-sm font-medium text-gray-700">
                                    {trans('size')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        required
                                        id="size_id"
                                        name="size_id"
                                        value={data.size_id}
                                        autoComplete="size_id"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    >
                                        {
                                            sizes.map(u => (
                                                <option key={u.id}
                                                        value={u.id}
                                                >{u.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <ToolTipWidget message={trans('product_user_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {trans('size_or_capacity')}
                                    {errors.size_id && <div className={`text-red-600`}>{errors.size_id}</div>}
                                </p>
                            </div>
                            {/* color_id */}
                            <div className="sm:col-span-2">
                                <label htmlFor="color_id" className="block text-sm font-medium text-gray-700">
                                    {trans('color')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        required
                                        id="color_id"
                                        name="color_id"
                                        value={data.color_id}
                                        autoComplete="color_id"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    >
                                        {
                                            colors.map(u => (
                                                <option key={u.id} value={u.id}
                                                >{u.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <ToolTipWidget message={trans('product_user_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.color_id && <div className={`text-red-600`}>{errors.color_id}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="main_image"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('main_image')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={e => setData('image', e.target.files[0])}
                                        // required
                                        type="file"
                                        name="image"
                                        id="main_image"
                                        autoComplete="main_image"
                                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_main_image_instruction')}/>
                                <p className={`text-xs text-red-500 rtl:text-left ltr:text-right`}>
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.image && <div className={`text-red-600`}>{errors.image}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-3 has-tooltip">
                                <label htmlFor="more_images"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('more_images')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={e => handleImages(e.target.files)}
                                        // required
                                        type="file"
                                        multiple
                                        name="images"
                                        id="more_images"
                                        autoComplete="more_images"
                                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_more_images_instruction')}/>
                                <p className={`text-xs text-red-500 rtl:text-left ltr:text-right`}>
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.images && <div className={`text-red-600`}>{errors.images}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-full has-tooltip">
                                <label htmlFor="categories"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('categories')}
                                </label>
                                <div>

                                    <fieldset className="space-y-5">
                                        <div className="flex flex-row flex-wrap">
                                            {
                                                categories.map(c => (
                                                    <div
                                                        className={`flex flex-col flex-1 space-y-4 mt-4 flex-wrap border-r border-b border-${theme}-200 p-2`}
                                                        key={c.id}>
                                                        <div className="relative flex items-start">
                                                            <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                <input
                                                                    onChange={e => handleSelectedCategories(e.target.checked, e.target.value)}
                                                                    id="categories"
                                                                    aria-describedby="categories-description"
                                                                    name="categories"
                                                                    value={c.id}
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                />
                                                            </div>
                                                            <div className="ltr:ml-3 text-sm">
                                                                <label htmlFor="categories"
                                                                       className={`font-extrabold text-${theme}-900 border-b border-${theme}-400`}>
                                                                    {c.name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {
                                                            c.children.map(sub => (
                                                                <div key={sub.id}>
                                                                    <div className="relative flex items-start mx-5">
                                                                        <div
                                                                            className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                            <input
                                                                                onChange={e => handleSelectedCategories(e.target.checked, e.target.value)}
                                                                                id="categories"
                                                                                aria-describedby="categories-description"
                                                                                name="categories"
                                                                                value={sub.id}
                                                                                type="checkbox"
                                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                            />
                                                                        </div>
                                                                        <div className="ltr:ml-3 text-sm">
                                                                            <label htmlFor="categories"
                                                                                   className={`text-xs font-extrabold text-${theme}-600`}>
                                                                                {sub.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        sub.children.map(child => (
                                                                            <div
                                                                                className="relative flex items-start mx-10"
                                                                                key={child.id}>
                                                                                <div
                                                                                    className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                                    <input
                                                                                        onChange={e => handleSelectedCategories(e.target.checked, e.target.value)}
                                                                                        id="categories"
                                                                                        aria-describedby="categories-description"
                                                                                        name="categories"
                                                                                        value={child.id}
                                                                                        type="checkbox"
                                                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                                    />
                                                                                </div>
                                                                                <div className="ltr:ml-3 text-sm">
                                                                                    <label htmlFor="categories"
                                                                                           className={`text-xs font-extrabold text-${theme}-600`}>
                                                                                        {child.name}
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            ))

                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </fieldset>
                                </div>
                                <ToolTipWidget message={trans('product_categories_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.categories && <div className={`text-red-600`}>{errors.categories}</div>}
                                </p>
                            </div>


                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className={`pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{trans('more_details')}</h3>
                        </div>
                        <div className="flex flex-1 flex-col justify-start items-center w-full">
                            <div
                                className={`grid grid-cols-2 md:grid-cols-4 md:gap-x-5 w-full`}>
                                {/* active */}
                                <fieldset className="mt-1 col-span-1">
                                    <div>
                                        <legend
                                            className={`text-base font-medium text-${theme}-900`}>{trans('active')}</legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="active"
                                                name="active"
                                                type="radio"
                                                defaultChecked={data.active}
                                                value={1}
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="active"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="active"
                                                name="active"
                                                type="radio"
                                                defaultChecked={!data.active}
                                                value={0}
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="active"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget/>
                                    <div>
                                        <p className={`mt-2 text-xs text-${theme}-500`}>
                                            {errors.active && <div className={`text-red-600`}>{errors.active}</div>}
                                        </p>
                                    </div>
                                </fieldset>
                                {/* on home*/}
                                <fieldset className="mt-1 col-span-1">
                                    <div>
                                        <legend
                                            className={`text-base font-medium text-${theme}-900`}>{trans('on_home')}</legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="on_home"
                                                name="on_home"
                                                defaultChecked={data.on_home}
                                                type="radio"
                                                value={1}
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="push-everything"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="on_home"
                                                name="on_home"
                                                type="radio"
                                                defaultChecked={!data.on_home}
                                                value={0}
                                                checked
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="on_home"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget/>
                                    <div>
                                        <p className={`mt-2 text-xs text-${theme}-500`}>
                                            {errors.on_home && <div className={`text-red-600`}>{errors.on_home}</div>}
                                        </p>
                                    </div>
                                </fieldset>
                                {/* on sale*/}
                                <fieldset className="mt-1 has-tooltip col-span-1">
                                    <div>
                                        <legend
                                            className={`text-base font-medium text-${theme}-900`}>{trans('on_sale')}</legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="on_sale"
                                                name="on_sale"
                                                type="radio"
                                                value={1}
                                                defaultChecked={data.on_sale}
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="push-everything"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="on_sale"
                                                name="on_sale"
                                                type="radio"
                                                value={0}
                                                defaultChecked={!data.on_sale}
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="on_sale"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget message={trans('product_sale_price_instruction')}/>
                                    <div>
                                        <p className={`mt-2 text-xs text-${theme}-500`}>
                                            {errors.on_sale && <div className={`text-red-600`}>{errors.on_sale}</div>}
                                        </p>
                                    </div>
                                </fieldset>
                                {/* has_attributes */}
                                <fieldset className="mt-1 has-tooltip col-span-1">
                                    <div>
                                        <legend
                                            className={`text-base font-medium text-${theme}-900`}>{trans('has_attributes')}</legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="has_attributes"
                                                name="has_attributes"
                                                type="radio"
                                                value={1}
                                                defaultChecked={data.has_attributes}
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="has_attributes"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={handleChange}
                                                id="has_attributes"
                                                name="has_attributes"
                                                type="radio"
                                                value={0}
                                                defaultChecked={!data.has_attributes}
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="has_attributes"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('no')}
                                            </label>
                                        </div>
                                    </div>
                                    <ToolTipWidget message={trans('product_has_attributes_instruction')}/>
                                    <div>
                                        <p className={`mt-2 text-xs text-${theme}-500`}>
                                            {errors.has_attributes &&
                                            <div className={`text-red-600`}>{errors.has_attributes}</div>}
                                        </p>
                                    </div>
                                </fieldset>
                            </div>


                            <div
                                className={`flex flex-1 flex-row w-full justify-between py-4 border-t border-${theme}-100`}>

                            </div>
                        </div>

                    </div>
                    <FormBtns type={'product'}/>
                </form>

                <div
                    className={classNames(currentFormTab.id !== 1 ? 'hidden' : '', `w-3/4 p-5 space-y-8 divide-y divide-gray-200`)}>
                    <div
                        className={`bg-${theme}-50 border-l-4 border-${theme}-800 p-4 sm:w-full lg:w-3/4 m-auto my-2 shadow-lg rounded-md m-10`}>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className={`h-9 w-9 m-3 text-${theme}-400" xmlns="http://www.w3.org/2000/svg`}
                                     viewBox="0 0 20 20"
                                     fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="mb-3 font-extrabold text-lgn">{trans('alert')}</h3>
                                <p className={`text-sm text-${theme}-700`}>
                                    {trans('basic_information_must_be_entered')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={classNames(currentFormTab.id !== 2 ? 'hidden' : '', `w-3/4 p-5 space-y-8 divide-y divide-gray-200`)}>
                    <div
                        className={`bg-${theme}-50 border-l-4 border-${theme}-800 p-4 sm:w-full lg:w-3/4 m-auto my-2 shadow-lg rounded-md m-10`}>
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className={`h-9 w-9 m-3 text-${theme}-400" xmlns="http://www.w3.org/2000/svg`}
                                     viewBox="0 0 20 20"
                                     fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd"
                                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="mb-3 font-extrabold text-lgn">{trans('alert')}</h3>
                                <p className={`text-sm text-${theme}-700`}>
                                    {trans('basic_information_must_be_entered')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </FormTabsContainer>
        </BackendContainer>
    )
}
