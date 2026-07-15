"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 

export default function SubNav() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  if (isPending || !session?.user) return null;

  const role = (session.user as { role?: string }).role || "guest";

  const getLinkStyles = (path: string, isDefaultFirstRoute: boolean = false) => {
    const isBaseManage = pathname === "/manage" || pathname === `/manage/${role}`;
    const isActive = pathname.startsWith(path) || (isDefaultFirstRoute && isBaseManage);

    return `text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap pb-1 border-b-2 ${
      isActive 
        ? "text-primary border-primary" 
        : "text-white/90 border-transparent hover:text-white hover:border-white/40" // High visibility white & bright hover states
    }`;
  };

  return (
    <div className="w-full bg-secondary border-t border-ink/10 py-4 px-6 md:px-12 lg:px-24 shadow-inner">
      <div className="max-w-9xl mx-auto flex items-center gap-8 overflow-x-auto no-scrollbar">
        
        {/* HOST LINKS */}
        {role === "host" && (
          <>
            <Link href="/manage/host" className={getLinkStyles("/manage/host", true)}>
              Manage Experiences
            </Link>
            <Link href="/manage/host/new" className={getLinkStyles("/manage/host/new")}>
              List an Experience
            </Link>
          </>
        )}

        {/* GUEST LINKS */}
        {role === "guest" && (
          <>
            <Link href="/manage/guest/bookings" className={getLinkStyles("/manage/guest/bookings", true)}>
              My Bookings
            </Link>
          </>
        )}

        {/* ADMIN LINKS */}
        {role === "admin" && (
          <>
            <Link href="/manage/admin/stats" className={getLinkStyles("/manage/admin/stats", true)}>
              Dashboard Stats
            </Link>
            <Link href="/manage/admin/clients" className={getLinkStyles("/manage/admin/clients")}>
              Manage Clients
            </Link>
            <Link href="/manage/admin/hosts" className={getLinkStyles("/manage/admin/hosts")}>
              Manage Hosts
            </Link>
          </>
        )}

      </div>
    </div>
  );
}