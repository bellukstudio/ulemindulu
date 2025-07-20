/**
 * FullFeaturesSection
 *
 * Komponen untuk menampilkan fitur-fitur yang dimiliki oleh Ulemindulu.
 *
 * Terdiri dari 2 bagian, yaitu:
 * 1. Gambar dengan elemen-elemen yang mengambang (floating elements) dan
 * 2. Daftar fitur yang dapat disesuaikan sesuai kebutuhan.
 *
 * @returns {JSX.Element} - Komponen untuk menampilkan fitur-fitur Ulemindulu
 */
export default function FullFeaturesSection() {
    return (
        <section className="bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Left side (Image with floating elements) */}
                <div className="relative w-full lg:w-1/2">
                    <img
                        src="sample/feature.png"
                        alt="Statistik Undangan"
                        className="rounded-xl w-full"
                    />

                    <div className="absolute top-4 left-4 bg-orange-500 text-white font-semibold px-4 py-2 rounded-lg shadow">
                        1000 Orang
                        <br />
                        Membuka Undangan
                    </div>
                    <div className="absolute bottom-20 left-4 bg-white text-sm shadow px-4 py-2 rounded-lg">
                        <span className="font-bold text-green-600">
                            REKENING
                        </span>
                        <br />
                        Elon Muks mencopy nomor rekening
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white text-sm shadow px-4 py-2 rounded-lg max-w-xs">
                        <span className="font-bold text-green-600">
                            KADO UNDANGAN
                        </span>
                        <br />
                        Hermansyah dan Istri mengirimkan kado. Cek sekarang!
                    </div>
                </div>

                {/* Right side (Features list) */}
                <div className="w-full lg:w-1/2">
                    <h2 className="text-3xl font-bold text-[#1c2d57] mb-4">
                        Undangan Online Dengan Fitur Melimpah – Semua yang
                        dibutuhkan ada di sini
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Fitur lengkap yang dapat disesuaikan sesuai kebutuhan,
                        memastikan setiap detail acara menjadi sempurna dan
                        mudah diatur.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-800">
                        {[
                            "Ubah Nama Tamu Unlimited",
                            "Tanpa Masa Aktif",
                            "RSVP & Ucapan",
                            "Terintegrasi Google Maps",
                            "Sebar Ke Unlimited Penerima",
                            "Countdown Menuju Hari-H",
                            "Pengingat Google Calendar",
                            "Foto Galeri",
                            "Rekening Titip Hadiah",
                            "Titip Kado Fisik Ke Acara",
                            "Gift Virtual Di Undangan",
                            "Ratusan Musik Bisa Custom",
                            "Fitur Auto Scroll",
                            "Ubah Font dan Warna",
                            "Kostumisasi Tema Undangan",
                            "QRCode Buku Tamu",
                            "Layar Sapa & Check-in Tamu",
                            "Love Story & Susunan Acara",
                            "Fitur Turut Mengundang",
                            "Embed Map Lokasi Acara",
                            "Unlimited Revisi",
                            "Request Tema Baru",
                        ].map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">✔</span>
                                <span>{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
