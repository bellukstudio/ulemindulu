import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { formatDateID } from "../../core/util";
import BottomNavbar from "./BottomNavbar";
import BrideGroom from "./BrideGroom";
import Closing from "./Closing";
import HappyMoment from "./HappyMoment";
import LoveGift from "./LoveGift";
import Overview from "./Overview";
import QuranVerse from "./QuranVerse";
import WishesForm from "./WishesForm";

Invitation.propTypes = {
    data: PropTypes.object,
    gift: PropTypes.arrayOf(PropTypes.object),
    isPreview: PropTypes.bool,
    album: PropTypes.arrayOf(PropTypes.object),
};

export default function Invitation({ data, gift, isPreview, album }) {
    const customData = data.custom_data;

    // Ambil album index 3-6 dan filter hanya yang memiliki image_path
    const images = [album[3], album[4], album[5], album[6]]
        .filter((item) => item && item.image_path)
        .map((item) => item.image_path);

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const sectionIds = [
        "home",
        "mempelai",
        "quranVerse",
        "tanggal",
        "gift",
        "msg",
        "closing",
    ];

    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            const nextSection = (currentSection + 1) % sectionIds.length;
            const sectionElement = document.getElementById(
                sectionIds[nextSection]
            );
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: "smooth" });
            }
            setCurrentSection(nextSection);
        }, 20000);

        return () => clearInterval(scrollInterval);
    }, [currentSection, isPreview]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[600px_1fr] min-h-screen max-w-full overflow-hidden">
            {/* Kolom Kiri - Scrollable */}
            <div className="relative bg-gray-100 md:h-screen md:overflow-y-auto scroll-smooth hide-scrollbar">
                <div className="min-h-screen">
                    <div id="home">
                        <Overview data={data} brideGroom={album[0]} />
                    </div>
                    <div id="mempelai">
                        <BrideGroom data={data} brideGroom={album} />
                    </div>
                    <div id="quranVerse">
                        <QuranVerse data={data} />
                    </div>
                    <div id="tanggal">
                        <HappyMoment data={data} />
                    </div>
                    <div id="gift">
                        <LoveGift gift={gift} />
                    </div>
                    <div id="msg">
                        <WishesForm isPreview={isPreview} />
                    </div>
                    <div id="closing">
                        <Closing />
                    </div>
                </div>
                <div className="sticky bottom-0 z-50">
                    <BottomNavbar />
                </div>
            </div>

            {/* Kolom Kanan - Fixed */}
            <div className="relative h-screen bg-gray-100 hidden md:block overflow-hidden">
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

                <div className="absolute inset-0 bg-black/40 z-20"></div>

                <div className="relative z-30 text-center text-white h-full flex items-center justify-center p-10">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/30 p-8 shadow-lg hover:backdrop-blur-none">
                        <h1 className="text-2xl font-dancing text-white mb-4">
                            {customData.mempelaiPria} <br /> & <br />
                            {customData.mempelaiWanita}
                        </h1>
                        <h2 className="font-mono text-sm text-white/90">
                            Kami akan menyelenggarakan acara pada tanggal{" "}
                            {formatDateID(data.event_date)}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
