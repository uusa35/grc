import {map, size } from 'lodash';
import {useContext, useMemo, useState} from "react";
import {AppContext} from "../../../../context/AppContext";
import ImageGallery from "react-image-gallery";
import route from 'ziggy-js';

export default function({elements}) {
    const {getLarge, getThumb, getLocalized} = useContext(AppContext)
    const [currentImages, setCurrentImages] = useState([]);

    useMemo(() => {
        const images = [];
        map(elements, img => {
            images.push({
                thumbnail: getThumb(img.image), original: getLarge(img.image),
                originalAlt: img[getLocalized()],
                thumbnailAlt: img[getLocalized()],
                originalTitle: img[getLocalized()],
                thumbnailTitle: img[getLocalized()],
                originalWidth: 1950,
                originalHeight: 750,
                thumbnailWidth: 92,
                thumbnailHeight: 36,
                loading: 'lazy',
                thumbnailLoading: 'lazy',
                // thumbnailClass : 'shadow-lg border-2 border-gray-800',
                originalClass: 'object-contain',
                // additionalClass : 'rounded-md',
                // thumbnailLabel : img[getLocalized()],
                description:
                    (img[getLocalized('description')] && size(img[getLocalized('description')]) > 5) || (img[getLocalized()] && size(img[getLocalized()]) > 5) ?
                        <a
                            href={route().has(`frontend.${img.type}.show`) ? route(`frontend.${img.type}.show`, {id: img.slidable_id}) : (img.url ? img.url : '#')}
                            className="flex flex-1 flex-col space-y-4 truncate capitalize p-5 w-auto h-auto">
                            <h1>{img[getLocalized()]}</h1>
                            {
                                img[getLocalized('description')] && size(img[getLocalized('description')]) > 5 && <p>
                                    {img[getLocalized('description')]}
                                </p>
                            }
                        </a> : null
            })
        })
        setCurrentImages(images);
    }, [elements])

    return (
        <ImageGallery
            lazyLoad={true}
            showBullets={true}
            showNav={false}
            showThumbnails={true}
            useBrowserFullscreen={true}
            useTranslate3D={true}
            showIndex={true}
            autoPlay={true}
            showFullscreenButton={false}
            showPlayButton={false}
            thumbnailPosition={'bottom'}
            items={currentImages}/>
    );
};
