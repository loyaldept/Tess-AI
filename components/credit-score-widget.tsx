"use client"

import { useState } from "react"
import { TrendingUp, AlertCircle } from "lucide-react"

export function CreditScoreWidget() {
  const [score, setScore] = useState(720)

  const getScoreCategory = (score: number) => {
    if (score >= 800) return { label: "Excellent", color: "text-green-400" }
    if (score >= 740) return { label: "Very Good", color: "text-blue-400" }
    if (score >= 670) return { label: "Good", color: "text-yellow-400" }
    if (score >= 580) return { label: "Fair", color: "text-orange-400" }
    return { label: "Poor", color: "text-red-400" }
  }

  const category = getScoreCategory(score)

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Credit Score Monitor</h3>
          <p className="text-purple-200/80 text-sm">Track your credit health</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2">{score}</div>
          <div className={`text-lg font-semibold ${category.color}`}>{category.label}</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-purple-200">
            <span>Score Range</span>
            <span>300 - 850</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((score - 300) / 550) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-purple-200">
              <p className="font-medium text-white mb-1">Recent Activity</p>
              <p>Your score increased by 12 points this month due to on-time payments.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-lg font-bold text-green-400">98%</div>
            <div className="text-xs text-purple-200">On-time Payments</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
            <div className="text-lg font-bold text-blue-400">23%</div>
            <div className="text-xs text-purple-200">Credit Utilization</div>
          </div>
        </div>
      </div>
    </div>
  )
}
