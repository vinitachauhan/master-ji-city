// B.Sc - 3 years, and every subject has 3 books in every year (9 books per subject), like UP universities.
// Chemistry: each year has an Inorganic, an Organic and a Physical Chemistry book. Biology group = Zoology + Botany + Chemistry.
import { BSC_MATHS, BSC_PHYSICS } from './bsc_mp.mjs';
import { BSC_CHEMISTRY, BSC_BIOLOGY } from './bsc_cb.mjs';
import { NEW_BOOKS, NEW_CHEM_UNITS as N } from './bsc_more.mjs';
import { BOTANY_UNITS as B, ZOOLOGY_UNITS as Z } from './bsc_bio.mjs';

const paper = (info, sem, title) => [title || info.sems[sem][0], info.sems[sem][1]];
const c = (sem, i) => BSC_CHEMISTRY.sems[sem][1][i];
// units of the older combined Biology papers, now shared out between Botany and Zoology
const bio = (sem, i) => BSC_BIOLOGY.sems[sem][1][i];
const nb = (book, i) => NEW_BOOKS.Biology[book][1][i];

export const BSC_BOOKS = {
  Maths: {
    studyPlan: BSC_MATHS.studyPlan, jobs: BSC_MATHS.jobs,
    years: {
      1: [paper(BSC_MATHS, 2, 'Algebra, Matrices and Trigonometry'), paper(BSC_MATHS, 1, 'Differential Calculus'), NEW_BOOKS.Maths.geometry],
      2: [paper(BSC_MATHS, 3, 'Real Analysis'), paper(BSC_MATHS, 4, 'Differential Equations'), NEW_BOOKS.Maths.mechanics],
      3: [paper(BSC_MATHS, 5, 'Abstract Algebra - Groups and Rings'), paper(BSC_MATHS, 6, 'Linear Algebra and Complex Analysis'), NEW_BOOKS.Maths.numerical],
    },
  },
  Physics: {
    studyPlan: BSC_PHYSICS.studyPlan, jobs: BSC_PHYSICS.jobs,
    years: {
      1: [paper(BSC_PHYSICS, 1, 'Mechanics and Properties of Matter'), paper(BSC_PHYSICS, 3, 'Kinetic Theory, Thermodynamics and Statistical Physics'), NEW_BOOKS.Physics.circuits],
      2: [paper(BSC_PHYSICS, 4, 'Waves, Oscillations and Optics'), paper(BSC_PHYSICS, 2, 'Electricity, Magnetism and Electromagnetic Theory'), NEW_BOOKS.Physics.mathphys],
      3: [paper(BSC_PHYSICS, 5, 'Quantum Mechanics and Spectroscopy'), NEW_BOOKS.Physics.nuclear, ['Solid State Physics and Electronics', BSC_PHYSICS.sems[6][1].filter(([name]) => !/Nuclear/.test(name))]],
    },
  },
  Chemistry: {
    studyPlan: BSC_CHEMISTRY.studyPlan, jobs: BSC_CHEMISTRY.jobs,
    years: {
      1: [
        ['Inorganic Chemistry - I', [c(1, 0), c(1, 1), c(1, 2), c(3, 4), N.acidsBases]],
        ['Organic Chemistry - I', [c(1, 3), c(1, 4), c(2, 2), c(2, 3), c(2, 4)]],
        ['Physical Chemistry - I', [c(2, 0), c(2, 1), c(4, 2), c(4, 3), c(4, 4)]],
      ],
      2: [
        ['Inorganic Chemistry - II', [c(4, 0), c(4, 1), N.metallurgy, N.nobleGases, N.inorgPolymers]],
        ['Organic Chemistry - II', [c(3, 3), c(5, 2), c(5, 3), c(5, 4), c(6, 3)]],
        ['Physical Chemistry - II', [c(3, 0), c(3, 1), c(3, 2), N.solidState, N.nuclearChem]],
      ],
      3: [
        ['Inorganic Chemistry - III', [N.spectraComplex, N.hsab, N.inorgMech, c(6, 2), c(6, 4)]],
        ['Organic Chemistry - III', [c(5, 0), c(5, 1), N.reagents, N.pericyclic, N.naturalProducts]],
        ['Physical Chemistry - III', [c(6, 0), c(6, 1), N.photochem, N.electroApp, N.molStructure]],
      ],
    },
  },
  Botany: {
    studyPlan: 'Daily 2 hours: read the book line by line, draw 2 labelled plant diagrams, and revise families with floral formulae. Make a herbarium of 20 local plants in Year 2.',
    jobs: 'M.Sc Botany, forest and agriculture departments, Botanical Survey of India, nurseries and horticulture, pharma (herbal), teacher (after B.Ed), CSIR-NET research. Rs 2.5-5 lakh per year to start.',
    years: {
      1: [
        ['Microbiology, Fungi and Plant Pathology', [bio(2, 0), nb('microbio', 0), nb('microbio', 1), bio(2, 2), B.plantPathology]],
        ['Algae and Bryophytes', [bio(2, 1), B.algaeTypes, B.algaeEconomy, B.bryophytes, bio(2, 3)]],
        ['Pteridophytes, Gymnosperms and Palaeobotany', [B.pteridoTypes, B.stele, B.gymnoTypes, B.palaeobotany, bio(2, 4)]],
      ],
      2: [
        ['Plant Taxonomy and Economic Botany', [B.taxPrinciples, B.taxSystems, B.familiesDicot, B.familiesMonocot, B.economicBotany]],
        NEW_BOOKS.Biology.anatomy,
        ['Cytology, Genetics and Evolution', [bio(1, 3), bio(5, 0), bio(5, 1), B.cytogenetics, bio(5, 4)]],
      ],
      3: [
        ['Plant Physiology and Biochemistry', [bio(4, 0), bio(4, 1), B.plantBiochem, B.plantGrowth, B.stressPhysiology]],
        ['Plant Ecology and Phytogeography', [bio(6, 0), bio(6, 1), bio(6, 2), B.phytogeography, B.adaptations]],
        ['Molecular Biology, Biotechnology and Plant Breeding', [bio(5, 2), bio(5, 3), bio(6, 3), B.tissueCulture, B.plantBreeding]],
      ],
    },
  },
  Zoology: {
    studyPlan: 'Daily 2 hours: read the book, draw 2 labelled animal diagrams, and learn classification with examples. Keep a practical record of slides and museum specimens.',
    jobs: 'M.Sc Zoology, wildlife and fisheries departments, Zoological Survey of India, pathology and research labs, sericulture and aquaculture, teacher (after B.Ed), CSIR-NET research. Rs 2.5-5 lakh per year to start.',
    years: {
      1: [
        ['Non-chordates I - Protozoa to Annelida', [bio(3, 0), Z.protozoa, bio(3, 1), Z.parasitology, Z.annelids]],
        ['Non-chordates II - Arthropoda to Hemichordata', [bio(3, 2), Z.arthropoda, Z.mollusca, Z.echinodermata, Z.hemichordata]],
        ['Cell Biology', BSC_BIOLOGY.sems[1][1]],
      ],
      2: [
        ['Chordates and Comparative Anatomy', [Z.protochordates, bio(3, 3), bio(3, 4), Z.compAnatomy, Z.mammalAdaptations]],
        ['Animal Physiology and Biochemistry', [bio(4, 2), bio(4, 3), bio(4, 4), Z.animalMetabolism, Z.osmoThermo]],
        NEW_BOOKS.Biology.develop,
      ],
      3: [
        ['Genetics, Evolution and Zoogeography', [bio(5, 0), bio(5, 1), bio(5, 4), Z.humanGenetics, Z.zoogeography]],
        ['Ecology, Ethology and Biostatistics', [bio(6, 0), bio(6, 1), bio(6, 2), Z.ethology, Z.biostatistics]],
        ['Applied Zoology, Immunology and Biotechnology', [Z.appliedZoology, Z.pestManagement, nb('microbio', 3), nb('microbio', 4), bio(6, 3)]],
      ],
    },
  },
};
