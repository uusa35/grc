import {HeartIcon} from "@heroicons/react/outline";
import {useContext, useEffect, useMemo, useState} from "react";
import {AppContext} from "../../../context/AppContext";
import GlobalContext from "../../../context/GlobalContext";
import route from "ziggy-js";
import {useForm} from "@inertiajs/inertia-react";
import {split, last, lowerCase, filter, isEmpty, map, includes, capitalize} from "lodash";
import {toast} from "react-toastify";
import {Inertia} from "@inertiajs/inertia";
import {useDispatch, useSelector} from "react-redux";
import {setAuth} from "../../../redux/actions";

export default function ElementFavoriteBtn({type, id}) {
    const {trans, guest} = useContext(AppContext)
    const { auth } = useContext(GlobalContext);
    const [currentFavorite, setCurrentFavorite] = useState(false);
    const [favoritelist, setFavoriteList] = useState();
    const dispatch = useDispatch();
    const {data, setData, post, progress, } = useForm({
        model: type,
        'element_id': id,
    });

    const submit = (e) => {
        e.preventDefault()
        if (!guest) {
            post(route('frontend.favorite.store'), {
                onSuccess : () => {
                    Inertia.reload({only: ['auth']});
                }
            });
        }
    }

    useEffect(() => {
        if (!guest && !isEmpty(auth.favoritesList)) {
            const favorites = map(auth.favoritesList, f => {
                return {type: lowerCase(last(split(f.favoritable_type, "\\"))), favoritable_id: f.favoritable_id}
            });
            const filtred = filter(favorites, f => f.type === type);
            const ids = map(filtred, f => f.favoritable_id);
            setFavoriteList(ids)
            setCurrentFavorite(includes(ids, id))
            dispatch(setAuth(auth));
        }
    },[auth])

    return (
        <form onSubmit={submit}>
            <button
                onClick={() => {
                    setCurrentFavorite(!currentFavorite);
                    guest ?
                        toast.error(capitalize(trans('u_have_to_register_first')))
                        : toast.success(capitalize(trans('process_success')))
                }}
                type="submit"
                className="flex py-3 px-3 rounded-full flex items-center justify-center text-gray-100 hover:bg-gray-100 hover:text-gray-500 bg-gray-50"
            >
                <HeartIcon fill={currentFavorite ? 'red' : 'white'} className="h-6 w-6 flex-shrink-0 text-red-900"
                           aria-hidden="true"/>
                <span className="sr-only">{trans('add_to_favorite')}</span>
            </button>
        </form>
    );
}
