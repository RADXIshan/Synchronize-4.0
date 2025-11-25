import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import EventDetailsCard from '../components/EventDetailsCard';
import LoadingAnimation from '../components/LoadingAnimation';

const eventsData = {
  flagship: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Flagship",
      description: "The biggest tech event of the year featuring keynote speakers, workshops, and networking opportunities with industry leaders.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
      date: "March 15-17, 2025",
      day: [1, 2, 3],
      venue: "Main Auditorium",
      prize: "₹1,00,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Rahul Sharma", email: "rahul.sharma@techfest.com" }
    },
    {
      id: 2,
      title: "Innovation Challenge",
      category: "Flagship",
      description: "Present your innovative ideas and prototypes to a panel of judges. Best innovation wins funding and mentorship.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Innovation Hub",
      prize: "₹75,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Priya Patel", email: "priya.patel@techfest.com" }
    }
  ],
  coding: [
    {
      id: 3,
      title: "Hackathon 2025",
      category: "Coding",
      description: "24-hour coding marathon where teams build innovative solutions to real-world problems. Mentorship and resources provided.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      date: "March 15-16, 2025",
      day: [1, 2],
      venue: "Computer Lab A",
      prize: "₹50,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Arjun Mehta", email: "arjun.mehta@techfest.com" }
    },
    {
      id: 4,
      title: "Code Relay",
      category: "Coding",
      description: "Team-based competitive programming event. Solve algorithmic challenges in a relay format against the clock.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      date: "March 17, 2025",
      day: 3,
      venue: "Computer Lab B",
      prize: "₹30,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Sneha Reddy", email: "sneha.reddy@techfest.com" }
    },
    {
      id: 5,
      title: "Web Dev Workshop",
      category: "Coding",
      description: "Learn modern web development techniques from industry experts. Build a full-stack application from scratch.",
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Workshop Hall",
      prize: "Certificates",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Vikram Singh", email: "vikram.singh@techfest.com" }
    }
  ],
  robotics: [
    {
      id: 6,
      title: "RoboWars",
      category: "Robotics",
      description: "Build combat robots and compete in an arena battle. Last robot standing wins the championship.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
      date: "March 17, 2025",
      day: 3,
      venue: "Arena Ground",
      prize: "₹60,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Aditya Kumar", email: "aditya.kumar@techfest.com" }
    },
    {
      id: 7,
      title: "Line Follower Challenge",
      category: "Robotics",
      description: "Design autonomous robots that can navigate complex paths. Fastest and most accurate robot wins.",
      image: "https://images.unsplash.com/photo-1563207153-f403bf289096?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Robotics Lab",
      prize: "₹25,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Ananya Desai", email: "ananya.desai@techfest.com" }
    },
    {
      id: 8,
      title: "Drone Racing",
      category: "Robotics",
      description: "Race your custom-built drones through obstacle courses. Speed and precision are key to victory.",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800",
      date: "March 15, 2025",
      day: 1,
      venue: "Open Ground",
      prize: "₹40,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Rohan Gupta", email: "rohan.gupta@techfest.com" }
    }
  ],
  gaming: [
    {
      id: 9,
      title: "Esports Tournament",
      category: "Gaming",
      description: "Compete in popular esports titles including Valorant, CS:GO, and more. Solo and team events available.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
      date: "March 15-17, 2025",
      day: [1, 2, 3],
      venue: "Gaming Arena",
      prize: "₹45,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Karan Malhotra", email: "karan.malhotra@techfest.com" }
    },
    {
      id: 10,
      title: "Mobile Gaming Championship",
      category: "Gaming",
      description: "Battle it out in mobile gaming tournaments featuring BGMI, COD Mobile, and Clash Royale.",
      image: "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Gaming Zone",
      prize: "₹20,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Ishita Joshi", email: "ishita.joshi@techfest.com" }
    }
  ],
  creative: [
    {
      id: 11,
      title: "Design Derby",
      category: "Creative",
      description: "Showcase your design skills in UI/UX, graphic design, and digital art competitions.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      date: "March 16, 2025",
      day: 2,
      venue: "Design Studio",
      prize: "₹35,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Meera Kapoor", email: "meera.kapoor@techfest.com" }
    },
    {
      id: 12,
      title: "Photography Contest",
      category: "Creative",
      description: "Capture the essence of technology and innovation through your lens. Multiple categories available.",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=800",
      date: "March 15-17, 2025",
      day: [1, 2, 3],
      venue: "Campus Wide",
      prize: "₹15,000",
      registrationLink: "https://forms.google.com/placeholder",
      poc: { name: "Siddharth Rao", email: "siddharth.rao@techfest.com" }
    }
  ]
};



const EventCard = ({ event, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/10 cursor-pointer bg-black"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
        
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-linear-to-t from-cyan-500/20 via-transparent to-transparent"></div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 p-6 w-full">
        <span className="text-cyan-400 text-xs uppercase tracking-wider mb-2 block">{event.category}</span>
        <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-cyan-50 transition-colors">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{event.description}</p>
        <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
          <span>View Details</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loaderRef = useRef(null);
  const dropdownRef = useRef(null);

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'flagship', name: 'Flagship' },
    { id: 'coding', name: 'Coding' },
    { id: 'robotics', name: 'Robotics' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'creative', name: 'Creative' }
  ];

  const getFilteredEvents = () => {
    let events = [];
    if (selectedCategory === 'all') {
      events = Object.values(eventsData).flat();
    } else {
      events = eventsData[selectedCategory] || [];
    }
    
    // Filter by day if a specific day is selected
    if (selectedDay !== 'all') {
      const dayNumber = parseInt(selectedDay);
      events = events.filter(event => {
        if (Array.isArray(event.day)) {
          return event.day.includes(dayNumber);
        }
        return event.day === dayNumber;
      });
    }
    
    return events;
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
      gsap.fromTo('.event-card',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [selectedCategory, selectedDay, loading]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {loading && <LoadingAnimation loaderRef={loaderRef} loadingText="Preparing Events..." />}

      <div className="min-h-screen bg-black text-white pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 sm:mb-6">
            Our <span className="text-cyan-400">Events</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Explore our diverse range of technical and creative events. Find your passion and register now!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/50'
                  : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Day Filter Dropdown */}
        <div className="flex justify-center mb-8 sm:mb-12 px-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="cursor-pointer px-6 sm:px-8 md:px-10 pr-12 sm:pr-14 md:pr-16 py-3 sm:py-2.5 md:py-3 bg-purple-400/10 hover:bg-purple-400/20 border-2 border-purple-400 text-purple-400 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400/50 backdrop-blur-sm shadow-lg shadow-purple-400/20 relative flex items-center gap-2"
            >
              <span>
                {selectedDay === 'all' ? 'All Days' : `Day ${selectedDay}`}
              </span>
              <ChevronDown 
                className={`absolute right-4 sm:right-5 md:right-6 w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full min-w-[200px] bg-black/95 backdrop-blur-md border-2 border-purple-400/50 rounded-2xl shadow-2xl shadow-purple-400/30 overflow-hidden z-50 animate-fadeIn">
                {[
                  { value: 'all', label: 'All Days' },
                  { value: '1', label: 'Day 1' },
                  { value: '2', label: 'Day 2' },
                  { value: '3', label: 'Day 3' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSelectedDay(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className={`cursor-pointer w-full px-6 py-3 text-left transition-all duration-200 ${
                      selectedDay === option.value
                        ? 'bg-purple-400/20 text-purple-300 font-semibold'
                        : 'text-purple-400 hover:bg-purple-400/10 hover:text-purple-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {getFilteredEvents().map((event) => (
            <div key={event.id} className="event-card">
              <EventCard event={event} onClick={() => setSelectedEvent(event)} />
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventDetailsCard event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
      </div>
    </>
  );
};

export default EventsPage;
