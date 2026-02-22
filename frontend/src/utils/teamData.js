import camOps from '../assets/CORE TEAM PHOTOS/Cam Ops_.jpg';
import coordinator1 from '../assets/CORE TEAM PHOTOS/Coordinator.jpg';
import coordinatorKaif from '../assets/CORE TEAM PHOTOS/Coordinator_Kaifkhurshid .jpg';
import coverageLead from '../assets/CORE TEAM PHOTOS/CoverageLead_HrisitaMohapatra.jpg';
import decorLead from '../assets/CORE TEAM PHOTOS/Decor lead.jpg';
import designLeadAkshat from '../assets/CORE TEAM PHOTOS/Design _Lead _Akshat Sharma.JPG';
import deputyHospitality1 from '../assets/CORE TEAM PHOTOS/Deputy Hospitality.jpeg';
import deputyTechLead from '../assets/CORE TEAM PHOTOS/DeputyTechLead.png';
import dyHospitalitySadhana from '../assets/CORE TEAM PHOTOS/Dy- Hospitality Lead_Sadhana.jpg';
import dyCoordinatorSrimad from '../assets/CORE TEAM PHOTOS/Dy-Coordinator_Srimad.jpg';
import eventsLead from '../assets/CORE TEAM PHOTOS/Events_Lead_Manish.jpg';
import eventLeadPratirupa from '../assets/CORE TEAM PHOTOS/EventLead_PratirupaToppo.jpg';
import hospitalityLead from '../assets/CORE TEAM PHOTOS/Hospitality Lead.jpg';
import logisticsLead from '../assets/CORE TEAM PHOTOS/LOGISTICS LEAD_SubhamRout.jpg';
import mediaPRLead from '../assets/CORE TEAM PHOTOS/Media&PRLead_SnehaGrace.jpg';
import operationsLead from '../assets/CORE TEAM PHOTOS/OPERATIONS LEAD_ ADITYA RAJ MISHRA_.jpg';
import roboticsAnanya from '../assets/CORE TEAM PHOTOS/RoboticsHead_Ananya Verma.png';
import roboticsAnkit from '../assets/CORE TEAM PHOTOS/RoboticsHead_AnkitChoudhury.png';
import secretary from '../assets/CORE TEAM PHOTOS/Secretary.jpg';
import sponsorshipLead from '../assets/CORE TEAM PHOTOS/Sponsorship lead.jpg';
import techLeadIshan from '../assets/CORE TEAM PHOTOS/TechLead_IshanRoy.jpg';
import treasurerEshani from '../assets/CORE TEAM PHOTOS/Treasurer_Eshani_Misra.png';
import volunteerLead1 from '../assets/CORE TEAM PHOTOS/Volunteer Lead(1).jpg';
import volunteerLead from '../assets/CORE TEAM PHOTOS/Volunteer Lead.jpg';
import creativeHead from '../assets/CORE TEAM PHOTOS/creative head.jpeg';

// Marvel Heroes (Portraits & Backgrounds)
import portCap from '../assets/comic_theme/portrait_cap.png';
import bgCap from '../assets/comic_theme/bg_cap.png';
import portHulk from '../assets/comic_theme/portrait_hulk.png';
import bgHulk from '../assets/comic_theme/bg_hulk.png';
import portIron from '../assets/comic_theme/portrait_ironman.png';
import bgIron from '../assets/comic_theme/bg_ironman.png';
import portPanther from '../assets/comic_theme/portrait_panther.png';
import bgPanther from '../assets/comic_theme/bg_panther.png';
import portThor from '../assets/comic_theme/portrait_thor.png';
import bgThor from '../assets/comic_theme/bg_thor.png';
import portWidow from '../assets/comic_theme/portrait_widow.png';
import bgWidow from '../assets/comic_theme/bg_widow.png';
import portSpidey from '../assets/spidey_portrait.png';
import bgSpidey from '../assets/comic_theme/bg_spiderman.png';
import portScarlet from '../assets/comic_theme/portrait_scarletwitch.png';
import bgScarlet from '../assets/comic_theme/bg_scarletwitch.png';
import portStrange from '../assets/comic_theme/portrait_strange.png';
import bgStrange from '../assets/comic_theme/bg_strange.png';
import portVision from '../assets/comic_theme/portrait_vision.png';
import bgVision from '../assets/comic_theme/bg_vision.png';

const heroes = [
  { p: portCap, b: bgCap, cardBg: 'bg-blue-400', roleBg: 'bg-red-400', textColor: 'text-black', roleTextColor: 'text-black' },       // 0: Captain America
  { p: portHulk, b: bgHulk, cardBg: 'bg-green-400', roleBg: 'bg-yellow-300', textColor: 'text-black', roleTextColor: 'text-black' },     // 1: Hulk
  { p: portIron, b: bgIron, cardBg: 'bg-red-500', roleBg: 'bg-yellow-400', textColor: 'text-white', roleTextColor: 'text-black' },     // 2: Iron Man
  { p: portPanther, b: bgPanther, cardBg: 'bg-indigo-400', roleBg: 'bg-fuchsia-400', textColor: 'text-black', roleTextColor: 'text-black' }, // 3: Black Panther
  { p: portThor, b: bgThor, cardBg: 'bg-cyan-400', roleBg: 'bg-yellow-400', textColor: 'text-black', roleTextColor: 'text-black' },     // 4: Thor
  { p: portWidow, b: bgWidow, cardBg: 'bg-rose-500', roleBg: 'bg-neutral-800', textColor: 'text-white', roleTextColor: 'text-white' },   // 5: Black Widow (Black tag -> White text)
  { p: portSpidey, b: bgSpidey, cardBg: 'bg-red-500', roleBg: 'bg-blue-400', textColor: 'text-white', roleTextColor: 'text-black' }, // 6: Spider-Man
  { p: portScarlet, b: bgScarlet, cardBg: 'bg-pink-500', roleBg: 'bg-red-400', textColor: 'text-white', roleTextColor: 'text-black' }, // 7: Scarlet Witch
  { p: portStrange, b: bgStrange, cardBg: 'bg-teal-400', roleBg: 'bg-orange-400', textColor: 'text-black', roleTextColor: 'text-black' }, // 8: Doctor Strange
  { p: portVision, b: bgVision, cardBg: 'bg-fuchsia-400', roleBg: 'bg-emerald-300', textColor: 'text-black', roleTextColor: 'text-black' }  // 9: Vision
];

const heroProps = (index) => ({
  heroPortrait: heroes[index].p,
  heroBg: heroes[index].b,
  cardBg: heroes[index].cardBg,
  roleBg: heroes[index].roleBg,
  textColor: heroes[index].textColor,
  roleTextColor: heroes[index].roleTextColor,
});

export const teamMembers = [
  { name: 'Sidhant', role: 'Secretary', image: secretary, ...heroProps(4) },
  { name: 'Kaif', role: 'Coordinator', image: coordinatorKaif, ...heroProps(0) },
  { name: 'Simran', role: 'Coordinator', image: coordinator1, ...heroProps(5) },
  { name: 'Srimad', role: 'Deputy Coordinator', image: dyCoordinatorSrimad, ...heroProps(8) },
  { name: 'Ishan', role: 'Tech Lead', image: techLeadIshan, ...heroProps(2) },
  { name: 'Aditya', role: 'Operations Lead', image: operationsLead, ...heroProps(0) },
  { name: 'Ayush', role: 'Deputy Tech Lead', image: deputyTechLead, ...heroProps(6) },
  { name: 'Manish', role: 'Events Lead', image: eventsLead, ...heroProps(1) },
  { name: 'Pratirupa', role: 'Events Lead', image: eventLeadPratirupa, ...heroProps(8) },
  { name: 'Subham', role: 'Logistics Lead', image: logisticsLead, ...heroProps(3) },
  { name: 'Akshat', role: 'Design Lead', image: designLeadAkshat, ...heroProps(6) },
  { name: 'Sneha', role: 'Media & PR Lead', image: mediaPRLead, ...heroProps(7) },
  { name: 'Hrisita', role: 'Coverage Lead', image: coverageLead, ...heroProps(5) },
  { name: 'Eshani', role: 'Treasurer', image: treasurerEshani, ...heroProps(7) },
  { name: 'Debolina', role: 'Hospitality Lead', image: hospitalityLead, ...heroProps(9) },
  { name: 'Sadhana', role: 'Deputy Hospitality', image: dyHospitalitySadhana, ...heroProps(5) },
  { name: 'Ashmit', role: 'Deputy Hospitality', image: deputyHospitality1, ...heroProps(8) },
  { name: 'Akanshya', role: 'Decor Lead', image: decorLead, ...heroProps(6) },
  { name: 'Priyanka', role: 'Sponsorship Lead', image: sponsorshipLead, ...heroProps(2) },
  { name: 'Justin', role: 'Volunteer Lead', image: volunteerLead, ...heroProps(1) },
  { name: 'Pracheta', role: 'Volunteer Lead', image: volunteerLead1, ...heroProps(3) },
  { name: 'Ananya', role: 'Robotics Head', image: roboticsAnanya, ...heroProps(5) },
  { name: 'Ankit', role: 'Robotics Head', image: roboticsAnkit, ...heroProps(4) },
  { name: 'Prashant', role: 'Creative Head', image: creativeHead, ...heroProps(9) },
  { name: 'Mrunmay', role: 'Cam Ops', image: camOps, ...heroProps(2) },
  
];
