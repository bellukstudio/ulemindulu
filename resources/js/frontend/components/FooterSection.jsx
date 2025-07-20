/**
 * FooterSection is a footer component for the Ulemindulu website.
 * It contains the brand info, payment support, kontak & media, and a copyright notice.
 */
export default function FooterSection() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#3758F9] border-t border-gray-200 py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Brand Info */}
                <div>
                    <div className="flex items-center space-x-3 mb-4">
                        <img
                            src="sample/logo.png"
                            alt="Ulemindulu Logo"
                            className="h-10"
                        />
                    </div>
                    <p className="text-white text-sm">
                        Ulemindulu adalah platform undangan digital yang
                        memudahkanmu untuk menciptakan momen istimewa dengan
                        desain elegan, fitur lengkap, dan kemudahan berbagi ke
                        siapa pun, kapan pun. Rancang, sesuaikan, dan sebarkan
                        undanganmu dengan penuh kesan.
                    </p>
                </div>

                {/* Payment Support */}
                <div>
                    <h3 className="text-md font-semibold text-white mb-4">
                        Dukungan Pembayaran
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "visa",
                            "mastercard",
                            "ovo",
                            "bca",
                            "bni",
                            "bri",
                            "mandiri",
                            "alfamart",
                            "alfamidi",
                            "dana",
                            "link",
                            "qris",
                        ].map((item) => (
                            <img
                                key={item}
                                src={`payment-icons/${item}.webp`}
                                alt={item}
                                className="h-10 w-10 object-contain"
                            />
                        ))}
                    </div>
                </div>

                {/* Kontak & Media */}
                <div>
                    <h3 className="text-md font-semibold text-white mb-4">
                        Kontak
                    </h3>
                    <ul className="text-white text-sm space-y-2">
                        <li>📍 Tegal, Indonesia</li>
                        <li>✉️ info@ulemindulu.my.id</li>
                        <li>📱 www.ulemindulu.my.id</li>
                    </ul>
                    <p className="text-xs text-gray-400 mt-4">v1.0.0</p>
                </div>
            </div>

            <div className="text-center text-white text-sm mt-10">
                &copy; {currentYear} Ulemindulu. All rights reserved. Powered by {" "} <a href="https://bellukstudio.my.id" target="_blank" className="text-blue-100 hover:underline">BellukStudio</a>
            </div>
        </footer>
    );
}
