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
    const {trans , contentBgColor, textColor , mainColor } = useContext(AppContext);
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
                <div className={` ${contentBgColor} max-w-2xl mx-auto py-5 px-4 sm:py-5 sm:px-6 lg:max-w-full lg:px-8`}>
                    <div className={`${contentBgColor} flex flex-1 flex-col sm:flex-row justify-start items-end border-b border-gray-200 pb-5`}>
                        <div className="flex flex-1 flex-col w-full sm:w-auto">
                            <h1 className={`text-4xl font-extrabold tracking-tight ${textColor} capitalize`}>{trans('categories')}</h1>
                            <p className={`mt-4 text-base text-${mainColor}-800 dark:text-${mainColor}-50 capitalize`}>
                                {trans('list')} {trans('categories')}
                            </p>
                        </div>
                        <FrontendPagination
                            type={'category'}
                            total={elements.meta.total}
                            links={elements.meta.links}
                            showSearch={false}
                        />
                    </div>
                    <div
                        className="grid grid-cols-1 gap-y-14 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 py-6">
                        {map(elements.data, (element) => (
                            <CategoryWidget element={element} type={type} key={element.id}/>
                        ))}
                    </div>
                    <FrontendPagination
                        type={'category'}
                        total={elements.meta.total}
                        links={elements.meta.links}
                        showSearch={false}
                    />
                </div>
            </FrontendContentContainer>
        </FrontendContainer>
    );
}
