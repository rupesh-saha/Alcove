"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateExperienceForm({ hostId }: { hostId: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "", category: "cooking", shortDescription: "", fullDescription: "",
    price: "", duration: "", groupSizeMax: "", skillLevel: "beginner",
    location: "", city: "", images: "", whatsIncluded: "", language: "English"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData, host_id: hostId };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/experiences`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Experience created as draft!");
      router.push("/manage/host/experiences");
    }
  };

  const inputClass = "w-full p-3 rounded-xl border border-[#e8dac7] bg-white focus:ring-2 focus:ring-primary outline-none";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <input required placeholder="Title" className={inputClass} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        <select className={inputClass} onChange={(e) => setFormData({...formData, category: e.target.value})}>
          <option value="cooking">Culinary</option>
          <option value="pottery">Artisan</option>
          <option value="art">Creative</option>
          <option value="outdoor">Nature Walks</option>
        </select>
      </div>

      <textarea required placeholder="Short Description" className={inputClass} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} />
      <textarea required placeholder="Full Description" className={`${inputClass} h-32`} onChange={(e) => setFormData({...formData, fullDescription: e.target.value})} />

      <div className="grid grid-cols-3 gap-6">
        <input type="number" required placeholder="Price" className={inputClass} onChange={(e) => setFormData({...formData, price: e.target.value})} />
        <input placeholder="Duration (e.g. 3 hours)" className={inputClass} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
        <input type="number" required placeholder="Max Group Size" className={inputClass} onChange={(e) => setFormData({...formData, groupSizeMax: e.target.value})} />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <input placeholder="City" className={inputClass} onChange={(e) => setFormData({...formData, city: e.target.value})} />
        <input placeholder="Location (Address/Spot)" className={inputClass} onChange={(e) => setFormData({...formData, location: e.target.value})} />
      </div>

      <input placeholder="Image URLs (comma separated)" className={inputClass} onChange={(e) => setFormData({...formData, images: e.target.value})} />
      <input placeholder="What's Included (comma separated)" className={inputClass} onChange={(e) => setFormData({...formData, whatsIncluded: e.target.value})} />

      <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-[#a54f2f] transition-all">
        Save as Draft
      </button>
    </form>
  );
}