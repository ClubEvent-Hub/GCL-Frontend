'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function VerifyCodePage() {
    const router = useRouter();
    const [code, setCode] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        const savedEmail = localStorage.getItem('resetEmail');
        if (!savedEmail) {
            router.push('/forgot-password');
        }
    }, [router]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 3) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const verificationCode = code.join('');
            if (verificationCode.length !== 4) {
                setError('Please enter the complete 4-digit code');
                setLoading(false);
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            router.push('/auth/reset-password');
        } catch (err) {
            setError('Invalid verification code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setError('');
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCountdown(60);
        } catch (err) {
            setError('Failed to resend code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-start mb-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleBack}
                            className="text-gray-600 hover:text-gray-800 -ml-2"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back
                        </Button>
                    </div>

                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <CardTitle className="text-2xl font-bold text-gray-800">
                        T P Verification
                    </CardTitle>

                    <p className="text-gray-600 text-sm mt-2">
                        Enter the verification code we just sent on your email address.
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="flex justify-center space-x-3">
                                {code.map((digit: string, index: number) => (
                                    <Input
                                        key={index}
                                        id={`code-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e: React.KeyboardEvent) => handleKeyDown(index, e)}
                                        className="w-14 h-14 text-center text-xl font-bold bg-white/90 border-gray-300 focus:border-blue-500 rounded-lg"
                                        required
                                    />
                                ))}
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base rounded-lg"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify'}
                        </Button>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">
                                Didnt received code?{' '}
                                {countdown > 0 ? (
                                    <span className="text-gray-400">
                                        Resend ({countdown}s)
                                    </span>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResendCode}
                                        className="text-blue-600 hover:text-blue-700 font-semibold"
                                        disabled={loading}
                                    >
                                        Resend
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}