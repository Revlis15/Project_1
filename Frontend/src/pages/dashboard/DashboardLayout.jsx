import { Link, Outlet } from "react-router"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { HiViewGridAdd } from "react-icons/hi"
import { MdOutlineManageHistory } from "react-icons/md"


const DashboardLayout = () => {

    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await logoutUser();
        alert("Logged out successfully");
        navigate("/admin");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Failed to logout. Please try again.");
      }
    };

    return (
        <section className="flex h-full md:bg-gray-100 min-h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden sm:flex sm:flex-col">
            {/* Logo */}
            <a href="/" className="inline-flex items-center justify-center h-20 w-20 bg-purple-600 hover:bg-purple-500 focus:bg-purple-500">
              <img src="/fav-icon.png" alt="" />
            </a>
            {/* Navigation */}
            <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
              <nav className="flex flex-col mx-4 my-6 space-y-4">

                {/* Dashboard */}
                  <NavLink
                    to="/dashboard" end
                    className={({ isActive }) =>
                      `inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg 
                      ${isActive ? "text-purple-600 bg-white rounded-lg" : "text-gray-500 bg-gray-800"}`
                    }>
                    <span className="sr-only">Dashboard</span>
                    {/* Icon */}
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </NavLink>

                {/* Add Book Page */}
                  <NavLink
                    to="/dashboard/add-new-book"
                    className={({ isActive }) =>
                      `inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700  rounded-lg 
                      ${isActive ? "text-purple-600 bg-white rounded-lg" : "text-gray-500 bg-gray-800"}`
                    }>
                    <span className="sr-only">Add Book</span>
                    {/* Icon */}
                    <HiViewGridAdd className="h-6 w-6" />
                  </NavLink>

                {/* Manage Book Page */}
                  <NavLink
                    to="/dashboard/manage-books"             
                    className={({ isActive }) =>
                      `inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg 
                    ${isActive ? "text-purple-600 bg-white rounded-lg" : "text-gray-500 bg-gray-800"}`
                    }>
                    <span className="sr-only">Folders</span>
                    {/* Icon */}
                    <svg
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </NavLink>

                {/* Orders Status */}
                  <NavLink
                    to="/dashboard/orders-status"
                    className={({ isActive }) =>
                      `inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 rounded-lg
                      ${isActive ? "text-purple-600 bg-white rounded-lg" : "text-gray-500 bg-gray-800"}`
                    }
                  >
                    {/* Icon */}
                    <span className="sr-only">Orders Status</span>
                    <svg
                      aria-hidden="true"
                      fill="currentColor"         
                      viewBox="0 0 24 24"
                      stroke="currentColor"       
                      className="h-6 w-6"
                    >
                      <path
                        d="M19.25 7.57692C19.25 7.99114 19.5858 8.32692 20 8.32692C20.4143 8.32692 20.75 7.99114 20.75 7.57692H19.25ZM7.54545 21.75C7.95967 21.75 8.29545 21.4142 8.29545 21C8.29545 20.5858 7.95967 20.25 7.54545 20.25V21.75ZM16.6569 1.29459L17.1885 0.765534L16.6569 1.29459ZM20.75 7.57692V5.06666H19.25V7.57692H20.75ZM20.2404 3.83219L17.1885 0.765534L16.1253 1.82365L19.1772 4.8903L20.2404 3.83219ZM15.9481 0.25H2.50004V1.75H15.9481V0.25ZM0.250041 2.49999L0.250003 19.5L1.75 19.5L1.75004 2.5L0.250041 2.49999ZM2.5 21.75H7.54545V20.25H2.5V21.75ZM0.250003 19.5C0.250001 20.7426 1.25736 21.75 2.5 21.75V20.25C2.08579 20.25 1.75 19.9142 1.75 19.5L0.250003 19.5ZM2.50004 0.25C1.2574 0.25 0.250044 1.25736 0.250041 2.49999L1.75004 2.5C1.75004 2.08579 2.08583 1.75 2.50004 1.75V0.25ZM17.1885 0.765534C16.86 0.435529 16.4136 0.25 15.9481 0.25V1.75C16.0146 1.75 16.0783 1.7765 16.1253 1.82365L17.1885 0.765534ZM20.75 5.06666C20.75 4.60398 20.5668 4.16013 20.2404 3.83219L19.1772 4.8903C19.2239 4.93715 19.25 5.00056 19.25 5.06666H20.75Z"
                      />
                      <path
                        d="M5 6H15.5752"
                        stroke="currentColor"        
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5 11H10.2374"
                        stroke="currentColor"        
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M5 16H7.24461"
                        stroke="currentColor"        
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="17.5"
                        cy="17.5"
                        r="5.5"
                        stroke="currentColor"        
                        strokeWidth="1.5"
                      />
                      <path
                        d="M15.5 18L16.5826 19.0826C16.8011 19.3011 17.1635 19.2711 17.3431 19.0197L19.5 16"
                        stroke="currentColor"        
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </NavLink>
                </nav>
                
              {/* Settings */}
              <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
                <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                  <span className="sr-only">Settings</span>
                  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </aside>
          {/* Main */}
          <div className="flex-grow text-gray-800">
            {/* Header */}
            <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
              <div className="flex flex-shrink-0 items-center ml-auto">
                {/* {Admin Profile} */}
                <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
                  {/* Admin */}
                  <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                    <span className="font-semibold">Admin</span>
                    <span className="text-sm text-gray-600">Manager</span>
                  </div>
                  {/* Avatar */}
                  <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                    <img src="https://img.icons8.com/?size=100&id=85147&format=png&color=000000" alt="user profile photo" className="h-full w-full object-cover"/>
                  </span>
                </button>
                <div className="border-l pl-3 ml-3 space-x-1">
                  {/* Logout */}
                  <button
                  onClick={handleLogout}
                  className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                    <span className="sr-only">Log out</span>
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </div>
            </header>
            {/* Main Content */}
            <main className="p-6 sm:p-10 space-y-6 ">
              <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                <div className="mr-6">
                  <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
                  <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
                </div>
                <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
                  {/* Manage Books */}
                  <Link to="/dashboard/manage-books" className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Manage Books
                  </Link>
                  {/* Add New Book */}
                  <Link to="/dashboard/add-new-book" className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Book
                  </Link>
                </div>
              </div>
            <Outlet/>
            </main>
          </div>
      </section>
    )
}

export default DashboardLayout