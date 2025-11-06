'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            router.push('/auth/done');
        } catch (err) {
            setError('Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-transparent backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center bg-transparent">
                    <div className="flex justify-start mb-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBack}
                            className="text-gray-600 hover:text-gray-800 -ml-2 bg-transparent"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                    </div>

                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Create new password
                    </CardTitle>

                    <p className="text-gray-700 text-sm mt-2">
                        Your new password must be unique from those previously used.
                    </p>
                </CardHeader>

                <CardContent className="bg-transparent">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                                New password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    className="h-12 bg-white/90 border-gray-300 focus:border-green-500 pr-10 text-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                Confirm new password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="h-12 bg-white/90 border-gray-300 focus:border-green-500 pr-10 text-gray-700"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold text-base rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}