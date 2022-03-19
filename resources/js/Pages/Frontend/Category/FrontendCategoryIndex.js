import FrontendContainer from "../components/FrontendContainer";
import React, {useContext, useMemo, useState} from "react";
import {AppContext} from "../../context/AppContext";
import CategoryWidget from "../components/widgets/category/CategoryWidget";
import {map} from 'lodash';
import FrontendPagination from "../partials/FrontendPagination";
import SubMetaElement from "../../Backend/components/partials/SubMetaElement";
import FrontendContentContainer from "../components/FrontendContentContainer";
import route from 'ziggy-js';

export default function FrontendCategoryIndex({elements}) {
    const {trans , contentBgColor} = useContext(AppContext);
    const {params} = route();
    const [type, setType] = useState('book')

    useMemo(() => {
        if (params && params.is_course) {
            setType('course');
        } else if (params && params.is_service) {
            setType('service')
        } else if (params && params.is_product) {
            setType('product')
        } else if (params && params.is_user) {
            setType('user')
        } else if (params && params.is_book) {
            setType('book')
        }
    }, [])

    return (
        <FrontendContainer>
            <FrontendContentContainer>
                <SubMetaElement title={trans('categories')}/>
                <FrontendPagination
                    type={'category'}
                    total={elements.meta.total}
                    links={elements.meta.links}
                    showSearch={false}
                />
                <div className={` ${contentBgColor} max-w-2xl mx-auto py-16 px-4 sm:py-14 sm:px-6 lg:max-w-7xl lg:px-8`}>
                    <h2 className="sr-only">{trans('products')}</h2>
                    <div
                        className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {map(elements.data, (element) => (
                            <CategoryWidget element={element} type={type} key={element.id}/>
                        ))}
                    </div>
                </div>
                <FrontendPagination
                    type={'category'}
                    total={elements.meta.total}
                    links={elements.meta.links}
                    showSearch={false}
                />
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
