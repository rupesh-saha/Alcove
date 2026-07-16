"use client";

import React from "react";
import Image from "next/image";
// 1. Import Variants from framer-motion
import { motion, Variants } from "framer-motion";

export default function ContactPage() {
  const mapImageUrl = "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop";

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

  return (
    <div className="w-full bg-surface min-h-screen flex flex-col items-center pb-24 md:pb-32">
      
      {/* 1. Header Section */}
      <section className="w-full max-w-screen-2xl mx-auto px-6 md:px-20 pt-24 md:pt-32 pb-12 md:pb-20 text-center">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="max-w-3xl mx-auto flex flex-col gap-6"
        >
          <motion.span variants={fadeUp} className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Here for you
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-serif text-ink leading-tight tracking-tight">
            Get in Touch
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#55433c] leading-relaxed max-w-2xl mx-auto">
            We're here to help you craft your next unforgettable journey. Reach out with questions, special requests, or just to say hello.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="w-full max-w-screen-2xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start">
          
          {/* Left: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(38,35,31,0.06)] border border-[#dcc1b8]/20"
          >
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-ink">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="Jane" 
                    className="w-full bg-surface border border-transparent focus:border-primary text-ink placeholder-[#89726b] px-5 py-4 rounded-xl outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-ink">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Doe" 
                    className="w-full bg-surface border border-transparent focus:border-primary text-ink placeholder-[#89726b] px-5 py-4 rounded-xl outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-ink">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="jane@example.com" 
                  className="w-full bg-surface border border-transparent focus:border-primary text-ink placeholder-[#89726b] px-5 py-4 rounded-xl outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-semibold text-ink">Subject</label>
                <div className="relative">
                  <select 
                    id="subject" 
                    className="w-full bg-surface border border-transparent focus:border-primary text-ink px-5 py-4 rounded-xl outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="booking">Booking Inquiry</option>
                    <option value="host">Host Support</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#89726b]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-ink">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  placeholder="How can we assist you?" 
                  className="w-full bg-surface border border-transparent focus:border-primary text-ink placeholder-[#89726b] px-5 py-4 rounded-xl outline-none transition-all resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="mt-4 bg-primary text-white font-semibold py-4 px-8 rounded-full hover:bg-[#a54f2f] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 w-full md:w-auto md:self-start group"
              >
                Send Message
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </form>
          </motion.div>

          {/* Right: Info Card & Map */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Contact Info Card */}
            <div className="bg-secondary rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col text-surface">
              <h2 className="text-3xl font-serif mb-10">Contact Information</h2>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-xs font-bold tracking-widest text-surface/60 uppercase mb-1">Email</span>
                    <a href="mailto:hello@alcove.com" className="text-lg hover:text-primary transition-colors">hello@alcove.com</a>
                  </div>
                </div>

                <div className="w-full h-px bg-surface/10" />

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-xs font-bold tracking-widest text-surface/60 uppercase mb-1">Phone</span>
                    <a href="tel:+18001234567" className="text-lg hover:text-primary transition-colors">+1 (800) 123-4567</a>
                  </div>
                </div>

                <div className="w-full h-px bg-surface/10" />

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-surface/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-xs font-bold tracking-widest text-surface/60 uppercase mb-1">Headquarters</span>
                    <p className="text-lg leading-snug">123 Artisan Way<br/>Portland, OR 97204</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-[250px] relative rounded-[2rem] overflow-hidden shadow-xl border border-[#dcc1b8]/30">
              <Image 
                alt="Stylized map of headquarters" 
                className="object-cover grayscale opacity-80 mix-blend-multiply transition-transform duration-[8000ms] hover:scale-110" 
                fill 
                src={mapImageUrl}
              />
              <div className="absolute inset-0 bg-[#e9e1db]/20 mix-blend-overlay" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11.5C10.6193 11.5 9.5 10.3807 9.5 9C9.5 7.61929 10.6193 6.5 12 6.5C13.3807 6.5 14.5 7.61929 14.5 9C14.5 10.3807 13.3807 11.5 12 11.5Z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Mini FAQ Section */}
      <section className="w-full max-w-4xl mx-auto px-6 mt-24">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col gap-6"
        >
          <motion.h2 variants={fadeUp} className="text-3xl font-serif text-ink text-center mb-6">
            Quick Answers
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-[#dcc1b8]/20 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-bold text-ink mb-3">How quickly can I expect a response?</h3>
              <p className="text-[#55433c] text-sm leading-relaxed">
                We aim to respond to all inquiries within 24 hours during regular business days. For urgent matters regarding an upcoming experience, please use the phone number provided.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="bg-white rounded-2xl p-8 border border-[#dcc1b8]/20 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-bold text-ink mb-3">Can I modify an existing booking?</h3>
              <p className="text-[#55433c] text-sm leading-relaxed">
                Yes, most bookings can be modified up to 72 hours before the start time. You can do this directly through your account dashboard or by reaching out to us here.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}