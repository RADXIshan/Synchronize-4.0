import React from 'react';

const colors = [
  "bg-yellow-400",
  "bg-cyan-300",
  "bg-fuchsia-300",
  "bg-green-400",
  "bg-orange-400",
  "bg-indigo-300",
];

const TeamMemberCard = ({ member, index, setActiveBg }) => {
  // Randomize rotation for comic panel look
  const angles = ['-rotate-2', '-rotate-1', 'rotate-1', 'rotate-2', '-rotate-3', 'rotate-3'];
  const rotation = angles[index % angles.length];
  
  const cardColor = colors[index % colors.length];

  return (
    <div 
      className={`relative group cursor-pointer w-full h-[450px] transition-all duration-300 z-10 ${rotation} hover:rotate-0 hover:z-50`}
      onMouseEnter={() => setActiveBg && setActiveBg(member.heroBg)}
      onMouseLeave={() => setActiveBg && setActiveBg(null)}
    >
      {/* Heavy drop shadow / offset layer */}
      <div className={`absolute top-0 left-0 w-full h-full bg-black border-4 border-black transition-all duration-300 z-0
                      group-hover:translate-x-3 group-hover:translate-y-3 group-hover:rotate-2`}></div>
      
      {/* Main Card Container */}
      <div className={`relative w-full h-full ${cardColor} border-4 border-black flex flex-col z-10 transition-transform duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2`}>
        
        {/* Top Comic Info Strip */}
        <div className="border-b-4 border-black p-2 flex justify-between items-center relative z-20">
          <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none"></div>
          <div className="flex flex-col leading-none z-10">
            <span className="text-[10px] sm:text-[11px] md:text-[10px] xl:text-xs font-black uppercase text-black tracking-widest">Team Sync</span>
            <span className="text-xs sm:text-sm md:text-xs xl:text-sm font-black uppercase text-black tracking-tighter">Issue #{index + 1}</span>
          </div>
          <div className="px-2 py-0.5 border-2 border-black transform -rotate-3 bg-white shadow-[2px_2px_0px_#000] z-10">
            <span className="text-xs font-black uppercase text-black font-display tracking-wider">HERO</span>
          </div>
        </div>

        {/* Character Image Area */}
        <div className="relative flex-1 border-b-4 border-black overflow-hidden bg-gray-900 comic-panel-clip z-10">
          
          {/* Halftone backdrop */}
          <div className="absolute inset-0 halftone-pattern opacity-30 z-0 pointer-events-none"></div>
          
          {/* Hero Portrait (Default View) */}
          <div className="absolute inset-0 transition-opacity duration-300 ease-in-out z-10 opacity-100 group-hover:opacity-0">
            <img 
              src={member.heroPortrait} 
              alt="Hero Avatar" 
              className="w-full h-full object-cover object-top md:object-[center_10%] transition-transform duration-500 origin-top group-hover:scale-105"
            />
          </div>

          {/* Real Person Photo (Hover Reveal) */}
          <div className="absolute inset-0 w-full h-full z-20 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none">
            
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover object-top md:object-[center_10%] transition-transform duration-500 scale-100 group-hover:scale-105 origin-top"
            />
            
            <div className="absolute inset-0 halftone-pattern opacity-10 z-40 pointer-events-none"></div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="p-3 sm:p-4 relative flex-none h-[110px] flex justify-between items-center z-20">
          <div className="absolute inset-0 halftone-pattern opacity-10 pointer-events-none"></div>
          
          <div className="flex flex-col w-[80%] relative z-10">
            <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tighter truncate w-full text-black leading-none drop-shadow-sm filter mt-1"
                style={{ textShadow: '1px 1px 0px rgba(255,255,255,0.8)' }}>
              {member.name}
            </h3>
            
            <div className="mt-2 inline-block">
              <span className="bg-black text-white font-black font-comic text-[10px] sm:text-xs uppercase tracking-widest px-2 py-1 transform -skew-x-12 inline-block shadow-[2px_2px_0px_rgba(255,255,255,1)]">
                {member.role}
              </span>
            </div>
          </div>

          {/* Badge */}
          <div className="w-[20%] flex justify-end z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-black bg-white flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform shadow-[2px_2px_0px_#000]">
              <span className="text-black font-black text-lg sm:text-lg leading-none tracking-tighter">4.0</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TeamMemberCard;
