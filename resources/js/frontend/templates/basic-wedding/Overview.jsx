"use client";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

export default function Overview() {
    const [searchParams] = useSearchParams();
    const to = searchParams.get("to") || "Teman teman semua";
    const calendarUrl =
        `https://www.google.com/calendar/render?action=TEMPLATE` +
        `&text=${encodeURIComponent("Pernikahan Lukman & Masih Mencari")}` +
        `&dates=20290817T030000Z/20290817T050000Z` +
        `&details=${encodeURIComponent(
            "Dengan segala kerendahan hati, kami mengundang ke acara pernikahan kami."
        )}` +
        `&location=${encodeURIComponent("Dukuh Wringin, Slawi")}` +
        `&sf=true&output=xml`;

    return (
        <div
            className="w-full min-h-screen relative bg-cover bg-center"
            style={{ backgroundImage: "url('https://res.cloudinary.com/ducsvvqsy/image/upload/v1752223006/template/asset/bg1_y7grmf.png')" }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16 text-center text-white">
                <div className="pt-16 pb-8">
                    <h2 className="text-2xl md:text-4xl font-dancing text-white mb-8">
                        The Wedding Of
                    </h2>
                </div>

                {/* Foto mempelai */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeIn" }}
                    viewport={{ once: true }}
                    className="w-48 h-48 md:w-60 md:h-50 mx-auto rounded-full overflow-hidden shadow-2xl mb-8 border-4 border-white/20"
                >
                    <img
                        src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=500&auto=format&fit=crop&q=60"
                        alt="Foto Mempelai Pria"
                        className="object-cover w-full h-full"
                    />
                </motion.div>
                {/* Nama mempelai */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-dancing text-white leading-relaxed">
                        Jhon Doe
                        <br />
                        <span className="text-xl md:text-2xl">&</span>
                        <br />
                        Masih Mencari - Cari
                    </h1>
                </div>

                {/* Undangan */}
                <div className="mb-8">
                    <p className="text-sm md:text-md text-white/80 font-mono mb-2">
                        Kepada Yth Bapak/Ibu/Saudara/i :
                    </p>
                    <p className="text-base md:text-lg font-semibold text-white font-mono">
                        {to}
                    </p>
                </div>

                {/* Button Save the Date */}
                <div className="mb-12">
                    <a
                        href={calendarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-sm font-medium font-mono text-gray-800 hover:bg-white hover:shadow-xl transition-all duration-300"
                    >
                        <svg
                            className="w-6 h-6 text-gray-800"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m11.5 11.5 2.071 1.994M4 10h5m11 0h-1.5M12 7V4M7 7V4m10 3V4m-7 13H8v-2l5.227-5.292a1.46 1.46 0 0 1 2.065 2.065L10 17Zm-5 3h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                            />
                        </svg>
                        Save the date
                    </a>
                </div>

                {/* Mouse scroll indicator */}
                <div className="flex justify-center items-center">
                    <div className="w-[30px] h-[50px] border-2 border-white/60 rounded-full flex justify-center items-start relative">
                        <div className="w-[4px] h-[8px] bg-white/60 rounded-full mt-2 animate-mouse-scroll" />
                    </div>
                </div>
            </div>
            <style>
                {`
                    @keyframes mouse-scroll {
                    0% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    50% {
                        transform: translateY(12px);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                    }

                    .animate-mouse-scroll {
                    animation: mouse-scroll 1.5s infinite ease-in-out;
                    }
                `}
            </style>
        </div>
    );
}
