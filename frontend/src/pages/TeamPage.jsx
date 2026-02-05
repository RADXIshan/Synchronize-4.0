import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { teamMembers } from '../utils/teamData'; 
// import TeamMemberCard from '../components/TeamMemberCard';
import ComingSoon from '../components/ComingSoon';

// gsap.registerPlugin(ScrollTrigger);

const TeamPage = () => {
  /*
  const [activeBg, setActiveBg] = useState('default');
  const containerRef = useRef(null);

   // Background parallax effect
   useEffect(() => {
    // ... (Original effects logic)
   }, [activeBg]);
  */

  return (
    <div className="min-h-screen bg-black pt-20">
      <ComingSoon title="THE TEAM" subtitle="Assembling the Avengers..." />
      
      {/* 
      --- ORIGINAL CONTENT HIDDEN FOR NOW ---
      
      <div ref={containerRef} className="relative container mx-auto px-4 z-10">
        
        <div className="text-center mb-16 pt-10">
           <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter mb-4 text-shadow-comic transform -skew-x-6">
             MEET THE <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-yellow-500">HEROES</span>
           </h1>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto font-mono">
             The minds behind the madness. Synchronize 4.0 is brought to you by this league of extraordinary developers.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-12">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card h-full">
              <TeamMemberCard member={member} index={index} setActiveBg={setActiveBg} />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center relative">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-black -z-10 transform -translate-y-1/2"></div>
          <div className="inline-block px-12 py-6 bg-blue-600 border-4 border-black shadow-[10px_10px_0px_#000] transform rotate-2 hover:scale-110 transition-transform cursor-help">
            <span className="text-2xl font-black uppercase italic tracking-wider text-white">
              MORE HEROES INCOMING...
            </span>
          </div>
        </div>
      </div>
      */}

    </div>
  );
};

export default TeamPage;
