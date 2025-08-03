// 📄 src/app/home/books/[id]/chapter/[chapterId]/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ActionButton from '@/src/components/ui/ActionButton';
import PageHeader from '@/src/components/ui/PageHeader';
import Link from 'next/link';
import { ArrowBigLeftDashIcon } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

type Chapter = {
  id: number;
  title: string;
  content: string;
  lastUpdated: string;
};

export default function Page() {
  const params = useParams();
  const bookId = Number(params.id);
  const chapterId = Number(params.chapterId);

  const [chapter, setChapter] = useState<Chapter | null>(null);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await fetch(`/api/books/${bookId}/chapters/${chapterId}`);
        const data = await res.json();
        setChapter(data);
      } catch (err) {
        console.error('Failed to fetch chapter', err);
      }
    };

    fetchChapter();
  }, [bookId, chapterId]);

  if (!chapter) return <p className="text-white">Loading...</p>;

  return (
    <>
      <PageHeader
        title="Preview Chapter"
        subtitle="Informasi mengenai chapter"
        action={
          <Link href={`/home/books/${bookId}`}>
            <ActionButton icon={<ArrowBigLeftDashIcon size={16} />}>
              Kembali ke detail buku
            </ActionButton>
          </Link>
        }
      />

      {/* Info Chapter */}
      <div className="bg-[var(--brand-darker)] rounded-xl px-15 py-10 space-y-4 border border-[var(--brand-dark)] text-[var(--brand-light)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-cinzel text-2xl font-semibold mb-1">{chapter.title}</h2>
            <p className="text-sm opacity-60">
              Terakhir diupdate: {dayjs(chapter.lastUpdated).format('D MMMM YYYY HH:mm A')}
            </p>

            {chapter.content && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Isi Bab</h4>
                <p className="whitespace-pre-line text-[var(--brand-light)] opacity-90 text-sm leading-relaxed">
                  {chapter.content}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
