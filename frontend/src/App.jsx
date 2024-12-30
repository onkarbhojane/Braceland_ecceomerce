import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import About from './components/About'
import Hero from './components/Hero'
import Products from './components/Products'
import Testimonials from './components/Testimonial'
import Contact from './components/Contact'
import Footer from './components/Footer'
import UserContextProvider from './Context/userContextProvider.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <div>
        <Header />
          <Hero />
          <About />
          <Products />
          <Testimonials />
          <Contact />
          <Footer/>
      </div>
  </UserContextProvider>
      
  )
}

export default App
