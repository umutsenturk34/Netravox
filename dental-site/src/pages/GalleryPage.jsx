import { useState, useEffect } from 'react';
import { getGallery } from '../api/client';

const fallback = Array.from({ length: 9 }, (_, i) => ({
  _id: `f${i}`, url: `https://picsum.photos/seed/dental${i}/600/450`, alt: {},
}));

export default function GalleryPage() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery().then((d) => setPhotos(d.length ? d : fallback)).catch(() => setPhotos(fallback)).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="bg-[#F0FDFF] py-16 text-center border-b border-[#E0F2FE]">
        <p className="text-xs tracking-[0.3em] uppercase text-[#0E7490] font-semibold mb-3">Fotoğraflar</p>
        <h1 className="text-4xl text-[#0C1B2E]">Galeri</h1>
        <p className="text-[#64748B] mt-3 max-w-md mx-auto text-sm">Kliniğimizden, tedavi süreçlerimizden ve ekibimizden kareler.</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">
        {loading ? (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="break-inside-avoid h-48 w-full mb-4 animate-pulse bg-[#E0F2FE] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {photos.map((p) => (
              <div key={p._id} className="break-inside-avoid overflow-hidden rounded-2xl group mb-4">
                <img src={p.thumbnailUrl || p.url} alt={p.alt?.tr || ''}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
