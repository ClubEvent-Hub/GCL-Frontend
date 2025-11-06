'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeContent from './HomeContent/page'; 
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();


  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType) {
      router.replace('/home');
    }
  }, [router]);
  return <HomeContent />;
}
