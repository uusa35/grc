import PropTypes from 'prop-types';

export default function EmbeddedHtml({ html }) {
    return <div  className="overflow-hidden" dangerouslySetInnerHTML={{__html: html}}></div>;
}

EmbeddedHtml.propTypes = {
    html: PropTypes.any.isRequired,
};
