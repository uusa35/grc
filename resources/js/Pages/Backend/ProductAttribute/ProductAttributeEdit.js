import BackendContainer from "../components/containers/BackendContainer";
import route from 'ziggy-js';
import {useForm, usePage} from "@inertiajs/inertia-react";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import ToolTipWidget from "../components/widgets/ToolTipWidget";
import FormBtns from "../components/widgets/form/FormBtns";

export default function({attribute, colors, sizes}) {
    const {trans, getLocalized} = useContext(AppContext);
    const {data, setData, put, progress} = useForm({
        'color_id': attribute.color_id,
        'size_id': attribute.size_id,
        'product_id': attribute.product_id,
        'qty': attribute.qty,
        'price': attribute.price,
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
        put(route(`backend.attribute.update`, attribute.id));
    }

    return (
        <BackendContainer mainModule={'product'}>
            <div className="flex flex-col bg-white shadow-md rounded-md">
                <form
                    onSubmit={submit}
                    method="post"
                    encType="multipart/form-data"
                    className={`w-full px-10 space-y-3 mb-6`}>
                    <div className="space-y-4 divide-y 900">
                        <div className={`pt-4`}>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">{trans('create')} {trans('product_attribute')}</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {trans('create')} {trans('product_attribute')}
                            </p>
                        </div>
                        <div className="pt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            {/* size id */}
                            <div className="sm:col-span-2">
                                <label htmlFor="size_id"
                                       className="block text-sm font-medium text-gray-800">
                                    {trans('size')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        required
                                        id="size_id"
                                        name="size_id"
                                        autoComplete="size_id"
                                        defaultValue={attribute.size_id}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    >
                                        {
                                            sizes.map(u => (
                                                <option key={u.id}
                                                        value={u.id}
                                                >{u[getLocalized('name')]}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <ToolTipWidget message={trans('product_user_instruction')}/>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {trans('size_or_capacity')}
                                    {errors.size_id &&
                                    <div className={`text-red-900`}>{errors.size_id}</div>}
                                    {errors.product_id &&
                                    <div className={`text-red-900`}>{errors.product_id}</div>}
                                </p>
                            </div>
                            {/* color_id */}
                            <div className="sm:col-span-2">
                                <label htmlFor="color_id"
                                       className="block text-sm font-medium text-gray-800">
                                    {trans('color')}
                                </label>
                                <div className="mt-1">
                                    <select
                                        onChange={handleChange}
                                        required
                                        id="color_id"
                                        name="color_id"
                                        autoComplete="color_id"
                                        defaultValue={attribute.color_id}
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    >
                                        {
                                            colors.map(u => (
                                                <option key={u.id} value={u.id}
                                                >{u[getLocalized('name')]}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <ToolTipWidget message={trans('product_user_instruction')}/>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.color_id &&
                                    <div className={`text-red-900`}>{errors.color_id}</div>}
                                </p>
                            </div>
                            {/* qty */}
                            <div className="sm:col-span-2 has-tooltip">
                                <label htmlFor="qty" className={`block text-sm font-medium text-gray-800`}>
                                    {trans('qty')} {trans('available')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        step="any"
                                        name="qty"
                                        defaultValue={attribute.qty}
                                        id="qty"
                                        autoComplete="qty"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_qty_instruction')}/>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.qty && <div className={`text-red-900`}>{errors.qty}</div>}
                                </p>
                            </div>
                            {/* price */}
                            <div className="sm:col-span-2">
                                <label htmlFor="price" className={`block text-sm font-medium text-gray-800`}>
                                    {trans('price')}
                                </label>
                                <div className="mt-1">
                                    <input
                                        onChange={handleChange}
                                        required
                                        type="number"
                                        step="any"
                                        name="price"
                                        defaultValue={attribute.price}
                                        id="price"
                                        autoComplete="price"
                                        className={`shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md`}
                                    />
                                </div>
                                <ToolTipWidget message={trans('product_price_instruction')}/>
                                <p className={`mt-2 text-xs text-gray-500`}>
                                    {errors.price && <div className={`text-red-900`}>{errors.price}</div>}
                                </p>
                            </div>
                        </div>
                        <FormBtns type={'product'}/>
                    </div>
                </form>
            </div>
        </BackendContainer>
    )
}
