# -*- coding: utf-8 -*-
"""
Authentic, mathematically verified GATE questions bank for Civil Engineering (CE).
"""

CIVIL_QUESTIONS = {
    "structures": [
        {
            "topic": "Determinate & Indeterminate Trusses",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "For a planar pin-jointed plane truss having $m$ members and $j$ joints, the degree of static indeterminacy $D_s$ is given by:",
            "options": ["$D_s = m + r - 2j$", "$D_s = m + r - 3j$", "$D_s = 3m + r - 3j$", "$D_s = 2m + r - j$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "For a 2D pin-jointed truss, each joint has 2 equilibrium equations ($\\sum F_x = 0, \\sum F_y = 0$). With $r$ support reactions, total unknowns are $m + r$ and equations are $2j$. Hence $D_s = m + r - 2j$."
        },
        {
            "topic": "Slope Deflection & Moment Distribution Methods",
            "type": "MCQ",
            "marks": 2,
            "neg_marks": 0.67,
            "question": "For a prismatic beam of length $L$ and flexural rigidity $EI$, if the far end is fixed, the rotational stiffness at the near end subjected to a moment $M$ is:",
            "options": ["$\\frac{4 EI}{L}$", "$\\frac{3 EI}{L}$", "$\\frac{2 EI}{L}$", "$\\frac{6 EI}{L}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "When the far end is fixed, the moment required to produce unit rotation $\\theta = 1$ at the near end is $k = \\frac{4EI}{L}$, with a carry-over factor of $+1/2$."
        },
        {
            "topic": "Influence Line Diagrams",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A simply supported beam has a span of $10\\text{ m}$. A concentrated load of $50\\text{ kN}$ rolls across the beam from left to right. The maximum bending moment (in $\\text{kN}\\cdot\\text{m}$) at a section $4\\text{ m}$ from the left support is ________.",
            "options": [],
            "answer": ["120.0"],
            "tolerance": {"min": 119.0, "max": 121.0},
            "explanation": "The maximum ordinate of the influence line diagram for bending moment at distance $x = 4\\text{ m}$ in a beam of span $L = 10\\text{ m}$ is $\\frac{x (L - x)}{L} = \\frac{4 \\times 6}{10} = 2.4\\text{ m}$. Maximum moment $M_{\\text{max}} = 50\\text{ kN} \\times 2.4\\text{ m} = 120\\text{ kN}\\cdot\\text{m}$."
        }
    ],
    "concrete-steel": [
        {
            "topic": "Limit State Design of Beams & Slabs",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "According to IS 456:2000, the maximum compressive strain in concrete at the outermost compression fiber in bending under limit state of collapse is taken as:",
            "options": ["$0.0035$", "$0.0020$", "$0.0030$", "$0.0045$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Clause 38.1 of IS 456:2000 specifies the maximum strain in concrete at the outermost compression fiber in flexure as $0.0035$."
        },
        {
            "topic": "Limit State Design of Beams & Slabs",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A singly reinforced rectangular beam has width $b = 250\\text{ mm}$ and effective depth $d = 400\\text{ mm}$. Concrete grade is M20 ($f_{ck} = 20\\text{ MPa}$) and steel is Fe415 ($f_y = 415\\text{ MPa}$). The limiting moment of resistance $M_{u,\\text{lim}}$ (in $\\text{kN}\\cdot\\text{m}$) is ________ (round off to one decimal place).",
            "options": [],
            "answer": ["110.4"],
            "tolerance": {"min": 109.0, "max": 112.0},
            "explanation": "For Fe415 steel, $M_{u,\\text{lim}} = 0.138 f_{ck} b d^2 = 0.138 \\times 20 \\times 250 \\times (400)^2 = 0.138 \\times 20 \\times 250 \\times 160000 = 1.104 \\times 10^8\\text{ N}\\cdot\\text{mm} = 110.4\\text{ kN}\\cdot\\text{m}$."
        },
        {
            "topic": "Steel Tension, Compression Members & Plastic Analysis",
            "type": "MCQ",
            "marks": 2,
            "neg_marks": 0.67,
            "question": "The plastic section modulus $Z_p$ for a rectangular cross-section of width $b$ and depth $d$ is:",
            "options": ["$\\frac{b d^2}{4}$", "$\\frac{b d^2}{6}$", "$\\frac{b d^2}{8}$", "$\\frac{b d^3}{12}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Plastic section modulus $Z_p = \\frac{A}{2} (y_1 + y_2) = \\frac{b d}{2} \\left(\\frac{d}{4} + \\frac{d}{4}\\right) = \\frac{b d^2}{4}$. The shape factor is $S = \\frac{Z_p}{Z_e} = \\frac{bd^2/4}{bd^2/6} = 1.5$."
        }
    ],
    "geotech": [
        {
            "topic": "Soil Classification & Phase Relationships",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A saturated soil sample has a void ratio $e = 0.60$ and specific gravity of soil solids $G = 2.65$. The water content $w$ of the saturated soil (in percentage, $S = 100\\%$) is ________ (round off to two decimal places).",
            "options": [],
            "answer": ["22.64"],
            "tolerance": {"min": 22.0, "max": 23.0},
            "explanation": "Using phase relation $S \\cdot e = w \\cdot G$. With full saturation $S = 1$: $w = \\frac{e}{G} = \\frac{0.60}{2.65} = 0.2264 = 22.64\\%$."
        },
        {
            "topic": "Permeability, Seepage & Effective Stress",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "The critical hydraulic gradient $i_c$ at which quicksand condition occurs in a cohesionless soil of specific gravity $G$ and void ratio $e$ is given by:",
            "options": ["$\\frac{G - 1}{1 + e}$", "$\\frac{G + 1}{1 - e}$", "$\\frac{G - 1}{1 - e}$", "$\\frac{G + e}{1 + e}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Quick sand occurs when effective vertical stress becomes zero: $\\sigma' = z \\gamma' - z i \\gamma_w = 0 \\implies i_c = \\frac{\\gamma'}{\\gamma_w} = \\frac{G - 1}{1 + e}$."
        },
        {
            "topic": "Consolidation & Settlement",
            "type": "MCQ",
            "marks": 2,
            "neg_marks": 0.67,
            "question": "For a normally consolidated clay layer drained on both top and bottom surfaces, the drainage path length is $d$. If drainage occurs only at the top surface (single drainage), the time required for the same degree of consolidation becomes:",
            "options": ["$4$ times", "$2$ times", "$8$ times", "$16$ times"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Time factor $T_v = \\frac{c_v t}{d^2} \\implies t \\propto d^2$. For double drainage $d = H/2$, while for single drainage $d = H$. Thus $t_{\\text{single}} = 4 \\times t_{\\text{double}}$."
        }
    ],
    "water-resources": [
        {
            "topic": "Pipe Flow & Open Channel Hydraulics",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "In an open channel, critical flow occurs when the Froude number $Fr$ is equal to:",
            "options": ["$1.0$", "$0$", "$> 1.0$", "$< 1.0$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Froude number $Fr = \\frac{V}{\\sqrt{g D}}$. Critical flow corresponds to $Fr = 1.0$, subcritical to $Fr < 1$, and supercritical to $Fr > 1$."
        },
        {
            "topic": "Hydraulic Jump & Specific Energy",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A rectangular channel carries a flow with pre-jump depth $y_1 = 0.2\\text{ m}$ and Froude number $Fr_1 = 4.0$. The post-jump depth $y_2$ (in $\\text{m}$) is ________ (rounded off to two decimal places).",
            "options": [],
            "answer": ["1.04"],
            "tolerance": {"min": 1.00, "max": 1.08},
            "explanation": "Bélanger's equation for hydraulic jump in rectangular channels: $y_2 = \\frac{y_1}{2} \\left(\\sqrt{1 + 8 Fr_1^2} - 1\\right) = \\frac{0.2}{2} \\left(\\sqrt{1 + 8(16)} - 1\\right) = 0.1 \\times (\\sqrt{129} - 1) = 0.1 \\times (11.358 - 1) = 1.036 \\approx 1.04\\text{ m}$."
        },
        {
            "topic": "Hydrology, Hydrographs & Flood Routing",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A unit hydrograph is a direct runoff hydrograph resulting from unit depth ($1\\text{ cm}$ or $1\\text{ mm}$) of:",
            "options": ["Excess rainfall occurring uniformly over the catchment at a constant rate", "Total storm precipitation at maximum intensity", "Infiltration excess water flowing through groundwater aquifers", "Evapotranspiration deficit"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "By Sherman's definition (1932), a unit hydrograph represents 1 unit ($1\\text{ cm}$) of rainfall excess produced uniformly over the entire drainage basin at an unvarying rate during a specified duration."
        }
    ],
    "environmental": [
        {
            "topic": "Water Treatment Processes (Coagulation, Filtration, Disinfection)",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "Alum (hydrated aluminum sulfate) is commonly added during municipal water treatment primarily as a:",
            "options": ["Coagulant to neutralize colloidal charges and form floc", "Disinfectant to kill pathogenic bacteria", "Water softening chemical to precipitate calcium carbonate", "Oxidizing agent to remove taste and odor"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Alum forms trivalent $Al^{3+}$ ions that destabilize negative colloidal charges on clay/turbidity particles, forming heavy gelatinous aluminium hydroxide flocs."
        },
        {
            "topic": "Wastewater Treatment & Activated Sludge",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A wastewater sample has an initial dissolved oxygen (DO) of $9.0\\text{ mg/L}$ and a 5-day DO of $3.0\\text{ mg/L}$. The sample is diluted with dilution factor $P = 0.02$ ($2\\%$ wastewater). The $\\text{BOD}_5$ of the wastewater (in $\\text{mg/L}$) is ________.",
            "options": [],
            "answer": ["300.0"],
            "tolerance": {"min": 298.0, "max": 302.0},
            "explanation": "$\\text{BOD}_5 = \\frac{DO_i - DO_f}{P} = \\frac{9.0 - 3.0}{0.02} = \\frac{6.0}{0.02} = 300\\text{ mg/L}$."
        }
    ],
    "transportation": [
        {
            "topic": "Highway Geometric Design & Sight Distances",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A vehicle travels at a speed $v = 80\\text{ km/h}$ ($22.22\\text{ m/s}$). The driver's reaction time is $t = 2.5\\text{ s}$ and coefficient of longitudinal friction is $f = 0.35$. Taking $g = 9.81\\text{ m/s}^2$, the Stopping Sight Distance (SSD, in meters) on a level highway is ________ (round off to nearest integer).",
            "options": [],
            "answer": ["127.0"],
            "tolerance": {"min": 125.0, "max": 130.0},
            "explanation": "$\\text{SSD} = v t + \\frac{v^2}{2 g f} = (22.22 \\times 2.5) + \\frac{22.22^2}{2 \\times 9.81 \\times 0.35} = 55.55 + \\frac{493.73}{6.867} = 55.55 + 71.89 = 127.44 \\approx 127\\text{ m}$."
        },
        {
            "topic": "Superelevation & Horizontal Curves",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "As per IRC guidelines, the ruling maximum design superelevation ($e_{\\text{max}}$) for plain and rolling terrain in mixed traffic conditions is:",
            "options": ["$7\\%$ ($0.07$)", "$10\\%$ ($0.10$)", "$4\\%$ ($0.04$)", "$12\\%$ ($0.12$)",],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "IRC:73 specifies $e_{\\text{max}} = 7\\%$ ($0.07$) for plain and rolling terrain, $10\\%$ for hilly terrain without snow, and $4\\%$ for built-up urban roads."
        }
    ],
    "surveying": [
        {
            "topic": "Leveling, Contouring & Theodolite",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "In reciprocal leveling between two stations across a wide river, the technique effectively eliminates errors due to:",
            "options": ["Both atmospheric refraction and Earth curvature, as well as collimation error", "Only Earth's curvature error", "Only staff graduation errors", "Only horizontal angular misalignment"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Reciprocal leveling balances sighting distances and takes dual foresight/backsight measurements, eliminating curvature, constant atmospheric refraction, and collimation axis errors."
        },
        {
            "topic": "Chain & Compass Surveying",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "The magnetic bearing of a line is recorded as $S 45^\\circ 30' E$. The magnetic declination at the location is $2^\\circ 30' W$. The true bearing (in whole circle bearing WCB format, in degrees) of the line is ________.",
            "options": [],
            "answer": ["132.0"],
            "tolerance": {"min": 131.5, "max": 132.5},
            "explanation": "Magnetic WCB $= 180^\\circ - 45^\\circ 30' = 134^\\circ 30'$. Since declination is West: $\\text{True Bearing} = \\text{Magnetic Bearing} - \\text{Declination} = 134^\\circ 30' - 2^\\circ 30' = 132^\\circ 00'$."
        }
    ]
}

print("Civil question bank defined.")
