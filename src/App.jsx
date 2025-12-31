import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))

function App() {
  return (
    <Router>  {/* Router wraps everything */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>  {/* Routes must be inside Router */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
