import { FaBookOpen } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import avatarImg from "../assets/avatar.png";


import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { debounce } from "lodash"; 


import Loading from "./Loading";
import getBaseUrl from "../utils/baseURL";

const NavBar = () => {

    const { currentUser, logoutUser, userRole } = useAuth();

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.log(error);
        }
    };

    const cartItems = useSelector(state => state.cart.cartItems);
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const searchDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);
    const location = useLocation();

    const handleClickOutside = (event) => {
        if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
            setIsSearchDropdownOpen(false);
        }
        if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
            setIsUserDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setSearchQuery('');
        setSearchResults([]);
        setIsSearchDropdownOpen(false);
        setIsLoading(false);
        setError(null);
    }, [location.pathname]);

    const navigation = [
        ...(userRole === 'admin' ? [{ name: "Dashboard", href: "/dashboard" }] : []),
        { name: "Orders", href: "/orders" },
        { name: "Cart", href: "/cart" },
        { name: "Check out", href: "/checkout" },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const debouncedSearch = useRef(
        debounce(async (query) => {
            if (query.length > 2) { 
                setIsLoading(true);
                setError(null);
                try {
                    const response = await fetch(`${getBaseUrl()}/api/books/search?q=${query}`);
                    const contentType = response.headers.get("content-type");
                    
                    if (!response.ok) {
                        throw new Error(`Server error: ${response.status}`);
                    }
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        const data = await response.json();
                        setSearchResults(data);
                        setIsSearchDropdownOpen(true);
                    } else {
                        throw new Error('Unexpected response format');
                    }
                } catch (error) {
                    console.error("Search error:", error);
                    setError('Failed to fetch search results');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSearchResults([]);
                setIsSearchDropdownOpen(false);
            }
        }, 300) 
    ).current;

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query); 
        debouncedSearch(query); 
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
        setIsSearchDropdownOpen(false); 
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
            <nav className="max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
                {/* left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    {/* Logo */}
                    <Link to="/" onClick={() => setIsSearchDropdownOpen(false)}>
                        <FaBookOpen className="size-6"/>
                    </Link>

                    {/* search input */}
                    <div className="relative sm:w-72 w-40 space-x-2" ref={searchDropdownRef}>
                        <IoMdSearch  className="absolute inline-block left-3.5 inset-y-2"/>
                        <input
                            type="text"
                            placeholder="Search here"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
                        />
                        {isLoading && <Loading />}
                        {error && <div className="absolute top-full left-0 right-0 bg-red-100 p-2 text-red-500">{error}</div>}
                        {isSearchDropdownOpen && (
                            <ul className="absolute top-full left-0 right-0 bg-white border mt-1 max-h-60 overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    searchResults.map(book => (
                                        <li key={book.id} className="p-2 hover:bg-gray-100">
                                            <Link to={`/books/${book?._id}`}>{book.title}</Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-2 text-center text-gray-500">No results found</li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>



                {/* right side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div className="" ref={userDropdownRef}>
                        {
                            currentUser ? <>
                            {/* User Avatar */}
                            <button onClick={toggleUserDropdown}>
                                <img src={avatarImg} alt="Avatar" className = { `relative size-7 inset-y-0.5 rounded-full 
                                    ${currentUser ? 'ring-2 ring-blue-500' : ''} `}/>
                            </button>
                            {/* show dropdowns */}
                            {
                                isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white
                                    shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {
                                            navigation.map((item) => (
                                                <li key={item.href} onClick={() => setIsUserDropdownOpen(false)}>
                                                    <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                    {item.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                        <li onClick={handleLogout}>
                                            <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">
                                            Logout
                                            </button>
                                        </li>
                                        </ul>
                                    </div>
                                )
                            }
                            </>: <Link to="/login"><HiOutlineUserCircle className="size-6"/></Link>
                        }
                    </div>
                    {/* Cart */}
                    <Link to="/cart" className="bg-primary p-1 sm:px-4 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingBag className="size-6"/>
                        {
                            cartItems.length > 0 && <span className="text-sm font-semi-bold sm:ml-1">{cartItems.length}</span>
                        }
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;