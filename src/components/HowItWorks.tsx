"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

export default function HowItWorks() {
  // 2. Explicitly type as Variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full mt-12">
      <section className="w-full bg-primary text-white py-24 relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-20 text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-16">How it works.</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              { icon: "🔍", title: "Discover", desc: "Browse curated experiences hosted by passionate local artisans." },
              { icon: "📅", title: "Book", desc: "Reserve your spot in an intimate, small-group setting." },
              { icon: "⚒️", title: "Experience", desc: "Get hands-on, learn a new craft, and take home what you make." }
            ].map((step, i) => (
              <motion.div key={i} variants={item} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-2xl mb-2 backdrop-blur-sm">
                  {step.icon}
                </div>
                <h4 className="text-2xl font-bold">{step.title}</h4>
                <p className="text-white/80 max-w-xs">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Impact Stats & Elena Spotlight */}
      <section className="w-full bg-secondary text-surface pt-16 pb-32 relative rounded-b-[3rem]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-20">
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-24">
            {[
              { val: "12k+", label: "Experiences Booked" },
              { val: "500+", label: "Master Artisans" },
              { val: "4.9", label: "Average Rating" },
              { val: "50+", label: "Cities Worldwide" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-4xl md:text-5xl mb-1 font-serif">{stat.val}</span>
                <span className="text-xs font-bold tracking-widest uppercase text-surface/60">{stat.label}</span>
              </div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface text-ink rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="w-full md:w-1/2 aspect-[4/5] relative rounded-[1.5rem] overflow-hidden shadow-lg">
              <Image 
                src="https://images.pexels.com/photos/34951346/pexels-photo-34951346.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
                alt="Rafael the Sculpturist"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Behind the Craft</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-tight">Meet Rafael,<br/>Master Sculpturist</h2>
              <p className="text-lg leading-relaxed text-[#55433c]">
                "Sculpture isn't just about creating a form; it's about capturing the essence of life. Every piece of clay holds a story, and I love helping my students discover theirs."
              </p>
              <p className="text-[#55433c]">
                Rafael has been sculpting for over 20 years. His studio in the heart of Barcelona is a sanctuary for those looking to disconnect from the digital world.
              </p>
              <a href="#" className="font-semibold text-primary flex items-center gap-2 hover:gap-4 transition-all">
                Read his story →
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}