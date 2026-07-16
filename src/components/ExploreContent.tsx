"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
// 1. Import Variants from framer-motion
import { motion, Variants } from "framer-motion";
import { Pagination } from "@heroui/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation"; 

interface Experience {
  _id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  price: number;
  images: string[];
  avgRating: number;
  reviewCount: number;
}

const formatCategory = (category: string) => {
  const map: Record<string, string> = {
    cooking: "Culinary",
    pottery: "Artisan",
    art: "Creative",
    outdoor: "Nature Walks",
  };
  return map[category] || category;
};

// 2. Explicitly type as Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

// 3. Explicitly type as Variants
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ExploreContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    const currentCategory = searchParams.get("category") || "all";
    const currentPage = Number(searchParams.get("page")) || 1;

    if (searchQuery === currentSearch && selectedCategory === currentCategory && page === currentPage) {
      return; 
    }

    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) params.set("search", searchQuery);
    else params.delete("search");

    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory);
    else params.delete("category");

    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchQuery, selectedCategory, page, pathname, router, searchParams]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const fetchExperiences = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: "9",
          search: searchQuery,
          category: selectedCategory,
        });

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/experiences?${params}`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const result = await res.json();
        
        setExperiences(result.data);
        setTotalPages(result.totalPages === 0 ? 1 : result.totalPages);
      } catch (error) {
        console.error("Error loading experiences:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchExperiences();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [page, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-surface py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-serif text-ink tracking-tight mb-4">
            Explore Experiences
          </h1>
          <p className="text-lg text-ink/70 max-w-2xl mb-8">
            Discover hands-on workshops and masterclasses led by local artisans.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl">
            <input 
              type="text" 
              placeholder="Search experiences by title..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-white border border-[#dcc1b8]/60 rounded-xl px-5 py-3.5 text-ink placeholder-ink/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
            />
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="sm:w-64 bg-white border border-[#dcc1b8]/60 rounded-xl px-5 py-3.5 text-ink focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm cursor-pointer appearance-none"
            >
              <option value="all">All Categories</option>
              <option value="cooking">Culinary</option>
              <option value="pottery">Artisan</option>
              <option value="art">Creative</option>
              <option value="outdoor">Nature Walks</option>
            </select>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-[1.25rem] h-[420px] shadow-sm animate-pulse flex flex-col">
                <div className="h-56 bg-[#e8dac7]/40 rounded-t-[1.25rem] w-full" />
                <div className="p-6 flex flex-col gap-4 flex-grow">
                  <div className="h-6 bg-[#e8dac7]/40 rounded w-3/4" />
                  <div className="h-4 bg-[#e8dac7]/40 rounded w-full" />
                  <div className="h-4 bg-[#e8dac7]/40 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-serif text-ink mb-2">No experiences found</h3>
            <p className="text-ink/60">Try adjusting your search or category filters.</p>
          </div>
        ) : (
          <>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-16"
            >
              {experiences.map((exp) => (
                <motion.div key={exp._id} variants={itemVariants}>
                  <Link href={`/experiences/${exp.slug}`} className="block group h-full">
                    <div className="bg-white rounded-[1.25rem] flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden border border-ink/5">
                      
                      <div className="relative h-56 w-full overflow-hidden">
                        <Image
                          src={exp.images[0] || "/placeholder.jpg"}
                          alt={exp.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded shadow-sm">
                          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-ink">
                            {formatCategory(exp.category)}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-serif font-semibold text-ink mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-ink/70 line-clamp-2 mb-6 leading-relaxed flex-grow">
                          {exp.shortDescription}
                        </p>
                        
                        <div className="mt-auto flex justify-between items-center pt-5 border-t border-[#e8dac7]/50">
                          <div className="flex items-baseline gap-1">
                            <span className="font-bold text-lg text-primary">${exp.price}</span>
                            <span className="text-xs text-ink/60 font-medium">/ person</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-primary pb-[1px]" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="text-sm font-semibold text-ink">
                              {exp.avgRating > 0 ? exp.avgRating.toFixed(1) : "New"}
                            </span>
                            {exp.reviewCount > 0 && (
                              <span className="text-xs text-ink/50">({exp.reviewCount})</span>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <Pagination className="justify-center">
                  <Pagination.Content>
                    <Pagination.Item>
                      <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
                        <Pagination.PreviousIcon />
                        <span>Previous</span>
                      </Pagination.Previous>
                    </Pagination.Item>
                    
                    {Array.from({length: totalPages}, (_, i) => i + 1).map((p) => (
                      <Pagination.Item key={p}>
                        <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                          {p}
                        </Pagination.Link>
                      </Pagination.Item>
                    ))}
                    
                    <Pagination.Item>
                      <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
                        <span>Next</span>
                        <Pagination.NextIcon />
                      </Pagination.Next>
                    </Pagination.Item>
                  </Pagination.Content>
                </Pagination>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}