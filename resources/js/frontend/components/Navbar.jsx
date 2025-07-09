import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#3758F9] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-[#3758F9] dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3">
                    <img
                        src="sample/logo.png"
                        className="h-8"
                        alt="Logo"
                    />
                </a>

                {/* Tombol Get Started dan Hamburger */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <a
                        href="#start"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Get started
                    </a>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-200 rounded-lg md:hidden hover:bg-blue-800"
                        aria-controls="navbar-sticky"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 17 14"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>

                {/* Menu Utama */}
                <div
                    className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
                        isOpen ? "block" : "hidden"
                    }`}
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-[#3758F9] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <a
                                href="#home"
                                className="block py-2 px-3 text-white md:p-0 md:hover:text-blue-300"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#feature"
                                className="block py-2 px-3 text-white md:p-0 md:hover:text-blue-300"
                            >
                                Fitur
                            </a>
                        </li>
                        <li>
                            <a
                                href="#theme"
                                className="block py-2 px-3 text-white md:p-0 md:hover:text-blue-300"
                            >
                                Tema
                            </a>
                        </li>
                        <li>
                            <a
                                href="#pricelist"
                                className="block py-2 px-3 text-white md:p-0 md:hover:text-blue-300"
                            >
                                Harga
                            </a>
                        </li>
                        <li>
                            <a
                                href="#Testimoni"
                                className="block py-2 px-3 text-white md:p-0 md:hover:text-blue-300"
                            >
                                Testimoni
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
