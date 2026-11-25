// More college courses + Semester 1 notes for courses that had none, + Cooking Classes and Computer Courses.
// Unit format: { unitName, notes, imp: [], pyq: [] }
import { PYTHON_FULL, REACT_FULL } from './coding_courses.mjs';
import { COOKING_HI, EAST_WEST } from './cooking_hi.mjs';

const U = (unitName, notes, imp, pyq) => ({ unitName, notes, imp, pyq });

export const MORE_COURSES = [
  { course: 'MBBS', branches: [], years: 5.5, semesters: 6 },
  { course: 'B.Sc Agriculture', branches: [], years: 4, semesters: 8 },
  { course: 'BJMC (Mass Comm)', branches: [], years: 3, semesters: 6 },
  { course: 'Hotel Management', branches: [], years: 4, semesters: 8 },
  { course: 'Fashion Design', branches: [], years: 4, semesters: 8 },
  { course: 'Polytechnic Diploma', branches: ['Civil', 'Mechanical', 'Electrical', 'Computer'], years: 3, semesters: 6 },
  { course: 'CA Foundation', branches: [], years: 1, semesters: 2 },
  { course: 'ITI', branches: ['Electrician', 'Fitter', 'COPA'], years: 2, semesters: 4 },
  { course: 'Computer Courses', branches: [], years: 1, semesters: 1 },
  { course: 'Cooking Classes', branches: [], years: 1, semesters: 1 },
];

export const MORE_JOBS = {
  MBBS: 'Doctor (government / private hospitals), MD / MS specialist after NEET-PG, medical officer. Starting salary Rs 6-12 lakh per year, much higher for specialists.',
  'B.Sc Agriculture': 'Agriculture Officer, bank Agriculture Field Officer, seed and fertiliser companies, agri-startups, ICAR research. Starting salary Rs 3-6 lakh per year.',
  'BJMC (Mass Comm)': 'Reporter, news anchor, content writer, social media manager, PR executive, video editor. Starting salary Rs 2.5-5 lakh per year.',
  'Hotel Management': 'Chef, front office manager, cruise ship jobs, airline catering, event management. Starting salary Rs 2.5-5 lakh per year, high abroad.',
  'Fashion Design': 'Fashion designer, textile designer, stylist, boutique owner, merchandiser. Starting salary Rs 2.5-6 lakh per year.',
  'Polytechnic Diploma': 'Junior Engineer (JE) in government departments, technician, supervisor; lateral entry into B.Tech 2nd year. Rs 2-5 lakh per year.',
  'CA Foundation': 'First step of Chartered Accountancy (ICAI). After CA final: auditor, tax expert, CFO. Starting salary for CAs Rs 7-12 lakh per year.',
  ITI: 'Electrician, fitter, technician in railways, factories, metro, self-employment; apprenticeship. Rs 1.8-4 lakh per year.',
  'Computer Courses': 'React / web developer (see the Complete React Course), data entry operator, accountant (Tally), web designer, junior Python developer, office assistant. Rs 1.8-5 lakh per year; freelancing possible.',
  'Cooking Classes': 'Home chef, tiffin service, cloud kitchen, bakery business, food blogger / YouTuber, hotel kitchen jobs (commis chef). Earn Rs 10,000 - 1 lakh+ per month with your own business.',
};

export const MORE_UNITS = {
  BCA: {
    'C Programming': {
      title: 'Programming in C',
      units: [
        U('Unit 1 - Introduction to C', 'History of C, structure of a C program, tokens, data types, variables, constants, operators.', ['Explain the structure of a C program.', 'List the operators in C.'], ['Write a program to swap two numbers without a third variable.']),
        U('Unit 2 - Control Structures', 'if-else, switch, loops (for, while, do-while), break, continue, goto.', ['Program for a prime number check.', 'Difference between while and do-while.'], ['Print the pattern of a pyramid of stars.']),
        U('Unit 3 - Arrays, Strings and Functions', '1D and 2D arrays, string functions, user-defined functions, recursion.', ['Matrix addition program.', 'Recursive factorial.'], ['Write a function to reverse a string.']),
        U('Unit 4 - Pointers, Structures and Files', 'Pointers, dynamic memory (malloc, free), structures and unions, file handling (fopen, fprintf).', ['Difference between structure and union.', 'Program to write to a file.'], ['Explain call by reference with an example.']),
      ],
      studyPlan: '2 hours of coding daily. Solve 3 problems per topic on an online compiler.',
      jobs: 'Junior developer, software tester, IT support. MCA or certifications next.',
    },
    'Computer Fundamentals': {
      title: 'Computer Fundamentals and Office Automation',
      units: [
        U('Unit 1 - Computer Basics', 'Characteristics, generations, types of computers, block diagram (input, CPU, memory, output).', ['Explain the block diagram of a computer.', 'Describe five generations.'], ['Differentiate RAM and ROM.']),
        U('Unit 2 - Number Systems', 'Binary, octal, decimal, hexadecimal conversions; 1’s and 2’s complement.', ['Convert (156)₁₀ to binary and hex.', 'Find the 2’s complement of 1010.'], ['Add two binary numbers.']),
        U('Unit 3 - Operating Systems', 'Functions of an OS, types (batch, time-sharing, real-time), Windows and Linux basics.', ['Functions of an operating system.', 'Windows vs Linux.'], ['Explain a multitasking OS.']),
        U('Unit 4 - MS Office', 'Word (mail merge), Excel (formulas, charts), PowerPoint (slides, animation).', ['Steps of mail merge.', 'Explain 5 Excel functions.'], ['Make a mark-sheet in Excel with SUM and AVERAGE.']),
      ],
      studyPlan: '1 hour theory + 1 hour hands-on practice in the Computer Lab every day.',
      jobs: 'Office assistant, data entry, IT support; foundation for all IT jobs.',
    },
  },
  BBA: {
    'Principles of Management': {
      title: 'Principles of Management',
      units: [
        U('Unit 1 - Management Basics', 'Meaning, nature, levels (top, middle, lower), functions: planning, organising, staffing, directing, controlling.', ['Explain the functions of management.', 'Management: art or science?'], ['Describe the levels of management.']),
        U('Unit 2 - Planning and Decision Making', 'Types of plans, MBO, steps in decision making.', ['Explain the planning process.', 'What is MBO?'], ['Explain the steps of decision making.']),
        U('Unit 3 - Organising', 'Organisation structures, delegation, centralisation vs decentralisation, span of control.', ['Line vs line-and-staff organisation.', 'Importance of delegation.'], ['Explain the span of control.']),
        U('Unit 4 - Directing and Controlling', 'Motivation theories (Maslow, Herzberg), leadership styles, controlling process.', ['Explain Maslow’s hierarchy.', 'Steps of controlling.'], ['Compare autocratic and democratic leadership.']),
      ],
      studyPlan: '1.5 hours daily. Relate each topic to an Indian company (Tata, Infosys, Amul).',
      jobs: 'Management trainee, sales and marketing executive, HR executive; MBA next.',
    },
    'Business Communication': {
      title: 'Business Communication',
      units: [
        U('Unit 1 - Communication Process', 'Sender, message, channel, receiver, feedback; barriers to communication.', ['Explain the communication process.', 'Barriers and how to remove them.'], ['Explain the 7 Cs of communication.']),
        U('Unit 2 - Business Letters', 'Enquiry, order, complaint and sales letters; layout of a business letter.', ['Write a complaint letter.', 'Parts of a business letter.'], ['Draft an enquiry letter to a supplier.']),
        U('Unit 3 - Reports and Presentations', 'Types of reports, structure; preparing a presentation.', ['Write a report on a factory visit.', 'Tips for a good presentation.'], ['Structure of a formal report.']),
        U('Unit 4 - Interviews and Meetings', 'Resume writing, group discussions, interviews, agenda and minutes of meetings.', ['Prepare a resume.', 'What is an agenda?'], ['Write minutes of a meeting.']),
      ],
      studyPlan: '1 hour daily. Practise writing one letter or email every day; speak in English for 10 minutes.',
      jobs: 'Corporate communication, PR, HR, customer relations.',
    },
  },
  Nursing: {
    'Anatomy and Physiology': {
      title: 'Anatomy and Physiology',
      units: [
        U('Unit 1 - Cell and Tissues', 'Structure of the cell, cell division; four tissue types: epithelial, connective, muscular, nervous.', ['Describe the structure of a cell.', 'Classify epithelial tissue.'], ['Explain mitosis with a diagram.']),
        U('Unit 2 - Skeletal and Muscular System', '206 bones; axial and appendicular skeleton; joints; types of muscles.', ['Classify joints with examples.', 'Name the bones of the upper limb.'], ['Describe the structure of a synovial joint.']),
        U('Unit 3 - Cardiovascular System', 'Heart structure, cardiac cycle, blood pressure (normal 120/80 mmHg), blood vessels.', ['Draw and label the heart.', 'Explain the cardiac cycle.'], ['Explain the conduction system of the heart.']),
        U('Unit 4 - Respiratory System', 'Nose to alveoli, mechanism of breathing, lung volumes, gas exchange.', ['Mechanism of respiration.', 'Define tidal volume and vital capacity.'], ['Describe the exchange of gases in alveoli.']),
      ],
      studyPlan: '2 hours daily. Draw 2 labelled diagrams every day; revise with flashcards.',
      jobs: 'Staff nurse, nursing officer (AIIMS, ESIC), community health officer.',
    },
    'Fundamentals of Nursing': {
      title: 'Fundamentals of Nursing',
      units: [
        U('Unit 1 - Nursing as a Profession', 'Definition, Florence Nightingale, qualities of a nurse, ethics and the code of conduct.', ['Qualities of a good nurse.', 'Contribution of Florence Nightingale.'], ['Explain the nursing code of ethics.']),
        U('Unit 2 - Vital Signs', 'Temperature (37 °C), pulse (60-100/min), respiration (12-20/min), blood pressure (120/80).', ['How to check pulse and BP.', 'Normal values of vital signs.'], ['Describe the procedure of recording temperature.']),
        U('Unit 3 - Infection Control', 'Hand hygiene (WHO 7 steps), sterilisation, biomedical waste colour coding.', ['Steps of hand washing.', 'Biomedical waste segregation.'], ['Explain the methods of sterilisation.']),
        U('Unit 4 - Patient Care and First Aid', 'Bed making, positions, hygiene, CPR (30 compressions : 2 breaths), first aid for burns and fractures.', ['Steps of CPR.', 'First aid for burns.'], ['Explain different patient positions.']),
      ],
      studyPlan: '1.5 hours theory + practical demonstrations in the skills lab.',
      jobs: 'Hospital nurse, home-care nurse, ICU nurse; jobs abroad after exams like NCLEX.',
    },
  },
  'B.Pharmacy': {
    Pharmaceutics: {
      title: 'Pharmaceutics - I',
      units: [
        U('Unit 1 - History and Dosage Forms', 'History of pharmacy, Indian Pharmacopoeia; dosage forms: tablets, capsules, syrups, ointments, injections.', ['Classify dosage forms.', 'What is a pharmacopoeia?'], ['Write a short note on the Indian Pharmacopoeia.']),
        U('Unit 2 - Prescription', 'Parts of a prescription, Latin terms (OD = once a day, BD = twice a day, TDS = three times a day).', ['Parts of a prescription.', 'Meaning of OD, BD, TDS.'], ['Explain prescription handling.']),
        U('Unit 3 - Pharmaceutical Calculations', 'Weights and measures, percentage solutions, dilutions, isotonic solutions.', ['Calculate dilution of a 10% solution to 2%.', 'What are isotonic solutions?'], ['Solve an alligation problem.']),
        U('Unit 4 - Liquid Dosage Forms', 'Solutions, suspensions, emulsions; stability and preparation.', ['Difference between suspension and emulsion.', 'Methods of emulsion preparation.'], ['Write the formula of a simple syrup.']),
      ],
      studyPlan: '2 hours daily. Learn Latin terms with flashcards; practise calculations.',
      jobs: 'Pharmacist, production and QC in pharma companies, drug inspector, medical representative.',
    },
    'Human Anatomy': {
      title: 'Human Anatomy and Physiology - I',
      units: [
        U('Unit 1 - Body Organisation', 'Levels of organisation, homeostasis, body cavities, anatomical terms.', ['Explain homeostasis.', 'Name body cavities.'], ['Describe the levels of structural organisation.']),
        U('Unit 2 - Blood', 'Composition, blood groups, clotting, anaemia.', ['Composition of blood.', 'Mechanism of blood clotting.'], ['Explain the ABO blood group system.']),
        U('Unit 3 - Lymphatic System', 'Lymph, lymph nodes, spleen, thymus; immunity.', ['Functions of the lymphatic system.', 'Role of the spleen.'], ['Explain innate and acquired immunity.']),
        U('Unit 4 - Nervous System (Introduction)', 'Neuron, nerve impulse, synapse, brain and spinal cord.', ['Structure of a neuron.', 'What is a synapse?'], ['Explain the conduction of a nerve impulse.']),
      ],
      studyPlan: '1.5 hours daily with diagrams.',
      jobs: 'Foundation for clinical research, pharmacology and hospital pharmacy jobs.',
    },
  },
  'B.Ed': {
    'Childhood and Growing Up': {
      title: 'Childhood and Growing Up',
      units: [
        U('Unit 1 - Growth and Development', 'Stages: infancy, childhood, adolescence. Growth is physical; development is overall.', ['Difference between growth and development.', 'Principles of development.'], ['Characteristics of adolescence.']),
        U('Unit 2 - Theories of Development', 'Piaget (cognitive stages), Vygotsky (ZPD, scaffolding), Erikson (psychosocial), Kohlberg (moral).', ['Explain Piaget’s four stages.', 'What is ZPD?'], ['Compare Piaget and Vygotsky.']),
        U('Unit 3 - Individual Differences', 'Intelligence (Gardner’s multiple intelligences), learning styles, children with special needs, inclusive education.', ['Gardner’s multiple intelligences.', 'What is inclusive education?'], ['Explain causes of individual differences.']),
        U('Unit 4 - Learning and Motivation', 'Theories: Pavlov, Skinner, Thorndike; motivation and its role in learning.', ['Thorndike’s laws of learning.', 'Explain operant conditioning.'], ['How can a teacher motivate students?']),
      ],
      studyPlan: '1.5 hours daily. Observe children in your school internship and relate theories.',
      jobs: 'Government teacher (after CTET / TET), private school teacher, counsellor.',
    },
    Pedagogy: {
      title: 'Teaching Methods (Pedagogy)',
      units: [
        U('Unit 1 - Lesson Planning', 'Herbart’s 5 steps: preparation, presentation, association, generalisation, application.', ['Prepare a lesson plan.', 'Herbart’s steps.'], ['Write a lesson plan for Class 6 Science.']),
        U('Unit 2 - Teaching Methods', 'Lecture, demonstration, project, activity-based, play-way, discovery method.', ['Explain the project method.', 'Merits of activity-based learning.'], ['Compare lecture and demonstration methods.']),
        U('Unit 3 - Teaching Aids and ICT', 'Charts, models, smart boards, DIKSHA, videos; Edgar Dale’s cone of experience.', ['Uses of ICT in classrooms.', 'Explain Dale’s cone.'], ['Prepare a list of low-cost teaching aids.']),
        U('Unit 4 - Evaluation', 'Formative and summative assessment, CCE, Bloom’s taxonomy, question paper blueprint.', ['Explain Bloom’s taxonomy.', 'Formative vs summative.'], ['Prepare a blueprint for a unit test.']),
      ],
      studyPlan: '1 hour theory + teaching practice in school; prepare one teaching aid each week.',
      jobs: 'TGT / PGT teacher, KVS / NVS teacher, coaching teacher, educational content creator.',
    },
  },
  LLB: {
    'Constitutional Law': {
      title: 'Constitutional Law - I',
      units: [
        U('Unit 1 - Preamble and Salient Features', 'Sovereign, socialist, secular, democratic republic; justice, liberty, equality, fraternity.', ['Is the Preamble part of the Constitution?', 'Salient features of the Constitution.'], ['Discuss the Kesavananda Bharati case.']),
        U('Unit 2 - Fundamental Rights', 'Articles 12-35: equality (14-18), freedoms (19-22), against exploitation, religion, culture, remedies (32).', ['Explain Article 21 with case laws.', 'Right to equality.'], ['Discuss Maneka Gandhi v. Union of India.']),
        U('Unit 3 - Directive Principles and Duties', 'DPSP (Articles 36-51), Fundamental Duties (Article 51A).', ['Relation between FR and DPSP.', 'List fundamental duties.'], ['Discuss the Minerva Mills case.']),
        U('Unit 4 - Writs', 'Habeas corpus, mandamus, prohibition, certiorari, quo warranto (Articles 32 and 226).', ['Explain the five writs.', 'Article 32 vs Article 226.'], ['When is habeas corpus issued?']),
      ],
      studyPlan: '2 hours daily. Read bare act articles and one landmark judgment summary every day.',
      jobs: 'Advocate, judicial services (PCS-J), legal advisor in companies, legal journalist.',
    },
    'Law of Contract': {
      title: 'Law of Contract (Indian Contract Act, 1872)',
      units: [
        U('Unit 1 - Formation of Contract', 'Agreement + enforceability = contract. Offer, acceptance, communication and revocation.', ['Essentials of a valid contract.', 'Rules of offer.'], ['Discuss Carlill v. Carbolic Smoke Ball Co.']),
        U('Unit 2 - Consideration and Capacity', 'No consideration, no contract (with exceptions). Minor’s agreement is void (Mohori Bibee case).', ['Exceptions to consideration.', 'Position of a minor.'], ['Discuss Mohori Bibee v. Dharmodas Ghose.']),
        U('Unit 3 - Free Consent', 'Coercion, undue influence, fraud, misrepresentation, mistake.', ['Coercion vs undue influence.', 'Effects of fraud.'], ['Explain the doctrine of mistake.']),
        U('Unit 4 - Breach and Remedies', 'Damages (Hadley v. Baxendale), specific performance, injunction, quantum meruit.', ['Kinds of damages.', 'What is quantum meruit?'], ['Discuss Hadley v. Baxendale.']),
      ],
      studyPlan: '1.5 hours daily. Learn sections with an example and one case each.',
      jobs: 'Corporate lawyer, contract manager, legal consultant.',
    },
  },
  MBBS: {
    Anatomy: {
      title: 'Human Anatomy (1st Professional)',
      units: [
        U('Unit 1 - General Anatomy', 'Anatomical position, planes, terms of movement; bones, joints, muscles, blood vessels in general.', ['Classify joints.', 'Define anatomical position.'], ['Describe the blood supply of a long bone.']),
        U('Unit 2 - Upper Limb', 'Bones, brachial plexus, muscles, shoulder and elbow joints, nerve injuries (Erb’s palsy, wrist drop).', ['Brachial plexus with diagram.', 'Explain wrist drop.'], ['Describe the shoulder joint.']),
        U('Unit 3 - Thorax', 'Thoracic cage, lungs, pleura, heart and pericardium, coronary arteries.', ['Coronary circulation.', 'Describe the pleura.'], ['Describe the right atrium.']),
        U('Unit 4 - Embryology and Histology', 'Gametogenesis, fertilisation, germ layers; microscopic structure of tissues.', ['Derivatives of germ layers.', 'Histology of skin.'], ['Describe the formation of the placenta.']),
      ],
      studyPlan: '4-5 hours daily. Dissection hall + diagrams + one standard textbook; revise with flowcharts.',
      jobs: 'Doctor after internship; NEET-PG for MD/MS; government medical officer.',
    },
    Physiology: {
      title: 'Human Physiology',
      units: [
        U('Unit 1 - General and Blood Physiology', 'Homeostasis, cell membrane transport; haemoglobin (12-16 g/dL), blood groups, coagulation.', ['Types of membrane transport.', 'Coagulation pathways.'], ['Explain erythropoiesis.']),
        U('Unit 2 - Nerve and Muscle', 'Resting membrane potential (-70 mV), action potential, neuromuscular junction.', ['Action potential with graph.', 'Neuromuscular transmission.'], ['Explain the sliding filament theory.']),
        U('Unit 3 - Cardiovascular Physiology', 'Cardiac cycle, ECG, cardiac output (5 L/min), regulation of blood pressure.', ['Normal ECG waves.', 'Regulation of BP.'], ['Explain Starling’s law of the heart.']),
        U('Unit 4 - Respiratory Physiology', 'Lung volumes, oxygen-haemoglobin dissociation curve, regulation of breathing.', ['O₂-Hb dissociation curve.', 'Lung volumes and capacities.'], ['Explain hypoxia and its types.']),
      ],
      studyPlan: '3 hours daily with graphs and flowcharts; practical journals weekly.',
      jobs: 'Clinical practice, physiology faculty after MD.',
    },
  },
  'B.Sc Agriculture': {
    Agronomy: {
      title: 'Fundamentals of Agronomy',
      units: [
        U('Unit 1 - Agronomy and Crops', 'Agronomy = science of crop production and soil management. Kharif, rabi and zaid crops.', ['Classify crops by season.', 'Scope of agronomy.'], ['Explain crop rotation with examples.']),
        U('Unit 2 - Tillage and Sowing', 'Primary and secondary tillage; seed rate, spacing, sowing methods (broadcasting, line sowing, dibbling).', ['Objectives of tillage.', 'Methods of sowing.'], ['What is zero tillage?']),
        U('Unit 3 - Irrigation and Weeds', 'Irrigation methods (flood, furrow, sprinkler, drip); weed control (cultural, mechanical, chemical).', ['Advantages of drip irrigation.', 'Methods of weed control.'], ['Explain critical stages of irrigation for wheat.']),
        U('Unit 4 - Cropping Systems', 'Mono, mixed, inter- and relay cropping; organic and natural farming.', ['Intercropping vs mixed cropping.', 'Principles of organic farming.'], ['Explain integrated farming systems.']),
      ],
      studyPlan: '1.5 hours theory + field work daily; keep a crop diary.',
      jobs: 'Agriculture officer, AFO in banks, seed company, agri-business.',
    },
    'Soil Science': {
      title: 'Fundamentals of Soil Science',
      units: [
        U('Unit 1 - Soil Formation', 'Weathering of rocks; factors: climate, organisms, relief, parent material, time.', ['Factors of soil formation.', 'Soil profile and horizons.'], ['Explain physical weathering.']),
        U('Unit 2 - Soil Properties', 'Texture, structure, porosity, colour, soil water; pH and EC.', ['Soil texture triangle.', 'Importance of soil pH.'], ['Explain soil water classes.']),
        U('Unit 3 - Soil Fertility', '17 essential nutrients; NPK; soil health card; fertilisers and manures.', ['Functions of N, P, K.', 'What is a soil health card?'], ['Explain deficiency symptoms of nitrogen.']),
        U('Unit 4 - Problem Soils', 'Acidic, saline, alkaline soils and their reclamation (lime, gypsum).', ['Reclamation of alkaline soils.', 'Causes of soil salinity.'], ['Explain the role of gypsum.']),
      ],
      studyPlan: '1.5 hours daily; soil testing practice in the lab.',
      jobs: 'Soil testing labs, fertiliser companies, research (ICAR).',
    },
  },
  'BJMC (Mass Comm)': {
    'Introduction to Journalism': {
      title: 'Introduction to Journalism',
      units: [
        U('Unit 1 - What is News?', 'News values: timeliness, proximity, prominence, impact, human interest. 5 Ws and 1 H.', ['Explain news values.', 'What are the 5 Ws and 1 H?'], ['Write a news story on a school event.']),
        U('Unit 2 - News Writing', 'Inverted pyramid style, headline, lead (intro), body; attribution and quotes.', ['Explain the inverted pyramid.', 'Write a good lead.'], ['Write a headline and lead for a road accident.']),
        U('Unit 3 - Reporting and Editing', 'Beats (crime, politics, sports), sources, fact-checking, editing and proofreading.', ['Types of beats.', 'Role of a sub-editor.'], ['How do you verify fake news?']),
        U('Unit 4 - Media Ethics and Law', 'Press Council of India, defamation, right to privacy, RTI, ethics of journalism.', ['Ethics of journalism.', 'What is defamation?'], ['Role of the Press Council of India.']),
      ],
      studyPlan: '1 hour reading newspapers + write one news story daily; start a blog.',
      jobs: 'Reporter, sub-editor, content writer, digital journalist.',
    },
    'Digital Media': {
      title: 'Digital Media and Production',
      units: [
        U('Unit 1 - Digital Media Basics', 'Websites, social media, podcasts, YouTube; audience and engagement.', ['Types of digital media.', 'What is engagement rate?'], ['Plan a social media post calendar.']),
        U('Unit 2 - Photography', 'Rule of thirds, exposure (aperture, shutter, ISO), composition.', ['Explain the exposure triangle.', 'Rule of thirds.'], ['Click and explain 5 photos with good composition.']),
        U('Unit 3 - Video Production', 'Script, storyboard, shooting, editing (cuts, transitions), sound.', ['Steps of video production.', 'What is a storyboard?'], ['Make a 1-minute video on your city.']),
        U('Unit 4 - SEO and Analytics', 'Keywords, headlines, Google Analytics, YouTube analytics.', ['What is SEO?', 'Important analytics metrics.'], ['Write an SEO-friendly blog post.']),
      ],
      studyPlan: 'Daily practice: one photo + one short post or video edit on your phone.',
      jobs: 'Social media manager, video editor, YouTuber, digital marketer.',
    },
  },
  'Hotel Management': {
    'Food Production': {
      title: 'Food Production (Kitchen Basics)',
      units: [
        U('Unit 1 - Kitchen Organisation', 'Kitchen brigade: executive chef, sous chef, chef de partie, commis. Hygiene and safety (FSSAI).', ['Explain the kitchen brigade.', 'Kitchen hygiene rules.'], ['Draw the layout of a hotel kitchen.']),
        U('Unit 2 - Cooking Methods', 'Moist heat (boiling, steaming, poaching), dry heat (roasting, baking, grilling), frying.', ['Moist vs dry heat cooking.', 'Explain shallow and deep frying.'], ['Explain braising with an example.']),
        U('Unit 3 - Stocks, Sauces and Soups', 'White and brown stocks; 5 mother sauces: béchamel, velouté, espagnole, tomato, hollandaise.', ['Name the mother sauces.', 'Classify soups.'], ['Prepare béchamel sauce - method.']),
        U('Unit 4 - Indian Cuisine', 'Basic gravies (makhani, kadai, korma), tandoor, regional cuisines.', ['Name 4 basic Indian gravies.', 'What is dum cooking?'], ['Explain the tandoor and its dishes.']),
      ],
      studyPlan: '1 hour theory + 3 hours kitchen practicals daily. Also see the Cooking Classes course.',
      jobs: 'Commis chef, chef de partie, cruise and airline kitchens, own restaurant.',
    },
    'Front Office': {
      title: 'Front Office Operations',
      units: [
        U('Unit 1 - Front Office Basics', 'Reception, reservation, concierge, bell desk; qualities of front office staff.', ['Sections of the front office.', 'Qualities of a receptionist.'], ['Explain the guest cycle.']),
        U('Unit 2 - Rooms and Tariffs', 'Single, double, twin, suite; tariff plans: EP, CP, MAP, AP.', ['Types of rooms.', 'Explain meal plans.'], ['What is the rack rate?']),
        U('Unit 3 - Check-in and Check-out', 'Registration, C-form for foreigners, key handling, billing, settlement.', ['Check-in procedure.', 'Methods of bill settlement.'], ['Explain the check-out process.']),
        U('Unit 4 - Guest Relations', 'Handling complaints (LEARN: listen, empathise, apologise, resolve, notify), etiquette.', ['How to handle guest complaints.', 'Telephone etiquette.'], ['Role play: an angry guest.']),
      ],
      studyPlan: '1 hour daily + spoken English and hotel software practice.',
      jobs: 'Front office associate, guest relations executive, hotel manager.',
    },
  },
  'Fashion Design': {
    'Elements of Design': {
      title: 'Elements and Principles of Design',
      units: [
        U('Unit 1 - Elements of Design', 'Line, shape, form, colour, texture, space.', ['Explain the elements of design.', 'Types of lines and their effect.'], ['Design a pattern using lines.']),
        U('Unit 2 - Colour Theory', 'Colour wheel: primary, secondary, tertiary; warm and cool colours; colour schemes.', ['Draw a colour wheel.', 'Complementary colour scheme.'], ['Create an analogous colour palette.']),
        U('Unit 3 - Principles of Design', 'Balance, rhythm, emphasis, proportion, harmony.', ['Explain balance with examples.', 'What is emphasis?'], ['Design a dress showing rhythm.']),
        U('Unit 4 - Fashion Illustration', 'Croqui (fashion figure, 9-head theory), drawing garments, rendering fabrics.', ['What is a croqui?', 'Explain the 9-head figure.'], ['Draw a croqui with a kurta design.']),
      ],
      studyPlan: '2 hours of sketching daily. Use the Drawing subject and the Paint lab to practise.',
      jobs: 'Fashion designer, illustrator, stylist, boutique owner.',
    },
    'Textile Science': {
      title: 'Textile Science',
      units: [
        U('Unit 1 - Fibres', 'Natural (cotton, silk, wool, jute) and man-made (polyester, nylon, rayon) fibres; burning test.', ['Classify textile fibres.', 'Explain the burning test.'], ['Properties of cotton.']),
        U('Unit 2 - Yarns', 'Spinning, yarn twist, count, blends.', ['Types of yarns.', 'What is yarn count?'], ['Explain blended yarns.']),
        U('Unit 3 - Fabric Construction', 'Weaving (plain, twill, satin), knitting, non-woven fabrics.', ['Plain vs twill weave.', 'Knitting vs weaving.'], ['Draw the satin weave.']),
        U('Unit 4 - Dyeing and Printing', 'Tie and dye (bandhani), block printing, screen printing; Indian textiles (Banarasi, Chanderi, Pochampally).', ['Methods of printing.', 'Famous Indian textiles.'], ['Explain tie and dye.']),
      ],
      studyPlan: 'Build a fabric swatch file; visit local weavers and markets.',
      jobs: 'Textile designer, merchandiser, quality controller.',
    },
  },
  'Polytechnic Diploma': {
    'Applied Maths': {
      title: 'Applied Mathematics - I',
      units: [
        U('Unit 1 - Algebra', 'Quadratic equations, logarithms, binomial theorem, determinants.', ['Solve by the quadratic formula.', 'Properties of logarithms.'], ['Expand (1 + x)⁵.']),
        U('Unit 2 - Trigonometry', 'Ratios, identities, compound angles.', ['Prove sin²θ + cos²θ = 1.', 'Find sin 75°.'], ['Solve trigonometric identities.']),
        U('Unit 3 - Coordinate Geometry', 'Straight lines, circles.', ['Equation of a line through two points.', 'Equation of a circle.'], ['Find the distance of a point from a line.']),
        U('Unit 4 - Differentiation', 'Limits and derivatives of standard functions; applications.', ['Derivative of xⁿ, sin x.', 'Find maxima.'], ['Find dy/dx of x² sin x.']),
      ],
      studyPlan: '1.5 hours daily of solving problems.',
      jobs: 'Foundation for all diploma branches and lateral entry to B.Tech.',
    },
    'Engineering Drawing': {
      title: 'Engineering Drawing',
      units: [
        U('Unit 1 - Drawing Instruments and Lettering', 'Drawing board, T-square, set squares, compass; lines and lettering; dimensioning.', ['Types of lines.', 'Rules of dimensioning.'], ['Draw single-stroke letters.']),
        U('Unit 2 - Geometric Constructions', 'Polygons, ellipse, parabola, involute.', ['Construct a hexagon.', 'Draw an ellipse by the concentric circle method.'], ['Draw an involute of a circle.']),
        U('Unit 3 - Orthographic Projection', 'First-angle projection (used in India): front, top and side views.', ['First vs third angle projection.', 'Draw three views of a block.'], ['Projections of points and lines.']),
        U('Unit 4 - Isometric Views and CAD', 'Isometric drawing; introduction to AutoCAD commands (LINE, CIRCLE, TRIM).', ['Draw an isometric view of a cube.', 'Basic AutoCAD commands.'], ['Convert orthographic to isometric.']),
      ],
      studyPlan: 'Practise 2 drawing sheets a week; AutoCAD practice in the lab.',
      jobs: 'Draughtsman, CAD operator, junior engineer.',
    },
  },
  'CA Foundation': {
    Accounting: {
      title: 'Principles and Practice of Accounting',
      units: [
        U('Unit 1 - Theoretical Framework', 'Accounting concepts, conventions, policies; accounting standards (Ind AS).', ['Explain the going concern concept.', 'What are accounting standards?'], ['Explain the accrual concept with an example.']),
        U('Unit 2 - Journal, Ledger, Trial Balance', 'Recording, posting, balancing and preparing a trial balance; rectification of errors.', ['Types of errors.', 'Prepare a trial balance.'], ['Rectify given errors with a suspense account.']),
        U('Unit 3 - Depreciation and BRS', 'SLM and WDV methods; bank reconciliation statement.', ['SLM vs WDV.', 'Prepare a BRS.'], ['Calculate depreciation by WDV for 3 years.']),
        U('Unit 4 - Final Accounts', 'Trading, profit and loss account and balance sheet of sole traders with adjustments.', ['Prepare final accounts.', 'Treatment of outstanding expenses.'], ['Prepare final accounts from a trial balance.']),
      ],
      studyPlan: '3-4 hours daily; solve ICAI study material and mock test papers.',
      jobs: 'Article-ship after CA Intermediate; CA: auditor, tax consultant, CFO.',
    },
    'Business Laws': {
      title: 'Business Laws',
      units: [
        U('Unit 1 - Indian Contract Act, 1872', 'Offer, acceptance, consideration, capacity, free consent, void agreements.', ['Essentials of a valid contract.', 'Void vs voidable.'], ['Case-based question on offer and acceptance.']),
        U('Unit 2 - Sale of Goods Act, 1930', 'Conditions and warranties, transfer of property, rights of an unpaid seller.', ['Condition vs warranty.', 'Rights of an unpaid seller.'], ['Explain caveat emptor.']),
        U('Unit 3 - Partnership Act, 1932', 'Nature of partnership, rights and duties of partners, dissolution.', ['Essentials of partnership.', 'Modes of dissolution.'], ['Partnership vs company.']),
        U('Unit 4 - LLP and Companies Act', 'LLP Act 2008; types of companies; MOA and AOA.', ['Features of an LLP.', 'Types of companies.'], ['Explain the doctrine of ultra vires.']),
      ],
      studyPlan: '2 hours daily; write answers in section-wise format.',
      jobs: 'Legal and compliance roles; foundation for the CA journey.',
    },
  },
  ITI: {
    'Trade Theory': {
      title: 'Trade Theory (Electrician)',
      units: [
        U('Unit 1 - Safety', 'Electrical safety, PPE (gloves, shoes), first aid for electric shock, fire extinguishers (CO₂ for electrical fires).', ['First aid for electric shock.', 'Types of fire extinguishers.'], ['List safety rules in a workshop.']),
        U('Unit 2 - Basic Electricity', 'Voltage, current, resistance; Ohm’s law V = IR; series and parallel circuits.', ['State Ohm’s law.', 'Series vs parallel.'], ['Find total resistance of 3 resistors in parallel.']),
        U('Unit 3 - Wiring', 'Wires and cables, house wiring (casing-capping, conduit), switchboards, earthing, MCB.', ['Types of house wiring.', 'Why is earthing needed?'], ['Draw the wiring diagram of a staircase light.']),
        U('Unit 4 - Measuring Instruments', 'Multimeter, ammeter, voltmeter, energy meter, megger.', ['Uses of a multimeter.', 'Ammeter vs voltmeter.'], ['How to measure insulation resistance?']),
      ],
      studyPlan: '1 hour theory + 4 hours workshop practice daily.',
      jobs: 'Electrician, railway and metro technician, apprentice in PSUs, self-employment.',
    },
    'Workshop Calculation': {
      title: 'Workshop Calculation and Science',
      units: [
        U('Unit 1 - Units and Measurement', 'SI units, conversion, vernier caliper and micrometer reading.', ['Least count of a vernier caliper.', 'Unit conversions.'], ['Read a micrometer.']),
        U('Unit 2 - Fractions, Percentage and Ratio', 'Workshop maths for material calculations.', ['Calculate percentage of scrap.', 'Ratio problems.'], ['Find the cost of 15 m of wire at Rs 12/m.']),
        U('Unit 3 - Area and Volume', 'Areas of plane figures, volume of solids, weight of materials.', ['Volume of a cylinder.', 'Area of a circle.'], ['Find the weight of an iron rod.']),
        U('Unit 4 - Heat, Work and Power', 'Temperature, heat, work = F × d, power = W/t, efficiency.', ['Define power and efficiency.', 'Convert °C to °F.'], ['Calculate power of a motor.']),
      ],
      studyPlan: '1 hour daily of problem solving.',
      jobs: 'Supports all trades - technician, supervisor.',
    },
  },
  'Computer Courses': {
    DCA: {
      title: 'Diploma in Computer Applications (DCA)',
      units: [
        U('Unit 1 - Windows and Files', 'Desktop, taskbar, File Explorer, create / copy / move / rename folders, shortcuts (Ctrl+C, Ctrl+V, Ctrl+Z).', ['Steps to create and rename a folder.', 'Ten keyboard shortcuts.'], ['Practical: organise files into folders.']),
        U('Unit 2 - Notepad, WordPad and MS Word', 'Notepad: plain text (.txt). WordPad: simple formatting. Word: tables, images, mail merge, page layout.', ['Notepad vs WordPad vs Word.', 'Steps of mail merge.'], ['Practical: type a leave application and format it.']),
        U('Unit 3 - MS Excel', 'Cells, formulas (=SUM, =AVERAGE, =IF, =VLOOKUP), sorting, filters, charts.', ['Explain 5 Excel functions.', 'How to make a chart?'], ['Practical: make a salary sheet with totals.']),
        U('Unit 4 - PowerPoint and Internet', 'Slides, themes, animation; email, Google Drive, online forms, cyber safety.', ['Steps to create a presentation.', 'Cyber safety rules.'], ['Practical: make 5 slides about your village or city.']),
      ],
      studyPlan: 'Daily 1 hour practice in the Computer Lab page of this website + 1 hour on a real computer.',
      jobs: 'Data entry operator, computer operator, office assistant, CSC operator.',
    },
    Tally: {
      title: 'Tally Prime with GST',
      units: [
        U('Unit 1 - Company Creation', 'Create a company, features (F11), configuration (F12), ledgers and groups.', ['Steps of company creation.', 'Name 5 groups in Tally.'], ['Practical: create ledgers for a shop.']),
        U('Unit 2 - Vouchers', 'Contra (F4), payment (F5), receipt (F6), journal (F7), sales (F8), purchase (F9).', ['Voucher types with shortcut keys.', 'Contra entry example.'], ['Practical: enter 10 transactions.']),
        U('Unit 3 - Inventory', 'Stock groups, stock items, units, godowns; stock summary.', ['How to create stock items?', 'What is a godown?'], ['Practical: record purchase and sale with stock.']),
        U('Unit 4 - GST and Reports', 'CGST + SGST (within state), IGST (other state); GSTR-1, GSTR-3B; balance sheet and P&L reports.', ['CGST vs IGST.', 'Name GST returns.'], ['Practical: make a GST sales invoice.']),
      ],
      studyPlan: '2 hours daily practice with a sample shop’s transactions.',
      jobs: 'Accountant, GST assistant, billing executive.',
    },
    'Web Design': {
      title: 'Web Design (HTML, CSS, JavaScript)',
      units: [
        U('Unit 1 - HTML', 'Tags: <h1>, <p>, <a>, <img>, <ul>, <table>, <form>. Structure: <html>, <head>, <body>.', ['Write a page with a table and image.', 'List 10 HTML tags.'], ['Practical: make your profile page.']),
        U('Unit 2 - CSS', 'Selectors, colours, fonts, box model (margin, border, padding), flexbox, responsive design.', ['Explain the box model.', 'What is flexbox?'], ['Practical: style your profile page.']),
        U('Unit 3 - JavaScript', 'Variables, functions, events (onclick), DOM changes, alert, if-else, loops.', ['What is the DOM?', 'Write a click counter.'], ['Practical: make a simple calculator.']),
        U('Unit 4 - Publishing', 'Domain, hosting, GitHub Pages / Vercel; SEO basics.', ['Steps to publish a website.', 'What is hosting?'], ['Practical: publish a page online.']),
      ],
      studyPlan: 'Build one small page daily in the HTML Playground of the Computer Lab.',
      jobs: 'Web designer, front-end developer, freelancer.',
    },
    Python: {
      title: 'Python Programming',
      units: [
        U('Unit 1 - Basics', 'print(), input(), variables, data types (int, float, str, bool), operators.', ['Program to add two numbers.', 'Data types in Python.'], ['Practical: simple interest program.']),
        U('Unit 2 - Conditions and Loops', 'if-elif-else, for, while, range(), break, continue.', ['Program for even/odd.', 'Print a multiplication table.'], ['Practical: grade calculator.']),
        U('Unit 3 - Lists, Dictionaries and Functions', 'Lists, tuples, dictionaries; def functions; return values.', ['List methods.', 'Write a function for factorial.'], ['Practical: student marks dictionary.']),
        U('Unit 4 - Files and Projects', 'Reading and writing files; modules (math, random); mini projects.', ['File modes r, w, a.', 'Use of the random module.'], ['Practical: number guessing game.']),
      ],
      studyPlan: '1-2 hours coding daily; use an online Python compiler on your phone.',
      jobs: 'Junior Python developer, data analyst, automation tester.',
    },
  },
  'Cooking Classes': {
    'Indian Breakfast': {
      title: 'Indian Breakfast Recipes',
      units: [
        U('Recipe 1 - Poha', 'Ingredients (2 people): 1½ cups thick poha, 1 onion, 1 potato (small cubes), 1 green chilli, 8-10 curry leaves, ½ tsp mustard seeds, ¼ tsp turmeric, peanuts, salt, lemon, coriander.\nMethod:\n1. Wash poha in a strainer; keep for 5 minutes.\n2. Heat 2 tbsp oil, fry peanuts and keep aside.\n3. Add mustard seeds, curry leaves, chilli, onion; cook till soft.\n4. Add potato, turmeric, salt; cover and cook 5 minutes.\n5. Add poha and peanuts, mix gently, steam 2 minutes.\n6. Add lemon juice and coriander. Serve hot.', ['Tip: use thick poha so it does not become mushy.', 'Tip: add a little sugar for Indori taste.', 'Safety: keep the handle of the pan away from the edge.'], ['Practice: make poha for your family and write what you would change next time.']),
        U('Recipe 2 - Aloo Paratha', 'Ingredients: 2 cups wheat flour, 3 boiled potatoes, 1 green chilli, coriander, ½ tsp ajwain, ½ tsp red chilli, salt, ghee.\nMethod:\n1. Knead a soft dough with flour, salt and water; rest 15 minutes.\n2. Mash potatoes with chilli, coriander, ajwain, spices and salt.\n3. Roll a small roti, put filling in the centre, close and roll again gently.\n4. Cook on a hot tawa, flip, apply ghee on both sides till golden.\n5. Serve with curd, butter or pickle.', ['Tip: potatoes should be dry, not wet.', 'Tip: seal the edges well so the filling does not come out.', 'Variation: gobhi, paneer or mooli paratha.'], ['Practice: make 2 parathas of different fillings.']),
        U('Recipe 3 - Upma', 'Ingredients: 1 cup suji (rava), 2½ cups water, 1 onion, carrot and peas, mustard seeds, urad dal, curry leaves, ginger, salt.\nMethod:\n1. Dry roast suji till it smells nutty; keep aside.\n2. Heat oil, add mustard seeds, urad dal, curry leaves, ginger, onion.\n3. Add vegetables, cook 3 minutes, add water and salt, boil.\n4. Add suji slowly while stirring so no lumps form.\n5. Cover and cook 2 minutes on low flame.', ['Tip: water ratio 1 : 2½ gives soft upma.', 'Tip: stir continuously while adding suji.', 'Healthy: add more vegetables.'], ['Practice: make upma and time yourself.']),
        U('Recipe 4 - Besan Chilla', 'Ingredients: 1 cup besan, onion, tomato, green chilli, coriander, ¼ tsp turmeric, ajwain, salt, water.\nMethod:\n1. Mix besan, chopped vegetables, spices and water to a smooth batter.\n2. Heat a tawa, apply oil, spread a ladle of batter thinly.\n3. Cook both sides till golden.\n4. Serve with green chutney.', ['Tip: batter should be like dosa batter - not too thick.', 'High protein breakfast.', 'Variation: add grated paneer.'], ['Practice: make chillas for 3 people.']),
        U('Recipe 5 - Sweet Lassi and Masala Chai', 'Lassi: 1 cup curd, 2 tbsp sugar, ½ cup cold water, ice, a pinch of cardamom - blend or whisk.\nMasala chai: 1 cup water + 1 cup milk, 2 tsp tea leaves, sugar, crushed ginger and 2 cardamoms - boil water with ginger and cardamom, add tea, then milk and sugar, boil 2 minutes, strain.', ['Tip: use fresh, chilled curd for lassi.', 'Tip: boil tea leaves in water first for strong chai.', 'Children: prefer lassi or milk instead of tea.'], ['Practice: make lassi for guests.']),
      ],
      studyPlan: 'Cook one recipe a day with an adult. Always wash hands, tie hair, and switch off the gas after cooking.',
      jobs: 'Breakfast stall, tiffin service, café menu.',
    },
    'North Indian Main Course': {
      title: 'North Indian Main Course',
      units: [
        U('Recipe 1 - Dal Tadka', 'Ingredients: 1 cup toor dal, 3 cups water, turmeric, salt. Tadka: 2 tbsp ghee, jeera, garlic, 1 onion, 1 tomato, green chilli, red chilli, hing, coriander.\nMethod:\n1. Wash dal; pressure cook with water, turmeric, salt for 3 whistles.\n2. Heat ghee, add jeera, hing, garlic, onion; fry golden.\n3. Add tomato and chilli; cook till soft.\n4. Pour tadka on dal, boil 2 minutes, add coriander.', ['Tip: soak dal 20 minutes for faster cooking.', 'Safety: open the cooker only after pressure releases.', 'Serve with jeera rice or roti.'], ['Practice: make dal for the family dinner.']),
        U('Recipe 2 - Jeera Rice', 'Ingredients: 1 cup basmati rice, 2 cups water, 1 tsp jeera, 1 tbsp ghee, bay leaf, salt.\nMethod:\n1. Wash and soak rice 20 minutes.\n2. Heat ghee, add jeera and bay leaf.\n3. Add rice, fry 1 minute, add water and salt.\n4. Cover and cook on low flame 12-15 minutes until water dries.', ['Tip: rice : water = 1 : 2.', 'Tip: do not stir while cooking.', 'Fluff with a fork.'], ['Practice: cook rice without it sticking.']),
        U('Recipe 3 - Paneer Butter Masala', 'Ingredients: 200 g paneer, 3 tomatoes, 1 onion, 10 cashews, ginger-garlic paste, butter, cream, kasuri methi, red chilli, garam masala, salt, sugar.\nMethod:\n1. Boil tomato, onion and cashews; blend smooth.\n2. Heat butter, add ginger-garlic paste, then the puree; cook 10 minutes.\n3. Add spices, salt, a pinch of sugar.\n4. Add paneer cubes, cream and crushed kasuri methi; simmer 3 minutes.', ['Tip: soak paneer in warm water to keep it soft.', 'Tip: cashews make the gravy rich.', 'Serve with naan or roti.'], ['Practice: make it for a festival meal.']),
        U('Recipe 4 - Rajma', 'Ingredients: 1 cup rajma (soaked overnight), onion, tomato, ginger-garlic, jeera, rajma masala, salt.\nMethod:\n1. Pressure cook soaked rajma for 6-7 whistles till soft.\n2. Make masala: jeera, onion, ginger-garlic, tomato, spices.\n3. Add rajma with water; simmer 15 minutes; mash a few beans to thicken.', ['Tip: always soak rajma 8 hours.', 'Rajma-chawal is a complete meal.', 'Rich in protein and iron.'], ['Practice: make rajma-chawal on Sunday.']),
        U('Recipe 5 - Soft Roti (Phulka)', 'Ingredients: 2 cups wheat flour, water, a pinch of salt.\nMethod:\n1. Knead soft dough; rest 20 minutes.\n2. Make balls, roll evenly into thin circles using dry flour.\n3. Cook on a hot tawa till spots appear, flip.\n4. Put on direct flame with tongs - it puffs up! Apply ghee.', ['Tip: rest the dough for soft rotis.', 'Tip: roll evenly for puffing.', 'Safety: use tongs near the flame.'], ['Practice: make 5 round rotis.']),
      ],
      studyPlan: 'Cook one dish every week; learn to balance salt and spice.',
      jobs: 'Dhaba, restaurant cook, tiffin and catering business.',
    },
    'South Indian': {
      title: 'South Indian Recipes',
      units: [
        U('Recipe 1 - Idli', 'Ingredients: 2 cups idli rice, 1 cup urad dal, ½ tsp methi seeds, salt.\nMethod:\n1. Soak rice and dal (with methi) separately for 6 hours.\n2. Grind to a smooth batter, mix with salt.\n3. Ferment overnight (8-12 hours) in a warm place.\n4. Grease idli moulds, fill batter, steam 10-12 minutes.', ['Tip: fermentation makes idli soft.', 'Steamed food = healthy and oil-free.', 'Serve with sambar and coconut chutney.'], ['Practice: prepare batter and make idlis next morning.']),
        U('Recipe 2 - Masala Dosa', 'Ingredients: dosa batter, potato masala (boiled potato, onion, mustard, curry leaves, turmeric).\nMethod:\n1. Heat a tawa, sprinkle water, wipe.\n2. Pour batter, spread in circles thinly.\n3. Drizzle oil, cook till golden and crisp.\n4. Put potato masala, fold and serve.', ['Tip: tawa must be hot but not smoking.', 'Tip: spread batter fast in circles.', 'Serve with chutney and sambar.'], ['Practice: make 3 crispy dosas.']),
        U('Recipe 3 - Sambar', 'Ingredients: ½ cup toor dal, vegetables (drumstick, brinjal, pumpkin), tamarind, sambar powder, tomato, mustard, curry leaves, hing.\nMethod:\n1. Cook dal soft.\n2. Boil vegetables with tamarind water, tomato, salt, sambar powder.\n3. Add dal, boil 5 minutes.\n4. Tadka: mustard, red chilli, curry leaves, hing.', ['Tip: tamarind gives a sour taste.', 'Healthy with many vegetables.', 'Pairs with idli, dosa, rice.'], ['Practice: make sambar with 3 vegetables.']),
        U('Recipe 4 - Coconut Chutney', 'Ingredients: 1 cup grated coconut, 2 tbsp roasted chana dal, 1 green chilli, ginger, salt, water. Tadka: mustard, curry leaves.\nMethod: grind all with water; add tadka.', ['Tip: use fresh coconut.', 'Keep in the fridge and use the same day.', 'Variation: tomato or peanut chutney.'], ['Practice: make two kinds of chutney.']),
        U('Recipe 5 - Lemon Rice', 'Ingredients: 2 cups cooked rice, 1 lemon, peanuts, mustard, chana dal, curry leaves, green chilli, turmeric, salt.\nMethod: tadka in oil, add turmeric, mix rice and salt, switch off, add lemon juice.', ['Tip: use leftover rice.', 'Add lemon after switching off the flame.', 'Good for lunch boxes.'], ['Practice: pack lemon rice for tiffin.']),
      ],
      studyPlan: 'Plan ahead - batters need soaking and fermenting.',
      jobs: 'Dosa stall, South Indian restaurant, cloud kitchen.',
    },
    'Snacks and Street Food': {
      title: 'Snacks and Street Food',
      units: [
        U('Recipe 1 - Samosa', 'Dough: 2 cups maida, 4 tbsp oil, ajwain, salt, water (stiff dough). Filling: boiled potatoes, peas, ginger, green chilli, jeera, garam masala, amchur, salt.\nMethod:\n1. Rest dough 30 minutes.\n2. Roll oval, cut into half, make a cone, fill, seal with water.\n3. Fry on low-medium flame till golden.', ['Tip: fry on low flame for crisp samosas.', 'Safety: an adult should handle deep frying.', 'Serve with tamarind and mint chutney.'], ['Practice: shape 6 samosas.']),
        U('Recipe 2 - Pav Bhaji', 'Ingredients: potatoes, cauliflower, peas, capsicum, onion, tomato, pav bhaji masala, butter, lemon, pav.\nMethod:\n1. Boil and mash vegetables.\n2. In butter fry onion, capsicum, tomato, masala.\n3. Add mashed vegetables and water; cook and mash well.\n4. Toast pav with butter; serve with onion and lemon.', ['Tip: mash well for smooth bhaji.', 'Lots of vegetables - healthy!', 'Mumbai’s famous street food.'], ['Practice: make pav bhaji for 4 people.']),
        U('Recipe 3 - Pani Puri (Golgappe)', 'Pani: mint, coriander, green chilli, ginger, black salt, roasted jeera, tamarind, cold water - blend and strain. Filling: boiled potato, chana, onion, chaat masala. Use ready puris.\nMethod: crack a puri, fill, dip in pani, eat at once!', ['Tip: use clean filtered water.', 'Chill the pani for best taste.', 'Hygiene matters - make it at home.'], ['Practice: make two flavours of pani.']),
        U('Recipe 4 - Vegetable Sandwich', 'Ingredients: bread, butter, green chutney, cucumber, tomato, onion, boiled potato, chaat masala, cheese (optional).\nMethod: apply butter and chutney, layer vegetables, sprinkle chaat masala, cover; grill or eat fresh.', ['No-fire recipe: good for young children.', 'Tip: dry the vegetables to keep bread crisp.', 'Cut diagonally for a nice look.'], ['Practice: make sandwiches for your school tiffin.']),
        U('Recipe 5 - Bhel Puri', 'Ingredients: murmura (puffed rice), sev, boiled potato, onion, tomato, peanuts, green and tamarind chutney, lemon, coriander.\nMethod: mix everything just before serving.', ['No-fire recipe.', 'Mix just before eating so it stays crunchy.', 'Low-cost evening snack.'], ['Practice: make bhel in 5 minutes.']),
      ],
      studyPlan: 'Learn one snack every weekend; focus on cleanliness and fresh oil.',
      jobs: 'Food stall, snack shop, catering for events.',
    },
    'Sweets and Desserts': {
      title: 'Indian Sweets and Desserts',
      units: [
        U('Recipe 1 - Suji Halwa', 'Ingredients: ½ cup suji, ½ cup ghee, ½ cup sugar, 2 cups water, cardamom, dry fruits.\nMethod:\n1. Boil water with sugar.\n2. Roast suji in ghee on low flame till golden and aromatic.\n3. Add sugar water carefully (it splutters!), stir fast.\n4. Cook till thick; add cardamom and nuts.', ['Ratio 1 : 1 : 1 (suji : ghee : sugar) + 4 water.', 'Safety: stand back while adding water.', 'Prasad for festivals.'], ['Practice: make halwa for a festival.']),
        U('Recipe 2 - Kheer', 'Ingredients: 1 litre full-cream milk, ¼ cup rice, ½ cup sugar, cardamom, saffron, nuts.\nMethod:\n1. Wash and soak rice 20 minutes.\n2. Boil milk, add rice, cook on low flame 30-40 minutes stirring often.\n3. Add sugar, cardamom, saffron and nuts; cook 5 more minutes.', ['Tip: stir often so milk does not stick.', 'Add sugar at the end.', 'Serve warm or chilled.'], ['Practice: make kheer and note the time it takes.']),
        U('Recipe 3 - Gulab Jamun', 'Ingredients: 1 cup milk powder, ¼ cup maida, ¼ tsp baking soda, 2 tbsp ghee, milk to knead. Syrup: 1½ cups sugar, 1½ cups water, cardamom, rose water.\nMethod:\n1. Make syrup (slightly sticky).\n2. Make a soft dough, form crack-free balls.\n3. Fry on low flame till dark brown.\n4. Soak in warm syrup for 2 hours.', ['Tip: balls must be crack-free.', 'Fry slowly on low flame.', 'Syrup should be warm, not boiling.'], ['Practice: make 10 gulab jamuns.']),
        U('Recipe 4 - Besan Ladoo', 'Ingredients: 2 cups besan, ¾ cup ghee, 1 cup powdered sugar, cardamom, nuts.\nMethod:\n1. Roast besan in ghee on low flame 20-25 minutes till golden and fragrant.\n2. Cool till warm, add sugar and cardamom.\n3. Shape into ladoos.', ['Tip: slow roasting gives the best taste.', 'Add sugar only when the mixture is warm, not hot.', 'Stays fresh for 2 weeks.'], ['Practice: make ladoos for Diwali.']),
        U('Recipe 5 - Fruit Custard', 'Ingredients: ½ litre milk, 2 tbsp custard powder, 4 tbsp sugar, chopped fruits (banana, apple, grapes, pomegranate).\nMethod: mix custard powder in ½ cup cold milk; boil the rest of the milk with sugar, add the mixture, stir till thick; cool, chill and add fruits.', ['Tip: mix powder in cold milk to avoid lumps.', 'Add fruits only after it cools.', 'Kids’ favourite dessert.'], ['Practice: decorate custard with fruits.']),
      ],
      studyPlan: 'Sweet making needs patience - always use low flame.',
      jobs: 'Halwai, sweet shop, home-made sweets business at festivals.',
    },
    'Baking and Cakes': {
      title: 'Baking - Cakes, Cookies and Bread',
      units: [
        U('Recipe 1 - Eggless Vanilla Cake', 'Ingredients: 1½ cups maida, ¾ cup sugar, ¾ cup curd, ½ cup oil, ½ cup milk, 1 tsp baking powder, ½ tsp baking soda, vanilla essence.\nMethod:\n1. Preheat oven to 180 °C (or a cooker with salt base, without whistle and ring, 10 minutes).\n2. Mix curd, sugar, baking soda, baking powder; wait 5 minutes.\n3. Add oil, milk, vanilla, then maida; fold gently.\n4. Pour into a greased tin, bake 30-35 minutes. Check with a toothpick - it should come out clean.', ['Tip: do not over-mix the batter.', 'No oven? Use a pressure cooker or kadhai.', 'Cool before cutting.'], ['Practice: bake a cake for a birthday.']),
        U('Recipe 2 - Chocolate Cake', 'Same as vanilla cake, replace ¼ cup maida with ¼ cup cocoa powder; add 2 tbsp chocolate chips.\nFrosting: 100 g dark chocolate + ½ cup warm cream - stir to a smooth ganache, pour over the cake.', ['Tip: sift maida and cocoa together.', 'Ganache sets in the fridge in 30 minutes.', 'Decorate with sprinkles.'], ['Practice: make a ganache-covered cake.']),
        U('Recipe 3 - Atta Cookies', 'Ingredients: 1 cup wheat flour, ½ cup butter or ghee, ½ cup powdered sugar or jaggery, ½ tsp baking powder, cardamom, milk.\nMethod: cream butter and sugar, add flour, baking powder, cardamom, a little milk; shape cookies; bake at 180 °C for 15-18 minutes.', ['Healthier with atta and jaggery.', 'Cookies harden after cooling.', 'Store in an airtight jar.'], ['Practice: bake 12 cookies of the same size.']),
        U('Recipe 4 - Pizza on Tawa', 'Ingredients: pizza base (or homemade dough), pizza sauce, capsicum, onion, tomato, sweet corn, mozzarella cheese, oregano.\nMethod: spread sauce on the base, add vegetables and cheese; cook on a covered tawa on low flame 8-10 minutes till cheese melts.', ['No oven needed.', 'Keep flame low so the base does not burn.', 'Add paneer for protein.'], ['Practice: make a mini pizza for your family.']),
        U('Recipe 5 - Banana Muffins', 'Ingredients: 2 ripe bananas, ½ cup sugar, ¼ cup oil, 1 cup maida or atta, 1 tsp baking powder, ¼ tsp soda, cinnamon.\nMethod: mash bananas with sugar and oil; fold in dry ingredients; fill cups ¾; bake at 180 °C for 20 minutes.', ['Use over-ripe bananas - no waste!', 'Fill cups only ¾.', 'Add walnuts for crunch.'], ['Practice: bake muffins for a school bake sale.']),
      ],
      studyPlan: 'Measure ingredients exactly - baking is science! Use a measuring cup and spoon.',
      jobs: 'Home baker, bakery, cake shop, custom cakes on Instagram.',
    },
    'Chinese and Continental': {
      title: 'Indo-Chinese and Continental',
      units: [
        U('Recipe 1 - Veg Fried Rice', 'Ingredients: 2 cups cooked cold rice, carrot, beans, capsicum, cabbage, spring onion, garlic, soy sauce, vinegar, pepper, salt.\nMethod: on high flame fry garlic, add vegetables (stir-fry 2 minutes), add rice, sauces, pepper, salt; toss well; add spring onion.', ['Tip: use cold, leftover rice.', 'Cook on high flame for smoky taste.', 'Cut vegetables finely and equally.'], ['Practice: make fried rice in 15 minutes.']),
        U('Recipe 2 - Veg Hakka Noodles', 'Ingredients: noodles, vegetables (cabbage, carrot, capsicum), garlic, soy sauce, chilli sauce, vinegar, oil.\nMethod: boil noodles with oil and salt, drain, rinse in cold water; stir-fry garlic and vegetables, add noodles and sauces, toss.', ['Tip: rinse noodles in cold water so they don’t stick.', 'Use tongs to toss.', 'Add paneer or tofu.'], ['Practice: make noodles for dinner.']),
        U('Recipe 3 - Veg Manchurian', 'Balls: grated cabbage, carrot, spring onion, maida, cornflour, salt, pepper - shape and fry. Gravy: garlic, ginger, onion, capsicum, soy sauce, chilli sauce, vinegar, cornflour slurry.\nMethod: fry balls; make gravy; add balls just before serving.', ['Squeeze water from vegetables before making balls.', 'Add balls at the end to keep them crisp.', 'Dry version for snacks.'], ['Practice: make dry and gravy Manchurian.']),
        U('Recipe 4 - White Sauce Pasta', 'Ingredients: pasta, 2 tbsp butter, 2 tbsp maida, 1½ cups milk, vegetables (corn, capsicum, broccoli), oregano, chilli flakes, salt, pepper, cheese.\nMethod: boil pasta; melt butter, roast maida 1 minute, add milk slowly while whisking; add salt, pepper, herbs, vegetables, pasta and cheese.', ['Tip: whisk continuously to avoid lumps.', 'White sauce = béchamel.', 'Add cheese at the end.'], ['Practice: make red and white sauce pasta.']),
        U('Recipe 5 - Tomato Soup', 'Ingredients: 5 tomatoes, 1 onion, 2 garlic, butter, salt, pepper, sugar, cream, bread croutons.\nMethod: cook tomato, onion, garlic in butter, add water and boil 10 minutes; blend and strain; add salt, pepper, a pinch of sugar; serve with cream and croutons.', ['Healthy winter soup.', 'Strain for a smooth soup.', 'Croutons: toast small bread cubes with butter.'], ['Practice: make soup for 4 people.']),
      ],
      studyPlan: 'Keep all vegetables cut before you start - Chinese cooking is very fast.',
      jobs: 'Chinese food stall, café, cloud kitchen.',
    },
    'Healthy and Kids Tiffin (No-Fire)': {
      title: 'Healthy Food and No-Fire Recipes for Kids',
      units: [
        U('Recipe 1 - Fruit Chaat', 'Ingredients: apple, banana, papaya, orange, pomegranate, chaat masala, lemon, honey.\nMethod: wash and cut fruits (with an adult), mix with lemon, chaat masala and a little honey.', ['No-fire: safe for Play School and Nursery children with help.', 'Eat fresh - cut fruits turn brown.', 'Rainbow fruits = more vitamins.'], ['Practice: make a rainbow fruit plate.']),
        U('Recipe 2 - Sprouts Salad', 'Ingredients: 1 cup sprouted moong, cucumber, tomato, onion, lemon, salt, chaat masala, coriander.\nMethod: (sprouting: soak moong overnight, tie in a wet cloth for 1 day) - mix all.', ['Very high in protein.', 'Steam sprouts lightly for small children.', 'Great tiffin snack.'], ['Practice: sprout moong at home and observe daily.']),
        U('Recipe 3 - Curd Rice', 'Ingredients: 1 cup cooked rice, 1 cup curd, milk, salt, grated carrot, cucumber, pomegranate. Tadka (by an adult): mustard, curry leaves.\nMethod: mash rice, mix curd, milk, salt, vegetables; add tadka.', ['Cooling food for summer.', 'Add milk so it does not turn sour in the tiffin.', 'Good for the stomach.'], ['Practice: pack curd rice for lunch.']),
        U('Recipe 4 - Peanut Chikki Laddoo (No-Fire)', 'Ingredients: 1 cup roasted peanuts, ½ cup grated jaggery, 2 tbsp grated coconut, cardamom.\nMethod: grind peanuts coarsely, mix jaggery and cardamom, press into small balls.', ['Energy food - iron and protein.', 'No sugar, no fire.', 'Store in a box for a week.'], ['Practice: make 10 laddoos with friends.']),
        U('Recipe 5 - Smoothie and Nimbu Pani', 'Banana smoothie: 1 banana, 1 cup milk, 1 tsp honey, 2 dates - blend.\nNimbu pani: 1 glass cold water, juice of ½ lemon, sugar or honey, black salt, roasted jeera powder - stir.', ['Healthy drinks instead of cold drinks.', 'Nimbu pani gives vitamin C and keeps you hydrated in summer.', 'No added colours.'], ['Practice: serve nimbu pani to guests.']),
      ],
      studyPlan: 'Children cook only with an adult. Learn the "Clean - Cut - Cook - Clean" rule.',
      jobs: 'Nutrition and healthy tiffin business; dietitian career after B.Sc Nutrition.',
    },
  },
};

// Complete Python course + React course
MORE_UNITS['Computer Courses'].Python = PYTHON_FULL;
MORE_UNITS['Computer Courses'].React = REACT_FULL;

// Cooking Classes in English + Hindi, plus East India and West India recipes
for (const subject of Object.values(MORE_UNITS['Cooking Classes'])) {
  for (const u of subject.units) {
    const dish = u.unitName.replace(/^Recipe \d+ - /, '');
    const hi = COOKING_HI[dish];
    if (hi) { u.unitName = `${u.unitName} (${hi[0]})`; u.notesHi = hi[1]; }
  }
}
Object.assign(MORE_UNITS['Cooking Classes'], EAST_WEST);
