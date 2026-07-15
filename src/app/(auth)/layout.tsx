import React from "react";
import FooterBar from "@/components/FooterBar"; // Import the footer

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {children}
      </main>
      <FooterBar/>
    </div>
  );
}