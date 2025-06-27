'use client'
import { useState } from 'react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const format = () => {
    try {
      const obj = JSON.parse(input)
      setOutput(JSON.stringify(obj, null, 2))
    } catch (err) {
      setOutput('Invalid JSON')
    }
  }

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">JSON Formatter</h1>
      <textarea className="w-full h-40 p-2 border" value={input} onChange={e => setInput(e.target.value)} />
      <div>
        <button className="px-4 py-1 bg-blue-600 text-white" onClick={format}>Format</button>
      </div>
      <pre className="bg-gray-100 p-2 whitespace-pre-wrap">{output}</pre>
    </div>
  )
}
