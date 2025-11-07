// ============================================
// app/dashboard/club/page.tsx
// ============================================
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, TrendingUp, Plus, BarChart3, Eye, Heart } from 'lucide-react';
import { getUser } from '@/lib/auth';
import { Club, Event, Post } from '@/app/types';

interface DashboardStats {
  members: number;
  eventsHosted: number;
  upcomingEvents: number;
  totalPosts: number;
  engagement: string;
}

interface UpcomingEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  registered: number;
  image: string;
}

interface RecentPost {
  id: string;
  title: string;
  likes: number;
  comments: number;
  views: number;
  date: string;
}

export default function ClubDashboard() {
  const router = useRouter();
  const user = getUser();
  
  const [stats, setStats] = useState({
    members: 1733,
    eventsHosted: 48,
    upcomingEvents: 4,
    totalPosts: 92,
    engagement: '+12.5%'
  });

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: '1',
      name: 'Web Development Workshop',
      date: '2025-11-15',
      time: '10:00 AM - 12:00 PM',
      location: 'Room 204, Tech Building',
      registered: 45,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400'
    },
    {
      id: '2',
      name: 'UI/UX Design Meetup',
      date: '2025-11-18',
      time: '2:00 PM - 4:00 PM',
      location: 'Design Studio 3',
      registered: 32,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'
    },
    {
      id: '3',
      name: 'Career Networking Night',
      date: '2025-11-22',
      time: '6:00 PM - 8:00 PM',
      location: 'Main Hall',
      registered: 78,
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400'
    },
    {
      id: '4',
      name: '24-Hour Hackathon',
      date: '2025-11-25',
      time: '9:00 AM - 9:00 AM (Next Day)',
      location: 'Innovation Hub',
      registered: 120,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400'
    }
  ]);

  const [recentPosts, setRecentPosts] = useState([
    {
      id: '1',
      title: 'Announcing our Annual Hackathon 2025!',
      likes: 156,
      comments: 24,
      views: 892,
      date: '2 hours ago'
    },
    {
      id: '2',
      title: 'Workshop Materials Now Available',
      likes: 89,
      comments: 12,
      views: 456,
      date: '5 hours ago'
    },
    {
      id: '3',
      title: 'New Partnership with Tech Giants',
      likes: 203,
      comments: 45,
      views: 1234,
      date: '1 day ago'
    }
  ]);

  const [clubLeaders] = useState([
    { id: '1', name: 'John Smith', role: 'President', avatar: 'JS', color: 'bg-blue-500' },
    { id: '2', name: 'Emily Johnson', role: 'Vice President', avatar: 'EJ', color: 'bg-purple-500' },
    { id: '3', name: 'Michael Williams', role: 'Event Coordinator', avatar: 'MW', color: 'bg-green-500' }
  ]);

//   useEffect(() => {
//     if (!user || user.role !== 'club') {
//       router.push('/login');
//     }
//   }, [user, router]);

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
//       </div>
//     );
//   }

  return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Blur Circles */}
        <div className="absolute top-20 right-40 w-96 h-96 bg-yellow-400 rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute top-[400px] left-60 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute bottom-40 right-[300px] w-96 h-96 bg-green-400 rounded-full blur-[120px] opacity-10"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-400 rounded-full blur-[120px] opacity-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Banner */}
          <div className="w-full h-48 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl mb-6 flex items-center justify-center shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200')] bg-cover bg-center opacity-20"></div>
            <div className="relative z-10 text-white text-center">
              <h1 className="text-4xl font-bold mb-2">Tech Innovators Club</h1>
              <p className="text-lg opacity-90">Dashboard Overview</p>
            </div>
          </div>

          <Card className="mb-8 shadow-xl border-0 overflow-hidden">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center text-white text-5xl font-bold flex-shrink-0 shadow-lg">
                TI
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Tech Innovators Club</h2>
                <p className="text-gray-600 mb-4">
                  Exploring technology, innovation, and software development through hands-on projects and events.
                </p>
                <div className="flex gap-6">
                  <Link href="/event/create">
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </Link>
                  <Link href="/post/create">
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      New Post
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-5 h-5" />
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">+5.2%</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.members}</p>
                    <p className="text-sm opacity-90">Members</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar className="w-5 h-5" />
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">+2</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.eventsHosted}</p>
                    <p className="text-sm opacity-90">Events Hosted</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <TrendingUp className="w-5 h-5" />
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">{stats.engagement}</span>
                    </div>
                    <p className="text-3xl font-bold">{stats.totalPosts}</p>
                    <p className="text-sm opacity-90">Total Posts</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <BarChart3 className="w-5 h-5" />
                    </div>
                    <p className="text-3xl font-bold">{stats.upcomingEvents}</p>
                    <p className="text-sm opacity-90">Upcoming</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">About the Club</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Welcome to the Tech Innovators Club! We are a community of passionate students exploring 
                    the latest in technology, from software development and AI to hardware engineering and 
                    cybersecurity. We host workshops, hackathons, and speaker events to help members build 
                    skills and projects.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Upcoming Events</CardTitle>
                    <Link href="/events">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingEvents.map((event: Event)=> (
                      <Link key={event.id} href={`/event/${event.id}`}>
                        <Card className="overflow-hidden hover:shadow-xl transition-all cursor-pointer border-0 bg-gray-50">
                          <div className="h-32 w-full overflow-hidden">
                            <img 
                              src={event.classname} 
                              alt={event.eventType}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h4 className="font-bold text-sm mb-2 line-clamp-1">{event.name}</h4>
                            <div className="space-y-1 text-xs text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3" />
                                <span>{event.date ? new Date(event.date).toLocaleDateString() : ''}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-3 h-3" />
                                <span>{event.clubId} registered</span>
                              </div>
                            </div>
                            <Button className="w-full mt-3 bg-cyan-600 hover:bg-cyan-700" size="sm">
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Recent Posts Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentPosts.map((post: Post) => (
                      <div key={post.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{post.title}</h4>
                          <span className="text-xs text-gray-500">{post.date}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-500" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            💬 {post.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {post.views}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-cyan-50 to-blue-50">
                <CardHeader>
                  <CardTitle>Club Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-100 rounded-lg">
                    <p className="text-sm text-gray-700 mb-1">Members</p>
                    <p className="text-3xl font-bold text-blue-700">{stats.members}</p>
                  </div>
                  <div className="p-4 bg-green-100 rounded-lg">
                    <p className="text-sm text-gray-700 mb-1">Events Hosted</p>
                    <p className="text-3xl font-bold text-green-700">{stats.eventsHosted}</p>
                  </div>
                  <div className="p-4 bg-purple-100 rounded-lg">
                    <p className="text-sm text-gray-700 mb-1">Founded</p>
                    <p className="text-xl font-bold text-purple-700">2020</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Club Leadership</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {clubLeaders.map((leader: Event) => (
                    <div key={leader.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`w-10 h-10 ${leader.color} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {leader.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{leader.name}</p>
                        <p className="text-xs text-gray-600">{leader.role}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/event/create">
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Event
                    </Button>
                  </Link>
                  <Link href="/post/create">
                    <Button className="w-full justify-start" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Post
                    </Button>
                  </Link>
                  <Link href="/clubs/members">
                    <Button className="w-full justify-start" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Members
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
  );
}