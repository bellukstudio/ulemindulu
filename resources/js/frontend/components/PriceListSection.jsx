import { FaCheckCircle } from "react-icons/fa";

/**
 * PriceListSection
 *
 * This component renders a section displaying a list of pricing packages
 * for the services offered by Ulemindulu. Each package includes details
 * such as name, price, features, and highlights the most popular package.
 *
 * The component utilizes a grid layout to organize the packages and
 * displays them with various styles based on their properties.
 *
 * @returns {JSX.Element} A section containing pricing packages with
 * names, prices, features, and an option to select a package.
 */

export default function PriceListSection() {
    const packages = [
        {
            name: "Basic",
            price: "Rp 49.000",
            features: [
                "1 Tema Undangan",
                "Ganti Nama Tamu",
                "Link Undangan",
                "Responsive Mobile",
            ],
        },
        {
            name: "Premium",
            price: "Rp 99.000",
            features: [
                "Semua Fitur Basic",
                "Pilih Tema Bebas",
                "Galeri Foto & Musik",
                "Form RSVP & Ucapan",
            ],
            highlight: true,
        },
        {
            name: "Ultimate",
            price: "Rp 149.000",
            features: [
                "Semua Fitur Premium",
                "Video Undangan",
                "Live Streaming",
                "Unlimited Revisi",
            ],
        },
    ];

    return (
        <section id="pricelist" className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    Paket Harga Ulemindulu
                </h2>
                <p className="text-gray-600 mb-10">
                    Pilih paket yang sesuai dengan kebutuhan acara spesialmu
                </p>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`relative p-6 rounded-xl border shadow-sm transition ${
                                pkg.highlight
                                    ? "border-blue-500 shadow-lg scale-105 bg-white"
                                    : "bg-white border-gray-200"
                            }`}
                        >
                            {pkg.highlight && (
                                <span className="absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white bg-blue-600 rounded-bl-lg">
                                    Paling Populer
                                </span>
                            )}

                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                {pkg.name}
                            </h3>
                            <p className="text-3xl font-bold text-blue-700 mb-4">
                                {pkg.price}
                            </p>

                            <ul className="text-left text-gray-700 mb-6 space-y-3">
                                {pkg.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-2"
                                    >
                                        <FaCheckCircle className="text-blue-500" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#buat-undangan"
                                className={`block w-full py-2 px-4 font-medium rounded-lg transition ${
                                    pkg.highlight
                                        ? "bg-blue-700 hover:bg-blue-800 text-white"
                                        : "bg-gray-600 hover:bg-gray-700 text-white"
                                }`}
                            >
                                Pilih Paket
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
