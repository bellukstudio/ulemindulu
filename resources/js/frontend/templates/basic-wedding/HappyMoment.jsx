import { useEffect, useState } from "react";
import PropTypes from "prop-types";

HappyMoment.propTypes = {
    data: PropTypes.object,
};
export default function HappyMoment({ data }) {
    const customData = data.custom_data ? JSON.parse(data.custom_data) : {};

    const targetDate = data.event_date
        ? new Date(data.event_date)
        : new Date();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div
            className="w-full min-h-screen relative bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D')",
            }}
        >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10 px-6 py-16 text-center text-white">
                <h1 className="text-5xl font-dancing">Moment Bahagia Kami</h1>

                <div className="block w-full max-w-xs mx-auto h-auto px-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-100 mt-10 text-center">
                    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 font-mono text-gray-900 text-sm sm:text-md">
                        <div className="text-center">
                            <div>{timeLeft.days}</div>
                            <div className="text-xs sm:text-sm">Hari</div>
                        </div>
                        <div className="text-center">
                            <div>{timeLeft.hours}</div>
                            <div className="text-xs sm:text-sm">Jam</div>
                        </div>
                        <div className="text-center">
                            <div>{timeLeft.minutes}</div>
                            <div className="text-xs sm:text-sm">Menit</div>
                        </div>
                        <div className="text-center">
                            <div>{timeLeft.seconds}</div>
                            <div className="text-xs sm:text-sm">Detik</div>
                        </div>
                    </div>
                </div>

                <h2 className="text-md font-mono mt-15">
                    Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala,
                    insyaAllah kami akan menyelenggarakan acara:
                </h2>

                <hr className="border-t border-white my-8 w-1/2 place-self-center" />

                <h1 className="text-5xl font-dancing mt-10">Akad</h1>
                <h2 className="text-md font-mono mt-5">
                    Pukul {customData.jamAkad} {data.timezone} - Selesai
                </h2>

                <h1 className="text-5xl font-dancing mt-10">Resepsi</h1>
                <h2 className="text-md font-mono mt-5">
                    Pukul {customData.jamResepsi} {data.timezone} - Selesai
                </h2>

                <hr className="border-t border-white my-8 w-1/2 place-self-center" />

                <h1 className="text-4xl font-dancing mt-10">Alamat</h1>
                <h2 className="text-md font-mono mt-5">{data.address}</h2>
                <a
                    href={data.location}
                    target="_blank"
                    className="inline-flex items-center gap-2 px-6 py-2 mt-10 bg-gray-100 rounded-full shadow-lg text-sm font-medium font-mono text-gray-800 hover:shadow-xl transition"
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
                            d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        />
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
                        />
                    </svg>
                    Lihat Peta
                </a>
            </div>
        </div>
    );
}
