'use client';

import { useState } from 'react';
import Head from 'next/head';
import Hero from '@/components/Hero';
import MessageCard from '@/components/MessageCard';
import Confetti from '@/components/Confetti';
import { Toaster } from '@/lib/toast';

export default function Home() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpenGift = () => {
    setIsGiftOpened(true);
    setShowConfetti(true);
  };

  const handleConfettiComplete = () => {
    setShowConfetti(false);
  };

  const handleRestart = () => {
    setIsGiftOpened(false);
    setShowConfetti(false);
  };

  const toastOptions = {
    duration: 3000,
    style: {
      background: 'var(--primary)',
      color: 'var(--text)',
      borderRadius: '12px',
      padding: '12px 20px',
      fontSize: '14px',
    },
  };

  return (
    <>
      <Head>
        <title>Feliz Día de la Novia 👑</title>
        <meta
          name="description"
          content="Una sorpresa especial para Ishell en el Día de la Novia: cartas, música y recuerdos llenos de amor."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="Día de la Novia, carta de amor, sorpresa romántica, Ishell, Jendry"
        />
        <meta name="author" content="Jendry" />

        {/* Favicon - Multiple formats for better browser support */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.svg" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Feliz Día de la Novia 👑" />
        <meta
          property="og:description"
          content="Una sorpresa especial para Ishell en el Día de la Novia: cartas, música y recuerdos llenos de amor."
        />
        <meta
          property="og:image"
          content="/assets/d27c62da-64ce-4244-9419-dab91c3ebf48.jpeg"
        />
        <meta
          property="og:url"
          content="https://national-princess-day.vercel.app"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Feliz Día de la Novia 👑" />
        <meta
          name="twitter:description"
          content="Una sorpresa especial de Jendry para Ishell."
        />
        <meta
          name="twitter:image"
          content="/assets/d27c62da-64ce-4244-9419-dab91c3ebf48.jpeg"
        />

        {/* Additional SEO */}
        <meta name="theme-color" content="#fff8e7" />
        <link rel="canonical" href="https://national-princess-day.vercel.app" />
      </Head>

      <main className="min-h-screen">
        {!isGiftOpened && (
          <Hero onOpenGift={handleOpenGift} isGiftOpened={isGiftOpened} />
        )}
        {isGiftOpened && (
          <MessageCard isRevealed={isGiftOpened} onRestart={handleRestart} />
        )}
        <Confetti trigger={showConfetti} onComplete={handleConfettiComplete} />
      </main>

      <Toaster position="bottom-center" toastOptions={toastOptions} />
    </>
  );
}
