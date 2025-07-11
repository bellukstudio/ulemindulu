import { useEffect, useState } from "react";
import BottomNavbar from "./BottomNavbar";
import BridgenGroom from "./BridgenGroom";
import Closing from "./Closing";
import HappyMoment from "./HappyMoment";
import LoveGift from "./LoveGift";
import Overview from "./Overview";
import QuranVerse from "./QuranVerse";
// import WishForm from "./WishForm";

export default function Invitation() {
    const images = [
        "https://images.unsplash.com/photo-1651868699762-48c50a3883d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlZGRpbmclMjBzaXR1YXRpb258ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1606217239582-d9f72323bcd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hcnJpYWdlfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1675851210020-045950ac0215?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hcnJpYWdlfGVufDB8fDB8fHww",
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000); // ganti setiap 5 detik
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[600px_1fr] min-h-screen max-w-full overflow-hidden">
            {/* Kolom Kiri - Scrollable */}
            <div className="relative bg-gray-100 md:h-screen md:overflow-y-auto scroll-smooth hide-scrollbar">
                {/* Scrollable content container */}
                <div className="min-h-screen">
                    <div id="home">
                        <Overview />
                    </div>
                    <div id="mempelai">
                        <BridgenGroom />
                    </div>
                    <div id="quranVerse">
                        <QuranVerse />
                    </div>
                    <div id="tanggal">
                        <HappyMoment />
                    </div>
                    <div id="gift">
                        <LoveGift />
                    </div>
                    {/* <div id="msg">
                        <WishForm />
                    </div> */}
                    <div id="closing">
                        <Closing />
                    </div>
                </div>

                {/* Fixed Bottom Navbar */}
                <div className="sticky bottom-0 z-50">
                    <BottomNavbar />
                </div>
            </div>

            {/* Kolom Kanan - Fixed */}
            <div className="relative h-screen bg-gray-100 hidden md:block overflow-hidden">
                {/* Gambar-gambar untuk transisi */}
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                            index === currentImage
                                ? "opacity-100 z-10"
                                : "opacity-0 z-0"
                        }`}
                        style={{
                            backgroundImage: `url('${img}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                ))}

                {/* Overlay dan Konten */}
                <div className="absolute inset-0 bg-black/40 z-20"></div>

                <div className="relative z-30 text-center text-white h-full flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-md rounded-xl border border-white/30 p-8 shadow-lg">
                        <h1 className="text-2xl font-dancing text-white mb-4">
                            Jhon & Masih Mencari - Cari
                        </h1>
                        <h2 className="font-mono text-sm text-white/90">
                            Kami akan menyelenggarakan acara pada tanggal 17
                            Agustus 2023
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
