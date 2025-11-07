'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/Alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { getUser } from '@/lib/auth';
import { Event, Post } from '@/app/types';
import {
  ArrowLeft,
  Users,
  Calendar,
  FileText,
  Mail,
  MapPin,
  ImageIcon,
  BookOpen,
  UserPlus,
  UserMinus,
} from 'lucide-react';

const mockClubsData = [
  {
    id: 'c1',
    clubName: 'Android Development Club',
    clubDescription:
      'Learn Android development with Kotlin and Jetpack Compose.',
    clubLocation: 'Tech Lab 101, Innovation Center',
    clubType: 'Technology',
    university: 'Tech University',
    clubEmail: 'android@techuniv.edu',
    clubImage:
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop',
  },
  {
    id: 'c2',
    clubName: 'AI/ML Club',
    clubDescription:
      'Hands-on sessions with TensorFlow and machine learning.',
    clubLocation: 'AI Lab, Research Center',
    clubType: 'AI',
    university: 'Tech University',
    clubEmail: 'ai@techuniv.edu',
    clubImage:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
  },
];

export default function ClubDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clubId = params.id as string;

  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getUser();

  useEffect(() => {
    const foundClub = mockClubsData.find((c) => c.id === clubId);
    setTimeout(() => {
      setClub(foundClub || null);
      setEvents([
        {
          id: '1',
          eventName: 'Hackathon 2025',
          eventDescription: '48-hour coding challenge for innovation.',
          eventStartDate: '2025-11-15T09:00:00',
          eventLocation: 'Innovation Hall',
          eventType: 'Competition',
        },
        {
          id: '2',
          eventName: 'AI Workshop',
          eventDescription: 'Hands-on deep learning with PyTorch.',
          eventStartDate: '2025-11-20T10:00:00',
          eventLocation: 'Research Lab 3',
          eventType: 'Workshop',
        },
      ]);
      setPosts([
        {
          id: 'p1',
          title: 'Welcome to the new semester!',
          description:
            'Our club is ready for another exciting semester. Check out our new events!',
          numberOfLikes: 14,
          numberOfComments: 3,
          postType: 'Announcement',
        },
        {
          id: 'p2',
          title: 'AI Hackathon Results',
          description:
            'Congrats to the winners of the annual AI Hackathon 2025!',
          numberOfLikes: 30,
          numberOfComments: 6,
          postType: 'Event Recap',
        },
      ]);
      setLoading(false);
    }, 300);
  }, [clubId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading club details...</p>
        </div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Club not found</p>
            <Link href="/clubs">
              <Button>Back to Clubs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link href="/clubs">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {club.clubName}
            </h1>
          </div>

          <Button
            onClick={() => setJoined(!joined)}
            className={`flex items-center gap-2 ${
              joined
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            }`}
          >
            {joined ? (
              <>
                <UserMinus className="w-4 h-4" /> Leave Club
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" /> Join Club
              </>
            )}
          </Button>
        </div>

        {error && <Alert variant="destructive" className="mb-6"></Alert>}

        <Card className="mb-8 shadow-xl border-0 overflow-hidden">
          <img
            src={club.clubImage}
            alt={club.clubName}
            className="w-full h-48 sm:h-64 object-cover"
          />
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-4">{club.clubDescription}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {club.clubLocation}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {club.university}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {club.clubEmail}
              </span>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="bg-white shadow-md flex flex-wrap justify-start">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {club.clubDescription}
                </p>
                <p className="mt-4 text-sm text-gray-600">
                  Type: <strong>{club.clubType}</strong>
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid gap-4 sm:grid-cols-2">
              {events.map((e: Event) => (
                <Card
                  key={e.id}
                  className="hover:shadow-lg transition-all cursor-pointer"
                >
                  <CardHeader>
                    <CardTitle>{e.eventName}</CardTitle>
                    <CardDescription>{e.eventDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600">
                    <p>
                      📍 {e.eventLocation} |{' '}
                      {new Date(e.eventStartDate).toLocaleDateString()}
                    </p>
                    <p className="mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {e.eventType}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="posts">
            <div className="space-y-4">
              {posts.map((p: Post) => (
                <Card key={p.id} className="hover:shadow-lg transition">
                  <CardHeader>
                    <CardTitle>{p.title}</CardTitle>
                    <CardDescription>{p.postType}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-3">{p.description}</p>
                    <div className="text-sm text-gray-500">
                      ❤️ {p.numberOfLikes} likes • 💬 {p.numberOfComments} comments
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {[
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
                'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
                'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
              ].map((img, i) => (
                <div
                  key={i}
                  className="relative group overflow-hidden rounded-xl"
                >
                  <img
                    src={img}
                    alt="Club image"
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition"></div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>
                  <BookOpen className="inline-block w-5 h-5 mr-2 text-purple-600" />
                  Club Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                    >
                      Android Club Handbook (PDF)
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                    >
                      Kotlin Learning Path
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-blue-600 hover:underline"
                    >
                      Past Project Repositories
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
