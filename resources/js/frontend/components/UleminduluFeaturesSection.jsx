/**
 * Komponen untuk menampilkan fitur-fitur yang dimiliki oleh Ulemindulu.
 *
 * Terdiri dari 2 bagian, yaitu:
 * 1. Fitur mengirim undangan instan dan nama tamu personal.
 * 2. Fitur mudah diekspor ke beragam format.
 *
 * @returns {JSX.Element} - Komponen untuk menampilkan fitur-fitur Ulemindulu
 */
export default function UleminduluFeaturesSection() {
    return (
        <section className="py-16 bg-[#f8fcff]" id="feature">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Feature */}
                <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
                    <div className="w-full lg:w-1/2">
                        <img
                            src="sample/sample1.png"
                            alt="Fitur Ulemindulu"
                            className="rounded-xl shadow-lg w-full transition duration-700 ease-in transform hover:scale-105"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
                            Kirim Undangan Instan & Nama Tamu Personal
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Cukup upload daftar tamu dan Ulemindulu akan
                            membantu personalisasi nama tamu secara otomatis
                            pada undangan digitalmu. Bagikan dengan satu klik ke
                            WhatsApp, Instagram, Telegram, dan lainnya.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Tanpa batas tamu</li>
                            <li>Nama tamu otomatis</li>
                            <li>Link share ke semua platform</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Feature */}
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
                            Mudah Diekspor ke Beragam Format
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Bagikan undanganmu dengan lebih praktis! Hanya
                            dengan satu klik, kamu bisa mengekspor undangan ke
                            berbagai format seperti logo pasangan, versi cetak,
                            pamflet, hingga video undangan. Bebas pilih format
                            yang paling sesuai dengan kebutuhan acara dan
                            preferensi penerima.
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Ganti tema & font dengan mudah</li>
                            <li>Integrasi Google Calendar</li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <img
                            src="sample/sample2.png"
                            alt="Edit Undangan"
                            className="rounded-xl shadow-lg w-full transition duration-700 ease-in transform hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
