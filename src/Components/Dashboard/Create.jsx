import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { sendImages } from '@/api/post';

export default function Create() {
    const webRef = useRef(null);
    const [dataSet, setDataSet] = useState([]);

    const makeDataset = () => {
        const newDataSet = [];

        for (let index = 0; index < 50; index++) {
            let capture = webRef.current.getScreenshot();
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = avg;
                    data[i + 1] = avg;
                    data[i + 2] = avg;
                }

                ctx.putImageData(imageData, 0, 0);

                const dataUrl = canvas.toDataURL();
                const base64Data = dataUrl.replace(/^data:image\/(png|jpg);base64,/, '');
                newDataSet.push(base64Data);
                setDataSet(newDataSet);
            };
            img.src = capture;
        }
        alert("done")
    };

    const onSubmit = () => {
        sendImages(dataSet)
    }

    return (
        <div>
            <Webcam ref={webRef} />
            <button onClick={() => makeDataset()} type="button">
                Capture
            </button>
            <button onClick={() => onSubmit()} type="button">
                Send
            </button>
            <button onClick={() => onDelete()} type="button">
                Delete
            </button>
        </div>
    );
}