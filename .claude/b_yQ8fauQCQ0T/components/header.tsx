"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Product", href: "#" },
    { label: "Who is this for", href: "#" },
    { label: "Case studies", href: "#" },
    { label: "Pricing", href: "#", active: true },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Matching Figma design */}
          <Link href="/" className="flex items-center gap-3">
            {/* Colorful Leanmote Logo */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Blue outer ring */}
              <path d="M20 4C28.8366 4 36 11.1634 36 20C36 28.8366 28.8366 36 20 36C11.1634 36 4 28.8366 4 20C4 11.1634 11.1634 4 20 4Z" stroke="#3B82F6" strokeWidth="3" fill="none"/>
              {/* Green accent */}
              <path d="M20 8C26.6274 8 32 13.3726 32 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
              {/* Pink/Magenta bottom accent */}
              <path d="M8 20C8 26.6274 13.3726 32 20 32" stroke="#EC4899" strokeWidth="3" strokeLinecap="round"/>
              {/* Center triangle/arrow */}
              <path d="M20 12L26 22H14L20 12Z" fill="#FBBF24"/>
              <circle cx="20" cy="24" r="3" fill="#FBBF24"/>
            </svg>
            <span className="text-white font-semibold text-xl tracking-tight">
              Lean<span className="text-teal">mote</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`px-4 py-2 text-sm transition-colors rounded-lg ${
                  item.active
                    ? "text-teal font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a 
              href="https://be.leanmote.com/book-a-demo-0"
              className="bg-teal hover:bg-teal-dark text-navy font-semibold px-5 py-2.5 rounded-lg transition-colors inline-flex items-center"
            >
              Sign Up
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy border-t border-white/10">
          <nav className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block px-4 py-3 rounded-lg text-sm ${
                  item.active
                    ? "text-teal bg-teal/10 font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a 
              href="https://be.leanmote.com/book-a-demo-0"
              className="w-full mt-4 bg-teal hover:bg-teal-dark text-navy font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              Sign Up
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
