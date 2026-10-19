# -*- coding: utf-8 -*-
"""
Authentic, mathematically verified GATE questions bank for Electronics & Communication Engineering (ECE).
"""

ECE_QUESTIONS = {
    "network-theory": [
        {
            "topic": "Circuit Analysis & Network Theorems",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A linear bilateral DC network has an open-circuit voltage $V_{\\text{th}} = 30\\text{ V}$ and short-circuit current $I_{\\text{sc}} = 5\\text{ A}$ across terminals A and B. The Thevenin equivalent resistance $R_{\\text{th}}$ (in Ohms) is ________.",
            "options": [],
            "answer": ["6.0"],
            "tolerance": {"min": 5.9, "max": 6.1},
            "explanation": "$R_{\\text{th}} = \\frac{V_{\\text{th}}}{I_{\\text{sc}}} = \\frac{30\\text{ V}}{5\\text{ A}} = 6.0\\,\\Omega$."
        },
        {
            "topic": "Two-Port Parameters (Z, Y, ABCD, h)",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "For a reciprocal two-port network, the condition satisfied by its transmission (ABCD) matrix parameters is:",
            "options": ["$A D - B C = 1$", "$A = D$", "$A B - C D = 1$", "$B = C$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "By definition of reciprocity in transmission parameter representation, the determinant of the ABCD matrix equals unity: $\\det(T) = A D - B C = 1$. The symmetry condition is $A = D$."
        }
    ],
    "edc": [
        {
            "topic": "Semiconductor Physics & Carrier Transport",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "The Einstein relation relating carrier diffusion coefficient $D$ and carrier mobility $\\mu$ in a semiconductor at thermal equilibrium temperature $T$ is:",
            "options": ["$\\frac{D}{\\mu} = \\frac{k T}{q} = V_t$", "$\\frac{D}{\\mu} = \\frac{q}{k T}$", "$D \\cdot \\mu = \\frac{k T}{q}$", "$\\frac{\\mu}{D} = \\frac{k T}{q}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Einstein's relation: $\\frac{D_n}{\\mu_n} = \\frac{D_p}{\\mu_p} = \\frac{k T}{q} = V_t$ (thermal voltage $\\approx 26\\text{ mV}$ at $300\\text{ K}$)."
        },
        {
            "topic": "PN Junction Diodes & Zener Diodes",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "An abrupt Silicon $p\\text{-}n$ junction has built-in potential $V_{bi} = 0.8\\text{ V}$. The transition capacitance at zero bias is $C_{j0} = 20\\text{ pF}$. When reverse biased with $V_R = 3.2\\text{ V}$, the junction capacitance $C_j = \\frac{C_{j0}}{\\sqrt{1 + V_R / V_{bi}}}$ (in $\\text{pF}$) is ________.",
            "options": [],
            "answer": ["8.94"],
            "tolerance": {"min": 8.7, "max": 9.2},
            "explanation": "$C_j = \\frac{20}{\\sqrt{1 + 3.2/0.8}} = \\frac{20}{\\sqrt{1 + 4}} = \\frac{20}{\\sqrt{5}} = \\frac{20}{2.236} \\approx 8.94\\text{ pF}$."
        }
    ],
    "analog-circuits": [
        {
            "topic": "Op-Amp Circuits & Active Filters",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A non-inverting operational amplifier circuit has $R_1 = 5\\,\\text{k}\\Omega$ connected from the inverting pin to ground and feedback resistor $R_f = 45\\,\\text{k}\\Omega$. The closed-loop voltage gain $A_v = 1 + \\frac{R_f}{R_1}$ is ________.",
            "options": [],
            "answer": ["10.0"],
            "tolerance": {"min": 9.9, "max": 10.1},
            "explanation": "$A_v = 1 + \\frac{R_f}{R_1} = 1 + \\frac{45}{5} = 1 + 9 = 10.0$."
        },
        {
            "topic": "Small Signal Analysis of BJT/MOSFET",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A common-emitter BJT amplifier with unbypassed emitter resistor $R_E$ introduces negative feedback that results in:",
            "options": ["Increased input resistance and stabilized voltage gain", "Decreased input resistance and increased voltage gain", "Zero output resistance and unstable gain", "High distortion and lower bandwidth"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "An unbypassed $R_E$ provides series-series negative feedback. This raises the input impedance ($R_{\\text{in}} \\approx r_\\pi + (1+\\beta)R_E$), stabilizes gain against $h_{fe}$ variations, and widens bandwidth."
        }
    ],
    "digital-circuits": [
        {
            "topic": "Combinational Circuits (Multiplexers, Decoders)",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "The minimum number of 2-to-1 multiplexers required to realize an arbitrary 4-to-1 multiplexer without any external logic gates is:",
            "options": ["$3$", "$2$", "$4$", "$7$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "A 4-to-1 multiplexer has 2 select lines. Two 2-to-1 MUXes are used in the first stage driven by $S_0$, and one 2-to-1 MUX is used in the second stage driven by $S_1$. Total MUX count $= 2 + 1 = 3$."
        },
        {
            "topic": "Sequential Circuits (Flip-Flops, Counters, Registers)",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A mod-16 ripple counter is built using 4 toggle ($T$) flip-flops. If the input clock frequency is $32\\text{ kHz}$, the output frequency (in $\\text{kHz}$) at the final flip-flop is ________.",
            "options": [],
            "answer": ["2.0"],
            "tolerance": {"min": 1.9, "max": 2.1},
            "explanation": "A counter with $N = 4$ flip-flops has modulus $2^N = 16$. Each flip-flop divides frequency by 2: $f_{\\text{out}} = \\frac{f_{\\text{in}}}{16} = \\frac{32\\text{ kHz}}{16} = 2\\text{ kHz}$."
        }
    ],
    "control-systems": [
        {
            "topic": "Transfer Functions & Stability Analysis",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "The steady-state error $e_{ss}$ of a Type-1 unity feedback control system to a unit ramp input $r(t) = t \\cdot u(t)$ is given by:",
            "options": ["$\\frac{1}{K_v}$", "$0$", "$\\infty$", "$\\frac{1}{1 + K_p}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "For a Type-1 system with unit ramp input: velocity error constant $K_v = \\lim_{s \\to 0} s G(s)$, and steady-state error $e_{ss} = \\frac{1}{K_v}$."
        }
    ],
    "communications": [
        {
            "topic": "Amplitude & Frequency Modulation (AM, FM)",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "An AM broadcast signal has a carrier power $P_c = 10\\text{ kW}$ and modulation index $\\mu = 0.8$. The total transmitted power $P_t = P_c \\left(1 + \\frac{\\mu^2}{2}\\right)$ (in $\\text{kW}$) is ________.",
            "options": [],
            "answer": ["13.2"],
            "tolerance": {"min": 13.0, "max": 13.4},
            "explanation": "$P_t = 10 \\left(1 + \\frac{0.8^2}{2}\\right) = 10 \\left(1 + \\frac{0.64}{2}\\right) = 10(1 + 0.32) = 13.2\\text{ kW}$."
        },
        {
            "topic": "Information Theory & Channel Capacity",
            "type": "MCQ",
            "marks": 2,
            "neg_marks": 0.67,
            "question": "According to Shannon's Channel Capacity theorem, the capacity $C$ of an additive white Gaussian noise (AWGN) channel with bandwidth $B$ and signal-to-noise ratio $\\text{SNR} = S/N$ is:",
            "options": [
                "$C = B \\log_2 \\left(1 + \\frac{S}{N}\\right)$",
                "$C = 2 B \\log_2 \\left(1 + \\frac{S}{N}\\right)$",
                "$C = B \\log_{10} \\left(1 + \\frac{S}{N}\\right)$",
                "$C = B \\left(1 + \\frac{S}{N}\\right)$"
            ],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Shannon-Hartley theorem states maximum error-free transmission capacity is $C = B \\log_2 (1 + \\text{SNR})$ bits/second."
        }
    ],
    "electromagnetics": [
        {
            "topic": "Maxwell's Equations & Plane Waves",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A uniform plane electromagnetic wave propagates in free space with permittivity $\\epsilon_0$ and permeability $\\mu_0$. The intrinsic wave impedance $\\eta_0 = \\sqrt{\\mu_0 / \\epsilon_0}$ (in Ohms) is closest to ________ (rounded off to nearest integer).",
            "options": [],
            "answer": ["377.0"],
            "tolerance": {"min": 375.0, "max": 379.0},
            "explanation": "$\\eta_0 = \\sqrt{\\frac{4\\pi \\times 10^{-7}}{8.854 \\times 10^{-12}}} \\approx 120\\pi \\approx 376.99 \\approx 377\\,\\Omega$."
        },
        {
            "topic": "Transmission Lines & Smith Chart",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A lossless transmission line with characteristic impedance $Z_0 = 50\\,\\Omega$ is terminated in a load impedance $Z_L = 100\\,\\Omega$. The voltage reflection coefficient $\\Gamma$ is:",
            "options": ["$+0.333$", "$-0.333$", "$0$", "$+0.5$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "$\\Gamma = \\frac{Z_L - Z_0}{Z_L + Z_0} = \\frac{100 - 50}{100 + 50} = \\frac{50}{150} = +\\frac{1}{3} = +0.333$."
        }
    ],
    "signals-systems": [
        {
            "topic": "Continuous & Discrete LTI Systems",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "The continuous-time signal $x(t) = \\cos(200\\pi t) + \\sin(600\\pi t)$ is sampled. According to Nyquist criterion, the minimum sampling frequency $f_s$ (Nyquist rate, in Hz) required to avoid aliasing is ________.",
            "options": [],
            "answer": ["600.0"],
            "tolerance": {"min": 595.0, "max": 605.0},
            "explanation": "The maximum angular frequency is $\\omega_{\\text{max}} = 600\\pi\\text{ rad/s} \\implies f_{\\text{max}} = \\frac{600\\pi}{2\\pi} = 300\\text{ Hz}$. The Nyquist rate is $f_s = 2 f_{\\text{max}} = 2 \\times 300 = 600\\text{ Hz}$."
        }
    ]
}

print("ECE question bank defined.")
