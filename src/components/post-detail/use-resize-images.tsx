import {RefObject, useEffect} from "react";

const MAX_HEIGHT = Math.max(window.innerHeight * 0.6, 200);

const useResizeImages = (containerRef: RefObject<HTMLDivElement>, loaded: boolean) => {
    useEffect(() => {
        if (!loaded || !containerRef.current) return;
        const container = containerRef.current;
        const imgs = container.getElementsByTagName('img');
        const maxWidth = container.getBoundingClientRect().width;
        for (let i=0; i<imgs.length; i++) {
            const img = imgs[i] as HTMLImageElement;

            if (img.naturalWidth) {
                _resize(img, maxWidth)
            } else {
                img.onload = () => {
                    _resize(img, maxWidth)
                }
            }
        }

    }, [loaded, containerRef]);
};

const _resize = (img: HTMLImageElement, maxWidth: number) => {
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const ratio = naturalHeight / naturalWidth;
    const resizedHeight = maxWidth * ratio;

    if (resizedHeight > MAX_HEIGHT) {
        img.setAttribute('style', `height: ${MAX_HEIGHT}px; width: auto;`)
    } else {
        img.setAttribute('style', `width: ${maxWidth}px; height: auto;`)
    }
};

export default useResizeImages