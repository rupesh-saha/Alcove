"use client";

import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  avatar: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Jenkins",
      location: "Austin, TX",
      quote: "The handmade pasta class was incredible. Chef Marco made everyone feel at home, and the food was to die for. Highly recommend for a unique date night!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "David Chen",
      location: "Seattle, WA",
      quote: "I've never done watercolor before, but the instructor broke it down perfectly. Spending 4 hours painting outside was so relaxing.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Emma Watson",
      location: "Brooklyn, NY",
      quote: "The pottery wheel is harder than it looks, but so much fun! Elena is a fantastic teacher. I can't wait to pick up my fired bowl.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Marcus Johnson",
      location: "Chicago, IL",
      quote: "Booked a woodworking session for my dad's birthday. We built a live-edge table and had the best afternoon. Truly memorable experience.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full py-24 bg-[#e9e1db] overflow-hidden mt-10">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-20 mb-12">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-ink">
          What our guests say
        </h2>
      </div>

      <div className="mt-12">
        <Marquee gradient={true} gradientColor="#e9e1db" gradientWidth={100} pauseOnHover={true} speed={40}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(38,35,31,0.08)] w-[320px] md:w-[400px] mx-4 flex flex-col gap-5 border border-[#dcc1b8]/10"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                  <Image alt={t.name} className="object-cover" fill sizes="48px" src={t.avatar} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-ink leading-tight">
                    {t.name}
                  </span>
                  <span className="text-sm text-[#55433c]">
                    {t.location}
                  </span>
                </div>
              </div>

              <div className="flex text-primary text-lg tracking-widest">
                ★★★★★
              </div>

              <p className="text-[#55433c] italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}