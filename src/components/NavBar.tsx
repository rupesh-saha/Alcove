"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Drawer } from "@heroui/react";
import { Bars, House, Magnifier, Person, Envelope, Gear } from "@gravity-ui/icons";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { icon: House, label: "Home", href: "/" },
    { icon: Magnifier, label: "Explore", href: "/explore" },
    { icon: Person, label: "About", href: "/about" },
    { icon: Envelope, label: "Contact", href: "/contact" },
    { icon: Gear, label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-[#F7F1E6]/90 backdrop-blur-md border-b border-[#dcc1b8]/30 shadow-sm transition-all duration-300">
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
                  className={`text-sm font-semibold tracking-wide z-10 flex items-center transition-colors duration-300 ${isActive ? "text-[#c1613c]" : "text-[#55433c] group-hover:text-primary-600 transition-colors duration-300"
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
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#c1613c]"
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

        {/* Right: Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-sm font-semibold text-[#26231F] hover:text-[#c1613c] transition-colors">
            Login
          </button>
          <button className="text-sm font-semibold bg-[#c1613c] text-white px-6 py-2.5 rounded-xl hover:bg-[#a54f2f] shadow-md transition-all">
            Signup
          </button>
        </div>

        {/* Mobile: HeroUI Drawer */}
        <div className="md:hidden">
          <Drawer>
            <Button className="text-[#26231F]" isIconOnly variant="light">
              <Bars height={24} width={24} />
            </Button>
            <Drawer.Backdrop>
              <Drawer.Content className="bg-[#F7F1E6]" placement="left">
                <Drawer.Dialog>
                  <Drawer.CloseTrigger className="text-[#26231F]" />
                  <Drawer.Header>
                    <Drawer.Heading className="text-xl font-serif text-[#26231F]">Navigation</Drawer.Heading>
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
                                ? "bg-[#c1613c]/10 text-[#c1613c] font-semibold"
                                : "text-[#55433c] hover:bg-[#e9e1db]"
                              }`}
                          >
                            <item.icon className={`size-5 ${isActive ? "text-[#c1613c]" : "text-[#89726b]"}`} />
                            {displayLabel}
                          </Link>
                        );
                      })}

                      <div className="mt-8 flex flex-col gap-3 border-t border-[#dcc1b8]/30 pt-6">
                        <Link href="/login" className="w-full bg-transparent border-2 border-[#2B4739] text-[#2B4739] rounded-xl font-semibold">
                          Login
                        </Link>
                        <Link href="/signup" className="w-full bg-[#c1613c] text-white rounded-xl font-semibold shadow-md">
                          Signup
                        </Link>
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