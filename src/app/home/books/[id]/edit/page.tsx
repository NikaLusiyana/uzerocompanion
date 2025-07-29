// 📄 app/home/books/[id]/edit/page.tsx → Edit Buku

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ActionButton from '@/src/components/ui/ActionButton'
import PageHeader from '@/src/components/ui/PageHeader'
import { ArrowBigLeftDashIcon } from 'lucide-react'

export default function EditBookPage() {
  const router = useRouter()
  const { id } = useParams()

  const [form, setForm] = useState({
    title: '',
    author: '',
    status: 'Draft',
    progress: 0,
    cover: ''
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/books/${id}`)
      .then(res => res.json())
      .then(data => setForm(data))
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
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

      <form onSubmit={handleSubmit} className="bg-[var(--brand-darker)] p-6 rounded-lg max-w-7xl mx-auto text-[var(--brand-light)]">
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
          <label className="block mb-1 font-medium">Progress (%)</label>
          <input
            name="progress"
            type="number"
            value={form.progress}
            min={0}
            max={100}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-[var(--background)] text-[var(--brand-light)]"
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
