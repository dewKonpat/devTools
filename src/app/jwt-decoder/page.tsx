'use client'
import { useState } from 'react'

function decodePart(part: string) {
  try {
    const str = atob(part.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.stringify(JSON.parse(str), null, 2)
  } catch {
    return 'Invalid segment'
  }
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')

  const decode = () => {
    const parts = token.split('.')
    if (parts.length >= 2) {
      setHeader(decodePart(parts[0]))
      setPayload(decodePart(parts[1]))
    } else {
      setHeader('Invalid token')
      setPayload('')
    }
  }

  return (
    <div className="space-y-2">
      <h1 className="text-xl font-bold">JWT Decoder</h1>
      <textarea className="w-full h-24 p-2 border" value={token} onChange={e => setToken(e.target.value)} />
      <div>
        <button className="px-4 py-1 bg-blue-600 text-white" onClick={decode}>Decode</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <pre className="bg-gray-100 p-2 whitespace-pre-wrap">{header}</pre>
        <pre className="bg-gray-100 p-2 whitespace-pre-wrap">{payload}</pre>
      </div>
    </div>
  )
}
