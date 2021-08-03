import React, {useContext} from 'react';
import {truncate} from 'lodash';
import GlobalContext from "../../context/GlobalContext";

const LocalizedText = ({
                           ar,
                           en,
                           capitalize = false,
                           textClasses = '',
                           length = 18,
                           separator = true,
                       }) => {
    const {locale} = useContext(GlobalContext);

    return (
        <span className={`${capitalize ? 'capitalize' : ''} ${textClasses}`}>
      {truncate(locale === 'ar' ? ar : en, {
          length,
          omission: separator ? '..' : '',
      })}
    </span>
    );
};

export default LocalizedText;
