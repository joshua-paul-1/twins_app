// src/About.jsx
import { UserIcon } from 'lucide-react'

export default function About() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>About Page</h1>
      <UserIcon size={48} />
      <p>Lazy loaded component.</p>
    </div>
  )
}

