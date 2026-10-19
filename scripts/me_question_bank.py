# -*- coding: utf-8 -*-
"""
Authentic, mathematically verified GATE questions bank for non-CSE branches:
Mechanical (ME), Civil (CE), Electrical (EE), and Electronics & Communication (ECE).
"""

MECHANICAL_QUESTIONS = {
    "thermodynamics": [
        {
            "topic": "Basic Thermodynamics & Laws",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A reversible heat engine operates between temperatures of $800\\text{ K}$ and $400\\text{ K}$. It receives $1000\\text{ kJ}$ of heat from the higher temperature reservoir. The thermal efficiency of the engine and the work output are respectively:",
            "options": ["$50\\%$, $500\\text{ kJ}$", "$60\\%$, $600\\text{ kJ}$", "$40\\%$, $400\\text{ kJ}$", "$75\\%$, $750\\text{ kJ}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Carnot efficiency $\\eta = 1 - \\frac{T_L}{T_H} = 1 - \\frac{400}{800} = 0.50$ ($50\\%$). Work output $W = \\eta \\cdot Q_H = 0.50 \\times 1000\\text{ kJ} = 500\\text{ kJ}$."
        },
        {
            "topic": "Applied Thermodynamics & Power Cycles",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "An air-standard Otto cycle has a compression ratio of $r = 8$. Taking ratio of specific heats $\\gamma = 1.4$, the thermal efficiency (in percentage) of the cycle is ________ (rounded off to two decimal places).",
            "options": [],
            "answer": ["56.47"],
            "tolerance": {"min": 56.0, "max": 57.0},
            "explanation": "Air-standard efficiency of Otto cycle is given by $\\eta = 1 - \\frac{1}{r^{\\gamma - 1}} = 1 - \\frac{1}{8^{0.4}} = 1 - \\frac{1}{2.2974} = 1 - 0.4353 = 0.5647 = 56.47\\%$."
        },
        {
            "topic": "Heat Transfer (Conduction, Convection, Radiation)",
            "type": "MCQ",
            "marks": 2,
            "neg_marks": 0.67,
            "question": "A plane wall of thickness $0.1\\text{ m}$ and thermal conductivity $25\\text{ W/(m}\\cdot\\text{K)}$ has its left face maintained at $200^\\circ\\text{C}$ and right face at $50^\\circ\\text{C}$. Under steady 1D conduction, the heat flux (in $\\text{kW/m}^2$) through the wall is:",
            "options": ["$37.5$", "$3.75$", "$375$", "$0.375$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Fourier's Law: $q = -k \\frac{dT}{dx} = k \\frac{T_1 - T_2}{L} = 25 \\times \\frac{200 - 50}{0.1} = 25 \\times 1500 = 37,500\\text{ W/m}^2 = 37.5\\text{ kW/m}^2$."
        },
        {
            "topic": "IC Engines & Refrigeration",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "The coefficient of performance (COP) of a reversible Carnot refrigerator operating between $-10^\\circ\\text{C}$ ($263\\text{ K}$) and $30^\\circ\\text{C}$ ($303\\text{ K}$) is closest to:",
            "options": ["$6.58$", "$7.58$", "$5.58$", "$8.58$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "$\\text{COP}_{\\text{ref}} = \\frac{T_L}{T_H - T_L} = \\frac{263}{303 - 263} = \\frac{263}{40} = 6.575 \\approx 6.58$."
        },
        {
            "topic": "Heat Transfer (Conduction, Convection, Radiation)",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "Two very large parallel black plates are maintained at absolute temperatures of $800\\text{ K}$ and $400\\text{ K}$. Stefan-Boltzmann constant is $\\sigma = 5.67 \\times 10^{-8}\\text{ W/(m}^2\\cdot\\text{K}^4)$. The net radiative heat exchange per unit area between the plates (in $\\text{kW/m}^2$) is ________ (round off to one decimal place).",
            "options": [],
            "answer": ["21.8"],
            "tolerance": {"min": 21.0, "max": 22.5},
            "explanation": "For two black surfaces: $q = \\sigma (T_1^4 - T_2^4) = 5.67 \\times 10^{-8} \\times (800^4 - 400^4) = 5.67 \\times 10^{-8} \\times (4.096 \\times 10^{11} - 2.56 \\times 10^{10}) = 5.67 \\times 10^{-8} \\times 3.84 \\times 10^{11} = 21,772.8\\text{ W/m}^2 \\approx 21.8\\text{ kW/m}^2$."
        },
        {
            "topic": "Basic Thermodynamics & Laws",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "For an ideal gas undergoing a reversible adiabatic (isentropic) process, the relation between temperature $T$ and pressure $P$ is given by:",
            "options": ["$T \\cdot P^{\\frac{1-\\gamma}{\\gamma}} = \\text{constant}$", "$T \\cdot P^{\\gamma - 1} = \\text{constant}$", "$T^{\\gamma} \\cdot P^{1-\\gamma} = \\text{constant}$", "$T \\cdot P^{\\frac{\\gamma - 1}{\\gamma}} = \\text{constant}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Since $P V^{\\gamma} = \\text{constant}$ and $P V = m R T$, replacing $V = \\frac{mRT}{P}$ gives $P^{1-\\gamma} T^{\\gamma} = \\text{constant}$, which is $T P^{\\frac{1-\\gamma}{\\gamma}} = \\text{constant}$."
        }
    ],
    "fluid-mechanics": [
        {
            "topic": "Fluid Statics & Kinematics",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A U-tube manometer contains mercury (specific gravity $= 13.6$). When connected to a pipeline carrying water, the difference in mercury levels is $0.1\\text{ m}$. Assuming $g = 9.81\\text{ m/s}^2$ and density of water $\\rho = 1000\\text{ kg/m}^3$, the differential pressure head of water is:",
            "options": ["$1.26\\text{ m}$", "$1.36\\text{ m}$", "$0.10\\text{ m}$", "$13.6\\text{ m}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "$h = y \\left(\\frac{S_m}{S_f} - 1\\right) = 0.1 \\times (13.6 - 1) = 0.1 \\times 12.6 = 1.26\\text{ m of water}$."
        },
        {
            "topic": "Fluid Dynamics & Bernoulli's Equation",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "Water flows through a horizontal pipe of diameter $0.1\\text{ m}$ that narrows to $0.05\\text{ m}$. If the velocity at the inlet is $2\\text{ m/s}$, the velocity at the throat (in $\\text{m/s}$) is ________.",
            "options": [],
            "answer": ["8.0"],
            "tolerance": {"min": 7.9, "max": 8.1},
            "explanation": "By continuity equation: $A_1 V_1 = A_2 V_2 \\implies V_2 = V_1 \\left(\\frac{D_1}{D_2}\\right)^2 = 2 \\times \\left(\\frac{0.1}{0.05}\\right)^2 = 2 \\times 4 = 8\\text{ m/s}$."
        },
        {
            "topic": "Flow Through Pipes & Boundary Layer",
            "type": "MCQ",
            "marks": 2,
            "neg_marks": 0.67,
            "question": "For fully developed laminar flow of a Newtonian fluid through a circular pipe of radius $R$, the ratio of maximum velocity at the centerline to the average velocity is:",
            "options": ["$2.0$", "$1.5$", "$1.33$", "$2.5$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "In laminar Hagen-Poiseuille flow, the velocity profile is parabolic: $u(r) = u_{\\text{max}} [1 - (r/R)^2]$. The average velocity is $\\bar{u} = \\frac{u_{\\text{max}}}{2}$, so $\\frac{u_{\\text{max}}}{\\bar{u}} = 2.0$."
        },
        {
            "topic": "Hydraulic Turbines & Pumps",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "Which of the following hydraulic turbines is categorized as an impulse turbine operating under high head and low discharge conditions?",
            "options": ["Pelton Wheel", "Francis Turbine", "Kaplan Turbine", "Propeller Turbine"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Pelton wheel is a tangential flow impulse turbine suitable for high heads ($> 250\\text{ m}$) and low flow rates."
        }
    ],
    "som": [
        {
            "topic": "Stress & Strain Analysis",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "At a point in a strained material, the principal stresses are $\\sigma_1 = 100\\text{ MPa}$ (tensile) and $\\sigma_2 = -40\\text{ MPa}$ (compressive). The maximum shear stress (in $\\text{MPa}$) at that point is:",
            "options": ["$70$", "$30$", "$140$", "$60$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "$\\tau_{\\text{max}} = \\frac{\\sigma_1 - \\sigma_2}{2} = \\frac{100 - (-40)}{2} = \\frac{140}{2} = 70\\text{ MPa}$."
        },
        {
            "topic": "Deflection of Beams & Thin Cylinders",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A cantilever beam of length $L = 2\\text{ m}$ carries a point load $W = 10\\text{ kN}$ at its free end. The flexural rigidity is $EI = 8 \\times 10^4\\text{ kN}\\cdot\\text{m}^2$. The maximum deflection at the free end (in $\\text{mm}$) is ________ (rounded off to two decimal places).",
            "options": [],
            "answer": ["0.33"],
            "tolerance": {"min": 0.31, "max": 0.35},
            "explanation": "For a cantilever with end load: $\\delta = \\frac{W L^3}{3 EI} = \\frac{10 \\times 2^3}{3 \\times 8 \\times 10^4} = \\frac{80}{24 \\times 10^4} = 3.33 \\times 10^{-4}\\text{ m} = 0.33\\text{ mm}$."
        },
        {
            "topic": "Bending & Torsion in Beams",
            "type": "MCQ",
            "marks": 2,
            "neg_marks": 0.67,
            "question": "A solid circular shaft of diameter $D$ transmits a torque $T$. If the diameter of the shaft is doubled to $2D$, the torque carrying capacity for the same maximum permissible shear stress increases by a factor of:",
            "options": ["$8$", "$4$", "$16$", "$2$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Torsion formula: $\\tau = \\frac{16 T}{\\pi D^3} \\implies T = \\frac{\\pi \\tau D^3}{16}$. When $D$ is doubled, $T \\propto D^3$, so capacity becomes $2^3 = 8$ times."
        },
        {
            "topic": "Deflection of Beams & Thin Cylinders",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "For a thin cylindrical pressure vessel of internal diameter $d$ and wall thickness $t$ subjected to internal gauge pressure $p$, the ratio of circumferential (hoop) stress to longitudinal stress is:",
            "options": ["$2.0$", "$0.5$", "$1.0$", "$4.0$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Hoop stress $\\sigma_h = \\frac{p d}{2t}$, Longitudinal stress $\\sigma_l = \\frac{p d}{4t}$. Ratio $\\frac{\\sigma_h}{\\sigma_l} = 2.0$."
        }
    ],
    "tom": [
        {
            "topic": "Kinematic Analysis of Linkages",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "According to Kutzbach criterion, the degrees of freedom $F$ of a planar kinematic mechanism having $n$ links and $j$ single degree-of-freedom lower pairs (with no higher pairs) is given by:",
            "options": ["$F = 3(n - 1) - 2j$", "$F = 3(n - 1) - j$", "$F = 2(n - 1) - 3j$", "$F = 3n - 2j - 1$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Kutzbach mobility equation for planar mechanisms: $F = 3(n - 1) - 2j - h$. With $h = 0$, $F = 3(n - 1) - 2j$."
        },
        {
            "topic": "Mechanical Vibrations (1-DOF & 2-DOF)",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A spring-mass system has a mass $m = 10\\text{ kg}$ and spring stiffness $k = 4000\\text{ N/m}$. The natural circular frequency of un-damped free vibration (in $\\text{rad/s}$) is ________.",
            "options": [],
            "answer": ["20.0"],
            "tolerance": {"min": 19.9, "max": 20.1},
            "explanation": "$\\omega_n = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{4000}{10}} = \\sqrt{400} = 20\\text{ rad/s}$."
        },
        {
            "topic": "Gears & Gear Trains",
            "type": "MCQ",
            "marks": 2,
            "neg_marks": 0.67,
            "question": "In a simple gear train, gear 1 has 20 teeth and rotates at $600\\text{ rpm}$. Gear 2 has 60 teeth and meshes with gear 1. The speed of gear 2 (in $\\text{rpm}$) is:",
            "options": ["$200$", "$1800$", "$300$", "$150$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Speed ratio $\\frac{N_2}{N_1} = \\frac{T_1}{T_2} \\implies N_2 = 600 \\times \\frac{20}{60} = 200\\text{ rpm}$."
        }
    ],
    "manufacturing": [
        {
            "topic": "Machining & Machine Tool Operations",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "In orthogonal turning with a cutting speed $V = 100\\text{ m/min}$, the tool life observed is $T = 60\\text{ min}$. The tool follows Taylor's equation $V T^n = C$ with $n = 0.5$. The tool life (in minutes) at a cutting speed of $150\\text{ m/min}$ is ________ (round off to one decimal place).",
            "options": [],
            "answer": ["26.7"],
            "tolerance": {"min": 26.0, "max": 27.5},
            "explanation": "$V_1 T_1^{0.5} = V_2 T_2^{0.5} \\implies 100 \\times \\sqrt{60} = 150 \\times \\sqrt{T_2} \\implies \\sqrt{T_2} = \\frac{100}{150} \\sqrt{60} = \\frac{2}{3} \\times 7.746 = 5.164 \\implies T_2 = (5.164)^2 \\approx 26.7\\text{ min}$."
        },
        {
            "topic": "Casting, Forming & Joining Processes",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "According to Chvorinov's rule, the solidification time $t_s$ of a casting is proportional to:",
            "options": ["$\\left(\\frac{V}{A}\\right)^2$", "$\\left(\\frac{A}{V}\\right)^2$", "$\\frac{V}{A}$", "$\\left(\\frac{V}{A}\\right)^3$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Chvorinov's rule states $t_s = k \\left(\\frac{V}{A}\\right)^2$, where $V$ is the volume of casting and $A$ is the cooling surface area."
        },
        {
            "topic": "Metrology & Inspection",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A hole is specified as $25.000^{+0.020}_{-0.000}\\text{ mm}$ and a shaft is specified as $24.980^{+0.010}_{-0.010}\\text{ mm}$. The type of fit between them is:",
            "options": ["Clearance Fit", "Interference Fit", "Transition Fit", "Shrink Fit"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Hole limits: $[25.000, 25.020]\\text{ mm}$. Shaft limits: $[24.970, 24.990]\\text{ mm}$. Since the minimum hole size ($25.000$) is greater than the maximum shaft size ($24.990$), it is strictly a Clearance Fit."
        }
    ],
    "machine-design": [
        {
            "topic": "Design Against Static & Fatigue Loads",
            "type": "MCQ",
            "marks": 2,
            "neg_marks": 0.67,
            "question": "In design against fluctuating fatigue loads, the Goodman relation connects mean stress $\\sigma_m$, stress amplitude $\\sigma_a$, endurance limit $S_e$, and ultimate tensile strength $S_{ut}$ via:",
            "options": [
                "$\\frac{\\sigma_a}{S_e} + \\frac{\\sigma_m}{S_{ut}} = \\frac{1}{N}$",
                "$\\frac{\\sigma_a}{S_e} + \\left(\\frac{\\sigma_m}{S_{ut}}\\right)^2 = \\frac{1}{N}$",
                "$\\frac{\\sigma_a}{S_e} + \\frac{\\sigma_m}{S_y} = \\frac{1}{N}$",
                "$\\left(\\frac{\\sigma_a}{S_e}\\right)^2 + \\frac{\\sigma_m}{S_{ut}} = \\frac{1}{N}$"
            ],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Goodman's straight line equation for fatigue failure under fluctuating stress: $\\frac{\\sigma_a}{S_e} + \\frac{\\sigma_m}{S_{ut}} = \\frac{1}{N}$."
        },
        {
            "topic": "Bearings, Brakes & Clutches",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A deep groove ball bearing operates under an equivalent radial load $P = 5\\text{ kN}$. The basic dynamic load rating is $C = 25\\text{ kN}$. The rated life of the bearing (in millions of revolutions, $L_{10} = (C/P)^p$ with $p = 3$) is ________.",
            "options": [],
            "answer": ["125.0"],
            "tolerance": {"min": 124.0, "max": 126.0},
            "explanation": "For ball bearings ($p = 3$): $L_{10} = \\left(\\frac{C}{P}\\right)^3 = \\left(\\frac{25}{5}\\right)^3 = 5^3 = 125\\text{ million revolutions}$."
        }
    ],
    "industrial": [
        {
            "topic": "Inventory Control & EOQ Models",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "An engineering firm has annual demand $D = 10,000\\text{ units}$, ordering cost $S = \\$50$ per order, and holding cost $H = \\$4$ per unit per year. The Economic Order Quantity (EOQ) is ________ units.",
            "options": [],
            "answer": ["500.0"],
            "tolerance": {"min": 499.0, "max": 501.0},
            "explanation": "$\\text{EOQ} = \\sqrt{\\frac{2 D S}{H}} = \\sqrt{\\frac{2 \\times 10,000 \\times 50}{4}} = \\sqrt{250,000} = 500\\text{ units}$."
        },
        {
            "topic": "Linear Programming & Simplex Method",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "In a linear programming problem, if the objective function can be increased indefinitely without violating any constraints, the problem is said to have:",
            "options": ["An unbounded solution", "Infeasible solution", "Degenerate solution", "Unique optimal solution"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "An unbounded solution occurs when the solution space is open in the direction of optimization, allowing the objective function to improve without bounds."
        },
        {
            "topic": "PERT & CPM Project Management",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "In a PERT network, the optimistic time is $t_o = 4\\text{ days}$, most likely time is $t_m = 7\\text{ days}$, and pessimistic time is $t_p = 16\\text{ days}$. The expected activity duration $t_e$ (in days) is ________.",
            "options": [],
            "answer": ["8.0"],
            "tolerance": {"min": 7.9, "max": 8.1},
            "explanation": "$t_e = \\frac{t_o + 4 t_m + t_p}{6} = \\frac{4 + 4(7) + 16}{6} = \\frac{4 + 28 + 16}{6} = \\frac{48}{6} = 8\\text{ days}$."
        }
    ]
}

print("Mechanical question bank defined.")
