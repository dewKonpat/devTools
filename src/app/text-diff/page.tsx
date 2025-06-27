'use client'
import { useState } from 'react'

type Part = { type: 'common' | 'added' | 'removed'; value: string }

function diff(a: string, b: string): Part[] {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1])
    }
  }

  const result: Part[] = []
  let i = m
  let j = n
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) {
      result.unshift({ type: 'common', value: a[i - 1] })
      i--
      j--
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      result.unshift({ type: 'removed', value: a[i - 1] })
      i--
    } else {
      result.unshift({ type: 'added', value: b[j - 1] })
      j--
    }
  }
  while (i > 0) {
    result.unshift({ type: 'removed', value: a[i - 1] })
    i--
  }
  while (j > 0) {
    result.unshift({ type: 'added', value: b[j - 1] })
    j--
  }
  return result
}

export default function TextDiff() {
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [parts, setParts] = useState<Part[]>([])

  const handle = () => setParts(diff(left, right))

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-bold">Text Diff</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded"
          value={left}
          onChange={(e) => setLeft(e.target.value)}
        />
        <textarea
          className="w-full h-40 p-2 border border-gray-300 rounded"
          value={right}
          onChange={(e) => setRight(e.target.value)}
        />
      </div>
      <div>
        <button
          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handle}
        >
          Compare
        </button>
      </div>
      <pre className="bg-gray-100 p-2 whitespace-pre-wrap rounded border">
        {parts.map((p, i) => (
          <span
            key={i}
            className={
              p.type === 'added'
                ? 'bg-green-200'
                : p.type === 'removed'
                ? 'bg-red-200'
                : ''
            }
          >
            {p.value}
          </span>
        ))}
      </pre>
    </div>
  )
}
