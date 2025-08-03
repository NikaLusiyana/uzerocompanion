// 📄 app/home/books/[id]/edit/page.tsx → Edit Buku

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ActionButton from '@/src/components/ui/ActionButton'
import PageHeader from '@/src/components/ui/PageHeader'
import { ArrowBigLeftDashIcon } from 'lucide-react'

type Genre = {
  id: number
  name: string
}

export default function EditBookPage() {
  const router = useRouter()
  const { id } = useParams()

  const [form, setForm] = useState({
    title: '',
    author: '',
    status: 'Draft',
    progress: 0,
    targetWordCount: '',
    sinopsis: '',
    cover: ''
  })

  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch genres
  useEffect(() => {
    fetch('/api/genres')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGenres(data)
      })
      .catch(err => console.error('Gagal memuat genre:', err))
  }, [])

  // Fetch book data
  useEffect(() => {
    if (!id) return

    fetch(`/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title || '',
          author: data.author || '',
          status: data.status || 'Draft',
          progress: data.progress || 0,
          targetWordCount: String(data.targetWordCount || ''),
          sinopsis: data.sinopsis || '',
          cover: data.cover || ''
        })

        // Jika ada genres, simpan id-nya
        if (Array.isArray(data.genres)) {
          setSelectedGenres(data.genres.map((g: Genre) => g.id))
        }
      })
      .catch(err => {
        console.error(err)
        alert('Gagal memuat data buku')
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) : value
    }))
  }

  const handleGenreToggle = (id: number) => {
    setSelectedGenres(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise(res => setTimeout(res, 100));
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          targetWordCount: parseInt(form.targetWordCount) || 0,
          genreIds: selectedGenres
        })
      })

      if (res.ok) {
        router.push('/home/books')
      } else {
        const error = await res.text()
        alert('Gagal memperbarui buku: ' + error)
      }
    } catch (err) {
      console.error(err)
      alert('Terjadi kesalahan saat memperbarui buku.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Edit Buku"
        subtitle="Perbarui data buku ini"
        action={
          <Link href="/home/books">
            <ActionButton icon={<ArrowBigLeftDashIcon size={16} />}>
              Kembali ke daftar buku
            </ActionButton>
          </Link>
        }
      />

      <form onSubmitCapture={handleSubmit} className="bg-[var(--brand-darker)] p-6 rounded-lg max-w-7xl mx-auto text-[var(--brand-light)]">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Judul</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[var(--background)] text-[var(--brand-light)]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Penulis</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[var(--background)] text-[var(--brand-light)]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[var(--background)] text-[var(--brand-light)]"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Target Jumlah Kata</label>
          <input
            name="targetWordCount"
            type="number"
            value={form.targetWordCount}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[var(--background)] text-[var(--brand-light)]"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Genre</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {genres.map(genre => (
              <label
                key={genre.id}
                className="flex items-center bg-[var(--background)] px-3 py-2 rounded text-sm hover:bg-[var(--brand-dark)] transition"
              >
                <input
                  type="checkbox"
                  value={genre.id}
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleGenreToggle(genre.id)}
                  className="mr-2 accent-[var(--brand-gold)]"
                />
                {genre.name}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Sinopsis</label>
          <textarea
            name="sinopsis"
            value={form.sinopsis}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, sinopsis: e.target.value }))
            }
            className="w-full p-2 rounded bg-[var(--background)] text-[var(--brand-light)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)]"
          />
        </div>


        <div className="mb-6">
          <label className="block mb-1 font-medium">URL Sampul (opsional)</label>
          <input
            name="cover"
            value={form.cover || ''}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[var(--background)] text-[var(--brand-light)]"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded bg-[var(--brand-gold)] text-[var(--brand-darker)] font-semibold hover:bg-[var(--brand-goldhover)] transition-colors"
        >
          {loading ? 'Menyimpan...' : 'Perbarui Buku'}
        </button>
      </form>
    </>
  )
}
