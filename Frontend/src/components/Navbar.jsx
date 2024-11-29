import React, { useState, useEffect, useRef } from "react";
import { Link, Links } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import avatarImg from "../assets/avatar.png";

const navigation = [
    {name: "Dashboard", href: "/dashboard"},
    {name: "Orders", href: "/orders"},
    {name: "Cart", href: "/cart"},
    {name: "Check out", href: "/checkout"},
]

const NavBar = () => {

    const currentUser = true;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="max-w-screen-2x1 mx-auto px-4 py-6">
            <nav className="flex justify-between items-center">
                {/* left side */}
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/" onClick={() => setIsDropdownOpen(false)}>
                    <FaBookOpen className="size-6"/>
                    </Link>

                    {/* search input */}
                    <div className="relative sm:w-72 w-40 space-x-2">
                    <IoMdSearch  className="absolute inline-block left-3.5 inset-y-2"/>
                    <input type="text" placeholder="Search here" 
                    className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none" />
                    </div>
                </div>



                {/* right side */}
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div className="">
                        {
                            currentUser ? <>
                            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <img src={avatarImg} alt="Avatar" className = { `relative size-7 inset-y-0.5 rounded-full 
                                    ${currentUser ? 'ring-2 ring-blue-500' : ''} `}/>
                            </button>
                            {/* show dropdowns */}
                            {
                                isDropdownOpen && (
                                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white
                                    shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {
                                            navigation.map((item) => (
                                                <li key={item.href} onClick={() => setIsDropdownOpen(false)}>
                                                    <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                                                    {item.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                        </ul>
                                    </div>
                                )
                            }
                            </>: <Link to="/login"><HiOutlineUserCircle className="size-6"/></Link>
                        }
                    </div>
                    
                    <button className="hidden sm:block">
                        <HiOutlineHeart className="size-6"/>
                    </button>
                    <Link to="/cart" className="bg-primary p-1 sm:px-4 px-2 flex items-center rounded-sm">
                        <HiOutlineShoppingBag className="size-6"/>
                        <span className="text-sm font-semi-bold sm:ml-1">0</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;