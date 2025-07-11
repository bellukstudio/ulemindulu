import { motion } from "framer-motion";

export default function BridgenGroom() {
    return (
        <div
            className="w-full min-h-screen relative bg-cover bg-center"
            style={{ backgroundImage: "url('https://res.cloudinary.com/ducsvvqsy/image/upload/v1752223006/template/asset/bg2_ljf3k9.png')" }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16 text-center text-white">
                {/* Islamic greeting section */}
                <div className="mb-20">
                    <h1 className="font-mono text-2xl md:text-4xl mb-8 text-amber-200">
                        بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">
                        Assalamualaikum Warahmatullahi Wabarakatuh
                    </h2>
                </div>

                {/* Invitation text */}
                <div className="mb-16">
                    <h2 className="text-sm md:text-md font-mono text-white/90 max-w-2xl mx-auto leading-relaxed">
                        Tanpa mengurangi rasa hormat, kami mengundang Anda untuk
                        berkenan menghadiri acara pernikahan kami:
                    </h2>
                </div>

                {/* Groom section */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="w-48 h-48 md:w-60 md:h-60 mx-auto rounded-full overflow-hidden shadow-2xl mb-8 border-4 border-white/20">
                            <img
                                src="https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww"
                                alt="Foto Mempelai Pria"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </motion.div>

                    <h2 className="text-2xl md:text-3xl font-dancing font-bold mb-4">
                        Jhon doe
                    </h2>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-sm mx-auto">
                        <h2 className="text-sm md:text-md font-mono text-white/90">
                            Putra dari Bapak Lorem Ipsum
                            <br />
                            &
                            <br />
                            Ibu Lorem Ipsum
                        </h2>
                    </div>
                </div>

                {/* Ampersand */}
                <div className="mb-16">
                    <h1 className="text-6xl md:text-7xl font-dancing text-amber-200">
                        &
                    </h1>
                </div>

                {/* Bride section */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <div className="w-48 h-48 md:w-60 md:h-60 mx-auto rounded-full overflow-hidden shadow-2xl mb-8 border-4 border-white/20">
                            <img
                                src="https://images.unsplash.com/photo-1481214110143-ed630356e1bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW58ZW58MHx8MHx8fDA%3D"
                                alt="Foto Mempelai Wanita"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </motion.div>

                    <h2 className="text-2xl md:text-3xl font-dancing font-bold mb-4">
                        Lorem Ipsum Dolor Is Amet
                    </h2>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-sm mx-auto">
                        <h2 className="text-sm md:text-md font-mono text-white/90">
                            Putri dari Bapak Lorem Ipsum
                            <br />
                            &
                            <br />
                            Ibu Lorem Ipsum
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
