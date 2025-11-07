'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import { ArrowLeft, Loader2, Calendar, AlertCircle, ImageIcon } from 'lucide-react';

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    eventName: '',
    eventStartDate: '',
    eventEndDate: '',
    eventType: '',
    eventLocation: '',
    eventDescription: '',
    eventImage: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.eventName.trim()) errors.eventName = 'Event name is required';
    if (!formData.eventStartDate) errors.eventStartDate = 'Start date is required';
    if (!formData.eventEndDate) errors.eventEndDate = 'End date is required';
    if (!formData.eventType) errors.eventType = 'Event type is required';
    if (!formData.eventLocation.trim()) errors.eventLocation = 'Location is required';
    if (!formData.eventDescription.trim()) errors.eventDescription = 'Description is required';
    if (!formData.eventImage.trim()) errors.eventImage = 'Event image URL is required';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) setValidationErrors({ ...validationErrors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      setError('Please fix the validation errors below.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://sys-multi-agents.onrender.com/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.eventName,
          description: formData.eventDescription,
          date: formData.eventStartDate,
          endDate: formData.eventEndDate,
          image: formData.eventImage,
          location: formData.eventLocation,
          type: formData.eventType,
          clubName: 'AI Club', 
        }),
      });

      if (!response.ok) throw new Error('Failed to create event.');

      router.push('/event'); 
    } catch (err: unknown | Error) {
      setError(err instanceof Error ? err.message || 'Error creating event.:' : 'Error creating event.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-filter from-purple-50 via-pink-50 to-blue-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/event">
            <Button variant="outline" size="icon" className="shadow-md hover:shadow-lg">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create New Event
            </h1>
            <p className="text-gray-600">Organize something exciting for your community</p>
          </div>
        </div>

        <Card className="shadow-xl border-0 backdrop-blur-md bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="w-6 h-6 text-purple-600" />
              Event Details
            </CardTitle>
            <CardDescription>Fill in the event information below</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {error && (
              <Alert variant="destructive" className="mb-4">
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name *</Label>
                <Input
                  id="eventName"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="AI Innovation Summit 2025"
                  className={validationErrors.eventName ? 'border-red-500' : ''}
                />
                {validationErrors.eventName && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {validationErrors.eventName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventImage">Event Image URL *</Label>
                <Input
                  id="eventImage"
                  name="eventImage"
                  value={formData.eventImage}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-xxxxxx"
                  className={validationErrors.eventImage ? 'border-red-500' : ''}
                />
                {validationErrors.eventImage && (
                  <p className="text-sm text-red-600 flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    {validationErrors.eventImage}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Start Date & Time *</Label>
                  <Input
                    type="datetime-local"
                    name="eventStartDate"
                    value={formData.eventStartDate}
                    onChange={handleChange}
                    className={validationErrors.eventStartDate ? 'border-red-500' : ''}
                  />
                </div>
                <div>
                  <Label>End Date & Time *</Label>
                  <Input
                    type="datetime-local"
                    name="eventEndDate"
                    value={formData.eventEndDate}
                    onChange={handleChange}
                    className={validationErrors.eventEndDate ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Event Type *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value: string) => handleSelectChange('eventType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Talk">Talk</SelectItem>
                      <SelectItem value="Hackathon">Hackathon</SelectItem>
                      <SelectItem value="Competition">Competition</SelectItem>
                      <SelectItem value="Festival">Festival</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Location *</Label>
                  <Input
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    placeholder="Tech Auditorium, Block B"
                    className={validationErrors.eventLocation ? 'border-red-500' : ''}
                  />
                </div>
              </div>

              <div>
                <Label>Event Description *</Label>
                <Textarea
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your event..."
                  className={validationErrors.eventDescription ? 'border-red-500' : ''}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Creating Event...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" /> Create Event
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
