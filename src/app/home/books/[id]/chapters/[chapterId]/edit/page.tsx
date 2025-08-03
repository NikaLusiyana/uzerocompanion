// 📄 app/home/book/[id]/chapters/[chapterId]/edit/page.tsx

'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ActionButton from '@/src/components/ui/ActionButton'
import PageHeader from '@/src/components/ui/PageHeader'
import { ArrowBigLeftDashIcon } from 'lucide-react'
import CustomAlert from '@/src/components/ui/CustomAlert'

export default function EditChapterPage() {
  const router = useRouter()
  const params = useParams()
  const bookId = Number(params.id)
  const chapterId = Number(params.chapterId)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Fetch data chapter yang sudah ada
  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await fetch(`/api/books/${bookId}/chapters/${chapterId}`)
        const data = await res.json()

        if (!res.ok) {
          throw new Error('Gagal mengambil data chapter')
        }

        setTitle(data.title)
        setContent(data.content)
      } catch (err) {
        console.error(err)
        setAlert({ message: 'Gagal memuat chapter', type: 'error' })
      } finally {
        setIsLoading(false)
      }
    }

    fetchChapter()
  }, [bookId, chapterId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch(`/api/books/${bookId}/chapters/${chapterId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })

      const result = await res.json()
      console.log('📦 Respon:', result)

      if (!res.ok) {
        throw new Error('Gagal memperbarui chapter')
      }

      setAlert({ message: 'Chapter berhasil diperbarui', type: 'success' })
      router.push(`/home/books/${bookId}`)
    } catch (err) {
      console.error(err)
      setAlert({ message: 'Gagal memperbarui chapter', type: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="text-center py-8">Memuat data chapter...</div>
  }

  return (
    <>
      {alert && <CustomAlert message={alert.message} type={alert.type} />}

      <PageHeader
        title="Edit Chapter"
        subtitle="Perbarui isi chapter buku ini"
        action={
          <Link href={`/home/books/${bookId}`}>
            <ActionButton icon={<ArrowBigLeftDashIcon size={16} />}>
              Kembali ke detail buku
            </ActionButton>
          </Link>
        }
      />

      <form
        onSubmit={handleSubmit}
        className="bg-[var(--brand-darker)] p-6 rounded-lg mx-auto text-[var(--brand-light)] space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Judul Chapter</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 rounded bg-[var(--background)] text-[var(--brand-light)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Isi</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="w-full p-2 rounded bg-[var(--background)] text-[var(--brand-light)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !title}
          className="w-full py-3 px-4 rounded bg-[var(--brand-gold)] text-[var(--brand-darker)] font-semibold hover:bg-[var(--brand-goldhover)] transition-colors"
        >
          {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </>
  )
}
