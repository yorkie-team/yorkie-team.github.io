'use client';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';
import Head from 'next/head';
import { useState, useEffect } from 'react';

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>Title</Head>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
