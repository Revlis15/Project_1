
import { Outlet } from 'react-router'
import './App.css'

function App() {


  return (
    <>
    <nav>NavBar</nav>
      <main className='min-h-screen max-w-screen-2x1 mx-auto px-4 py-6'>
      <Outlet />
      </main>
    <footer>Footer</footer>
    </>
  )
}

export default App
