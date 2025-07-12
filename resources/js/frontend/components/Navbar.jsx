import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { isTokenAvailable, removeToken } from "../core/token";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${baseURL}/v1/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            removeToken();
            navigate("/login");
        } catch (error) {
            console.error("Gagal logout:", error);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-[#3758F9] fixed w-full z-20 top-0 border-b border-[#3758F9]">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <a href="/" className="flex items-center">
                            <img
                                src="sample/logo.png"
                                className="h-8"
                                alt="Logo"
                            />
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a
                                href="/"
                                className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href={
                                    window.location.pathname === "/"
                                        ? "#feature"
                                        : "/#feature"
                                }
                                className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Fitur
                            </a>
                            <a
                                href="/templates"
                                className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Template
                            </a>
                            <a
                                href="#Testimoni"
                                className="text-white hover:text-blue-300 px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Testimoni
                            </a>
                        </div>
                    </div>

                    {/* Desktop Auth & Version */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!isTokenAvailable() ? (
                            <a
                                href="/login"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
                            >
                                Get Started
                            </a>
                        ) : (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center text-white hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg p-2 transition-colors"
                                >
                                    {/* Avatar/Profile Icon */}
                                    <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center mr-2">
                                        <svg
                                            className="w-5 h-5 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    {/* Dropdown Arrow */}
                                    <svg
                                        className={`w-4 h-4 transition-transform ${
                                            isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                                        <a
                                            href="/app/client/invitation"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-speedometer mr-3"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"
                                                />
                                            </svg>
                                            Dashboard
                                        </a>

                                        <div className="border-t border-gray-100 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                        >
                                            <svg
                                                className="w-4 h-4 mr-3"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                />
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        <span className="text-gray-200 text-xs font-bold">
                            v1.0.0
                        </span>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={`${
                                    isOpen ? "hidden" : "block"
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Close icon */}
                            <svg
                                className={`${
                                    isOpen ? "block" : "hidden"
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#3758F9] border-t border-blue-600">
                    <a
                        href="/"
                        onClick={closeMenu}
                        className="text-white hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Home
                    </a>
                    <a
                        href={
                            window.location.pathname === "/"
                                ? "#feature"
                                : "/#feature"
                        }
                        onClick={closeMenu}
                        className="text-white hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Fitur
                    </a>
                    <a
                        href="/templates"
                        onClick={closeMenu}
                        className="text-white hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Template
                    </a>
                    <a
                        href="#Testimoni"
                        onClick={closeMenu}
                        className="text-white hover:bg-blue-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                        Testimoni
                    </a>

                    {/* Mobile Auth Section */}
                    <div className="pt-4 pb-3 border-t border-blue-600">
                        {!isTokenAvailable() ? (
                            <a
                                href="/login"
                                onClick={closeMenu}
                                className="block mx-3 mb-3 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Get Started
                            </a>
                        ) : (
                            <div className="space-y-2">
                                <a
                                    href="/profile"
                                    onClick={closeMenu}
                                    className="flex items-center text-white hover:bg-blue-800 px-3 py-2 rounded-md text-base font-medium"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-speedometer"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"
                                        />
                                    </svg>
                                    Dashboard
                                </a>

                                <button
                                    onClick={(e) => {
                                        handleLogout(e);
                                        closeMenu();
                                    }}
                                    className="flex items-center w-full text-white hover:bg-red-700 px-3 py-2 rounded-md text-base font-medium"
                                >
                                    <svg
                                        className="w-5 h-5 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        )}
                        <div className="text-center mt-3">
                            <span className="text-gray-300 text-xs">
                                v1.0.0
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
