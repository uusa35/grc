import {map} from 'lodash';
import {useContext, useMemo, useState} from "react";
import {AppContext} from "../../../../context/AppContext";
import ImageGallery from "react-image-gallery";

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
                // thumbnailClass : 'shadow-lg border-2 border-gray-800',
                // originalClass : 'rounded-md',
                // additionalClass : 'rounded-md',
                // thumbnailLabel : img[getLocalized()],
                description:
                    <div className="flex flex-1 flex-col space-y-4 truncate capitalize p-5 w-auto h-auto">
                        <h1>{img[getLocalized()]}</h1>
                        <p>
                            {img[getLocalized('description')]}
                        </p>
                    </div>
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
