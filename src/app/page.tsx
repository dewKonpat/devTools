import Link from 'next/link'

export default function Home() {
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">DevTools</h1>
      <ul className="list-disc list-inside">
        <li><Link className="text-blue-600 underline" href="/json-formatter">JSON Formatter</Link></li>
        <li><Link className="text-blue-600 underline" href="/jwt-decoder">JWT Decoder</Link></li>
        <li><Link className="text-blue-600 underline" href="/text-diff">Text Diff</Link></li>
      </ul>
    </main>
  )
}
