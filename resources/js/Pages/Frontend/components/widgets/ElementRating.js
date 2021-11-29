import {StarIcon} from "@heroicons/react/solid";
import {useContext, useMemo, useState} from "react";
import {calculateRating} from "../../../helpers";
import {AppContext} from "../../../context/AppContext";
import GlobalContext from "../../../context/GlobalContext";
import {Link, useForm, usePage} from "@inertiajs/inertia-react";
import {random, range, map, capitalize} from "lodash";
import route from 'ziggy-js'
import {toast} from 'react-toastify';

export default function ElementRating({ratings, id, type = ''}) {
    const {classNames, trans, guest} = useContext(AppContext)
    const [currentRating, setCurrentRating] = useState(0)
    const {data, setData, post, progress} = useForm({
        model: type,
        'element_id': id,
        'value': currentRating
    });

    useMemo(() => {
        setCurrentRating(calculateRating(ratings))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        post(route('frontend.rating.store'));
    }

    return (
        <div className="mt-3">

            <h3 className="sr-only">{trans('ratings')}</h3>
            <div className="flex items-center">
                <div className="flex items-center"
                     onClick={() => {
                         guest ?
                             toast.error(capitalize(trans('u_have_to_register_first')))
                         : toast.success(capitalize(trans('process_success')))
                     }}
                         >
                         <form onSubmit={submit} method={'post'}>
                     {map(range(1,6) ,rating => (
                         <button
                         key={rating}
                         disabled={guest}
                         type='submit'
                         onClick={() => {
                         setData('value', (rating* 20))
                         setCurrentRating(rating)
                     }}>
                         <StarIcon
                         key={rating}
                         className={classNames(
                         currentRating >= rating ? 'text-yellow-400' : 'text-gray-300',
                         'h-5 w-5 flex-shrink-0 hover:text-yellow-400'
                         )}
                         aria-hidden="true"
                         />
                         </button>
                         ))}
                         </form>
                         </div>
                         <p className="sr-only">{currentRating} out of 5 stars</p>
                         </div>
                         </div>
                         );
                     }
