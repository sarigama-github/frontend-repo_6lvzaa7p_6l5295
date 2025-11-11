import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { api } from '../lib/api'

export default function News(){
  const [articles, setArticles] = useState([])
  useEffect(() => { (async () => { try { setArticles(await api.articles()) } catch(e){ console.error(e) } })() }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-6">News & Reviews</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map(a => (
            <article key={a.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="aspect-video bg-slate-100">
                {a.cover_image && <img src={a.cover_image} alt={a.title} className="w-full h-full object-cover"/>}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-900 line-clamp-2">{a.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2 mt-1">{a.excerpt}</p>
                <p className="text-xs text-slate-500 mt-2">By {a.author}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
