import { Outlet, useLocation } from 'react-router-dom' 
import './App.css'
import NavBar from './components/Navbar'
import Footer from './components/Footer'

const App = () => {
    const location = useLocation(); 
    const hideNavRoutes = ['/dashboard', '/dashboard/', '/login', '/register']; 
    const isDashboardRoute = hideNavRoutes.some(route => location.pathname.startsWith(route));
    const hideFooterRoutes = ['/dashboard', '/dashboard/', '/login', '/register'];
    const isFooterRoute = hideFooterRoutes.some(route => location.pathname.startsWith(route));

    return (
        <>
            {!isDashboardRoute && <NavBar />} 
            <main className={`min-h-screen max-w-screen-2xl mx-auto font-primary ${isDashboardRoute ? '' : 'px-10 py-6 pt-16'}`}>
                <Outlet />
            </main>
            {!isFooterRoute && <Footer />}
        </>
    )
}

export default App