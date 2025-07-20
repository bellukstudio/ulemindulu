import PropTypes from "prop-types";

QuranVerse.propTypes = {
    data: PropTypes.object,
};
export default function QuranVerse({ data }) {
    const customData = data.custom_data ? JSON.parse(data.custom_data) : {};

    return (
        <div className="w-full  relative bg-cover bg-center bg-blue-900">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16 text-center text-white">
                {/* Quranic verse title */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-4xl font-dancing text-amber-200">
                        Allah Subhanahu Wa Ta'ala berfirman
                    </h1>
                </div>

                {/* Quranic verses */}
                <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-xl p-6 shadow-xl hover:bg-white/20 transition-all duration-300">
                        <h5 className="mb-3 text-sm md:text-md tracking-tight text-white font-mono leading-relaxed">
                            " {customData.isiAyat} "
                        </h5>
                        <p className="font-mono text-amber-200 text-sm">
                            {customData.ayatQuran}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
