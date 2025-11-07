'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

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

  const LogoIcon = userType === 'club' ? Building2 : userType === 'student' ? User2 : Globe;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            {profilePhoto && profilePhoto.startsWith('data:image') ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-10 h-10 rounded-xl object-cover border shadow-sm"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] via-[#00BF63] to-[#FFCC00] rounded-xl flex items-center justify-center shadow-sm">
                <LogoIcon className="w-6 h-6 text-white" />
              </div>
            )}
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#2563EB] via-[#00BF63] to-[#FFCC00] bg-clip-text text-transparent">
              {userType === 'student' ? 'Student' : userType === 'club' ? 'Club' : 'Visitor'}
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-medium ${
                    active
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#00BF63] text-white shadow-md'
                      : 'text-gray-800 hover:text-[#2563EB] hover:bg-[#FFCC00]/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {(userType === 'student' || userType === 'club') ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-[#FF0000] text-white hover:bg-[#CC0000] transition-all shadow-md"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#00BF63] text-white hover:opacity-90 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 rounded-lg bg-[#FFCC00] text-black font-medium hover:bg-yellow-400 transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-md bg-white shadow"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-[#2563EB]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2563EB]" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#2563EB] to-[#00BF63] text-white'
                      : 'hover:bg-[#FFCC00]/10 text-gray-800 hover:text-[#2563EB]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {(userType === 'student' || userType === 'club') ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full px-4 py-2 rounded-lg bg-[#FF0000] text-white hover:bg-[#CC0000] transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#00BF63] text-white hover:opacity-90 transition text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full px-4 py-2 rounded-lg bg-[#FFCC00] text-black font-medium hover:bg-yellow-400 transition text-center"
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
