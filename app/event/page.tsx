'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Search, PlusCircle, ArrowLeft, MapPin } from 'lucide-react';
import { Event } from '../types';
export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClub, setFilterClub] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const data = [
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
        id: 3,
        title: 'Startup Pitch Competition',
        description:
          'Pitch your startup ideas to a panel of investors and get feedback from experts.',
        date: '2025-11-22T09:00:00',
        image:
          'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
        clubName: 'Entrepreneurship Club',
      },
      {
        id: 4,
        title: 'AI Tech Talk',
        description:
          'Join a session about the latest trends in Artificial Intelligence and Machine Learning.',
        date: '2025-11-25T14:00:00',
        image:
          'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80',
        clubName: 'AI Club',
      },
      {
        id: 5,
        title: 'Photography Challenge',
        description:
          'A creative outdoor event where you can showcase your camera skills.',
        date: '2025-12-01T09:00:00',
        image:
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
        clubName: 'Photography Club',
      },
      {
        id: 6,
        title: 'Hackathon 2025',
        description:
          'Build apps that solve real problems. Form a team and code for 24 hours straight!',
        date: '2025-12-05T18:00:00',
        image:
          'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
        clubName: 'Coding Club',
      },
      {
        id: 7,
        title: 'Music Night Jam',
        description:
          'An evening of open mic, performances, and musical celebration.',
        date: '2025-12-08T19:00:00',
        image:
          'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=800&q=80',
        clubName: 'Music Club',
      },
      {
        id: 9,
        title: 'Art Exhibition',
        description:
          'Admire creative artworks and photography by students across all faculties.',
        date: '2025-12-15T10:00:00',
        image:
          'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=800&q=80',
        clubName: 'Art Club',
      },
    ];

    setTimeout(() => {
      setEvents(data);
    setFilteredEvents(data);
    }, 0);
  }, []);

  useEffect(() => {
    let filtered = events;
    if (searchTerm) {
      filtered = filtered.filter((event: Event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterClub !== 'all') {
      filtered = filtered.filter((event: Event) => event.clubName === filterClub);
    }
    setTimeout(() => {
      setFilteredEvents(filtered);
    }, 0);
  }, [searchTerm, filterClub, events]);

  const uniqueClubs = Array.from(new Set(events.map((e: Event) => e.clubName)));

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-filter from-purple-50 via-pink-50 to-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="icon" className="shadow-md hover:shadow-lg">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Upcoming Events
              </h1>
              <p className="text-gray-600 mt-1">Discover workshops, talks, and activities</p>
            </div>
          </div>
          <Link href="/event/create">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Event
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by event name..."
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 border-2 focus:border-purple-500"
            />
          </div>
          <Select value={filterClub} onValueChange={setFilterClub}>
            <SelectTrigger className="h-12 border-2">
              <SelectValue placeholder="Filter by club" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clubs</SelectItem>
              {uniqueClubs.map((club) => (
                <SelectItem key={club} value={club}>
                  {club}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredEvents.length === 0 ? (
          <Card className="shadow-xl border-0 text-center py-16">
            <CardContent>
              <Calendar className="w-10 h-10 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800">No events found</h3>
              <p className="text-gray-600 mt-2 mb-6">
                Try adjusting your search or filter settings.
              </p>
              <Link href="/event/create">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
                  <PlusCircle className="w-5 h-5 mr-2" /> Create Event
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event: Event) => (
              <Card
                key={event.id}
                className="overflow-hidden shadow-lg hover:shadow-2xl transition-all border-0 bg-white/90 backdrop-blur-md"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
                  <div className="pt-3 border-t border-gray-200 text-sm text-gray-700 space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span>{event.clubName}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-3 hover:bg-purple-50 hover:text-purple-700 border-purple-200 font-semibold"
                    onClick={() => router.push(`/event/${event.id}`)}
                  >
                    View Details →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
