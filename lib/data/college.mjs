import { MORE_COURSES, MORE_UNITS, MORE_JOBS } from './more/college_more.mjs';

// College - courses, Semester 1 default units, streams, colleges, scholarships.
// All in English, except the B.A. Hindi subject, which is in Hindi.

export const COURSES = [
  { course: 'B.Tech', branches: ['CSE', 'Mechanical', 'Civil', 'Electrical'], years: 4, semesters: 8 },
  { course: 'B.Sc', branches: ['Maths', 'Physics', 'Chemistry', 'Biology'], years: 3, semesters: 6 },
  { course: 'B.Com', branches: ['Accounts', 'Business', 'Economics'], years: 3, semesters: 6 },
  { course: 'B.A.', branches: ['History', 'Hindi', 'English', 'Pol Science', 'Geography'], years: 3, semesters: 6 },
  { course: 'BCA', branches: [], years: 3, semesters: 6 },
  { course: 'BBA', branches: [], years: 3, semesters: 6 },
  { course: 'Nursing', branches: [], years: 4, semesters: 8 },
  { course: 'B.Pharmacy', branches: [], years: 4, semesters: 8 },
  { course: 'B.Ed', branches: [], years: 2, semesters: 4 },
  { course: 'LLB', branches: [], years: 3, semesters: 6 },
];

// Semester 1 subjects included in the default data
export const SEM1_SUBJECTS = {
  'B.Tech': ['Maths', 'Physics', 'Computer', 'English'],
  'B.Com': ['Accounts', 'Business', 'Economics'],
  'B.A.': ['History', 'Hindi', 'Pol Science'],
};

// unitName, notes, important questions[], previous-year-pattern questions[]
const U = (unitName, notes, imp, pyq) => ({ unitName, notes, imp, pyq });

export const COLLEGE_UNITS = {
  'B.Tech': {
    Maths: {
      title: 'Engineering Mathematics - I',
      units: [
        U('Unit 1 - Matrices', 'A matrix is a table of numbers. Rank = number of linearly independent rows. Eigenvalues: solve |A - λI| = 0. Cayley-Hamilton theorem: every square matrix satisfies its own characteristic equation. Used in computer graphics, circuits and AI.', ['Find the rank of a matrix using echelon form.', 'Find the eigenvalues and eigenvectors of a 3x3 matrix.', 'Verify the Cayley-Hamilton theorem and find A⁻¹.', 'Check the consistency of a system of linear equations.'], ['Find the eigenvalues of [[2,1],[1,2]].', 'State and verify the Cayley-Hamilton theorem for a 2x2 matrix.']),
        U('Unit 2 - Differential Calculus', "Successive differentiation; Leibnitz theorem: (uv)ₙ = Σ nCr uₙ₋ᵣ vᵣ. Partial derivatives: for ∂f/∂x treat y as a constant. Euler's theorem: for a homogeneous f of degree n, x∂f/∂x + y∂f/∂y = nf.", ['Find the nth derivative using Leibnitz theorem.', "Prove Euler's theorem and solve an example.", 'Questions on total derivatives and the chain rule.'], ["If u = x³ + y³, verify Euler's theorem.", 'Find the nth derivative of x²eˣ using Leibnitz theorem.']),
        U('Unit 3 - Multiple Integrals', 'A double integral gives area or volume. Changing the order of integration can make it easier. In polar form dx dy = r dr dθ. A triple integral gives volume.', ['Change the order of integration and evaluate.', 'Evaluate a double integral in polar coordinates.', 'Find a volume using a triple integral.'], ['Evaluate ∫∫ (x + y) dx dy over the given region.', 'Change the order of integration and evaluate.']),
        U('Unit 4 - Vector Calculus', 'Gradient (∇f) = direction of fastest increase. Divergence (∇·F) = spreading out. Curl (∇xF) = rotation. Green’s, Stokes’ and Gauss’s theorems.', ['Find the gradient, divergence and curl.', 'Verify Gauss’s divergence theorem.', 'Find a directional derivative.'], ['Find div and curl of F = x²i + y²j + z²k.', 'State Stokes’ theorem.']),
      ],
      studyPlan: '2 hours daily: 1 hour theory + 1 hour numericals. Solve previous year papers every Sunday. Make your own formula sheet by hand.',
      jobs: 'Maths is the foundation of every engineering branch. It leads to Data Science, AI/ML, GATE, Software Engineering (Rs 4-12 lakh per year to start) and teaching.',
    },
    Physics: {
      title: 'Engineering Physics',
      units: [
        U('Unit 1 - Quantum Mechanics', 'Light has a dual nature. de Broglie: λ = h/p. Heisenberg: Δx·Δp ≥ h/4π. Schrödinger wave equation. Particle in a box: Eₙ = n²h²/8mL².', ['Derive the de Broglie wavelength.', 'Find the energy of a particle in a 1-D box.', 'Explain the uncertainty principle.'], ['Derive the time-independent Schrödinger equation.', 'Find the energy of an electron in a 1-D box of width 1 Å.']),
        U('Unit 2 - Lasers and Fibre Optics', 'LASER = Light Amplification by Stimulated Emission of Radiation. Population inversion is needed. Optical fibres work by total internal reflection. NA = √(n₁² - n₂²).', ['Explain the ruby / He-Ne laser.', 'Derive the numerical aperture.', 'Uses of lasers (medicine, communication).'], ['Explain spontaneous and stimulated emission.', 'Calculate NA if n₁ = 1.5 and n₂ = 1.45.']),
        U('Unit 3 - Electromagnetism', "Maxwell's four equations. Speed of EM waves c = 1/√(μ₀ε₀). The Poynting vector gives energy flow.", ["Write Maxwell's equations in differential form.", 'Derive the EM wave equation.'], ["Write Maxwell's equations and their physical meaning."]),
        U('Unit 4 - Semiconductors', 'Conductors, semiconductors and insulators - band gap. Intrinsic vs extrinsic (n-type, p-type). P-N junction diode, Hall effect.', ['Explain the Fermi level.', 'Derive the Hall effect and give its uses.', 'V-I characteristics of a P-N junction.'], ['Explain the Hall effect and find the Hall coefficient.']),
      ],
      studyPlan: '1.5 hours daily. Practise derivations step by step in writing. Complete the lab record on time.',
      jobs: 'Electronics and semiconductor industry (many large companies in Noida), research (ISRO, DRDO), optical communication.',
    },
    Computer: {
      title: 'Programming for Problem Solving (C)',
      units: [
        U('Unit 1 - Basics and Algorithms', 'An algorithm is a step-by-step method; a flowchart is its diagram. A C program: #include <stdio.h>, int main(), printf, scanf.', ['Write an algorithm and flowchart for the largest of 3 numbers.', 'Compiler vs interpreter.', 'Data types and their sizes.'], ['Write an algorithm and flowchart to check a prime number.']),
        U('Unit 2 - Control Statements', 'if, if-else, switch, for, while, do-while, break, continue.', ['Program for the Fibonacci series.', 'while vs do-while.', 'A calculator using switch.'], ['Write a C program to print a factorial using a loop.']),
        U('Unit 3 - Arrays and Strings', 'An array is a collection of the same type, indexed from 0. A string is a char array ending in \\0. strlen, strcpy, strcmp.', ['Matrix multiplication program.', 'Bubble sort.', 'Check whether a string is a palindrome.'], ['Write a program to sort an array using bubble sort.']),
        U('Unit 4 - Functions, Pointers and Structures', 'Functions: call by value vs call by reference. A pointer stores an address (*, &). A structure groups different data types.', ['Factorial using recursion.', 'Pointer arithmetic.', 'Structure for a student record.'], ['Explain call by value and call by reference with an example.']),
      ],
      studyPlan: '2 hours of coding practice daily (on a laptop, or a phone with an online compiler). Write 5 programs yourself for every topic.',
      jobs: 'Software Developer, Web Developer, App Developer. Fresher salary Rs 3.5-10 lakh per year; many jobs in Noida and Gurugram.',
    },
    English: {
      title: 'Professional Communication',
      units: [
        U('Unit 1 - Communication Basics', 'The communication process: sender → message → channel → receiver → feedback. Barriers: language, noise, attitude.', ['Draw the communication process.', 'Barriers and how to overcome them.'], ['What are the 7 Cs of communication?']),
        U('Unit 2 - Grammar and Vocabulary', 'Tenses, articles, prepositions, synonyms, one-word substitutions.', ['Correct common errors.', 'One-word substitutions.'], ['Correct the given 10 sentences.']),
        U('Unit 3 - Writing Skills', 'Formal letters, emails, reports, resume / CV.', ['A job application with a resume.', 'Format of a technical report.'], ['Write a job application for the post of trainee engineer.']),
        U('Unit 4 - Speaking and Presentation', 'Group discussion, interviews, presentation skills, body language.', ['Tips for group discussion.', 'Interview preparation.'], ['How do you prepare for a technical presentation?']),
      ],
      studyPlan: 'Read an English newspaper for 30 minutes and practise speaking for 15 minutes every day (in front of a mirror or with a friend).',
      jobs: 'Good English is a big factor in campus placements. Also leads to corporate jobs, BPOs and content writing.',
    },
  },
  'B.Com': {
    Accounts: {
      title: 'Financial Accounting',
      units: [
        U('Unit 1 - Accounting Concepts', 'GAAP, Accounting Standards, Ind AS. The double entry system. Accounting equation: Assets = Liabilities + Capital.', ['Accounting concepts and conventions.', 'Advantages of double entry.'], ['Explain any five accounting concepts.']),
        U('Unit 2 - Journal, Ledger, Trial Balance', 'Transactions → journal → ledger → trial balance. Errors and their rectification.', ['Journal entries for 10 transactions.', 'Rectification of errors.'], ['Prepare a trial balance from the given balances.']),
        U('Unit 3 - Final Accounts', 'Trading account (gross profit), Profit & Loss account (net profit), balance sheet. Adjustments: outstanding, prepaid, depreciation.', ['Final accounts with 5 adjustments.'], ['Prepare the Trading and P&L Account and Balance Sheet.']),
        U('Unit 4 - Depreciation and Bank Reconciliation', 'SLM vs WDV. A BRS reconciles the cash book with the pass book.', ['Prepare a Bank Reconciliation Statement.', 'Compare SLM and WDV.'], ['Prepare a Bank Reconciliation Statement.']),
      ],
      studyPlan: '2 hours of numerical practice daily. Accounts is learnt by writing, not just reading!',
      jobs: 'Accountant (Rs 2.5-4 lakh per year), Tally / GST executive, CA / CMA preparation, bank jobs.',
    },
    Business: {
      title: 'Business Organisation and Management',
      units: [
        U('Unit 1 - Business Basics', 'Meaning and objectives of business; social responsibility.', ['Objectives of business.', 'Social responsibility of business.'], ['Define business. Explain its characteristics.']),
        U('Unit 2 - Forms of Organisation', 'Sole proprietorship, partnership, LLP, company, cooperative.', ['Types of companies.', 'Features of an LLP.'], ['Compare a partnership and a company.']),
        U('Unit 3 - Management Functions', 'POSDCORB: planning, organising, directing, controlling.', ['Fayol’s principles.', 'The planning process.'], ["Explain Fayol's 14 principles."]),
        U('Unit 4 - Startups and E-Business', 'Startup India, e-commerce, basics of digital marketing.', ['Advantages of e-business.', 'The startup ecosystem in India.'], ['What is e-business? Explain its scope.']),
      ],
      studyPlan: '1 hour daily. For every theory point, think of a real company example (Tata, Reliance, a local shop).',
      jobs: 'Business Executive, Sales, Marketing (Rs 2.5-5 lakh per year), MBA preparation, starting your own business.',
    },
    Economics: {
      title: 'Business Economics (Micro)',
      units: [
        U('Unit 1 - Introduction', 'Micro vs macro economics. Scarcity, choice, opportunity cost.', ['Opportunity cost with an example.', 'The PPC curve.'], ['Explain the Production Possibility Curve.']),
        U('Unit 2 - Demand and Supply', 'Law of demand; elasticity Ed = %ΔQd / %ΔP.', ['Types of price elasticity.', 'Shift vs movement along the demand curve.'], ['Explain price elasticity of demand and its measurement.']),
        U('Unit 3 - Production and Cost', 'Law of variable proportions, returns to scale, TC = TFC + TVC.', ['Cost curves.', 'Law of variable proportions.'], ['Explain short-run cost curves.']),
        U('Unit 4 - Markets', 'Perfect competition, monopoly, monopolistic competition, oligopoly.', ['Features of perfect competition.', 'Price under monopoly.'], ['Compare perfect competition and monopoly.']),
      ],
      studyPlan: '1 hour daily. Understand through graphs - draw every graph three times.',
      jobs: 'Economist, Data Analyst, Bank PO, policy research. Also helps in UPSC.',
    },
  },
  'B.A.': {
    History: {
      title: 'History of Ancient India',
      units: [
        U('Unit 1 - Sources and Prehistory', 'Sources: literary (Vedas) and archaeological (coins, inscriptions). Palaeolithic, Mesolithic, Neolithic ages.', ['Sources of ancient history.', 'The Neolithic revolution.'], ['Discuss the sources of ancient Indian history.']),
        U('Unit 2 - Harappan Civilisation', 'Town planning, drainage, trade, the (undeciphered) script. Theories of decline.', ['Features of town planning.', 'Causes of decline.'], ['Describe the town planning of the Harappan civilisation.']),
        U('Unit 3 - Vedic Age', 'The Rigveda, sabha and samiti, the varna system, changes in the later Vedic period.', ['Early vs later Vedic period.', 'Position of women.'], ['Compare early and later Vedic society.']),
        U('Unit 4 - Mauryan Empire', 'Chandragupta, Ashoka’s Dhamma, administration (Arthashastra).', ["Ashoka's Dhamma.", 'Mauryan administration.'], ["Explain Ashoka's policy of Dhamma."]),
      ],
      studyPlan: '1.5 hours daily. Make a timeline chart and practise maps. Use dates and examples in answers.',
      jobs: 'Teacher, UPSC / PCS, archaeology, museums, tourist guide.',
    },
    Hindi: {
      title: 'हिंदी साहित्य का इतिहास',
      units: [
        U('इकाई 1 - आदिकाल', 'वीरगाथा काल: पृथ्वीराज रासो (चंदबरदाई)। सिद्ध और नाथ साहित्य।', ['आदिकाल की प्रमुख विशेषताएँ लिखिए।', 'पृथ्वीराज रासो पर टिप्पणी लिखिए।'], ['आदिकाल को वीरगाथा काल क्यों कहा जाता है?']),
        U('इकाई 2 - भक्तिकाल', 'हिंदी साहित्य का स्वर्ण युग। निर्गुण धारा (कबीर, जायसी) और सगुण धारा (तुलसी, सूर)।', ['भक्तिकाल को स्वर्ण युग क्यों कहते हैं?', 'निर्गुण और सगुण भक्ति में अंतर स्पष्ट कीजिए।'], ['भक्तिकाल की प्रमुख प्रवृत्तियाँ लिखिए।']),
        U('इकाई 3 - रीतिकाल', 'शृंगार-प्रधान काव्य: बिहारी, केशवदास, घनानंद।', ['रीतिकाल की विशेषताएँ लिखिए।', 'बिहारी सतसई पर टिप्पणी लिखिए।'], ['रीतिबद्ध और रीतिमुक्त काव्य में अंतर स्पष्ट कीजिए।']),
        U('इकाई 4 - आधुनिक काल', 'भारतेंदु युग, द्विवेदी युग, छायावाद (प्रसाद, पंत, निराला, महादेवी), प्रगतिवाद।', ['छायावाद के चार स्तंभ कौन हैं?', 'भारतेंदु हरिश्चंद्र का योगदान लिखिए।'], ['छायावाद की प्रमुख विशेषताएँ लिखिए।']),
      ],
      studyPlan: 'रोज़ 1 घंटा। कवि - रचना - काल की एक तालिका बनाइए। रोज़ दो दोहे या पद कंठस्थ कीजिए।',
      jobs: 'हिंदी शिक्षक (TGT/PGT), अनुवादक, पत्रकार, कंटेंट लेखक, राजभाषा अधिकारी।',
    },
    'Pol Science': {
      title: 'Political Theory',
      units: [
        U('Unit 1 - What is Politics', 'Meaning and scope of political science. Traditional vs modern approaches.', ['Nature and scope.', 'Approaches to political science.'], ['Define political science and explain its scope.']),
        U('Unit 2 - The State', 'Four elements of the state: population, territory, government, sovereignty.', ['Elements of the state.', 'Theories of the origin of the state.'], ['Explain the elements of the state.']),
        U('Unit 3 - Liberty, Equality, Justice', 'Liberty, equality and justice (Rawls).', ['Types of liberty.', "Rawls' theory of justice."], ['Discuss the relationship between liberty and equality.']),
        U('Unit 4 - Democracy and Rights', 'Models of democracy; types of rights.', ['Direct vs indirect democracy.', 'Human rights.'], ['What is democracy? Explain its features.']),
      ],
      studyPlan: '1.5 hours daily. Read newspaper editorials. Give an Indian example for every concept.',
      jobs: 'UPSC / PCS, lawyer (after LLB), journalist, policy analyst, teacher.',
    },
  },
};

// Jobs info for courses that do not have study data yet
export const COURSE_JOBS = {
  'B.Tech': 'Software Engineer, Site Engineer, Design Engineer, PSU jobs (through GATE). Starting salary Rs 3.5-12 lakh per year.',
  'B.Sc': 'Lab Assistant, Teacher, Research, Data Analyst; M.Sc or B.Ed next. Starting salary Rs 2.5-5 lakh per year.',
  'B.Com': 'Accountant, Bank jobs, Tax Consultant, CA / CMA. Starting salary Rs 2.5-5 lakh per year.',
  'B.A.': 'Teacher, UPSC / PCS, Journalist, NGO work, Content Writer. Starting salary Rs 2-4 lakh per year.',
  BCA: 'Web / App Developer, IT Support; MCA next. Starting salary Rs 3-6 lakh per year.',
  BBA: 'Sales, HR, Marketing Executive; MBA next. Starting salary Rs 3-5 lakh per year.',
  Nursing: 'Staff Nurse (government / private), AIIMS Nursing Officer. Starting salary Rs 3-6 lakh per year (higher in government).',
  'B.Pharmacy': 'Pharmacist, Medical Representative, Drug Inspector. Starting salary Rs 2.5-5 lakh per year.',
  'B.Ed': 'TGT / PGT Teacher; government teacher after CTET / UPTET. Rs 3-8 lakh per year.',
  LLB: 'Advocate, Judiciary (PCS-J), Legal Advisor. Starting salary Rs 2.5-6 lakh per year, growing a lot with experience.',
};

export const STREAMS = [
  {
    streamName: 'PCM', title: 'Science - PCM', emoji: '⚙️',
    subjects: ['Physics', 'Chemistry', 'Maths', 'English', 'Computer / Physical Education'],
    bestFor: ['Engineer', 'Computer / IT', 'Army / Navy / Air Force (NDA)', 'Pilot', 'Architect', 'Data Scientist'],
    fees: 'School: government Rs 1,000-5,000 per year, private Rs 30,000-1,00,000 per year. Coaching (optional): Rs 50,000-1.5 lakh per year.',
    jobs: ['Software Engineer', 'Civil / Mechanical Engineer', 'NDA Officer', 'Scientist (ISRO / DRDO)', 'Data Analyst'],
    salary: 'Starting Rs 3.5-12 lakh per year. Top IITs / NITs: Rs 15 lakh+.',
    exams: ['JEE Main', 'JEE Advanced', 'NDA', 'CUET', 'BITSAT'],
    skill: 'Maths',
  },
  {
    streamName: 'PCB', title: 'Science - PCB', emoji: '🩺',
    subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Physical Education / Maths (optional)'],
    bestFor: ['Doctor (MBBS)', 'Nurse', 'Lab Technician', 'Pharmacy', 'Physiotherapist', 'Agriculture'],
    fees: 'School: government Rs 1,000-5,000 per year, private Rs 30,000-1,00,000 per year. NEET coaching (optional): Rs 50,000-1.5 lakh.',
    jobs: ['Doctor', 'Staff Nurse', 'Pharmacist', 'Lab Technician', 'Dentist', 'Veterinary Doctor'],
    salary: 'Nurse / lab technician Rs 2.5-5 lakh, doctor (MBBS) Rs 8-15 lakh+ per year.',
    exams: ['NEET UG', 'CUET', 'AIIMS Nursing', 'ICAR'],
    skill: 'Science',
  },
  {
    streamName: 'Commerce', title: 'Commerce', emoji: '💼',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Maths / Applied Maths', 'English'],
    bestFor: ['Bank Jobs', 'CA / CS / CMA', 'Business', 'Accountant', 'MBA', 'Stock Market'],
    fees: 'School: government Rs 1,000-5,000 per year, private Rs 25,000-80,000 per year. CA Foundation fees about Rs 10,000-15,000.',
    jobs: ['Chartered Accountant', 'Bank PO / Clerk', 'Accountant', 'Financial Analyst', 'Business Owner'],
    salary: 'Accountant Rs 2.5-4 lakh, Bank PO Rs 7-9 lakh, CA Rs 7-15 lakh+ per year.',
    exams: ['CA Foundation', 'CUET', 'IPMAT', 'Bank PO / Clerk (after graduation)'],
    skill: 'Accounts',
  },
  {
    streamName: 'Arts', title: 'Arts / Humanities', emoji: '📜',
    subjects: ['History', 'Geography', 'Political Science', 'Hindi', 'English', 'Economics / Sociology (optional)'],
    bestFor: ['Teacher', 'IAS / UPSC', 'Police (SI / IPS)', 'Lawyer', 'Journalist', 'Psychologist'],
    fees: 'School: government Rs 1,000-4,000 per year, private Rs 20,000-60,000 per year. The lowest-cost stream.',
    jobs: ['Teacher', 'IAS / PCS Officer', 'Police SI', 'Lawyer', 'Journalist', 'Social Worker'],
    salary: 'Teacher Rs 3-8 lakh, SI Rs 4-6 lakh, IAS Rs 7-10 lakh plus facilities per year.',
    exams: ['CUET', 'CLAT', 'UPSC (after graduation)', 'UPSSSC', 'UP Police'],
    skill: 'SST',
  },
];

// Courses and colleges by stream (Delhi / Noida / Bulandshahr). Fees are approximate - check the official website before admission.
export const COLLEGES = [
  { stream: 'PCM', courseName: 'B.Tech', fees: 'Government Rs 1-2.5 lakh per year, private Rs 1.2-3 lakh per year', duration: '4 years',
    colleges: { Delhi: ['IIT Delhi', 'DTU (Delhi Technological University)', 'NSUT'], Noida: ['JSS Academy of Technical Education', 'Galgotias University (Greater Noida)', 'Amity University'], Bulandshahr: ['Government Polytechnic (diploma option)', 'AKTU-affiliated colleges nearby (Ghaziabad / Noida)'] },
    jobs: ['Software Engineer', 'Site Engineer', 'PSU (through GATE)'], salary: 'Rs 3.5-12 lakh per year (more at top colleges)' },
  { stream: 'PCM', courseName: 'BCA', fees: 'Rs 40,000-1.2 lakh per year', duration: '3 years',
    colleges: { Delhi: ['GGSIPU-affiliated colleges', 'Jamia Millia Islamia (BCA-type programmes)'], Noida: ['Amity University', 'IIMT Greater Noida'], Bulandshahr: ['CCS University-affiliated colleges'] },
    jobs: ['Web Developer', 'App Developer', 'IT Support'], salary: 'Rs 3-6 lakh per year' },
  { stream: 'PCM', courseName: 'B.Sc (Maths / Physics)', fees: 'Government Rs 5,000-25,000 per year', duration: '3 years',
    colleges: { Delhi: ['Hindu College (DU)', 'St. Stephen\'s College (DU)', 'Hansraj College (DU)'], Noida: ['Noida Degree College (Government PG College, Sector 39)'], Bulandshahr: ['DAV PG College, Bulandshahr', 'Amar Singh PG College, Lakhaoti'] },
    jobs: ['Teacher', 'Research', 'Data Analyst'], salary: 'Rs 2.5-5 lakh per year' },
  { stream: 'PCM', courseName: 'NDA (Army / Navy / Air Force)', fees: 'Free - training is paid for by the government', duration: '3 years of training + 1 year at the academy',
    colleges: { Delhi: ['UPSC NDA exam (with Class 12)'], Noida: ['UPSC NDA exam'], Bulandshahr: ['UPSC NDA exam'] },
    jobs: ['Lieutenant / Officer'], salary: 'Rs 56,100 per month + allowances (starting)' },

  { stream: 'PCB', courseName: 'MBBS', fees: 'Government Rs 10,000-1 lakh per year, private Rs 10-25 lakh per year', duration: '5.5 years (with internship)',
    colleges: { Delhi: ['AIIMS New Delhi', 'Maulana Azad Medical College', 'Lady Hardinge Medical College'], Noida: ['GIMS (Government Institute of Medical Sciences), Greater Noida', 'Sharda University (Greater Noida)'], Bulandshahr: ['Kalyan Singh Government Medical College, Bulandshahr'] },
    jobs: ['Doctor', 'Medical Officer', 'Specialist (after MD / MS)'], salary: 'Rs 8-15 lakh per year (starting)' },
  { stream: 'PCB', courseName: 'B.Sc Nursing', fees: 'Government Rs 10,000-60,000 per year, private Rs 70,000-1.5 lakh per year', duration: '4 years',
    colleges: { Delhi: ['AIIMS College of Nursing', 'RAK College of Nursing'], Noida: ['Sharda University', 'GIMS Greater Noida'], Bulandshahr: ['Local GNM / ANM institutes (check the UPNMC list)'] },
    jobs: ['Staff Nurse', 'Nursing Officer (AIIMS)'], salary: 'Rs 3-6 lakh per year (more in government)' },
  { stream: 'PCB', courseName: 'B.Pharmacy', fees: 'Rs 60,000-1.5 lakh per year', duration: '4 years',
    colleges: { Delhi: ['DPSRU (Delhi Pharmaceutical Sciences & Research University)', 'Jamia Hamdard'], Noida: ['Amity Institute of Pharmacy', 'Galgotias University'], Bulandshahr: ['AKTU-affiliated pharmacy colleges'] },
    jobs: ['Pharmacist', 'Medical Representative', 'Drug Inspector'], salary: 'Rs 2.5-5 lakh per year' },
  { stream: 'PCB', courseName: 'BMLT / Paramedical', fees: 'Rs 30,000-80,000 per year', duration: '3 years',
    colleges: { Delhi: ['GGSIPU-affiliated colleges'], Noida: ['Sharda University', 'Amity University'], Bulandshahr: ['CCS University-affiliated institutes'] },
    jobs: ['Lab Technician', 'Radiology Technician'], salary: 'Rs 2-4 lakh per year' },

  { stream: 'Commerce', courseName: 'B.Com', fees: 'Government Rs 5,000-30,000 per year, private Rs 40,000-1 lakh per year', duration: '3 years',
    colleges: { Delhi: ['SRCC (DU)', 'Hansraj College (DU)', 'Kirori Mal College (DU)'], Noida: ['Noida Degree College', 'Amity University'], Bulandshahr: ['DAV PG College, Bulandshahr', 'Amar Singh PG College, Lakhaoti'] },
    jobs: ['Accountant', 'Bank Clerk / PO', 'Tax Consultant'], salary: 'Rs 2.5-5 lakh per year' },
  { stream: 'Commerce', courseName: 'BBA', fees: 'Rs 50,000-2 lakh per year', duration: '3 years',
    colleges: { Delhi: ['Shaheed Sukhdev College of Business Studies (BMS)', 'GGSIPU colleges'], Noida: ['Amity Business School', 'Galgotias University'], Bulandshahr: ['CCS University-affiliated colleges'] },
    jobs: ['Sales / Marketing Executive', 'HR', 'Business Analyst'], salary: 'Rs 3-5 lakh per year' },
  { stream: 'Commerce', courseName: 'CA (Chartered Accountant)', fees: 'ICAI fees about Rs 80,000-1 lakh (whole course)', duration: '4.5-5 years',
    colleges: { Delhi: ['ICAI - Northern India Regional Council'], Noida: ['ICAI Noida branch'], Bulandshahr: ['ICAI online classes + nearest branch'] },
    jobs: ['Chartered Accountant', 'Auditor', 'CFO'], salary: 'Rs 7-15 lakh per year (starting)' },

  { stream: 'Arts', courseName: 'B.A.', fees: 'Government Rs 3,000-20,000 per year', duration: '3 years',
    colleges: { Delhi: ['Lady Shri Ram College (DU)', 'Hindu College (DU)', 'Jamia Millia Islamia'], Noida: ['Noida Degree College', 'Amity University'], Bulandshahr: ['DAV PG College, Bulandshahr', 'Amar Singh PG College, Lakhaoti'] },
    jobs: ['Teacher', 'UPSC / PCS', 'Journalist'], salary: 'Rs 2-4 lakh per year (starting)' },
  { stream: 'Arts', courseName: 'B.A. LLB (5 years)', fees: 'Government Rs 10,000-1 lakh per year, private Rs 1.5-3 lakh per year', duration: '5 years',
    colleges: { Delhi: ['NLU Delhi (AILET)', 'GGSIPU Law School'], Noida: ['Amity Law School', 'Galgotias Law School'], Bulandshahr: ['CCS University-affiliated law colleges'] },
    jobs: ['Advocate', 'Judge (PCS-J)', 'Legal Advisor'], salary: 'Rs 2.5-8 lakh per year (starting)' },
  { stream: 'Arts', courseName: 'B.Ed (after graduation)', fees: 'Government Rs 10,000-50,000 per year, private Rs 50,000-1 lakh', duration: '2 years',
    colleges: { Delhi: ['CIE (DU)', 'Jamia Millia Islamia'], Noida: ['Private B.Ed colleges (through UP B.Ed JEE)'], Bulandshahr: ['DAV PG College (B.Ed)', 'Private colleges through UP B.Ed JEE'] },
    jobs: ['TGT / PGT Teacher', 'Government Teacher (CTET / UPTET / Super TET)'], salary: 'Rs 3-8 lakh per year' },
  { stream: 'Arts', courseName: 'BJMC (Journalism)', fees: 'Rs 30,000-1.5 lakh per year', duration: '3 years',
    colleges: { Delhi: ['IIMC (PG Diploma)', 'Jamia AJK MCRC', 'GGSIPU colleges'], Noida: ['Amity School of Communication'], Bulandshahr: ['Online / distance options'] },
    jobs: ['Reporter', 'Anchor', 'Content Creator'], salary: 'Rs 2.5-6 lakh per year' },
];

export const SCHOLARSHIPS = [
  { name: 'UP Scholarship (Pre and Post Matric)', who: 'Students in UP whose family income is within the limit (SC / ST / OBC / General / Minority)', how: 'Apply online at scholarship.up.gov.in (July-November)', link: 'https://scholarship.up.gov.in' },
  { name: 'National Scholarship Portal (NSP)', who: 'Many central government scholarships - minority, disability, merit', how: 'One form at scholarships.gov.in', link: 'https://scholarships.gov.in' },
  { name: 'Central Sector Scholarship (College)', who: 'Top 20 percentile in Class 12 and family income up to Rs 4.5 lakh per year', how: 'Apply through the NSP portal', link: 'https://scholarships.gov.in' },
  { name: 'AICTE Pragati (Girls - Technical)', who: 'Girls in B.Tech / diploma, family income up to Rs 8 lakh', how: 'Apply through the NSP portal', link: 'https://www.aicte-india.org' },
  { name: 'PM-YASASVI', who: 'OBC, EBC and DNT students', how: 'Apply through the NSP portal', link: 'https://scholarships.gov.in' },
  { name: 'Mukhyamantri Abhyudaya Yojana (UP)', who: 'UP students - FREE coaching for UPSC, NEET and JEE', how: 'abhyuday.up.gov.in', link: 'https://abhyuday.up.gov.in' },
];

export const FREE_COURSES = [
  { name: 'SWAYAM', what: 'FREE government online courses by IIT / IIM professors. A small exam fee for the certificate.', link: 'https://swayam.gov.in' },
  { name: 'NPTEL', what: 'FREE engineering and science video lectures from the IITs.', link: 'https://nptel.ac.in' },
  { name: 'IGNOU', what: 'Low-fee degrees (B.A., B.Com, BCA) you can study from home.', link: 'https://www.ignou.ac.in' },
  { name: 'Skill India / PMKVY', what: 'FREE skill training - electrician, beauty, computers, mobile repair.', link: 'https://www.skillindiadigital.gov.in' },
  { name: 'ITI (Government)', what: 'Low-fee technical trades - 1-2 years, quick jobs.', link: 'https://dgt.gov.in' },
  { name: 'Vidya Lakshmi (Education Loan)', what: 'Education loans from many banks on one portal.', link: 'https://www.vidyalakshmi.co.in' },
];

// More courses, Semester 1 notes for every course, Cooking Classes and Computer Courses.
COURSES.push(...MORE_COURSES);
Object.assign(COURSE_JOBS, MORE_JOBS);
for (const [course, subjects] of Object.entries(MORE_UNITS)) COLLEGE_UNITS[course] = { ...(COLLEGE_UNITS[course] || {}), ...subjects };
export const READY_COURSES = Object.keys(COLLEGE_UNITS);
