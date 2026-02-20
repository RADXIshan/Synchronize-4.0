import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import Masonry from 'react-masonry-css';
import ComingSoon from '../components/ComingSoon';
// import { galleryImages } from '../utils/galleryData'; // Assuming this exists or was inline

// gsap.registerPlugin(ScrollTrigger);

const GalleryPage = () => {
  /*
  const [selectedImage, setSelectedImage] = useState(null);
  const [theme, setTheme] = useState('spiderman'); // 'spiderman' or 'venom'
  
  // ... (Original logic)
  */

  return (
    <div id="gallery" className="min-h-screen bg-black pt-20 relative overflow-hidden text-white font-sans selection:bg-red-600 selection:text-white">
        <ComingSoon title="GALLERY" subtitle="Photos developing in the darkroom..." />

      {/* 
      --- ORIGINAL CONTENT HIDDEN FOR NOW ---

      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          <div className={`absolute inset-0 bg-linear-to-br ${theme === 'spiderman' ? 'from-red-900/30 to-blue-900/30' : 'from-gray-900 via-black to-gray-900'}`}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pb-20">
         <div className="text-center mb-12 transform hover:scale-105 transition-transform duration-500">
            <h1 className="text-6xl md:text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-red-500 to-red-900 drop-shadow-[0_5px_5px_rgba(255,0,0,0.5)]">
              CAPTURES
            </h1>
            <div className="h-2 w-32 bg-yellow-400 mx-auto mt-4 skew-x-[-20deg]"></div>
         </div>

         {/* Filter / Theme Toggle */}
         {/*
         <div className="flex justify-center mb-12 gap-8">
             <button 
                onClick={() => setTheme('spiderman')}
                className={`px-8 py-3 font-black text-xl border-4 transform skew-x-[-10deg] transition-all duration-300 ${theme === 'spiderman' ? 'bg-red-600 border-red-800 text-white scale-110 shadow-[5px_5px_0px_#000]' : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}`}
             >
                 HEROIC
             </button>
             <button 
                onClick={() => setTheme('venom')}
                className={`px-8 py-3 font-black text-xl border-4 transform skew-x-[-10deg] transition-all duration-300 ${theme === 'venom' ? 'bg-black border-white text-white scale-110 shadow-[5px_5px_0px_#fff]' : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}`}
             >
                 VILLAINOUS
             </button>
         </div>
         */}

         {/*
         <Masonry
            breakpointCols={{default: 3, 1100: 2, 700: 1}}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
         >
            {/* Gallery Items would map here *}
             {/* ... *}
         </Masonry>
         */}
      {/* 
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl w-full max-h-[90vh] border-4 border-white transform rotate-1 bg-black shadow-[0_0_50px_rgba(255,0,0,0.2)]">
            <button className="absolute -top-6 -right-6 w-12 h-12 bg-red-600 text-white font-black text-xl rounded-full border-4 border-black hover:scale-110 transition-transform z-50">
                X
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} className="w-full h-full object-contain max-h-[80vh]" />
          </div>
        </div>
      )}
      */}

      <style>{`
        .clip-path-notch {
          clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - 10px),
            calc(100% - 10px) 100%,
            0 100%
          );
        }
      `}</style>
    </div>
  );
};

export default GalleryPage;