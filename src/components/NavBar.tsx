"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import { Bars, House, Magnifier, Person, Envelope } from "@gravity-ui/icons";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  // Fetch session data
  const { data: session } = authClient.useSession();

  const navItems = [
    { icon: House, label: "Home", href: "/" },
    { icon: Magnifier, label: "Explore", href: "/explore" },
    { icon: Person, label: "About", href: "/about" },
    { icon: Envelope, label: "Contact", href: "/contact" },
  ];

  const handleLogOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); 
        },
      },
    });
  };

  return (
    <header className="sticky top-0 w-full z-50 bg-surface/90 backdrop-blur-md border-b border-[#dcc1b8]/30 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-20 py-4 max-w-screen-2xl mx-auto">

        {/* Left: Logo */}
        <Link className="flex items-center" href="/">
          <Image
            alt="Alcove Logo"
            className="object-contain h-11 md:h-12 w-auto"
            height={50}
            priority
            src="/logo.png"
            width={180}
          />
        </Link>

        {/* Middle: Desktop Navigation (Framer Motion Enhanced) */}
        <nav className="hidden md:flex gap-6 items-center pt-1 relative">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <Link className="relative px-3 py-2 flex items-center group" href={item.href} key={item.label}>
                <div
                  className={`text-sm font-semibold tracking-wide z-10 flex items-center transition-colors duration-300 ${isActive ? "text-primary" : "text-[#55433c] group-hover:text-primary transition-colors duration-300"
                    }`}
                >
                  {/* Sliding Number Reveal */}
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, paddingRight: 0 }}
                      animate={{ opacity: 1, width: "auto", paddingRight: 6 }}
                      exit={{ opacity: 0, width: 0, paddingRight: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="inline-block overflow-hidden whitespace-nowrap"
                    >
                      0{index + 1}.
                    </motion.span>
                  )}
                  {item.label}
                </div>

                {/* Fluid Active Underline */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Desktop Auth Buttons / User Profile */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-5">
              <span className="text-sm font-serif italic text-[#55433c]">
                Serene, {session.user.name}
              </span>
              <Link href="/manage" className="text-sm font-semibold px-4 py-2 rounded-xl text-ink border border-[#dcc1b8]/40 bg-primary/10 hover:bg-primary/20 transition-colors">
                Manage
              </Link>
              <Button 
                onPress={handleLogOut} 
                variant="ghost" // FIX 1: Changed from "light" to "ghost"
                className="text-sm font-semibold text-primary hover:bg-primary/10 rounded-xl border-none"
                isIconOnly
                aria-label="Log Out"
              >
                {/* SVG Log out icon */}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-semibold px-6 py-2.5 rounded-xl text-ink hover:text-black hover:bg-primary/20 transition-colors">
                Log In
              </Link>
              <Link href="/signup" className="text-sm font-semibold bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-[#a54f2f] shadow-md transition-all inline-block">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <Drawer>
            <Button className="text-ink border-none" isIconOnly variant="ghost"> {/* FIX 2: Changed from "light" to "ghost" */}
              <Bars height={24} width={24} />
            </Button>
            <Drawer.Backdrop>
              <Drawer.Content className="bg-surface" placement="left">
                <Drawer.Dialog>
                  <Drawer.CloseTrigger className="text-ink" />
                  <Drawer.Header>
                    <Drawer.Heading className="text-xl font-serif text-ink">Navigation</Drawer.Heading>
                  </Drawer.Header>
                  <Drawer.Body>
                    <nav className="flex flex-col gap-2 mt-4">
                      {navItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        const displayLabel = isActive ? `0${index + 1}. ${item.label}` : item.label;

                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center gap-4 rounded-xl px-4 py-3 text-base transition-colors ${isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-[#55433c] hover:bg-[#e9e1db]"
                              }`}
                          >
                            <item.icon className={`size-5 ${isActive ? "text-primary" : "text-[#89726b]"}`} />
                            {displayLabel}
                          </Link>
                        );
                      })}

                      {/* FIXED MOBILE BUTTONS / PROFILE AREA */}
                      <div className="mt-8 flex flex-col gap-3 border-t border-[#dcc1b8]/30 pt-6">
                        {session ? (
                          <>
                            <div className="text-center pb-2 text-base font-serif italic text-[#55433c]">
                              Serene, {session.user.name}
                            </div>
                            <Link
                              href="/manage"
                              className="block w-full text-center py-3 bg-transparent border-2 border-secondary text-secondary rounded-xl font-semibold hover:bg-secondary hover:text-white transition-colors"
                            >
                              Manage
                            </Link>
                            <Button
                              onPress={handleLogOut}
                              className="block w-full text-center py-3 bg-primary text-white rounded-xl font-semibold shadow-md hover:bg-[#a54f2f] transition-colors"
                            >
                              Log Out
                            </Button>
                          </>
                        ) : (
                          <>
                            <Link
                              href="/login"
                              className="block w-full text-center py-3 bg-transparent border-2 border-secondary text-secondary rounded-xl font-semibold hover:bg-secondary hover:text-white transition-colors"
                            >
                              Log In
                            </Link>
                            <Link
                              href="/signup"
                              className="block w-full text-center py-3 bg-primary text-white rounded-xl font-semibold shadow-md hover:bg-[#a54f2f] transition-colors"
                            >
                              Sign Up
                            </Link>
                          </>
                        )}
                      </div>
                    </nav>
                  </Drawer.Body>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
          </Drawer>
        </div>

      </div>
    </header>
  );
}