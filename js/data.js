// ─────────────────────────────────────────────────────────────
//  Single source of truth for portfolio content.
//  Kaleab Mezgebe — Mobile App Developer (Flutter & Dart)
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'Kaleab Mezgebe',
  title: 'Mobile App Developer (Flutter & Dart)',
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
    'Mobile App Developer (Flutter & Dart)',
    'Android & iOS Cross-Platform Engineer',
    'Firebase, REST API & SignalR Integrator',
    'Clean Architecture & BLoC Specialist',
    'Mobile FinTech & Maps Engineer',
  ],
  summary:
    'Mobile App Developer with over 3+ years of professional experience building and shipping production Android & iOS applications. ' +
    'Specialized in Flutter & Dart, Firebase, REST APIs, Clean Architecture with BLoC, real-time SignalR stream synchronization, ' +
    'Google Maps SDK, offline-first Hive/SQLite caching, and Telebirr & Chapa payment integrations. ' +
    'Graduated with Academic Honors from Mekelle Institute of Technology (MIT) with a 3.88 / 4.00 CGPA.',
};

export const EXPERIENCE = [
  {
    company: 'Niyat Consultancy PLC',
    role: 'Mobile App Developer (Flutter & Dart)',
    period: 'Sep 2025 — Present',
    location: 'Addis Ababa, Ethiopia',
    mode: 'Hybrid',
    type: 'Full-time',
    current: true,
    points: [
      'Architect, build, and ship production cross-platform Android & iOS mobile applications in Flutter & Dart.',
      'Integrated Firebase (FCM Push Notifications, Auth), real-time SignalR hubs, RESTful APIs, and Google Maps SDK for live GPS fleet tracking and sub-second ride dispatch.',
      'Engineered secure in-app wallet and automated mobile payment pipelines with Telebirr and Chapa gateways.',
      'Standardized Clean Architecture and BLoC state management for predictable unidirectional data flow, locking mobile UI performance at 60 FPS.',
    ],
    stack: ['Flutter', 'Dart', 'Android & iOS', 'Firebase', 'REST APIs', 'BLoC', 'SignalR', 'Google Maps SDK', 'Telebirr & Chapa'],
    products: ['Axumite Ride (Play Store)', 'Niyat Ride MVP'],
  },
  {
    company: 'Grand Technology Solutions',
    role: 'Mobile App Developer (Flutter)',
    period: 'Sep 2024 — Sep 2025',
    location: 'Mekelle, Tigray, Ethiopia',
    mode: 'On-site',
    type: 'Full-time',
    current: false,
    points: [
      'Engineered cross-platform Flutter mobile modules with responsive UI layouts and reactive BLoC/Provider state management.',
      'Built offline-first SQLite local caching with automatic background synchronization to RESTful APIs, reducing redundant network calls across unstable mobile connections.',
      'Validated mobile API contracts and end-to-end authentication flows using Postman automated test suites.',
    ],
    stack: ['Flutter', 'Dart', 'BLoC', 'SQLite', 'REST APIs', 'Postman', 'Git'],
    products: ['TYAMMS Mobile App'],
  },
  {
    company: 'Tigray Culture & Tourism Bureau',
    role: 'Mobile Application Developer',
    period: 'Jan 2024 — Jun 2024',
    location: 'Mekelle, Ethiopia',
    mode: 'Remote',
    type: 'Contract',
    current: false,
    points: [
      'Architected and delivered the cross-platform TCPH Flutter application for heritage cataloging and spatial GPS mapping.',
      'Engineered offline-first local database caching using Hive and SQLite for continuous operation in remote regions.',
      'Implemented automated two-way conflict-free sync pipelines that bulk-upload queued monument data upon network reconnection.',
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
    kicker: 'Mobile App · Live Fleet Tracking',
    url: 'https://play.google.com/store/apps/details?id=com.axumite.customer&hl=en_US',
    driverUrl: 'https://play.google.com/store/apps/details?id=com.axumite.partner&hl=en_US',
    github: 'https://github.com/kaleab-mezgebe',
    image: 'assets/ride.png',
    badge: 'GOOGLE PLAY STORE',
    category: 'mobile',
    description:
      'Cross-platform passenger and driver mobile apps built with Flutter, BLoC, Firebase, and real-time SignalR GPS fleet synchronization with sub-second dispatch.',
    highlights: [
      'Live on Google Play Store with thousands of completed rides',
      'Real-time driver location updates & polyline map routing',
      'Telebirr & Chapa automated fare settlement & FCM push notifications',
    ],
    stack: ['Flutter', 'Dart', 'BLoC', 'Firebase', 'SignalR', 'Google Maps SDK', 'Play Store'],
  },
  {
    name: 'AI Dermatologist — Skin Disease Diagnostic App',
    slug: 'ai-dermatologist',
    kicker: 'Mobile App · On-Device AI Vision',
    url: 'https://github.com/kaleab-mezgebe/AI-Dermatologist',
    github: 'https://github.com/kaleab-mezgebe/AI-Dermatologist',
    image: 'assets/ai.png',
    badge: 'ON-DEVICE AI INFERENCE',
    category: 'ai',
    description:
      'Cross-platform Android & iOS diagnostic health app with on-device computer vision models (TensorFlow Lite) and REST API cloud triage assessment.',
    highlights: [
      'On-device TensorFlow Lite neural model with offline diagnostic capability',
      'Lesion probability breakdown, confidence scoring & structured clinical reports',
      'Zero-latency edge processing protecting patient privacy',
    ],
    stack: ['Flutter', 'Dart', 'TensorFlow Lite', 'Computer Vision', 'REST APIs'],
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
      'Cross-platform field documentation mobile app built for the Tigray Culture & Tourism Bureau with offline Hive/SQLite caching and spatial GPS tagging.',
    highlights: [
      'Offline-first field documentation with Hive & SQLite databases',
      'GPS coordinates tagging, camera integration & EXIF metadata extraction',
      'Automated background queue that syncs to cloud upon network reconnection',
    ],
    stack: ['Flutter', 'Dart', 'Hive / SQLite', 'GPS SDK', 'Offline-First'],
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
      'Fluid 60 FPS micro-interactions, spring curves & custom transitions',
      'Secure balance concealment & custom cryptographic PIN keypad',
      'Modular clean architecture with separation of UI, domain, and state',
    ],
    stack: ['Flutter', 'Dart', 'FinTech UI', 'BLoC', 'Micro-Animations'],
  },
  {
    name: 'ExpenseIQ — Financial Document & Receipt OCR Pipeline',
    slug: 'expense-iq',
    kicker: 'Mobile App · AI Receipt OCR',
    url: 'https://github.com/kaleab-mezgebe/ExpenseIQ',
    github: 'https://github.com/kaleab-mezgebe/ExpenseIQ',
    image: 'assets/expense_iq.png',
    badge: 'AI RECEIPT OCR APP',
    category: 'ai',
    description:
      'Flutter mobile receipt scanner converting paper receipts, invoices, and bank slips into structured ledger records using computer vision OCR & REST APIs.',
    highlights: [
      'Mobile camera capture & automated optical character recognition (OCR) pipeline',
      'Line-item extraction, tax calculation & currency normalization',
      'Direct export to Excel, CSV, and accounting REST APIs',
    ],
    stack: ['Flutter', 'Dart', 'REST APIs', 'OCR Engine', 'FastAPI'],
  },
];

export const SKILL_CATEGORIES = {
  mobile: { label: 'Mobile Core & Architecture', color: '#00f0ff' },
  frontend: { label: 'Mobile UI, Maps & UX', color: '#39ff88' },
  backend: { label: 'Cloud, APIs & Real-Time', color: '#ffb800' },
  data: { label: 'Local Storage & Sync', color: '#ff2bd6' },
  ai: { label: 'On-Device AI', color: '#9d8cff' },
  craft: { label: 'App Release & DevOps', color: '#ff7a59' },
};

// node: true → appears as an interactive 3D node in the Three.js mesh
export const SKILLS = [
  { label: 'Flutter', cat: 'mobile', node: true, info: 'Primary cross-platform Android & iOS framework — production apps published on Google Play Store with thousands of active rides.' },
  { label: 'Dart', cat: 'mobile', node: true, info: 'Core language for all mobile apps — async streams, isolates, null-safety, and clean object-oriented architecture.' },
  { label: 'BLoC / Provider', cat: 'mobile', node: true, info: 'State management architecture for predictable unidirectional data flow and smooth 60 FPS mobile interfaces.' },
  { label: 'Clean Architecture', cat: 'mobile', node: true, info: 'Modular separation of UI, domain, and data layers for scalable, testable, maintainable mobile codebases.' },
  { label: 'Android & iOS', cat: 'mobile', node: true, info: 'Native platform configuration, permissions, signing certificates, and end-to-end Play Store & App Store builds.' },
  { label: 'Google Maps SDK', cat: 'frontend', node: true, info: 'Live geospatial tracking, polyline route calculation, custom markers, and smooth 60 FPS camera movement.' },
  { label: 'Responsive Mobile UI', cat: 'frontend', node: true, info: 'Adaptive layouts crafted across small Android handsets, large iPhones, and tablets with pixel precision.' },
  { label: 'Micro-Animations', cat: 'frontend', node: true, info: 'Fluid transition curves, gesture feedback, and delight-inducing 60 FPS FinTech micro-interactions.' },
  { label: 'Firebase (FCM & Auth)', cat: 'backend', node: true, info: 'Push notifications (FCM), authentication, Cloud Firestore real-time syncing, and crash analytics across Android & iOS.' },
  { label: 'REST APIs', cat: 'backend', node: true, info: 'Dio/HTTP client integration, JWT authentication, interceptors, error handling, and clean JSON serialization.' },
  { label: 'SignalR / WebSockets', cat: 'backend', node: true, info: 'Full-duplex real-time sockets for live driver tracking, trip updates, and instant ride matching.' },
  { label: 'Telebirr & Chapa', cat: 'backend', node: true, info: 'Third-party mobile payment SDK and gateway integrations with secure webhook verification.' },
  { label: 'Hive / SQLite', cat: 'data', node: true, info: 'On-device local storage powering offline-first field caching and instant startup performance.' },
  { label: 'Offline-First Sync', cat: 'data', node: true, info: 'Queued conflict-free background sync pipelines that automatically reconcile data when connectivity returns.' },
  { label: 'Secure Storage', cat: 'data', info: 'Encrypted on-device storage for JWT tokens, user credentials, and sensitive FinTech session data.' },
  { label: 'TensorFlow Lite', cat: 'ai', node: true, info: 'Quantized on-device computer vision models running locally inside Flutter for instant offline screening.' },
  { label: 'OCR Engine', cat: 'ai', node: true, info: 'Automated mobile camera receipt scanning and structured financial text extraction.' },
  { label: 'Play Store & App Store', cat: 'craft', node: true, info: 'End-to-end mobile release pipelines, store listings, signing keys, TestFlight, and production rollouts.' },
  { label: 'Git & GitHub', cat: 'craft', node: true, info: 'Clean branching workflows, pull request code reviews, and automated CI/CD release pipelines.' },
  { label: 'Postman', cat: 'craft', info: 'API endpoint testing, contract verification, mock servers, and debugging backend responses.' },
  { label: 'Debugging & Profiling', cat: 'craft', info: 'Flutter DevTools frame profiling, memory leak tracing, and network latency optimization.' },
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
  'Integrated Telebirr and Chapa payment gateways into production Flutter mobile applications.',
  'Built on-device AI diagnostic mobile app using Flutter and TensorFlow Lite computer vision models.',
  'Over 3+ years of professional experience engineering production Android & iOS mobile apps with Flutter, Dart, Firebase, REST APIs, and BLoC.',
];

export const ANALYTICS = {
  provider: null,
  domains: ['kaleab-mezgebe.github.io'],
};
