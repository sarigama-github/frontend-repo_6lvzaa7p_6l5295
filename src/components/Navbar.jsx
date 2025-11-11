import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Menu, Smartphone, Laptop, Watch, Headphones, Newspaper, Heart, UserRound } from 'lucide-react'
import { api, getUser, setUser, getCompareList } from '../lib/api'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()
  const user = getUser()

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!query) { setSuggestions([]); return }
      try { const res = await api.listProducts({ search: query, limit: 5 }); setSuggestions(res.items) } catch {}
    }, 250)
    return () => clearTimeout(t)
  }, [query])

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/category/mobiles?search=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  const loginDemo = async () => {
    const email = prompt('Enter email to login (demo)') || `guest+${Date.now()}@example.com`
    const u = await api.login(email, 'Guest')
    setUser(u)
    window.location.reload()
  }

  const compareCount = getCompareList().length

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-white/75 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Open Menu">
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="font-extrabold text-xl tracking-tight">TechCompare<span className="text-blue-600">.ai</span></Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <NavLink to="/category/mobiles" className={({isActive}) => isActive? 'text-blue-600' : undefined}><Smartphone className="inline w-4 h-4 mr-1"/>Mobiles</NavLink>
          <NavLink to="/category/laptops" className={({isActive}) => isActive? 'text-blue-600' : undefined}><Laptop className="inline w-4 h-4 mr-1"/>Laptops</NavLink>
          <NavLink to="/category/tablets" className={({isActive}) => isActive? 'text-blue-600' : undefined}><Smartphone className="inline w-4 h-4 mr-1 rotate-90"/>Tablets</NavLink>
          <NavLink to="/category/watches" className={({isActive}) => isActive? 'text-blue-600' : undefined}><Watch className="inline w-4 h-4 mr-1"/>Watches</NavLink>
          <NavLink to="/category/accessories" className={({isActive}) => isActive? 'text-blue-600' : undefined}><Headphones className="inline w-4 h-4 mr-1"/>Accessories</NavLink>
          <NavLink to="/news" className={({isActive}) => isActive? 'text-blue-600' : undefined}><Newspaper className="inline w-4 h-4 mr-1"/>News</NavLink>
        </nav>
        <form onSubmit={onSearch} className="flex-1 hidden md:flex max-w-xl ml-auto">
          <div className="relative w-full">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search phones, specs..." className="w-full rounded-l-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {suggestions.length>0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-slate-200 rounded-md shadow-lg mt-1 p-2 space-y-1 z-20">
                {suggestions.map(s => (
                  <Link key={s.id} to={`/product/${s.slug}`} className="block px-2 py-1 rounded hover:bg-slate-50" onClick={()=>setSuggestions([])}>
                    <span className="text-sm text-slate-700">{s.title}</span>
                    <span className="text-xs text-slate-500 ml-2">{s.brand}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button className="bg-blue-600 text-white px-4 rounded-r-md"><Search className="w-4 h-4"/></button>
        </form>
        <div className="flex items-center gap-3">
          <Link to="/compare" className="relative px-3 py-1 rounded hover:bg-slate-100">
            <span className="text-sm">Compare</span>
            {compareCount>0 && <span className="absolute -top-1 -right-1 text-[10px] bg-blue-600 text-white rounded-full px-1">{compareCount}</span>}
          </Link>
          <Link to="/wishlist" className="px-3 py-1 rounded hover:bg-slate-100"><Heart className="w-5 h-5"/></Link>
          <button onClick={loginDemo} className="px-3 py-1 rounded hover:bg-slate-100 flex items-center gap-1"><UserRound className="w-5 h-5"/>{user? 'Account' : 'Login'}</button>
        </div>
      </div>
      {/* Mobile search */}
      <form onSubmit={onSearch} className="md:hidden px-4 pb-3">
        <div className="flex">
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search phones, specs..." className="flex-1 rounded-l-md border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button className="bg-blue-600 text-white px-4 rounded-r-md"><Search className="w-4 h-4"/></button>
        </div>
      </form>
      {open && (
        <div className="md:hidden border-t border-slate-200 px-4 pb-4 space-y-2">
          <NavLink to="/category/mobiles" onClick={()=>setOpen(false)} className="block py-2">Mobiles</NavLink>
          <NavLink to="/category/laptops" onClick={()=>setOpen(false)} className="block py-2">Laptops</NavLink>
          <NavLink to="/category/tablets" onClick={()=>setOpen(false)} className="block py-2">Tablets</NavLink>
          <NavLink to="/category/watches" onClick={()=>setOpen(false)} className="block py-2">Watches</NavLink>
          <NavLink to="/category/accessories" onClick={()=>setOpen(false)} className="block py-2">Accessories</NavLink>
          <NavLink to="/news" onClick={()=>setOpen(false)} className="block py-2">News & Reviews</NavLink>
        </div>
      )}
    </header>
  )
}
