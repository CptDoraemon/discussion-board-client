import {Crop} from "react-image-crop";

const SIZE = 800;

function getCroppedImg(image: HTMLImageElement, crop: Crop, fileName: string) {
    const [x, y, width, height] = [crop.x, crop.y, crop.width, crop.height].map(_ => _ === undefined ? 1 : _);

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
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

    // As Base64 string
    // const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(blob => {
            console.log(blob);
            if (blob)
            // blob.name = fileName;
            resolve(blob);
        }, 'image/jpeg', 1);
    });
}

export default getCroppedImg