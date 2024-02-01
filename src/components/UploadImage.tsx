import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUpload({images,setImages}:any) {
  const [uploadedImages, setUploadedImages] = useState([]);
  useEffect(() => {
    console.log(uploadedImages);
    uploadedImages.map((image:any) => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBase64String = reader.result;
            console.log(fileAsBase64String);
            setImages((prev:any) => [...prev,fileAsBase64String])
            
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.readAsDataURL(image);
    })
  },[uploadedImages])

  const onDrop = (acceptedFiles:any) => {
    // Handle the uploaded files here
    setUploadedImages(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true, // Allow multiple file uploads
    accept:{
      'image/jpeg': [],
      'image/png': []
    }
  });

  return (
    <div className='text-gray-400'>
      <div {...getRootProps()} className={`dropzone flex justify-center items-center ${isDragActive ? 'active' : ''}`}>
        <input {...getInputProps()} />
        <div className='h-20 w-20 rounded-sm bg-gray-100 text-gray-600 flex justify-center items-center'>
            <ArrowUpTrayIcon className='h-10 w-10 mx-auto' />
        </div>
      </div>
      {uploadedImages.length > 0 && (
        <div>
          <h2>Uploaded Images:</h2>
          <ul>
            {uploadedImages.map((file:any, index:any) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
      {images.length > 0 && (
        <div>
          <ul className='grid grid-cols-3 gap-2'>
            {images.map((file:any, index:any) => (
              <li key={index}>
                <img src={file} alt="" className='w-20 h-20 rounded-sm' />
              </li>
            ))}
          </ul>
        </div>
      )
      }
    </div>
  );
}

export default ImageUpload;
