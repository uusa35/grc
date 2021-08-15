import FrontendContainer from "../components/FrontendContainer";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import route from 'ziggy-js';
import {Link} from "@inertiajs/inertia-react";
import {getConvertedFinalPrice} from "../../helpers";
import Pagination from "../../Backend/components/partials/Pagination";
import NormalCourseWidget from "../components/widgets/course/NormalCourseWidget";

export default function FrontendCourseIndex({elements}) {
    const {getThumb, trans, getLocalized, currency} = useContext(AppContext);
    return (
        <FrontendContainer>
            <Pagination
                type={'course'}
                total={elements.total}
                links={elements.links}
                showSearch={false}
            />
            <div className="bg-white max-w-2xl mx-auto py-16 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">{trans('products')}</h2>
                <div
                    className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {elements.data.map((element) => (
                        <NormalCourseWidget element={element}/>
                    ))}
                    <Pagination
                        type={'course'}
                        total={elements.total}
                        links={elements.links}
                        showSearch={false}
                    />
                </div>
            </div>
        </FrontendContainer>
    );
}
