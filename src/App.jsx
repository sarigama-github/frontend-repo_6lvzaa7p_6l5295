import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'
import Compare from './pages/Compare'
import News from './pages/News'
import Wishlist from './pages/Wishlist'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/product/:slug" element={<ProductDetail />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/news" element={<News />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
  )
}
