"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ShoppingCart, Star, ArrowRight, Check, Heart, Truck, Shield, RefreshCw, Sparkles, ChevronRight, Eye } from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline Data ────────────────────────────────────────────────────────────

const featuredProducts = [
  {
    id: 1,
    name: "Aether Ceramic Vase",
    category: "Home Décor",
    price: 128,
    originalPrice: 160,
    rating: 4.9,
    reviews: 214,
    badge: "Best Seller",
    image: "https://cdn.shopify.com/s/files/1/0653/7697/7075/files/1764583535124-RATENY-_0002__0007_3-AETHER3nodes.jpg?v=1768236823",
    colors: ["#E8DDD0", "#B5A99A", "#6B5E52"],
  },
  {
    id: 2,
    name: "Linen Throw Blanket",
    category: "Textiles",
    price: 89,
    originalPrice: null,
    rating: 4.8,
    reviews: 178,
    badge: "New",
    image: "https://i.etsystatic.com/17725177/r/il/a96f8f/2359898473/il_fullxfull.2359898473_j791.jpg",
    colors: ["#D4C5B0", "#A89880", "#7A6B58"],
  },
  {
    id: 3,
    name: "Walnut Desk Organizer",
    category: "Workspace",
    price: 74,
    originalPrice: 95,
    rating: 4.7,
    reviews: 132,
    badge: "Sale",
    image: "https://m.media-amazon.com/images/I/61yAEr-XpWL.jpg",
    colors: ["#8B6F47", "#6B5230", "#4A3820"],
  },
  {
    id: 4,
    name: "Matte Black Candle Set",
    category: "Lifestyle",
    price: 56,
    originalPrice: null,
    rating: 5.0,
    reviews: 89,
    badge: "Editor's Pick",
    image: "https://i5.walmartimages.com/asr/078704f0-9e43-40d6-b92a-655575a886e6.66cc38c0cb9d38e6b6d2d272a5811930.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    colors: ["#1A1A1A", "#3D3D3D", "#6B6B6B"],
  },
  {
    id: 5,
    name: "Handwoven Rattan Tray",
    category: "Home Décor",
    price: 48,
    originalPrice: 65,
    rating: 4.6,
    reviews: 97,
    badge: "Sale",
    image: "https://i.etsystatic.com/32099958/r/il/11947f/5714004185/il_570xN.5714004185_fumu.jpg",
    colors: ["#C4A882", "#A08060", "#7A6040"],
  },
  {
    id: 6,
    name: "Brushed Gold Carafe",
    category: "Dining",
    price: 112,
    originalPrice: null,
    rating: 4.9,
    reviews: 156,
    badge: "New",
    image: "https://m.media-amazon.com/images/I/71P8ZcRFtZL.jpg",
    colors: ["#D4AF37", "#B8960C", "#8B6914"],
  },
];

const categories = [
  {
    id: 1,
    name: "Home Décor",
    count: 142,
    image: "https://www.decorilla.com/online-decorating/wp-content/uploads/2022/05/Boho-home-decor-AD-scaled.jpeg",
    color: "from-amber-50 to-orange-100",
  },
  {
    id: 2,
    name: "Textiles",
    count: 87,
    image: "https://www.decorilla.com/online-decorating/wp-content/uploads/2022/05/Boho-home-decor-AD-scaled.jpeg",
    color: "from-stone-50 to-stone-100",
  },
  {
    id: 3,
    name: "Workspace",
    count: 63,
    image: "https://assets.vogue.com/photos/6837010b912fb6fc4a21a186/4:3/w_2776,h_2082,c_limit/Vintage%20Guatemalan%20Textiles%202%20Molly%20Berry.jpg",
    color: "from-zinc-50 to-zinc-100",
  },
  {
    id: 4,
    name: "Dining",
    count: 95,
    image: "https://www.hatcollective.com/wp-content/uploads/2022/08/360-workspace-kita-e2-open-office.jpg",
    color: "from-yellow-50 to-amber-100",
  },
];

const valueProps = [
  {
    icon: Truck,
    title: "Free Worldwide Shipping",
    description:
      "Complimentary shipping on all orders over $75. Delivered in 3–5 business days.",
  },
  {
    icon: Shield,
    title: "Authenticity Guaranteed",
    description:
      "Every product is hand-selected and verified by our curation team for quality and origin.",
  },
  {
    icon: RefreshCw,
    title: "30-Day Returns",
    description:
      "Not in love? Return any item within 30 days for a full refund — no questions asked.",
  },
  {
    icon: Sparkles,
    title: "Curated Collections",
    description:
      "Our editors scour the globe to bring you pieces that are rare, refined, and remarkable.",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sophia Laurent",
    role: "Interior Designer",
    avatar: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_632,q_75,w_640/v1/crm/johnstoncounty/Curated-Collections-4-2000x1500-72-dpi_D76125D3-9B00-3246-BEE5CC5F7A90DA6D-d7611f72aab3433_d76170cc-0c32-4c28-40202cf8dfbe6f4f.jpg",
    rating: 5,
    text: "Lumière has completely transformed how I source pieces for my clients. The quality is unmatched and the curation is impeccable — every item tells a story.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Architect",
    avatar: "https://podcastle.org/wp-content/uploads/2024/09/photo_2024-06-24_16-15-54-660x989.jpg",
    rating: 5,
    text: "I've been shopping here for two years and the consistency is remarkable. The ceramic vase collection alone is worth every visit. Truly a discerning eye at work.",
  },
  {
    id: 3,
    name: "Isabelle Moreau",
    role: "Lifestyle Blogger",
    avatar: "https://static.wikia.nocookie.net/desperados/images/a/a7/Hud_portrait_isabelle.png/revision/latest?cb=20201109223554",
    rating: 5,
    text: "My followers always ask where I find such beautiful pieces. The answer is always Lumière. Fast shipping, gorgeous packaging, and products that photograph beautifully.",
  },
];

const saleProducts = [
  {
    id: 7,
    name: "Travertine Bookend Pair",
    category: "Home Décor",
    price: 68,
    originalPrice: 110,
    discount: 38,
    image: "https://cb.scene7.com/is/image/Crate/DurresTravertineBookendsS2SSS25",
  },
  {
    id: 8,
    name: "Merino Wool Cushion",
    category: "Textiles",
    price: 52,
    originalPrice: 80,
    discount: 35,
    image: "https://becozi.net/cdn/shop/products/pillows_95310a76-1c61-44f2-9ab8-2329777a89bf_2048x2048.jpg?v=1568708744",
  },
  {
    id: 9,
    name: "Smoked Glass Pendant",
    category: "Lighting",
    price: 145,
    originalPrice: 220,
    discount: 34,
    image: "https://cdn.media.amplience.net/i/shadesoflight/PE15148.0.PE15148PN.jpg",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500" style={{ color: "#1d0d02", backgroundColor: "#fff7ed" }}>
        {rating.toFixed(1)} ({count})
      </span>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof featuredProducts)[0] }) {
  const [wishlisted, setWishlisted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  const badgeColor: Record<string, string> = {
    "Best Seller": "bg-orange-500 text-white",
    New: "bg-emerald-500 text-white",
    Sale: "bg-red-500 text-white",
    "Editor's Pick": "bg-violet-500 text-white",
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            badgeColor[product.badge] ?? "bg-gray-800 text-white"
          }`}
        >
          {product.badge}
        </span>
        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setWishlisted((w) => !w)}
            aria-label="Add to wishlist"
            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
            />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            aria-label="Quick view"
            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-orange-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-500" />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-orange-500 font-medium uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="text-gray-900 font-semibold text-base mb-2 leading-snug">
          {product.name}
        </h3>
        <StarRating rating={product.rating} count={product.reviews} />

        {/* Colors */}
        <div className="flex items-center gap-1.5 mt-3">
          {(product.colors ?? []).map((color) => (
            <span
              key={color}
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200 cursor-pointer hover:ring-orange-400 transition-all"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice != null && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <motion.button
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors duration-200"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-stone-50 via-orange-50/30 to-amber-50/20 pt-20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-amber-100/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                New Collection 2025
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight"
            >
              Objects of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                Quiet
              </span>{" "}
              Beauty
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 leading-relaxed max-w-md"
            >
              {APP_TAGLINE} Discover handpicked home goods, textiles, and
              lifestyle pieces that bring warmth and intention to every space.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.a
                style={{ color: "#130101", backgroundColor: "#ea580c" }}
                href="#products"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3.5 rounded-2xl shadow-lg shadow-orange-200 transition-colors duration-200"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#about"
                whileHover={shouldReduceMotion ? {} : { x: 4 }}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 text-gray-700 font-medium hover:text-orange-500 transition-colors duration-200"
              >
                Our Story
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-8 pt-4 border-t border-gray-200"
            >
              {[
                { value: "12K+", label: "Happy Customers" },
                { value: "500+", label: "Curated Products" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — hero image grid */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:grid grid-cols-2 gap-4"
          >
            <div className="flex flex-col gap-4 mt-10">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-xl">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/9bd13258-33e4-4648-a809-6ad1d2447873/aa66660bd82145bdbd1518b2f88210ad.png"
                  alt="Curated home décor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-square shadow-lg">
                <img
                  src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/assets/9bd13258-33e4-4648-a809-6ad1d2447873/aa66660bd82145bdbd1518b2f88210ad.png"
                  alt="Linen textiles"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl overflow-hidden aspect-square shadow-lg">
                <img
                  src="https://www.humancentric.com/cdn/shop/files/Bundle_Display.jpg?v=1698355945"
                  alt="Workspace essentials"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-xl">
                <img
                  src="https://www.humancentric.com/cdn/shop/files/Bundle_Display.jpg?v=1698355945"
                  alt="Lifestyle candles"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 border border-gray-100"
            >
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">New this week</p>
                <p className="text-sm font-bold text-gray-900">24 new pieces</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <motion.div variants={fadeInUp}>
              <p className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-2">
                Browse by Category
              </p>
              <h2 className="text-4xl font-bold text-gray-900">
                Find Your Aesthetic
              </h2>
            </motion.div>
            <motion.a
              variants={fadeInUp}
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
            >
              View all products <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {cat.name}
                  </h3>
                  <p className="text-white/70 text-sm mt-0.5">
                    {cat.count} items
                  </p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-gray-800" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section id="products" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-2"
            >
              Handpicked for You
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Featured Products
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-gray-500 max-w-xl mx-auto"
            >
              Each piece in our collection is chosen for its craftsmanship,
              story, and ability to elevate everyday living.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Value Props ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {valueProps.map((vp) => {
              const Icon = vp.icon;
              return (
                <motion.div
                  key={vp.title}
                  variants={fadeInUp}
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-stone-50 hover:bg-orange-50 transition-colors duration-300 border border-transparent hover:border-orange-100"
                >
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5">
                      {vp.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {vp.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Sale Section ── */}
      <section id="sale" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <motion.div variants={slideInLeft}>
              <span className="inline-block bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                Limited Time
              </span>
              <h2 className="text-4xl font-bold text-white">
                End-of-Season Sale
              </h2>
              <p className="text-gray-400 mt-2">
                Up to 40% off on selected pieces. While stocks last.
              </p>
            </motion.div>
            <motion.div
              variants={slideInRight}
              className="flex items-center gap-3 bg-white/10 backdrop-blur rounded-2xl px-5 py-3"
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-white">48</p>
                <p className="text-xs text-gray-400">Hours</p>
              </div>
              <span className="text-white/40 text-xl font-light">:</span>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">23</p>
                <p className="text-xs text-gray-400">Minutes</p>
              </div>
              <span className="text-white/40 text-xl font-light">:</span>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">59</p>
                <p className="text-xs text-gray-400">Seconds</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {saleProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={scaleIn}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/40 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    -{product.discount}%
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-orange-400 font-medium uppercase tracking-wider mb-1">
                    {product.category}
                  </p>
                  <h3 className="text-white font-semibold text-base mb-3">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white">
                        ${product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-medium px-3 py-2 rounded-xl transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Add
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-12 text-center"
          >
            <motion.p
              variants={fadeInUp}
              className="text-orange-500 text-sm font-semibold uppercase tracking-wider mb-2"
            >
              What Our Customers Say
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-gray-900"
            >
              Loved by Thousands
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover bg-gray-100"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-xl">
                  <img
                    src="https://static.wixstatic.com/media/46c48c_c274f3238eb64f56abb90f399f8eb239~mv2.jpg/v1/fill/w_560,h_496,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/46c48c_c274f3238eb64f56abb90f399f8eb239~mv2.jpg"
                    alt="Our atelier"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="rounded-3xl overflow-hidden aspect-square shadow-lg">
                    <img
                      src="https://blog.tcea.org/wp-content/uploads/2019/03/step-by-step.jpg"
                      alt="Curation process"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-lg">
                    <img
                      src="https://blog.tcea.org/wp-content/uploads/2019/03/step-by-step.jpg"
                      alt="Packaging detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Floating stat */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute -bottom-4 -right-4 bg-orange-500 text-white rounded-2xl shadow-xl px-5 py-4"
              >
                <p className="text-3xl font-bold">7+</p>
                <p className="text-sm text-orange-100">Years of Curation</p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col gap-6"
            >
              <motion.p
                variants={fadeInUp}
                className="text-orange-500 text-sm font-semibold uppercase tracking-wider"
              >
                Our Story
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold text-gray-900 leading-tight"
              >
                Born from a Love of Beautiful, Intentional Objects
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 leading-relaxed"
              >
                {APP_NAME} was founded in 2018 by a team of designers and
                collectors who believed that the objects we surround ourselves
                with shape how we feel. We travel the world — from Kyoto
                ceramics studios to Scandinavian textile mills — to bring you
                pieces that are made with care and meant to last.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="text-gray-600 leading-relaxed"
              >
                Every product in our collection is personally vetted. We ask:
                does it have a story? Is it made ethically? Will it age
                beautifully? If the answer is yes to all three, it earns a place
                in the Lumière family.
              </motion.p>
              <motion.ul variants={staggerContainer} className="flex flex-col gap-3">
                {[
                  "Ethically sourced from 30+ countries",
                  "Carbon-neutral shipping on all orders",
                  "1% of revenue donated to artisan communities",
                  "Certified B-Corp since 2021",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeInUp}
                    className="flex items-center gap-3 text-sm text-gray-700"
                  >
                    <span className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-orange-500" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeInUp}>
                <motion.a
                  href="#products"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#products")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-7 py-3.5 rounded-2xl transition-colors duration-200"
                >
                  Explore the Collection
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-amber-500">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              variants={scaleIn}
              className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center"
            >
              <Sparkles className="w-7 h-7 text-white" />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl font-bold text-white"
            >
              Join the Inner Circle
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-orange-100 text-lg max-w-md"
            >
              Be the first to know about new arrivals, exclusive sales, and
              behind-the-scenes stories from our artisans.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
            >
              <NewsletterForm />
            </motion.div>
            <motion.p variants={fadeInUp} className="text-orange-200 text-xs">
              No spam, ever. Unsubscribe at any time. Join 12,000+ subscribers.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 bg-white/20 text-white font-medium px-6 py-3.5 rounded-2xl w-full justify-center"
      >
        <Check className="w-5 h-5" />
        You&apos;re on the list!
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 px-5 py-3.5 rounded-2xl bg-white/20 backdrop-blur placeholder-orange-200 text-white border border-white/30 focus:outline-none focus:border-white focus:bg-white/30 transition-all duration-200"
      />
      <motion.button
        type="submit"
        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="bg-white text-orange-500 font-semibold px-6 py-3.5 rounded-2xl hover:bg-orange-50 transition-colors duration-200 whitespace-nowrap"
      >
        Subscribe
      </motion.button>
    </form>
  );
}