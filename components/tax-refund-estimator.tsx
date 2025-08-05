"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calculator, DollarSign } from "lucide-react"

export function TaxRefundEstimator() {
  const [income, setIncome] = useState("")
  const [dependents, setDependents] = useState("")
  const [filingStatus, setFilingStatus] = useState("single")
  const [estimatedRefund, setEstimatedRefund] = useState<number | null>(null)

  const calculateRefund = () => {
    const annualIncome = Number.parseFloat(income) || 0
    const numDependents = Number.parseInt(dependents) || 0

    // Simplified tax calculation (not accurate for real use)
    let taxOwed = 0
    let standardDeduction = 0

    if (filingStatus === "single") {
      standardDeduction = 13850
    } else if (filingStatus === "married") {
      standardDeduction = 27700
    } else {
      standardDeduction = 20800
    }

    const taxableIncome = Math.max(0, annualIncome - standardDeduction)

    // Simplified tax brackets
    if (taxableIncome <= 11000) {
      taxOwed = taxableIncome * 0.1
    } else if (taxableIncome <= 44725) {
      taxOwed = 1100 + (taxableIncome - 11000) * 0.12
    } else if (taxableIncome <= 95375) {
      taxOwed = 5147 + (taxableIncome - 44725) * 0.22
    } else {
      taxOwed = 16290 + (taxableIncome - 95375) * 0.24
    }

    // Child tax credit
    const childCredit = numDependents * 2000

    // Estimated withholding (assume 15% of income)
    const estimatedWithholding = annualIncome * 0.15

    const refund = Math.max(0, estimatedWithholding + childCredit - taxOwed)
    setEstimatedRefund(Math.round(refund))
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Tax Refund Estimator</h3>
          <p className="text-purple-200/80 text-sm">Get a quick estimate of your potential refund</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Annual Income</label>
            <Input
              type="number"
              placeholder="e.g., 65000"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Number of Dependents</label>
            <Input
              type="number"
              placeholder="e.g., 2"
              value={dependents}
              onChange={(e) => setDependents(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Filing Status</label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2"
            >
              <option value="single" className="bg-slate-800">
                Single
              </option>
              <option value="married" className="bg-slate-800">
                Married Filing Jointly
              </option>
              <option value="head" className="bg-slate-800">
                Head of Household
              </option>
            </select>
          </div>

          <Button
            onClick={calculateRefund}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
            disabled={!income}
          >
            Calculate Refund
          </Button>
        </div>

        <div className="flex items-center justify-center">
          {estimatedRefund !== null ? (
            <div className="text-center bg-white/5 rounded-xl p-6 border border-white/10 w-full">
              <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">${estimatedRefund.toLocaleString()}</div>
              <div className="text-lg text-green-400 font-semibold mb-4">Estimated Refund</div>
              <p className="text-sm text-purple-200/80">
                This is a simplified estimate. Actual refund may vary based on additional factors.
              </p>
            </div>
          ) : (
            <div className="text-center text-purple-200/60">
              <Calculator className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Enter your information to calculate your estimated tax refund</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
