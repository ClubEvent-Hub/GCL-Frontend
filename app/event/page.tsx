'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Search, Users, Clock } from 'lucide-react';
import { getEvents } from '@/lib/api';
import { Event } from '../types';

const eventImages = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1515165562835-c4c3b7eeedc3?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1504386106331-3e4e71712b38?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=800&h=500&fit=crop',
];

const mockEvents = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  eventName: `Event ${i + 1} — Innovation & Tech`,
  eventDescription:
    'Join us for an inspiring session with experts from around the world.',
  eventLocation: ['New York', 'San Francisco', 'Los Angeles', 'London'][i % 4],
  eventType: ['Conference', 'Workshop', 'Seminar', 'Expo'][i % 4],
  eventStartDate: `2025-12-${10 + i}T10:00:00`,
  eventEndDate: `2025-12-${10 + i}T17:00:00`,
}));

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
useEffect(() => {
  async function loadEvents() {
    try {
      const data = await getEvents();

      const formatted = data.map((event: Event, index: number) => ({
        id: event.id,
        eventName: event.title,
        eventDescription: event.description || "No description provided.",
        eventType: event.event_type,
        eventLocation: event.location,
        eventStartDate: event.date,
        eventEndDate: event.date,
        attendees: event.current_registrations || 0,
        organizer: `Club #${event.club_id}`,
        eventImage: eventImages[index % eventImages.length],
      }));

      setEvents(formatted);
    } catch (error) {
      console.error("Failed to load events", error);

      const withMock = mockEvents.map((e, i) => ({
        ...e,
        eventImage: eventImages[i % eventImages.length],
      }));
      setEvents(withMock);
    } finally {
      setLoading(false);
    }
  }

  loadEvents();
}, []);
  const filteredEvents = events.filter((e: Event) => {
    const name = e.eventName || e.title || '';
    const type = e.eventType || e.event_type || '';
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      type.toLowerCase().includes(search.toLowerCase())
    );
  });
   if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
                    <p className="mt-6 text-lg text-gray-600 font-medium">Loading events...</p>
                </div>
            </div>
        );
    }


  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-filter from-gray-50 via-white to-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2563EB] to-[#00BF63] bg-clip-text text-transparent">
            Upcoming Events ({filteredEvents.length})
          </h1>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="pl-9 border-gray-300 focus:border-[#2563EB]"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500 animate-pulse text-center py-20">
            Loading events...
          </p>
        ) : filteredEvents.length === 0 ? (
          <p className="text-gray-500 text-center py-20">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event: Event) => (
              <Card
                key={event.id}
                className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all bg-white/80 backdrop-blur-lg"
              >
                <div className="relative">
                  <img
                    src={event.eventImage}
                    alt={event.eventName}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-[#2563EB] text-white shadow-md">
                    {event.eventType}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {event.eventName}
                  </CardTitle>
                  <CardDescription className="text-gray-600 line-clamp-2">
                    {event.eventDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-600 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-[#2563EB]" />
                    <span>{formatDate(event.eventStartDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[#2563EB]" />
                    <span>
                      {formatTime(event.eventStartDate)} -{' '}
                      {formatTime(event.eventEndDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-[#2563EB]" />
                    <span>{event.eventLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-[#2563EB]" />
                    <span>
                      {event.attendees} attending • Organizer: {event.organizer}
                    </span>
                  </div>
                  <Link href={`/event/${event.id}`}>
                    <Button className="w-full mt-3 bg-gradient-to-r from-[#2563EB] to-[#00BF63] text-white hover:opacity-90">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
