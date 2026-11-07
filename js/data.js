// ─────────────────────────────────────────────────────────────
//  Single source of truth for portfolio content.
//  Kaleab Mezgebe — Frontend & Mobile Software Engineer
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'Kaleab Mezgebe',
  title: 'Frontend & Mobile Software Engineer',
  company: 'Niyat Consultancy PLC',
  location: 'Addis Ababa & Mekelle, Ethiopia',
  email: 'kaleabmezgebe4@gmail.com',
  phone: '+251 945989369',
  github: 'https://github.com/kaleab-mezgebe',
  githubHandle: 'kaleab-mezgebe',
  linkedin: 'https://linkedin.com/in/kaleab-mezgebe-764a56198/',
  linkedinHandle: 'kaleab-mezgebe-764a56198',
  resume: 'assets/Kaleab_Mezgebe_CV.pdf',
  roles: [
    'Frontend & Mobile Software Engineer',
    'Flutter & Dart Specialist',
    'React.js & TypeScript Architect',
    'Real-time Systems Builder (SignalR)',
    'FinTech & Payment Gateway Integrator',
    'Computer Vision & HealthTech Developer',
  ],
  summary:
    'Frontend & Mobile Software Engineer with 5+ years of experience crafting high-performance mobile applications, ' +
    'responsive web architectures, and real-time systems. Specialized in Flutter/Dart, React.js, TypeScript, BLoC pattern, ' +
    'SignalR stream synchronization, and payment integrations with Telebirr and Chapa. ' +
    'Graduated with Academic Honors from Mekelle Institute of Technology (MIT) with a 3.88 / 4.00 CGPA.',
};

export const EXPERIENCE = [
  {
    company: 'Niyat Consultancy PLC',
    role: 'Frontend & Mobile Developer',
    period: 'Sep 2025 — Present',
    location: 'Addis Ababa, Ethiopia',
    mode: 'Hybrid',
    type: 'Full-time',
    current: true,
    points: [
      'Architect and build cross-platform mobile apps using Flutter and responsive web dashboards using React.js and TypeScript.',
      'Integrated real-time SignalR hubs and Google Maps SDK navigation for live driver GPS tracking and instantaneous ride matching.',
      'Engineered automated payment settlement pipelines with Telebirr and Chapa gateways for high-volume consumer transactions.',
      'Standardized BLoC architecture for unidirectional data flow, ensuring 60 FPS mobile UI performance across diverse Android/iOS devices.',
      'Developed high-throughput merchant portals with live order alerts, automated inventory sync, and financial analytics.',
    ],
    stack: ['Flutter', 'Dart', 'React.js', 'TypeScript', 'BLoC', 'SignalR', 'Telebirr & Chapa', 'PostgreSQL', 'Tailwind CSS'],
    products: ['Axumite Ride (Play Store)', 'Shemeta E-Commerce'],
  },
  {
    company: 'Grand Technology Solutions',
    role: 'Software Developer',
    period: 'Sep 2024 — Sep 2025',
    location: 'Mekelle, Tigray, Ethiopia',
    mode: 'On-site',
    type: 'Full-time',
    current: false,
    points: [
      'Developed modular, reusable UI components in React.js and integrated them with high-throughput backend RESTful APIs.',
      'Built and documented CRUD endpoints using FastAPI and PostgreSQL with comprehensive automated Postman test coverage.',
      'Refactored client-side state caching and API query bindings, eliminating redundant network round-trips.',
      'Partnered with product designers to ship modern responsive user interfaces with smooth micro-interactions and accessibility.',
    ],
    stack: ['React.js', 'JavaScript', 'Flutter', 'FastAPI', 'PostgreSQL', 'Postman', 'Git'],
    products: ['EthioBeds Hospitality', 'Hdyat Marketplace'],
  },
  {
    company: 'Tigray Culture & Tourism Bureau',
    role: 'Remote Mobile Application Developer',
    period: 'Jan 2024 — Jun 2024',
    location: 'Mekelle, Ethiopia',
    mode: 'Remote',
    type: 'Contract',
    current: false,
    points: [
      'Architected and delivered the cross-platform TCPH Flutter application for cultural heritage cataloging and spatial documentation.',
      'Engineered offline-first local database caching using Hive and SQLite to enable uninterrupted field operation in remote locations without internet.',
      'Implemented automated two-way conflict-free sync pipelines that bulk-upload queued monument data once connectivity is restored.',
      'Optimized camera image processing, EXIF metadata extraction, and precision GPS coordinates tagging directly on device.',
    ],
    stack: ['Flutter', 'Dart', 'Hive / SQLite', 'REST APIs', 'Offline-First Sync', 'Git'],
    products: ['TCPH Mobile Hub'],
  },
];

export const TEAM_COUNT = EXPERIENCE.length;

export const PROJECTS = [
  {
    name: 'Axumite Ride — Passenger & Driver Mobile App',
    slug: 'axumite-ride',
    kicker: 'Mobile App · Real-Time Ride Hailing',
    url: 'https://play.google.com/store/apps/details?id=com.axumite.customer&hl=en_US',
    driverUrl: 'https://play.google.com/store/apps/details?id=com.axumite.partner&hl=en_US',
    github: 'https://github.com/kaleab-mezgebe',
    image: 'assets/ride.png',
    badge: 'PRODUCTION GOOGLE PLAY STORE',
    category: 'mobile',
    description:
      'Cross-platform passenger and partner driver applications built with Flutter and BLoC state architecture, featuring live SignalR GPS fleet tracking and sub-second ride dispatch.',
    highlights: [
      'Deployed on Google Play Store with thousands of active completed rides',
      'Sub-second SignalR live GPS tracking and route streaming',
      'Telebirr & Chapa automated fare settlement workflows',
    ],
    stack: ['Flutter', 'Dart', 'BLoC', 'SignalR', 'Google Maps SDK', 'Play Store'],
  },
  {
    name: 'Shemeta E-Commerce — Multi-Vendor Platform',
    slug: 'shemeta-ecommerce',
    kicker: 'Web Platform · Multi-Vendor Commerce',
    url: 'https://nicom.dev.niyatconsultancy.com/en',
    github: 'https://github.com/kaleab-mezgebe',
    image: 'assets/shemeta.png',
    badge: 'LIVE DEMO PLATFORM',
    category: 'web',
    description:
      'High-throughput multi-vendor digital commerce platform with customer storefronts, merchant accounting dashboards, and payment gateway checkouts.',
    highlights: [
      'Multi-vendor order management & merchant digital wallets',
      'Sub-second page transitions & dynamic catalog discovery',
      'Telebirr & Chapa payment checkout integration',
    ],
    stack: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Telebirr & Chapa'],
  },
  {
    name: 'AI Dermatologist — Skin Disease Diagnostic App',
    slug: 'ai-dermatologist',
    kicker: 'AI & HealthTech · Computer Vision',
    url: 'https://github.com/kaleab-mezgebe/AI-Dermatologist',
    github: 'https://github.com/kaleab-mezgebe/AI-Dermatologist',
    image: 'assets/ai.png',
    badge: 'AI & HEALTHTECH APP',
    category: 'ai',
    description:
      'Cross-platform diagnostic health application with on-device computer vision models (TensorFlow Lite) and cloud triage assessment for remote clinical screening.',
    highlights: [
      'On-device TensorFlow Lite inference with offline triage',
      'Instant lesion probability breakdown & confidence scores',
      'Structured clinical recommendation reporting & PDF export',
    ],
    stack: ['Flutter', 'Dart', 'TensorFlow Lite', 'Computer Vision', 'REST APIs'],
  },
  {
    name: 'ExpenseIQ — Financial Document & Receipt OCR Pipeline',
    slug: 'expense-iq',
    kicker: 'AI & FinTech · Automated OCR',
    url: 'https://github.com/kaleab-mezgebe/ExpenseIQ',
    github: 'https://github.com/kaleab-mezgebe/ExpenseIQ',
    image: 'assets/expense_iq.png',
    badge: 'AI RECEIPT OCR ENGINE',
    category: 'ai',
    description:
      'Mobile and web financial parsing application transforming paper receipts, invoices, and bank slips into structured ledger records using OCR & computer vision.',
    highlights: [
      'Automated optical character recognition (OCR) parsing',
      'Line-item extraction & tax calculation',
      'Export to Excel, CSV & accounting APIs',
    ],
    stack: ['Flutter', 'Python', 'FastAPI', 'OCR Engine', 'PostgreSQL'],
  },
  {
    name: 'EthioBeds — Hospitality & Hotel Booking Platform',
    slug: 'ethiobeds',
    kicker: 'Web Platform · Production SaaS',
    url: 'https://ethiobeds.com',
    github: 'https://github.com/kaleab-mezgebe',
    image: 'assets/ethiobeds.png',
    badge: 'LIVE PRODUCTION SAAS',
    category: 'web',
    description:
      'Hospitality booking and property management platform connecting travelers with verified accommodations, featuring interactive map search and real-time room availability.',
    highlights: [
      'Live production booking engine across Ethiopia',
      'Interactive map search & availability calendars',
      'Chapa & Telebirr secure payment processing',
    ],
    stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'Chapa API', 'PostgreSQL'],
  },
  {
    name: 'CBEBirr App Clone (FinTech UI)',
    slug: 'cbebirr-clone',
    kicker: 'Mobile App · FinTech UI/UX',
    url: 'https://www.linkedin.com/posts/kaleab-mezgebe-764a56198_cbe-birr-app-clone-in-flutter-practice-activity-7410324964827987968-PKSr',
    github: 'https://github.com/kaleab-mezgebe/cbe_birr',
    image: 'assets/cbebirr.png',
    badge: 'HIGH-FIDELITY FINTECH UI',
    category: 'mobile',
    description:
      'Pixel-perfect replication of Commercial Bank of Ethiopia mobile banking in Flutter with high-fidelity animations, balance conceal toggles, and fluid transaction flows.',
    highlights: [
      'Fluid 60 FPS micro-interactions & custom animations',
      'Secure visual balance toggles & PIN pad simulation',
      'Modular Flutter component architecture',
    ],
    stack: ['Flutter', 'Dart', 'FinTech UI', 'State Management', 'Micro-Animations'],
  },
  {
    name: 'Tigray Cultural Property Hub (TCPH)',
    slug: 'tcph-hub',
    kicker: 'Mobile App · Offline Heritage Catalog',
    url: 'https://github.com/kaleab-mezgebe/TCPH-',
    github: 'https://github.com/kaleab-mezgebe/TCPH-',
    image: 'assets/tcph.png',
    badge: 'OFFLINE-FIRST FIELD APP',
    category: 'mobile',
    description:
      'Cross-platform field documentation app built for the Tigray Culture & Tourism Bureau with offline SQLite caching and spatial GPS coordinates recording.',
    highlights: [
      'Offline-first field documentation with Hive & SQLite',
      'GPS coordinates tagging & metadata photo capture',
      'Bulk cloud synchronization when back online',
    ],
    stack: ['Flutter', 'Dart', 'Hive / SQLite', 'GPS SDK', 'Offline-First'],
  },
  {
    name: 'Hdyat Traditional Marketplace — Cultural E-Commerce',
    slug: 'hdyat-marketplace',
    kicker: 'Web Platform · Cultural E-Commerce',
    url: 'https://github.com/kaleab-mezgebe',
    github: 'https://github.com/kaleab-mezgebe',
    image: 'assets/hdyat.png',
    badge: 'SPECIALIZED COMMERCE',
    category: 'web',
    description:
      'Digital marketplace connecting traditional Ethiopian weavers, Habesha Kemis artisans, and cultural craftsmakers with local and diaspora buyers worldwide.',
    highlights: [
      'Custom size measurement & tailoring builder',
      'Multi-currency pricing (ETB & USD)',
      'Merchant inventory management portal',
    ],
    stack: ['React.js', 'Tailwind CSS', 'Node.js', 'Chapa Gateway', 'MongoDB'],
  },
  {
    name: 'TYAMMS — Youth Operations & Member Management',
    slug: 'tyamms-portal',
    kicker: 'Web Platform · Enterprise CRM',
    url: 'https://github.com/kaleab-mezgebe/tyamms',
    github: 'https://github.com/kaleab-mezgebe/tyamms',
    image: 'assets/tyamms.png',
    badge: 'ENTERPRISE OPERATIONS CRM',
    category: 'web',
    description:
      'Centralized organization management system streamlining membership registration, regional chapter activities, dues tracking, and event attendance.',
    highlights: [
      'Automated digital ID card generator with QR codes',
      'Role-based access control (RBAC) across regional hubs',
      'Real-time participation statistics & reporting',
    ],
    stack: ['React.js', 'FastAPI', 'PostgreSQL', 'QR Code SDK', 'Docker'],
  },
];

export const SOFOF_PROJECTS = [
  {
    name: 'Axumite Partner Driver App',
    kicker: 'Real-time driver dispatch',
    url: 'https://play.google.com/store/apps/details?id=com.axumite.partner&hl=en_US',
    description: 'Driver fleet management app with automated fare calculation, turn-by-turn navigation, and live daily earnings tracker.',
  },
  {
    name: 'Shemeta Vendor Administration',
    kicker: 'E-commerce merchant portal',
    url: 'https://nicom.dev.niyatconsultancy.com/en',
    description: 'Multi-vendor administrative suite with CSV bulk product catalog imports, order fulfillment tracking, and payout ledger.',
  },
];

export const SKILL_CATEGORIES = {
  mobile: { label: 'Mobile Architecture', color: '#00f0ff' },
  frontend: { label: 'Frontend & Web', color: '#39ff88' },
  backend: { label: 'Backend & Real-Time', color: '#ffb800' },
  data: { label: 'Databases & Storage', color: '#ff2bd6' },
  ai: { label: 'AI & HealthTech', color: '#9d8cff' },
  craft: { label: 'Architecture & CI/CD', color: '#ff7a59' },
};

// node: true → appears as an interactive 3D node in the Three.js mesh
export const SKILLS = [
  { label: 'Flutter', cat: 'mobile', node: true, info: 'Primary mobile framework since 2021 — production apps on Google Play Store with thousands of rides.' },
  { label: 'Dart', cat: 'mobile', node: true, info: 'Language for all mobile apps — asynchronous streams, isolates, and clean object-oriented architecture.' },
  { label: 'BLoC Pattern', cat: 'mobile', node: true, info: 'State management choice for predictable unidirectional data flow and 60 FPS mobile UI.' },
  { label: 'Google Maps SDK', cat: 'mobile', node: true, info: 'Live geospatial tracking, polyline route calculation, and driver location updates.' },
  { label: 'React.js', cat: 'frontend', node: true, info: 'Core web UI framework for dashboards, admin portals, and multi-vendor e-commerce platforms.' },
  { label: 'TypeScript', cat: 'frontend', node: true, info: 'Type-safe enterprise web development across customer storefronts and internal tools.' },
  { label: 'Next.js', cat: 'frontend', node: true, info: 'Server-side rendered web portals with SEO optimization and sub-second page transitions.' },
  { label: 'Tailwind CSS', cat: 'frontend', node: true, info: 'Utility-first styling system used across Shemeta, EthioBeds, and production dashboards.' },
  { label: 'SignalR', cat: 'backend', node: true, info: 'Full-duplex real-time WebSocket protocol for live driver tracking and instant ride matching.' },
  { label: 'FastAPI', cat: 'backend', node: true, info: 'Python REST API framework for high-throughput endpoints, OCR pipelines, and Postman testing.' },
  { label: 'Node.js', cat: 'backend', node: true, info: 'Backend runtimes for microservices, webhook listeners, and merchant portals.' },
  { label: 'REST APIs', cat: 'backend', node: true, info: 'Clean API contract design, serialization, and robust authentication mechanisms.' },
  { label: 'PostgreSQL', cat: 'data', node: true, info: 'Relational data store for transactions, ACID integrity, and geospatial booking queries.' },
  { label: 'Hive / SQLite', cat: 'data', node: true, info: 'On-device local storage for offline-first field caching in TCPH and mobile apps.' },
  { label: 'MongoDB', cat: 'data', node: true, info: 'Document storage for e-commerce catalogs, reviews, and dynamic content attributes.' },
  { label: 'TensorFlow Lite', cat: 'ai', node: true, info: 'On-device computer vision models for instant offline skin lesion diagnostic screening.' },
  { label: 'Telebirr & Chapa', cat: 'craft', node: true, info: 'Payment gateway integrations with automated webhook verification and financial reconciliation.' },
  { label: 'Git & GitHub', cat: 'craft', node: true, info: 'Version control workflows, branching conventions, and automated GitHub Actions deployments.' },
  { label: 'Docker', cat: 'craft', info: 'Containerized deployment environments for reproducible builds and backend services.' },
  { label: 'Postman', cat: 'craft', info: 'Automated API collection testing, mock servers, and endpoint validation.' },
  { label: 'Micro-Animations', cat: 'frontend', info: 'Fluid transition curves, gesture feedback, and delight-inducing micro-interactions.' },
];

export const EDUCATION = {
  degree: 'BSc in Information Technology',
  school: 'Mekelle Institute of Technology (MIT)',
  period: '2018 — 2025',
  location: 'Mekelle, Ethiopia',
  gpa: '3.88 / 4.00 (Academic Honors)',
  exitExam: '86 / 100 (National Exit Exam — Top Tier)',
};

export const ACHIEVEMENTS = [
  { title: 'Graduated with Academic Honors (CGPA 3.88 / 4.00)', org: 'Mekelle Institute of Technology (MIT)', date: '2025' },
  { title: 'Top-Tier National Higher Education Exit Exam (Score: 86 / 100)', org: 'Ministry of Education Ethiopia', date: '2025' },
  { title: 'Shipped Axumite Ride to Google Play Store (Thousands of Completed Rides)', org: 'Google Play Store / Niyat Consultancy', date: '2025' },
  { title: 'Engineered On-Device AI Health Diagnostic App with TensorFlow Lite', org: 'AI Dermatologist Project', date: '2024' },
];

export const FLOW = [
  {
    stage: 'FLUTTER UI',
    title: 'Gesture Detection & 60 FPS Micro-Interactions',
    tech: 'Flutter 3.x · Impeller / Skia · Custom Gestures',
    story: 'Passenger taps "Confirm Ride" in the mobile app. The UI immediately triggers a haptic pulse, optimistic button transition, and dispatches a BLoC event at 60 FPS without frame drops.',
    metric: '0.02ms event latency',
    where: 'Axumite Ride Passenger App',
    color: '#00f0ff',
  },
  {
    stage: 'STATE MACHINE',
    title: 'BLoC State Emission & Local Cache',
    tech: 'flutter_bloc · Freezed · Hive / SQLite',
    story: 'BLoC validates fare parameters, records booking state to local Hive cache for offline durability, and emits RideSearchingState to update UI views predictably.',
    metric: '100% predictable state flow',
    where: 'Mobile Architecture Layer',
    color: '#39ff88',
  },
  {
    stage: 'REAL-TIME STREAM',
    title: 'SignalR WebSocket Dispatch',
    tech: 'SignalR Core · WebSockets · Protocol Buffers',
    story: 'Ride request packet is streamed over a persistent full-duplex WebSocket hub connection to the backend dispatch cluster with auto-reconnect fallback.',
    metric: 'sub-15ms broadcast latency',
    where: 'Real-Time Messaging Hub',
    color: '#ff8a3d',
  },
  {
    stage: 'API GATEWAY',
    title: 'Spatial Query & Driver Proximity',
    tech: 'FastAPI / Node.js · PostGIS · Redis Spatial',
    story: 'Gateway verifies JWT authentication, calculates geographical driver bounding boxes via PostGIS, and prioritizes nearest available drivers within radius.',
    metric: '< 45ms geospatial lookup',
    where: 'Dispatch Backend Services',
    color: '#9d8cff',
  },
  {
    stage: 'SETTLEMENT',
    title: 'Payment Gateway & Audit Trail',
    tech: 'Telebirr API · Chapa API · PostgreSQL ACID',
    story: 'Transaction ledger records pending fare reservation. Telebirr/Chapa webhook listener verifies HMAC signature and confirms wallet authorization safely.',
    metric: 'Zero financial discrepancy',
    where: 'FinTech Payment Pipeline',
    color: '#ff2bd6',
  },
  {
    stage: 'CLIENT ACK',
    title: 'Driver Matched & Live Route Streaming',
    tech: 'Google Maps SDK · Polyline Animation · Push Notification',
    story: 'Driver accepts. Live coordinates start streaming back at 2 Hz, animating the vehicle icon smoothly along turn-by-turn routing with zero jitter.',
    metric: '200 OK · Live ride active',
    where: 'Passenger & Driver Mobile Apps',
    color: '#00f0ff',
  },
];

export const HIGHLIGHTS = [
  'Graduated with Academic Honors from Mekelle Institute of Technology (MIT) with a 3.88 / 4.00 CGPA.',
  'Top-Tier National Higher Education Exit Exam distinction (Score: 86 / 100).',
  'Shipped Axumite Ride to Google Play Store with thousands of active rides and live SignalR dispatch.',
  'Integrated Telebirr and Chapa payment gateways across production mobile and web platforms.',
  'Built on-device AI diagnostic mobile app using Flutter and TensorFlow Lite computer vision models.',
  '5+ years engineering high-performance mobile apps (Flutter/Dart) and responsive web applications (React/TypeScript).',
];

export const ARTICLES = [
  {
    platform: 'LinkedIn',
    title: 'Architecting 60 FPS Micro-Interactions in Mobile FinTech with Flutter & BLoC',
    summary:
      'How we structured unidirectional state management, cached state deltas, and eliminated animation stutter across high-security financial user flows.',
    url: 'https://www.linkedin.com/posts/kaleab-mezgebe-764a56198_cbe-birr-app-clone-in-flutter-practice-activity-7410324964827987968-PKSr',
    tags: ['Flutter', 'BLoC', 'FinTech', 'Performance', 'Dart'],
  },
];

export const ORIGIN_PATH = [
  { year: '2018', label: 'MIT IT Foundations', sub: 'Mekelle Institute of Technology' },
  { year: '2022', label: 'Mobile Engineering', sub: 'Flutter, Dart & BLoC' },
  { year: '2024', label: 'Offline Systems & AI', sub: 'Tigray Bureau & AI HealthTech' },
  { year: '2025', label: 'Full-Stack & Real-Time', sub: 'Niyat Consultancy PLC' },
];

export const ORIGIN = [
  {
    id: 'line',
    name: 'Mobile Gesture Engine',
    badge: 'Fluid 60 FPS Micro-Interactions',
    what: 'Capacitive touch stream reads user finger trajectories at 120 Hz; a feedback loop recalculates physics curves continuously to deliver fluid spring animations.',
    from: 'Touch feedback loop',
    to: 'Responsive state streams & UI reactivity',
    tags: ['touch sensors', 'gesture physics', 'spring curves'],
  },
  {
    id: 'sumo',
    name: 'Real-Time GPS Fleet Tracking',
    badge: 'Axumite Ride Telemetry',
    what: 'Device GPS reads coordinates every second; state engine validates velocity, snaps to road networks, and broadcasts live positions to nearby riders.',
    from: 'Geospatial coordinate loop',
    to: 'SignalR real-time stream synchronization',
    tags: ['GPS tracking', 'SignalR', 'geospatial routing'],
  },
  {
    id: 'voice',
    name: 'On-Device AI Inference',
    badge: 'TensorFlow Lite HealthTech',
    what: 'Camera image is quantized, normalized, and evaluated through a mobile neural net with zero cloud latency and full offline privacy.',
    from: 'Camera frame → tensor → classification',
    to: 'Mobile-first edge compute & offline triage',
    tags: ['computer vision', 'TensorFlow Lite', 'offline triage'],
  },
  {
    id: 'rover',
    name: 'High-Fidelity FinTech Engine',
    badge: 'CBEBirr & Payment Gateways',
    what: 'Secure balance concealment, cryptographic PIN pad keypad entry, and idempotent Telebirr/Chapa checkout orchestration.',
    from: 'Cryptographic input & wallet reconciliation',
    to: 'Zero-error financial transaction pipelines',
    tags: ['FinTech UI', 'Telebirr & Chapa', 'idempotency'],
  },
];

export const ANALYTICS = {
  provider: null, // Privacy-first by default
  domains: ['kaleab-mezgebe.github.io'],
};
