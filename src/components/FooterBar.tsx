"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FooterBar() {
  // Framer Motion staggered animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each column appearing
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  return (
    <footer className="w-full bg-[#2B4739] text-[#F7F1E6] rounded-t-[3rem] mt-20 pt-20 pb-16 px-6 md:px-20 relative z-30 shadow-[0_-10px_40px_rgba(43,71,57,0.15)]">
      <motion.div 
        className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of footer is in view
      >
        
        {/* Column 1: Brand & Logo */}
        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          {/* We wrap the logo in a subtle cream background pill so the dark text of the logo doesn't get lost on the dark green background */}
          <div className="bg-[#F7F1E6] p-3 rounded-2xl w-fit shadow-lg">
            <Image alt="Alcove Logo" className="object-contain h-18 w-auto" height={70} src="/logo.png" width={160}/>
          </div>
          <p className="text-[#F7F1E6]/80 text-sm max-w-[200px] leading-relaxed mt-2">
            © 2024 Alcove Experiences.<br/>Handcrafted with care.
          </p>
        </motion.div>

        {/* Column 2: Company Links */}
        <motion.div variants={itemVariants} className="flex flex-col gap-5">
          <span className="text-sm font-bold tracking-[0.15em] uppercase text-[#F7F1E6]">Company</span>
          <Link className="text-[#F7F1E6]/80 hover:text-white transition-colors duration-300" href="/about">About</Link>
          <Link className="text-[#F7F1E6]/80 hover:text-white transition-colors duration-300" href="/careers">Careers</Link>
          <Link className="text-[#F7F1E6]/80 hover:text-white transition-colors duration-300" href="/press">Press</Link>
        </motion.div>

        {/* Column 3: Support Links */}
        <motion.div variants={itemVariants} className="flex flex-col gap-5">
          <span className="text-sm font-bold tracking-[0.15em] uppercase text-[#F7F1E6]">Support</span>
          <Link className="text-[#F7F1E6]/80 hover:text-white transition-colors duration-300" href="/help">Help Center</Link>
          <Link className="text-[#F7F1E6]/80 hover:text-white transition-colors duration-300" href="/contact">Contact Us</Link>
          <Link className="text-[#F7F1E6]/80 hover:text-white transition-colors duration-300" href="/cancellation">Cancellation Policy</Link>
        </motion.div>

        {/* Column 4: Explore Links */}
        <motion.div variants={itemVariants} className="flex flex-col gap-5">
          <span className="text-sm font-bold tracking-[0.15em] uppercase text-[#F7F1E6]">Explore</span>
          <Link className="text-[#F7F1E6]/80 hover:text-white transition-colors duration-300" href="/explore">Experiences</Link>
          <Link className="text-[#F7F1E6]/80 hover:text-white transition-colors duration-300" href="/host">Host an Experience</Link>
          <Link className="text-[#F7F1E6]/80 hover:text-white transition-colors duration-300" href="/gift-cards">Gift Cards</Link>
        </motion.div>

      </motion.div>
    </footer>
  );
}