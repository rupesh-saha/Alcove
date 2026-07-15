"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "introduction", title: "1. Introduction" },
  { id: "user-accounts", title: "2. User Accounts" },
  { id: "booking-policies", title: "3. Booking Policies" },
  { id: "cancellations", title: "4. Cancellations" },
  { id: "privacy-data", title: "5. Privacy & Data" },
];

export default function TermsAndPrivacyPage() {
  const [activeSection, setActiveSection] = useState<string>("introduction");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-surface text-ink font-sans antialiased flex flex-col">
      <main className="flex-grow pt-16 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <header className="mb-16 md:mb-24">
          <Link 
            href="/" 
            className="inline-flex items-center text-ink/60 hover:text-primary transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-4 text-ink">
            Terms & Privacy
          </h1>
          <p className="text-lg text-ink/70 max-w-2xl">
            Last updated: October 24, 2024
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* Sticky Sidebar Nav */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-24">
            <nav className="flex flex-col gap-4 border-l-2 border-[#e8dac7]/60 pl-6">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`text-sm py-1 transition-all relative ${
                    activeSection === section.id
                      ? "text-primary font-bold after:content-[''] after:absolute after:-left-[26px] after:top-1/2 after:-translate-y-1/2 after:w-[2px] after:h-full after:bg-primary"
                      : "text-ink/60 hover:text-primary"
                  }`}
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="w-full max-w-3xl flex flex-col gap-16">
            
            <section id="introduction" className="scroll-mt-32">
              <h2 className="font-serif text-3xl font-semibold mb-6 text-ink">1. Introduction</h2>
              <div className="space-y-4 text-base md:text-lg text-ink/80 leading-relaxed">
                <p>Welcome to Alcove. These Terms of Service ("Terms") govern your access to and use of the Alcove website, mobile applications, and services (collectively, the "Platform"). By using our Platform, you agree to be bound by these Terms.</p>
                <p>Our mission is to connect curious travelers with authentic, handcrafted experiences. To maintain trust and quality within our community, we require all users to adhere to these guidelines.</p>
              </div>
            </section>

            <hr className="border-t border-[#e8dac7]" />

            <section id="user-accounts" className="scroll-mt-32">
              <h2 className="font-serif text-3xl font-semibold mb-6 text-ink">2. User Accounts</h2>
              <div className="space-y-4 text-base md:text-lg text-ink/80 leading-relaxed">
                <p>To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during registration and keep it updated.</p>
                <ul className="list-disc pl-6 space-y-3 mt-4 marker:text-primary">
                  <li>You are responsible for safeguarding your password.</li>
                  <li>You must not disclose your password to any third party.</li>
                  <li>You must immediately notify Alcove of any unauthorized use of your account.</li>
                </ul>
              </div>
            </section>

            <hr className="border-t border-[#e8dac7]" />

            <section id="booking-policies" className="scroll-mt-32">
              <h2 className="font-serif text-3xl font-semibold mb-6 text-ink">3. Booking Policies</h2>
              <div className="space-y-4 text-base md:text-lg text-ink/80 leading-relaxed">
                <p>When you book an experience through Alcove, you agree to pay the total amount presented, including the experience price and any applicable fees or taxes.</p>
                <p>Hosts are responsible for delivering the experience as described. If a Host significantly alters the experience after booking, Guests may be entitled to a refund under our Guest Refund Policy.</p>
              </div>
            </section>

            <hr className="border-t border-[#e8dac7]" />

            <section id="cancellations" className="scroll-mt-32">
              <h2 className="font-serif text-3xl font-semibold mb-6 text-ink">4. Cancellations</h2>
              <div className="space-y-4 text-base md:text-lg text-ink/80 leading-relaxed">
                <p>Cancellation policies are set by individual Hosts and clearly displayed on the experience page. Guests who cancel a booking will receive a refund in accordance with the Host's selected policy.</p>
                <p>In the event of extenuating circumstances (e.g., severe weather, documented emergencies), Alcove reserves the right to override the Host's cancellation policy.</p>
              </div>
            </section>

            <hr className="border-t border-[#e8dac7]" />

            <section id="privacy-data" className="scroll-mt-32">
              <h2 className="font-serif text-3xl font-semibold mb-6 text-ink">5. Privacy & Data</h2>
              <div className="space-y-4 text-base md:text-lg text-ink/80 leading-relaxed">
                <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and share your personal information. By using the Platform, you consent to the data practices described in our Privacy Policy.</p>
                <p>We implement appropriate technical and organizational measures to protect your personal data against accidental or unlawful destruction, loss, alteration, or unauthorized disclosure.</p>
              </div>
            </section>

            <div className="mt-8 p-8 bg-white rounded-2xl border border-[#e8dac7]/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-ink mb-2">Have questions?</h3>
                <p className="text-sm text-ink/60">Our support team is here to help clarify any terms.</p>
              </div>
              <button className="px-8 py-3.5 bg-secondary text-white font-bold text-sm tracking-wide uppercase rounded-xl hover:bg-[#3a5245] transition-colors whitespace-nowrap">
                Contact Support
              </button>
            </div>

          </article>
        </div>
      </main>
    </div>
  );
}