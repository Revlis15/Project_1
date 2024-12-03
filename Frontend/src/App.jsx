
import { Outlet } from 'react-router'
import './App.css'
import NavBar from './components/Navbar'
import Footer from './components/Footer'

function App() {


  return (
    <>
    <NavBar/>
      <main className='min-h-screen max-w-screen-2x1 mx-auto px-4 py-6 font-primary pt-24'>
      <Outlet />
      </main>
    <Footer/>
    </>
  )
}

export default App
