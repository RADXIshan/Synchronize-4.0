import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      {/* Click outside to close */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
      />
      
      {/* Modal Content - Comic Style */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white border-4 border-black comic-shadow flex flex-col z-10 animate-in fade-in zoom-in duration-200 transform">
        
        {/* Decorative elements */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-iron-gold border-2 border-black rotate-12 z-20" />
        <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-[#0055AA] border-2 border-black -rotate-12 z-20" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b-4 border-black bg-marvel-red">
          <h2 className="text-xl sm:text-2xl font-black text-white pop-art-text tracking-wide">{title}</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-white border-2 border-black text-black hover:scale-110 transition-transform hover:rotate-12 cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 font-black" strokeWidth={3} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto comic-font bg-slate-50 relative">
          {/* Halftone Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1.5px)',
              backgroundSize: '15px 15px'
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
