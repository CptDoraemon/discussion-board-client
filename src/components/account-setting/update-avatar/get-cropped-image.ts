import {Crop} from "react-image-crop";
import EXIF from "exif-js/exif";

const SIZE = 800;

function getCroppedImg(image: HTMLImageElement, crop: Crop, fileName: string) {
    const [x, y, width, height] = [crop.x, crop.y, crop.width, crop.height].map(_ => _ === undefined ? 1 : _);

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise<Blob>(async (resolve, reject) => {
        try {
            await rotateAsPerExif(image, ctx, canvas.width, canvas.height);
            ctx.drawImage(
                image,
                x * scaleX,
                y * scaleY,
                width * scaleX,
                height * scaleY,
                0,
                0,
                SIZE,
                SIZE,
            );
            canvas.toBlob(blob => {
                if (blob) {
                    resolve(blob);
                }
            }, 'image/jpeg', 1);
        } catch (e) {
            throw e
        }
    });
}

const rotateAsPerExif = (image: HTMLImageElement, ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        EXIF.getData(image, function(this: HTMLImageElement) {
            console.log(ctx)
            const orientation = EXIF.getTag(this,"Orientation");
            switch (orientation) {
                case 2: ctx.translate(canvasWidth, 0);     ctx.scale(-1,1); break;
                case 3: ctx.translate(canvasWidth,canvasHeight); ctx.rotate(Math.PI); break;
                case 4: ctx.translate(0,canvasHeight);     ctx.scale(1,-1); break;
                case 5: ctx.rotate(0.5 * Math.PI);   ctx.scale(1,-1); break;
                case 6:
                    ctx.rotate(0.5 * Math.PI);
                    ctx.translate(0,-canvasHeight);
                    break;
                case 7: ctx.rotate(0.5 * Math.PI);   ctx.translate(canvasWidth,-canvasHeight); ctx.scale(-1,1); break;
                case 8: ctx.rotate(-0.5 * Math.PI);  ctx.translate(-canvasWidth,0); break;
            }
            resolve()
        })
    })
};

export default getCroppedImg