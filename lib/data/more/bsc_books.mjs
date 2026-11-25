// B.Sc - 3 years, and every subject has 3 books in every year (9 books per subject), like UP universities.
// Chemistry: each year has an Inorganic, an Organic and a Physical Chemistry book.
import { BSC_MATHS, BSC_PHYSICS } from './bsc_mp.mjs';
import { BSC_CHEMISTRY, BSC_BIOLOGY } from './bsc_cb.mjs';
import { NEW_BOOKS, NEW_CHEM_UNITS as N } from './bsc_more.mjs';

const paper = (info, sem, title) => [title || info.sems[sem][0], info.sems[sem][1]];
const c = (sem, i) => BSC_CHEMISTRY.sems[sem][1][i];

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
  Biology: {
    studyPlan: BSC_BIOLOGY.studyPlan, jobs: BSC_BIOLOGY.jobs,
    years: {
      1: [paper(BSC_BIOLOGY, 1), paper(BSC_BIOLOGY, 2), paper(BSC_BIOLOGY, 3)],
      2: [paper(BSC_BIOLOGY, 4), NEW_BOOKS.Biology.anatomy, NEW_BOOKS.Biology.develop],
      3: [paper(BSC_BIOLOGY, 5), paper(BSC_BIOLOGY, 6), NEW_BOOKS.Biology.microbio],
    },
  },
};
