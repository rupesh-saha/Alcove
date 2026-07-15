"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // 1. Import Better Auth

export default function NewExperiencePage() {
  const router = useRouter();
  
  const { data: session, isPending } = authClient.useSession();

  const [formData, setFormData] = useState({
    title: "", category: "cooking", shortDescription: "", fullDescription: "",
    price: "", duration: "", groupSizeMax: "", skillLevel: "beginner",
    location: "", city: "", images: "", whatsIncluded: "", language: "English"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isPending) return <div className="min-h-screen flex items-center justify-center bg-surface">Loading...</div>;
  if (!session?.user) return <div className="min-h-screen flex items-center justify-center bg-surface">Please log in.</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = { ...formData, host_id: session.user.id };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/experiences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Experience successfully created as a draft!");
        router.refresh(); // 5. CLEAR CACHE before redirecting
        router.push("/manage/host");
      } else {
        alert("Failed to save experience. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-5 py-4 rounded-xl border border-[#e8dac7]/80 bg-surface/30 focus:bg-white focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all text-ink placeholder-ink/40";
  const labelClass = "block text-sm font-bold tracking-wide uppercase text-ink/70 mb-2";

  return (
    <div className="min-h-screen bg-surface py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif text-ink tracking-tight mb-4">
            List a New Experience
          </h1>
          <p className="text-lg text-ink/70 max-w-xl mx-auto">
            Craft the perfect listing to invite guests into your world. Share your passion, set your terms, and welcome new connections.
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-ink/5">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section: Basic Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-serif text-ink border-b border-[#e8dac7]/60 pb-2">Basic Info</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className={labelClass}>Experience Title</label>
                  <input required placeholder="e.g. Hand-building Clay Sculptures" className={inputClass} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <select className={inputClass} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="cooking">Culinary</option>
                    <option value="pottery">Artisan</option>
                    <option value="art">Creative</option>
                    <option value="outdoor">Nature Walks</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Short Description (Summary)</label>
                <textarea required placeholder="A brief, catchy summary of what guests will do..." className={`${inputClass} min-h-[100px]`} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} />
              </div>

              <div>
                <label className={labelClass}>Full Description</label>
                <textarea required placeholder="Describe the full experience, step by step..." className={`${inputClass} min-h-[200px]`} onChange={(e) => setFormData({...formData, fullDescription: e.target.value})} />
              </div>
            </div>

            <div className="space-y-6 pt-6">
              <h2 className="text-2xl font-serif text-ink border-b border-[#e8dac7]/60 pb-2">Logistics & Pricing</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>Price ($ / Person)</label>
                  <input type="number" required placeholder="e.g. 120" className={inputClass} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Duration</label>
                  <input required placeholder="e.g. 3 hours" className={inputClass} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Max Group Size</label>
                  <input type="number" required placeholder="e.g. 8" className={inputClass} onChange={(e) => setFormData({...formData, groupSizeMax: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>City</label>
                  <input required placeholder="e.g. Brooklyn, NY" className={inputClass} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
                <div>
                  <label className={labelClass}>Exact Location / Spot</label>
                  <input required placeholder="e.g. 123 Artisan Ave, Studio 4" className={inputClass} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>
            </div>

            {/* Section: Media & Extras */}
            <div className="space-y-6 pt-6">
              <h2 className="text-2xl font-serif text-ink border-b border-[#e8dac7]/60 pb-2">Media & Details</h2>

              <div>
                <label className={labelClass}>Image URLs</label>
                <input required placeholder="Paste image links, separated by commas" className={inputClass} onChange={(e) => setFormData({...formData, images: e.target.value})} />
                <p className="text-xs text-ink/50 mt-2">For now, paste direct image URLs (e.g., Unsplash links). We will add image uploads later.</p>
              </div>

              <div>
                <label className={labelClass}>What's Included</label>
                <input required placeholder="e.g. All clay materials, 2 glasses of wine, Glazing and firing" className={inputClass} onChange={(e) => setFormData({...formData, whatsIncluded: e.target.value})} />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-8">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg tracking-wide hover:bg-[#a54f2f] transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving Draft..." : "Save as Draft"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}