'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, User, ArrowLeft } from 'lucide-react';
import { getEventById } from '@/lib/api';
import { Alert } from '@/components/ui/Alert';

const fallbackImages = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1515165562835-c4c3b7eeedc3?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1487528278747-ba99ed528ebc?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581091012184-5c8af7a0a9d1?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522204501928-9c8263ca00ee?w=1200&h=400&fit=crop',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=400&fit=crop',
];

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', motivation: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function loadEvent() {
      try {
        const res = await fetch(`https://sys-multi-agents.onrender.com/events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();

        setEvent({
          id: data.id,
          title: data.title || 'Untitled Event',
          type: data.event_type || 'General',
          date: data.date,
          location: data.location,
          current_registrations: data.current_registrations,
          club_id: data.club_id,
          image: fallbackImages[data.id % fallbackImages.length],
        });
      } catch (err) {
        console.error('❌ Backend error:', err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage('⚠️ Please fill in your name and email.');
      return;
    }
    setRegistered(true);
    setMessage('🎉 Registration successful! Check your email for confirmation.');
    setFormData({ name: '', email: '', motivation: '' });
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Unknown Date';
    }
  };
  
 if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-transparent">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
                    <p className="mt-6 text-lg text-gray-600 font-medium">Loading event...</p>
                </div>
            </div>
        );
    }

  if (!event)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <p className="text-gray-500 mb-4 text-lg">Event not found or unavailable.</p>
        <Button onClick={() => router.push('/event')}>Back to Events</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-filter from-gray-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="outline" size="icon" onClick={() => router.push('/event')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2563EB] to-[#00BF63] bg-clip-text text-transparent">
            {event.title}
          </h1>
        </div>

        <div className="relative">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-80 object-cover rounded-2xl shadow-xl"
          />
          <Badge className="absolute top-4 right-4 bg-[#2563EB] text-white shadow-md capitalize">
            {event.type}
          </Badge>
        </div>

        <Card className="shadow-lg border-none bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">{event.title}</CardTitle>
            <CardDescription>Organized by Club #{event.club_id}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-4 text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#2563EB]" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#2563EB]" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-[#2563EB]" />
                <span>{event.current_registrations} participants registered</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Experience a one-of-a-kind event designed to foster innovation, collaboration, and
              skill-building in the modern tech ecosystem.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Register Now</CardTitle>
            <CardDescription>
              Secure your spot — seats fill up quickly!
            </CardDescription>
          </CardHeader>
          <CardContent>
            {registered ? (
              <Alert className="bg-green-100 text-green-700 font-medium text-center py-3">
                {message}
              </Alert>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <Textarea
                  placeholder="Tell us why you want to join this event (optional)"
                  value={formData.motivation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, motivation: e.target.value })}
                />
                {message && (
                  <Alert className="bg-yellow-100 text-yellow-700 text-center py-2">
                    {message}
                  </Alert>
                )}
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#2563EB] to-[#00BF63] hover:opacity-90 text-white w-full mt-2"
                >
                  Register
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
