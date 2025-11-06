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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert } from '@/components/ui/Alert';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
export default function CreateClubPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clubName: '',
    clubEmail: '',
    clubPassword: '',
    clubLogo: '',
    clubType: '',
    clubDescription: '',
    university: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev: typeof formData) => ({ ...prev, clubLogo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1000)); // simulate API
      localStorage.setItem('userType', 'club');
      localStorage.setItem('clubData', JSON.stringify(formData));
      localStorage.setItem('profilePhoto', formData.clubLogo);
      window.dispatchEvent(new Event('storage')); // force Sidebar update
      router.push('/club/dashboard');
    } catch {
      setError('Failed to create club. Please try again.');
    } finally {
      setLoading(false);
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
              Create New Club
            </h1>
            <p className="text-gray-600">Start your student organization</p>
          </div>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle>Club Information</CardTitle>
            <CardDescription>Fill in your club’s details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <Alert variant="destructive">{error}</Alert>}

              <div className="space-y-2">
                <Label htmlFor="clubName">Club Name *</Label>
                <Input
                  id="clubName"
                  name="clubName"
                  value={formData.clubName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clubEmail">Club Email *</Label>
                  <Input
                    id="clubEmail"
                    name="clubEmail"
                    type="email"
                    value={formData.clubEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clubPassword">Club Password *</Label>
                  <Input
                    id="clubPassword"
                    name="clubPassword"
                    type="password"
                    value={formData.clubPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clubType">Club Type *</Label>
                  <Select
                    value={formData.clubType}
                    onValueChange={(v: string) => handleSelectChange('clubType', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              </div>

              <div className="space-y-2">
                <Label>Club Logo</Label>
                <div className="flex flex-col items-center">
                  {formData.clubLogo ? (
                    <Image
      src={formData.clubLogo}
      alt="Club Logo Preview"
      className="w-24 h-24 rounded-full object-cover mb-2 border"
      width={240} 
      height={240}
      quality={90} 
      priority 
    />
  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <span className="text-gray-500 text-sm">No Logo</span>
                    </div>
                  )}
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clubDescription">Description *</Label>
                <Textarea
                  id="clubDescription"
                  name="clubDescription"
                  value={formData.clubDescription}
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
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                  </>
                ) : (
                  'Create Club'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}  