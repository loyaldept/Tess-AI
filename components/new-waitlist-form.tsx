"use client"

import type React from "react"

import { useState } from "react"

export function NewWaitlistForm() {
  const [email, setEmail] = useState("")
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
        setIsSubmitted(true)
        setEmail("")

        // Reset after 5 seconds
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

  // Success state
  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto p-8">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-3xl p-12 text-center backdrop-blur-sm">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-4xl font-bold text-green-400 mb-4">WAITLISTED</h2>
          <p className="text-2xl text-green-300 mb-2">You are on the way!</p>
          <p className="text-green-200/80 text-lg">We'll notify you when your AI Card is ready.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      {/* Waitlist Counter */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/30 shadow-2xl">
          <span className="text-3xl">👥</span>
          <span className="text-white font-bold text-2xl">4,794</span>
          <span className="text-purple-200 text-lg">people waiting</span>
          <span className="text-3xl">✨</span>
        </div>
      </div>

      {/* Main Form */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/30 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Get Your AI Financial Card</h2>
          <p className="text-xl text-purple-200/90">
            Join the waitlist and be first to experience the future of finance
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError("")
              }}
              placeholder="Enter your email address"
              className="w-full h-16 px-8 text-xl bg-white/20 border-2 border-white/40 rounded-2xl text-white placeholder:text-purple-200/70 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-400/30 focus:bg-white/25 transition-all duration-300"
              disabled={isLoading}
              required
              autoComplete="email"
            />

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-400/50 rounded-xl text-red-300 text-center">
                ⚠️ {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !email}
            className="w-full h-16 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-white text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-purple-400/50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Joining waitlist...</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <span className="text-2xl">✨</span>
                <span>Get Waitlisted</span>
                <span className="text-2xl">🚀</span>
              </span>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-purple-300/70 text-sm">🔒 Your email is safe with us. No spam, ever.</p>
        </div>
      </div>
    </div>
  )
}
