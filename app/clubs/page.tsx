"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/Alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Search,
  ArrowLeft,
  MapPin,
  Clock,
  Filter,
} from "lucide-react";

interface Club {
  id: string;
  clubName: string;
  clubDescription: string;
  clubLocation: string;
  clubType: string;
  clubStartDate: string;
  clubEndDate: string;
  clubImage: string;
}

const exampleClubs: Club[] = [
  
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
    clubDescription:
      "Join our band nights and jam sessions every weekend!",
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
    clubDescription:
      "Weekly coding sessions, hackathons, and tech talks.",
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
    clubDescription:
      "Capture stunning visuals and improve your photo skills.",
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
    clubDescription:
      "Perform, direct, and act in stage plays and skits.",
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
    clubDescription:
      "Friendly gaming tournaments and strategy sessions.",
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

export default function ClubsPage() {
  const router = useRouter();
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   setTimeout(() => {
     setClubs(exampleClubs);
    setFilteredClubs(exampleClubs);
    setLoading(false);
   }, 0);
  }, []);

  useEffect(() => {
    let filtered = clubs;
    if (searchTerm) {
      filtered = filtered.filter(
        (club: Club) =>
          club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.clubDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.clubLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType !== "all") {
      filtered = filtered.filter((club: Club) => club.clubType === filterType);
    }
    setTimeout(() => {
    setFilteredClubs(filtered);
      
    }, 0);
  }, [searchTerm, filterType, clubs]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-600 text-lg">Loading clubs...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              All Clubs
            </h1>
            <p className="text-gray-600 mt-1">
              Discover student communities and find your passion.
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <Card className="mb-8 shadow-md border-0">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search clubs..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-purple-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="h-12 pl-10 border-2">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Strategy">Strategy</SelectItem>
                    <SelectItem value="Educational">Educational</SelectItem>
                    <SelectItem value="Creative">Creative</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Club Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club: Club) => (
            <Link key={club.id} href={`/clubs/${club.id}`}>
              <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-0 shadow-lg">
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={club.clubImage}
                    alt={club.clubName}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5 space-y-3">
                  <span className="text-xs px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
                    {club.clubType}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 line-clamp-1">
                    {club.clubName}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {club.clubDescription}
                  </p>
                  <div className="text-sm text-gray-500 space-y-1 border-t pt-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      {club.clubLocation}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      {formatDate(club.clubStartDate)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      Until {formatDate(club.clubEndDate)}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-2 font-semibold group-hover:bg-purple-50 group-hover:text-purple-700"
                  >
                    View Details →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
