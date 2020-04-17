import {RefObject, useEffect, useState} from "react";

const WIDTH = 500;
const HEIGHT = 500;
// try to size the wrapper within the constraints
// target is no bigger than WIDTH * HEIGHT
// on smaller screens (maxWidth < WIDTH) the target is SHORTER_EDGE * SHORTER_EDGE

const useResizeImage = (ref: RefObject<HTMLDivElement>, src: string) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const loadImage = () => {
        const image = new Image();
        image.src = src;
        image.onload = () => resize(image)
    };

    const resize = (image: HTMLImageElement) => {
        if (!src || !ref.current) return;
        const containerWidth = ref.current.getBoundingClientRect().width;
        const [finalWidth, finalHeight] = getWidthHeight(containerWidth, image.naturalWidth, image.naturalHeight);

        setWidth(finalWidth);
        setHeight(finalHeight);
    };

    useEffect(() => {
        loadImage()
    }, [ref, src]);

    return [width, height] as [typeof width, typeof height]
};

const getWidthHeight = (containerWidth: number, imageNaturalWidth: number, imageNaturalHeight: number) => {
    const maxWidth = Math.min(WIDTH, containerWidth) || 1;
    const maxHeight = maxWidth;

    let width = 1;
    let height = 1;
    if (imageNaturalWidth >= imageNaturalHeight) {
        width = maxWidth;
        height = (width / imageNaturalWidth) * imageNaturalHeight
    } else {
        height = maxHeight;
        width = (height / imageNaturalHeight) * imageNaturalWidth
    }

    // do no enlarge
    const finalWidth = Math.min(imageNaturalWidth, Math.round(width));
    const finalHeight = Math.min(imageNaturalHeight, Math.round(height));

    return [finalWidth, finalHeight] as [typeof finalWidth, typeof finalHeight]
};

export {
    useResizeImage as default,
    getWidthHeight
}