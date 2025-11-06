"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Calendar, ArrowRight,LogOut } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const events = [
    {
      id: 1,
      title: "Web Development Workshop",
      description:
        "Learn web basics using HTML, CSS, and JavaScript in this hands-on coding session.",
      date: "2025-11-10T14:00:00",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      clubName: "Tech Club",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      description:
        "Pitch your startup ideas to a panel of investors and get feedback from experts.",
      date: "2025-11-22T09:00:00",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      clubName: "Entrepreneurship Club",
    },
    {
      id: 4,
      title: "AI Tech Talk",
      description:
        "Join a session about the latest trends in Artificial Intelligence and Machine Learning.",
      date: "2025-11-25T14:00:00",
      image:
        "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
      clubName: "AI Club",
    },
    {
      id: 5,
      title: "Photography Challenge",
      description:
        "A creative outdoor event where you can showcase your camera skills.",
      date: "2025-12-01T09:00:00",
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      clubName: "Photography Club",
    },
    {
      id: 6,
      title: "Hackathon 2025",
      description:
        "Build apps that solve real problems. Form a team and code for 24 hours straight!",
      date: "2025-12-05T18:00:00",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
      clubName: "Coding Club",
    },
    {
      id: 7,
      title: "Music Night Jam",
      description:
        "An evening of open mic, performances, and musical celebration.",
      date: "2025-12-08T19:00:00",
      image:
        "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=800&q=80",
      clubName: "Music Club",
    },
    {
      id: 9,
      title: "Art Exhibition",
      description:
        "Admire creative artworks and photography by students across all faculties.",
      date: "2025-12-15T10:00:00",
      image:
        "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80",
      clubName: "Art Club",
    },
  ];

  const clubs = [
    {
      id: "c2",
      clubName: "Science Club",
      clubDescription: "Hands-on experiments and fun science activities.",
      clubLocation: "Lab 3, Science Building",
      clubType: "Educational",
      clubStartDate: "2025-11-07T14:00:00",
      clubEndDate: "2025-11-07T16:00:00",
      clubImage:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "c3",
      clubName: "Art Club",
      clubDescription:
        "Creative art sessions with painting, drawing, and exhibitions.",
      clubLocation: "Art Room, Creative Center",
      clubType: "Creative",
      clubStartDate: "2025-11-09T16:00:00",
      clubEndDate: "2025-11-09T18:00:00",
      clubImage:
        "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "c4",
      clubName: "Music Club",
      clubDescription: "Join our band nights and jam sessions every weekend!",
      clubLocation: "Music Hall, Arts Building",
      clubType: "Social",
      clubStartDate: "2025-11-10T18:00:00",
      clubEndDate: "2025-11-10T20:00:00",
      clubImage:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "c5",
      clubName: "Coding Club",
      clubDescription: "Weekly coding sessions, hackathons, and tech talks.",
      clubLocation: "Room 204, Innovation Hub",
      clubType: "Educational",
      clubStartDate: "2025-11-12T13:00:00",
      clubEndDate: "2025-11-12T15:00:00",
      clubImage:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "c6",
      clubName: "Photography Club",
      clubDescription: "Capture stunning visuals and improve your photo skills.",
      clubLocation: "Studio 1, Arts Center",
      clubType: "Creative",
      clubStartDate: "2025-11-14T15:00:00",
      clubEndDate: "2025-11-14T17:00:00",
      clubImage:
        "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "c8",
      clubName: "Drama Club",
      clubDescription: "Perform, direct, and act in stage plays and skits.",
      clubLocation: "Auditorium Stage",
      clubType: "Creative",
      clubStartDate: "2025-11-17T18:00:00",
      clubEndDate: "2025-11-17T20:30:00",
      clubImage:
        "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "c9",
      clubName: "Gaming Club",
      clubDescription: "Friendly gaming tournaments and strategy sessions.",
      clubLocation: "Recreation Hall, Floor 1",
      clubType: "Social",
      clubStartDate: "2025-11-19T17:00:00",
      clubEndDate: "2025-11-19T19:00:00",
      clubImage:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "c10",
      clubName: "Business Club",
      clubDescription:
        "Entrepreneurship meetups, networking, and innovation workshops.",
      clubLocation: "Business Hall, Room 12",
      clubType: "Educational",
      clubStartDate: "2025-11-20T11:00:00",
      clubEndDate: "2025-11-20T13:00:00",
      clubImage:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen w-full bg-white/90 shadow-[0_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-[50px] overflow-hidden">
    
      <div className="absolute inset-0">
        <div className="w-96 h-96 left-[251px] top-[374px] absolute opacity-20 mix-blend-multiply bg-[#EC0003] rounded-full blur-[32px]" />
        <div className="w-96 h-96 left-[915px] top-[575px] absolute opacity-20 mix-blend-multiply bg-[#EC0003] rounded-full blur-[32px]" />
        <div className="w-96 h-96 left-[48px] top-[575px] absolute opacity-20 mix-blend-multiply bg-[#49E374] rounded-full blur-[32px]" />
        <div className="w-96 h-96 left-[771px] top-[16px] absolute opacity-20 mix-blend-multiply bg-[#49E374] rounded-full blur-[32px]" />
        <div className="w-96 h-96 left-[48px] top-0 absolute opacity-10 mix-blend-multiply bg-[#0609D4] rounded-full blur-[32px]" />
        <div className="w-96 h-96 left-[1054px] top-[174px] absolute opacity-10 mix-blend-multiply bg-[#FACC15] rounded-full blur-[32px]" />
      </div>

     
      <header className="flex items-center justify-between px-6 md:px-12 py-4 bg-white/70 backdrop-blur-md shadow sticky top-0 z-10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/Component.svg" alt="Logo" width={36} height={36} />
          <div className="flex items-center gap-1">
            <span className="text-blue-600 text-3xl font-bold">G</span>
            <span className="text-red-600 text-3xl font-bold">C</span>
            <span className="text-emerald-500 text-3xl font-bold">L</span>
          </div>
        </Link>
        <button className="flex items-center gap-2 px-4 py-2 from hover:bg-red-600 transition">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>
      <div className="relative z-10 pt-10">
        <section className="max-w-6xl mx-auto text-center mb-12 px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Campus Community
          </h1>
          <p className="text-gray-600 mb-6">
            Connect with clubs, discover events, and make the most of your
            university experience.
          </p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-80 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              title="Search"
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Events Section */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {new Date(event.date).toLocaleDateString()} –{" "}
                    {new Date(event.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      href="/register"
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Register
                    </Link>
                    <span className="text-sm text-gray-500">
                      {event.clubName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clubs Section */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Explore Clubs
          </h2>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {clubs.map((club) => (
              <div
                key={club.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={club.clubImage}
                  alt={club.clubType}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800">
                    {club.clubName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {club.clubDescription}
                  </p>
                  <Link
                    href={`/clubs/${club.id}`}
                    className="inline-block mt-3 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center text-black text-base font-extralight font-['Roboto'] leading-4 pb-6">
          GDGAlgiers © 2025. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
