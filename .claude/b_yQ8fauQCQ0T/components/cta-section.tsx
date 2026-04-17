"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check } from "lucide-react"

export function CTASection() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Colorful Logo */}
            <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
              <path d="M20 4C28.8366 4 36 11.1634 36 20C36 28.8366 28.8366 36 20 36C11.1634 36 4 28.8366 4 20C4 11.1634 11.1634 4 20 4Z" stroke="#3B82F6" strokeWidth="3" fill="none"/>
              <path d="M20 8C26.6274 8 32 13.3726 32 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round"/>
              <path d="M8 20C8 26.6274 13.3726 32 20 32" stroke="#EC4899" strokeWidth="3" strokeLinecap="round"/>
              <path d="M20 12L26 22H14L20 12Z" fill="#FBBF24"/>
              <circle cx="20" cy="24" r="3" fill="#FBBF24"/>
            </svg>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
              Ready to see your team clearly?
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Join 700+ engineering teams shipping faster.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal" />
                <span>14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-teal" />
                <span>5min setup</span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="space-y-4 bg-card p-8 rounded-2xl border border-border shadow-lg">
            <div className="relative">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted border-border text-foreground placeholder:text-muted-foreground h-14 px-5 rounded-xl"
              />
            </div>
            <a 
              href="https://be.leanmote.com/book-a-demo-0"
              className="w-full inline-flex items-center justify-center bg-teal hover:bg-teal-dark text-navy font-semibold h-14 rounded-xl text-base transition-colors"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a
              href="https://be.leanmote.com/book-a-demo-0"
              className="w-full inline-flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted h-12 rounded-xl transition-colors"
            >
              View Demo First
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>

            <p className="text-center text-muted-foreground text-xs pt-2">
              No credit card required. 14-day trial. Setup in 5 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
