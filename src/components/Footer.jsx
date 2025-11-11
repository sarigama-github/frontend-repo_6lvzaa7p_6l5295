export default function Footer(){
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-slate-800 text-lg">TechCompare.ai</h3>
          <p className="text-slate-600 text-sm mt-2">Discover, compare and decide with confidence. The modern way to shop phones, laptops and gadgets.</p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-700">Quick Links</h4>
          <ul className="mt-2 text-sm text-slate-600 space-y-1">
            <li><a href="/category/mobiles" className="hover:text-blue-600">Mobiles</a></li>
            <li><a href="/category/laptops" className="hover:text-blue-600">Laptops</a></li>
            <li><a href="/news" className="hover:text-blue-600">News & Reviews</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-slate-700">Follow</h4>
          <p className="text-sm text-slate-600 mt-2">Twitter · Instagram · YouTube</p>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 py-4">© {new Date().getFullYear()} TechCompare.ai — All rights reserved.</div>
    </footer>
  )
}
