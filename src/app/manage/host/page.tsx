"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Experience {
  _id: string;
  title: string;
  category: string;
  price: number;
  status: "active" | "draft";
  bookingCount: number;
  location: string;
  images: string[];
}

export default function ManageExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "draft">("all");
  const [isLoading, setIsLoading] = useState(true);

  const fetchExperiences = async (status: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/manage/experiences?status=${status}`);
      const data = await res.json();
      setExperiences(data);
    } catch (err) {
      console.error("Failed to load listings", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/experiences/${id}`, { 
      method: "DELETE" 
    });
    
    fetchExperiences(activeTab);
  };

  return (
    <div className="min-h-screen bg-surface py-12 px-6 md:px-24">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-5xl font-serif text-ink tracking-tight">Manage Your Experiences</h1>
          <p className="mt-2 text-ink/70">Oversee your active listings, drafts, and bookings.</p>
        </div>
        <Link 
          href="/manage/host/new" 
          className="bg-primary hover:bg-[#a54f2f] text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all"
        >
          <span>+ Add New</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 mb-8 border-b border-[#e8dac7]">
        {(["all", "active", "draft"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize font-medium ${
              activeTab === tab ? "text-primary border-b-2 border-primary" : "text-ink/50"
            }`}
          >
            {tab} Experiences {tab !== "all" && `(${experiences.filter(e => e.status === tab).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-ink/5 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-surface/50 text-xs font-bold uppercase tracking-wider text-ink/60 border-b border-ink/5">
          <div className="col-span-5">Listing</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-2">Bookings</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-ink/50 italic">Loading your listings...</div>
        ) : experiences.length === 0 ? (
          <div className="p-12 text-center text-ink/50">No experiences found in this category.</div>
        ) : (
          experiences.map((exp) => (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              key={exp._id} 
              className="grid grid-cols-12 gap-4 px-6 py-5 items-center border-b border-ink/5 last:border-0 hover:bg-surface/30 transition-colors"
            >
              <div className="col-span-5 flex items-center gap-4">
                <div className="w-16 h-12 rounded-lg bg-surface relative overflow-hidden">
                  {exp.images[0] && <Image src={exp.images[0]} alt={exp.title} fill className="object-cover" />}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-ink">{exp.title}</h3>
                  <p className="text-xs text-ink/60">{exp.location}</p>
                </div>
              </div>
              <div className="col-span-2 text-ink/80">{exp.category}</div>
              <div className="col-span-1 font-bold text-ink">${exp.price}</div>
              <div className="col-span-2 flex items-center gap-2 text-ink/80">
                <svg className="w-4 h-4 text-ink/40" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                {exp.bookingCount > 0 ? exp.bookingCount : "--"}
              </div>
              <div className="col-span-1">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  exp.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-ink/5 text-ink/60'
                }`}>
                  {exp.status}
                </span>
              </div>
              <div className="col-span-1 flex justify-end gap-3 text-ink/60">
                <Link href={`/manage/host/edit/${exp._id}`} className="hover:text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-14.14-8.636L16.172 2.828a2 2 0 012.828 0l2.122 2.122a2 2 0 010 2.828L10.344 18.344"/></svg>
                </Link>
                <button onClick={() => handleDelete(exp._id)} className="hover:text-red-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}