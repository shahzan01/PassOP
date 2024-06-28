import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
 

  return (
    <>




     <NavBar />
     <div className=" bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(142,242,20,.2)_100%)]">
     <Manager />
     <Footer />
     
     
     </div>

    
     
    </>
  )
}

export default App
