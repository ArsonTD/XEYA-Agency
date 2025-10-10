"use client";
import { useEffect, useRef } from "react";

const clients = [
  { name: "Netflix", logo: "NETFLIX" },
  { name: "Google", logo: "GOOGLE" },
  { name: "Microsoft", logo: "MICROSOFT" },
  { name: "Amazon", logo: "AMAZON" },
  { name: "Meta", logo: "META" },
  { name: "Apple", logo: "APPLE" },
  { name: "Tesla", logo: "TESLA" },
  { name: "Spotify", logo: "SPOTIFY" },
];

export default function ClientCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="relative py-6 bg-black/80">
      <div className="max-w-9xl mx-auto px-6">
        <div ref={scrollRef} className="overflow-hidden">
          <div className="flex gap-8 md:gap-12 w-max">
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex items-center justify-center min-w-[200px] md:min-w-[200px]"
              >
                <span className="text-lg md:text-xl font-semibold text-gray-400 hover:text-gray-300 transition-colors">
                  {client.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
