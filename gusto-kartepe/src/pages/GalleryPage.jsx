import { useState, useEffect } from 'react';
import { getGallery } from '../api/client';

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-[#E8E4E0] rounded ${className}`} />;
}

const fallback = [
  'gallery1','gallery2','gallery3','gallery4','gallery5','gallery6',
  'gallery7','gallery8','gallery9','gallery10','gallery11','gallery12',
].map((seed) => ({ _id: seed, url: `https://picsum.photos/seed/${seed}/600/450`, alt: {} }));

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery()
      .then((data) => setPhotos(data.length ? data : fallback))
      .catch(() => setPhotos(fallback))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="bg-[#FAF8F5] py-14 text-center border-b border-[#E8E4E0]">
        <p className="text-xs tracking-[0.3em] uppercase text-[#8B1A1A] mb-2">Fotoğraflar</p>
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'var(--font-serif)' }}>Galeri</h1>
        <p className="text-[#6B6B6B] mt-3 max-w-md mx-auto text-sm">
          Mekanımızdan, mutfağımızdan ve doğanın kalbinden kareler.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {loading ? (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="break-inside-avoid h-48 w-full mb-4" />
            ))}
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((p) => (
              <div key={p._id} className="break-inside-avoid overflow-hidden rounded-lg group mb-4">
                <img
                  src={p.thumbnailUrl || p.url}
                  alt={p.alt?.tr || ''}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
