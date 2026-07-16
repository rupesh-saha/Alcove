"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Accordion } from "@heroui/react";
import { ChevronDown, ArrowRight } from "@gravity-ui/icons";

export default function NewsletterFAQ() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const faqItems = [
    {
      title: "Do I need any prior experience?",
      content: "Not at all! Unless specifically marked as 'Intermediate' or 'Advanced', all our workshops are designed for complete beginners. Our master artisans guide you step-by-step.",
    },
    {
      title: "What is the cancellation policy?",
      content: "You can cancel for a full refund up to 72 hours before the experience begins. Cancellations within 72 hours are non-refundable but can be transferred to a friend.",
    },
    {
      title: "How big are the workshop groups?",
      content: "We keep our groups small to ensure intimate, personalized instruction. Most workshops have between 4 to 8 participants.",
    },
  ];

  return (
    <div className="w-full flex flex-col relative z-10">
      
      {/* 1. Gift CTA Band - Refined for perfect vertical centering */}
      <section className="w-full bg-primary rounded-t-[3rem] pt-20 pb-36 px-6 md:px-20 relative z-10 mt-10">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16"
        >
          <motion.div variants={fadeUp} className="max-w-2xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-4">
              Give someone a story to tell.
            </h2>
            <p className="text-white/90 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              The gift of creativity never expires. Digital gift cards for any workshop, anywhere.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="shrink-0">
            <button className="bg-surface text-primary px-8 py-4 rounded-full font-semibold hover:bg-white hover:scale-105 transition-all duration-300 shadow-xl whitespace-nowrap">
              Give a Gift Card
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Newsletter & FAQ Split Section */}
      <section className="w-full bg-surface rounded-t-[3rem] -mt-16 pt-24 pb-12 px-6 md:px-20 relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left: Newsletter Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(38,35,31,0.06)] border border-[#dcc1b8]/20"
          >
            <span className="text-primary text-xs font-bold tracking-[0.15em] uppercase mb-4 block">
              The Weekly Craft
            </span>
            <h3 className="text-4xl font-serif text-ink mb-4">
              Join the Alcove.
            </h3>
            <p className="text-[#55433c] mb-8 leading-relaxed">
              Get early access to new experiences, artisan stories, and exclusive community events delivered to your inbox.
            </p>
            
            <form className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-surface border border-transparent focus:border-[#dcc1b8] text-ink placeholder-[#89726b] px-6 py-4 rounded-xl outline-none transition-colors"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-secondary text-white font-semibold py-4 rounded-xl hover:bg-[#1f3329] transition-colors shadow-md"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-center text-[#89726b] mt-6">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </motion.div>

          {/* Right: FAQ Accordion */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col"
          >
            <motion.h3 variants={fadeUp} className="text-3xl md:text-4xl font-serif text-ink mb-10">
              Common Questions
            </motion.h3>

            <motion.div variants={fadeUp} className="w-full">
              <Accordion className="w-full flex flex-col gap-4">
                {faqItems.map((item, index) => (
                  <Accordion.Item className="bg-white rounded-2xl px-6 md:px-8 py-2 shadow-sm border border-[#dcc1b8]/30" key={index}>
                    <Accordion.Heading>
                      <Accordion.Trigger className="w-full py-5 text-left font-semibold text-ink flex justify-between items-center group cursor-pointer hover:text-primary transition-colors">
                        <span className="pr-4">{item.title}</span>
                        <Accordion.Indicator>
                          <ChevronDown className="w-5 h-5 text-[#89726b] group-data-[open]:rotate-180 group-hover:text-primary transition-all duration-300 shrink-0"/>
                        </Accordion.Indicator>
                      </Accordion.Trigger>
                    </Accordion.Heading>
                    <Accordion.Panel>
                      <Accordion.Body className="pb-6 text-[#55433c] leading-relaxed pr-8">
                        {item.content}
                      </Accordion.Body>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8">
              <Link className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-[#a54f2f] transition-colors group" href="/help">
                See all FAQs 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}