import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4C28.8366 4 36 11.1634 36 20C36 28.8366 28.8366 36 20 36C11.1634 36 4 28.8366 4 20C4 11.1634 11.1634 4 20 4Z" stroke="#3B82F6" strokeWidth="3" fill="none"/>
              <path d="M20 8C26.6274 8 32 13.3726 32 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
              <path d="M8 20C8 26.6274 13.3726 32 20 32" stroke="#EC4899" strokeWidth="3" strokeLinecap="round"/>
              <path d="M20 12L26 22H14L20 12Z" fill="#FBBF24"/>
              <circle cx="20" cy="24" r="3" fill="#FBBF24"/>
            </svg>
            <span className="text-white font-semibold">
              Lean<span className="text-teal">mote</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-white/50">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Leanmote. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
