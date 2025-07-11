
export default function Closing() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="w-full  relative bg-cover bg-center bg-blue-900">

            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16 text-center text-white">
                <h2 className="text-md w-sm md:w-md place-self-center font-mono mt-15">Terima kasih atas perhatian dan doa restu Anda, yang menjadi kebahagiaan serta kehormatan besar bagi kami.</h2>
                <div className="w-full">
                    <h2 className="text-3xl font-bold mt-10">Wassalamualaikum Warahmatullahi Wabarakatuh</h2>
                </div>
                <div className="mt-10 font-mono">Copyright © <a href="bellukstudio.my.id" target="_blank">BellukStudio {currentYear}</a></div>
                <div className="block sm:block h-24"></div>
            </div>
        </div>
    );
}
