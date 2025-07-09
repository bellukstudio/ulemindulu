export default function HomeSection() {
    return (
        <section
            className="relative overflow-hidden bg-[#3758F9] py-20 mt-10"
            id="home"
        >
            <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h1 className="text-6xl font-bold text-white mb-4">
                        Selamat Datang di{" "}
                        <span className="text-blue-300">Ulemindulu</span>
                    </h1>
                    <p className="text-white text-lg mb-8">
                        Buat Undangan Digital Tanpa Ribet
                    </p>
                    <a
                        href="#buat-undangan"
                        className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium py-3 px-6 rounded-lg transition"
                    >
                        Buat Undangan Sekarang
                    </a>

                    <div className="mt-20 animate-custom-bounce">
                        <img
                            src="/sample/sample.png"
                            alt="Preview Undangan"
                            className="w-full max-w-5xl h-auto mx-auto shadow-lg rounded-lg"
                        />
                    </div>
                </div>
                <div className="mt-20 ">
                    <img
                        src="sample/mobile.png"
                        alt="Preview Undangan"
                        className="w-full max-w-5xl h-auto mx-auto"
                    />
                </div>
            </div>
        </section>
    );
}
