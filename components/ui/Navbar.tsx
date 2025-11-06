'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home,
  Users,
  Calendar,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Building2,
  User2,
  Globe,
} from 'lucide-react';

export default function Navbar() {
  const [userType, setUserType] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const type = localStorage.getItem('userType');
      const photo = localStorage.getItem('profilePhoto');
      setUserType(type);
      setProfilePhoto(photo);
    };

    updateUser();
    window.addEventListener('storage', updateUser);
    window.addEventListener('userTypeChanged', updateUser);
    return () => {
      window.removeEventListener('storage', updateUser);
      window.removeEventListener('userTypeChanged', updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('userTypeChanged'));
    window.location.href = '/';
  };

  const navItems =

  userType === 'student'
      ? [
          { name: 'Home', href: '/home', icon: Home },
          { name: 'Dashboard', href: '/dashboard/student', icon: LayoutDashboard },
          { name: 'Clubs', href: '/clubs', icon: Users },
          { name: 'Events', href: '/event', icon: Calendar },
          { name: 'Posts', href: '/post', icon: FileText },
        ]
      : userType === 'club'
      ? [
          { name: 'Home', href: '/home', icon: Home },
          { name: 'Dashboard', href: '/dashboard/club', icon: LayoutDashboard },
          { name: 'Clubs', href: '/clubs', icon: Users },
          { name: 'Events', href: '/event', icon: Calendar },
          { name: 'Posts', href: '/post', icon: FileText },
        ]
      : [
          { name: 'Home', href: '/', icon: Home },
          { name: 'Clubs', href: '/clubs', icon: Users },
          { name: 'Events', href: '/event', icon: Calendar },
          { name: 'Posts', href: '/post', icon: FileText },
        ];
   

  const LogoIcon =
    userType === 'club' ? Building2 : userType === 'student' ? User2 : Globe;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            {profilePhoto && profilePhoto.startsWith('data:image') ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover shadow-sm border"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                <LogoIcon className="w-6 h-6 text-white" />
              </div>
            )}
            <h1 className="text-2xl font-bold text-blue-600">Club Hub</h1>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition"
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {(userType === 'student' || userType === 'club') ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-md bg-white shadow"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6 text-blue-600" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {(userType === 'student' || userType === 'club') ? (
              <div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition mt-2 text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition mt-2 text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </nav>
  );
}
