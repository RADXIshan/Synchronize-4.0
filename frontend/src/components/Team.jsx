import React from 'react';
import { Link } from 'react-router-dom';

const Team = () => {
  const teamMembers = [
    { name: "Alex Johnson", role: "Lead Organizer", image: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Sarah Williams", role: "Tech Lead", image: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Michael Chen", role: "Design Head", image: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Emily Davis", role: "Marketing Lead", image: "https://randomuser.me/api/portraits/women/28.jpg" },
    { name: "David Miller", role: "Logistics", image: "https://randomuser.me/api/portraits/men/54.jpg" },
    { name: "Jessica Taylor", role: "Sponsorships", image: "https://randomuser.me/api/portraits/women/65.jpg" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 relative z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white">
            Meet the <span className="text-cyan-400">Team</span>
          </h1>
          <Link to="/" className="px-6 py-3 border border-white/30 rounded-full text-white hover:bg-white/10 transition-all backdrop-blur-sm">
            Back to Home
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="cursor-pointer glass-card p-6 rounded-2xl flex flex-col items-center text-center group hover:border-cyan-400/50 transition-all duration-300">
              <div className="cursor-pointer w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-white/20 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="cursor-pointer w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="cursor-pointer text-2xl font-bold text-white mb-2">{member.name}</h3>
              <p className="cursor-pointer text-cyan-400 font-sans tracking-wider uppercase text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
