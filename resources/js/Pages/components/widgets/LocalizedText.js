import { map, filter  } from 'lodash';
const LocalizedText = ({ locale , text , trans }) => {
    console.log('trans', trans);
    console.log(filter(trans.ar, t => t === 'home'))
    return (
        <span></span>
    );
}

export default LocalizedText;
