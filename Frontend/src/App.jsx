
import { Outlet } from 'react-router'
import './App.css'
import NavBar from './components/Navbar'

function App() {


  return (
    <>
    <NavBar/>
      <main className='min-h-screen max-w-screen-2x1 mx-auto px-4 py-6 font-primary'>
      <Outlet />
      </main>
    <footer>Footer</footer>
    </>
  )
}

export default App
