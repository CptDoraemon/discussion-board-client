import {useEffect, useRef, useState} from "react";
import Quill from "quill";
import loadImage from "blueimp-load-image";

const useEditor = (ID: string) => {
    const [quill, setQuill] = useState<Quill | null>(null);
    const objectURLs = useRef<string[]>([]);

    const setContent = (content: string) => {
        if (!quill) return;
        const delta = quill.clipboard.convert(content);
        quill.setContents(delta)
    };

    const getObjectURLArray = () => {
        return objectURLs.current
    };

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
                    ['link', 'image', 'code-block']
                ],
                clipboard: {
                    matchVisual: false
                }
            },
            placeholder: 'Compose an epic...',
            theme: 'snow',  // or 'bubble'
            scrollingContainer: 'html'
        });
        quillInstance.getModule('toolbar').addHandler('image', () => imageUploadHandler(quillInstance, objectURLs.current));
        setQuill(quillInstance);
    }, [ID]);

    return [quill, getObjectURLArray, setContent] as [typeof quill, typeof getObjectURLArray, typeof setContent]
};

const imageUploadHandler = (editor: Quill, objectURLs: string[]) => {
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
                    const cursorPosition = range ? range.index : 0;
                    editor.insertEmbed(cursorPosition, 'image', `${objectURL}`);
                    editor.setSelection(cursorPosition + 1, 0, 'api');
                    objectURLs.push(objectURL);
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
