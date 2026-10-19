"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export const INSTITUTIONS = [
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    department: "Department of Computer Science & Engineering",
    location: "Powai, Mumbai",
    targetScore: "AIR ≤ 50 | Score: 850+",
    src: "/images/institutions/iit-bombay.jpg",
  },
  {
    id: "iit-guwahati",
    name: "IIT Guwahati",
    department: "Center for Computer Science & AI",
    location: "Guwahati, Assam",
    targetScore: "AIR ≤ 350 | Score: 730+",
    src: "/images/institutions/iit-guwahati.jpg",
  },
  {
    id: "iit-madras",
    name: "IIT Madras",
    department: "DoCSE & Pravartak Research Park",
    location: "Chennai, Tamil Nadu",
    targetScore: "AIR ≤ 120 | Score: 800+",
    src: "/images/institutions/iit-madras.jpg",
  },
  {
    id: "isro",
    name: "ISRO Research Centers",
    department: "URSC / VSSC / SAC (Scientist/Engineer 'SC')",
    location: "National Space Centers",
    targetScore: "Direct PSU Interview Call",
    src: "/images/institutions/isro.webp",
  },
];

export default function InstitutionalHeritage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    const syncRotation = () => {
      if (timer !== undefined) window.clearInterval(timer);
      if (motionPreference.matches) return;

      timer = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % INSTITUTIONS.length);
      }, 6500);
    };

    syncRotation();
    motionPreference.addEventListener("change", syncRotation);

    return () => {
      if (timer !== undefined) window.clearInterval(timer);
      motionPreference.removeEventListener("change", syncRotation);
    };
  }, []);

  return (
    <>
      {/* Dynamic Animated Institutional Background Layer across the Entire Landing Page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
      >
        {INSTITUTIONS.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
                isActive ? "opacity-35 sm:opacity-45" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={item.src}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className={`object-cover object-center ${
                  isActive
                    ? index % 2 === 0
                      ? "animate-kenburns"
                      : "animate-kenburns-alt"
                    : "scale-100"
                }`}
              />
            </div>
          );
        })}

        {/* Global Multi-layered Frosted Scrim for Complete Text Contrast & Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/65 via-[#f8fafc]/50 to-[#f8fafc]/75 backdrop-blur-[0.5px]" />

        {/* Ambient atmospheric lighting orbs for visual depth */}
        <div className="absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/2 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl animate-pulse-glow" />
      </div>
    </>
  );
}
