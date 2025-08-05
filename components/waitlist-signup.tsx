"use client"

import type React from "react"
import { useState } from "react"

export function WaitlistSignup() {
  const [email, setEmail] = useState("")
  const [waitlistCount, setWaitlistCount] = useState(4794)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      const response = await fetch("https://formspree.io/f/mjkoeedo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          message: "Waitlist signup for Tail AI Card",
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setWaitlistCount((prev) => prev + 1)
        setIsSubmitted(true)
        setEmail("")

        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      setError("Failed to join waitlist. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-3xl p-8 backdrop-blur-sm text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold text-green-400 mb-3">WAITLISTED</h3>
          <p className="text-xl text-green-300 mb-2">You are on the way!</p>
          <p className="text-green-300/80 text-sm">We'll notify you when your AI Card is ready.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Waitlist Counter */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
          <span className="text-2xl">👥</span>
          <span className="text-white font-semibold text-lg">{waitlistCount.toLocaleString()}</span>
          <span className="text-purple-200/80">waiting for their AI Card</span>
          <span className="text-2xl">✨</span>
        </div>
      </div>

      {/* Waitlist Form */}
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Get Your AI Card</h3>
            <p className="text-purple-200/80">Be among the first to experience AI-powered financial cards</p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              placeholder="Enter your email address"
              className="w-full px-6 py-4 bg-white/10 border border-white/30 rounded-2xl text-white text-center placeholder:text-purple-300/70 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 focus:bg-white/15 transition-all duration-300 text-lg"
              disabled={isLoading}
              required
              style={{
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
            />

            {error && (
              <div className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                ⚠️ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white rounded-2xl py-4 px-6 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-purple-400/50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Joining waitlist...</span>
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>✨</span>
                  <span>Get Waitlisted</span>
                  <span>🚀</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
