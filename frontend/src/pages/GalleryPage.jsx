import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ArrowLeft, X, RotateCcw } from 'lucide-react';
import LoadingAnimation from '../components/LoadingAnimation';

const GalleryPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [draggedPositions, setDraggedPositions] = useState({});
  const titleRef = useRef(null);
  const polaroidsRef = useRef([]);
  const loaderRef = useRef(null);
  const dragState = useRef({});

  const galleryImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600", caption: "Opening Ceremony", date: "Jan 2024" },
    { id: 2, url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=1000", caption: "Tech Workshop", date: "Jan 2024" },
    { id: 3, url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=1200", caption: "Hackathon Night", date: "Jan 2024" },
    { id: 4, url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=700", caption: "Team Building", date: "Jan 2024" },
    { id: 5, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600", caption: "Keynote Speech", date: "Jan 2024" },
    { id: 6, url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=900", caption: "Networking", date: "Jan 2024" },
    { id: 7, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=1100", caption: "Awards Night", date: "Jan 2024" },
    { id: 8, url: "https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=650", caption: "Cultural Show", date: "Jan 2024" },
    { id: 9, url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=800", caption: "Code Sprint", date: "Jan 2024" },
    { id: 10, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600", caption: "Collaboration", date: "Jan 2024" },
    { id: 11, url: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=1000", caption: "Innovation Hub", date: "Jan 2024" },
    { id: 12, url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=700", caption: "Team Spirit", date: "Jan 2024" },
  ];

  const getRandomRotation = (index) => {
    const rotations = [-8, -5, -3, 3, 5, 8, -6, 4, -4, 6, -7, 7];
    return rotations[index % rotations.length];
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const loaderTimeline = gsap.timeline({
      onComplete: () => setLoading(false)
    });

    loaderTimeline.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 2.2,
      ease: "power2.inOut"
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(polaroidsRef.current,
        { opacity: 0, scale: 0.5, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "back.out(1.4)",
          delay: 0.2
        }
      );
    }
  }, [loading]);

  const handleMouseDown = (e, id, index) => {
    if (e.target.closest('.polaroid-image-wrapper')) return;
    
    e.preventDefault();
    const element = polaroidsRef.current[index];
    const rect = element.getBoundingClientRect();
    
    dragState.current[id] = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      currentX: draggedPositions[id]?.x || 0,
      currentY: draggedPositions[id]?.y || 0,
      element: element
    };

    element.style.cursor = 'grabbing';
    element.style.zIndex = '1000';
  };

  const handleMouseMove = (e) => {
    Object.keys(dragState.current).forEach(id => {
      const state = dragState.current[id];
      if (state?.isDragging) {
        const deltaX = e.clientX - state.startX;
        const deltaY = e.clientY - state.startY;
        
        setDraggedPositions(prev => ({
          ...prev,
          [id]: {
            x: state.currentX + deltaX,
            y: state.currentY + deltaY
          }
        }));
      }
    });
  };

  const handleMouseUp = (id) => {
    if (dragState.current[id]) {
      dragState.current[id].element.style.cursor = 'grab';
      dragState.current[id].element.style.zIndex = '';
      dragState.current[id].isDragging = false;
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => {
      Object.keys(dragState.current).forEach(id => handleMouseUp(id));
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [draggedPositions]);

  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
    document.body.classList.remove('modal-open');
  };

  const resetPositions = () => {
    setDraggedPositions({});
    gsap.fromTo(polaroidsRef.current,
      { scale: 0.8 },
      { scale: 1, duration: 0.5, ease: "back.out(1.4)", stagger: 0.03 }
    );
  };

  return (
    <>
      {loading && <LoadingAnimation loaderRef={loaderRef} loadingText="Loading Gallery..." />}

      <div className="min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 relative z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 sm:mb-16 gap-4 sm:gap-6">
            <div ref={titleRef}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white relative">
                Event <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-cyan-400 to-purple-400 animate-gradient-text">Gallery</span>
                <div className="absolute -bottom-3 sm:-bottom-4 left-0 w-24 sm:w-32 h-0.5 sm:h-1 bg-linear-to-r from-purple-400 to-cyan-400 rounded-full" />
              </h1>
              <p className="text-gray-400 mt-6 sm:mt-8 text-base sm:text-lg">Drag the photos around • Click to view</p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={resetPositions}
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-400/30 rounded-full text-white hover:border-purple-400 hover:bg-purple-400/10 transition-all backdrop-blur-sm relative overflow-hidden text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:rotate-180 transition-transform duration-500" />
                  Reset
                </span>
              </button>
              
              <Link 
                to="/" 
                className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-400/30 rounded-full text-white hover:border-cyan-400 hover:bg-cyan-400/10 transition-all backdrop-blur-sm relative overflow-hidden text-sm sm:text-base"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform" />
                  Back
                </span>
              </Link>
            </div>
          </div>

          {/* Polaroid Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto py-8">
            {galleryImages.map((image, index) => {
              const position = draggedPositions[image.id] || { x: 0, y: 0 };
              return (
                <div
                  key={image.id}
                  ref={el => polaroidsRef.current[index] = el}
                  className="polaroid-container"
                  style={{
                    transform: `rotate(${getRandomRotation(index)}deg) translate(${position.x}px, ${position.y}px)`,
                    cursor: 'grab',
                    touchAction: 'none',
                  }}
                  onMouseDown={(e) => handleMouseDown(e, image.id, index)}
                >
                  <div className="polaroid group">
                    <div 
                      className="polaroid-image-wrapper cursor-pointer"
                      onClick={() => openLightbox(image)}
                    >
                      <img 
                        src={image.url} 
                        alt={image.caption}
                        className="polaroid-image"
                        draggable="false"
                      />
                    </div>
                    <div className="polaroid-caption">
                      <p className="text-gray-800 font-handwriting text-lg">{image.caption}</p>
                      <p className="text-gray-500 text-sm mt-1">{image.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={closeLightbox}
            style={{ isolation: 'isolate' }}
          >
            <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-fit mx-auto">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.caption}
                  className="max-h-[70vh] sm:max-h-[85vh] w-auto rounded-xl sm:rounded-2xl shadow-2xl object-contain"
                />
                <button
                  onClick={closeLightbox}
                  className="cursor-pointer absolute top-2 right-2 sm:top-4 sm:right-4 z-101 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 hover:bg-red-600/20 border border-white/50 hover:border-red-500 transition-all duration-300 group backdrop-blur-sm"
                  aria-label="Close gallery"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-red-500 group-hover:rotate-90 transition-all duration-300" />
                </button>
              </div>
              <div className="mt-4 sm:mt-6 text-center px-4">
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">{selectedImage.caption}</h3>
                <p className="text-gray-400 mt-2">{selectedImage.date}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .polaroid-container {
          transition: transform 0.1s ease-out, z-index 0s;
          user-select: none;
        }

        .polaroid-container:hover {
          z-index: 10;
        }

        .polaroid-container:active {
          cursor: grabbing !important;
        }

        .polaroid {
          background: white;
          padding: 16px;
          padding-bottom: 60px;
          box-shadow: 
            0 4px 6px rgba(0, 0, 0, 0.1),
            0 10px 20px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          position: relative;
          pointer-events: auto;
        }

        .polaroid:hover {
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.3),
            0 30px 60px rgba(0, 0, 0, 0.2);
          transform: scale(1.02);
        }

        .polaroid-image-wrapper {
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          background: #f5f5f5;
          position: relative;
        }

        .polaroid-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          pointer-events: none;
        }

        .polaroid-image-wrapper:hover .polaroid-image {
          transform: scale(1.05);
        }

        .polaroid-caption {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          text-align: center;
          pointer-events: none;
        }

        @font-face {
          font-family: 'Handwriting';
          src: local('Bradley Hand'), local('Comic Sans MS'), local('Segoe Print');
        }

        .font-handwriting {
          font-family: 'Handwriting', cursive;
        }
      `}</style>
    </>
  );
};

export default GalleryPage;
