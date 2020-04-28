import {useEffect, useState} from "react";
import Quill from "quill";
import loadImage from "blueimp-load-image";

const objectURLArray: string[] = [];

const useEditor = (ID: string) => {
    const [quill, setQuill] = useState<Quill | null>(null);

    useEffect(() => {
        // override methods to support objectURL
        const Image = Quill.import('formats/image');
        const Link = Quill.import('formats/link');
        Image.sanitize = function(url: string) {
            return Link.sanitize(url, ['http', 'https', 'data']) ? url : '//:0';
        };
        //
        const quillInstance = new Quill(`#${ID}`, {
            modules: {
                toolbar: [
                    [{header: [1, 2, false]}],
                    ['bold', 'italic', 'underline'],
                    ['image', 'code-block']
                ]
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'  // or 'bubble'
        });
        quillInstance.getModule('toolbar').addHandler('image', () => imageUploadHandler(quillInstance));

        setQuill(quillInstance)
    }, [ID]);

    const getObjectURLArray = () => {
        return objectURLArray
    };

    const setContent = (content: string) => {
        if (!quill) return;
        const delta = quill.clipboard.convert(content);
        quill.setContents(delta)
    };

    return [quill, getObjectURLArray, setContent] as [typeof quill, typeof getObjectURLArray, typeof setContent]
};

const imageUploadHandler = (editor: Quill) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = () => {
        if (!input.files) return;
        const image = input.files[0];
        loadImage(
            image,
             (canvas) => {
                // @ts-ignore
                canvas.toBlob((blob) => {
                    const objectURL = URL.createObjectURL(blob);

                    const range = editor.getSelection();
                    if (range) {
                        editor.insertEmbed(range.index, 'image', `${objectURL}`);
                        objectURLArray.push(objectURL)
                    }
                }, 'image/jpeg');
            },
            {
                orientation: true,
                canvas: true
            }
        );
    }
};

export default useEditor;