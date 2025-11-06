'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function DonePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Password Changed!
                    </CardTitle>
                    <p className="text-gray-600 text-sm mt-2">
                        Your password has been changed successfully.
                    </p>
                </CardHeader>

                <CardContent>
                    <Button
                        onClick={() => router.push('/auth/login')}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base rounded-lg"
                    >
                        Back to Login
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}