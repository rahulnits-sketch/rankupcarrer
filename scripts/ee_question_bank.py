# -*- coding: utf-8 -*-
"""
Authentic, mathematically verified GATE questions bank for Electrical Engineering (EE).
"""

ELECTRICAL_QUESTIONS = {
    "circuits": [
        {
            "topic": "Network Theorems (Thevenin, Norton, Superposition)",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A DC voltage source $V_s = 24\\text{ V}$ with internal resistance $R_s = 6\\,\\Omega$ is connected to a variable load resistor $R_L$. According to the maximum power transfer theorem, the maximum power (in Watts) absorbed by $R_L$ is ________.",
            "options": [],
            "answer": ["24.0"],
            "tolerance": {"min": 23.5, "max": 24.5},
            "explanation": "Maximum power transfer occurs when $R_L = R_s = 6\\,\\Omega$. Maximum power $P_{\\text{max}} = \\frac{V_{\\text{th}}^2}{4 R_{\\text{th}}} = \\frac{24^2}{4 \\times 6} = \\frac{576}{24} = 24\\text{ W}$."
        },
        {
            "topic": "Transient Analysis of RL, RC, RLC Circuits",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "In a series $RL$ circuit connected to a DC source of voltage $V$ at $t = 0$, the time constant $\\tau$ representing the time taken for current to reach $63.2\\%$ of its final steady-state value is:",
            "options": ["$\\frac{L}{R}$", "$\\frac{R}{L}$", "$R \\cdot L$", "$\\frac{1}{R L}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "The transient differential equation is $L \\frac{di}{dt} + R i = V$. The complementary function yields the time constant $\\tau = \\frac{L}{R}$."
        },
        {
            "topic": "AC Sinusoidal Steady State & Resonance",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A series $RLC$ circuit has $R = 10\\,\\Omega$, $L = 0.1\\text{ H}$, and $C = 10\\,\\mu\\text{F}$ ($10^{-5}\\text{ F}$). The resonant frequency $\\omega_0$ (in $\\text{rad/s}$) of the circuit is ________.",
            "options": [],
            "answer": ["1000.0"],
            "tolerance": {"min": 990.0, "max": 1010.0},
            "explanation": "At resonance, $X_L = X_C \\implies \\omega_0 = \\frac{1}{\\sqrt{L C}} = \\frac{1}{\\sqrt{0.1 \\times 10^{-5}}} = \\frac{1}{\\sqrt{10^{-6}}} = \\frac{1}{10^{-3}} = 1000\\text{ rad/s}$."
        }
    ],
    "machines": [
        {
            "topic": "Single-Phase & Three-Phase Transformers",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A $10\\text{ kVA}$, $2000/200\\text{ V}$, $50\\text{ Hz}$ single-phase transformer has full-load iron loss of $150\\text{ W}$ and full-load copper loss of $250\\text{ W}$. The maximum efficiency occurs at a fraction $x$ of full load equal to ________ (rounded off to two decimal places).",
            "options": [],
            "answer": ["0.77"],
            "tolerance": {"min": 0.75, "max": 0.80},
            "explanation": "Maximum efficiency occurs when variable copper loss equals constant iron loss: $x^2 P_{cu} = P_i \\implies x = \\sqrt{\\frac{P_i}{P_{cu}}} = \\sqrt{\\frac{150}{250}} = \\sqrt{0.6} \\approx 0.7746 = 0.77$ of full load."
        },
        {
            "topic": "Three-Phase Induction Motors",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A 4-pole, $50\\text{ Hz}$, 3-phase induction motor runs at a rotor speed of $1440\\text{ rpm}$. The synchronous speed is $1500\\text{ rpm}$. The percentage slip $s$ of the motor is ________ percent.",
            "options": [],
            "answer": ["4.0"],
            "tolerance": {"min": 3.9, "max": 4.1},
            "explanation": "Synchronous speed $N_s = \\frac{120 f}{P} = \\frac{120 \\times 50}{4} = 1500\\text{ rpm}$. Slip $s = \\frac{N_s - N}{N_s} \\times 100\\% = \\frac{1500 - 1440}{1500} \\times 100\\% = \\frac{60}{1500} \\times 100\\% = 4.0\\%$."
        },
        {
            "topic": "DC Machines (Motors & Generators)",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "Which type of DC motor is most widely preferred for electric traction and crane hoisting applications owing to its exceptionally high starting torque?",
            "options": ["DC Series Motor", "DC Shunt Motor", "Cumulative Compound Motor", "Differentially Compounded Motor"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "In a DC series motor, field flux $\\Phi \\propto I_a$ before saturation, so torque $T \\propto I_a^2$. This parabolic torque-current characteristic provides extremely high starting torque."
        }
    ],
    "power-systems": [
        {
            "topic": "Power System Stability & Swing Equation",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "The dynamic swing equation governing the rotor acceleration of a synchronous machine connected to an infinite bus is written as:",
            "options": ["$M \\frac{d^2 \\delta}{dt^2} = P_m - P_e$", "$M \\frac{d \\delta}{dt} = P_m - P_e$", "$M \\frac{d^2 \\delta}{dt^2} = P_e - P_m$", "$M^2 \\frac{d^2 \\delta}{dt^2} = P_m + P_e$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Swing equation: $M \\frac{d^2 \\delta}{dt^2} = P_a = P_m - P_e$, where $M$ is the angular momentum, $P_m$ is shaft mechanical power input, and $P_e$ is electrical power output."
        },
        {
            "topic": "Transmission Line Models & Performance",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A $400\\text{ kV}$, 3-phase lossless transmission line has total series inductance $L = 1.0\\text{ mH/km}$ and shunt capacitance $C = 0.01\\,\\mu\\text{F/km}$. The surge impedance $Z_c = \\sqrt{L/C}$ (in Ohms) of the line is ________.",
            "options": [],
            "answer": ["316.2"],
            "tolerance": {"min": 314.0, "max": 318.0},
            "explanation": "$Z_c = \\sqrt{\\frac{L}{C}} = \\sqrt{\\frac{1.0 \\times 10^{-3}}{0.01 \\times 10^{-6}}} = \\sqrt{10^5} = 316.23\\,\\Omega$."
        }
    ],
    "control-systems": [
        {
            "topic": "Time-Domain Specifications & Routh-Hurwitz Criterion",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "The open-loop transfer function of a unity feedback system is $G(s) = \\frac{K}{s(s+2)(s+4)}$. Using Routh-Hurwitz stability criterion, the maximum value of $K$ for closed-loop stability is ________.",
            "options": [],
            "answer": ["48.0"],
            "tolerance": {"min": 47.5, "max": 48.5},
            "explanation": "Characteristic equation: $1 + G(s) = 0 \\implies s(s^2 + 6s + 8) + K = 0 \\implies s^3 + 6s^2 + 8s + K = 0$. Routh array first column entries: $s^3: 1$, $s^2: 6$, $s^1: \\frac{6(8) - K}{6} = \\frac{48 - K}{6}$, $s^0: K$. For stability, all terms must be positive: $48 - K > 0 \\implies K < 48$."
        },
        {
            "topic": "Transfer Function & Block Diagram Reduction",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A standard second-order system has closed-loop transfer function $T(s) = \\frac{100}{s^2 + 12s + 100}$. The damping ratio $\\zeta$ of the system is:",
            "options": ["$0.6$", "$0.5$", "$0.8$", "$1.2$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Standard form: $\\frac{\\omega_n^2}{s^2 + 2\\zeta \\omega_n s + \\omega_n^2}$. Here $\\omega_n^2 = 100 \\implies \\omega_n = 10\\text{ rad/s}$. Then $2\\zeta \\omega_n = 12 \\implies 2\\zeta(10) = 12 \\implies \\zeta = \\frac{12}{20} = 0.6$."
        }
    ],
    "power-electronics": [
        {
            "topic": "Phase Controlled Rectifiers (Single & Three Phase)",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "A single-phase full-wave controlled bridge rectifier is fed from a $230\\text{ V}$ (RMS), $50\\text{ Hz}$ AC source. The firing angle is $\\alpha = 60^\\circ$. Assuming continuous conduction, the average DC output voltage $V_{dc} = \\frac{2 V_m}{\\pi} \\cos \\alpha$ (in Volts) is ________ (round off to one decimal place).",
            "options": [],
            "answer": ["103.5"],
            "tolerance": {"min": 102.0, "max": 105.0},
            "explanation": "$V_m = 230 \\times \\sqrt{2} = 325.27\\text{ V}$. $V_{dc} = \\frac{2 V_m}{\\pi} \\cos(60^\\circ) = \\frac{2 \\times 325.27}{\\pi} \\times 0.5 = \\frac{325.27}{3.1416} = 103.54\\text{ V}$."
        },
        {
            "topic": "DC-DC Choppers (Buck, Boost, Buck-Boost)",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A DC-DC step-down (buck) converter has an input voltage of $48\\text{ V}$ and duty cycle $D = 0.25$. Under continuous conduction mode, the steady-state average output voltage is:",
            "options": ["$12\\text{ V}$", "$24\\text{ V}$", "$36\\text{ V}$", "$192\\text{ V}$"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "For a buck converter, $V_o = D \\cdot V_s = 0.25 \\times 48\\text{ V} = 12\\text{ V}$."
        }
    ],
    "measurements": [
        {
            "topic": "PMMC, Moving Iron & Dynamometer Instruments",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A Permanent Magnet Moving Coil (PMMC) instrument responds strictly to:",
            "options": ["The true average (DC) value of current", "The Root Mean Square (RMS) value of current", "The peak-to-peak amplitude", "The instantaneous power"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Because deflecting torque in PMMC is proportional to instantaneous current ($T_d = BINA$), over an AC cycle the net torque averages out to zero. Hence it strictly registers the average (DC) component."
        }
    ],
    "electromagnetics": [
        {
            "topic": "Faraday's Law & Maxwell's Equations",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "Maxwell's divergence equation $\\nabla \\cdot \\vec{B} = 0$ physically asserts that:",
            "options": ["Isolated magnetic monopoles do not exist in nature", "Electric field is conservative in static conditions", "Magnetic flux changes induce an electromotive force", "Total charge inside a closed volume is conserved"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "$\\nabla \\cdot \\vec{B} = 0$ states that magnetic flux lines are always continuous closed loops, proving that isolated single magnetic poles (monopoles) do not exist."
        }
    ],
    "signals-systems": [
        {
            "topic": "LTI Systems, Convolution & Impulse Response",
            "type": "MCQ",
            "marks": 1,
            "neg_marks": 0.33,
            "question": "A continuous-time LTI system with impulse response $h(t) = e^{-2t} u(t)$ is:",
            "options": ["Both causal and BIBO stable", "Causal but BIBO unstable", "Non-causal but BIBO stable", "Neither causal nor stable"],
            "answer": ["A"],
            "tolerance": None,
            "explanation": "Causality: $h(t) = 0$ for $t < 0$ due to $u(t)$. Stability: $\\int_{-\\infty}^{\\infty} |h(t)| dt = \\int_0^\\infty e^{-2t} dt = \\left[-\\frac{e^{-2t}}{2}\\right]_0^\\infty = \\frac{1}{2} < \\infty$. Hence both causal and BIBO stable."
        }
    ],
    "analog-digital": [
        {
            "topic": "Operational Amplifiers & Applications",
            "type": "NAT",
            "marks": 2,
            "neg_marks": 0,
            "question": "An ideal op-amp in inverting amplifier configuration has input resistance $R_1 = 10\\,\\text{k}\\Omega$ and feedback resistance $R_f = 100\\,\\text{k}\\Omega$. If input voltage is $V_{\\text{in}} = 0.5\\text{ V}$, the output voltage $V_{\\text{out}} = -\\frac{R_f}{R_1} V_{\\text{in}}$ (in Volts) is ________.",
            "options": [],
            "answer": ["-5.0"],
            "tolerance": {"min": -5.1, "max": -4.9},
            "explanation": "Inverting voltage gain $A_v = -\\frac{R_f}{R_1} = -\\frac{100}{10} = -10$. Output $V_{\\text{out}} = -10 \\times 0.5\\text{ V} = -5.0\\text{ V}$."
        }
    ]
}

print("Electrical question bank defined.")
