"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="w-full bg-[#F7F1E6] flex flex-col items-center">
      
      {/* 1. Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000&auto=format&fit=crop" 
          alt="Warm, sunlit artisanal pottery studio" 
          fill 
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#26231F]/40 mix-blend-overlay" />
        
        <motion.div 
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative z-10 text-center max-w-4xl bg-[#F7F1E6]/90 p-10 md:p-16 rounded-[2rem] backdrop-blur-md shadow-[0_20px_60px_rgba(38,35,31,0.15)] mx-6"
        >
          <h1 className="text-4xl md:text-6xl font-serif text-[#26231F] mb-6 leading-tight">
            Why we started <span className="italic text-[#c1613c]">Alcove</span>
          </h1>
          <p className="text-lg md:text-xl text-[#55433c] font-medium leading-relaxed">
            Connecting discerning travelers with authentic, local craftsmanship and unforgettable stays.
          </p>
        </motion.div>
      </section>

      {/* 2. Our Story Section */}
      <section className="w-full max-w-screen-2xl mx-auto px-6 md:px-20 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="order-2 md:order-1 flex flex-col gap-6"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold tracking-[0.2em] text-[#c1613c] uppercase">
              The Journey
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif text-[#26231F] leading-tight">
              Our Story
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-[#55433c] leading-relaxed mt-4">
              Alcove was born from a simple realization: the most memorable travel experiences aren't found in generic hotel lobbies, but in the studios of local artisans, the kitchens of passionate chefs, and the carefully curated homes of thoughtful hosts.
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-[#55433c] leading-relaxed">
              We set out to build a platform that bridges the gap between travelers seeking authenticity and creators offering unparalleled local immersion. Every space on Alcove is hand-selected for its design, warmth, and connection to its surroundings.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 md:order-2 relative w-full aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <Image 
              src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop" 
              alt="Two women in a bright kitchen laughing and preparing a meal" 
              fill 
              className="object-cover hover:scale-105 transition-transform duration-[10000ms] ease-linear"
            />
          </motion.div>

        </div>
      </section>

      {/* 3. Our Values Section */}
      <section className="w-full bg-[#2B4739] rounded-t-[3rem] py-24 md:py-32 px-6 md:px-20 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-screen-2xl mx-auto">
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16 md:mb-20"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-[#F7F1E6]/70 uppercase mb-4 block">
              What drives us
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#F7F1E6]">Our Values</h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {/* Value 1 */}
            <motion.div variants={fadeUp} className="bg-[#F7F1E6] p-10 md:p-12 rounded-[2rem] shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#c1613c]/10 text-[#c1613c] flex items-center justify-center mb-8 group-hover:bg-[#c1613c] group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#26231F] mb-4">Authentic Connection</h3>
              <p className="text-[#55433c] leading-relaxed">
                We prioritize genuine interactions over transactional stays, connecting you with the absolute heart of a locale.
              </p>
            </motion.div>

            {/* Value 2 */}
            <motion.div variants={fadeUp} className="bg-[#F7F1E6] p-10 md:p-12 rounded-[2rem] shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#2B4739]/10 text-[#2B4739] flex items-center justify-center mb-8 group-hover:bg-[#2B4739] group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#26231F] mb-4">Thoughtful Design</h3>
              <p className="text-[#55433c] leading-relaxed">
                Every Alcove space reflects a strict commitment to aesthetic quality, comfort, and harmonious architecture.
              </p>
            </motion.div>

            {/* Value 3 */}
            <motion.div variants={fadeUp} className="bg-[#F7F1E6] p-10 md:p-12 rounded-[2rem] shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#e9e1db] text-[#55433c] flex items-center justify-center mb-8 group-hover:bg-[#55433c] group-hover:text-white transition-colors duration-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-[#26231F] mb-4">Sustainable Craft</h3>
              <p className="text-[#55433c] leading-relaxed">
                We support local artisans and sustainable practices, ensuring our footprint is as light as our hospitality is warm.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}