'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert } from '@/components/ui/Alert';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { registerStudent } from '@/lib/api';
export default function StudentRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    university: '',
    major: '',
    bio: '',
    photo: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev: typeof formData) => ({ ...prev, photo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

  
    try {
    const payload = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      field_of_study: formData.major,
      year_level: 1, 
    };
     await new Promise((res) => setTimeout(res, 1000)); 
     

    const res = await registerStudent(payload);
    console.log("✅ Registered student:", res);

    router.push("/dashboard/student");
  } catch (err:unknown | Error) {
    setError(err instanceof Error ? err.message || "Registration failed. Please try again.": "Registration failed. Please try again.");
  } finally {
    setLoading(false);
     localStorage.setItem('userType', 'student');
      localStorage.setItem('studentData', JSON.stringify(formData));
      localStorage.setItem('profilePhoto', formData.photo);
      window.dispatchEvent(new Event('storage')); 
  }
};

  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Student Registration
            </h1>
            <p className="text-gray-600">Create your student profile</p>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Fill out your details below</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <Alert variant="destructive">{error}</Alert>}

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="university">University *</Label>
                  <Input
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="major">Major *</Label>
                  <Input
                    id="major"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="flex flex-col items-center">
                  {formData.photo ? (
                    <img
                      src={formData.photo}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover mb-2 border"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <span className="text-gray-500 text-sm">No Photo</span>
                    </div>
                  )}
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...
                  </>
                ) : (
                  'Register'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}  