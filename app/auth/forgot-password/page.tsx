'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));

            localStorage.setItem('resetEmail', email);

            router.push('/auth/verify-code');
        } catch (err) {
            setError('Failed to send code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Forgot Password?
                    </CardTitle>

                    <p className="text-gray-600 text-sm">
                        Dont worry! It occurs. Please enter the email address linked with your account.
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Enter your email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@university.edu"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                required
                                className="h-12 bg-white/90 border-gray-300 focus:border-blue-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                            disabled={loading}
                        >
                            {loading ? 'Sending Code...' : 'Send Code'}
                        </Button>

                        <div className="text-center">
                            <Link
                                href="/auth/login"
                                className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                            >
                                Remember Password? 
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}