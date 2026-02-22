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
  
  const cardColor = member.cardBg || colors[index % colors.length];
  const roleBg = member.roleBg || cardColor;
  const textColor = member.textColor || "text-black";

  return (
    <div 
      className={`relative group cursor-pointer w-full h-[450px] sm:h-[480px] z-10 ${rotation} hover:rotate-0 hover:z-50 transition-all duration-300`}
      onMouseEnter={() => setActiveBg && setActiveBg(member.heroBg)}
      onMouseLeave={() => setActiveBg && setActiveBg(null)}
    >
      {/* 3D Main Card Container */}
      <div className={`relative w-full h-full ${cardColor} border-[6px] border-black flex flex-col transition-all duration-300 ease-out 
                      group-hover:-translate-y-4 group-hover:-translate-x-4 shadow-[10px_10px_0px_#000] group-hover:shadow-[20px_20px_0px_#000]`}>
        
        {/* Top Comic Info Strip */}
        <div className={`border-b-[6px] border-black p-2 sm:p-3 flex justify-between items-center relative ${cardColor} overflow-hidden`}>
          <div className="absolute inset-0 halftone-pattern opacity-[0.10] pointer-events-none"></div>
          
          <div className="flex flex-col leading-none z-10">
            <span className="text-base sm:text-[10px] xl:text-xs font-black uppercase text-black tracking-widest bg-yellow-400 px-1 border-2 border-black inline-block transform -skew-x-12 w-fit mb-1">Issue #{index + 1}</span>
            <span className={`text-xl sm:text-[12px] lg:text-sm xl:text-base font-black uppercase text-white tracking-tighter w-fit drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]`}>Team Sync 4.0</span>
          </div>
          
          <div className="px-3 py-1 border-[3px] border-black transform rotate-3 bg-red-600 shadow-[3px_3px_0px_#000] z-10 group-hover:rotate-6 group-hover:scale-110 transition-transform">
            <span className="text-[10px] sm:text-sm font-black uppercase text-white font-display tracking-widest" style={{textShadow: '2px 2px 0 #000'}}>HERO</span>
          </div>
        </div>

        {/* Character Image Area */}
        <div className="relative flex-1 border-b-[6px] border-black bg-gray-900 comic-panel-clip overflow-hidden">
          {/* Action lines background */}
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_20px)] mix-blend-overlay pointer-events-none"></div>
          
          {/* Halftone backdrop */}
          <div className="absolute inset-0 halftone-pattern opacity-40 z-0 pointer-events-none"></div>
          
          {/* Hero Portrait (Hidden on Mobile, Default View on Large) */}
          <div className="hidden sm:block absolute inset-0 transition-opacity duration-300 ease-in-out z-10 opacity-100 group-hover:opacity-0">
            <img 
              src={member.heroPortrait} 
              alt="Hero Avatar" 
              className="w-full h-full object-cover object-top transition-transform duration-500 origin-bottom group-hover:scale-105 filter contrast-125 saturate-150 block"
            />
          </div>

          {/* Real Person Photo (Always visible on mobile, Hover Reveal on Large) */}
          <div className="absolute inset-0 w-full h-full sm:z-20 transition-opacity duration-300 ease-in-out sm:opacity-0 sm:group-hover:opacity-100 opacity-100 pointer-events-none flex items-center justify-center bg-gray-900 overflow-hidden">
            <img 
              src={member.image} 
              alt={member.name} 
              className="w-full h-full object-cover object-top transition-transform duration-500 origin-bottom group-hover:scale-105 filter contrast-110 saturate-125 block"
            />
            {/* Hover Overlay Comic Effect */}
            <div className="absolute inset-0 bg-blue-500 mix-blend-color opacity-20 z-30 pointer-events-none"></div>
            <div className="absolute inset-0 halftone-pattern opacity-20 z-40 pointer-events-none"></div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className={`p-3 sm:p-5 relative flex-none h-[110px] sm:h-[130px] flex justify-between items-center overflow-hidden ${cardColor}`}>
          <div className="absolute inset-0 halftone-pattern opacity-[0.05] pointer-events-none"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-100 rounded-full blur-xl opacity-50 z-0"></div>
          
          <div className="flex flex-col flex-1 relative z-10 min-w-0 pr-2 w-full max-w-full">
            <h3 className={`font-display font-black text-3xl sm:text-xl lg:text-[22px] xl:text-3xl uppercase tracking-tighter text-white leading-none drop-shadow-[2px_2px_0_rgba(0,0,0,1)] sm:drop-shadow-[3px_3px_0_rgba(0,0,0,1)] transform -skew-x-6 inline truncate max-w-full`}
                style={{ textShadow: '2px 2px 0px #000, 3px 3px 0px #000' }}>
              {member.name}
            </h3>
            
            <div className="mt-2 sm:mt-3 flex max-w-full overflow-hidden">
              <span className={`${member.roleTextColor || 'text-black'} font-black font-comic text-sm sm:text-[9px] md:text-[11px] xl:text-xs uppercase tracking-tight sm:tracking-widest px-2 py-1 sm:px-2 sm:py-1 transform -rotate-1 border-2 sm:border-[3px] border-black inline-block shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] ${roleBg} truncate max-w-full`}
                    style={{ textShadow: member.roleTextColor === 'text-white' ? '1px 1px 0px #000' : 'none' }}>
                {member.role}
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TeamMemberCard;
