"use client"

import { useState } from "react"
import { Activity, DollarSign } from "lucide-react"

export function FinancialHealthScore() {
  const [healthScore] = useState(78)

  const getHealthCategory = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "text-green-400", emoji: "😄" }
    if (score >= 60) return { label: "Good", color: "text-blue-400", emoji: "🙂" }
    if (score >= 40) return { label: "Fair", color: "text-yellow-400", emoji: "😐" }
    return { label: "Poor", color: "text-red-400", emoji: "😟" }
  }

  const category = getHealthCategory(healthScore)

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Financial Health</h3>
          <p className="text-purple-200/80 text-sm">Overall financial wellness</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-2">
            {healthScore}
            <span className="text-2xl ml-2">{category.emoji}</span>
          </div>
          <div className={`text-lg font-semibold ${category.color}`}>{category.label}</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-purple-200">
            <span>Health Score</span>
            <span>0 - 100</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${healthScore}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
            <div className="text-lg font-bold text-green-400">$5,240</div>
            <div className="text-xs text-purple-200">Monthly Income</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
            <div className="text-lg font-bold text-red-400">$3,890</div>
            <div className="text-xs text-purple-200">Monthly Spending</div>
          </div>
          <div className="bg-white/5 rounded-lg p-3 border border-white/10 text-center">
            <div className="text-lg font-bold text-blue-400">26%</div>
            <div className="text-xs text-purple-200">Savings Rate</div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="flex items-start gap-2">
            <DollarSign className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-purple-200">
              <p className="font-medium text-white mb-1">Recommendation</p>
              <p>Great job! You're saving 26% of your income. Consider increasing your emergency fund.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
