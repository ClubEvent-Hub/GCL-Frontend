import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';
import ModernChatbot from './ModernChatbot';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ClubStudent Hub",
  description: "University Clubs & Events Platform",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans relative`}>

        <div className="flex min-h-screen relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-96 h-96 left-[251px] top-[374px] opacity-20 mix-blend-multiply bg-[#EC0003] rounded-full blur-[32px]" />
            <div className="absolute w-96 h-96 left-[915px] top-[575px] opacity-20 mix-blend-multiply bg-[#EC0003] rounded-full blur-[32px]" />
            <div className="absolute w-96 h-96 left-[48px] top-[575px] opacity-20 mix-blend-multiply bg-[#49E374] rounded-full blur-[32px]" />
            <div className="absolute w-96 h-96 left-[771px] top-[16px] opacity-20 mix-blend-multiply bg-[#49E374] rounded-full blur-[32px]" />
            <div className="absolute w-96 h-96 left-[48px] top-0 opacity-10 mix-blend-multiply bg-[#0609D4] rounded-full blur-[32px]" />
            <div className="absolute w-96 h-96 left-[1054px] top-[174px] opacity-10 mix-blend-multiply bg-[#FACC15] rounded-full blur-[32px]" />
          </div>
          

          <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg z-10">
            <Sidebar />
          </aside>

          <div className="flex-1 flex flex-col relative z-20">
            <div className="md:hidden z-10">
              <Navbar />
            </div>

            <main className="flex-1 p-4 md:p-8 relative z-10">
              {children}
<ModernChatbot />

            </main>
          </div>
        </div>
      </body>
    </html>
  );
}