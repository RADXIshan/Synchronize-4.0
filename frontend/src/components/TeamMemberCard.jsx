import React, { useEffect, useRef, useState } from 'react';

const colors = [
  "bg-yellow-400",
  "bg-cyan-300",
  "bg-fuchsia-300",
  "bg-green-400",
  "bg-orange-400",
  "bg-indigo-300",
];

// 
const FLIP_DURATION = 600; // ms — must match the CSS transition below

const MobileFlipCard = ({ member, index, cardColor, roleBg, flipped, onFlip }) => {
  // showBack lags flipped by half the animation so the swap happens
  // while the card is edge-on and invisible to the user.
  const [showBack, setShowBack] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowBack(flipped);
    }, FLIP_DURATION / 2);
    return () => clearTimeout(timerRef.current);
  }, [flipped]);

  return (
    <div
      className="sm:hidden w-full h-full"
      style={{ perspective: '1200px' }}
      onClick={onFlip}
    >
      {/* Single card div that rotates — no backface-visibility needed */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transition: `transform ${FLIP_DURATION}ms cubic-bezier(0.4,0.2,0.2,1)`,
          WebkitTransition: `transform ${FLIP_DURATION}ms cubic-bezier(0.4,0.2,0.2,1)`,
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          WebkitTransform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        className={`${cardColor} border-[6px] border-black shadow-[10px_10px_0px_#000]`}
      >
        {/* Anti-mirror wrapper: instantly counter-rotates when showBack flips */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            transform: showBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Top strip — same on both faces */}
          <div className={`border-b-[6px] border-black p-2 flex justify-between items-center relative ${cardColor} overflow-hidden flex-none`}>
            <div className="absolute inset-0 halftone-pattern opacity-[0.10] pointer-events-none"></div>
            <div className="flex flex-col leading-none z-10">
              <span className="text-base font-black uppercase text-black tracking-widest bg-yellow-400 px-1 border-2 border-black inline-block transform -skew-x-12 w-fit mb-1">Issue #{index + 1}</span>
              <span className="text-xl font-black uppercase text-white tracking-tighter w-fit drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Team Sync 4.0</span>
            </div>
            <div className="px-3 py-1 border-[3px] border-black transform rotate-3 bg-red-600 shadow-[3px_3px_0px_#000] z-10">
              <span className="text-sm font-black uppercase text-white font-display tracking-widest" style={{textShadow: '2px 2px 0 #000'}}>HERO</span>
            </div>
          </div>

          {/* Image area — content swaps at flip midpoint */}
          <div className="relative flex-1 border-b-[6px] border-black bg-gray-900 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_20px)] mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 halftone-pattern opacity-40 z-0 pointer-events-none"></div>

            {showBack ? (
              <>
                <div style={{ backgroundColor: member.heroPortraitBg || 'transparent', width: '100%', height: '100%', position: 'absolute', inset: 0, zIndex: 10 }}>
                  <img
                    src={member.heroPortrait}
                    alt="Hero Avatar"
                    className="w-full h-full object-cover filter contrast-125 saturate-150 block"
                    style={{
                      objectPosition: member.heroPosition || 'top',
                      transform: `scale(${member.heroScale || 1})`,
                      transformOrigin: 'bottom center',
                    }}
                  />
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none">
                  <span className="bg-white border-[3px] border-black text-black font-black uppercase text-[10px] tracking-widest px-3 py-1 shadow-[3px_3px_0px_#000] transform rotate-1 whitespace-nowrap">
                    Tap again to flip back
                  </span>
                </div>
              </>
            ) : (
              /* ── FRONT: Real person photo ── */
              <>
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover filter contrast-110 saturate-125 block z-10"
                  style={{
                    objectPosition: member.imagePosition || 'top',
                    transform: `scale(${member.imageScale || 1})`,
                    transformOrigin: 'top center',
                  }}
                />
                <div className="absolute inset-0 bg-blue-500 mix-blend-color opacity-20 z-20 pointer-events-none"></div>
                <div className="absolute inset-0 halftone-pattern opacity-20 z-20 pointer-events-none"></div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none">
                  <span className="bg-yellow-400 border-[3px] border-black text-black font-black uppercase text-[11px] tracking-widest px-3 py-1 shadow-[3px_3px_0px_#000] transform -rotate-1 whitespace-nowrap">
                    Tap to reveal character!
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Bottom info — same on both faces */}
          <div className={`p-3 relative flex-none h-[110px] flex items-center overflow-hidden ${cardColor}`}>
            <div className="absolute inset-0 halftone-pattern opacity-[0.05] pointer-events-none"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-100 rounded-full blur-xl opacity-50 z-0"></div>
            <div className="flex flex-col flex-1 relative z-10 min-w-0 pr-2 w-full max-w-full justify-center">
            <h3 className="font-display font-black text-3xl uppercase tracking-tighter text-white leading-[0.9] transform -skew-x-6 inline-block"
                style={{ textShadow: '2px 2px 0px #000, 3px 3px 0px #000' }}>
              {showBack ? (member.heroName || 'THE HERO') : member.name}
            </h3>
              <div className="mt-2 flex max-w-full overflow-hidden">
                <span className={`${member.roleTextColor || 'text-black'} font-black font-comic text-sm uppercase tracking-tight px-2 py-1 transform -rotate-1 border-2 border-black inline-block shadow-[2px_2px_0px_#000] ${roleBg}`}
                    style={{ textShadow: member.roleTextColor === 'text-white' ? '1px 1px 0px #000' : 'none' }}>
                {member.role}
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const TeamMemberCard = ({ member, index, setActiveBg, flipped, onFlip }) => {
  // Randomize rotation for comic panel look
  const angles = ['-rotate-2', '-rotate-1', 'rotate-1', 'rotate-2', '-rotate-3', 'rotate-3'];
  const rotation = angles[index % angles.length];

  const cardColor = member.cardBg || colors[index % colors.length];
  const roleBg = member.roleBg || cardColor;

  return (
    <div
      className={`relative group cursor-pointer w-full h-[450px] sm:h-[480px] z-10 ${rotation} hover:rotate-0 hover:z-50 transition-all duration-300`}
      onMouseEnter={() => setActiveBg && setActiveBg(member.heroBg)}
      onMouseLeave={() => setActiveBg && setActiveBg(null)}
      style={{ perspective: '1200px' }}
    >
      {/* ════════════════════════════════════════════════════
          DESKTOP CARD  ─  sm and above, hover-driven reveal
          ════════════════════════════════════════════════════ */}
      <div className={`hidden sm:flex relative w-full h-full ${cardColor} border-[6px] border-black flex-col transition-all duration-300 ease-out
                      group-hover:-translate-y-4 group-hover:-translate-x-4 shadow-[10px_10px_0px_#000] group-hover:shadow-[20px_20px_0px_#000]`}>

        {/* Top Comic Info Strip */}
        <div className={`border-b-[6px] border-black p-2 sm:p-3 flex justify-between items-center relative ${cardColor} overflow-hidden`}>
          <div className="absolute inset-0 halftone-pattern opacity-[0.10] pointer-events-none"></div>
          <div className="flex flex-col leading-none z-10">
            <span className="text-base sm:text-[10px] xl:text-xs font-black uppercase text-black tracking-widest bg-yellow-400 px-1 border-2 border-black inline-block transform -skew-x-12 w-fit mb-1">Issue #{index + 1}</span>
            <span className="text-xl sm:text-[12px] lg:text-sm xl:text-base font-black uppercase text-white tracking-tighter w-fit drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Team Sync 4.0</span>
          </div>
          <div className="px-3 py-1 border-[3px] border-black transform rotate-3 bg-red-600 shadow-[3px_3px_0px_#000] z-10 group-hover:rotate-6 group-hover:scale-110 transition-transform">
            <span className="text-[10px] sm:text-sm font-black uppercase text-white font-display tracking-widest" style={{textShadow: '2px 2px 0 #000'}}>HERO</span>
          </div>
        </div>

        {/* Character Image Area */}
        <div className="relative flex-1 border-b-[6px] border-black bg-gray-900 comic-panel-clip overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#fff_10px,#fff_20px)] mix-blend-overlay pointer-events-none"></div>
          <div className="absolute inset-0 halftone-pattern opacity-40 z-0 pointer-events-none"></div>

          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Real Person Photo – default visible, fades on hover */}
            <div className="absolute inset-0 w-full h-full z-10 transition-opacity duration-300 ease-in-out opacity-100 group-hover:opacity-0 flex items-center justify-center bg-gray-900 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover origin-bottom filter contrast-110 saturate-125 block transition-transform duration-500 ease-in-out group-hover:scale-105"
                style={{
                  objectPosition: member.imagePosition || 'top',
                  transform: `scale(${member.imageScale || 1})`
                }}
              />
              <div className="absolute inset-0 bg-blue-500 mix-blend-color opacity-20 z-20 pointer-events-none"></div>
              <div className="absolute inset-0 halftone-pattern opacity-20 z-30 pointer-events-none"></div>
            </div>

            {/* Hero Portrait – revealed on hover */}
            <div className="absolute inset-0 transition-opacity duration-300 ease-in-out z-20 opacity-0 group-hover:opacity-100 flex items-center justify-center overflow-hidden" style={{ backgroundColor: member.heroPortraitBg || 'transparent' }}>
              <img
                src={member.heroPortrait}
                alt="Hero Avatar"
                className="w-full h-full object-cover filter contrast-125 saturate-150 block transition-transform duration-500 origin-bottom group-hover:scale-105"
                style={{
                  objectPosition: member.heroPosition || 'top',
                  transform: `scale(${member.heroScale || 1})`
                }}
              />
            </div>
          </div>

          {/* "Hover to reveal" hint – visible by default, fades on hover */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none
                          transition-opacity duration-300 opacity-100 group-hover:opacity-0">
            <span
              className="bg-yellow-400 border-[3px] border-black text-black font-black uppercase text-[10px] tracking-widest px-3 py-1 shadow-[3px_3px_0px_#000] transform -rotate-1 whitespace-nowrap"
            >
              Hover to reveal hero!
            </span>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className={`p-3 sm:p-5 relative flex-none h-[110px] sm:h-[130px] flex justify-between items-center overflow-hidden ${cardColor}`}>
          <div className="absolute inset-0 halftone-pattern opacity-[0.05] pointer-events-none"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-100 rounded-full blur-xl opacity-50 z-0"></div>
          <div className="flex flex-col flex-1 relative z-10 min-w-0 pr-2 w-full max-w-full justify-center">
            <h3 className="font-display font-black text-2xl sm:text-xl lg:text-[22px] xl:text-3xl uppercase tracking-tighter text-white leading-[0.9] drop-shadow-[2px_2px_0_rgba(0,0,0,1)] sm:drop-shadow-[3px_3px_0_rgba(0,0,0,1)] transform -skew-x-6 inline-block"
                style={{ textShadow: '2px 2px 0px #000, 3px 3px 0px #000' }}>
              <span className="block group-hover:hidden">{member.name}</span>
              <span className="hidden group-hover:block">{member.heroName || 'THE HERO'}</span>
            </h3>
            <div className="mt-2 sm:mt-3 flex max-w-full overflow-hidden">
              <span className={`${member.roleTextColor || 'text-black'} font-black font-comic text-[12px] sm:text-[9px] md:text-[11px] xl:text-[12px] uppercase tracking-tight sm:tracking-widest px-2 py-1 transform -rotate-1 border-2 sm:border-[3px] border-black inline-block shadow-[2px_2px_0px_#000] sm:shadow-[3px_3px_0px_#000] ${roleBg}`}
                    style={{ textShadow: member.roleTextColor === 'text-white' ? '1px 1px 0px #000' : 'none' }}>
                {member.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          MOBILE CARD  ─  iOS-safe flip (React state swap)
          ════════════════════════════════════════════════════ */}
      <MobileFlipCard
        member={member}
        index={index}
        cardColor={cardColor}
        roleBg={roleBg}
        flipped={flipped}
        onFlip={onFlip}
      />
    </div>
  );
};

export default TeamMemberCard;
