'use client';

import { useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 transition-all duration-300">
      <aside
        className={`fixed md:static top-0 left-0 z-40 bg-white shadow-lg h-screen transition-all duration-300 ${
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-64'
        }`}
      >
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col transition-all duration-300">
        <div className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-30">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="w-5 h-5 text-cyan-600" />
          </Button>

          <Navbar />
        </div>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
