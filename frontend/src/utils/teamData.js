import camOps from '../assets/CORE TEAM PHOTOS/Cam Ops_.jpg';
import coordinator1 from '../assets/CORE TEAM PHOTOS/Coordinator.jpg';
import coordinatorKaif from '../assets/CORE TEAM PHOTOS/Coordinator_Kaifkhurshid .jpg';
import coverageLead from '../assets/CORE TEAM PHOTOS/CoverageLead_HrisitaMohapatra.jpg';
import decorLead from '../assets/CORE TEAM PHOTOS/Decor lead.jpg';
import deputyHospitality1 from '../assets/CORE TEAM PHOTOS/Deputy Hospitality.jpeg';
import deputyTechLead from '../assets/CORE TEAM PHOTOS/DeputyTechLead.png';
import dyHospitalitySadhana from '../assets/CORE TEAM PHOTOS/Dy- Hospitality Lead_Sadhana.jpg';
import dyCoordinatorSrimad from '../assets/CORE TEAM PHOTOS/Dy-Coordinator_Srimad.jpg';
import eventsLead from '../assets/CORE TEAM PHOTOS/Events_Lead_Manish.jpg';
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
  { p: portCap, b: bgCap },       // 0: Captain America
  { p: portHulk, b: bgHulk },     // 1: Hulk
  { p: portIron, b: bgIron },     // 2: Iron Man
  { p: portPanther, b: bgPanther }, // 3: Black Panther
  { p: portThor, b: bgThor },     // 4: Thor
  { p: portWidow, b: bgWidow },   // 5: Black Widow
  { p: portSpidey, b: bgSpidey }, // 6: Spider-Man
  { p: portScarlet, b: bgScarlet }, // 7: Scarlet Witch
  { p: portStrange, b: bgStrange }, // 8: Doctor Strange
  { p: portVision, b: bgVision }  // 9: Vision
];

export const teamMembers = [
  { name: 'Secretary', role: 'Secretary', image: secretary, heroPortrait: heroes[4].p, heroBg: heroes[4].b },
  { name: 'Kaif Khurshid', role: 'Coordinator', image: coordinatorKaif, heroPortrait: heroes[0].p, heroBg: heroes[0].b },
  { name: 'Coordinator', role: 'Coordinator', image: coordinator1, heroPortrait: heroes[5].p, heroBg: heroes[5].b },
  { name: 'Ishan Roy', role: 'Tech Lead', image: techLeadIshan, heroPortrait: heroes[2].p, heroBg: heroes[2].b },
  { name: 'Aditya Raj Mishra', role: 'Operations Lead', image: operationsLead, heroPortrait: heroes[0].p, heroBg: heroes[0].b },
  { name: 'Srimad Nayak', role: 'Deputy Coordinator', image: dyCoordinatorSrimad, heroPortrait: heroes[8].p, heroBg: heroes[8].b },
  { name: 'Manish Nanda', role: 'Events Lead', image: eventsLead, heroPortrait: heroes[1].p, heroBg: heroes[1].b },
  { name: 'Subham Rout', role: 'Logistics Lead', image: logisticsLead, heroPortrait: heroes[3].p, heroBg: heroes[3].b },
  { name: 'Ananya Verma', role: 'Robotics Head', image: roboticsAnanya, heroPortrait: heroes[5].p, heroBg: heroes[5].b },
  { name: 'Ankit Choudhury', role: 'Robotics Head', image: roboticsAnkit, heroPortrait: heroes[4].p, heroBg: heroes[4].b },
  { name: 'Sneha Grace', role: 'Media & PR Lead', image: mediaPRLead, heroPortrait: heroes[7].p, heroBg: heroes[7].b },
  { name: 'Hrisita Mohapatra', role: 'Coverage Lead', image: coverageLead, heroPortrait: heroes[5].p, heroBg: heroes[5].b },
  { name: 'Eshani Misra', role: 'Treasurer', image: treasurerEshani, heroPortrait: heroes[7].p, heroBg: heroes[7].b },
  { name: 'Sadhana', role: 'Deputy Hospitality Lead', image: dyHospitalitySadhana, heroPortrait: heroes[5].p, heroBg: heroes[5].b },
  { name: 'Hospitality Lead', role: 'Hospitality Lead', image: hospitalityLead, heroPortrait: heroes[9].p, heroBg: heroes[9].b },
  { name: 'Deputy Hospitality', role: 'Deputy Hospitality', image: deputyHospitality1, heroPortrait: heroes[8].p, heroBg: heroes[8].b },
  { name: 'Decor Lead', role: 'Decor Lead', image: decorLead, heroPortrait: heroes[6].p, heroBg: heroes[6].b },
  { name: 'Sponsorship Lead', role: 'Sponsorship Lead', image: sponsorshipLead, heroPortrait: heroes[2].p, heroBg: heroes[2].b },
  { name: 'Creative Head', role: 'Creative Head', image: creativeHead, heroPortrait: heroes[9].p, heroBg: heroes[9].b },
  { name: 'Deputy Tech Lead', role: 'Deputy Tech Lead', image: deputyTechLead, heroPortrait: heroes[6].p, heroBg: heroes[6].b },
  { name: 'Volunteer Lead 1', role: 'Volunteer Lead', image: volunteerLead, heroPortrait: heroes[1].p, heroBg: heroes[1].b },
  { name: 'Volunteer Lead 2', role: 'Volunteer Lead', image: volunteerLead1, heroPortrait: heroes[3].p, heroBg: heroes[3].b },
  { name: 'Cam Ops', role: 'Cam Ops', image: camOps, heroPortrait: heroes[2].p, heroBg: heroes[2].b },
];
