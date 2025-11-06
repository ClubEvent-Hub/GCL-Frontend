'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { getUser } from '@/lib/auth';
import { Club, Event, Post } from '@/app/types';
import { ArrowLeft, Edit, Trash2, Users, Calendar, FileText, Mail, MapPin } from 'lucide-react';

const mockClubsData: Club[] = [
  {
    id: "c2",
    clubName: "Science Club",
    clubDescription: "Hands-on experiments and fun science activities.",
    clubLocation: "Lab 3, Science Building",
    clubType: "Educational",
    clubStartDate: "2025-11-07T14:00:00",
    clubEndDate: "2025-11-07T16:00:00",
    clubImage: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    university: "Sample University"
  },
  {
    id: "c3",
    clubName: "Art Club",
    clubDescription: "Creative art sessions with painting, drawing, and exhibitions.",
    clubLocation: "Art Room, Creative Center",
    clubType: "Creative",
    clubStartDate: "2025-11-09T16:00:00",
    clubEndDate: "2025-11-09T18:00:00",
    clubImage: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80",
    university: "Sample University"
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
    university: "Sample University"
,
    clubImage:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "c5",
    clubName: "Coding Club",
    university: "Sample University"
,
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
    university: "Sample University"
,
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
    university: "Sample University"
,
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
    university: "Sample University"
,
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
    university: "Sample University"
,
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

export default function ClubDetailPage() {
  const router = useRouter();
  const params = useParams();
  const clubId = params.id as string;
  
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getUser();

  useEffect(() => {
    const foundClub = mockClubsData.find(c => c.id === clubId);

  setTimeout(() => {
    setClub(foundClub || null);

      setEvents([
      {
        id: "2",
        eventName: "Chess Tournament",
        eventDescription: "Annual chess tournament.",
        eventStartDate: new Date().toISOString(),
        eventLocation: "Auditorium",
        eventType: "Tournament",
      },
    ]);

    setPosts([
      {
        id: "3",
        title: "Welcome Post",
        description: "Welcome to our club!",
        numberOfLikes: 10,
        numberOfComments: 2,
        postType: "Announcement",
      },
    ]);

    setLoading(false);
  }, 0);
  }, [clubId]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this club?')) return;
    try {
      await api.deleteClub(clubId);
      router.push('/clubs');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

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
        <div className="flex items-center gap-4 mb-8">
          <Link href="/clubs">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
          </Alert>
        )}

        <Card className="mb-8 shadow-2xl border-0 overflow-hidden">
          <div>
            <img
              src={club.clubImage}
              alt={club.clubName}
              className="w-full h-48 object-cover"
            />
          </div>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-4xl -mt-16 border-4 border-white shadow-lg">
                  {club.clubName.charAt(0)}
                </div>
                <div className="pt-2">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{club.clubName}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {club.university}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {club.clubType}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {club.clubEmail || 'contact@club.edu'}
                    </span>
                  </div>
                  <p className="text-gray-700 max-w-3xl">{club.clubDescription}</p>
                </div>
              </div>
              
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="bg-white shadow-md">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
            <TabsTrigger value="posts">Posts ({posts.length})</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-lg">
                <CardHeader>
                  <CardTitle>About This Club</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600">{club.clubDescription}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Club Type</h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {club.clubType}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">University</h3>
                    <p className="text-gray-600">{club.university}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">Events</span>
                    <span className="font-bold text-blue-600">{events.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Posts</span>
                    <span className="font-bold text-purple-600">{posts.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="text-gray-700">Members</span>
                    <span className="font-bold text-pink-600">-</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Club Events</CardTitle>
                    <CardDescription>Upcoming and past events</CardDescription>
                  </div>
                  <Link href="/events/create">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      Create Event
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.length > 0 ? (
                  events.map((event: Event) => (
                    <Link key={event.id} href={`/events/${event.id}`}>
                      <div className="p-4 border rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{event.eventName}</h4>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.eventDescription}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(event.eventStartDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {event.eventLocation}
                              </span>
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                                {event.eventType}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No events yet</p>
                    <Link href="/events/create">
                      <Button>Create First Event</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Club Posts</CardTitle>
                    <CardDescription>Updates and announcements</CardDescription>
                  </div>
                  <Link href="/posts/create">
                    <Button className="bg-gradient-to-r from-pink-600 to-red-600">
                      Create Post
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {posts.length > 0 ? (
                  posts.map((post: Post) => (
                    <div key={post.id} className="p-4 border rounded-lg hover:border-pink-300 transition-colors">
                      <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>❤️ {post.numberOfLikes} likes</span>
                        <span>💬 {post.numberOfComments} comments</span>
                        <span className="ml-auto px-2 py-1 bg-pink-100 text-pink-700 rounded text-xs">
                          {post.postType}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No posts yet</p>
                    <Link href="/posts/create">
                      <Button>Create First Post</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Club Members</CardTitle>
                <CardDescription>Active members of this club</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Member list coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}