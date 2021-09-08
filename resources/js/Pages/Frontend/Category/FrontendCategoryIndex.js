import FrontendContainer from "../components/FrontendContainer";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import Pagination from "../../Backend/components/partials/Pagination";
import CategoryWidget from "../components/widgets/category/CategoryWidget";
import { map } from 'lodash';
import MetaElement from "../../Backend/components/partials/MetaElement";

export default function FrontendCategoryIndex({elements}) {
    const { trans } = useContext(AppContext);

    return (
        <FrontendContainer>
            <Pagination
                type={'category'}
                total={elements.meta.total}
                links={elements.meta.links}
                showSearch={false}
            />
            <div className="bg-white max-w-2xl mx-auto py-16 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">{trans('products')}</h2>
                <div className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {map(elements.data,(element) => (
                        <CategoryWidget element={element} type={'book'} key={element.id}/>
                    ))}
                    <Pagination
                        type={'category'}
                        total={elements.total}
                        links={elements.links}
                        showSearch={false}
                    />
                </div>
            </div>
        </FrontendContainer>
    );
}
