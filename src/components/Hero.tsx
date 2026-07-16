"use client";

import React from "react";
import Image from "next/image";
// 1. Import Variants from framer-motion
import { motion, Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Magnifier } from "@gravity-ui/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Link from "next/link";

export default function Hero() {
  // 2. Explicitly type as Variants
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

  const swiperImages = [
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      <section className="w-full max-w-screen-2xl mx-auto px-6 md:px-20 pt-12 md:pt-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            animate="show" 
            className="flex flex-col gap-6"
          >
            <motion.span variants={fadeUp} className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              Find your next experience
            </motion.span>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-serif text-ink leading-[1.1] tracking-tight">
              Discover the <span className="italic text-[#55433c]">art of making</span> something beautiful.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-[#55433c] text-lg max-w-md leading-relaxed mt-2">
              Connect with local artisans and masters. Book intimate, hands-on workshops in your city.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-4 flex flex-row items-center bg-white rounded-full p-1.5 sm:p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-xl border border-[#dcc1b8]/30">
              <div className="flex-1 px-3 sm:px-4 flex items-center gap-2 border-r border-gray-100 min-w-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="text" placeholder="Location" className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-ink placeholder-gray-400 min-w-0" readOnly />
              </div>
              <div className="flex-1 px-3 sm:px-4 flex items-center gap-2 min-w-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <input type="text" placeholder="Category" className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-ink placeholder-gray-400 min-w-0" readOnly />
              </div>
              <button className="flex shrink-0 justify-center items-center bg-primary text-white p-2.5 sm:p-3.5 rounded-full hover:bg-[#a54f2f] transition-colors shadow-md">
                <Magnifier height={18} width={18} />
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6 w-full sm:w-auto">
              <Link href="/explore" className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-[#a54f2f] transition-all shadow-[0_8px_20px_rgba(193,97,60,0.25)] hover:shadow-[0_12px_24px_rgba(193,97,60,0.35)] whitespace-nowrap">
                Explore Experiences
              </Link>
              <Link href="/signup" className="group w-full sm:w-auto text-ink font-semibold flex items-center justify-center sm:justify-start gap-2 hover:text-primary transition-colors py-4 px-2 whitespace-nowrap">
                Become a Host
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-[#e9e1db]"
          >
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              className="w-full h-full custom-swiper"
            >
              {swiperImages.map((src, index) => (
                <SwiperSlide key={index}>
                  <Image 
                    src={src}
                    alt={`Experience category ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-[10000ms] ease-linear hover:scale-110"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="absolute bottom-8 left-8 z-10 bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 flex items-center gap-2 shadow-xl border border-white/20">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-ink">4.9 <span className="font-medium text-gray-500">· 12,000+ experiences booked</span></span>
            </div>
          </motion.div>

        </div>
      </section>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-screen-2xl mx-auto px-6 md:px-20 -mt-24 relative z-20"
      >
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-[#dcc1b8]/20 flex flex-col lg:flex-row justify-between items-center gap-10">
          
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-serif text-ink mb-2">Find your kind of hands-on.</h3>
            <p className="text-[#55433c]">Explore featured categories.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button className="flex flex-col items-center justify-center gap-3 w-28 h-28 rounded-2xl border border-gray-100 bg-white hover:border-primary hover:shadow-lg transition-all group">
              <svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="text-xs font-bold text-ink tracking-wide">Cooking</span>
            </button>
            
            <button className="flex flex-col items-center justify-center gap-3 w-28 h-28 rounded-2xl border border-gray-100 bg-white hover:border-primary hover:shadow-lg transition-all group">
              <svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xs font-bold text-ink tracking-wide">Pottery</span>
            </button>

            <button className="flex flex-col items-center justify-center gap-3 w-28 h-28 rounded-2xl border border-gray-100 bg-white hover:border-primary hover:shadow-lg transition-all group">
              <svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span className="text-xs font-bold text-ink tracking-wide">Art</span>
            </button>

            <button className="flex flex-col items-center justify-center gap-3 w-28 h-28 rounded-2xl border border-gray-100 bg-white hover:border-primary hover:shadow-lg transition-all group">
              <svg className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-xs font-bold text-ink tracking-wide">Outdoors</span>
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}