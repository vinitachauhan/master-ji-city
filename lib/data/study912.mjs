// Class 9 to 12 - default chapters.
// Each chapter: [chapterName, definition / main idea, formula or memory trick, [mcq, correct, w1, w2, w3]]
// Hindi is written in Hindi (Devanagari) like a Hindi textbook; all other subjects in English.

export const CLASSES_9_12 = ['9', '10', '11', '12'];
export const SUBJECTS_9_12 = [
  'Maths', 'Science', 'Physics', 'Chemistry', 'Biology', 'Accounts', 'Business Studies',
  'Economics', 'History', 'Geography', 'Pol Science', 'Hindi', 'English', 'Computer',
];

export const STUDY_9_12 = {
  Maths: {
    '9': [
      ['Number Systems', 'Natural ⊂ Whole ⊂ Integers ⊂ Rational ⊂ Real numbers. Irrational numbers cannot be written as p/q (√2, π).', 'Trick: the decimal of a rational number either ends or repeats; an irrational one never ends and never repeats.', ['√2 is ___?', 'Irrational', 'Rational', 'An integer', 'Natural']],
      ['Polynomials', 'An expression with variables and whole-number powers: 2x² + 3x + 1. Degree = highest power.', '(a+b)² = a² + 2ab + b²; (a-b)² = a² - 2ab + b²; a² - b² = (a+b)(a-b). Remainder Theorem: remainder = p(a).', ['Degree of x³ + 2x + 1?', '3', '2', '1', '0']],
      ['Coordinate Geometry', 'A point is written as (x, y). The x-axis is horizontal, the y-axis vertical; together they make 4 quadrants.', 'Quadrant signs: I (+,+), II (-,+), III (-,-), IV (+,-), going anticlockwise.', ['(-2, 3) lies in which quadrant?', 'II', 'I', 'III', 'IV']],
      ['Linear Equations in Two Variables', 'ax + by + c = 0. It has infinitely many solutions and its graph is a straight line.', 'Check a solution: put the values of x and y in; if LHS = RHS, it is correct.', ['The graph of 2x + 3y = 6 is a ___?', 'Straight line', 'Circle', 'Curve', 'Point']],
      ['Triangles', 'Congruence rules: SSS, SAS, ASA, RHS. The angles of a triangle add up to 180°.', 'Trick: in SAS the angle is between the two sides. AAA does not prove congruence.', ['Sum of the angles of a triangle?', '180°', '360°', '90°', '270°']],
    ],
    '10': [
      ['Real Numbers', 'Fundamental Theorem of Arithmetic: every number is a unique product of primes.', 'HCF x LCM = a x b (for two numbers only).', ['HCF(6, 8) x LCM(6, 8) = ?', '48', '14', '24', '2']],
      ['Polynomials', 'A quadratic ax² + bx + c has zeroes α and β.', 'α + β = -b/a, αβ = c/a. Trick: "minus in the sum, plus in the product".', ['Sum of the zeroes of x² - 5x + 6?', '5', '-5', '6', '-6']],
      ['Pair of Linear Equations', 'Two equations in two variables, solved by substitution or elimination.', 'a1/a2 ≠ b1/b2 → unique solution; a1/a2 = b1/b2 ≠ c1/c2 → no solution; all equal → infinitely many.', ['Parallel lines mean ___?', 'No solution', 'A unique solution', 'Infinite solutions', 'Two solutions']],
      ['Quadratic Equations', 'ax² + bx + c = 0. Find the roots by factorisation or by the formula.', 'x = [-b ± √(b² - 4ac)] / 2a. D = b² - 4ac: D > 0 two real roots, D = 0 equal roots, D < 0 no real roots.', ['If D = 0, the roots are ___?', 'Real and equal', 'Two different real roots', 'Not real', 'Three']],
      ['Introduction to Trigonometry', 'Ratios of the sides of a right triangle: sin, cos, tan.', 'sin = P/H, cos = B/H, tan = P/B (P = perpendicular, B = base, H = hypotenuse). sin²θ + cos²θ = 1.', ['sin 30° = ?', '1/2', '√3/2', '1', '0']],
    ],
    '11': [
      ['Sets', 'A collection of well-defined objects. Union (∪), intersection (∩), complement.', 'n(A ∪ B) = n(A) + n(B) - n(A ∩ B). A set with n elements has 2ⁿ subsets.', ['How many subsets does a 3-element set have?', '8', '6', '3', '9']],
      ['Relations and Functions', 'A function gives exactly one output for every input. Domain and range.', 'If A has m elements and B has n, A x B has mn pairs and 2^(mn) relations.', ['In a function, one input has ___ output(s).', 'Exactly one', 'Two', 'No', 'Infinite']],
      ['Trigonometric Functions', 'Radian measure; sin, cos and tan for all angles.', 'π rad = 180°. ASTC rule: Q1 All, Q2 Sin, Q3 Tan, Q4 Cos are positive.', ['π radians = ?', '180°', '90°', '360°', '60°']],
      ['Complex Numbers', 'z = a + ib where i = √-1. Real part a, imaginary part b.', 'i² = -1, i³ = -i, i⁴ = 1. |z| = √(a² + b²).', ['i² = ?', '-1', '1', 'i', '0']],
      ['Permutations and Combinations', 'Permutation = arrangement (order matters). Combination = selection.', 'nPr = n!/(n-r)!, nCr = n!/[r!(n-r)!]. Trick: "P = Position, C = Choose".', ['5C2 = ?', '10', '20', '5', '25']],
    ],
    '12': [
      ['Matrices', 'A rectangular arrangement of numbers (m x n). Types: square, identity, zero.', '(AB)ᵀ = BᵀAᵀ. In general AB ≠ BA. Multiply row by column.', ['Order of the product of a 2x3 and a 3x2 matrix?', '2x2', '3x3', '2x3', 'Not possible']],
      ['Determinants', 'A single number value of a square matrix, used for area and inverses.', '2x2: |A| = ad - bc. A⁻¹ = adj(A)/|A|, only when |A| ≠ 0.', ['Determinant of [[2,3],[1,4]]?', '5', '11', '8', '-5']],
      ['Continuity and Differentiability', 'A function is continuous if its graph has no break. The derivative is the rate of change.', 'd/dx(xⁿ) = nxⁿ⁻¹, d/dx(sin x) = cos x, d/dx(eˣ) = eˣ. Remember the chain rule.', ['d/dx(x³) = ?', '3x²', 'x²', '3x', 'x⁴/4']],
      ['Integrals', 'Integration is the reverse of differentiation; it gives the area under a curve.', '∫xⁿ dx = xⁿ⁺¹/(n+1) + C, ∫(1/x) dx = log|x| + C. Never forget "+ C"!', ['∫x dx = ?', 'x²/2 + C', 'x² + C', '1 + C', '2x + C']],
      ['Probability', 'The chance of an event happening, between 0 and 1.', 'P(E) = favourable outcomes / total outcomes. P(A|B) = P(A ∩ B)/P(B). Bayes’ theorem.', ['Probability of heads when tossing a coin?', '1/2', '1', '0', '1/4']],
    ],
  },

  Science: {
    '9': [
      ['Matter in Our Surroundings', 'Matter is anything that occupies space and has mass. Three states: solid, liquid, gas.', 'Evaporation is a surface phenomenon and speeds up with temperature. 0 °C = 273 K.', ['25 °C = ? K', '298 K', '273 K', '248 K', '25 K']],
      ['Atoms and Molecules', 'An atom is the smallest particle of an element. A molecule is a group of atoms.', '1 mole = 6.022 x 10²³ particles (Avogadro’s number). Moles = mass / molar mass.', ['Avogadro’s number?', '6.022 x 10²³', '3 x 10⁸', '9.8', '1.6 x 10⁻¹⁹']],
      ['The Fundamental Unit of Life', 'The cell is the unit of life. Plant cells have a cell wall and chloroplasts.', 'Trick: mitochondria = power house, lysosome = suicide bag.', ['Power house of the cell?', 'Mitochondria', 'Nucleus', 'Ribosome', 'Lysosome']],
      ['Motion', 'A change in position is motion. Distance is a scalar; displacement is a vector.', 'v = u + at, s = ut + ½at², v² = u² + 2as. Speed = distance / time.', ['In v = u + at, "a" is ___?', 'Acceleration', 'Area', 'Angle', 'Air']],
      ['Force and Laws of Motion', 'Newton’s three laws: inertia, F = ma, action = reaction.', 'F = ma, momentum p = mv. Third law: rocket launch, gun recoil.', ['F = ?', 'ma', 'mv', 'm/a', 'mgh']],
    ],
    '10': [
      ['Chemical Reactions and Equations', 'New substances are formed. Types: combination, decomposition, displacement, redox.', 'Balance so that atoms are equal on both sides. OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons).', ['Rusting of iron is ___?', 'Oxidation', 'Reduction', 'Neutralisation', 'None']],
      ['Light - Reflection and Refraction', 'Reflection: light bounces back. Refraction: light bends when it changes medium.', 'Mirror: 1/f = 1/v + 1/u. Lens: 1/f = 1/v - 1/u. n = c/v. Power P = 1/f (in metres).', ['Unit of the power of a lens?', 'Dioptre', 'Watt', 'Newton', 'Joule']],
      ['Electricity', 'Current is the flow of charge. Resistance opposes current.', 'V = IR (Ohm’s law). P = VI = I²R. Series: R = R1 + R2. Parallel: 1/R = 1/R1 + 1/R2.', ['V = IR is whose law?', 'Ohm’s', 'Newton’s', 'Faraday’s', 'Joule’s']],
      ['Life Processes', 'Nutrition, respiration, transportation and excretion keep us alive.', 'Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (sunlight + chlorophyll). Nephron = unit of the kidney.', ['Structural unit of the kidney?', 'Nephron', 'Neuron', 'Alveoli', 'Villi']],
      ['Acids, Bases and Salts', 'Acids give H⁺ ions and taste sour. Bases give OH⁻ ions. pH 7 is neutral.', 'pH < 7 acid, = 7 neutral, > 7 base. Acid + base → salt + water.', ['pH 7 is ___?', 'Neutral', 'Acidic', 'Basic', 'A salt']],
    ],
  },

  Physics: {
    '9': [
      ['Motion', 'Uniform and non-uniform motion. Velocity = displacement / time.', 'v = u + at, s = ut + ½at², v² - u² = 2as.', ['SI unit of speed?', 'm/s', 'km', 'N', 'J']],
      ['Force and Laws of Motion', 'Force is a push or pull. Inertia is the tendency not to change state.', 'F = ma. Momentum p = mv. 1 N = 1 kg m/s².', ['Inertia is described by which law?', 'First law', 'Second law', 'Third law', 'Ohm’s law']],
      ['Gravitation', 'Every two objects attract each other. On Earth, g = 9.8 m/s².', 'F = Gm1m2/r². W = mg. Weight on the Moon is 1/6 of that on Earth.', ['Value of g on Earth?', '9.8 m/s²', '3 x 10⁸', '6.67', '1.6']],
      ['Work and Energy', 'Work = force x displacement. Energy is the capacity to do work.', 'W = Fs, KE = ½mv², PE = mgh, Power = W/t (watt).', ['KE = ?', '½mv²', 'mgh', 'Fs', 'ma']],
      ['Sound', 'Sound is a longitudinal wave and needs a medium. It cannot travel in a vacuum.', 'v = fλ. Speed of sound in air ≈ 343 m/s. An echo needs at least 17.2 m distance.', ['Can sound travel in a vacuum?', 'No', 'Yes, faster', 'Yes, slower', 'As fast as light']],
    ],
    '10': [
      ['Light - Reflection and Refraction', 'Images formed by concave/convex mirrors and lenses.', '1/f = 1/v + 1/u (mirror). m = -v/u. P = 1/f.', ['A concave mirror is used in a ___?', 'Torch reflector', 'Rear-view mirror', 'Nothing', 'Magnet']],
      ['The Human Eye and the Colourful World', 'The eye works like a lens. Myopia (distant objects blurred), hypermetropia (near objects blurred).', 'Myopia → concave lens, hypermetropia → convex lens. The sky is blue due to scattering.', ['Myopia is corrected with a ___?', 'Concave lens', 'Convex lens', 'Prism', 'Mirror']],
      ['Electricity', 'Current = charge / time. Resistance R = ρL/A.', 'V = IR, R = ρL/A, H = I²Rt, P = VI. 1 kWh = 3.6 x 10⁶ J.', ['1 kWh = ?', '3.6 x 10⁶ J', '1000 J', '3600 J', '1 J']],
      ['Magnetic Effects of Electric Current', 'A current-carrying wire has a magnetic field around it.', 'Right-hand thumb rule. Fleming’s left-hand rule (motor), right-hand rule (generator).', ['Rule for an electric motor?', 'Fleming’s left-hand rule', 'Right-hand rule', 'Ohm’s law', 'Snell’s law']],
      ['Sources of Energy', 'Renewable (solar, wind, hydro) and non-renewable (coal, petrol).', 'Trick: Solar, Wind, Hydro, Biogas, Geothermal are renewable.', ['Which is renewable?', 'Solar', 'Coal', 'Petrol', 'Natural gas']],
    ],
    '11': [
      ['Units and Measurements', 'SI units: 7 base units (m, kg, s, A, K, mol, cd). Dimensions.', 'Force [MLT⁻²], energy [ML²T⁻²]. Take care with significant figures.', ['Dimensions of force?', '[MLT⁻²]', '[ML²T⁻²]', '[MLT⁻¹]', '[ML]']],
      ['Motion in a Straight Line', 'Graphs of position, velocity and acceleration.', 'Slope of a v-t graph = acceleration; area under it = displacement.', ['Area under a v-t graph?', 'Displacement', 'Acceleration', 'Force', 'Speed']],
      ['Laws of Motion', 'Newton’s laws, friction, circular motion.', 'F = dp/dt. Friction f = μN. Centripetal force = mv²/r.', ['Friction = ?', 'μN', 'mg', 'ma', 'mv']],
      ['Work, Energy and Power', 'Work-energy theorem: net work = change in kinetic energy.', 'W = F·s cosθ. Kinetic energy is conserved in an elastic collision.', ['Work-energy theorem: W = ?', 'ΔKE', 'ΔPE', 'F/s', 'P x t²']],
      ['Gravitation', 'Kepler’s laws, escape velocity, satellites.', 'vₑ = √(2gR) ≈ 11.2 km/s. T² ∝ r³ (Kepler’s third law).', ['Escape velocity from Earth?', '11.2 km/s', '9.8 km/s', '3 km/s', '343 m/s']],
    ],
    '12': [
      ['Electric Charges and Fields', 'Charge is quantised. Coulomb force. Electric field lines.', 'F = kq1q2/r², k = 9 x 10⁹. Gauss’s law: Φ = q/ε₀.', ['Value of k?', '9 x 10⁹', '6.67 x 10⁻¹¹', '3 x 10⁸', '1.6 x 10⁻¹⁹']],
      ['Current Electricity', 'Ohm’s law, Kirchhoff’s laws, Wheatstone bridge.', 'KCL: currents at a junction add to 0. KVL: voltages in a loop add to 0. Balanced bridge: P/Q = R/S.', ['KCL is based on conservation of ___?', 'Charge', 'Energy', 'Momentum', 'Mass']],
      ['Moving Charges and Magnetism', 'A moving charge feels a magnetic force. Biot-Savart law, Ampere’s law.', 'F = qvB sinθ. Solenoid: B = μ₀nI.', ['Magnetic force on a moving charge F = ?', 'qvB sinθ', 'qE', 'ma', 'mv²/r']],
      ['Ray Optics', 'Mirrors, lenses, prisms, total internal reflection.', 'Lens maker’s formula: 1/f = (n-1)(1/R1 - 1/R2). TIR needs an angle greater than the critical angle.', ['Optical fibres work on ___?', 'Total internal reflection', 'Refraction only', 'Diffraction', 'Polarisation']],
      ['Dual Nature of Radiation and Matter', 'Light behaves sometimes as a wave and sometimes as a particle (photon). Photoelectric effect.', 'E = hν, KEmax = hν - φ. de Broglie wavelength λ = h/p.', ['de Broglie wavelength = ?', 'h/p', 'hν', 'mc²', 'p/h']],
    ],
  },

  Chemistry: {
    '9': [
      ['Matter in Our Surroundings', 'Solid, liquid and gas, and changes between them (melting, boiling, sublimation).', 'Sublimation: solid → gas directly (camphor, naphthalene).', ['Camphor disappearing in air is ___?', 'Sublimation', 'Melting', 'Boiling', 'Freezing']],
      ['Is Matter Around Us Pure', 'Pure substances (elements, compounds) vs mixtures (homogeneous, heterogeneous).', 'Separation: distillation, chromatography, centrifugation, crystallisation.', ['Cream is separated from milk by ___?', 'Centrifugation', 'Distillation', 'A magnet', 'Sieving']],
      ['Atoms and Molecules', 'Law of conservation of mass; law of constant proportions.', 'Moles = given mass / molar mass. Molar mass of H₂O = 18 g.', ['Molar mass of H₂O?', '18 g', '16 g', '2 g', '20 g']],
      ['Structure of the Atom', 'Proton (+), neutron (0), electron (-). Bohr’s model.', 'Shell capacity 2n²: K = 2, L = 8, M = 18. Atomic number = number of protons.', ['Maximum electrons in the L shell?', '8', '2', '18', '32']],
      ['Valency and Chemical Formulae', 'Valency is the combining capacity of an element. Use the criss-cross method for formulae.', 'Trick: cross the valencies: Al³⁺ + O²⁻ → Al₂O₃.', ['Formula of aluminium oxide?', 'Al₂O₃', 'AlO', 'Al₃O₂', 'AlO₃']],
    ],
    '10': [
      ['Chemical Reactions and Equations', 'Types of reactions and how to balance equations.', 'CaO + H₂O → Ca(OH)₂ (combination, exothermic).', ['Quicklime + water is a ___ reaction.', 'Combination', 'Decomposition', 'Displacement', 'Redox only']],
      ['Acids, Bases and Salts', 'Indicators: litmus, phenolphthalein. Common salts and their uses.', 'Baking soda NaHCO₃, washing soda Na₂CO₃·10H₂O, bleaching powder CaOCl₂, Plaster of Paris CaSO₄·½H₂O.', ['Formula of baking soda?', 'NaHCO₃', 'Na₂CO₃', 'NaCl', 'CaOCl₂']],
      ['Metals and Non-metals', 'Metals are shiny, conduct electricity and are malleable. Reactivity series.', 'Reactivity series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Hg > Ag > Au.', ['Most reactive metal in the series?', 'K', 'Au', 'Cu', 'Fe']],
      ['Carbon and its Compounds', 'Carbon is tetravalent and shows catenation. Homologous series.', 'Alkane CₙH₂ₙ₊₂, alkene CₙH₂ₙ, alkyne CₙH₂ₙ₋₂. Methane = CH₄.', ['Formula of methane?', 'CH₄', 'C₂H₆', 'C₂H₄', 'CO₂']],
      ['Periodic Classification of Elements', 'Mendeleev’s table; the modern periodic table is based on atomic number.', '18 groups, 7 periods. Left to right: atomic size decreases, metallic character decreases.', ['The modern periodic table is based on ___?', 'Atomic number', 'Atomic mass', 'Colour', 'Density']],
    ],
    '11': [
      ['Some Basic Concepts of Chemistry', 'Mole concept, molarity, stoichiometry.', 'Molarity M = moles of solute / litres of solution.', ['Unit of molarity?', 'mol/L', 'g/L', 'mol/kg', 'L/mol']],
      ['Structure of Atom', 'Quantum numbers, orbitals (s, p, d, f), Aufbau principle.', 'Aufbau order: 1s 2s 2p 3s 3p 4s 3d... plus Pauli’s principle and Hund’s rule.', ['Maximum electrons in a p subshell?', '6', '2', '10', '14']],
      ['Classification of Elements and Periodicity', 'Periodic trends: atomic radius, ionisation enthalpy, electronegativity.', 'Fluorine is the most electronegative element (3.98). Size increases down a group.', ['Most electronegative element?', 'F', 'O', 'Cl', 'N']],
      ['Chemical Bonding', 'Ionic and covalent bonds, VSEPR shapes, hybridisation.', 'sp = linear 180°, sp² = trigonal 120°, sp³ = tetrahedral 109.5°.', ['Hybridisation of carbon in CH₄?', 'sp³', 'sp', 'sp²', 'dsp²']],
      ['Equilibrium', 'Forward and backward rates are equal. Le Chatelier’s principle.', 'Kc = [products]/[reactants]. pH = -log[H⁺].', ['pH = ?', '-log[H⁺]', 'log[H⁺]', '[H⁺]', '14 + log[H⁺]']],
    ],
    '12': [
      ['Solutions', 'Concentration terms, Raoult’s law, colligative properties.', 'ΔTb = Kb·m, ΔTf = Kf·m, π = CRT. Raoult: p = x·p°.', ['Osmotic pressure π = ?', 'CRT', 'nRT/P', 'Kb·m', 'x·p°']],
      ['Electrochemistry', 'Galvanic cells, Nernst equation, conductance.', 'E = E° - (0.059/n) log Q. ΔG = -nFE. F = 96500 C.', ['Faraday constant?', '96500 C', '6.022 x 10²³', '8.314', '1.6 x 10⁻¹⁹']],
      ['Chemical Kinetics', 'The rate and order of a reaction.', 'First order: t½ = 0.693/k. Arrhenius: k = A e^(-Ea/RT).', ['Half-life of a first-order reaction?', '0.693/k', 'k/0.693', '1/k', '2k']],
      ['The d- and f-Block Elements', 'Transition metals: coloured ions, variable oxidation states, catalysts.', 'Lanthanoid contraction. KMnO₄ and K₂Cr₂O₇ are strong oxidising agents.', ['Transition elements belong to the ___ block.', 'd', 's', 'p', 'f']],
      ['Alcohols, Phenols and Ethers', 'Organic compounds with the -OH group (and ethers with -O-).', 'Lucas test: a tertiary alcohol gives turbidity immediately. Phenol is acidic due to resonance.', ['Which gives immediate turbidity in the Lucas test?', 'Tertiary alcohol', 'Primary alcohol', 'Secondary alcohol', 'Ether']],
    ],
  },

  Biology: {
    '9': [
      ['The Fundamental Unit of Life', 'Cell organelles and their functions.', 'Nucleus = control room, ribosome = protein factory, Golgi body = packaging unit.', ['Protein factory of the cell?', 'Ribosome', 'Golgi body', 'Nucleus', 'Vacuole']],
      ['Tissues', 'A group of cells doing the same job. Plant: meristematic, permanent. Animal: epithelial, muscular, nervous, connective.', 'Xylem carries water up; phloem carries food everywhere. The neuron is the longest cell.', ['Which tissue carries water in plants?', 'Xylem', 'Phloem', 'Cork', 'Muscle']],
      ['Diversity in Living Organisms', 'Classification: kingdom, phylum, class, order, family, genus, species.', 'Trick: "King Philip Came Over For Good Soup". Binomial name: Homo sapiens.', ['Scientific name of humans?', 'Homo sapiens', 'Panthera leo', 'Mangifera indica', 'Rana tigrina']],
      ['Improvement in Food Resources', 'Crop improvement, manure, irrigation, animal husbandry, fish farming.', 'Kharif: paddy, maize (June-Oct). Rabi: wheat, gram (Nov-Apr).', ['Paddy is a ___ crop.', 'Kharif', 'Rabi', 'Zaid', 'None']],
      ['Why Do We Fall Ill', 'Acute vs chronic diseases. Infection, immunity, vaccines.', 'Bacteria: TB, typhoid. Viruses: COVID-19, polio. Protozoa: malaria. Vaccines protect before disease.', ['Malaria is caused by ___?', 'Protozoa', 'Viruses', 'Bacteria', 'Fungi']],
    ],
    '10': [
      ['Life Processes', 'Nutrition, respiration, transportation and excretion.', 'Aerobic respiration: glucose → CO₂ + H₂O + energy (ATP). The human heart has 4 chambers. Vessels: arteries, veins, capillaries.', ['How many chambers in the human heart?', '4', '2', '3', '5']],
      ['Control and Coordination', 'The nervous system and hormones. Reflex actions.', 'Cerebrum (thinking), cerebellum (balance), medulla (involuntary actions). Insulin comes from the pancreas.', ['Which part keeps balance?', 'Cerebellum', 'Cerebrum', 'Medulla', 'Heart']],
      ['How Do Organisms Reproduce', 'Asexual (fission, budding) and sexual reproduction.', 'Amoeba - binary fission, Hydra - budding, Plasmodium - multiple fission.', ['Hydra reproduces by ___?', 'Budding', 'Fission', 'Spores', 'Seeds']],
      ['Heredity', 'Traits pass from parents to children. Mendel’s experiments.', 'Monohybrid F2 ratio 3:1, dihybrid 9:3:3:1. A child’s sex depends on the father’s X or Y chromosome.', ['Monohybrid F2 phenotypic ratio?', '3:1', '9:3:3:1', '1:1', '1:2:1']],
      ['Our Environment', 'Ecosystems, food chains, the ozone layer, waste management.', '10% law: only 10% of energy passes to the next level. CFCs damage the ozone layer.', ['The 10% law is about ___?', 'Energy transfer', 'Water', 'Population', 'Oxygen']],
    ],
    '11': [
      ['The Living World', 'Characteristics of life, taxonomy, nomenclature.', 'Binomial nomenclature was given by Carolus Linnaeus. Genus is capitalised, species is not; both in italics.', ['Who gave binomial nomenclature?', 'Linnaeus', 'Darwin', 'Mendel', 'Hooke']],
      ['Cell: The Unit of Life', 'Prokaryotic vs eukaryotic cells.', 'Prokaryotes have no nuclear membrane (bacteria). Ribosomes: 70S in prokaryotes, 80S in eukaryotes.', ['Bacteria have ___ cells.', 'Prokaryotic', 'Eukaryotic', 'Plant', 'Animal']],
      ['Biomolecules', 'Carbohydrates, proteins, lipids, nucleic acids, enzymes.', 'Enzymes are protein catalysts. There are 20 amino acids. DNA sugar = deoxyribose.', ['Enzymes are mostly ___?', 'Proteins', 'Fats', 'Sugars', 'Vitamins']],
      ['Photosynthesis in Higher Plants', 'Light reaction (grana) and dark reaction / Calvin cycle (stroma).', 'C3 plants (wheat), C4 plants (maize, sugarcane). RuBisCO works in the Calvin cycle.', ['Sugarcane is a ___ plant.', 'C4', 'C3', 'CAM', 'None']],
      ['Breathing and Exchange of Gases', 'Lungs; gas exchange happens in the alveoli.', 'Tidal volume ≈ 500 mL. Haemoglobin carries oxygen.', ['Where does gas exchange happen?', 'Alveoli', 'Trachea', 'Nose', 'Heart']],
    ],
    '12': [
      ['Sexual Reproduction in Flowering Plants', 'Parts of a flower, pollination, double fertilisation.', 'Double fertilisation = syngamy + triple fusion → endosperm (3n).', ['Ploidy of the endosperm?', '3n', '2n', 'n', '4n']],
      ['Human Reproduction', 'Male and female reproductive systems, gametogenesis, pregnancy.', 'Fertilisation happens in the ampulla of the fallopian tube; implantation in the uterus.', ['Where does fertilisation happen?', 'Ampulla', 'Uterus', 'Ovary', 'Cervix']],
      ['Principles of Inheritance and Variation', 'Mendel’s laws, incomplete dominance, sex determination.', 'Laws of dominance, segregation and independent assortment. Haemophilia is X-linked.', ['Haemophilia is a(n) ___ disorder.', 'X-linked', 'Y-linked', 'Autosomal', 'Viral']],
      ['Molecular Basis of Inheritance', 'DNA structure, replication, transcription, translation.', 'Central dogma: DNA → RNA → protein. A=T (2 hydrogen bonds), G≡C (3 hydrogen bonds).', ['In DNA, A pairs with ___?', 'T', 'G', 'C', 'U']],
      ['Human Health and Disease', 'Diseases, immunity, AIDS, cancer, drug abuse.', 'Widal test - typhoid, ELISA - HIV/AIDS. Vaccination gives active immunity.', ['Test for typhoid?', 'Widal', 'ELISA', 'PCR', 'Mantoux']],
    ],
  },

  Accounts: {
    '9': [
      ['Accounting Basics (Foundation)', 'Accounting means recording, keeping and understanding money transactions.', 'Trick: Record → Classify → Summarise → Analyse.', ['The first step of accounting?', 'Recording', 'Analysis', 'Summary', 'Audit']],
      ['Business Transactions', 'An exchange of money or goods that affects a business.', 'Cash transaction (paid now) vs credit transaction (paid later).', ['Selling goods on credit is a ___?', 'Credit sale', 'Cash sale', 'Purchase', 'Drawing']],
      ['Assets and Liabilities', 'Assets are what we own (cash, machines). Liabilities are what we owe (loans).', 'Assets = Liabilities + Capital.', ['A bank loan is a(n) ___?', 'Liability', 'Asset', 'Income', 'Capital']],
      ['Cash Book Basics', 'Daily cash in and out recorded in one book. Left: receipts (Dr). Right: payments (Cr).', 'Opening balance + receipts - payments = closing balance.', ['Receipts are recorded on which side of a cash book?', 'Debit (left)', 'Credit (right)', 'Both', 'Neither']],
      ['Banking Basics', 'Savings account, current account, cheques, UPI, interest.', 'Simple Interest = P x R x T / 100.', ['Simple interest formula?', 'PRT/100', 'P + R + T', 'PR/T', '100/PRT']],
    ],
    '10': [
      ['Journal Basics (Foundation)', 'Every transaction is first written in the journal (date, particulars, Dr, Cr).', 'Golden rule for real accounts: debit what comes in, credit what goes out.', ['The book of original entry?', 'Journal', 'Ledger', 'Trial balance', 'Balance sheet']],
      ['Ledger Basics', 'Entries are posted from the journal to separate ledger accounts.', 'The ledger is the principal book of accounts.', ['The principal book of accounts?', 'Ledger', 'Journal', 'Cash book', 'Diary']],
      ['GST Basics', 'Goods and Services Tax from 1 July 2017. CGST + SGST within a state; IGST between states.', 'Main GST slabs after the 2025 reform: 5% and 18%, plus 40% for luxury/sin goods; some items 0%.', ['When was GST introduced?', '1 July 2017', '1 April 2010', '15 August 1947', '26 January 2020']],
      ['Profit and Loss Basics', 'Income - expenses = profit (or loss).', 'Gross profit = sales - cost of goods sold.', ['Sales 1000, cost 700. Gross profit?', '300', '1700', '700', '1000']],
      ['Personal Budget', 'A plan for income and spending. The 50-30-20 rule.', '50% needs, 30% wants, 20% savings.', ['In the 50-30-20 rule, savings are ___?', '20%', '50%', '30%', '0%']],
    ],
    '11': [
      ['Introduction to Accounting', 'Accounting is the language of business. Users: owners, banks, government.', 'Accounting cycle: transaction → journal → ledger → trial balance → final accounts.', ['Accounting is called the language of ___?', 'Business', 'Science', 'Art', 'Sports']],
      ['Theory Base of Accounting', 'GAAP and concepts: business entity, going concern, matching, prudence.', 'Business entity: the owner and the business are separate.', ['Owner and business are separate - which concept?', 'Business entity', 'Going concern', 'Matching', 'Money measurement']],
      ['Journal Entries', 'Double entry: every debit has an equal credit.', 'Modern rule: increase in assets/expenses → debit; increase in liabilities/capital/income → credit.', ['An increase in expenses is ___?', 'Debited', 'Credited', 'Ignored', 'Both']],
      ['Ledger and Trial Balance', 'Posting to the ledger and balancing accounts. Trial balance: total debits = total credits.', 'A trial balance checks arithmetical accuracy.', ['A trial balance checks ___?', 'Arithmetical accuracy', 'Profit', 'Tax', 'Fraud']],
      ['Depreciation', 'The fall in the value of an asset over time.', 'SLM: (cost - scrap) / life. WDV: a fixed % on the reducing balance.', ['Straight-line depreciation = ?', '(Cost - Scrap) / Life', 'Cost x Life', 'Scrap / Cost', 'Cost + Scrap']],
    ],
    '12': [
      ['Partnership Fundamentals', 'Two or more people run a business together under a partnership deed.', 'Without a deed: profits shared equally, no interest on capital, 6% interest on partners’ loans.', ['Without a deed, profits are shared ___?', 'Equally', 'In capital ratio', '2:1', 'Not at all']],
      ['Goodwill', 'The value of a business’s reputation.', 'Average profit method: goodwill = average profit x number of years’ purchase.', ['Goodwill is a(n) ___ asset.', 'Intangible', 'Tangible', 'Current', 'Fictitious']],
      ['Admission of a Partner', 'A new partner joins: new ratio, sacrificing ratio.', 'Sacrificing ratio = old ratio - new ratio.', ['Sacrificing ratio = ?', 'Old ratio - new ratio', 'New - old', 'Old + new', 'Old x new']],
      ['Accounting for Share Capital', 'Companies issue shares at par or at a premium; forfeiture of shares.', 'Securities premium = issue price - face value.', ['Premium on shares goes to which account?', 'Securities Premium', 'Capital', 'Revenue', 'Cash']],
      ['Cash Flow Statement', 'Cash inflows and outflows from operating, investing and financing activities (AS-3).', 'Trick: OIF - Operating, Investing, Financing.', ['Buying machinery is a(n) ___ activity.', 'Investing', 'Operating', 'Financing', 'None']],
    ],
  },

  'Business Studies': {
    '9': [
      ['Introduction to Business', 'Business is selling goods or services for profit.', 'Business = industry + commerce (trade + aids to trade).', ['The main aim of business?', 'Profit', 'Charity', 'Sport', 'Travel']],
      ['Types of Business', 'Sole proprietorship, partnership, company, cooperative.', 'Trick: SPCC. A sole proprietorship has one owner.', ['A business with one owner?', 'Sole proprietorship', 'Company', 'Partnership', 'Cooperative']],
      ['Shops and Markets', 'Wholesale (in bulk) vs retail (small amounts to customers).', 'Chain: producer → wholesaler → retailer → consumer.', ['Who sells directly to customers?', 'Retailer', 'Wholesaler', 'Producer', 'Bank']],
      ['Entrepreneurship Basics', 'An entrepreneur starts a new business, taking a risk with an idea.', 'Idea → plan → money → start → grow.', ['What does an entrepreneur take?', 'Risk', 'Only salary', 'Holidays', 'Nothing']],
      ['Digital Payments', 'UPI, debit cards, net banking, QR codes.', 'Never share your UPI PIN. You do not need a PIN to receive money!', ['Do you need a UPI PIN to receive money?', 'No', 'Yes', 'Only an OTP', 'Only Aadhaar']],
    ],
    '10': [
      ['Small Business', 'Little money, few people, local area - a grocery shop, tailor, dairy.', 'MSME = Micro, Small and Medium Enterprises.', ['In MSME, the first M stands for ___?', 'Micro', 'Mega', 'Mini', 'Mall']],
      ['Marketing Basics', 'Understanding what customers need and selling to them.', '4 Ps: Product, Price, Place, Promotion.', ['Which is NOT one of the 4 Ps?', 'People', 'Product', 'Price', 'Place']],
      ['Banking and Loans', 'Banks take deposits and give loans; Mudra loans for small businesses.', 'PM Mudra: Shishu, Kishore and Tarun categories.', ['Mudra loans are for ___?', 'Small businesses', 'Houses', 'Cars', 'Weddings']],
      ['Consumer Rights', 'Six consumer rights: safety, information, choice, to be heard, redressal, education.', 'National Consumer Helpline 1915. Consumer Protection Act 2019.', ['National Consumer Helpline number?', '1915', '100', '112', '1930']],
      ['Startup India', 'Government support for new, innovative businesses - tax benefits and funding.', 'Startup India was launched in 2016.', ['When was Startup India launched?', '2016', '2000', '1991', '2020']],
    ],
    '11': [
      ['Nature and Purpose of Business', 'Economic activities: business, profession, employment.', 'Business risk: uncertainty in earning profit.', ['A doctor’s work is a ___?', 'Profession', 'Business', 'Employment', 'Hobby']],
      ['Forms of Business Organisation', 'Sole proprietorship, partnership, HUF, cooperative, company.', 'A partnership can have at most 50 partners (Companies Rules). A company is a separate legal entity.', ['Which is a separate legal entity?', 'Company', 'Sole proprietorship', 'Partnership', 'HUF']],
      ['Private, Public and Global Enterprises', 'Public sector: government-owned (SBI, Indian Railways). Private: owned by people. MNC: works in many countries.', 'A government company: the government holds more than 51% of shares.', ['Government share in a government company?', 'More than 51%', '10%', '25%', '0%']],
      ['Business Services', 'Banking, insurance, transport, warehousing, communication.', 'Principle of insurance: utmost good faith.', ['Storing goods is which service?', 'Warehousing', 'Banking', 'Insurance', 'Transport']],
      ['Small Business and MSMEs', 'MSMEs play a big role in the economy and in jobs.', 'Udyam registration is online and free.', ['MSME registration portal?', 'Udyam', 'IRCTC', 'DigiLocker', 'UMANG only']],
    ],
    '12': [
      ['Nature and Significance of Management', 'Management is getting work done effectively and efficiently.', 'Functions: Planning, Organising, Staffing, Directing, Controlling (POSDC).', ['The first function of management?', 'Planning', 'Controlling', 'Staffing', 'Directing']],
      ['Principles of Management', 'Fayol’s 14 principles; Taylor’s scientific management.', 'Fayol = father of general management. Taylor = father of scientific management.', ['How many principles did Fayol give?', '14', '10', '5', '20']],
      ['Planning', 'Deciding in advance what to do, how and when.', 'Types of plans: objective, strategy, policy, procedure, rule, budget.', ['Planning means ___?', 'Thinking in advance', 'Thinking later', 'Nothing', 'Only budgeting']],
      ['Marketing Management', 'Marketing mix, branding, packaging, pricing.', '4 Ps: Product, Price, Place, Promotion.', ['Advertising belongs to which P?', 'Promotion', 'Product', 'Place', 'Price']],
      ['Consumer Protection', 'Consumer Protection Act 2019 and the three-tier commissions.', 'District (up to Rs 50 lakh), State (Rs 50 lakh - 2 crore), National (above Rs 2 crore) [Dec 2021 limits].', ['The current Consumer Protection Act is from ___?', '2019', '1986', '2000', '2010']],
    ],
  },

  Economics: {
    '9': [
      ['The Story of Village Palampur', 'Four factors of production: land, labour, capital, entrepreneurship.', 'Multiple cropping = growing more than one crop a year on the same land.', ['How many factors of production?', '4', '2', '3', '6']],
      ['People as Resource', 'Educated and healthy people are human capital.', 'Education + health = higher productivity.', ['Human capital grows through ___?', 'Education', 'Hunger', 'Illness', 'War']],
      ['Poverty as a Challenge', 'Poverty means basic needs are not met. Poverty line.', 'Schemes: MGNREGA (100 days of work), PMAY (housing).', ['MGNREGA guarantees how many days of work?', '100', '50', '365', '30']],
      ['Food Security in India', 'Enough food for everyone at all times. Public Distribution System (ration).', 'Buffer stock is kept by FCI. National Food Security Act 2013.', ['Who keeps the buffer stock?', 'FCI', 'RBI', 'SBI', 'ISRO']],
      ['Money Basics', 'Money is a medium of exchange. The problem with barter: double coincidence of wants.', 'RBI issues currency notes (except the Re 1 note).', ['Who issues currency notes in India?', 'RBI', 'SBI', 'The Prime Minister', 'FCI']],
    ],
    '10': [
      ['Development', 'Development means income, health and education. Human Development Index (HDI).', 'Per capita income = total income / population.', ['Who publishes the HDI?', 'UNDP', 'RBI', 'WTO', 'FCI']],
      ['Sectors of the Indian Economy', 'Primary (farming), secondary (factories), tertiary (services).', 'Trick: P-S-T = Plants, Stuff, Services. The tertiary sector is the largest share of GDP.', ['Banking belongs to which sector?', 'Tertiary', 'Primary', 'Secondary', 'None']],
      ['Money and Credit', 'Formal credit (banks) vs informal credit (moneylenders). Self Help Groups.', 'Collateral = an asset pledged against a loan.', ['A Self Help Group usually has ___ members.', '15-20', '1000', '2', '500']],
      ['Globalisation', 'Connecting a country’s economy with the world. MNCs.', '1991 reforms: LPG - Liberalisation, Privatisation, Globalisation.', ['When were the LPG reforms?', '1991', '1947', '2014', '1971']],
      ['Consumer Rights', 'Consumer awareness; ISI, Agmark and Hallmark.', 'Hallmark = gold, Agmark = farm products, ISI = industrial goods.', ['Which mark is used on gold?', 'Hallmark', 'Agmark', 'ISI', 'FSSAI']],
    ],
    '11': [
      ['Introduction to Economics and Statistics', 'Scarcity and choice. Statistics is the study of data.', 'Economics studies consumption, production and distribution.', ['The root of economics is ___?', 'Scarcity', 'Plenty', 'Sports', 'Weather']],
      ['Collection and Organisation of Data', 'Primary data (collected yourself) vs secondary data (already available). Census vs sample.', 'Census = the whole population; sample = a part of it.', ['Data you collect yourself is ___?', 'Primary', 'Secondary', 'Tertiary', 'Fake']],
      ['Measures of Central Tendency', 'Mean, median, mode.', 'Mode = 3 Median - 2 Mean (empirical relation).', ['The value that occurs most often?', 'Mode', 'Mean', 'Median', 'Range']],
      ['Indian Economy 1950-1990', 'Five Year Plans, the Green Revolution, the licence raj.', 'The first Five Year Plan began in 1951. The Green Revolution used HYV seeds.', ['When did the first Five Year Plan begin?', '1951', '1947', '1991', '1961']],
      ['Theory of Consumer Behaviour', 'Utility, demand, the law of demand.', 'Law of demand: price ↑ → demand ↓ (inverse relation).', ['If price rises, demand ___?', 'Falls', 'Rises', 'Stays the same', 'Becomes zero']],
    ],
    '12': [
      ['National Income Accounting', 'A country’s total income: GDP, GNP, NNP.', 'GDP = C + I + G + (X - M). NNP = GNP - depreciation.', ['In the GDP formula, G stands for ___?', 'Government spending', 'Gold', 'Growth', 'GST']],
      ['Money and Banking', 'RBI is the central bank. Repo rate, CRR, SLR.', 'Money multiplier = 1/CRR (simple model).', ['If CRR is 10%, the money multiplier is ___?', '10', '1', '100', '0.1']],
      ['Government Budget', 'The government’s annual statement of income and spending.', 'Fiscal deficit = total expenditure - total receipts (excluding borrowings).', ['Who presents the Union Budget?', 'The Finance Minister', 'The Prime Minister', 'RBI', 'The President']],
      ['Balance of Payments', 'A country’s transactions with the world: current account and capital account.', 'Current account = trade + services + transfers.', ['Exports and imports are in which account?', 'Current', 'Capital', 'Savings', 'None']],
      ['Market Equilibrium', 'Price is set where demand equals supply.', 'Excess demand → price ↑; excess supply → price ↓.', ['Equilibrium occurs when ___?', 'Demand = Supply', 'Demand > Supply', 'Supply = 0', 'Price = 0']],
    ],
  },

  History: {
    '9': [
      ['The French Revolution', '1789, the storming of the Bastille. Liberty, Equality, Fraternity.', 'Remember: 14 July 1789 - Bastille Day. Rousseau wrote "The Social Contract".', ['When did the French Revolution begin?', '1789', '1857', '1917', '1947']],
      ['Socialism in Europe and the Russian Revolution', 'The 1917 Russian Revolution, Lenin, the Bolsheviks.', 'February and October Revolutions of 1917. Slogan: "Peace, Land, Bread".', ['Leader of the Russian Revolution?', 'Lenin', 'Hitler', 'Napoleon', 'Gandhi']],
      ['Nazism and the Rise of Hitler', 'Hitler in Germany, the Second World War (1939-45), the Holocaust.', 'Weimar Republic → Hitler became Chancellor in 1933.', ['When did Hitler become Chancellor?', '1933', '1919', '1945', '1939']],
      ['Forest Society and Colonialism', 'The British cut forests for railways and farming. Tribal movements.', 'Indian Forest Service 1864, Forest Act 1865.', ['When was the first Forest Act passed?', '1865', '1947', '1789', '1919']],
      ['Pastoralists in the Modern World', 'Herders (Gujjars, Raikas, Maasai) and how colonial rules changed their lives.', 'Gujjar Bakarwals - J&K, Raikas - Rajasthan, Maasai - Africa.', ['Where do the Maasai live?', 'Africa', 'Rajasthan', 'J&K', 'Russia']],
    ],
    '10': [
      ['The Rise of Nationalism in Europe', 'The growth of national feeling: unification of Italy and Germany.', 'Germany - Bismarck (1871); Italy - Garibaldi, Mazzini, Cavour.', ['Who unified Germany?', 'Bismarck', 'Garibaldi', 'Hitler', 'Napoleon']],
      ['Nationalism in India', 'Gandhi ji’s movements: Non-Cooperation, Civil Disobedience.', 'Champaran 1917, Non-Cooperation 1920, Dandi March 1930, Quit India 1942.', ['When was the Dandi March?', '1930', '1920', '1942', '1919']],
      ['The Making of a Global World', 'The Silk Route, trade, colonialism, the Great Depression of 1929.', 'Bretton Woods (1944) → IMF and World Bank.', ['When did the Great Depression begin?', '1929', '1947', '1857', '1991']],
      ['The Age of Industrialisation', 'Factories, machines and Britain’s Industrial Revolution.', 'Spinning Jenny (Hargreaves, 1764); steam engine improved by James Watt.', ['Who improved the steam engine?', 'James Watt', 'Newton', 'Edison', 'Ford']],
      ['Print Culture and the Modern World', 'The printing press - Gutenberg (1430s). Books spread new ideas.', 'The Gutenberg Bible was the first major printed book in Europe.', ['Who developed the printing press?', 'Gutenberg', 'Watt', 'Columbus', 'Galileo']],
    ],
    '11': [
      ['Writing and City Life', 'Mesopotamia - the first cities and cuneiform writing.', 'Mesopotamia lies between the Tigris and Euphrates rivers.', ['Where was cuneiform writing used?', 'Mesopotamia', 'India', 'China', 'Egypt']],
      ['An Empire Across Three Continents', 'The Roman Empire - Europe, Asia and Africa.', 'Augustus was the first Roman emperor (27 BCE).', ['The first Roman emperor?', 'Augustus', 'Julius Caesar', 'Nero', 'Constantine']],
      ['Nomadic Empires', 'The Mongol Empire of Genghis Khan.', 'Genghis Khan became the Great Khan in 1206.', ['The famous Mongol emperor?', 'Genghis Khan', 'Akbar', 'Babur', 'Ashoka']],
      ['The Three Orders', 'Medieval Europe: clergy, nobility, peasants. Feudalism.', 'Feudalism = land in return for service.', ['Feudalism developed in ___?', 'Europe', 'India', 'Africa', 'America']],
      ['Changing Cultural Traditions', 'The Renaissance in Italy - art, science, humanism.', 'Leonardo da Vinci (Mona Lisa), Michelangelo.', ['Who painted the Mona Lisa?', 'Leonardo da Vinci', 'Picasso', 'Raja Ravi Varma', 'Van Gogh']],
    ],
    '12': [
      ['Bricks, Beads and Bones (The Harappan Civilisation)', 'The Indus Valley Civilisation - planned cities and drainage.', 'Harappa (Daya Ram Sahni, 1921), Mohenjodaro (R. D. Banerji, 1922). The Great Bath is at Mohenjodaro.', ['Where is the Great Bath?', 'Mohenjodaro', 'Harappa', 'Lothal', 'Kalibangan']],
      ['Kings, Farmers and Towns', 'Mahajanapadas, the Mauryas, Ashoka’s inscriptions.', '16 Mahajanapadas. James Prinsep deciphered Ashoka’s script in 1838.', ['Who deciphered Ashoka’s script?', 'James Prinsep', 'Cunningham', 'Marshall', 'Wheeler']],
      ['Kings and Chronicles (The Mughal Courts)', 'The Mughal court, Akbarnama, Ain-i-Akbari.', 'Akbarnama was written by Abul Fazl.', ['Who wrote the Akbarnama?', 'Abul Fazl', 'Babur', 'Badauni', 'Birbal']],
      ['Colonialism and the Countryside', 'The Permanent Settlement (1793), the Santhal revolt, the Deccan riots.', 'Permanent Settlement - Lord Cornwallis, 1793.', ['When was the Permanent Settlement introduced?', '1793', '1857', '1905', '1757']],
      ['Mahatma Gandhi and the Nationalist Movement', 'Gandhi ji’s non-violence, satyagraha, Quit India.', 'Gandhi ji returned from South Africa in 1915. Quit India (1942): "Do or Die".', ['"Do or Die" was the call of ___?', 'Quit India 1942', 'Dandi March 1930', 'Champaran', 'Kheda']],
    ],
  },

  Geography: {
    '9': [
      ['India - Size and Location', 'India lies in the northern hemisphere. Area 3.28 million km², 7th largest country.', 'The Tropic of Cancer (23.5°N) passes through the middle of India. IST is based on 82.5°E (Mirzapur).', ['India’s standard meridian?', '82.5°E', '0°', '90°E', '23.5°N']],
      ['Physical Features of India', 'Himalayas, Northern Plains, Peninsular Plateau, desert, coastal plains, islands.', 'Three Himalayan ranges: Himadri, Himachal, Shivalik.', ['The outermost Himalayan range?', 'Shivalik', 'Himadri', 'Himachal', 'Aravalli']],
      ['Drainage', 'Himalayan rivers (perennial) vs peninsular rivers (seasonal).', 'The Ganga rises at Gangotri. The Narmada and Tapi flow west.', ['Which river flows west?', 'Narmada', 'Ganga', 'Godavari', 'Krishna']],
      ['Climate', 'India has a monsoon climate with four seasons.', 'Mawsynram gets the most rain. Loo = hot summer winds.', ['Place with the highest rainfall?', 'Mawsynram', 'Delhi', 'Jaisalmer', 'Noida']],
      ['Natural Vegetation and Wildlife', 'Tropical evergreen, deciduous, thorny, mangrove and montane forests.', 'The Sundarbans - mangroves, Royal Bengal Tiger.', ['The Sundarbans have which forests?', 'Mangrove', 'Evergreen', 'Thorny', 'Desert']],
    ],
    '10': [
      ['Resources and Development', 'Wise use of resources; soil types.', 'Alluvial soil is the most widespread (Ganga plains, UP!). Black soil is best for cotton.', ['Which soil is most common in UP?', 'Alluvial', 'Black', 'Red', 'Desert']],
      ['Water Resources', 'Water scarcity, dams, rainwater harvesting.', 'Nehru called dams the "temples of modern India". Bhakra Nangal is on the Sutlej.', ['Who called dams "temples of modern India"?', 'Nehru', 'Gandhi', 'Patel', 'Ambedkar']],
      ['Agriculture', 'Kharif, rabi and zaid seasons; crops and regions.', 'UP is first in wheat and sugarcane production. West Bengal leads in rice.', ['Largest sugarcane producer?', 'Uttar Pradesh', 'Kerala', 'Punjab', 'Assam']],
      ['Minerals and Energy Resources', 'Iron, coal, mica; conventional vs non-conventional energy.', 'Coal types: anthracite (best), bituminous, lignite, peat.', ['The best quality coal?', 'Anthracite', 'Peat', 'Lignite', 'Bituminous']],
      ['Manufacturing Industries', 'Cotton, iron and steel, IT industries; pollution control.', 'Noida and Greater Noida are a hub for electronics and mobile phone manufacturing.', ['Mobile manufacturing hub in UP?', 'Noida', 'Varanasi', 'Agra', 'Mathura']],
    ],
    '11': [
      ['Geography as a Discipline', 'Physical and human geography; the study of space.', 'The word "geography" (earth description) was first used by Eratosthenes.', ['Who first used the word "geography"?', 'Eratosthenes', 'Plato', 'Newton', 'Darwin']],
      ['The Interior of the Earth', 'Crust, mantle, core. Earthquake waves.', 'P-waves travel through all media; S-waves only through solids. Trick: "S = Solid only".', ['S-waves cannot travel through ___?', 'Liquids', 'Solids', 'Rocks', 'The crust']],
      ['Landforms and their Evolution', 'Landforms made by rivers, wind, glaciers and waves.', 'Rivers: V-shaped valleys, meanders, deltas. Glaciers: U-shaped valleys.', ['Glaciers make ___ valleys.', 'U-shaped', 'V-shaped', 'Delta', 'Dune']],
      ['Composition and Structure of the Atmosphere', 'Nitrogen 78%, oxygen 21%. Layers: troposphere, stratosphere...', 'Ozone is in the stratosphere; weather happens in the troposphere.', ['Percentage of nitrogen in air?', '78%', '21%', '1%', '50%']],
      ['India - Physiography', 'India’s physiographic divisions in detail.', 'The Western Ghats (Sahyadri) are continuous; the Eastern Ghats are broken.', ['Another name for the Western Ghats?', 'Sahyadri', 'Aravalli', 'Vindhya', 'Satpura']],
    ],
    '12': [
      ['Human Geography', 'The relationship between people and nature: determinism, possibilism.', 'Possibilism - Vidal de la Blache. Neo-determinism ("stop and go") - Griffith Taylor.', ['Who gave "stop and go" determinism?', 'Griffith Taylor', 'Ratzel', 'Vidal de la Blache', 'Hartshorne']],
      ['Population', 'Distribution, density, growth, migration.', 'Growth = births - deaths + net migration. Demographic transition has three stages.', ['Which adds to population growth?', 'Births and in-migration', 'Deaths', 'Out-migration', 'Nothing']],
      ['Human Development', 'HDI: health, education, income.', 'The HDI was developed by Mahbub ul Haq and Amartya Sen.', ['Who developed the HDI concept?', 'Mahbub ul Haq', 'Nehru', 'Keynes', 'Adam Smith']],
      ['Transport and Communication', 'Road, rail, water, air, pipelines, the internet.', 'The Trans-Siberian Railway is the longest railway. India’s Golden Quadrilateral highway.', ['The longest railway line?', 'Trans-Siberian', 'Trans-Canadian', 'Konkan', 'Orient Express']],
      ['International Trade', 'Trade between countries; WTO; balance of trade.', 'The WTO was set up in 1995; headquarters in Geneva.', ['WTO headquarters?', 'Geneva', 'New York', 'Delhi', 'Paris']],
    ],
  },

  'Pol Science': {
    '9': [
      ['What is Democracy?', 'Government of the people, by the people, for the people (Abraham Lincoln).', 'Features: free and fair elections, one person one vote, rule of law.', ['Who gave this definition of democracy?', 'Abraham Lincoln', 'Hitler', 'Lenin', 'Akbar']],
      ['Constitutional Design', 'The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950.', 'Preamble: Sovereign, Socialist, Secular, Democratic, Republic.', ['When did the Constitution come into force?', '26 January 1950', '15 August 1947', '26 November 1949', '2 October 1950']],
      ['Electoral Politics', 'Elections, the Election Commission, constituencies, reserved seats.', 'Lok Sabha has 543 elected seats. Voting age 18. The Election Commission is independent.', ['Number of elected Lok Sabha seats?', '543', '250', '100', '28']],
      ['Working of Institutions', 'Legislature, executive, judiciary - the three organs.', 'The Prime Minister is the real executive; the President is the nominal head. The Supreme Court is the highest court.', ['The real executive in India?', 'The Prime Minister', 'The President', 'The Governor', 'A judge']],
      ['Democratic Rights', 'Six Fundamental Rights. Right to Constitutional Remedies (Article 32).', 'Dr Ambedkar called Article 32 the "heart and soul" of the Constitution.', ['Which article is the "heart and soul"?', '32', '14', '21', '370']],
    ],
    '10': [
      ['Power Sharing', 'Sharing power: Belgium (accommodation) vs Sri Lanka (majoritarianism).', 'Forms: horizontal (organs), vertical (levels), social groups, political parties.', ['What did Belgium choose?', 'Accommodation', 'Majoritarianism', 'Dictatorship', 'War']],
      ['Federalism', 'Union, state and local governments. Three lists.', 'Union List (defence), State List (police), Concurrent List (education).', ['Education is in which list?', 'Concurrent', 'Union', 'State', 'None']],
      ['Gender, Religion and Caste', 'Social differences and politics.', 'One-third of panchayat seats are reserved for women. The Nari Shakti Vandan Act 2023 provides 33% in Lok Sabha and assemblies.', ['Reservation for women in panchayats?', 'One-third', 'Half', 'One-fourth', 'None']],
      ['Political Parties', 'National and state parties; party systems.', 'India has a multi-party system. Parties are recognised by the Election Commission.', ['Who recognises political parties?', 'The Election Commission', 'The President', 'The Prime Minister', 'The courts']],
      ['Outcomes of Democracy', 'Accountable, responsive and legitimate government.', 'Democracy may be slow, but it is legitimate.', ['A key strength of democracy?', 'Legitimacy', 'Quick decisions', 'One-person rule', 'None']],
    ],
    '11': [
      ['Constitution: Why and How?', 'The Constituent Assembly took 2 years, 11 months and 18 days.', 'Dr B. R. Ambedkar chaired the Drafting Committee.', ['Chairman of the Drafting Committee?', 'Dr Ambedkar', 'Nehru', 'Rajendra Prasad', 'Patel']],
      ['Rights in the Indian Constitution', 'Six Fundamental Rights; Directive Principles of State Policy.', 'Right to Education - Article 21A (ages 6-14).', ['Article for the Right to Education?', '21A', '32', '14', '19']],
      ['Election and Representation', 'First-past-the-post (Lok Sabha) and proportional representation (Rajya Sabha, President).', 'FPTP: the candidate with the most votes wins.', ['Lok Sabha elections use ___?', 'FPTP', 'Proportional representation', 'A lottery', 'Nomination']],
      ['Executive', 'President, Prime Minister, Council of Ministers, bureaucracy.', 'The President’s term is 5 years; elected by an electoral college.', ['Term of the President?', '5 years', '6 years', '4 years', 'Lifetime']],
      ['Legislature', 'Parliament: Lok Sabha + Rajya Sabha. How a law is made.', 'A Money Bill can start only in the Lok Sabha. The Rajya Sabha is a permanent house.', ['Where can a Money Bill be introduced?', 'Lok Sabha', 'Rajya Sabha', 'The courts', 'President’s office']],
    ],
    '12': [
      ['The Cold War Era', 'USA vs USSR (1945-1991). NATO, Warsaw Pact. Non-Aligned Movement.', 'NAM founders: Nehru, Tito, Nasser, Sukarno, Nkrumah.', ['India’s founder of NAM?', 'Nehru', 'Gandhi', 'Indira Gandhi', 'Patel']],
      ['The End of Bipolarity', 'The USSR broke up in 1991. Gorbachev - glasnost, perestroika.', '15 countries were formed from the USSR.', ['When did the USSR break up?', '1991', '1945', '1989', '2001']],
      ['Challenges of Nation Building', 'Partition, integration of princely states, reorganisation of states.', 'Sardar Patel integrated 565 princely states. States Reorganisation Act 1956.', ['Who integrated the princely states?', 'Sardar Patel', 'Nehru', 'Gandhi', 'Ambedkar']],
      ['Era of One-Party Dominance', 'Congress dominance (1952-67). First general election 1951-52.', 'First Chief Election Commissioner: Sukumar Sen.', ['First general election?', '1951-52', '1947', '1950', '1962']],
      ['India’s External Relations', 'Panchsheel, wars, nuclear policy.', 'Panchsheel 1954 (Nehru-Zhou Enlai). Nuclear tests 1974 and 1998 (Pokhran).', ['When was Panchsheel signed?', '1954', '1947', '1962', '1971']],
    ],
  },

  Hindi: {
    '9': [
      ['दो बैलों की कथा', 'प्रेमचंद की कहानी - हीरा और मोती नाम के दो बैलों की मित्रता, स्वाभिमान और स्वतंत्रता की भावना का चित्रण।', 'याद रखें: प्रेमचंद को "उपन्यास सम्राट" कहा जाता है। दोनों बैल पराधीन भारत के प्रतीक हैं।', ['हीरा-मोती की कहानी किसने लिखी?', 'प्रेमचंद', 'कबीर', 'निराला', 'महादेवी वर्मा']],
      ['ल्हासा की ओर', 'राहुल सांकृत्यायन का यात्रा-वृत्तांत - तिब्बत यात्रा का अनुभव और वहाँ के समाज का चित्रण।', 'याद रखें: राहुल सांकृत्यायन को "यात्रा-साहित्य का पितामह" कहा जाता है।', ['"यात्रा-साहित्य के पितामह" कौन हैं?', 'राहुल सांकृत्यायन', 'प्रेमचंद', 'तुलसीदास', 'बच्चन']],
      ['साखियाँ एवं सबद (कबीर)', 'कबीर के दोहे - प्रेम, गुरु-महिमा और अहंकार के त्याग का संदेश।', 'कबीर की भाषा: सधुक्कड़ी (पंचमेल खिचड़ी)।', ['कबीर की भाषा को क्या कहते हैं?', 'सधुक्कड़ी', 'अवधी', 'ब्रज', 'खड़ी बोली']],
      ['व्याकरण - उपसर्ग और प्रत्यय', 'उपसर्ग शब्द के आगे लगता है (प्र + गति = प्रगति), प्रत्यय शब्द के पीछे लगता है (सुंदर + ता = सुंदरता)।', 'याद रखें: उपसर्ग = आगे, प्रत्यय = पीछे।', ['"प्रगति" में उपसर्ग कौन-सा है?', 'प्र', 'गति', 'ति', 'ग']],
      ['पत्र लेखन', 'औपचारिक और अनौपचारिक पत्र का प्रारूप।', 'औपचारिक पत्र: सेवा में, विषय, महोदय, भवदीय।', ['औपचारिक पत्र का समापन किस शब्द से होता है?', 'भवदीय', 'तुम्हारा मित्र', 'स्नेह सहित', 'अलविदा']],
    ],
    '10': [
      ['सूरदास के पद', 'गोपियाँ उद्धव पर व्यंग्य करती हैं - प्रेम बनाम ज्ञान का भाव।', 'भाषा: ब्रज। रस: शृंगार (वियोग)। सूरदास को "वात्सल्य रस का सम्राट" कहा जाता है।', ['सूरदास की काव्य-भाषा कौन-सी है?', 'ब्रज', 'अवधी', 'खड़ी बोली', 'उर्दू']],
      ['नेताजी का चश्मा', 'स्वयं प्रकाश की कहानी - कैप्टन चश्मेवाले की देशभक्ति का चित्रण।', 'संदेश: साधारण लोग भी सच्चे देशभक्त होते हैं।', ['कहानी में मूर्ति किसकी थी?', 'नेताजी सुभाषचंद्र बोस', 'गांधीजी', 'नेहरूजी', 'भगतसिंह']],
      ['बालगोबिन भगत', 'रामवृक्ष बेनीपुरी का रेखाचित्र - कबीरपंथी गृहस्थ संत का चरित्र।', 'भगत ने पुत्र की चिता को पतोहू से अग्नि दिलवाई - रूढ़ियों का विरोध।', ['बालगोबिन भगत किसके भक्त थे?', 'कबीर', 'राम', 'कृष्ण', 'शिव']],
      ['व्याकरण - वाच्य', 'कर्तृवाच्य, कर्मवाच्य और भाववाच्य।', 'कर्मवाच्य में प्रायः "द्वारा" शब्द आता है।', ['"द्वारा" शब्द प्रायः किस वाच्य में आता है?', 'कर्मवाच्य', 'कर्तृवाच्य', 'भाववाच्य', 'किसी में नहीं']],
      ['रचना - अनुच्छेद लेखन', 'संकेत-बिंदुओं के आधार पर 80-100 शब्दों में अनुच्छेद।', 'भूमिका - विस्तार - निष्कर्ष, तीनों एक ही अनुच्छेद में।', ['अनुच्छेद में कितने अनुच्छेद (पैराग्राफ़) होते हैं?', 'एक', 'तीन', 'पाँच', 'दस']],
    ],
    '11': [
      ['नमक का दारोगा', 'प्रेमचंद की कहानी - वंशीधर की ईमानदारी बनाम पंडित अलोपीदीन का धन।', 'संदेश: ईमानदारी की जीत होती है - धर्म ने धन को पैरों तले कुचल दिया।', ['ईमानदार दारोगा का नाम क्या था?', 'वंशीधर', 'अलोपीदीन', 'हीरा', 'हामिद']],
      ['कबीर के पद', '"हम तौ एक एक करि जांनां" - ईश्वर एक है।', 'कबीर निर्गुण भक्ति की ज्ञानाश्रयी शाखा के कवि हैं।', ['कबीर किस भक्ति-धारा के कवि हैं?', 'निर्गुण', 'सगुण', 'रामभक्ति', 'कृष्णभक्ति']],
      ['मीरा के पद', '"मेरे तो गिरधर गोपाल दूसरो न कोई" - श्रीकृष्ण के प्रति अनन्य प्रेम।', 'भाषा: राजस्थानी मिश्रित ब्रज। सगुण भक्ति।', ['मीराबाई किसकी भक्त थीं?', 'श्रीकृष्ण', 'श्रीराम', 'शिव', 'दुर्गा']],
      ['जनसंचार माध्यम', 'प्रिंट, रेडियो, टेलीविज़न और इंटरनेट।', 'हिंदी का पहला समाचार-पत्र: उदंत मार्तंड (1826)।', ['हिंदी का पहला समाचार-पत्र कौन-सा है?', 'उदंत मार्तंड', 'दैनिक जागरण', 'केसरी', 'नवभारत']],
      ['पत्रकारीय लेखन', 'समाचार लेखन के छह ककार: क्या, कौन, कब, कहाँ, क्यों, कैसे।', 'उलटा पिरामिड शैली - सबसे ज़रूरी बात सबसे पहले।', ['समाचार लेखन की प्रमुख शैली कौन-सी है?', 'उलटा पिरामिड', 'सीधा पिरामिड', 'कविता', 'कहानी']],
    ],
    '12': [
      ['आत्मपरिचय (हरिवंशराय बच्चन)', '"मैं जग-जीवन का भार लिए फिरता हूँ" - जीवन के विरोधाभासों का चित्रण।', 'बच्चन को हालावाद का प्रवर्तक माना जाता है (मधुशाला)।', ['"मधुशाला" के कवि कौन हैं?', 'हरिवंशराय बच्चन', 'निराला', 'सुमित्रानंदन पंत', 'जयशंकर प्रसाद']],
      ['भक्तिन', 'महादेवी वर्मा का संस्मरण - सेविका लछमिन (भक्तिन) का चरित्र।', 'महादेवी वर्मा को "आधुनिक मीरा" कहा जाता है।', ['"आधुनिक मीरा" किसे कहा जाता है?', 'महादेवी वर्मा', 'सुभद्रा कुमारी चौहान', 'मन्नू भंडारी', 'कृष्णा सोबती']],
      ['बाज़ार दर्शन', 'जैनेंद्र कुमार का निबंध - आवश्यकता के अनुसार ख़रीदो, दिखावे के लिए नहीं।', 'संदेश: "मन खाली हो तो बाज़ार मत जाओ।"', ['"बाज़ार दर्शन" के लेखक कौन हैं?', 'जैनेंद्र कुमार', 'प्रेमचंद', 'अज्ञेय', 'निर्मल वर्मा']],
      ['कवितावली (तुलसीदास)', 'कलियुग में ग़रीबी, भूख और बेरोज़गारी का वर्णन।', 'कवितावली की भाषा ब्रज है; रामचरितमानस की भाषा अवधी।', ['रामचरितमानस की भाषा कौन-सी है?', 'अवधी', 'ब्रज', 'खड़ी बोली', 'संस्कृत']],
      ['फ़ीचर लेखन', 'समाचार से लंबा, रोचक और विश्लेषणात्मक लेख।', 'फ़ीचर = "सॉफ़्ट न्यूज़" + कथात्मक शैली।', ['फ़ीचर किस प्रकार का लेखन है?', 'रोचक और विस्तृत', 'केवल आँकड़े', 'कविता', 'विज्ञापन']],
    ],
  },

  English: {
    '9': [
      ['The Fun They Had', 'Isaac Asimov - in 2157, Margie and Tommy learn from mechanical teachers at home.', 'Theme: the joy of a real school vs learning from a machine.', ['In which year is the story set?', '2157', '2026', '1950', '3000']],
      ['The Sound of Music', 'Evelyn Glennie (a deaf percussionist) and Ustad Bismillah Khan (shehnai).', 'Evelyn feels sound through her body. Bismillah Khan received the Bharat Ratna in 2001.', ['Bismillah Khan played the ___?', 'Shehnai', 'Tabla', 'Sitar', 'Flute']],
      ['Grammar - Tenses', '12 tenses: present, past, future x simple, continuous, perfect, perfect continuous.', 'Perfect = have/has/had + V3. Continuous = be + V-ing.', ['"She has eaten" is in the ___ tense.', 'Present perfect', 'Simple past', 'Simple present', 'Future']],
      ['Writing - Descriptive Paragraph', 'Describe a person, place or event using your senses.', 'Trick: use the 5 senses - see, hear, smell, taste, touch.', ['Descriptive writing uses ___?', 'The senses', 'Formulas', 'Graphs', 'Tables']],
      ['Poem - The Road Not Taken', 'Robert Frost - two roads, and how one choice shapes a life.', 'Theme: life decisions. "I took the one less travelled by."', ['Who wrote "The Road Not Taken"?', 'Robert Frost', 'William Wordsworth', 'Rabindranath Tagore', 'John Keats']],
    ],
    '10': [
      ['A Letter to God', 'G. L. Fuentes - Lencho’s faith in God, and the postmaster’s kindness.', 'Irony: Lencho called the post office employees "a bunch of crooks".', ['Lencho wrote his letter to ___?', 'God', 'The postmaster', 'His wife', 'A friend']],
      ['Nelson Mandela: Long Walk to Freedom', 'South Africa’s first black President (1994) and the end of apartheid.', 'Inauguration on 10 May 1994. "Courage is the triumph over fear."', ['When did Mandela become President?', '1994', '1947', '1990', '2000']],
      ['Grammar - Reported Speech', 'Changing direct speech to indirect: move the tense back, change pronouns.', 'is → was, will → would, can → could, today → that day.', ['"will" in indirect speech becomes ___?', 'would', 'shall', 'will', 'can']],
      ['Writing - Formal Letter', 'Letter to the editor, complaint letter, enquiry letter.', 'Format: sender’s address, date, receiver, subject, salutation, body, complimentary close.', ['A letter to the editor is ___?', 'Formal', 'Informal', 'Personal', 'A poem']],
      ['Poem - Dust of Snow', 'Robert Frost - a crow shakes snow onto the poet and his mood changes.', 'The crow and the hemlock tree are negative symbols, yet they bring a positive change.', ['Which bird shook the snow?', 'A crow', 'A sparrow', 'An eagle', 'A parrot']],
    ],
    '11': [
      ['The Portrait of a Lady', 'Khushwant Singh’s portrait of his grandmother.', 'In the village she fed dogs; in the city she fed sparrows.', ['Who wrote "The Portrait of a Lady"?', 'Khushwant Singh', 'R. K. Narayan', 'Ruskin Bond', 'Premchand']],
      ['We’re Not Afraid to Die...', 'Gordon Cook - a family’s sea voyage and survival in a storm.', 'Ship: Wavewalker. Island: Ile Amsterdam.', ['Name of the ship?', 'Wavewalker', 'Titanic', 'Endeavour', 'Victoria']],
      ['Discovering Tut', 'A CT scan of Tutankhamun’s mummy (2005).', 'Howard Carter discovered the tomb in 1922.', ['Who discovered Tutankhamun’s tomb?', 'Howard Carter', 'Columbus', 'Darwin', 'Newton']],
      ['Writing - Notice and Poster', 'A notice is about 50 words in a box. A poster is visual with a slogan.', 'Notice: institution name, NOTICE, date, heading, body, signature.', ['Word limit for a notice?', '50', '150', '500', '20']],
      ['Poem - A Photograph', 'Shirley Toulson - an old photograph of the poet’s mother and the memories it brings.', 'Themes: time, memory, loss.', ['The poem is about a ___?', 'Photograph', 'River', 'Bird', 'School']],
    ],
    '12': [
      ['The Last Lesson', 'Alphonse Daudet - M. Hamel’s last French lesson in Alsace.', '"Vive La France!" - language is the key to freedom.', ['The teacher’s name?', 'M. Hamel', 'Franz', 'Wachter', 'Sophie']],
      ['Lost Spring', 'Anees Jung - Saheb (a ragpicker) and Mukesh (a bangle maker in Firozabad).', 'Theme: child labour and poverty.', ['Where are the bangles made?', 'Firozabad', 'Noida', 'Agra', 'Delhi']],
      ['Deep Water', 'William Douglas - his fear of water and how he overcame it.', 'Lesson: "All we have to fear is fear itself" (Roosevelt).', ['Douglas was afraid of ___?', 'Water', 'Fire', 'Darkness', 'Heights']],
      ['Writing - Report and Article', 'Report: a factual account of an event. Article: views, with a heading and byline.', 'Reports use the past tense and often the passive voice.', ['Tense used in a report?', 'Past', 'Future', 'Present', 'Any']],
      ['Poem - My Mother at Sixty-Six', 'Kamala Das - her mother’s old age and the fear of losing her.', 'Simile: her mother’s face is "like a late winter’s moon".', ['Who wrote the poem?', 'Kamala Das', 'John Keats', 'Robert Frost', 'Pablo Neruda']],
    ],
  },

  Computer: {
    '9': [
      ['Computer System Basics', 'Input → process (CPU) → output, plus memory.', 'CPU = ALU + Control Unit + registers.', ['What does the ALU do?', 'Calculations', 'Printing', 'Storage', 'Input']],
      ['Operating System', 'Works between the hardware and the user. Windows, Linux, Android.', 'OS functions: process, memory, file and device management.', ['Which is an open-source OS?', 'Linux', 'Windows', 'MS Word', 'Chrome']],
      ['Office Tools', 'Word processor, spreadsheet, presentation software.', 'Shortcuts: Ctrl+C copy, Ctrl+V paste, Ctrl+Z undo.', ['Shortcut to undo?', 'Ctrl + Z', 'Ctrl + Y', 'Ctrl + C', 'Ctrl + A']],
      ['Internet and Email', 'The World Wide Web, browsers, search engines, email etiquette.', 'Parts of a URL: protocol (https), domain, path.', ['Which protocol is secure?', 'HTTPS', 'HTTP', 'FTP', 'SMTP']],
      ['Cyber Safety', 'Phishing, malware, strong passwords, two-factor authentication.', 'A strong password has 12+ characters mixing A-z, 0-9 and symbols.', ['Stealing data through fake links is called ___?', 'Phishing', 'Fishing', 'Coding', 'Browsing']],
    ],
    '10': [
      ['Networking', 'LAN, MAN, WAN. Topologies: bus, star, ring.', 'Star topology has a central hub. An IP address is a computer’s address.', ['Topology with a central hub?', 'Star', 'Bus', 'Ring', 'Mesh']],
      ['HTML Basics', 'The structure of a web page. Tags: <html>, <head>, <body>.', '<a href=""> link, <img src=""> image, <table> table.', ['Tag for a link?', '<a>', '<img>', '<p>', '<li>']],
      ['Introduction to CSS', 'CSS makes web pages look good - colours, fonts, layout.', 'selector { property: value; }', ['What is CSS used for?', 'Styling', 'Databases', 'Servers', 'Logic']],
      ['Introduction to Python', 'An easy programming language. print(), input(), variables.', 'print("Namaste") prints Namaste. # starts a comment.', ['A comment in Python starts with ___?', '#', '//', '<!--', '%']],
      ['Cyber Ethics', 'Honesty online: no plagiarism, respect copyright.', 'India’s cyber law: the IT Act 2000.', ['India’s cyber law?', 'IT Act 2000', 'IPC 1860', 'RTI 2005', 'GST 2017']],
    ],
    '11': [
      ['Computer System and Number System', 'Binary, octal, decimal, hexadecimal.', '(10)₁₀ = (1010)₂ = (12)₈ = (A)₁₆.', ['(1010)₂ = ?', '10', '12', '8', '5']],
      ['Python Basics', 'Data types: int, float, str, bool. Operators.', '// floor division, % remainder, ** power. 7 // 2 = 3.', ['7 // 2 = ?', '3', '3.5', '1', '4']],
      ['Flow of Control', 'if-elif-else, for and while loops.', 'range(5) → 0, 1, 2, 3, 4. Indentation matters!', ['Numbers in range(3)?', '0, 1, 2', '1, 2, 3', '0, 1, 2, 3', '3']],
      ['Lists and Strings', 'Lists [ ] are mutable; strings are immutable. Indexing starts at 0.', 's[::-1] reverses a string. len(), append(), split().', ['List indexing starts at ___?', '0', '1', '-1', '10']],
      ['Society, Law and Ethics', 'Digital footprint, intellectual property, cyber crime, e-waste.', 'A digital footprint is the permanent trail you leave online!', ['The trail you leave online is your ___?', 'Digital footprint', 'Password', 'Cookie jar', 'Hardware']],
    ],
    '12': [
      ['Python Functions', 'Define a function with def. Parameters, return values, scope.', 'def add(a, b): return a + b. Local vs global variables.', ['Keyword to define a function?', 'def', 'func', 'function', 'fn']],
      ['File Handling', 'Text, binary and CSV files. open(), read(), write().', 'Modes: "r" read, "w" write (overwrites), "a" append.', ['Mode to append?', '"a"', '"w"', '"r"', '"x"']],
      ['Data Structure - Stack', 'LIFO - Last In, First Out. Push and pop.', 'A pile of plates is a stack! In Python: list.append() / list.pop().', ['A stack follows ___?', 'LIFO', 'FIFO', 'Random order', 'Sorted order']],
      ['Computer Networks', 'Network devices: router, switch, modem. Protocols.', 'HTTP, FTP, SMTP (email), TCP/IP. A router connects networks.', ['Protocol for sending email?', 'SMTP', 'FTP', 'HTTP', 'PPP']],
      ['Database and SQL', 'DBMS, tables, keys and SQL queries.', 'SELECT * FROM students WHERE marks > 80; A primary key is unique and not null.', ['Query to read data?', 'SELECT', 'INSERT', 'DELETE', 'DROP']],
    ],
  },
};
