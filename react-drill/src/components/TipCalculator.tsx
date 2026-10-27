
import { useState } from "react"

function TipCalculator() {
  // 01. Three pieces of state
  const [bill, setBill] = useState("")
  const [tipPercent, setTipPercent] = useState(10)
  const [people, setPeople] = useState("1")

  // 04. Derive values during render
  const billNum = parseFloat(bill) || 0
  const peopleNum = Math.max(1, parseInt(people) || 1)
  const tip = (billNum * tipPercent) / 100
  const total = billNum + tip
  const perPerson = total / peopleNum

  const tipOptions = [5, 10, 15, 20]

  return (
    <main className="min-h-screen bg-slate-900 px-4 py-10 text-white">
      <div className="mx-auto max-w-md rounded-2xl bg-slate-800 p-6 shadow-xl sm:p-8">
        <h1 className="text-3xl font-bold">Tip Calculator</h1>
        <p className="mb-8 mt-2 text-slate-400">
          Calculate your tip and split the bill.
        </p>

        {/* 02. Controlled bill input */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium">
            Bill amount (₹)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="Enter bill amount"
            className="w-full rounded-lg border border-slate-600 bg-slate-900 p-3 text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
          />
        </div>

        {/* 03. Tip percentage button group */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium">Choose tip (%)</p>
          <div className="grid grid-cols-4 gap-2">
            {tipOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTipPercent(option)}
                className={`rounded-lg py-3 font-semibold transition ${
                  tipPercent === option
                    ? "bg-blue-500 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {option}%
              </button>
            ))}
          </div>
        </div>

        {/* 02. Controlled people input */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-medium">
            Number of people
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full rounded-lg border border-slate-600 bg-slate-900 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        {/* 05. Results only when bill is greater than zero */}
        {billNum > 0 && (
          <div className="space-y-4 rounded-xl bg-slate-900 p-5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Tip amount</span>
              <span className="text-lg font-semibold">
                ₹{tip.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total bill</span>
              <span className="text-lg font-semibold">
                ₹{total.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <p className="text-sm text-slate-400">
                Each person pays (
                {peopleNum === 1 ? "1 person" : `${peopleNum} people`})
              </p>
              <p className="mt-1 text-3xl font-bold text-green-400">
                ₹{perPerson.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {billNum <= 0 && (
          <p className="text-center text-sm text-slate-400">
            Enter a bill amount to see your results.
          </p>
        )}
      </div>
    </main>
  )
}

export default TipCalculator
