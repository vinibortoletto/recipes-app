import React from 'react';
import loadingGif from '../images/loading.webp';

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <img
        src={ loadingGif }
        alt="imagem de um fouet mexendo em uma tigela"
        className="w-40"
      />
    </div>
  );
}
