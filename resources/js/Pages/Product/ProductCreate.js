import BackendContainer from "./../components/containers/BackendContainer";
import {useContext, useMemo, useState} from "react";
import {BackendContext} from "./../context/BackendContext";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import {filter, map, forEach} from 'lodash';
import FormTabsContainer from "./../components/containers/FormTabsContainer";
import ToolTipWidget from "./../components/widgets/ToolTipWidget";
import FormBtns from "./../components/widgets/form/FormBtns";
import axios from "axios";

export default function ProductCreate({users, sizes, colors, categories}) {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [currentImages, setCurrentImages] = useState([]);
    const {classNames, trans, theme, currentFormTab} = useContext(BackendContext)
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

    const submit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        for (let i = 0; i < currentImages.length; i++) {
            formData.append(`images[${i}]`, currentImages[i]);
        }
        formData.append(`model`, 'product');
        post('/backend/product');
        setTimeout(() => {
            return axios.post(`/api/images/upload`, formData).then(r => r.data).catch(e => console.log('eee', e));
        }, 1000);
    }

    const handleSelectedCategories = (categories) => {
        setSelectedCategories(categories);
        setData('categories', categories);
    }

    const handleImages = (imagesGroup) => {
        setCurrentImages(imagesGroup);
    }

    return (
        <BackendContainer>
            <FormTabsContainer>
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={classNames(currentFormTab.id !== 0 ? 'hidden' : '', `w-full px-10 space-y-3 divide-y divide-gray-200`)}>

                    <div className="space-y-4 divide-y 900">

                        <div className={`pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{trans('create')} {trans('product')}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('product_create_message')}
                            </p>
                        </div>

                        <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="name_ar" className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('name_ar')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={e => setData('name_ar', e.target.value)}
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
                                        onChange={e => setData('name_en', e.target.value)}
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
                                        onChange={e => setData('price', e.target.value)}
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
                                        onChange={e => setData('sale_price', e.target.value)}
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
                                        onChange={e => setData('qty', e.target.value)}
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
                                        onChange={e => setData('sku', e.target.value)}
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
                                        onChange={e => setData('weight', e.target.value)}
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
                                        onChange={e => setData('user_id', e.target.value)}
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
                                        onChange={e => setData('size_id', e.target.value)}
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
                                        onChange={e => setData('color_id', e.target.value)}
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

                            <div className="sm:col-span-2">
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
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_main_image_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.image && <div className={`text-red-600`}>{errors.image}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-2 has-tooltip">
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
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_more_images_instruction')}/>
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
                                                    <div className={`flex flex-col flex-1 space-y-4 mt-4 flex-wrap border-r border-b border-${theme}-200 p-2`}>
                                                        <div className="relative flex items-start" key={c.id}>
                                                            <div className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                <input
                                                                    onChange={e => handleSelectedCategories(e.target.checked ? selectedCategories.concat(e.target.value) : filter(selectedCategories, c => c !== e.target.value))}
                                                                    id="categories"
                                                                    aria-describedby="categories-description"
                                                                    name="categories"
                                                                    value={c.id}
                                                                    type="checkbox"
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                />
                                                            </div>
                                                            <div className="ml-3 text-sm">
                                                                <label htmlFor="categories"
                                                                       className={`font-extrabold text-${theme}-900 border-b border-${theme}-400`}>
                                                                    {c.name}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {
                                                            c.children.map(sub => (
                                                                <>
                                                                    <div className="relative flex items-start mx-5"
                                                                         key={sub.id}>
                                                                        <div
                                                                            className="flex items-center h-5 rtl:ml-4 ltr:mr-4">
                                                                            <input
                                                                                onChange={e => handleSelectedCategories(e.target.checked ? selectedCategories.concat(e.target.value) : filter(selectedCategories, c => c !== e.target.value))}
                                                                                id="categories"
                                                                                aria-describedby="categories-description"
                                                                                name="categories"
                                                                                value={sub.id}
                                                                                type="checkbox"
                                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                            />
                                                                        </div>
                                                                        <div className="ml-3 text-sm">
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
                                                                                        onChange={e => handleSelectedCategories(e.target.checked ? selectedCategories.concat(e.target.value) : filter(selectedCategories, c => c !== e.target.value))}
                                                                                        id="categories"
                                                                                        aria-describedby="categories-description"
                                                                                        name="categories"
                                                                                        value={child.id}
                                                                                        type="checkbox"
                                                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                                    />
                                                                                </div>
                                                                                <div className="ml-3 text-sm">
                                                                                    <label htmlFor="categories"
                                                                                           className={`text-xs font-extrabold text-${theme}-600`}>
                                                                                        {child.name}
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </>
                                                            ))

                                                        }
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </fieldset>
                                </div>
                                <ToolTipWidget message={trans('product_more_images_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.categories && <div className={`text-red-600`}>{errors.categories}</div>}
                                </p>
                            </div>


                        </div>
                        <FormBtns/>
                    </div>

                    <div className="space-y-4 divide-y divide-gray-200">

                        <div className={`pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{trans('create')} {trans('product')}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('product_create_message')}
                            </p>
                        </div>

                        <div className="flex flex-1 flex-col justify-start items-center w-full">
                            <div
                                className={`flex flex-1 flex-row w-full justify-between py-4 border-t border-${theme}-100`}>
                                {/* active */}
                                <fieldset className="mt-1 flex-1">
                                    <div>
                                        <legend
                                            className={`text-base font-medium text-${theme}-900`}>{trans('active')}</legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={e => setData('active', e.target.value)}
                                                id="active"
                                                name="active"
                                                type="radio"
                                                defaultValue={data.active}
                                                value={1}
                                                checked
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="active"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={e => setData('active', e.target.value)}
                                                id="active"
                                                name="active"
                                                type="radio"
                                                defaultValue={data.active}
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
                                <fieldset className="mt-1 flex-1">
                                    <div>
                                        <legend
                                            className={`text-base font-medium text-${theme}-900`}>{trans('on_home')}</legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={e => setData('on_home', e.target.value)}
                                                id="on_home"
                                                name="on_home"
                                                defaultValue={data.on_home}
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
                                                onChange={e => setData('on_home', e.target.value)}
                                                id="on_home"
                                                name="on_home"
                                                type="radio"
                                                defaultValue={data.on_home}
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
                            </div>


                            <div
                                className={`flex flex-1 flex-row w-full justify-between py-4 border-t border-${theme}-100`}>
                                {/* has_attributes */}
                                <fieldset className="mt-1 has-tooltip flex-1">
                                    <div>
                                        <legend
                                            className={`text-base font-medium text-${theme}-900`}>{trans('has_attributes')}</legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={e => setData('has_attributes', e.target.value)}
                                                id="has_attributes"
                                                name="has_attributes"
                                                type="radio"
                                                value={1}
                                                className={`mx-5 focus:ring-${theme}-500 h-4 w-4 text-${theme}-600 border-${theme}-300`}
                                            />
                                            <label htmlFor="has_attributes"
                                                   className="ml-3 block text-sm font-medium text-gray-700">
                                                {trans('yes')}
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                onChange={e => setData('has_attributes', e.target.value)}
                                                id="has_attributes"
                                                name="has_attributes"
                                                type="radio"
                                                value={0}
                                                checked
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
                                {/* on sale*/}
                                <fieldset className="mt-1 has-tooltip flex-1">
                                    <div>
                                        <legend
                                            className={`text-base font-medium text-${theme}-900`}>{trans('on_sale')}</legend>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div className="flex items-center">
                                            <input
                                                onChange={e => setData('on_sale', e.target.value)}
                                                id="on_sale"
                                                name="on_sale"
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
                                                onChange={e => setData('on_sale', e.target.value)}
                                                id="on_sale"
                                                name="on_sale"
                                                type="radio"
                                                value={0}
                                                checked
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
                            </div>
                        </div>

                    </div>
                    <FormBtns/>
                </form>

                <div
                    className={classNames(currentFormTab.id !== 1 ? 'hidden' : '', `w-3/4 p-5 space-y-8 divide-y divide-gray-200`)}>
                    <form
                        className={classNames(currentFormTab.id !== 1 ? '' : '', ``)}>
                        <div className="space-y-8 divide-y divide-gray-200">
                            <div>
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>

                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                            Username
                                        </label>
                                        <div className="mt-1 flex rounded-md shadow-sm">
                <span
                    className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  workcation.com/
                </span>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                autoComplete="username"
                                                className="flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            About
                                        </label>
                                        <div className="mt-1">
                <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={''}
                />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">Write a few sentences about
                                            yourself.</p>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                                            Photo
                                        </label>
                                        <div className="mt-1 flex items-center">
                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </span>
                                            <button
                                                type="button"
                                                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="cover-photo"
                                               className="block text-sm font-medium text-gray-700">
                                            Cover photo
                                        </label>
                                        <div
                                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                               className="sr-only"/>
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Personal
                                        Information</h3>
                                    <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can
                                        receive mail.</p>
                                </div>
                                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                            First name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                            Last name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                            Country / Region
                                        </label>
                                        <div className="mt-1">
                                            <select
                                                id="country"
                                                name="country"
                                                autoComplete="country"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-6">
                                        <label htmlFor="street-address"
                                               className="block text-sm font-medium text-gray-700">
                                            Street address
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="street-address"
                                                id="street-address"
                                                autoComplete="street-address"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                            State / Province
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="state"
                                                id="state"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                                            ZIP / Postal
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="zip"
                                                id="zip"
                                                autoComplete="postal-code"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <div>
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        We'll always let you know about important changes, but you pick what else you
                                        want to hear about.
                                    </p>
                                </div>
                                <div className="mt-6">
                                    <fieldset>
                                        <legend className="text-base font-medium text-gray-900">By Email</legend>
                                        <div className="mt-4 space-y-4">
                                            <div className="relative flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="comments"
                                                        name="comments"
                                                        type="checkbox"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="comments" className="font-medium text-gray-700">
                                                        Comments
                                                    </label>
                                                    <p className="text-gray-500">Get notified when someones posts a
                                                        comment on a posting.</p>
                                                </div>
                                            </div>
                                            <div className="relative flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="candidates"
                                                        name="candidates"
                                                        type="checkbox"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="candidates" className="font-medium text-gray-700">
                                                        Candidates
                                                    </label>
                                                    <p className="text-gray-500">Get notified when a candidate applies
                                                        for a job.</p>
                                                </div>
                                            </div>
                                            <div className="relative flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="offers"
                                                        name="offers"
                                                        type="checkbox"
                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="offers" className="font-medium text-gray-700">
                                                        Offers
                                                    </label>
                                                    <p className="text-gray-500">Get notified when a candidate accepts
                                                        or rejects an offer.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset className="mt-6">
                                        <div>
                                            <legend className="text-base font-medium text-gray-900">Push Notifications
                                            </legend>
                                            <p className="text-sm text-gray-500">These are delivered via SMS to your
                                                mobile phone.</p>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center">
                                                <input
                                                    id="push-everything"
                                                    name="push-notifications"
                                                    type="radio"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                />
                                                <label htmlFor="push-everything"
                                                       className="ml-3 block text-sm font-medium text-gray-700">
                                                    Everything
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="push-email"
                                                    name="push-notifications"
                                                    type="radio"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                />
                                                <label htmlFor="push-email"
                                                       className="ml-3 block text-sm font-medium text-gray-700">
                                                    Same as email
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    id="push-nothing"
                                                    name="push-notifications"
                                                    type="radio"
                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                />
                                                <label htmlFor="push-nothing"
                                                       className="ml-3 block text-sm font-medium text-gray-700">
                                                    No push notifications
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </FormTabsContainer>
        </BackendContainer>
    )
}
