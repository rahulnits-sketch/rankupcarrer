"use client";

import { useState } from "react";
import { X, RotateCcw, Delete } from "lucide-react";

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GateScientificCalculator({ isOpen, onClose }: CalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [isRad, setIsRad] = useState(false); // Default DEG in GATE
  const [memory, setMemory] = useState<number>(0);
  const [isNewInput, setIsNewInput] = useState(true);

  if (!isOpen) return null;

  const currentVal = parseFloat(display) || 0;

  const handleDigit = (digit: string) => {
    if (isNewInput || display === "0") {
      setDisplay(digit);
      setIsNewInput(false);
    } else {
      setDisplay((prev) => prev + digit);
    }
  };

  const handleDecimal = () => {
    if (isNewInput) {
      setDisplay("0.");
      setIsNewInput(false);
    } else if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setIsNewInput(true);
  };

  const handleBackspace = () => {
    if (display.length > 1 && !isNewInput) {
      setDisplay((prev) => prev.slice(0, -1));
    } else {
      setDisplay("0");
      setIsNewInput(true);
    }
  };

  const handleSign = () => {
    setDisplay((prev) => (parseFloat(prev) * -1).toString());
  };

  const handleOp = (op: string) => {
    setExpression((prev) => `${prev} ${display} ${op}`);
    setIsNewInput(true);
  };

  const handleEqual = () => {
    try {
      const fullExpr = `${expression} ${display}`
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/mod/g, "%");
      // Sanitize expression
      const sanitized = fullExpr.replace(/[^0-9+\-*/().%\s]/g, "");
      const result = Function(`"use strict"; return (${sanitized})`)();
      if (typeof result === "number" && !isNaN(result)) {
        setDisplay(String(Number(result.toFixed(8))));
        setExpression("");
        setIsNewInput(true);
      } else {
        setDisplay("Error");
      }
    } catch {
      setDisplay("Error");
    }
  };

  // Scientific functions
  const handleUnaryFunc = (fn: string) => {
    let angle = currentVal;
    if (!isRad && ["sin", "cos", "tan"].includes(fn)) {
      angle = (angle * Math.PI) / 180;
    }

    let res = 0;
    switch (fn) {
      case "sin":
        res = Math.sin(angle);
        break;
      case "cos":
        res = Math.cos(angle);
        break;
      case "tan":
        res = Math.tan(angle);
        break;
      case "sinh":
        res = Math.sinh(currentVal);
        break;
      case "cosh":
        res = Math.cosh(currentVal);
        break;
      case "tanh":
        res = Math.tanh(currentVal);
        break;
      case "asin":
        res = isRad ? Math.asin(currentVal) : (Math.asin(currentVal) * 180) / Math.PI;
        break;
      case "acos":
        res = isRad ? Math.acos(currentVal) : (Math.acos(currentVal) * 180) / Math.PI;
        break;
      case "atan":
        res = isRad ? Math.atan(currentVal) : (Math.atan(currentVal) * 180) / Math.PI;
        break;
      case "ln":
        res = Math.log(currentVal);
        break;
      case "log10":
        res = Math.log10(currentVal);
        break;
      case "sqrt":
        res = Math.sqrt(currentVal);
        break;
      case "cbrt":
        res = Math.cbrt(currentVal);
        break;
      case "sq":
        res = Math.pow(currentVal, 2);
        break;
      case "cube":
        res = Math.pow(currentVal, 3);
        break;
      case "exp":
        res = Math.exp(currentVal);
        break;
      case "tenPow":
        res = Math.pow(10, currentVal);
        break;
      case "recip":
        res = 1 / currentVal;
        break;
      case "fact":
        res = factorial(Math.floor(currentVal));
        break;
      default:
        res = currentVal;
    }

    if (isNaN(res) || !isFinite(res)) {
      setDisplay("Error");
    } else {
      setDisplay(String(Number(res.toFixed(8))));
    }
    setIsNewInput(true);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  };

  // Memory functions
  const handleMemory = (action: string) => {
    if (action === "MC") setMemory(0);
    else if (action === "MR") {
      setDisplay(String(memory));
      setIsNewInput(true);
    } else if (action === "MS") setMemory(currentVal);
    else if (action === "M+") setMemory((prev) => prev + currentVal);
    else if (action === "M-") setMemory((prev) => prev - currentVal);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="GATE Official Scientific Calculator"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-3"
    >
      <div className="w-full max-w-lg rounded-2xl border border-slate-300 bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header matching TCS iON GATE Virtual Calculator */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-blue-600 text-white text-[10px] font-bold">
              ∑
            </span>
            <span className="text-xs font-bold text-slate-800">
              GATE Official Scientific Calculator
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-300 hover:text-slate-800 transition"
            aria-label="Close Calculator"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Display Area */}
        <div className="bg-slate-50 p-3 border-b border-slate-200">
          <div className="flex items-center justify-between text-[11px] text-slate-500 min-h-5 font-mono">
            <span>{expression}</span>
            <div className="flex items-center gap-2 font-sans font-semibold">
              <span className={memory !== 0 ? "text-blue-600" : "opacity-30"}>M</span>
              <span className="text-slate-700 bg-slate-200/80 px-1.5 py-0.5 rounded text-[10px]">
                {isRad ? "RAD" : "DEG"}
              </span>
            </div>
          </div>
          <div className="mt-1 text-right font-mono text-2xl font-bold tracking-tight text-slate-900 overflow-x-auto">
            {display}
          </div>
        </div>

        {/* Calculator Keypad */}
        <div className="p-3 bg-white space-y-2">
          {/* Deg/Rad & Memory Bar */}
          <div className="grid grid-cols-6 gap-1 text-[11px] font-bold">
            <button
              onClick={() => setIsRad(!isRad)}
              className={`rounded-lg py-1.5 transition ${
                isRad
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {isRad ? "RAD" : "DEG"}
            </button>
            <button
              onClick={() => handleMemory("MC")}
              className="rounded-lg bg-slate-100 text-slate-700 py-1.5 hover:bg-slate-200"
            >
              MC
            </button>
            <button
              onClick={() => handleMemory("MR")}
              className="rounded-lg bg-slate-100 text-slate-700 py-1.5 hover:bg-slate-200"
            >
              MR
            </button>
            <button
              onClick={() => handleMemory("MS")}
              className="rounded-lg bg-slate-100 text-slate-700 py-1.5 hover:bg-slate-200"
            >
              MS
            </button>
            <button
              onClick={() => handleMemory("M+")}
              className="rounded-lg bg-slate-100 text-slate-700 py-1.5 hover:bg-slate-200"
            >
              M+
            </button>
            <button
              onClick={() => handleMemory("M-")}
              className="rounded-lg bg-slate-100 text-slate-700 py-1.5 hover:bg-slate-200"
            >
              M-
            </button>
          </div>

          {/* Scientific Row 1 */}
          <div className="grid grid-cols-6 gap-1 text-[11px] font-semibold text-slate-700">
            <button
              onClick={() => handleUnaryFunc("sin")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              sin
            </button>
            <button
              onClick={() => handleUnaryFunc("cos")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              cos
            </button>
            <button
              onClick={() => handleUnaryFunc("tan")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              tan
            </button>
            <button
              onClick={() => handleUnaryFunc("ln")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              ln
            </button>
            <button
              onClick={() => handleUnaryFunc("log10")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              log
            </button>
            <button
              onClick={() => handleUnaryFunc("fact")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              n!
            </button>
          </div>

          {/* Scientific Row 2 */}
          <div className="grid grid-cols-6 gap-1 text-[11px] font-semibold text-slate-700">
            <button
              onClick={() => handleUnaryFunc("sinh")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              sinh
            </button>
            <button
              onClick={() => handleUnaryFunc("cosh")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              cosh
            </button>
            <button
              onClick={() => handleUnaryFunc("tanh")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              tanh
            </button>
            <button
              onClick={() => handleUnaryFunc("sqrt")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              √x
            </button>
            <button
              onClick={() => handleUnaryFunc("sq")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              x²
            </button>
            <button
              onClick={() => handleUnaryFunc("recip")}
              className="rounded-lg bg-slate-100 py-1.5 hover:bg-blue-50 hover:text-blue-700"
            >
              1/x
            </button>
          </div>

          {/* Main Keypad Grid */}
          <div className="grid grid-cols-6 gap-1 text-xs font-bold text-slate-800 pt-1">
            <button
              onClick={() => {
                setDisplay(String(Math.PI.toFixed(8)));
                setIsNewInput(true);
              }}
              className="rounded-lg bg-slate-100 py-2 hover:bg-slate-200"
            >
              π
            </button>
            <button
              onClick={() => {
                setDisplay(String(Math.E.toFixed(8)));
                setIsNewInput(true);
              }}
              className="rounded-lg bg-slate-100 py-2 hover:bg-slate-200"
            >
              e
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg bg-rose-50 text-rose-700 py-2 hover:bg-rose-100"
            >
              C
            </button>
            <button
              onClick={handleBackspace}
              className="rounded-lg bg-rose-50 text-rose-700 py-2 hover:bg-rose-100 flex items-center justify-center"
            >
              <Delete className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleOp("%")}
              className="rounded-lg bg-slate-100 text-blue-700 py-2 hover:bg-slate-200"
            >
              mod
            </button>
            <button
              onClick={() => handleOp("÷")}
              className="rounded-lg bg-blue-50 text-blue-700 py-2 hover:bg-blue-100"
            >
              ÷
            </button>

            {/* 7 8 9 * */}
            <button
              onClick={() => handleDigit("7")}
              className="col-span-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              7
            </button>
            <button
              onClick={() => handleDigit("8")}
              className="col-span-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              8
            </button>
            <button
              onClick={() => handleDigit("9")}
              className="col-span-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              9
            </button>
            <button
              onClick={() => {
                setExpression((prev) => `${prev} (${display}`);
                setIsNewInput(true);
              }}
              className="rounded-lg bg-slate-100 py-2.5 text-slate-700 hover:bg-slate-200"
            >
              (
            </button>
            <button
              onClick={() => {
                setExpression((prev) => `${prev} ${display})`);
                setIsNewInput(true);
              }}
              className="rounded-lg bg-slate-100 py-2.5 text-slate-700 hover:bg-slate-200"
            >
              )
            </button>
            <button
              onClick={() => handleOp("×")}
              className="rounded-lg bg-blue-50 text-blue-700 py-2.5 hover:bg-blue-100"
            >
              ×
            </button>

            {/* 4 5 6 - */}
            <button
              onClick={() => handleDigit("4")}
              className="rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              4
            </button>
            <button
              onClick={() => handleDigit("5")}
              className="rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              5
            </button>
            <button
              onClick={() => handleDigit("6")}
              className="rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              6
            </button>
            <button
              onClick={() => handleUnaryFunc("exp")}
              className="rounded-lg bg-slate-100 py-2.5 text-[11px] text-slate-700 hover:bg-slate-200"
            >
              eˣ
            </button>
            <button
              onClick={() => handleUnaryFunc("tenPow")}
              className="rounded-lg bg-slate-100 py-2.5 text-[11px] text-slate-700 hover:bg-slate-200"
            >
              10ˣ
            </button>
            <button
              onClick={() => handleOp("-")}
              className="rounded-lg bg-blue-50 text-blue-700 py-2.5 hover:bg-blue-100"
            >
              −
            </button>

            {/* 1 2 3 + */}
            <button
              onClick={() => handleDigit("1")}
              className="rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              1
            </button>
            <button
              onClick={() => handleDigit("2")}
              className="rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              2
            </button>
            <button
              onClick={() => handleDigit("3")}
              className="rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              3
            </button>
            <button
              onClick={() => handleUnaryFunc("cbrt")}
              className="rounded-lg bg-slate-100 py-2.5 text-[11px] text-slate-700 hover:bg-slate-200"
            >
              ∛x
            </button>
            <button
              onClick={() => handleUnaryFunc("cube")}
              className="rounded-lg bg-slate-100 py-2.5 text-[11px] text-slate-700 hover:bg-slate-200"
            >
              x³
            </button>
            <button
              onClick={() => handleOp("+")}
              className="rounded-lg bg-blue-50 text-blue-700 py-2.5 hover:bg-blue-100"
            >
              +
            </button>

            {/* 0 . +/- = */}
            <button
              onClick={() => handleDigit("0")}
              className="col-span-2 rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="rounded-lg border border-slate-200 bg-white py-2.5 text-sm hover:bg-slate-50 shadow-2xs"
            >
              .
            </button>
            <button
              onClick={handleSign}
              className="rounded-lg bg-slate-100 py-2.5 text-slate-700 hover:bg-slate-200"
            >
              ±
            </button>
            <button
              onClick={handleEqual}
              className="col-span-2 rounded-lg bg-blue-600 text-white py-2.5 text-base font-bold shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-98 transition"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
