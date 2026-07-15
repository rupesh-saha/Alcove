"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

// Interface matching your MongoDB schema
interface Experience {
  _id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  duration: number;
  groupSizeMax: number;
  skillLevel: string;
  location: string;
  city: string;
  images: string[];
  whatsIncluded: string[];
  language: string;
  avgRating: number;
  reviewCount: number;
}

export default function ExperienceDetailsPage() {
  const params = useParams();
  const slug = params.slug; // This grabs the slug from the URL!

  const [experience, setExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/experiences/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setExperience(data);
      } catch (error) {
        console.error("Error loading experience:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) fetchExperience();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-pulse text-ink/50 text-lg font-serif">Loading experience...</div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <h1 className="text-3xl font-serif text-ink">Experience not found.</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pb-24">
      {/* Hero Image Section */}
      <div className="relative w-full h-[50vh] md:h-[65vh] bg-secondary">
        <Image
          src={experience.images[0] || "/placeholder.jpg"}
          alt={experience.title}
          fill
          className="object-cover opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 -mt-32 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Details */}
          <div className="flex-1 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#e8dac7]/30">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-primary mb-4">
                <span>{experience.category}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#dcc1b8]"></span>
                <span>{experience.city}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-serif text-ink leading-tight mb-6">
                {experience.title}
              </h1>

              {/* Quick Info Bar */}
              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-[#e8dac7]/50 mb-8 text-ink/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>{experience.duration} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>Up to {experience.groupSizeMax} people</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  <span>{experience.avgRating.toFixed(1)} ({experience.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <h3 className="text-2xl font-serif text-ink mb-4">Overview</h3>
              <p className="text-lg text-ink/70 leading-relaxed mb-10 whitespace-pre-line">
                {experience.fullDescription}
              </p>

              {/* What's Included */}
              <h3 className="text-2xl font-serif text-ink mb-4">What's Included</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {experience.whatsIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-ink/80">
                    <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-xl border border-[#e8dac7]/30">
              <div className="mb-6">
                <span className="text-3xl font-bold text-ink">${experience.price}</span>
                <span className="text-ink/60 font-medium"> / person</span>
              </div>
              
              {/* Dummy Form Elements for UI */}
              <div className="space-y-4 mb-8">
                <div className="border border-[#e8dac7] rounded-xl p-4">
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">Date</label>
                  <div className="text-ink/70">Select a date</div>
                </div>
                <div className="border border-[#e8dac7] rounded-xl p-4">
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">Guests</label>
                  <div className="text-ink/70">1 Guest</div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-[#a54f2f] text-white font-semibold py-6 rounded-xl text-lg shadow-md transition-all">
                Reserve Now
              </Button>
              
              <p className="text-center text-sm text-ink/50 mt-4">You won't be charged yet</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}