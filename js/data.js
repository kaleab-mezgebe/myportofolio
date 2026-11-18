// ─────────────────────────────────────────────────────────────
//  Single source of truth for portfolio content.
//  Kaleab Mezgebe — Mobile App Developer (Flutter & Dart)
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'Kaleab Mezgebe Fissaha',
  title: 'Flutter Developer | Mobile App Developer (Android & iOS)',
  company: 'Niyat Consultancy PLC',
  location: 'Addis Ababa, Ethiopia',
  email: 'kaleabmezgebe4@gmail.com',
  phone: '+251 945 989 369',
  github: 'https://github.com/kaleab-mezgebe',
  githubHandle: 'kaleab-mezgebe',
  linkedin: 'https://linkedin.com/in/kaleab-mezgebe-764a56198/',
  linkedinHandle: 'kaleab-mezgebe-764a56198',
  resume: 'assets/Kaleab_Mezgebe_CV.pdf',
  roles: [
    'Flutter Developer (Android & iOS)',
    'Mobile App Developer (Flutter & Dart)',
    'Clean Architecture · BLoC · Provider · Riverpod',
    'Firebase, Dio REST APIs & SignalR Integrator',
    'Google Play Store & TestFlight Release Engineer',
  ],
  summary:
    'Motivated Flutter Developer with 3+ years of experience building and maintaining production Android and iOS apps ' +
    'across ride-hailing, e-commerce, and logistics using Flutter & Dart. Proficient in Clean Architecture, modular responsive UI, ' +
    'BLoC/Cubit, Provider & Riverpod state management, REST APIs (Dio/Interceptors), Firebase, Google Maps SDK, SignalR, Telebirr & Chapa, ' +
    'SQLite/Hive offline persistence, unit/widget testing, and CI/CD-assisted Google Play Store & TestFlight deployment.',
};

export const EXPERIENCE = [
  {
    company: 'Niyat Consultancy PLC',
    role: 'Flutter Developer',
    period: 'Jul 2025 — Present',
    location: 'Addis Ababa, Ethiopia',
    mode: 'Hybrid',
    type: 'Full-time',
    current: true,
    points: [
      'Develop and maintain commercial Android and iOS Flutter apps (Axumite Ride and Shemeta Multi-Vendor E-Commerce) following Clean Architecture and reusable UI design.',
      'Implemented BLoC/Cubit and Provider state flows alongside Dio REST interceptors for JWT session refresh, cart/booking sync, and structured API error handling.',
      'Integrated Google Maps SDK, SignalR WebSockets, Firebase FCM, and Telebirr/Chapa payment APIs with native Android/iOS permissions, Git reviews, and Play Console CI/CD releases.',
    ],
    stack: ['Flutter', 'Dart', 'BLoC / Cubit', 'Provider', 'Dio REST', 'Firebase FCM', 'SignalR', 'Google Maps SDK', 'Telebirr & Chapa', 'Play Console CI/CD'],
    products: ['Axumite Ride (Play Store)', 'Shemeta E-Commerce App'],
  },
  {
    company: 'Grand Technology Solutions',
    role: 'Mobile Application Developer',
    period: 'Sep 2024 — Sep 2025',
    location: 'Mekelle, Ethiopia',
    mode: 'On-site',
    type: 'Full-time',
    current: false,
    points: [
      'Built and maintained the TYAMMS cross-platform Flutter app featuring reusable widget libraries and state management with Provider and Riverpod.',
      'Implemented SQLite local database caching and offline-first sync queues paired with REST API integration and validation tested via Postman and Git.',
      'Aligned shared REST API contracts, session tokens, and structured error handling across mobile and web interfaces (EthioBeds).',
    ],
    stack: ['Flutter', 'Dart', 'Provider', 'Riverpod', 'SQLite', 'Offline-First Sync', 'REST APIs', 'Postman', 'Git'],
    products: ['TYAMMS Mobile App'],
  },
  {
    company: 'Tigray Culture & Tourism Bureau',
    role: 'Mobile Application Developer (Contract)',
    period: 'Jan 2024 — Jun 2024',
    location: 'Mekelle, Ethiopia',
    mode: 'Remote',
    type: 'Contract',
    current: false,
    points: [
      'Delivered the TCPH cross-platform Flutter heritage registration app for Android and iOS devices, digitizing 1,000+ records with GPS metadata and photo capture.',
      'Implemented Provider state management, Dio REST clients with timeout/offline error recovery, and local persistence via SQLite, Hive, and SharedPreferences.',
    ],
    stack: ['Flutter', 'Dart', 'Provider', 'Dio', 'SQLite / Hive', 'SharedPreferences', 'GPS Metadata', 'Git'],
    products: ['TCPH Mobile App'],
  },
];

export const TEAM_COUNT = EXPERIENCE.length;

export const PROJECTS = [
  {
    name: 'Axumite Ride — Passenger & Partner Driver Apps',
    slug: 'axumite-ride',
    kicker: 'Mobile App · Live Ride-Hailing',
    url: 'https://play.google.com/store/apps/details?id=com.axumite.customer&hl=en_US',
    driverUrl: 'https://play.google.com/store/apps/details?id=com.axumite.partner&hl=en_US',
    github: 'https://github.com/kaleab-mezgebe',
    image: 'assets/ride.png',
    badge: 'GOOGLE PLAY STORE',
    category: 'mobile',
    description:
      'Dual live ride-hailing Android & iOS apps built with Flutter, Clean Architecture, BLoC/Cubit, real-time SignalR GPS dispatch, Firebase FCM, and Telebirr/Chapa payments.',
    highlights: [
      'Modular, responsive Flutter UI for live map booking, route polylines & smooth 60 FPS animations',
      'Encrypted JWT session management (flutter_secure_storage) & Dio retry/error interceptors',
      'Native Android/iOS configs & GitHub Actions CI/CD releases to Google Play Store',
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'BLoC / Cubit', 'Dio', 'SignalR', 'Google Maps SDK', 'Firebase FCM', 'Telebirr & Chapa'],
  },
  {
    name: 'Shemeta E-Commerce — Multi-Vendor Shopping Mobile App',
    slug: 'shemeta-ecommerce',
    kicker: 'Mobile App · Multi-Vendor Commerce',
    url: 'https://nicom.dev.niyatconsultancy.com/en',
    github: 'https://github.com/kaleab-mezgebe',
    image: 'assets/shemeta.png',
    badge: 'FLUTTER COMMERCE APP',
    category: 'mobile',
    description:
      'Cross-platform Flutter commerce app engineered for faceted product discovery, persistent cart state management, checkout transitions, and live order tracking.',
    highlights: [
      'Reusable Flutter UI components for faceted search, category filtering & persistent cart state',
      'Telebirr & Chapa payment verification REST callbacks via Dio with structured error handling',
      'Session token refresh & live order status updates using Clean Architecture & BLoC',
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'BLoC', 'Dio REST APIs', 'SharedPreferences', 'Telebirr & Chapa'],
  },
  {
    name: 'Delivery-Man-App (Wanza Express) — Logistics Mobile App',
    slug: 'delivery-man-app',
    kicker: 'Mobile App · Courier & Logistics',
    url: 'https://github.com/kaleab-mezgebe/Delivery-Man-App',
    github: 'https://github.com/kaleab-mezgebe/Delivery-Man-App',
    image: 'assets/ride.png',
    badge: 'LOGISTICS COURIER APP',
    category: 'mobile',
    description:
      'Cross-platform Flutter courier dispatch app for e-commerce order tracking, live GPS routing, and digital proof-of-delivery capture.',
    highlights: [
      'Clean Architecture layers with Provider state management & GetIt dependency injection',
      'Typed Dio REST error handling & SharedPreferences session/order caching',
      'Google Maps SDK turn-by-turn routing & Firebase real-time delivery alerts',
    ],
    stack: ['Flutter', 'Dart', 'Provider', 'GetIt', 'Dio', 'SharedPreferences', 'Google Maps SDK', 'Firebase'],
  },
  {
    name: 'FieldAI & AI Dermatologist — Offline-First Mobile Apps',
    slug: 'fieldai-dermatologist',
    kicker: 'Mobile App · Offline-First & On-Device AI',
    url: 'https://github.com/kaleab-mezgebe/fieldai_flutter',
    github: 'https://github.com/kaleab-mezgebe/fieldai_flutter',
    image: 'assets/ai.png',
    badge: 'OFFLINE-FIRST AI APPS',
    category: 'ai',
    description:
      'Bilingual diagnostic Flutter mobile apps combining SQLite (sqflite) local persistence, on-device TensorFlow Lite inference, and Dio REST cloud synchronization.',
    highlights: [
      'SQLite (sqflite) repositories paired with Dio REST sync & offline fallback error states',
      'On-device TensorFlow Lite computer vision screening for zero-latency edge diagnostics',
      'Localized responsive Flutter UI verified with automated widget & unit tests',
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'SQLite (sqflite)', 'Dio', 'SharedPreferences', 'TFLite'],
  },
  {
    name: 'Tigray Cultural Property Hub (TCPH)',
    slug: 'tcph-hub',
    kicker: 'Mobile App · Offline Heritage Catalog',
    url: 'https://github.com/kaleab-mezgebe/TCPH-',
    github: 'https://github.com/kaleab-mezgebe/TCPH-',
    image: 'assets/tcph.png',
    badge: 'OFFLINE-FIRST FIELD APP',
    category: 'ai',
    description:
      'Cross-platform Flutter heritage registration app for Android & iOS digitizing 1,000+ historical records with GPS metadata, photo capture, and offline persistence.',
    highlights: [
      'Provider state management & Dio REST clients with timeout/offline error recovery',
      'Local persistence via SQLite, Hive, and SharedPreferences for remote field operation',
      'GPS coordinates tagging, camera capture & automated background cloud sync',
    ],
    stack: ['Flutter', 'Dart', 'Provider', 'Dio', 'SQLite', 'Hive', 'SharedPreferences', 'GPS SDK'],
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
      'Pixel-perfect replication of Commercial Bank of Ethiopia mobile banking in Flutter with 60 FPS animations, balance conceal toggles, and fluid transaction flows.',
    highlights: [
      'Fluid 60 FPS micro-interactions, spring curves & custom transitions',
      'Secure balance concealment & custom cryptographic PIN keypad',
      'Modular Clean Architecture separating UI, domain, and BLoC state layers',
    ],
    stack: ['Flutter', 'Dart', 'Clean Architecture', 'BLoC', 'FinTech UI', 'Micro-Animations'],
  },
];

export const SKILL_CATEGORIES = {
  mobile: { label: 'Languages, Mobile & State', color: '#00f0ff' },
  frontend: { label: 'Architecture & Tooling', color: '#39ff88' },
  backend: { label: 'Services & Native APIs', color: '#ffb800' },
  data: { label: 'Data & Local Storage', color: '#ff2bd6' },
  ai: { label: 'On-Device AI', color: '#9d8cff' },
  craft: { label: 'Testing & CI/CD Release', color: '#ff7a59' },
};

// node: true → appears as an interactive 3D node in the Three.js mesh
export const SKILLS = [
  { label: 'Flutter', cat: 'mobile', node: true, info: 'Primary cross-platform Android & iOS framework across ride-hailing, e-commerce, logistics, and offline-first field apps.' },
  { label: 'Dart', cat: 'mobile', node: true, info: 'Core language for all mobile apps — null-safety, async streams, isolates, and modular object-oriented code.' },
  { label: 'BLoC / Cubit', cat: 'mobile', node: true, info: 'Predictable unidirectional state flows for live ride dispatch, checkout transitions, and 60 FPS mobile UI.' },
  { label: 'Provider & Riverpod', cat: 'mobile', node: true, info: 'Lightweight reactive state management powering TYAMMS, Delivery-Man-App, TCPH, and FieldAI.' },
  { label: 'Kotlin & Swift (Native)', cat: 'mobile', node: true, info: 'Native Android & iOS permissions, platform channels, signing certificates, and store configurations.' },
  { label: 'Clean Architecture', cat: 'frontend', node: true, info: 'Repository Pattern and clean UI/domain/data separation across scalable commercial Flutter codebases.' },
  { label: 'GetIt (DI)', cat: 'frontend', node: true, info: 'Modular dependency injection keeping services, repositories, and state controllers cleanly decoupled.' },
  { label: 'Dio & Interceptors', cat: 'frontend', node: true, info: 'REST API integration with JWT/OAuth2 auto-refresh interceptors, retry policies, and structured error handling.' },
  { label: 'Responsive Mobile UI', cat: 'frontend', node: true, info: 'Reusable widget libraries, 60 FPS micro-animations, and adaptive layouts across Android & iOS screen sizes.' },
  { label: 'Firebase (FCM, Auth, Firestore)', cat: 'backend', node: true, info: 'Push notifications (FCM), authentication, real-time Firestore sync, and native notification handling.' },
  { label: 'Google Maps SDK', cat: 'backend', node: true, info: 'Live GPS tracking, route polylines, custom vehicle markers, and turn-by-turn courier routing.' },
  { label: 'SignalR / WebSockets', cat: 'backend', node: true, info: 'Full-duplex real-time sockets powering live driver tracking and sub-second ride matching.' },
  { label: 'Telebirr & Chapa', cat: 'backend', node: true, info: 'Mobile payment gateway integrations with REST callback verification and live order/fare settlement.' },
  { label: 'SQLite (sqflite) & Hive', cat: 'data', node: true, info: 'On-device local databases powering offline-first caching, queued sync, and instant mobile startup.' },
  { label: 'flutter_secure_storage', cat: 'data', node: true, info: 'Encrypted on-device JWT/OAuth2 session storage paired with SharedPreferences for lightweight preferences.' },
  { label: 'Offline-First Sync', cat: 'data', info: 'Conflict-free local persistence queues that sync cleanly with REST backends once connectivity returns.' },
  { label: 'TensorFlow Lite', cat: 'ai', node: true, info: 'Quantized on-device computer vision models running inside Flutter for zero-latency offline diagnostics.' },
  { label: 'flutter_test & Mocktail', cat: 'craft', node: true, info: 'Unit and widget testing suites ensuring reliable state transitions, API parsing, and regression safety.' },
  { label: 'GitHub Actions (CI/CD)', cat: 'craft', node: true, info: 'Automated build, test, and release pipelines shipping Android & iOS artifacts reliably.' },
  { label: 'Play Console & TestFlight', cat: 'craft', node: true, info: 'End-to-end Google Play Store & Apple TestFlight publishing, signing keys, and production rollouts.' },
  { label: 'Git, GitHub & Postman', cat: 'craft', info: 'Clean PR code reviews, branching workflows, and automated REST API contract validation.' },
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

export const SOFOF_PROJECTS = [];

export const ANALYTICS = {
  provider: null,
  domains: ['kaleab-mezgebe.github.io'],
};
