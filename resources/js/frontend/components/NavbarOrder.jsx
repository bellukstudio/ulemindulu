/**
 * A navbar with an "Order" label and a back button.
 *
 * Renders a simple navbar with a back button and an "Order" label.
 *
 * @return {ReactElement} The navbar component.
 */
export default function NavbarOrder() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <a
                    href="/templates"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                    <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14M5 12l4-4m-4 4 4 4"
                        />
                    </svg>
                </a>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    <span
                        className="text-xl  text-black-600 font-bold"
                    >
                        Order
                    </span>
                </div>
            </div>
        </nav>
    );
}
