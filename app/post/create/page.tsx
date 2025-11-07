'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, FileText, Loader2, ArrowLeft, Heart, MessageCircle, Eye } from 'lucide-react';

export default function CreatePostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    postType: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    else if (formData.title.length < 5) errors.title = 'Title too short';
    if (!formData.postType) errors.postType = 'Select post type';
    if (!formData.description.trim()) errors.description = 'Description required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fix the errors below.');
      return;
    }

    setLoading(true);
    try {
      const newPost = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        postType: formData.postType,
        numberOfLikes: 0,
        numberOfComments: 0,
        content: formData.description,
        image:
          formData.image ||
          'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80',
      };

      const existing = JSON.parse(localStorage.getItem('posts') || '[]');
      localStorage.setItem('posts', JSON.stringify([newPost, ...existing]));

      router.push('/post');
    } catch (err) {
      setError('Failed to save post locally.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-filter from-blue-50 via-indigo-50 to-sky-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/post">
            <Button
              variant="outline"
              size="icon"
              className="border-blue-500 text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create New Tech Post
            </h1>
            <p className="text-gray-600">
              Share updates, ideas, or breakthroughs with the community 💻
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-900 text-2xl">
                  <FileText className="w-6 h-6" />
                  Post Details
                </CardTitle>
                <CardDescription>
                  Fill in the information about your tech post
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">Post Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter a post title..."
                      value={formData.title}
                      onChange={handleChange}
                      className={validationErrors.title ? 'border-red-500' : ''}
                    />
                    {validationErrors.title && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="postType">Post Type *</Label>
                    <Select
                      value={formData.postType}
                      onValueChange={(value: string) =>
                        setFormData({ ...formData, postType: value })
                      }
                    >
                      <SelectTrigger
                        className={validationErrors.postType ? 'border-red-500' : ''}
                      >
                        <SelectValue placeholder="Select post type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Workshop">💡 Workshop</SelectItem>
                        <SelectItem value="Event">🎉 Event</SelectItem>
                        <SelectItem value="Seminar">🎓 Seminar</SelectItem>
                        <SelectItem value="Discussion">💬 Discussion</SelectItem>
                        <SelectItem value="Announcement">📢 Announcement</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.postType && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.postType}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="description">Content *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Share your tech idea, update, or event..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={10}
                      className={`resize-none ${
                        validationErrors.description ? 'border-red-500' : ''
                      }`}
                    />
                    {validationErrors.description && (
                      <p className="text-sm text-red-600 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="image">Optional Image URL</Label>
                    <Input
                      id="image"
                      name="image"
                      placeholder="https://example.com/photo.jpg"
                      value={formData.image}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-12 text-lg font-bold shadow-lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-5 w-5" />
                          Publish Post
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12 text-lg"
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {showPreview ? 'Hide Preview' : 'Preview'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-8">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>
                  {formData.title || formData.description
                    ? 'This is how your post will look'
                    : 'Start typing to see a preview'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {(showPreview || formData.title || formData.description) ? (
                  <div className="border rounded-xl p-6 bg-white shadow-md">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Post preview"
                        className="w-full h-56 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">
                      {formData.title || 'Untitled Post'}
                    </h3>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-4">
                      {formData.postType || 'No Type'}
                    </span>
                    <p className="text-gray-700 leading-relaxed">
                      {formData.description || 'Write something amazing...'}
                    </p>
                    <div className="flex items-center gap-6 pt-4 mt-4 border-t">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Heart className="w-4 h-4" /> 0 Likes
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MessageCircle className="w-4 h-4" /> 0 Comments
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Your post preview will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
