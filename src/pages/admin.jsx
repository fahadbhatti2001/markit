import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import * as faceapi from 'face-api.js';
import { createCanvasFromMedia } from 'canvas';


export default function admin() {
  const [faceDataArray, setFaceDataArray] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    // Load face-api.js models
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/weights/tiny_face_detector_model-weights_manifest.json'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/weights/'),
      faceapi.nets.faceRecognitionNet.loadFromUri('/weights/'),
    ]);
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    // Access the user's camera and capture a video stream
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Add event listeners to the video stream to capture images at regular intervals
      setInterval(async () => {
        // Capture an image from the video stream
        const image = createCanvasFromMedia(video).getContext('2d').getImageData(0, 0, video.videoWidth, video.videoHeight);

        // Use face detection to detect faces in the captured image
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();

        // Use face recognition to compute a face descriptor for each detected face
        const descriptors = detections.map((d) => d.descriptor);

        // Store the face descriptors along with a unique identifier for each face
        const faceData = {
          id: 'student_1', // replace with the student's ID or name
          descriptors: descriptors,
        };

        // Add the face data to the array
        setFaceDataArray((prevArray) => [...prevArray, faceData]);
      }, 2000); // Capture an image every 2 seconds
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Save the face data to Firebase
    const jsonString = JSON.stringify(faceDataArray);
    firestore.collection('face-data').doc('student_1').set({ data: jsonString });
    setFaceDataArray([]);
  };

  return (
    <div>
      {isRecording ? (
        <button onClick={stopRecording}>Stop Recording</button>
      ) : (
        <button onClick={startRecording}>Start Recording</button>
      )}
    </div>
  );
};
