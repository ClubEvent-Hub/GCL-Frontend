'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, LogOut } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const events = [
    {
      id: 1,
      title: 'Web Development Workshop',
      description:
        'Learn web basics using HTML, CSS, and JavaScript in this hands-on coding session.',
      date: '2025-11-10T14:00:00',
      image:
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      clubName: 'Tech Club',
    },
    {
      id: 2,
      title: 'AI Tech Talk',
      description:
        'Join a session about the latest trends in Artificial Intelligence and Machine Learning.',
      date: '2025-11-25T14:00:00',
      image:
        'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
      clubName: 'AI Club',
    },
    {
      id: 3,
      title: 'Informatique Hackathon 2025',
      description:
        '24-hour coding marathon to build innovative tech projects — compete, learn, and win prizes!',
      date: '2025-12-02T09:00:00',
      image:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      clubName: 'Informatique Club',
    },
    {
      id: 4,
      title: 'Cloud Computing Bootcamp',
      description:
        'Master cloud fundamentals with hands-on workshops using AWS, Google Cloud, and Azure.',
      date: '2025-12-06T11:00:00',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      clubName: 'Informatique Club',
    },
    {
      id: 5,
      title: 'Cybersecurity Awareness Day',
      description:
        'Dive into ethical hacking, data protection, and online security best practices.',
      date: '2025-12-09T10:00:00',
      image:
        'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80',
      clubName: 'Informatique Club',
    },
    {
      id: 6,
      title: 'Startup Pitch Competition',
      description:
        'Pitch your startup ideas to a panel of investors and get feedback from experts.',
      date: '2025-11-22T09:00:00',
      image:
        'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
      clubName: 'Entrepreneurship Club',
    },
    {
      id: 7,
      title: 'Photography Challenge',
      description:
        'A creative outdoor event where you can showcase your camera skills.',
      date: '2025-12-01T09:00:00',
      image:
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      clubName: 'Photography Club',
    },
  ];

  const clubs = [
    {
      id: 'c1',
      clubName: 'Android Development Club',
      clubDescription: 'Learn Android development with Kotlin and Jetpack Compose.',
      clubLocation: 'Tech Lab 101, Innovation Center',
      clubType: 'Technology',
      clubStartDate: '2025-11-05T15:00:00',
      clubEndDate: '2025-11-05T17:00:00',
      clubImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop'
    },
    {
      id: 'c2',
      clubName: 'Google Cloud Club',
      clubDescription: 'Explore Google Cloud services and cloud computing.',
      clubLocation: 'Cloud Lab, Tech Building',
      clubType: 'Cloud',
      clubStartDate: '2025-11-07T14:00:00',
      clubEndDate: '2025-11-07T16:00:00',
      clubImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop'
    },
    {
      id: 'c3',
      clubName: 'AI/ML Club',
      clubDescription: 'Hands-on sessions with TensorFlow and machine learning.',
      clubLocation: 'AI Lab, Research Center',
      clubType: 'AI',
      clubStartDate: '2025-11-09T16:00:00',
      clubEndDate: '2025-11-09T18:00:00',
      clubImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop'
    },
    {
      id: 'c4',
      clubName: 'Informatique Club',
      clubDescription: 'Everything about computing, algorithms, and software engineering.',
      clubLocation: 'IT Lab, Science Faculty',
      clubType: 'Tech',
      clubStartDate: '2025-11-10T13:00:00',
      clubEndDate: '2025-11-10T15:00:00',
      clubImage: 'https://images.unsplash.com/photo-1581091012184-7acb98c9e1b4?w=400&h=200&fit=crop'
    },
  ];

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('userTypeChanged'));
    window.location.href = '/';
  };
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden bg-filter">
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-80 h-80 left-[10%] top-[60%] bg-blue-400 opacity-20 mix-blend-multiply rounded-full blur-[100px]" />
        <div className="absolute w-80 h-80 right-[10%] top-[30%] bg-indigo-400 opacity-20 mix-blend-multiply rounded-full blur-[100px]" />
        <div className="absolute w-80 h-80 left-[5%] top-[5%] bg-cyan-400 opacity-10 mix-blend-multiply rounded-full blur-[100px]" />
      </div>
      <header className="flex items-center justify-between px-4 md:px-12 py-4 bg-white/80 backdrop-blur-md shadow sticky top-0 z-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
            <Image src="/Component.svg" alt="Logo" width={36} height={36} />
            
          </div>
             <div className="flex items-center gap-1">
            <span className="text-blue-600 text-3xl font-bold">G</span>
            <span className="text-red-600 text-3xl font-bold">C</span>
            <span className="text-emerald-500 text-3xl font-bold">L</span>
          </div>
        
        </Link>
         <button
            onClick={handleLogout}
            className={`mt-auto flex items-center gap-3 p-3 rounded-lg text-[#FF0000] hover:bg-[#FF0000]/10 transition ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
      </header>

      <section className="pt-10 pb-10 text-center px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Discover Your Club Community
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto mb-6 text-sm md:text-base">
          Explore tech events, join clubs, and connect with developers and innovators.
        </p>

        <div className="flex justify-center items-center w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search informatique events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            title="Search"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-r-md hover:opacity-90 transition"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Upcoming Events</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-blue-100"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-lg">{event.title}</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  {new Date(event.date).toLocaleDateString()} –{' '}
                  {new Date(event.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{event.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <Link
                    href={`/event/${event.id}`}
                    className="text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded hover:opacity-90 transition"
                  >
                    Register
                  </Link>
                  <span className="text-sm text-gray-500">{event.clubName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mb-20">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Explore Informatique Clubs</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-blue-100"
            >
              <img
                src={club.clubImage}
                alt={club.clubName}
                className="w-full h-36 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-800">{club.clubName}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {club.clubDescription}
                </p>
                <Link
                  href={`/clubs/${club.id}`}
                  className="inline-block mt-3 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded hover:opacity-90 transition"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-gray-600 text-sm py-6 bg-white/70 backdrop-blur-md border-t">
      GCL Hub © 2025. All rights reserved.
      </footer>
    </div>
  );
}
