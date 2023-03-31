/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, NextRouter } from 'next/router';
import Cookies from 'universal-cookie';

export default function DiseasePrediction() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(setSelectedImage));
    }
  }, [selectedImage]);

  return (
    <>
      <div className={`p-4 w-3/4 text-black`}>
        <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="block" onChange={(e) => setSelectedImage(e.target.files[0])} />
            </label>
        </div> 
        <p className='my-5'>Kết quả dự đoán tỉ lệ: <span className='text-red-600'>0.83289922</span> (Mẫu)</p>
        <p className='my-5'>Kết quả dự đoán bằng chữ: <span className='text-red-600'>Có Bệnh</span> (Mẫu)</p>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">forecasts</button>
      </div>
    </>
  );
}
