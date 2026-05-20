"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

type RingConfig = {
  name: string;
  radiusEnd: string;
  radiusStart: string;
  imageClassName: string;
  slotSweep: number;
  duration: number;
  spinDuration: number;
  direction: "cw" | "ccw";
  angleOffset: number;
  chairs: { src: string; alt: string }[];
};

const chairLibrary = [
  "索涅特椅-removebg-preview.png",
  "寻找现代史椅子图片__1__副本-removebg-preview.png",
  "寻找现代史椅子图片__1__副本2-removebg-preview.png",
  "寻找现代史椅子图片__1__副本3-removebg-preview.png",
  "寻找现代史椅子图片__1_-removebg-preview.png",
  "寻找现代史椅子图片__2__副本-removebg-preview.png",
  "寻找现代史椅子图片__2__副本2-removebg-preview.png",
  "寻找现代史椅子图片__2_-removebg-preview.png",
  "寻找现代史椅子图片__3__副本-removebg-preview.png",
  "寻找现代史椅子图片__3__副本2-removebg-preview.png",
  "寻找现代史椅子图片__3_-removebg-preview.png",
  "寻找现代史椅子图片__4__副本-removebg-preview.png",
  "寻找现代史椅子图片__4__副本2-removebg-preview.png",
  "寻找现代史椅子图片__4_-removebg-preview.png",
  "寻找现代史椅子图片__5__副本-removebg-preview.png",
  "寻找现代史椅子图片__5_-removebg-preview.png",
  "寻找现代史椅子图片__6_-removebg-preview.png",
  "寻找现代史椅子图片__7_-removebg-preview.png",
  "寻找现代史椅子图片_副本-removebg-preview.png",
  "寻找现代史椅子图片_副本2-removebg-preview.png",
  "寻找现代史椅子图片_副本3-removebg-preview.png",
  "寻找现代史椅子图片-removebg-preview.png",
].map((filename, index) => ({
  src: `/chairs-new/${encodeURIComponent(filename)}`,
  alt: `Classic chair ${index + 1}`,
}));

const outerChairs = chairLibrary.filter((_, index) => index % 2 === 0);
const innerChairs = chairLibrary.filter((_, index) => index % 2 === 1);

const RINGS: RingConfig[] = [
  {
    name: "outer",
    radiusEnd: "44vmax",
    radiusStart: "55vmax",
    imageClassName:
      "h-[min(19.3vmin,9.1rem)] max-w-[min(15.6vmin,7.64rem)] md:h-[min(16.3vmin,9.24rem)] md:max-w-[min(13.3vmin,7.77rem)]",
    slotSweep: 20,
    duration: 2550,
    spinDuration: 220000,
    direction: "cw",
    angleOffset: -8,
    chairs: outerChairs,
  },
  {
    name: "inner",
    radiusEnd: "31vmax",
    radiusStart: "39.5vmax",
    imageClassName:
      "h-[min(16.7vmin,8rem)] max-w-[min(13.45vmin,6.6rem)] md:h-[min(14.3vmin,8.05rem)] md:max-w-[min(11.5vmin,6.7rem)]",
    slotSweep: -15,
    duration: 2250,
    spinDuration: 170000,
    direction: "ccw",
    angleOffset: 4,
    chairs: innerChairs,
  },
];

export function ChairOrbitRing() {
  const longestEntrance = Math.max(
    ...RINGS.flatMap((ring, ringIndex) =>
      ring.chairs.map((_, index) => 170 + index * 48 + ringIndex * 180 + ring.duration)
    )
  );

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 h-[119vmax] w-[119vmax] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <div className="absolute inset-0 origin-center scale-x-[0.93] scale-y-[1.06]">
        {RINGS.map((ring, ringIndex) => {
          const ringStyle = {
            ["--spin-duration" as string]: `${ring.spinDuration}ms`,
            ["--spin-delay" as string]: `${longestEntrance}ms`,
          } satisfies CSSProperties;

          const ringClassName =
            ring.direction === "cw"
              ? "ring-spin-cw absolute inset-0"
              : "ring-spin-ccw absolute inset-0";

          return (
            <div key={ring.name} className={ringClassName} style={ringStyle}>
              {ring.chairs.map((chair, index) => {
                const slotDeg =
                  (360 / ring.chairs.length) * index + ring.angleOffset + ringIndex * 9;
                const style = {
                  transform: `rotate(${slotDeg}deg) translateY(-${ring.radiusEnd}) scale(1)`,
                  ["--slot" as string]: `${slotDeg}deg`,
                  ["--radius-start" as string]: ring.radiusStart,
                  ["--radius-end" as string]: ring.radiusEnd,
                  ["--sweep" as string]: `${ring.slotSweep}deg`,
                  ["--scale-start" as string]: ringIndex === 0 ? "1.12" : "1.08",
                  ["--duration" as string]: `${ring.duration}ms`,
                  ["--delay" as string]: `${170 + index * 48 + ringIndex * 180}ms`,
                } satisfies CSSProperties;

                return (
                  <div
                    key={`${ring.name}-${index}-${chair.src}`}
                    className="chair-orbit-settle absolute left-1/2 top-1/2 h-0 w-0"
                    style={style}
                  >
                    <div className="-translate-x-1/2 -translate-y-1/2">
                      <div
                        className="flex items-center justify-center"
                        style={{ transform: "rotate(180deg)" }}
                      >
                        <Image
                          src={chair.src}
                          alt={chair.alt}
                          width={160}
                          height={190}
                          className={`${ring.imageClassName} w-auto object-contain opacity-[0.98] drop-shadow-[0_10px_26px_rgba(0,0,0,0.07)]`}
                          sizes="(max-width: 768px) 14vmin, 6rem"
                          priority={index < 5 && ringIndex === 0}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
