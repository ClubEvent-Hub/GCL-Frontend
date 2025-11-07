'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert } from '@/components/ui/Alert';
import { LogIn, Loader2 } from 'lucide-react';
import { loginStudent, loginClub } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (formData.userType === 'student') {
        res = await loginStudent({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('accessToken', res.access_token);
        localStorage.setItem('userType', 'student');
        router.push('/dashboard/student');
      } else {
        res = await loginClub({
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('accessToken', res.access_token);
        localStorage.setItem('userType', 'club');
        router.push('/dashboard/club');
      }

      if (res?.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
        if (res.user.profile_photo) {
          localStorage.setItem('profilePhoto', res.user.profile_photo);
        }
      }

      window.dispatchEvent(new Event('userTypeChanged'));

      console.log('✅ Login successful:', res);
    } catch (err: unknown | Error) {
      console.error('❌ Login error:', err);
      const msg =
        err instanceof Error
        'Login failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <LogIn className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-red-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <p className="text-gray-600">Sign in to your student or club account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Alert variant="destructive">{error}</Alert>}

            <div className="space-y-2">
              <Label>User Type</Label>
              <select
              title='j'
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 bg-white/90"
              >
                <option value="student">Student</option>
                <option value="club">Club</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="example@university.edu"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-11 bg-white/90"
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="h-11 bg-white/90"
              />
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Create account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
