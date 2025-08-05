"use client"

import type React from "react"
import { useState } from "react"

export function WaitlistForm() {
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

  if (isSubmitted) {
    return (
      <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-green-400 mb-2">WAITLISTED</h3>
          <p className="text-green-300 text-lg">You are on the way!</p>
          <p className="text-green-300/80 text-sm mt-2">We'll notify you when your AI Card is ready.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError("")
          }}
          placeholder="Enter your email to get your first AI Card"
          className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white text-center placeholder:text-purple-300/70 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300"
          disabled={isLoading}
          required
        />
        {error && <p className="text-red-400 text-sm mt-2 text-left">⚠️ {error}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading || !email}
        className="w-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white rounded-full py-4 font-semibold transition-all duration-300 transform hover:scale-105 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Joining waitlist...
          </div>
        ) : (
          "✨ Get Waitlisted"
        )}
      </button>
    </form>
  )
}

export default WaitlistForm
