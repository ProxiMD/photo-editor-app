import dynamic from 'next/dynamic';

const PhotoEditor = dynamic(() => import('@/components/PhotoEditor'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <PhotoEditor />
      </div>
    </main>
  );
}
