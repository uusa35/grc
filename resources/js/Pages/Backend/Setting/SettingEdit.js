import BackendContainer from "./../components/containers/BackendContainer";
import {useContext, useEffect, useMemo, useState} from "react";
import {BackendContext} from "./../context/BackendContext";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import {filter, map, forEach, isArray, first, remove, uniq} from 'lodash';
import FormTabsContainer from "./../components/containers/FormTabsContainer";
import ToolTipWidget from "./../components/widgets/ToolTipWidget";
import FormBtns from "./../components/widgets/form/FormBtns";
import axios from "axios";
import {Inertia} from '@inertiajs/inertia'
import ImagesList from "../components/widgets/image/ImagesList";
import route from 'ziggy-js';
import moment from 'moment';
import {element} from "prop-types";


export default function SettingEdit({setting, themes}) {
    const [currentImages, setCurrentImages] = useState([]);
    const {classNames, trans, theme, currentFormTab, parentModule, getImageThumb} = useContext(BackendContext)

    const {data, setData, put, post, progress, reset} = useForm({
        name_ar: setting.name_ar,
        name_en: setting.name_en,
        caption_ar: setting.caption_ar,
        caption_en: setting.caption_en,
        address_ar: setting.address_ar,
        address_en: setting.address_en,
        description_ar: setting.description_ar,
        description_en: setting.description_en,
        mobile: setting.mobile,
        phone: setting.phone,
        country_ar: setting.country_ar,
        country_en: setting.country_en,
        zipcode: setting.zipcode,
        email: setting.email,
        android: setting.android,
        apple: setting.apple,
        youtube: setting.youtube,
        instagram: setting.instagram,
        facebook: setting.facebook,
        twitter: setting.twitter,
        whatsapp: setting.whatsapp,
        snapchat: setting.snapchat,
        image: setting.image,
        menu_bg: setting.menu_bg,
        main_bg: setting.main_bg,
        shipment_notes_ar: setting.shipment_notes_ar,
        shipment_notes_en: setting.shipment_notes_en,
        policy_ar: setting.policy_ar,
        policy_en: setting.policy_en,
        terms_ar: setting.terms_ar,
        terms_en: setting.terms_en,
        shipment_prices: setting.shipment_prices,
        size_chart_image: setting.size_chart_image,
        longitude: setting.longitude,
        latitude: setting.latitude,
        main_theme_color: setting.main_theme_color,
        main_theme_bg_color: setting.main_theme_bg_color,
        header_one_theme_color: setting.header_one_theme_color,
        header_tow_theme_color: setting.header_tow_theme_color,
        header_three_theme_color: setting.header_three_theme_color,
        header_one_theme_bg: setting.header_one_theme_bg,
        header_tow_theme_bg: setting.header_tow_theme_bg,
        header_three_theme_bg: setting.header_three_theme_bg,
        normal_text_theme_color: setting.normal_text_theme_color,
        btn_text_theme_color: setting.btn_text_theme_color,
        btn_text_hover_theme_color: setting.btn_text_hover_theme_color,
        btn_bg_theme_color: setting.btn_bg_theme_color,
        menu_theme_color: setting.menu_theme_color,
        menu_theme_bg: setting.menu_theme_bg,
        icon_theme_color: setting.icon_theme_color,
        icon_theme_bg: setting.icon_theme_bg,
        header_theme_color: setting.header_theme_color,
        header_theme_bg: setting.header_theme_bg,
        footer_theme_color: setting.footer_theme_color,
        footer_bg_theme_color: setting.footer_bg_theme_color,
        apply_global_shipment: setting.apply_global_shipment,
        show_commercials: setting.show_commercials,
        splash_on: setting.splash_on,
        code: setting.code,
        app_logo: setting.app_logo,
        theme: setting.theme,
        cash_on_delivery: setting.cash_on_delivery,
        gift_image: setting.gift_image,
        gift_fee: setting.gift_fee,
        shipment_fixed_rate: setting.shipment_fixed_rate,
        shipment_fuel_percentage: setting.shipment_fuel_percentage,
        payment_method: setting.payment_method,
        multi_cart_merchant: setting.multi_cart_merchant,
        pickup_from_branch: setting.pickup_from_branch,
        global_custome_delivery: setting.global_custome_delivery,
        android_version: setting.android_version,
        apple_version: setting.apple_version,
    });
    const {props} = usePage();
    const {errors} = props;

    const handleChange = (e) => {
        setData(values => ({
            ...values,
            [e.target.id]: e.target.value,
        }))
    }

    const submit = (e) => {
        e.preventDefault()
        Inertia.post(route(`backend.setting.update`, setting.id), {
            _method: 'put',
            ...data,
            image: data.image,
            qr: data.qr,
            size_chart_image: data.size_chart_image,
            app_logo: data.app_logo,
            gift_image: data.gift_image,
            shipment_prices: data.shipment_prices,
        }, {
            forceFormData: true,
        })
        // uploading images module separately due to some errors occurred in setData by inertia
        if (currentImages.length > 0) {
            setTimeout(() => {
                let formData = new FormData();
                const images = [];
                for (let i = 0; i < currentImages.length; i++) {
                    formData.append(`images[${i}]`, currentImages[i]);
                    images[`images[${i}]`] = currentImages[i];
                }
                formData.append(`model`, 'setting');
                formData.append(`id`, setting.id);
                formData.append(`order`, setting.id);
                axios.post(`/api/images/upload`, formData).then(r => {
                }).catch(e => console.log('eee', e)).finally(() => {
                    reset('images');
                    setCurrentImages({});
                    Inertia.reload({only: ['setting']});
                });
            }, 1000);
        }
    }

    const handleImages = (imagesGroup) => {
        setCurrentImages(imagesGroup);
    }

    return (
        <BackendContainer showMobileView={true}>
            <FormTabsContainer>
                <form
                    onSubmit={submit}
                    method="put"
                    encType="multipart/form-data"
                    className={' sm:w-full'}
                >
                    <div
                        className={classNames(currentFormTab.id !== 0 ? 'hidden' : '', `w-full  px-10 space-y-4 `)}>
                        <div className={`pt-4`}>
                            <h3 className={`text-lg leading-6 font-medium text-${theme}-900`}>{trans('edit')} {trans(parentModule)}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('edit')} {trans(parentModule)}
                            </p>
                        </div>
                        <div className="pt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6">
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
                                        defaultValue={setting.name_ar}
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
                                        defaultValue={setting.name_en}
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

                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="whatsapp" className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('whatsapp')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="number"
                                        name="whatsapp"
                                        defaultValue={setting.whatsapp}
                                        id="whatsapp"
                                        autoComplete="whatsapp"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_whatsapp_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.whatsapp && <div className={`text-red-600`}>{errors.whatsapp}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="mobile" className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('mobile')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="number"
                                        name="mobile"
                                        defaultValue={setting.mobile}
                                        id="mobile"
                                        autoComplete="mobile"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_mobile_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.mobile && <div className={`text-red-600`}>{errors.mobile}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="email" className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('email')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="email"
                                        defaultValue={setting.email}
                                        id="email"
                                        autoComplete="email"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_email_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.email && <div className={`text-red-600`}>{errors.email}</div>}
                                </p>
                            </div>

                            <div className="sm:col-span-3 has-tooltip mt-5">
                                <label htmlFor="main_image"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('main_image')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={e => setData('image', e.target.files[0])}
                                        type="file"
                                        name="image"
                                        id="main_image"
                                        autoComplete="main_image"
                                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                    <img className={`h-24 w-20 bg-cover rounded-md`} src={setting.imageThumb} alt=""/>
                                </div>
                                <ToolTipWidget message={trans('product_main_image_instruction')}/>
                                <p className={`text-xs text-red-500 rtl:text-left ltr:text-right`}>
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.image && <div className={`text-red-600`}>{errors.image}</div>}
                                </p>
                            </div>
                            <div className="sm:col-span-3 has-tooltip mt-3">
                                <label htmlFor="more_images"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('more_images')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={e => handleImages(e.target.files)}
                                        type="file"
                                        multiple
                                        name="images"
                                        id="more_images"
                                        autoComplete="more_images"
                                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                    {
                                        setting.images &&
                                        <img className={`h-24 w-20 bg-cover rounded-md`}
                                             src={setting.images[0]?.imageThumb} alt=""/>
                                    }
                                </div>
                                <ToolTipWidget message={trans('product_more_images_instruction')}/>
                                <p className={`text-xs text-red-500 rtl:text-left ltr:text-right`}>
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.images && <div className={`text-red-600`}>{errors.images}</div>}
                                </p>
                            </div>

                            {/* theme */}
                            <div className="sm:col-span-2">
                                <label htmlFor="themes" className="block text-sm font-medium text-gray-700">
                                    {trans('theme')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        id="theme"
                                        name="theme"
                                        defaultValue={data.theme}
                                        autoComplete="theme"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    >
                                        {
                                            themes.map(u => (
                                                <option key={u} value={u}
                                                >{u}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <ToolTipWidget message={trans('product_user_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.theme && <div className={`text-red-600`}>{errors.theme}</div>}
                                </p>
                            </div>

                        </div>
                        <FormBtns type={'setting'}/>
                    </div>


                    <div
                        className={classNames(currentFormTab.id !== 1 ? 'hidden' : '', `w-full  px-10 space-y-4 `)}>

                        <div className={`pt-4`}>
                            <h3 className={`text-lg leading-6 font-medium text-${theme}-900`}>{trans('edit')} {trans(parentModule)}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('edit')} {trans(parentModule)}
                            </p>
                        </div>
                        {/* description */}
                        <div className="pt-6 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3 has-tooltip">
                                <label htmlFor="description_ar"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('description_ar')}
                                </label>
                                <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="description_ar"
                                             name="description_ar"
                                             rows={4}
                                             className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                             defaultValue={setting.description_ar}
                                         />
                                </div>
                                <ToolTipWidget message={trans('product_description_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.description_ar &&
                                    <div className={`text-red-600`}>{errors.description_ar}</div>}
                                </p>
                            </div>
                            <div className="sm:col-span-3 has-tooltip">
                                <label htmlFor="description_en"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('description_en')}
                                </label>
                                <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="description_en"
                                             name="description_en"
                                             rows={4}
                                             className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                             defaultValue={setting.description_en}
                                         />
                                </div>
                                <ToolTipWidget message={trans('product_description_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.description_en &&
                                    <div className={`text-red-600`}>{errors.description_en}</div>}
                                </p>
                            </div>

                            {/* policy */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label htmlFor="policy_ar"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('policy_ar')}
                                </label>
                                <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="policy_ar"
                                             name="policy_ar"
                                             rows={4}
                                             className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                             defaultValue={setting.policy_ar}
                                         />
                                </div>
                                <ToolTipWidget message={trans('policy_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.policy_ar &&
                                    <div className={`text-red-600`}>{errors.policy_ar}</div>}
                                </p>
                            </div>
                            <div className="sm:col-span-3 has-tooltip">
                                <label htmlFor="policy_en"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('policy_en')}
                                </label>
                                <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="policy_en"
                                             name="policy_en"
                                             rows={4}
                                             className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                             defaultValue={setting.policy_en}
                                         />
                                </div>
                                <ToolTipWidget message={trans('policy_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.policy_en &&
                                    <div className={`text-red-600`}>{errors.policy_en}</div>}
                                </p>
                            </div>

                            {/* terms */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label htmlFor="terms_ar"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('terms_ar')}
                                </label>
                                <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="terms_ar"
                                             name="terms_ar"
                                             rows={4}
                                             className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                             defaultValue={setting.terms_ar}
                                         />
                                </div>
                                <ToolTipWidget message={trans('terms_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.terms_ar &&
                                    <div className={`text-red-600`}>{errors.terms_ar}</div>}
                                </p>
                            </div>
                            <div className="sm:col-span-3 has-tooltip">
                                <label htmlFor="terms_en"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('terms_en')}
                                </label>
                                <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="terms_en"
                                             name="terms_en"
                                             rows={4}
                                             className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                             defaultValue={setting.terms_en}
                                         />
                                </div>
                                <ToolTipWidget message={trans('terms_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.terms_en &&
                                    <div className={`text-red-600`}>{errors.terms_en}</div>}
                                </p>
                            </div>

                            {/* notes */}
                            <div className="sm:col-span-3 has-tooltip">
                                <label htmlFor="notes_ar" className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('shipment_notes_ar')}
                                </label>
                                <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="shipment_notes_ar"
                                             name="shipment_notes_ar"
                                             rows={4}
                                             className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                             defaultValue={setting.shipment_notes_ar}
                                         />
                                </div>
                                <ToolTipWidget message={trans('setting_shipment_notes')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.shipment_notes_ar &&
                                    <div className={`text-red-600`}>{errors.shipment_notes_ar}</div>}
                                </p>
                            </div>
                            <div className="sm:col-span-3 has-tooltip">
                                <label htmlFor="shipment_notes_en"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('shipment_notes_en')}
                                </label>
                                <div className="mt-1">
                                         <textarea
                                             onChange={handleChange}
                                             id="shipment_notes_en"
                                             name="shipment_notes_en"
                                             rows={4}
                                             className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                             defaultValue={setting.shipment_notes_en}
                                         />
                                </div>
                                <ToolTipWidget message={trans('setting_shipment_notes')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.shipment_notes_en &&
                                    <div className={`text-red-600`}>{errors.shipment_notes_en}</div>}
                                </p>
                            </div>
                            {/* caption */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="caption_ar"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('caption_ar')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="caption_ar"
                                        defaultValue={setting.caption_ar}
                                        id="caption_ar"
                                        autoComplete="caption_ar"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_caption_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.caption_ar && <div className={`text-red-600`}>{errors.caption_ar}</div>}
                                </p>
                            </div>
                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="caption_en"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('caption_en')}
                                </label>
                                <div className="mt-1 ">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="caption_en"
                                        defaultValue={setting.caption_en}
                                        id="caption_en"
                                        autoComplete="caption_en"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_caption_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.caption_en && <div className={`text-red-600`}>{errors.caption_en}</div>}
                                </p>
                            </div>
                            {/* keywords */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="keywords"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('keywords')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        step="any"
                                        name="keywords"
                                        defaultValue={setting.keywords}
                                        id="keywords"
                                        autoComplete="keywords"
                                        className={`shadow-sm focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_caption_instruction')}/>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.keywords && <div className={`text-red-600`}>{errors.keywords}</div>}
                                </p>
                            </div>
                            {/* size chart*/}
                            <div className="sm:col-span-3">
                                <label htmlFor="size_chart_image"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('size_chart_image')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={e => setData('size_chart_image', e.target.files[0])}
                                        type="file"
                                        name="size_chart_image"
                                        id="size_chart_image"
                                        autoComplete="size_chart_image"
                                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                    <img className={`h-20 w-20 bg-cover rounded-md`}
                                         src={getImageThumb(setting.size_chart_image)}
                                         alt=""/>
                                </div>
                                <ToolTipWidget message={trans('product_size_chart_image_instruction')}/>
                                <p className={`text-xs text-red-500 rtl:text-left ltr:text-right`}>
                                    {trans('image_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.size_chart_image &&
                                    <div className={`text-red-600`}>{errors.size_chart_image}</div>}
                                </p>
                            </div>

                            {/*    app_logo */}
                            <div className="sm:col-span-3">
                                <label htmlFor="app_logo"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('app_logo')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={e => setData('app_logo', e.target.files[0])}
                                        type="file"
                                        name="app_logo"
                                        id="app_logo"
                                        autoComplete="app_logo"
                                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                    <img className={`h-20 w-20 bg-cover rounded-md`}
                                         src={getImageThumb(setting.app_logo)}
                                         alt=""/>
                                </div>
                                <ToolTipWidget message={trans('product_app_logo_instruction')}/>
                                <p className={`text-xs text-red-500 rtl:text-left ltr:text-right`}>
                                    {trans('app_logo_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.app_logo && <div className={`text-red-600`}>{errors.app_logo}</div>}
                                </p>
                            </div>

                            {/*    qr */}
                            <div className="sm:col-span-3">
                                <label htmlFor="qr"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('qr')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={e => setData('qr', e.target.files[0])}
                                        type="file"
                                        name="qr"
                                        id="qr"
                                        autoComplete="qr"
                                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                    <img className={`h-20 w-20 bg-cover rounded-md`} src={getImageThumb(setting.qr)}
                                         alt=""/>
                                </div>
                                <ToolTipWidget message={trans('product_qr_instruction')}/>
                                <p className={`text-xs text-red-500 rtl:text-left ltr:text-right`}>
                                    {trans('qr_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.qr && <div className={`text-red-600`}>{errors.qr}</div>}
                                </p>
                            </div>

                            {/*    shipment prices image */}
                            <div className="sm:col-span-3">
                                <label htmlFor="shipment_prices"
                                       className={`block text-sm font-medium text-${theme}-700`}>
                                    {trans('shipment_prices')}
                                </label>
                                <div className="mt-1 flex flex-row flex-1 items-center">
                                    <input
                                        onChange={e => setData('shipment_prices', e.target.files[0])}
                                        type="file"
                                        name="shipment_prices"
                                        id="shipment_prices"
                                        autoComplete="shipment_prices"
                                        className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                    />
                                    <img className={`h-20 w-20 bg-cover rounded-md`}
                                         src={getImageThumb(setting.shipment_prices)}
                                         alt=""/>
                                </div>
                                <ToolTipWidget message={trans('shipment_prices_instruction')}/>
                                <p className={`text-xs text-red-500 rtl:text-left ltr:text-right`}>
                                    {trans('shipment_prices_best_fit')}
                                </p>
                                <p className={`mt-2 text-xs text-${theme}-500`}>
                                    {errors.shipment_prices &&
                                    <div className={`text-red-600`}>{errors.shipment_prices}</div>}
                                </p>
                            </div>
                        </div>


                        <FormBtns type={'setting'}/>
                    </div>


                    <div
                        className={classNames(currentFormTab.id !== 2 ? 'hidden' : '', `flex flex-1 flex-col px-20 sm:px-10 space-y-4`)}>

                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start pt-10">
                            <div className="mt-1 sm:mt-0 sm:col-span-full">
                                <div
                                    className="w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
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
                                            </label>
                                            <p className="pl-1">
                                                <input
                                                    onChange={e => handleImages(e.target.files)}
                                                    type="file"
                                                    multiple
                                                    name="images"
                                                    id="more_images"
                                                    autoComplete="more_images"
                                                    className={`focus:ring-${theme}-500 focus:border-${theme}-500 block w-full sm:text-sm border-${theme}-300 rounded-md`}
                                                />
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FormBtns type={'setting'}/>
                        <ImagesList images={setting.images} id={setting.id} type={'setting'}/>
                    </div>
                </form>
            </FormTabsContainer>
        </BackendContainer>
    )
}
