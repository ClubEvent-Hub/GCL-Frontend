'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Heart,
  MessageCircle,
  PlusCircle,
  ArrowLeft,
  TrendingUp,
} from 'lucide-react';

type Post = {
  id: string;
  title: string;
  description: string;
  postType: string;
  numberOfLikes: number;
  numberOfComments: number;
  content: string;
  image: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const examplePosts: Post[] = [
    
      {
        id: '2',
        title: '💻 Coding Marathon 2025',
        description: '48-hour hackathon for developers and innovators to build something amazing!',
        postType: 'Event',
        numberOfLikes: 33,
        numberOfComments: 8,
        content: 'Form a team, solve challenges, and win exciting prizes. Beginners welcome!',
        image:
          'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '3',
        title: '🌐 Cybersecurity Awareness Day',
        description: 'A full-day seminar about protecting your data and online privacy.',
        postType: 'Seminar',
        numberOfLikes: 26,
        numberOfComments: 7,
        content:
          'Learn about phishing, password security, and ethical hacking from top experts.',
        image:
          'https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '4',
        title: '🤖 Robotics Club Project Launch',
        description: 'Our robotics club unveils their latest autonomous delivery robot.',
        postType: 'Announcement',
        numberOfLikes: 21,
        numberOfComments: 5,
        content: 'See the robot in action and learn about the engineering behind it.',
        image:
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '5',
        title: '🧠 Tech Talk: The Future of Quantum Computing',
        description: 'A special lecture from IBM researchers on quantum innovation.',
        postType: 'Seminar',
        numberOfLikes: 19,
        numberOfComments: 3,
        content:
          'Understand the principles of qubits, superposition, and how quantum systems may change AI.',
        image:
          'https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '6',
        title: '🛰️ Space Tech Innovations',
        description:
          'Join our event exploring satellite systems and aerospace software engineering.',
        postType: 'Event',
        numberOfLikes: 28,
        numberOfComments: 9,
        content:
          'Speakers from NASA and SpaceX share insights on software reliability in space missions.',
        image:
          'https://images.unsplash.com/photo-1473923377535-0002805f57b8?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '7',
        title: '📱 Mobile Dev Meetup',
        description:
          'Developers discuss cross-platform frameworks and mobile UX trends.',
        postType: 'Discussion',
        numberOfLikes: 24,
        numberOfComments: 6,
        content:
          'React Native vs Flutter — which one’s the best for performance and scalability?',
        image:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      },
    ];
setTimeout(() => {
     setPosts(examplePosts);
    setFilteredPosts(examplePosts);
      
    }, 0);
  
  }, []);

  useEffect(() => {
    let filtered = posts;
    if (searchTerm) {
      filtered = filtered.filter(
        (post: Post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterType !== 'all') {
      filtered = filtered.filter((post: Post) => post.postType === filterType);
    }
    setTimeout(() => {
    setFilteredPosts(filtered);
      
    }, 0);
  }, [searchTerm, filterType, posts]);

  const handleLike = (postId: string) => {
    setPosts((prev: Post[]) =>
      prev.map((p) =>
        p.id === postId ? { ...p, numberOfLikes: p.numberOfLikes + 1 } : p
      )
    );
  };

  return (
    <div className="min-h-screen  bg-filter from-blue-50 via-sky-50 to-indigo-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="outline"
                size="icon"
                className="border-blue-500 text-blue-700"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                GCL Community Feed
              </h1>
              <p className="text-gray-600 mt-1">
                Explore, share, and learn with developers and innovators 💻
              </p>
            </div>
          </div>
          
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="flex-1 border-blue-300 focus:border-blue-500"
          />
          <Select value={filterType} onValueChange={(v: string) => setFilterType(v)}>
            <SelectTrigger className="w-40 border-blue-300 text-blue-700">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Workshop">Workshops</SelectItem>
              <SelectItem value="Event">Events</SelectItem>
              <SelectItem value="Seminar">Seminars</SelectItem>
              <SelectItem value="Discussion">Discussions</SelectItem>
              <SelectItem value="Announcement">Announcements</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {filteredPosts.map((post: Post) => (
            <Card
              key={post.id}
              className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden bg-white/90"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-blue-800">{post.title}</h3>
                <p className="text-gray-700 mb-3">{post.description}</p>
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Heart className="w-4 h-4 mr-1" /> {post.numberOfLikes}
                  </Button>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MessageCircle className="w-4 h-4" /> {post.numberOfComments}
                  </div>
                  {post.numberOfLikes > 25 && (
                    <div className="ml-auto text-blue-600 flex items-center gap-1 text-xs font-semibold">
                      <TrendingUp className="w-4 h-4" /> Trending
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No posts found. Be the first to create a post!
          </p>
        )}
      </div>
    </div>
  );
}
