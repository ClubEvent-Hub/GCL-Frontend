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
import { ArrowLeft, Loader2, AlertCircle ,X,Upload} from 'lucide-react';
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
      router.push('/dashboard/club');
    } catch {
      setError('Failed to create club. Please try again.');
    } finally {
      setLoading(false);
    }
  };
    const handleRemoveImage = () => {
        localStorage.removeItem('profilePhoto');
        setFormData({ ...formData, clubLogo: '' });
    };

  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/clubs">
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
                                <Label htmlFor="clubImage">Club Image</Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-white/90 hover:border-blue-400 transition-colors">
                                    {formData.clubLogo ? (
                                        <div className="space-y-3">
                                            <div className="relative mx-auto w-32 h-32">
                                                <img
                                                    src={formData.clubLogo}
                                                    alt="Club preview"
                                                    className="w-full h-full object-cover rounded-lg shadow-md"
                                                />
                                                <button title='j'
                                                    type="button"
                                                    onClick={handleRemoveImage}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-green-600">✓ Image uploaded successfully</p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => document.getElementById('clubImage')?.click()}
                                                className="flex items-center gap-2 mx-auto"
                                            >
                                                <Upload className="w-4 h-4" />
                                                Change Image
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF up to 10MB
                                                </p>
                                            </div>
                                            <Input
                                                id="clubImage"
                                                name="clubImage"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => document.getElementById('clubImage')?.click()}
                                                className="flex items-center gap-2 mx-auto"
                                            >
                                                <Upload className="w-4 h-4" />
                                                Upload Image
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                  <Input type="file" accept="image/*" onChange={handleImageUpload} />

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