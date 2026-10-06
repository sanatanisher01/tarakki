"use client";
import { useState } from "react";
import { Search, MapPin, Clock, ExternalLink, ShoppingBag, MessageCircle } from "lucide-react";
import type { Shop, Product } from "./types";

export function whatsappNumber(phone: string) { const n = phone.replace(/\D/g, ""); return /^[6-9]\d{9}$/.test(n) ? `91${n}` : /^91[6-9]\d{9}$/.test(n) ? n : ""; }
export const rupees = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
export default function Storefront({ shop, products, preview }: { shop: Shop; products: Product[]; preview: boolean }) {
  const [search, setSearch] = useState(""); const phone = whatsappNumber(shop.phone);
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return <div className={`storefront theme-${shop.theme}`}>
    {preview && <div className="preview-banner">Owner preview · This is how your customers will see your shop.</div>}
    <header className="store-header"><div className="store-container"><a href="#catalogue" className="store-wordmark"><ShoppingBag size={23}/>{shop.name || "Your shop"}</a><span className="store-category">{shop.category || "Local business"}</span></div></header>
    <main className="store-container"><section className="store-intro"><p className="eyebrow">YOUR NEIGHBOURHOOD, ONLINE</p><h1>{shop.name || "Welcome to our shop"}<span>.</span></h1>{shop.description && <p className="store-description">{shop.description}</p>}<div className="store-details">{shop.address && <span><MapPin size={16}/>{shop.address}</span>}{shop.hours && <span><Clock size={16}/>{shop.hours}</span>}</div>{phone && <a className="button primary" href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Chat on WhatsApp <ExternalLink size={17}/></a>}</section>
      <section id="catalogue" className="catalogue"><div className="catalogue-heading"><div><p className="eyebrow">FIND SOMETHING YOU LOVE</p><h2>Our products <span className="count">{products.length}</span></h2></div><label className="search-field"><Search size={18}/><input aria-label="Search products" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)}/></label></div>
      {filtered.length ? <div className="store-products">{filtered.map(product => <article className="store-product" key={product.id}><div className="product-photo">{product.image ? <img src={product.image} alt={product.name}/> : <ShoppingBag size={42} strokeWidth={1}/>}<span className={`stock-tag ${product.stock === 0 ? "sold-out" : ""}`}>{product.stock === 0 ? "Out of stock" : "In stock"}</span></div><div className="store-product-info"><h3>{product.name}</h3><strong>{rupees(product.price)}</strong>{product.description && <p>{product.description}</p>}{phone && product.stock > 0 && <a href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hello! I'm interested in ${product.name} (${rupees(product.price)}). Is it available?`)}`} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <ExternalLink size={17}/></a>}</div></article>)}</div> : <div className="store-empty"><ShoppingBag size={38}/><h3>{search ? "No products match your search" : "Good things are on their way"}</h3><p>{search ? "Try a different product name." : "Our catalogue will be available here soon."}</p></div>}</section>
    </main><footer className="store-footer"><span>{shop.name || "Your local shop"}</span><span>Made with <strong>tarakki</strong></span></footer>
  </div>;
}

