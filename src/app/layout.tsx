import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';

const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photo Editor",
  description: "A modern photo editor with film emulation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedBackground />
        <div className="relative min-h-screen">
          {children}
          <footer className="absolute bottom-0 w-full py-4 text-white/80 flex justify-center items-center gap-6">
            <div className="flex items-center gap-6">
              <span>Built by Mudit Dubey 2024</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/muditggx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Icon icon="mdi:instagram" className="w-5 h-5" />
                </a>
                <a
                  href="https://www.buymeacoffee.com/muditggx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  <Icon icon="simple-icons:buymeacoffee" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
